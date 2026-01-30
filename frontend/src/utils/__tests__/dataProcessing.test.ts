/**
 * Unit tests for data processing utilities
 * 
 * To run these tests, you would need to:
 * 1. Install vitest: npm install -D vitest
 * 2. Add test script to package.json: "test": "vitest"
 * 3. Run: npm test
 */

import { describe, it, expect } from 'vitest';
import {
  filterEVData,
  getUniqueValues,
  aggregateByField,
  calculateStats,
  groupData,
  calculateRangeStats,
  getYearRange,
  paginateData,
  getTotalPages,
  searchVehicles,
} from '../dataProcessing';
import type { EVData, FilterState } from '../../types';

// Sample test data
const mockData: EVData[] = [
  {
    vin: 'TEST001',
    county: 'King',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98101',
    modelYear: 2023,
    make: 'Tesla',
    model: 'Model 3',
    evType: 'BEV',
    cafvEligibility: 'Eligible',
    electricRange: 272,
    baseMSRP: 46990,
    legislativeDistrict: '43',
    dolVehicleId: 'DOL001',
    vehicleLocation: 'POINT (-122.33 47.61)',
    electricUtility: 'Seattle City Light',
    censusTract: '53033007800',
  },
  {
    vin: 'TEST002',
    county: 'King',
    city: 'Bellevue',
    state: 'WA',
    postalCode: '98004',
    modelYear: 2022,
    make: 'Nissan',
    model: 'Leaf',
    evType: 'BEV',
    cafvEligibility: 'Eligible',
    electricRange: 149,
    baseMSRP: 27400,
    legislativeDistrict: '41',
    dolVehicleId: 'DOL002',
    vehicleLocation: 'POINT (-122.20 47.61)',
    electricUtility: 'Puget Sound Energy',
    censusTract: '53033022604',
  },
  {
    vin: 'TEST003',
    county: 'Snohomish',
    city: 'Everett',
    state: 'WA',
    postalCode: '98201',
    modelYear: 2021,
    make: 'Toyota',
    model: 'Prius Prime',
    evType: 'PHEV',
    cafvEligibility: 'Not Eligible',
    electricRange: 44,
    baseMSRP: 32350,
    legislativeDistrict: '38',
    dolVehicleId: 'DOL003',
    vehicleLocation: 'POINT (-122.20 47.98)',
    electricUtility: 'Snohomish County PUD',
    censusTract: '53061051100',
  },
];

describe('filterEVData', () => {
  it('should return all data when no filters applied', () => {
    const filters: FilterState = {
      searchQuery: '',
      counties: [],
      cities: [],
      makes: [],
      models: [],
      evTypes: [],
      yearRange: [2020, 2024],
    };
    const result = filterEVData(mockData, filters);
    expect(result).toHaveLength(3);
  });

  it('should filter by search query', () => {
    const filters: FilterState = {
      searchQuery: 'tesla',
      counties: [],
      cities: [],
      makes: [],
      models: [],
      evTypes: [],
      yearRange: [2020, 2024],
    };
    const result = filterEVData(mockData, filters);
    expect(result).toHaveLength(1);
    expect(result[0].make).toBe('Tesla');
  });

  it('should filter by county', () => {
    const filters: FilterState = {
      searchQuery: '',
      counties: ['King'],
      cities: [],
      makes: [],
      models: [],
      evTypes: [],
      yearRange: [2020, 2024],
    };
    const result = filterEVData(mockData, filters);
    expect(result).toHaveLength(2);
    expect(result.every(v => v.county === 'King')).toBe(true);
  });

  it('should filter by EV type', () => {
    const filters: FilterState = {
      searchQuery: '',
      counties: [],
      cities: [],
      makes: [],
      models: [],
      evTypes: ['BEV'],
      yearRange: [2020, 2024],
    };
    const result = filterEVData(mockData, filters);
    expect(result).toHaveLength(2);
    expect(result.every(v => v.evType === 'BEV')).toBe(true);
  });

  it('should filter by year range', () => {
    const filters: FilterState = {
      searchQuery: '',
      counties: [],
      cities: [],
      makes: [],
      models: [],
      evTypes: [],
      yearRange: [2022, 2023],
    };
    const result = filterEVData(mockData, filters);
    expect(result).toHaveLength(2);
    expect(result.every(v => v.modelYear >= 2022 && v.modelYear <= 2023)).toBe(true);
  });

  it('should combine multiple filters with AND logic', () => {
    const filters: FilterState = {
      searchQuery: '',
      counties: ['King'],
      cities: [],
      makes: [],
      models: [],
      evTypes: ['BEV'],
      yearRange: [2022, 2023],
    };
    const result = filterEVData(mockData, filters);
    expect(result).toHaveLength(1);
    expect(result[0].make).toBe('Tesla');
  });
});

