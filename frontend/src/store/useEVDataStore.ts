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
    const updatedFilters = { ...initialFilters, yearRange, rangeFilter };
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
    const updatedFilters = { ...filters, ...newFilters };
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
    set({
      filters: { ...initialFilters, yearRange, rangeFilter },
      filteredData: data,
      uiState: { ...get().uiState, currentPage: 1 },
    });
  },

  setUIState: (newState) => {
    set({ uiState: { ...get().uiState, ...newState } });
  },
}));
