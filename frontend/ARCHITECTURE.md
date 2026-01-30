# Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Interface                          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Header     │  │ LoadingSkel  │  │ErrorBoundary │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Dashboard (Main)                           │
│                                                                 │
│  ┌────────────────────┐  ┌──────────────────────────────────┐ │
│  │   FilterPanel      │  │      Main Content Area           │ │
│  │                    │  │                                  │ │
│  │  ┌──────────────┐ │  │  ┌────────────────────────────┐ │ │
│  │  │  SearchBar   │ │  │  │      Stats Cards           │ │ │
│  │  └──────────────┘ │  │  │  ┌──────┐ ┌──────┐        │ │ │
│  │                    │  │  │  │ BEV  │ │ PHEV │  ...   │ │ │
│  │  ┌──────────────┐ │  │  │  └──────┘ └──────┘        │ │ │
│  │  │County Filter │ │  │  └────────────────────────────┘ │ │
│  │  └──────────────┘ │  │                                  │ │
│  │                    │  │  ┌────────────────────────────┐ │ │
│  │  ┌──────────────┐ │  │  │    Visualizations          │ │ │
│  │  │ Make Filter  │ │  │  │  ┌──────────┐ ┌──────────┐ │ │ │
│  │  └──────────────┘ │  │  │  │BarChart  │ │PieChart  │ │ │ │
│  │                    │  │  │  └──────────┘ └──────────┘ │ │ │
│  │  ┌──────────────┐ │  │  └────────────────────────────┘ │ │
│  │  │ Type Filter  │ │  │                                  │ │
│  │  └──────────────┘ │  │  ┌────────────────────────────┐ │ │
│  └────────────────────┘  │  │      Data Table            │ │ │
│                          │  │  ┌──────────────────────┐  │ │ │
│                          │  │  │  Paginated Rows      │  │ │ │
│                          │  │  │  (50 per page)       │  │ │ │
│                          │  │  └──────────────────────┘  │ │ │
│                          │  └────────────────────────────┘ │ │
│                          └──────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    State Management (Zustand)                   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                    useEVDataStore                        │ │
│  │                                                          │ │
│  │  • data: EVData[]                                        │ │
│  │  • filteredData: EVData[]  (computed)                    │ │
│  │  • filters: FilterState                                  │ │
│  │  • uiState: UIState                                      │ │
│  │                                                          │ │
│  │  Actions:                                                │ │
│  │  • setData()                                             │ │
│  │  • setFilters()                                          │ │
│  │  • resetFilters()                                        │ │
│  │  • setUIState()                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Utilities & Helpers                        │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │ dataProcessing   │  │   dummyData      │  │  constants  │ │
│  │                  │  │                  │  │             │ │
│  │ • filterEVData() │  │ • DUMMY_EV_DATA  │  │ • COLORS    │ │
│  │ • aggregateBy()  │  │   (15 vehicles)  │  │ • CONFIG    │ │
│  │ • paginate()     │  │                  │  │ • A11Y      │ │
│  └──────────────────┘  └──────────────────┘  └─────────────┘ │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                   │
│  │  Custom Hooks    │  │   TypeScript     │                   │
│  │                  │  │                  │                   │
│  │ • useDebounce()  │  │ • EVData         │                   │
│  │ • useResponsive()│  │ • FilterState    │                   │
│  │                  │  │ • ChartDataPoint │                   │
│  └──────────────────┘  └──────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌──────────────┐
│     User     │
│  Interaction │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│  1. User types in search or selects filter          │
└──────┬───────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│  2. Component calls setFilters() on store            │
└──────┬───────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│  3. Store updates filters state                      │
└──────┬───────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│  4. Store computes filteredData using filterEVData() │
└──────┬───────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│  5. Store notifies subscribed components             │
└──────┬───────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│  6. Components re-render with new filteredData       │
└──────┬───────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│  7. Charts, table, and stats update automatically    │
└──────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
└── ErrorBoundary
    └── div (container)
        ├── Header
        └── Dashboard
            ├── FilterPanel
            │   ├── SearchBar
            │   └── FilterSelect (x3)
            │       └── Checkboxes
            └── Main Content
                ├── Stats Cards (x4)
                │   └── StatsCard
                ├── Charts Grid
                │   ├── BarChartCard (Top Makes)
                │   ├── PieChartCard (EV Types)
                │   ├── BarChartCard (Counties)
                │   └── BarChartCard (Years)
                └── DataTable
                    ├── Table
                    │   ├── TableHeader
                    │   └── TableRow (x50)
                    └── Pagination
