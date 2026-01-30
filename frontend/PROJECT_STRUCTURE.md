# EV Population Analytics Dashboard - Project Structure

## Overview
This is a production-grade, frontend-only Electric Vehicle Population Analytics Dashboard built with React 18+, TypeScript, and Tailwind CSS. The project follows a feature-based architecture with proper separation of concerns.

## Technology Stack
- **React 18+** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and responsive design
- **Zustand** - Lightweight state management
- **Recharts** - Data visualization
- **PapaParse** - CSV parsing (ready for Phase 2)
- **Vite** - Build tool and dev server

## Folder Structure

```
frontend/
├── src/
│   ├── components/          # Shared/common components
│   │   ├── ErrorBoundary.tsx    # Error handling wrapper
│   │   ├── Header.tsx           # App header
│   │   └── LoadingSkeleton.tsx  # Loading state UI
│   │
│   ├── features/            # Feature-based modules
│   │   ├── dashboard/           # Main dashboard feature
│   │   │   └── Dashboard.tsx        # Dashboard layout & orchestration
│   │   ├── filters/             # Filtering feature
│   │   │   ├── FilterPanel.tsx      # Filter controls
│   │   │   └── SearchBar.tsx        # Search input
│   │   ├── table/               # Data table feature
│   │   │   └── DataTable.tsx        # Paginated table with data
│   │   └── visualizations/      # Chart components
│   │       ├── BarChartCard.tsx     # Bar chart wrapper
│   │       ├── PieChartCard.tsx     # Pie chart wrapper
│   │       └── StatsCard.tsx        # Statistics card
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useDebounce.ts       # Debounce hook for search
│   │   └── useResponsive.ts     # Responsive breakpoint detection
│   │
│   ├── store/               # State management
│   │   └── useEVDataStore.ts    # Zustand store for EV data
│   │
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts             # All app types and interfaces
│   │
│   ├── utils/               # Utility functions
│   │   ├── dataProcessing.ts    # Data filtering, aggregation, pagination
│   │   └── dummyData.ts         # Mock data for Phase 1
│   │
│   ├── constants/           # App constants
│   │   └── index.ts             # Config, colors, breakpoints
│   │
│   ├── App.tsx              # Root component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles + Tailwind
│
├── public/                  # Static assets
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── vite.config.ts           # Vite configuration
```

## Architecture Principles

### 1. Feature-Based Organization
Components are organized by feature (dashboard, filters, table, visualizations) rather than by type. This makes the codebase more scalable and easier to navigate.

### 2. Separation of Concerns
- **Components**: Pure UI presentation
- **Hooks**: Reusable logic
- **Store**: Global state management
- **Utils**: Pure functions for data processing
- **Types**: Centralized type definitions

### 3. Component Patterns
- **Container Components**: Handle data fetching and state (Dashboard)
- **Presentational Components**: Pure UI components (StatsCard, charts)
- **Memoization**: React.memo() used for expensive components to prevent unnecessary re-renders

### 4. State Management
- **Zustand Store**: Lightweight global state for EV data, filters, and UI state
- **Computed Values**: Filtered data is computed in the store
- **Local State**: Component-specific state stays local (search input)

### 5. Performance Optimizations
- **Pagination**: Table shows 50 items per page
- **Debouncing**: Search input debounced by 300ms
- **Memoization**: Charts and table rows memoized
- **Code Splitting**: Ready for React.lazy() implementation

### 6. Accessibility
- **Semantic HTML**: Proper use of header, nav, table elements
- **ARIA Labels**: All interactive elements have labels
- **Keyboard Navigation**: Full keyboard support
- **Focus Indicators**: Visible focus states with Tailwind ring utilities
- **Color Contrast**: Meets WCAG 2.1 AA standards

### 7. Responsive Design
- **Mobile-First**: Tailwind breakpoints (sm, md, lg)
- **Flexible Layouts**: Grid and flexbox for adaptive layouts
- **useResponsive Hook**: Detects device type for conditional rendering

## Key Files Explained

### `src/store/useEVDataStore.ts`
Zustand store managing:
- Raw EV data
- Filtered data (computed)
- Active filters
- UI state (loading, errors, pagination)

### `src/utils/dataProcessing.ts`
Pure functions for:
- Filtering data by multiple criteria
- Aggregating data for charts
- Pagination logic
- Extracting unique values

### `src/types/index.ts`
TypeScript interfaces for:
- EVData (vehicle records)
- FilterState (active filters)
- ChartDataPoint (chart data format)
- UIState (loading, errors, pagination)

### `src/constants/index.ts`
Application constants:
- Chart colors
- Breakpoints
- Pagination settings
- Accessibility standards

## Phase 1 Implementation Status

### ✅ Completed
- Project setup with Vite + React + TypeScript
- Tailwind CSS configuration
- Feature-based folder structure
- Zustand state management
- Dummy data (15 sample vehicles)
- Core components (Header, ErrorBoundary, LoadingSkeleton)
- Filter system (search, county, make, EV type)
- Multiple visualizations (bar charts, pie charts, stats cards)
- Paginated data table
- Responsive design (mobile, tablet, desktop)
- Accessibility features (ARIA labels, keyboard nav, focus states)
- Performance optimizations (memoization, debouncing)

### 🔄 Ready for Phase 2
- CSV file parsing with PapaParse
- Real data loading from `data-to-visualize/sample_vehicle_population_data.csv`
- Error handling for file loading
- Loading states during data fetch

## Getting Started

### Install Dependencies
```bash
cd frontend
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Next Steps (Phase 2)

1. **CSV Data Integration**
   - Implement CSV file loading
   - Parse with PapaParse
   - Handle large datasets efficiently

2. **Advanced Filtering**
   - Year range slider
   - Multi-select improvements
   - Filter presets/saved filters

3. **Additional Visualizations**
   - Geographic map view
   - Time series analysis
   - Range distribution histogram

4. **Performance Enhancements**
   - Virtual scrolling for table
   - Web Workers for data processing
   - Code splitting with React.lazy()

5. **Testing**
   - Unit tests with Vitest
   - Component tests with React Testing Library
   - E2E tests with Playwright

## Best Practices Implemented

✅ TypeScript strict mode
✅ ESLint configuration
✅ Component memoization
✅ Custom hooks for reusable logic
✅ Error boundaries
✅ Loading states
✅ Responsive design
✅ Accessibility compliance
✅ Clean code structure
✅ Type-safe development
