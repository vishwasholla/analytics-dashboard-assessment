# Data Processing Layer Guide

## Overview

This guide documents the robust data processing layer built for the EV Population Analytics Dashboard. The system handles CSV parsing, data validation, transformation, filtering, aggregation, and real-time search.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CSV Data Source                         │
│              (sample_vehicle_population_data.csv)           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   CSV Parser Layer                          │
│                  (src/utils/csvParser.ts)                   │
│                                                             │
│  • parseCSVFromURL()  - Fetch and parse from URL           │
│  • parseCSVFile()     - Parse uploaded file                 │
│  • parseCSVText()     - Parse text content                  │
│  • transformRow()     - Validate and transform              │
│  • parseEVType()      - Normalize EV types                  │
│  • parseNumber()      - Safe numeric parsing                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Data Processing Layer                      │
│              (src/utils/dataProcessing.ts)                  │
│                                                             │
│  • filterEVData()         - Multi-criteria filtering        │
│  • calculateStats()       - Aggregate statistics            │
│  • groupData()            - Multi-dimensional grouping      │
│  • aggregateByField()     - Chart data preparation          │
│  • calculateRangeStats()  - Range analysis                  │
│  • searchVehicles()       - Full-text search                │
│  • paginateData()         - Pagination logic                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    State Management                         │
│                (src/store/useEVDataStore.ts)                │
│                                                             │
│  • data: EVData[]           - Raw vehicle data              │
│  • filteredData: EVData[]   - Filtered results              │
│  • filters: FilterState     - Active filters                │
│  • uiState: UIState         - UI state                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    UI Components                            │
│                                                             │
│  • Dashboard    - Main layout                               │
│  • FilterPanel  - Filter controls                           │
│  • Charts       - Data visualizations                       │
│  • DataTable    - Paginated table                           │
└─────────────────────────────────────────────────────────────┘
```

## CSV Parser Module

### File: `src/utils/csvParser.ts`

#### Functions

##### 1. `parseCSVFromURL(url: string): Promise<CSVParseResult>`

Fetches and parses a CSV file from a URL.

**Usage:**
```typescript
const result = await parseCSVFromURL('/data/vehicles.csv');
console.log(`Loaded ${result.data.length} vehicles`);
console.log(`Errors: ${result.errors.length}`);
```

**Returns:**
```typescript
{
  data: EVData[],           // Successfully parsed vehicles
  errors: CSVParseError[],  // Parsing errors
  meta: {
    totalRows: number,      // Total rows in CSV
    validRows: number,      // Successfully parsed rows
    invalidRows: number     // Rows with errors
  }
}
```

##### 2. `parseCSVFile(file: File): Promise<CSVParseResult>`

Parses an uploaded CSV file.

**Usage:**
```typescript
const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const result = await parseCSVFile(file);
    setData(result.data);
  }
};
```

##### 3. `parseCSVText(csvText: string): Promise<CSVParseResult>`

Parses CSV content from a string.

**Usage:**
```typescript
const csvContent = `VIN,Make,Model\nTEST001,Tesla,Model 3`;
const result = await parseCSVText(csvContent);
```

#### Helper Functions

##### `parseEVType(type: string): 'BEV' | 'PHEV'`

Normalizes EV type strings to standard format.

**Examples:**
```typescript
parseEVType('Battery Electric Vehicle (BEV)') // → 'BEV'
parseEVType('Plug-in Hybrid Electric Vehicle (PHEV)') // → 'PHEV'
parseEVType('BEV') // → 'BEV'
```

##### `parseNumber(value: string, defaultValue: number): number`

Safely parses numeric values with fallback.

**Examples:**
```typescript
parseNumber('272', 0)    // → 272
parseNumber('', 0)       // → 0
parseNumber('invalid', 0) // → 0
```

##### `transformRow(row: RawCSVRow, rowIndex: number)`

Validates and transforms a raw CSV row into typed EVData.

**Validation Rules:**
- VIN is required
- Make is required
- Model Year must be between 1900-2030
- Numeric fields default to 0 if invalid
- Empty strings default to 'Unknown'

## Data Processing Module

### File: `src/utils/dataProcessing.ts`

#### Core Functions

##### 1. `filterEVData(data: EVData[], filters: FilterState): EVData[]`

Filters vehicle data based on multiple criteria using AND logic.

**Filter Criteria:**
- Search query (searches: make, model, city, county, VIN, evType)
- Counties (multi-select)
- Cities (multi-select)
- Makes (multi-select)
- Models (multi-select)
- EV Types (BEV/PHEV)
- Year range (min/max)

**Usage:**
```typescript
const filters: FilterState = {
  searchQuery: 'tesla',
  counties: ['King'],
  cities: [],
  makes: [],
  models: [],
  evTypes: ['BEV'],
  yearRange: [2020, 2024],
};