describe('getUniqueValues', () => {
  it('should return unique makes', () => {
    const result = getUniqueValues(mockData, 'make');
    expect(result).toEqual(['Nissan', 'Tesla', 'Toyota']);
  });

  it('should return unique counties', () => {
    const result = getUniqueValues(mockData, 'county');
    expect(result).toEqual(['King', 'Snohomish']);
  });

  it('should filter out Unknown values', () => {
    const dataWithUnknown: EVData[] = [
      ...mockData,
      { ...mockData[0], county: 'Unknown' },
    ];
    const result = getUniqueValues(dataWithUnknown, 'county');
    expect(result).not.toContain('Unknown');
  });
});

describe('aggregateByField', () => {
  it('should aggregate by make', () => {
    const result = aggregateByField(mockData, 'make');
    expect(result).toHaveLength(3);
    expect(result.find(r => r.name === 'Tesla')?.value).toBe(1);
  });

  it('should limit results and create Others category', () => {
    const result = aggregateByField(mockData, 'make', 2);
    expect(result).toHaveLength(2);
    expect(result.some(r => r.name === 'Others')).toBe(true);
  });

  it('should sort by count descending', () => {
    const dataWithDuplicates = [...mockData, mockData[0], mockData[0]];
    const result = aggregateByField(dataWithDuplicates, 'make');
    expect(result[0].name).toBe('Tesla');
    expect(result[0].value).toBe(3);
  });
});

describe('calculateStats', () => {
  it('should calculate correct statistics', () => {
    const result = calculateStats(mockData);
    expect(result.totalVehicles).toBe(3);
    expect(result.bevCount).toBe(2);
    expect(result.phevCount).toBe(1);
    expect(result.avgRange).toBe(Math.round((272 + 149 + 44) / 3));
    expect(result.uniqueMakes).toBe(3);
  });

  it('should handle empty data', () => {
    const result = calculateStats([]);
    expect(result.totalVehicles).toBe(0);
    expect(result.bevCount).toBe(0);
    expect(result.avgRange).toBe(0);
  });

  it('should calculate year range correctly', () => {
    const result = calculateStats(mockData);
    expect(result.yearRange).toEqual([2021, 2023]);
  });
});

describe('groupData', () => {
  it('should group by all dimensions', () => {
    const result = groupData(mockData);
    expect(result.byMake['Tesla']).toBe(1);
    expect(result.byCounty['King']).toBe(2);
    expect(result.byEVType['BEV']).toBe(2);
    expect(result.byYear[2023]).toBe(1);
  });

  it('should create combined model keys', () => {
    const result = groupData(mockData);
    expect(result.byModel['Tesla Model 3']).toBe(1);
    expect(result.byModel['Nissan Leaf']).toBe(1);
  });
});

describe('calculateRangeStats', () => {
  it('should calculate range statistics', () => {
    const result = calculateRangeStats(mockData);
    expect(result.min).toBe(44);
    expect(result.max).toBe(272);
    expect(result.avg).toBe(Math.round((272 + 149 + 44) / 3));
  });

  it('should create distribution buckets', () => {
    const result = calculateRangeStats(mockData);
    expect(result.distribution.length).toBeGreaterThan(0);
    expect(result.distribution.every(d => d.count > 0)).toBe(true);
  });

  it('should handle empty data', () => {
    const result = calculateRangeStats([]);
    expect(result.min).toBe(0);
    expect(result.max).toBe(0);
    expect(result.distribution).toEqual([]);
  });
});

describe('getYearRange', () => {
  it('should return correct year range', () => {
    const result = getYearRange(mockData);
    expect(result).toEqual([2021, 2023]);
  });

  it('should return default range for empty data', () => {
    const result = getYearRange([]);
    expect(result).toEqual([2020, 2024]);
  });
});

describe('paginateData', () => {
  it('should return first page', () => {
    const result = paginateData(mockData, 1, 2);
    expect(result).toHaveLength(2);
    expect(result[0].vin).toBe('TEST001');
  });

  it('should return second page', () => {
    const result = paginateData(mockData, 2, 2);
    expect(result).toHaveLength(1);
    expect(result[0].vin).toBe('TEST003');
  });

  it('should handle page beyond data length', () => {
    const result = paginateData(mockData, 10, 2);
    expect(result).toHaveLength(0);
  });
});

describe('getTotalPages', () => {
  it('should calculate total pages correctly', () => {
    expect(getTotalPages(10, 3)).toBe(4);
    expect(getTotalPages(9, 3)).toBe(3);
    expect(getTotalPages(0, 3)).toBe(0);
  });
});

describe('searchVehicles', () => {
  it('should search by make', () => {
    const result = searchVehicles(mockData, 'tesla');
    expect(result).toHaveLength(1);
    expect(result[0].make).toBe('Tesla');
  });

  it('should search by city', () => {
    const result = searchVehicles(mockData, 'seattle');
    expect(result).toHaveLength(1);
    expect(result[0].city).toBe('Seattle');
  });

  it('should search by VIN', () => {
    const result = searchVehicles(mockData, 'TEST002');
    expect(result).toHaveLength(1);
    expect(result[0].vin).toBe('TEST002');
  });

  it('should return all data for empty query', () => {
    const result = searchVehicles(mockData, '');
    expect(result).toHaveLength(3);
  });

  it('should be case insensitive', () => {
    const result = searchVehicles(mockData, 'TESLA');
    expect(result).toHaveLength(1);
  });
});
