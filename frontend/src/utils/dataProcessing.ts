import type { EVData, FilterState, ChartDataPoint, AggregatedStats, GroupedData, RangeStatistics } from '../types';

/**
 * Filter EV data based on active filters
 */
export const filterEVData = (data: EVData[], filters: FilterState): EVData[] => {
  return data.filter((item) => {
    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableFields = [
        item.make,
        item.model,
        item.city,
        item.county,
        item.vin,
        item.evType,
      ].map((field) => String(field).toLowerCase());
      
      if (!searchableFields.some((field) => field.includes(query))) {
        return false;
      }
    }

    // County filter
    if (filters.counties.length > 0 && !filters.counties.includes(item.county)) {
      return false;
    }

    // City filter
    if (filters.cities.length > 0 && !filters.cities.includes(item.city)) {
      return false;
    }

    // Make filter
    if (filters.makes.length > 0 && !filters.makes.includes(item.make)) {
      return false;
    }

    // Model filter
    if (filters.models.length > 0 && !filters.models.includes(item.model)) {
      return false;
    }

    // EV Type filter
    if (filters.evTypes.length > 0 && !filters.evTypes.includes(item.evType)) {
      return false;
    }

    // Year range filter
    const [minYear, maxYear] = filters.yearRange;
    if (item.modelYear < minYear || item.modelYear > maxYear) {
      return false;
    }

    // CAFV Eligibility filter (fuzzy match - case insensitive, handles typos)
    if (filters.cafvEligibility.length > 0) {
      const itemEligibility = item.cafvEligibility.toLowerCase().trim();
      const matchesAny = filters.cafvEligibility.some(filterValue => {
        const filterLower = filterValue.toLowerCase().trim();
        // Exact match or contains
        return itemEligibility.includes(filterLower) || filterLower.includes(itemEligibility);
      });
      if (!matchesAny) {
        return false;
      }
    }

    // Electric range filter with unknown range handling
    if (filters.onlyUnknownRange) {
      // Only show vehicles with 0 range
      if (item.electricRange !== 0) {
        return false;
      }
    } else {
      // Normal range filtering
      const [minRange, maxRange] = filters.rangeFilter;
      if (filters.includeUnknownRange) {
        // Include vehicles with 0 range OR within the range
        if (item.electricRange !== 0 && (item.electricRange < minRange || item.electricRange > maxRange)) {
          return false;
        }
      } else {
        // Exclude vehicles with 0 range and apply range filter
        if (item.electricRange === 0 || item.electricRange < minRange || item.electricRange > maxRange) {
          return false;
        }
      }
    }

    // MSRP range filter
    const [minMSRP, maxMSRP] = filters.msrpRange;
    if (item.baseMSRP > 0 && (item.baseMSRP < minMSRP || item.baseMSRP > maxMSRP)) {
      return false;
    }

    // Legislative District filter
    if (filters.legislativeDistricts.length > 0) {
      if (!filters.legislativeDistricts.includes(item.legislativeDistrict)) {
        return false;
      }
    }

    // Census Tract filter
    if (filters.censusTracts.length > 0) {
      if (!filters.censusTracts.includes(item.censusTract)) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Get unique values from a specific field
 */
export const getUniqueValues = <T extends keyof EVData>(
  data: EVData[],
  field: T
): string[] => {
  const uniqueSet = new Set(data.map((item) => String(item[field])));
  return Array.from(uniqueSet).filter(val => val && val !== 'Unknown').sort();
};

/**
 * Aggregate data by a specific field for chart visualization
 */
export const aggregateByField = <T extends keyof EVData>(
  data: EVData[],
  field: T,
  limit?: number
): ChartDataPoint[] => {
  const counts = data.reduce((acc, item) => {
    const key = String(item[field]);
    if (key && key !== 'Unknown') {
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  let chartData = Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (limit && chartData.length > limit) {
    const topItems = chartData.slice(0, limit - 1);
    const othersCount = chartData.slice(limit - 1).reduce((sum, item) => sum + item.value, 0);
    chartData = [...topItems, { name: 'Others', value: othersCount }];
  }

  return chartData;
};

/**
 * Calculate aggregated statistics
 */
export const calculateStats = (data: EVData[]): AggregatedStats => {
  if (data.length === 0) {
    return {
      totalVehicles: 0,
      bevCount: 0,
      phevCount: 0,
      avgRange: 0,
      avgMSRP: 0,
      uniqueMakes: 0,
      uniqueModels: 0,
      yearRange: [2020, 2024],
    };
  }

  const bevCount = data.filter((v) => v.evType === 'BEV').length;
  const phevCount = data.filter((v) => v.evType === 'PHEV').length;
  
  const totalRange = data.reduce((sum, v) => sum + v.electricRange, 0);
  const avgRange = Math.round(totalRange / data.length);
  
  const vehiclesWithMSRP = data.filter(v => v.baseMSRP > 0);
  const totalMSRP = vehiclesWithMSRP.reduce((sum, v) => sum + v.baseMSRP, 0);
  const avgMSRP = vehiclesWithMSRP.length > 0 ? Math.round(totalMSRP / vehiclesWithMSRP.length) : 0;
  
  const uniqueMakes = new Set(data.map(v => v.make)).size;
  const uniqueModels = new Set(data.map(v => v.model)).size;
  
  const years = data.map(v => v.modelYear).filter(y => y > 0);
  const yearRange: [number, number] = years.length > 0 
    ? [Math.min(...years), Math.max(...years)]
    : [2020, 2024];

  return {
    totalVehicles: data.length,
    bevCount,
    phevCount,
    avgRange,
    avgMSRP,
    uniqueMakes,
    uniqueModels,
    yearRange,
  };
};

/**
 * Group data by multiple dimensions
 */
export const groupData = (data: EVData[]): GroupedData => {
  const byMake: Record<string, number> = {};
  const byModel: Record<string, number> = {};
  const byCounty: Record<string, number> = {};
  const byCity: Record<string, number> = {};
  const byYear: Record<number, number> = {};
  const byEVType: Record<string, number> = {};
  const byCafvEligibility: Record<string, number> = {};

  data.forEach((vehicle) => {
    // By Make
    byMake[vehicle.make] = (byMake[vehicle.make] || 0) + 1;
    
    // By Model
    const modelKey = `${vehicle.make} ${vehicle.model}`;
    byModel[modelKey] = (byModel[modelKey] || 0) + 1;
    
    // By County
    if (vehicle.county && vehicle.county !== 'Unknown') {
      byCounty[vehicle.county] = (byCounty[vehicle.county] || 0) + 1;
    }
    
    // By City
    if (vehicle.city && vehicle.city !== 'Unknown') {
      byCity[vehicle.city] = (byCity[vehicle.city] || 0) + 1;
    }
    
    // By Year
    if (vehicle.modelYear > 0) {
      byYear[vehicle.modelYear] = (byYear[vehicle.modelYear] || 0) + 1;
    }
    
    // By EV Type
    byEVType[vehicle.evType] = (byEVType[vehicle.evType] || 0) + 1;
    
    // By CAFV Eligibility
    if (vehicle.cafvEligibility) {
      byCafvEligibility[vehicle.cafvEligibility] = (byCafvEligibility[vehicle.cafvEligibility] || 0) + 1;
    }
  });

  return {
    byMake,
    byModel,
    byCounty,
    byCity,
    byYear,
    byEVType,
    byCafvEligibility,
  };
};

/**
 * Calculate range statistics
 */
export const calculateRangeStats = (data: EVData[]): RangeStatistics => {
  const ranges = data.map(v => v.electricRange).filter(r => r > 0).sort((a, b) => a - b);
  
  if (ranges.length === 0) {
    return {
      min: 0,
      max: 0,
      avg: 0,
      median: 0,
      distribution: [],
    };
  }

  const min = ranges[0];
  const max = ranges[ranges.length - 1];
  const avg = Math.round(ranges.reduce((sum, r) => sum + r, 0) / ranges.length);
  const median = ranges[Math.floor(ranges.length / 2)];

  // Create distribution buckets
  const buckets = [
    { range: '0-50', min: 0, max: 50 },
    { range: '51-100', min: 51, max: 100 },
    { range: '101-150', min: 101, max: 150 },
    { range: '151-200', min: 151, max: 200 },
    { range: '201-250', min: 201, max: 250 },
    { range: '251-300', min: 251, max: 300 },
    { range: '301+', min: 301, max: Infinity },
  ];

  const distribution = buckets.map(bucket => ({
    range: bucket.range,
    count: ranges.filter(r => r >= bucket.min && r <= bucket.max).length,
  })).filter(d => d.count > 0);

  return { min, max, avg, median, distribution };
};

/**
 * Calculate year range from data
 */
export const getYearRange = (data: EVData[]): [number, number] => {
  if (data.length === 0) return [2020, 2024];
  
  const years = data.map((item) => item.modelYear).filter(y => y > 0);
  if (years.length === 0) return [2020, 2024];
  
  return [Math.min(...years), Math.max(...years)];
};

/**
 * Calculate electric range from data
 */
export const getRangeFilter = (data: EVData[]): [number, number] => {
  if (data.length === 0) return [0, 350];
  
  const ranges = data.map((item) => item.electricRange).filter(r => r >= 0);
  if (ranges.length === 0) return [0, 350];
  
  return [Math.min(...ranges), Math.max(...ranges)];
};

/**
 * Calculate MSRP range from data
 */
export const getMSRPRange = (data: EVData[]): [number, number] => {
  if (data.length === 0) return [0, 200000];
  
  const msrps = data.map((item) => item.baseMSRP).filter(m => m > 0);
  if (msrps.length === 0) return [0, 200000];
  
  return [Math.min(...msrps), Math.max(...msrps)];
};

/**
 * Get unique CAFV eligibility values (normalized for fuzzy matching)
 */
export const getUniqueCafvEligibility = (data: EVData[]): string[] => {
  const uniqueSet = new Set(
    data
      .map((item) => item.cafvEligibility.trim())
      .filter(val => val && val !== 'Unknown')
  );
  return Array.from(uniqueSet).sort();
};

/**
 * Get unique legislative districts
 */
export const getUniqueLegislativeDistricts = (data: EVData[]): string[] => {
  const uniqueSet = new Set(
    data
      .map((item) => item.legislativeDistrict.trim())
      .filter(val => val && val !== 'Unknown' && val !== '')
  );
  return Array.from(uniqueSet).sort((a, b) => {
    const numA = parseInt(a);
    const numB = parseInt(b);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    return a.localeCompare(b);
  });
};

/**
 * Get unique census tracts
 */
export const getUniqueCensusTracts = (data: EVData[]): string[] => {
  const uniqueSet = new Set(
    data
      .map((item) => item.censusTract.trim())
      .filter(val => val && val !== 'Unknown' && val !== '')
  );
  return Array.from(uniqueSet).sort();
};

/**
 * Paginate data
 */
export const paginateData = <T>(
  data: T[],
  page: number,
  itemsPerPage: number
): T[] => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

/**
 * Calculate total pages
 */
export const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

/**
 * Get top N items from grouped data
 */
export const getTopItems = (
  grouped: Record<string, number>,
  limit: number = 10
): ChartDataPoint[] => {
  return Object.entries(grouped)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
};

/**
 * Search vehicles by query
 */
export const searchVehicles = (data: EVData[], query: string): EVData[] => {
  if (!query || query.trim() === '') return data;
  
  const lowerQuery = query.toLowerCase();
  return data.filter((vehicle) => {
    return (
      vehicle.make.toLowerCase().includes(lowerQuery) ||
      vehicle.model.toLowerCase().includes(lowerQuery) ||
      vehicle.city.toLowerCase().includes(lowerQuery) ||
      vehicle.county.toLowerCase().includes(lowerQuery) ||
      vehicle.vin.toLowerCase().includes(lowerQuery) ||
      vehicle.evType.toLowerCase().includes(lowerQuery)
    );
  });
};