const filtered = filterEVData(allVehicles, filters);
```

**Performance:** O(n) single-pass algorithm with early exit optimization.

##### 2. `calculateStats(data: EVData[]): AggregatedStats`

Computes aggregate statistics from vehicle data.

**Returns:**
```typescript
{
  totalVehicles: number,    // Total count
  bevCount: number,         // BEV count
  phevCount: number,        // PHEV count
  avgRange: number,         // Average electric range
  avgMSRP: number,          // Average MSRP (excluding 0 values)
  uniqueMakes: number,      // Number of unique makes
  uniqueModels: number,     // Number of unique models
  yearRange: [number, number] // [min year, max year]
}
```

**Usage:**
```typescript
const stats = calculateStats(vehicles);
console.log(`Total: ${stats.totalVehicles}`);
console.log(`BEV: ${stats.bevCount}, PHEV: ${stats.phevCount}`);
console.log(`Avg Range: ${stats.avgRange} miles`);
```

##### 3. `groupData(data: EVData[]): GroupedData`

Groups data by multiple dimensions for analysis.

**Returns:**
```typescript
{
  byMake: Record<string, number>,              // Tesla: 150
  byModel: Record<string, number>,             // Tesla Model 3: 75
  byCounty: Record<string, number>,            // King: 500
  byCity: Record<string, number>,              // Seattle: 300
  byYear: Record<number, number>,              // 2023: 200
  byEVType: Record<string, number>,            // BEV: 800
  byCafvEligibility: Record<string, number>    // Eligible: 700
}
```

**Usage:**
```typescript
const grouped = groupData(vehicles);
console.log(`Tesla vehicles: ${grouped.byMake['Tesla']}`);
console.log(`King County: ${grouped.byCounty['King']}`);
```

##### 4. `aggregateByField(data: EVData[], field: keyof EVData, limit?: number): ChartDataPoint[]`

Aggregates data by a specific field for chart visualization.

**Parameters:**
- `data` - Vehicle data array
- `field` - Field to aggregate by (e.g., 'make', 'county', 'modelYear')
- `limit` - Optional limit for top N items (creates "Others" category)

**Returns:**
```typescript
[
  { name: 'Tesla', value: 150 },
  { name: 'Nissan', value: 80 },
  { name: 'Chevrolet', value: 60 },
  { name: 'Others', value: 110 }  // If limit is set
]
```

**Usage:**
```typescript
// Top 10 makes
const topMakes = aggregateByField(vehicles, 'make', 10);

// All counties
const allCounties = aggregateByField(vehicles, 'county');

