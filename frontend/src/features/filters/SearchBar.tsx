import { useState, useEffect } from 'react';
import { useEVDataStore } from '../../store/useEVDataStore';
import { useDebounce } from '../../hooks/useDebounce';

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);
  const setFilters = useEVDataStore((state) => state.setFilters);

  // Apply debounced search to store
  useEffect(() => {
    setFilters({ searchQuery: debouncedSearch });
  }, [debouncedSearch, setFilters]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search by make, model, city, county, or VIN..."
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
        aria-label="Search electric vehicles"
      />
    </div>
  );
};
