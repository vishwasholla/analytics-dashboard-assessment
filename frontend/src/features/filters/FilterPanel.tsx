import { memo } from 'react';
import { useEVDataStore } from '../../store/useEVDataStore';
import { getUniqueValues } from '../../utils/dataProcessing';
import { SearchBar } from './SearchBar';

export const FilterPanel = memo(() => {
  const { data, filters, setFilters, resetFilters } = useEVDataStore();

  const counties = getUniqueValues(data, 'county');
  const makes = getUniqueValues(data, 'make');
  const evTypes = ['BEV', 'PHEV'];

  const hasActiveFilters =
    filters.searchQuery ||
    filters.counties.length > 0 ||
    filters.makes.length > 0 ||
    filters.evTypes.length > 0;

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