// Vehicles by year
const byYear = aggregateByField(vehicles, 'modelYear');
```

##### 5. `calculateRangeStats(data: EVData[]): RangeStatistics`

Analyzes electric range distribution.

**Returns:**
```typescript
{
  min: number,              // Minimum range
  max: number,              // Maximum range
  avg: number,              // Average range
  median: number,           // Median range
  distribution: [           // Range buckets
    { range: '0-50', count: 10 },
    { range: '51-100', count: 25 },
    { range: '101-150', count: 40 },
    { range: '151-200', count: 60 },
    { range: '201-250', count: 80 },
    { range: '251-300', count: 100 },
    { range: '301+', count: 50 }
  ]
}
```

**Usage:**
```typescript
const rangeStats = calculateRangeStats(vehicles);
console.log(`Range: ${rangeStats.min} - ${rangeStats.max} miles`);
console.log(`Average: ${rangeStats.avg} miles`);
console.log(`Median: ${rangeStats.median} miles`);
```

##### 6. `searchVehicles(data: EVData[], query: string): EVData[]`

Full-text search across multiple fields.

**Searchable Fields:**
- Make
- Model
- City
- County
- VIN
- EV Type

**Features:**
- Case-insensitive
- Partial matching
- Returns empty array for empty query

**Usage:**
```typescript
const results = searchVehicles(vehicles, 'tesla');
const seattleVehicles = searchVehicles(vehicles, 'seattle');
const vinSearch = searchVehicles(vehicles, '5YJ3E1EA');
```

##### 7. `paginateData<T>(data: T[], page: number, itemsPerPage: number): T[]`

Paginates data for display.

**Parameters:**
- `data` - Array to paginate
- `page` - Page number (1-based)
- `itemsPerPage` - Items per page

**Usage:**
```typescript
const page1 = paginateData(vehicles, 1, 50); // First 50
const page2 = paginateData(vehicles, 2, 50); // Next 50
```

##### 8. `getTotalPages(totalItems: number, itemsPerPage: number): number`

Calculates total number of pages.

**Usage:**
```typescript
const totalPages = getTotalPages(1000, 50); // 20 pages
```

##### 9. `getUniqueValues<T>(data: EVData[], field: keyof EVData): string[]`

Extracts unique values from a field.

**Features:**
- Filters out 'Unknown' values
- Returns sorted array
- Type-safe field selection

**Usage:**
```typescript
const makes = getUniqueValues(vehicles, 'make');
const counties = getUniqueValues(vehicles, 'county');
const cities = getUniqueValues(vehicles, 'city');
```

##### 10. `getYearRange(data: EVData[]): [number, number]`

Calculates min and max model years.

**Usage:**
```typescript
const [minYear, maxYear] = getYearRange(vehicles);
console.log(`Years: ${minYear} - ${maxYear}`);
```

## Custom Hooks

### File: `src/hooks/useCSVData.ts`

#### `useCSVData(csvPath: string): UseCSVDataResult`

Custom hook for loading and parsing CSV data.

**Returns:**
```typescript
{
  data: EVData[],              // Parsed vehicle data
  loading: DataLoadingState,   // Loading state
  errors: CSVParseError[],     // Parsing errors
  reload: () => void           // Reload function
}
```

**Loading States:**
```typescript
{
  isLoading: boolean,
  progress: number,            // 0-100
  error: string | null,
  stage: 'idle' | 'fetching' | 'parsing' | 'processing' | 'complete' | 'error'
}
```

**Usage:**
```typescript
function MyComponent() {
  const { data, loading, errors, reload } = useCSVData('/data/vehicles.csv');

  if (loading.isLoading) {
    return <LoadingSpinner progress={loading.progress} />;
  }

  if (loading.error) {
    return <ErrorMessage error={loading.error} onRetry={reload} />;
  }

  return <DataDisplay data={data} />;
}
```

## Type Definitions

### File: `src/types/index.ts`

#### Core Types

```typescript
// Raw CSV row (as parsed from file)
interface RawCSVRow {
  'VIN (1-10)': string;
  'County': string;
  'City': string;
  // ... all CSV columns
}

