import { memo, useState } from 'react';
import { useEVDataStore } from '../../store/useEVDataStore';
import { getUniqueValues, getRangeFilter } from '../../utils/dataProcessing';
import { SearchBar } from './SearchBar';
import { AdvancedFiltersModal } from './AdvancedFiltersModal';

export const FilterPanel = memo(() => {
  const { data, filters, setFilters, resetFilters } = useEVDataStore();
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);

  const counties = getUniqueValues(data, 'county');
  const makes = getUniqueValues(data, 'make');
  const evTypes = ['BEV', 'PHEV'];
  
  const [dataMinYear, dataMaxYear] = [
    Math.min(...data.map(d => d.modelYear).filter(y => y > 0)),
    Math.max(...data.map(d => d.modelYear).filter(y => y > 0))
  ];
  
  const [dataMinRange, dataMaxRange] = getRangeFilter(data);

  const hasActiveFilters =
    filters.searchQuery ||
    filters.counties.length > 0 ||
    filters.makes.length > 0 ||
    filters.evTypes.length > 0 ||
    filters.cafvEligibility.length > 0 ||
    filters.yearRange[0] !== dataMinYear ||
    filters.yearRange[1] !== dataMaxYear ||
    filters.rangeFilter[0] !== dataMinRange ||
    filters.rangeFilter[1] !== dataMaxRange;

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        )}
      </div>

      <SearchBar />

      <div className="space-y-3">
        <RangeSlider
          label="Model Year"
          min={dataMinYear}
          max={dataMaxYear}
          value={filters.yearRange}
          onChange={(value) => setFilters({ yearRange: value })}
        />

        <RangeSlider
          label="Electric Range (miles)"
          min={dataMinRange}
          max={dataMaxRange}
          value={filters.rangeFilter}
          onChange={(value) => setFilters({ rangeFilter: value })}
        />

        <FilterSelect
          label="County"
          options={counties}
          selected={filters.counties}
          onChange={(values) => setFilters({ counties: values })}
        />

        <FilterSelect
          label="Make"
          options={makes}
          selected={filters.makes}
          onChange={(values) => setFilters({ makes: values })}
        />

        <FilterSelect
          label="EV Type"
          options={evTypes}
          selected={filters.evTypes}
          onChange={(values) => setFilters({ evTypes: values as ('BEV' | 'PHEV')[] })}
        />
      </div>

      {/* Advanced Filters Button */}
      <button
        onClick={() => setIsAdvancedModalOpen(true)}
        className="w-full mt-4 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
      >
        <div className="flex items-center justify-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          Advanced Filters
        </div>
      </button>

      {/* Advanced Filters Modal */}
      <AdvancedFiltersModal
        isOpen={isAdvancedModalOpen}
        onClose={() => setIsAdvancedModalOpen(false)}
      />
    </div>
  );
});

FilterPanel.displayName = 'FilterPanel';

interface FilterSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}

const FilterSelect = ({ label, options, selected, onChange }: FilterSelectProps) => {
  const handleChange = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2 space-y-1">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => handleChange(option)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const RangeSlider = ({ label, min, max, value, onChange }: RangeSliderProps) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (newMin <= value[1]) {
      onChange([newMin, value[1]]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax >= value[0]) {
      onChange([value[0], newMax]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="px-2 py-3 border border-gray-200 rounded-lg space-y-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{value[0]}</span>
          <span>{value[1]}</span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min={min}
            max={max}
            value={value[0]}
            onChange={handleMinChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          <input
            type="range"
            min={min}
            max={max}
            value={value[1]}
            onChange={handleMaxChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
        </div>
      </div>
    </div>
  );
};
