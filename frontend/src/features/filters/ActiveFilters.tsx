import { memo } from 'react';
import { useEVDataStore } from '../../store/useEVDataStore';
import { getYearRange, getRangeFilter, getMSRPRange } from '../../utils/dataProcessing';

export const ActiveFilters = memo(() => {
  const { data, filters, setFilters } = useEVDataStore();

  const [dataMinYear, dataMaxYear] = getYearRange(data);
  const [dataMinRange, dataMaxRange] = getRangeFilter(data);
  const [dataMinMSRP, dataMaxMSRP] = getMSRPRange(data);

  const activeFilters: Array<{ label: string; onRemove: () => void }> = [];

  // Search query
  if (filters.searchQuery) {
    activeFilters.push({
      label: `Search: "${filters.searchQuery}"`,
      onRemove: () => setFilters({ searchQuery: '' }),
    });
  }

  // Year range
  if (filters.yearRange[0] !== dataMinYear || filters.yearRange[1] !== dataMaxYear) {
    activeFilters.push({
      label: `Year: ${filters.yearRange[0]}-${filters.yearRange[1]}`,
      onRemove: () => setFilters({ yearRange: [dataMinYear, dataMaxYear] }),
    });
  }

  // Electric range
  if (filters.rangeFilter[0] !== dataMinRange || filters.rangeFilter[1] !== dataMaxRange) {
    activeFilters.push({
      label: `Range: ${filters.rangeFilter[0]}-${filters.rangeFilter[1]}mi`,
      onRemove: () => setFilters({ rangeFilter: [dataMinRange, dataMaxRange] }),
    });
  }

  // Counties
  filters.counties.forEach((county) => {
    activeFilters.push({
      label: `County: ${county}`,
      onRemove: () =>
        setFilters({ counties: filters.counties.filter((c) => c !== county) }),
    });
  });

  // Makes
  filters.makes.forEach((make) => {
    activeFilters.push({
      label: `Make: ${make}`,
      onRemove: () =>
        setFilters({ makes: filters.makes.filter((m) => m !== make) }),
    });
  });

  // EV Types
  filters.evTypes.forEach((type) => {
    activeFilters.push({
      label: `Type: ${type}`,
      onRemove: () =>
        setFilters({ evTypes: filters.evTypes.filter((t) => t !== type) }),
    });
  });

  // CAFV Eligibility
  filters.cafvEligibility.forEach((eligibility) => {
    const shortLabel = eligibility.length > 20 
      ? eligibility.substring(0, 20) + '...' 
      : eligibility;
    activeFilters.push({
      label: `CAFV: ${shortLabel}`,
      onRemove: () =>
        setFilters({
          cafvEligibility: filters.cafvEligibility.filter((e) => e !== eligibility),
        }),
    });
  });

  // Unknown range options
  if (filters.onlyUnknownRange) {
    activeFilters.push({
      label: 'Only Unknown Range',
      onRemove: () => setFilters({ onlyUnknownRange: false }),
    });
  } else if (!filters.includeUnknownRange) {
    activeFilters.push({
      label: 'Exclude Unknown Range',
      onRemove: () => setFilters({ includeUnknownRange: true }),
    });
  }

  // MSRP range
  if (filters.msrpRange[0] !== dataMinMSRP || filters.msrpRange[1] !== dataMaxMSRP) {
    activeFilters.push({
      label: `MSRP: $${(filters.msrpRange[0] / 1000).toFixed(0)}k-$${(filters.msrpRange[1] / 1000).toFixed(0)}k`,
      onRemove: () => setFilters({ msrpRange: [dataMinMSRP, dataMaxMSRP] }),
    });
  }

  // Legislative Districts
  filters.legislativeDistricts.forEach((district) => {
    activeFilters.push({
      label: `District: ${district}`,
      onRemove: () =>
        setFilters({
          legislativeDistricts: filters.legislativeDistricts.filter(
            (d) => d !== district
          ),
        }),
    });
  });

  // Census Tracts
  filters.censusTracts.forEach((tract) => {
    activeFilters.push({
      label: `Tract: ${tract}`,
      onRemove: () =>
        setFilters({
          censusTracts: filters.censusTracts.filter((t) => t !== tract),
        }),
    });
  });

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-gray-600">Active Filters:</span>
        {activeFilters.map((filter, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-800 rounded border border-primary-200"
          >
            {filter.label}
            <button
              onClick={filter.onRemove}
              className="hover:text-primary-900 focus:outline-none"
              aria-label={`Remove ${filter.label} filter`}
            >
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
});

ActiveFilters.displayName = 'ActiveFilters';