// Processed vehicle data
interface EVData {
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

// Filter state
interface FilterState {
  searchQuery: string;
  counties: string[];
  cities: string[];
  makes: string[];
  models: string[];
  evTypes: ('BEV' | 'PHEV')[];
  yearRange: [number, number];
}

// Aggregated statistics
interface AggregatedStats {
  totalVehicles: number;
  bevCount: number;
  phevCount: number;
  avgRange: number;
  avgMSRP: number;
  uniqueMakes: number;
  uniqueModels: number;
  yearRange: [number, number];
}

// Grouped data
interface GroupedData {
  byMake: Record<string, number>;
  byModel: Record<string, number>;
  byCounty: Record<string, number>;
  byCity: Record<string, number>;
  byYear: Record<number, number>;
  byEVType: Record<string, number>;
  byCafvEligibility: Record<string, number>;
}

// Range statistics
interface RangeStatistics {
  min: number;
  max: number;
  avg: number;
  median: number;
  distribution: {
    range: string;
    count: number;
  }[];
}

// CSV parse result
interface CSVParseResult {
  data: EVData[];
  errors: CSVParseError[];
  meta: {
    totalRows: number;
    validRows: number;
    invalidRows: number;
  };
}

// CSV parse error
interface CSVParseError {
  row: number;
  field: string;
  message: string;
  rawValue: string;
}
```

## Error Handling

### Validation Errors

The system handles various data quality issues:

1. **Missing Required Fields**
   - VIN is required
   - Make is required
   - Row is skipped if critical fields missing

2. **Invalid Data Types**
   - Non-numeric values in numeric fields → defaults to 0
   - Invalid year ranges → validation error logged

3. **Malformed Data**
   - Empty strings → defaults to 'Unknown'
   - Null values → defaults based on field type

### Error Reporting

```typescript
// Errors are collected during parsing
const result = await parseCSVFromURL('/data/vehicles.csv');

if (result.errors.length > 0) {
  console.warn(`${result.errors.length} parsing errors:`);
  result.errors.forEach(error => {
    console.log(`Row ${error.row}, Field: ${error.field}`);
    console.log(`Message: ${error.message}`);
    console.log(`Value: ${error.rawValue}`);
  });
}
```

## Performance Considerations

### 1. Filtering
- **Algorithm**: Single-pass O(n) with early exit
- **Optimization**: Short-circuit evaluation on non-matches
- **Memory**: Creates new array, original data unchanged

### 2. Aggregation
- **Algorithm**: Single-pass O(n) with hash map
- **Optimization**: Memoized in components with React.memo()
- **Memory**: Efficient hash map storage

### 3. Search
- **Algorithm**: Linear search O(n)
- **Optimization**: Debounced input (300ms)
- **Memory**: Case-insensitive comparison

### 4. Pagination
- **Algorithm**: Array slicing O(1)
- **Optimization**: Only renders visible rows
- **Memory**: Minimal, uses array slice

## Testing

### Unit Tests

See `src/utils/__tests__/dataProcessing.test.ts` for comprehensive test suite.

**Test Coverage:**
- ✅ Filter by search query
- ✅ Filter by county
- ✅ Filter by make
- ✅ Filter by EV type
- ✅ Filter by year range
- ✅ Combined filters (AND logic)
- ✅ Unique value extraction
- ✅ Data aggregation
- ✅ Statistics calculation
- ✅ Range analysis
- ✅ Pagination
- ✅ Search functionality

**Run Tests:**
```bash
npm install -D vitest
npm test
```

## Best Practices

### 1. Type Safety
- Always use TypeScript interfaces
- Avoid `any` types
- Use type guards for runtime checks

### 2. Error Handling
- Validate all user input
- Provide fallback values
- Log errors for debugging
- Show user-friendly messages

### 3. Performance
- Memoize expensive computations
- Debounce user input
- Use pagination for large datasets
- Avoid unnecessary re-renders

### 4. Data Quality
- Validate on parse
- Normalize values (EV types, strings)
- Handle missing data gracefully
- Filter out invalid records

## Common Patterns

### Pattern 1: Load and Display Data

```typescript
function Dashboard() {
  const { data, loading } = useCSVData('/data/vehicles.csv');
  const { filteredData, setData } = useEVDataStore();

  useEffect(() => {
    if (data.length > 0) {
      setData(data);
    }
  }, [data, setData]);

  if (loading.isLoading) return <Loading />;
  
  return <DataDisplay data={filteredData} />;
}
```

### Pattern 2: Filter Data

```typescript
function FilterPanel() {
  const { filters, setFilters } = useEVDataStore();

  const handleCountyChange = (counties: string[]) => {
    setFilters({ counties });
  };

  return <MultiSelect options={counties} onChange={handleCountyChange} />;
}
```

### Pattern 3: Display Statistics

```typescript
function StatsPanel() {
  const filteredData = useEVDataStore(state => state.filteredData);
  const stats = calculateStats(filteredData);

  return (
    <>
      <StatCard title="Total" value={stats.totalVehicles} />
      <StatCard title="BEV" value={stats.bevCount} />
      <StatCard title="PHEV" value={stats.phevCount} />
      <StatCard title="Avg Range" value={`${stats.avgRange} mi`} />
    </>
  );
}
```

### Pattern 4: Create Charts

```typescript
function ChartsPanel() {
  const filteredData = useEVDataStore(state => state.filteredData);
  const makeData = aggregateByField(filteredData, 'make', 10);
  const yearData = aggregateByField(filteredData, 'modelYear');

  return (
    <>
      <BarChart data={makeData} title="Top Makes" />
      <LineChart data={yearData} title="By Year" />
    </>
  );
}
```

---

## Summary

The data processing layer provides:
- ✅ Robust CSV parsing with validation
- ✅ Type-safe data transformation
- ✅ Efficient filtering and search
- ✅ Comprehensive aggregation
- ✅ Real-time statistics
- ✅ Error handling and recovery
- ✅ Performance optimizations
- ✅ Extensive test coverage

This architecture ensures data quality, performance, and maintainability while providing a great user experience.
