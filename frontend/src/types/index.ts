// Raw CSV Row Type (as parsed from CSV)
export interface RawCSVRow {
  'VIN (1-10)': string;
  'County': string;
  'City': string;
  'State': string;
  'Postal Code': string;
  'Model Year': string;
  'Make': string;
  'Model': string;
  'Electric Vehicle Type': string;
  'Clean Alternative Fuel Vehicle (CAFV) Eligibility': string;
  'Electric Range': string;
  'Base MSRP': string;
  'Legislative District': string;
  'DOL Vehicle ID': string;
  'Vehicle Location': string;
  'Electric Utility': string;
  '2020 Census Tract': string;
}

// Processed EV Data Types
export interface EVData {
  vin: string;
  county: string;
  city: string;
  state: string;
  postalCode: string;
  modelYear: number;
  make: string;
  model: string;
  evType: 'BEV' | 'PHEV';
  cafvEligibility: string;
  electricRange: number;
  baseMSRP: number;
  legislativeDistrict: string;
  dolVehicleId: string;
  vehicleLocation: string;
  electricUtility: string;
  censusTract: string;
}

// Filter Types
export interface FilterState {
  searchQuery: string;
  counties: string[];
  cities: string[];
  makes: string[];
  models: string[];
  evTypes: ('BEV' | 'PHEV')[];
  yearRange: [number, number];
}

// Chart Data Types
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

// UI State Types
export interface UIState {
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
}

// Store Types
export interface EVDataStore {
  data: EVData[];
  filteredData: EVData[];
  filters: FilterState;
  uiState: UIState;
  setData: (data: EVData[]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  setUIState: (state: Partial<UIState>) => void;
}

// CSV Parsing Types
export interface CSVParseResult {
  data: EVData[];
  errors: CSVParseError[];
  meta: {
    totalRows: number;
    validRows: number;
    invalidRows: number;
  };
}

export interface CSVParseError {
  row: number;
  field: string;
  message: string;
  rawValue: string;
}

// Aggregated Statistics Types
export interface AggregatedStats {
  totalVehicles: number;
  bevCount: number;
  phevCount: number;
  avgRange: number;
  avgMSRP: number;
  uniqueMakes: number;
  uniqueModels: number;
  yearRange: [number, number];
}

export interface GroupedData {
  byMake: Record<string, number>;
  byModel: Record<string, number>;
  byCounty: Record<string, number>;
  byCity: Record<string, number>;
  byYear: Record<number, number>;
  byEVType: Record<string, number>;
  byCafvEligibility: Record<string, number>;
}

// Range Statistics
export interface RangeStatistics {
  min: number;
  max: number;
  avg: number;
  median: number;
  distribution: {
    range: string;
    count: number;
  }[];
}

// Data Loading State
export interface DataLoadingState {
  isLoading: boolean;
  progress: number;
  error: string | null;
  stage: 'idle' | 'fetching' | 'parsing' | 'processing' | 'complete' | 'error';
}
