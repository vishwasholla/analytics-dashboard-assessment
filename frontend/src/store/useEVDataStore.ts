import { create } from 'zustand';
import type { EVDataStore, FilterState } from '../types';
import { filterEVData, getYearRange, getRangeFilter } from '../utils/dataProcessing';
import { APP_CONFIG } from '../constants';

const initialFilters: FilterState = {
  searchQuery: '',
  counties: [],
  cities: [],
  makes: [],
  models: [],
  evTypes: [],
  yearRange: [2013, 2024], // Default range
  rangeFilter: [0, 350], // Default electric range
  cafvEligibility: [],
  // Advanced filters
  includeUnknownRange: true,
  onlyUnknownRange: false,
  msrpRange: [0, 200000],
  legislativeDistricts: [],
  censusTracts: [],
};

export const useEVDataStore = create<EVDataStore>((set, get) => ({
  data: [],
  filteredData: [],
  filters: initialFilters,
  uiState: {
    isLoading: true, // Start as loading
    error: null,
    currentPage: 1,
    itemsPerPage: APP_CONFIG.ITEMS_PER_PAGE,
  },

  setData: (data) => {
    const yearRange = getYearRange(data);
    const rangeFilter = getRangeFilter(data);
    const msrps = data.map(d => d.baseMSRP).filter(m => m > 0);
    const msrpRange: [number, number] = msrps.length > 0 
      ? [0, Math.max(...msrps)] 
      : [0, 200000];
    
    const updatedFilters = { 
      ...initialFilters, 
      yearRange, 
      rangeFilter,
      msrpRange,
    };
    set({
      data,
      filteredData: data,
      filters: updatedFilters,
      uiState: {
        ...get().uiState,
        isLoading: false,
        error: null,
      },
    });
  },

  setFilters: (newFilters) => {
    const { data, filters } = get();
    let updatedFilters = { ...filters, ...newFilters };
    
    // Auto-adjust includeUnknownRange when range filter changes
    if (newFilters.rangeFilter) {
      const [newMin] = newFilters.rangeFilter;
      const [dataMin] = getRangeFilter(data);
      
      // If user increases the minimum range above 0, exclude unknown range vehicles
      if (newMin > dataMin) {
        updatedFilters.includeUnknownRange = false;
      }
      // If user resets to minimum, include unknown range vehicles
      else if (newMin === dataMin) {
        updatedFilters.includeUnknownRange = true;
      }
    }
    
    const filteredData = filterEVData(data, updatedFilters);
    
    set({
      filters: updatedFilters,
      filteredData,
      uiState: { ...get().uiState, currentPage: 1 }, // Reset to first page
    });
  },

  resetFilters: () => {
    const { data } = get();
    const yearRange = getYearRange(data);
    const rangeFilter = getRangeFilter(data);
    const msrps = data.map(d => d.baseMSRP).filter(m => m > 0);
    const msrpRange: [number, number] = msrps.length > 0 
      ? [0, Math.max(...msrps)] 
      : [0, 200000];
    
    set({
      filters: { 
        ...initialFilters, 
        yearRange, 
        rangeFilter,
        msrpRange,
      },
      filteredData: data,
      uiState: { ...get().uiState, currentPage: 1 },
    });
  },

  setUIState: (newState) => {
    set({ uiState: { ...get().uiState, ...newState } });
  },
}));