```

## State Management Flow

```
┌─────────────────────────────────────────────────────────┐
│                   Zustand Store                         │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  State                                            │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │ data: EVData[]                              │ │ │
│  │  │ • Raw vehicle data (15 dummy vehicles)      │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │                                                   │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │ filteredData: EVData[]                      │ │ │
│  │  │ • Computed from data + filters              │ │ │
│  │  │ • Updates automatically on filter change    │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │                                                   │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │ filters: FilterState                        │ │ │
│  │  │ • searchQuery: string                       │ │ │
│  │  │ • counties: string[]                        │ │ │
│  │  │ • cities: string[]                          │ │ │
│  │  │ • makes: string[]                           │ │ │
│  │  │ • models: string[]                          │ │ │
│  │  │ • evTypes: ('BEV' | 'PHEV')[]               │ │ │
│  │  │ • yearRange: [number, number]               │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │                                                   │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │ uiState: UIState                            │ │ │
│  │  │ • isLoading: boolean                        │ │ │
│  │  │ • error: string | null                      │ │ │
│  │  │ • currentPage: number                       │ │ │
│  │  │ • itemsPerPage: number                      │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  Actions                                          │ │
│  │  • setData(data: EVData[])                        │ │
│  │  • setFilters(filters: Partial<FilterState>)     │ │
│  │  • resetFilters()                                 │ │
│  │  • setUIState(state: Partial<UIState>)           │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Responsive Breakpoints

```
Mobile (<768px)
┌─────────────────┐
│    Header       │
├─────────────────┤
│   Filters       │
├─────────────────┤
│   Stats (1col)  │
├─────────────────┤
│   Chart 1       │
├─────────────────┤
│   Chart 2       │
├─────────────────┤
│   Table         │
└─────────────────┘

Tablet (768-1024px)
┌─────────────────────────────┐
│         Header              │
├─────────────────────────────┤
│  Filters  │  Stats (2col)   │
│           ├─────────────────┤
│           │  Charts (2col)  │
│           ├─────────────────┤
│           │     Table       │
└─────────────────────────────┘

Desktop (>1024px)
┌───────────────────────────────────────┐
│              Header                   │
├──────────┬────────────────────────────┤
│ Filters  │  Stats (4col)              │
│          ├────────────────────────────┤
│          │  Charts (2x2 grid)         │
│          ├────────────────────────────┤
│          │        Table               │
└──────────┴────────────────────────────┘
```

## Performance Optimization Strategy

```
┌─────────────────────────────────────────────────────────┐
│                  Performance Layer                      │
│                                                         │
│  1. Component Memoization                               │
│     • React.memo() on expensive components              │
│     • Prevents unnecessary re-renders                   │
│     • Applied to: Charts, Table rows, Filter panel      │
│                                                         │
│  2. Debouncing                                          │
│     • Search input debounced at 300ms                   │
│     • Reduces filter computations                       │
│     • Custom useDebounce hook                           │
│                                                         │
│  3. Pagination                                          │
│     • Only render 50 rows at a time                     │
│     • Reduces DOM nodes                                 │
│     • Smooth page transitions                           │
│                                                         │
│  4. Computed Values                                     │
│     • filteredData computed in store                    │
│     • Chart data aggregated on-demand                   │
│     • Efficient selectors                               │
│                                                         │
│  5. Code Splitting (Ready)                              │
│     • React.lazy() infrastructure ready                 │
│     • Dynamic imports for routes                        │
│     • Chunk optimization                                │
└─────────────────────────────────────────────────────────┘
```

## Type System

```
┌─────────────────────────────────────────────────────────┐
│                    Type Hierarchy                       │
│                                                         │
│  EVData (Core Entity)                                   │
│  ├── vin: string                                        │
│  ├── county: string                                     │
│  ├── city: string                                       │
│  ├── state: string                                      │
│  ├── postalCode: string                                 │
│  ├── modelYear: number                                  │
│  ├── make: string                                       │
│  ├── model: string                                      │
│  ├── evType: 'BEV' | 'PHEV'                             │
│  ├── cafvEligibility: string                            │
│  ├── electricRange: number                              │
│  ├── baseMSRP: number                                   │
│  ├── legislativeDistrict: string                        │
│  ├── dolVehicleId: string                               │
│  ├── vehicleLocation: string                            │
│  ├── electricUtility: string                            │
│  └── censusTract: string                                │
│                                                         │
│  FilterState                                            │
│  ├── searchQuery: string                                │
│  ├── counties: string[]                                 │
│  ├── cities: string[]                                   │
│  ├── makes: string[]                                    │
│  ├── models: string[]                                   │
│  ├── evTypes: ('BEV' | 'PHEV')[]                        │
│  └── yearRange: [number, number]                        │
│                                                         │
│  ChartDataPoint                                         │
│  ├── name: string                                       │
│  ├── value: number                                      │
│  └── [key: string]: string | number                     │
│                                                         │
│  UIState                                                │
│  ├── isLoading: boolean                                 │
│  ├── error: string | null                               │
│  ├── currentPage: number                                │
│  └── itemsPerPage: number                               │
└─────────────────────────────────────────────────────────┘
```

## Accessibility Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Accessibility Layer (WCAG 2.1 AA)          │
│                                                         │
│  1. Semantic HTML                                       │
│     • <header>, <nav>, <main>, <table>                  │
│     • Proper heading hierarchy (h1, h2, h3)             │
│     • <button> for actions, <a> for links               │
│                                                         │
│  2. ARIA Attributes                                     │
│     • aria-label on all interactive elements            │
│     • aria-current for pagination                       │
│     • aria-hidden for decorative icons                  │
│                                                         │
│  3. Keyboard Navigation                                 │
│     • Tab order follows visual flow                     │
│     • Enter/Space activate buttons                      │
│     • Escape closes modals (future)                     │
│                                                         │
│  4. Focus Management                                    │
│     • Visible focus indicators (ring-2)                 │
│     • Focus trap in modals (future)                     │
│     • Skip to content link (future)                     │
│                                                         │
│  5. Color Contrast                                      │
│     • Text: 4.5:1 minimum                               │
│     • Interactive elements: 3:1 minimum                 │
│     • Tested with contrast checker                      │
│                                                         │
│  6. Screen Reader Support                               │
│     • Descriptive labels                                │
│     • Status announcements                              │
│     • Table headers properly associated                 │
└─────────────────────────────────────────────────────────┘
```

## Build & Deployment Pipeline

```
┌─────────────────────────────────────────────────────────┐
│                  Development                            │
│                                                         │
│  npm run dev                                            │
│  ├── Vite dev server                                    │
│  ├── Hot module replacement                             │
│  ├── TypeScript checking                                │
│  └── Tailwind JIT compilation                           │
└─────────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    Build                                │
│                                                         │
│  npm run build                                          │
│  ├── TypeScript compilation (tsc -b)                    │
│  ├── Vite production build                              │
│  ├── CSS optimization (PurgeCSS)                        │
│  ├── JS minification (esbuild)                          │
│  └── Asset optimization                                 │
│                                                         │
│  Output:                                                │
│  ├── dist/index.html (0.46 KB)                          │
│  ├── dist/assets/index-[hash].css (15.80 KB)           │
│  └── dist/assets/index-[hash].js (631.31 KB)           │
└─────────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  Deployment                             │
│                                                         │
│  npm run preview                                        │
│  └── Preview production build locally                   │
│                                                         │
│  Deploy to:                                             │
│  ├── Vercel                                             │
│  ├── Netlify                                            │
│  ├── GitHub Pages                                       │
│  └── Any static host                                    │
└─────────────────────────────────────────────────────────┘
```

---

This architecture provides a solid foundation for Phase 1 and is designed to scale seamlessly into Phase 2 with real CSV data integration.
