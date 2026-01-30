# Kiro Prompts for Electric Vehicle Dashboard Development

## Prompt 1: Project Setup & Architecture

```
I need to create a production-grade Electric Vehicle Population Analytics Dashboard. Here are the requirements:

PROJECT CONTEXT:
- Frontend-only dashboard for visualizing EV population data
- Dataset: CSV with 17 columns including VIN, County, City, Make, Model, Year, EV Type, Range, etc.
- Target: Clean, responsive, performant dashboard for data exploration

TECHNICAL REQUIREMENTS:
- Modern React 18+ with TypeScript
- Component-based architecture with proper separation of concerns
- State management using Context API or Zustand (lightweight)
- Styling with Tailwind CSS for responsive design
- Chart library: Recharts or Chart.js for visualizations
- CSV parsing: PapaParse for efficient data handling

CORE FEATURES TO IMPLEMENT:
1. Data loading and parsing with error handling
2. Multiple interactive visualizations (charts, graphs, tables)
3. Filtering and search capabilities
4. Responsive design (mobile, tablet, desktop)
5. Performance optimizations (pagination, lazy loading, virtualization)
6. Accessibility compliance (WCAG 2.1 AA)

BEST PRACTICES TO FOLLOW:
- Use React.memo() for expensive components
- Implement code splitting with React.lazy()
- Add loading states and skeleton screens
- Error boundaries for graceful error handling
- Type-safe development with TypeScript
- ESLint and Prettier for code quality
- Semantic HTML5 elements
- PropTypes or TypeScript interfaces

Please create the initial project structure with:
1. Folder structure following feature-based organization
2. Main App component with routing (if needed)
3. TypeScript configuration
4. Essential utility functions for data processing
5. Custom hooks for data fetching and filtering
6. Constants file for configuration

Generate the complete folder structure and explain the purpose of each directory.
```

---

## Prompt 2: Data Processing & Management Layer

```
Create a robust data processing layer for the EV dashboard with the following specifications:

DATA STRUCTURE (CSV Columns):
- VIN (1-10), County, City, State, Postal Code, Model Year, Make, Model
- Electric Vehicle Type, CAFV Eligibility, Electric Range, Base MSRP
- Legislative District, DOL Vehicle ID, Vehicle Location, Electric Utility, 2020 Census Tract

REQUIREMENTS:
1. CSV Parser Setup:
   - Use PapaParse for efficient parsing
   - Handle malformed data gracefully
   - Implement validation for each field type
   - Convert numeric fields appropriately
   - Handle missing/null values with defaults

2. Data Processing Functions:
   - Parse and validate CSV data
   - Transform raw data into typed interfaces
   - Calculate derived metrics (totals, averages, distributions)
   - Group data by multiple dimensions (year, make, county, type)
   - Filter data based on multiple criteria

3. Data Aggregation:
   - Total vehicles by make and model
   - Distribution by EV type (BEV vs PHEV)
   - Geographic distribution (county/city level)
   - Year-over-year trends (2013-2024)
   - Electric range statistics
   - CAFV eligibility breakdown
   - Top manufacturers and models

4. Performance Optimizations:
   - Memoize expensive calculations
   - Cache aggregated results
   - Implement pagination helpers (skip/take logic)
   - Create efficient search/filter algorithms
   - Use Web Workers for heavy computations (optional)

5. Type Definitions:
   Create TypeScript interfaces for:
   - Raw CSV row
   - Processed vehicle data
   - Aggregated statistics
   - Filter criteria
   - Chart data formats

6. Error Handling:
   - Validation errors with descriptive messages
   - Fallback values for missing data
   - User-friendly error messages

Please generate:
1. Complete data processing utilities file
2. TypeScript interfaces/types
3. Custom hooks for data operations (useEVData, useFilteredData, useAggregations)
4. Unit test examples for critical functions
5. Constants for field mappings and defaults
```

---

## Prompt 3: Dashboard Layout & Design System

```
Design a modern, professional dashboard layout with excellent UX/UI. Follow these specifications:

DESIGN PRINCIPLES:
- Clean, minimalist aesthetic
- Professional color scheme (blues, greens for eco-friendly theme)
- Consistent spacing and typography
- Clear visual hierarchy
- Intuitive navigation

LAYOUT STRUCTURE:
1. Header Section:
   - Dashboard title and description
   - Quick statistics cards (total vehicles, avg range, top make)
   - Date range or data summary
   - Dark mode toggle (optional)

2. Filter/Control Panel:
   - Multi-select dropdowns for Make, Model, County
   - Year range slider
   - EV Type filter (BEV/PHEV)
   - CAFV eligibility toggle
   - Electric range slider
   - Search bar for quick filtering
   - Clear all filters button
   - Show active filter count

3. Main Content Area:
   - Grid layout for charts (responsive: 1 col mobile, 2 cols tablet, 3 cols desktop)
   - Each chart in a card component
   - Consistent card styling with shadows and borders

4. Responsive Breakpoints:
   - Mobile: < 640px (1 column)
   - Tablet: 640px - 1024px (2 columns)
   - Desktop: > 1024px (3 columns)
   - Large: > 1440px (4 columns for some sections)

COMPONENT STRUCTURE:
1. Layout Components:
   - DashboardLayout (main container)
   - Header (statistics and title)
   - FilterPanel (all filters)
   - ContentGrid (chart container)
   - Footer (data source, last updated)

2. UI Components:
   - Card (reusable container)
   - StatCard (metric display)
   - Select/Dropdown (custom styled)
   - RangeSlider (year/range selection)
   - SearchInput (with debounce)
   - LoadingSpinner
   - ErrorBoundary
   - EmptyState (no data message)

3. Chart Components (to be detailed in next prompt):
   - BarChart, LineChart, PieChart, MapChart, Table

STYLING APPROACH:
- Use Tailwind CSS utilities
- Create custom theme configuration
- Implement dark mode support
- Add smooth transitions and hover effects
- Ensure proper contrast ratios for accessibility

ACCESSIBILITY:
- ARIA labels for all interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Semantic HTML elements

Please generate:
1. Complete DashboardLayout component
2. Header with stat cards component
3. Comprehensive FilterPanel component with all controls
4. Reusable Card component
5. Tailwind configuration file with custom theme
6. CSS utilities for common patterns
7. Responsive grid system implementation
```

---

## Prompt 4: Interactive Visualizations

```
Create comprehensive, interactive data visualizations for the EV dashboard using Recharts or Chart.js:

REQUIRED VISUALIZATIONS:

1. TOTAL VEHICLES BY MAKE (Bar Chart):
   - Top 10-15 manufacturers
   - Horizontal bar chart for better label readability
   - Interactive tooltips showing exact counts
   - Color-coded bars
   - Responsive sizing
   - Sort by count (descending)

2. EV TYPE DISTRIBUTION (Pie/Donut Chart):
   - BEV vs PHEV breakdown
   - Percentage labels
   - Color legend
   - Interactive hover effects
   - Center label showing total

3. VEHICLES BY MODEL YEAR (Line Chart):
   - Time series from 2013-2024
   - Show growth trend
   - Interactive points
   - Grid lines for readability
   - Responsive axis labels

4. TOP MODELS (Bar Chart):
   - Top 15 vehicle models
   - Show manufacturer name with model
   - Sorted by popularity
   - Different color per manufacturer

5. GEOGRAPHIC DISTRIBUTION (Interactive Table or Map):
   - Vehicles by county
   - Sortable columns
   - Pagination (25 rows per page)
   - Search within table
   - Export to CSV option
   - Alternating row colors

6. ELECTRIC RANGE DISTRIBUTION (Histogram):
   - Range buckets (0-50, 51-100, 101-150, etc.)
   - Show frequency
   - Different colors for BEV vs PHEV

7. CAFV ELIGIBILITY (Stacked Bar or Donut):
   - Breakdown of eligibility categories
   - Percentage and count labels
   - Color-coded categories

8. YEARLY TREND BY EV TYPE (Stacked Area Chart):
   - BEV and PHEV over time
   - Color fill for each type
   - Total vehicles line overlay

CHART SPECIFICATIONS:
- Consistent color palette across all charts
- Smooth animations on load and update
- Loading skeletons for each chart
- Error states with retry option
- Empty states with helpful messages
- Responsive sizing (width: 100%, height: auto with min/max)
- Interactive legends (click to show/hide)
- Tooltips with formatted data
- Export functionality (PNG/SVG for charts)

PERFORMANCE OPTIMIZATIONS:
- Lazy load charts (only render when in viewport)
- Debounce filter updates
- Memoize chart data transformations
- Use React.memo for chart components
- Implement virtualization for large tables

DATA TRANSFORMATION:
- Create helper functions to transform EV data into chart formats
- Handle missing or zero values
- Format numbers with thousands separators
- Format percentages to 1 decimal place
- Sort data appropriately for each visualization

Please generate:
1. Individual chart components for each visualization
2. Chart wrapper component with loading/error states
3. Data transformation utilities for each chart type
4. Reusable ChartContainer component
5. Interactive tooltip components
6. Chart color palette constants
7. Export functionality for charts
8. Responsive chart sizing logic
```

---

## Prompt 5: Filtering System & Search

```
Implement a comprehensive, high-performance filtering system:

FILTER TYPES:

1. Multi-Select Filters:
   - Make (manufacturer)
   - Model (vehicle model)
   - County
   - City
   - Electric Utility
   - CAFV Eligibility Status

2. Range Filters:
   - Model Year (slider: 2013-2024)
   - Electric Range (slider: 0-350+ miles)

3. Toggle Filters:
   - EV Type (BEV/PHEV checkboxes)

4. Search Filter:
   - Global search across Make, Model, City, County
   - Real-time search with debouncing (300ms)
   - Highlight matched terms

FILTER FEATURES:

1. Multi-Select Dropdown:
   - Custom dropdown component (don't use native select for multi-select)
   - Checkbox list with search
   - "Select All" and "Clear All" options
   - Show selected count in dropdown trigger
   - Virtual scrolling for large option lists
   - Accessible keyboard navigation

2. Range Slider:
   - Dual-handle slider for min/max selection
   - Show current values
   - Preset quick filters (e.g., "100+ miles")
   - Snap to meaningful increments

3. Filter State Management:
   - Use useReducer or Zustand for filter state
   - Persist filters to URL query parameters
   - Support browser back/forward navigation
   - Save user preferences to localStorage
   - Clear all filters with one click

4. Filter Panel UI:
   - Collapsible sections for mobile
   - Active filter badges (closeable)
   - Filter result count ("Showing 234 of 1,000 vehicles")
   - Loading indicator during filtering
   - Smooth transitions

5. Performance:
   - Debounce text search (300ms)
   - Debounce slider updates (200ms)
   - Memoize filter operations
   - Use Web Workers for large dataset filtering
   - Implement progressive filtering (filter on filter change, not on every keystroke)

FILTER LOGIC:

1. Combine Filters (AND Logic):
   - Apply all active filters simultaneously
   - Show 0 results if no matches
   - Suggest removing filters if results too few

2. Smart Filtering:
   - Case-insensitive search
   - Partial matching for search
   - Trim whitespace
   - Handle special characters

3. Filter Validation:
   - Prevent invalid filter combinations
   - Show warnings for contradictory filters
   - Reset dependent filters when parent changes

Please generate:
1. Complete FilterPanel component with all filter types
2. Custom MultiSelect dropdown component
3. Custom RangeSlider component
4. useFilter custom hook for state management
5. Filter utility functions (apply filters, combine filters)
6. URL sync utilities for filter persistence
7. Filter reducer or Zustand store
8. Active filter badge component
9. Clear filters button with confirmation
10. Performance optimization with useMemo/useCallback
```

---

## Prompt 6: Data Table with Advanced Features

```
Create a production-grade data table component for displaying EV records:

TABLE REQUIREMENTS:

1. CORE FEATURES:
   - Display all vehicle records
   - Sortable columns (click header to sort)
   - Pagination (25, 50, 100, 250 rows per page)
   - Column visibility toggle (show/hide columns)
   - Responsive table (horizontal scroll on mobile, stacked cards on very small screens)
   - Row selection with checkboxes (single/multi-select)
   - Row actions (view details, export selected)

2. COLUMNS TO DISPLAY:
   Required:
   - Make
   - Model
   - Model Year
   - EV Type
   - Electric Range
   - County
   - City
   - CAFV Eligibility (abbreviated)
   
   Optional (toggleable):
   - VIN (masked: show last 4 digits)
   - State
   - Postal Code
   - Base MSRP
   - Electric Utility
   - Legislative District

3. SORTING:
   - Multi-column sort (hold Shift + click)
   - Sort indicators (↑↓)
   - Default sort: Model Year (descending)
   - Maintain sort state in URL
   - Natural sorting for numbers and text

4. PAGINATION:
   - Show "Showing 1-25 of 1,000 results"
   - Page size selector
   - First, Previous, Next, Last buttons
   - Page number input (jump to page)
   - Keyboard navigation (arrow keys)
   - Persist pagination state

5. SEARCH & FILTER:
   - Column-specific search
   - Quick search across all visible columns
   - Highlight matched text
   - Clear search button
   - Show filtered row count

6. PERFORMANCE OPTIMIZATIONS:
   - Virtual scrolling for 1000+ rows (react-window or @tanstack/react-virtual)
   - Render only visible rows
   - Debounce search and filter
   - Memoize row rendering
   - Lazy load data on scroll (infinite scroll option)

7. RESPONSIVE DESIGN:
   Desktop (>1024px):
   - Full table with all columns
   - Fixed header on scroll
   - Horizontal scroll for many columns
   
   Tablet (640px-1024px):
   - Show essential columns only
   - Column toggle menu
   - Horizontal scroll
   
   Mobile (<640px):
   - Card view instead of table
   - Show key info per card
   - Stack information vertically

8. ACCESSIBILITY:
   - ARIA labels for all controls
   - Keyboard navigation (Tab, Arrow keys, Enter)
   - Screen reader announcements for sort/filter changes
   - Focus management
   - High contrast mode support

9. EXPORT FUNCTIONALITY:
   - Export visible rows to CSV
   - Export selected rows to CSV
   - Export all filtered data
   - Include column headers
   - Handle special characters and quotes

10. ADVANCED FEATURES:
    - Column resizing (drag column borders)
    - Column reordering (drag and drop)
    - Sticky first column
    - Row hover effects
    - Zebra striping
    - Loading skeleton
    - Empty state with helpful message

Please generate:
1. Complete Table component with all features
2. TableHeader component (sortable, resizable)
3. TableRow component (memoized)
4. TablePagination component
5. Column visibility toggle component
6. useTable custom hook for state management
7. Table utility functions (sort, filter, paginate)
8. CSV export utility
9. Responsive card view for mobile
10. Virtual scrolling setup
11. TypeScript interfaces for table props
```

---

## Prompt 7: Performance Optimization & Best Practices

```
Implement comprehensive performance optimizations and best practices:

PERFORMANCE OPTIMIZATIONS:

1. CODE SPLITTING:
   - Lazy load chart components
   - Lazy load table component
   - Lazy load filter panel
   - Route-based code splitting (if multi-page)
   - Component-based splitting for heavy components

2. REACT OPTIMIZATIONS:
   - Use React.memo() for:
     * Chart components
     * Table rows
     * Filter components
     * Card components
   - Use useMemo() for:
     * Filtered data
     * Aggregated statistics
     * Chart data transformations
     * Expensive calculations
   - Use useCallback() for:
     * Event handlers passed as props
     * Filter functions
     * Sort functions

3. DATA HANDLING:
   - Parse CSV once on load
   - Cache parsed data in memory
   - Use IndexedDB for large datasets (>10MB)
   - Implement data pagination on load
   - Stream large CSV files (if >5000 rows)

4. IMAGE & ASSET OPTIMIZATION:
   - Use WebP format for images
   - Lazy load images below the fold
   - Implement loading placeholder/blur
   - Optimize icon size (use icon font or SVG sprites)

5. LOADING STRATEGIES:
   - Show skeleton screens while loading
   - Progressive loading (load critical content first)
   - Background data refresh
   - Preload next page data
   - Defer non-critical scripts

6. BUNDLE OPTIMIZATION:
   - Tree shaking unused code
   - Minify JavaScript and CSS
   - Remove console.logs in production
   - Analyze bundle size (webpack-bundle-analyzer)
   - Split vendor chunks

7. CACHING STRATEGIES:
   - LocalStorage for user preferences
   - SessionStorage for temporary state
   - Service Worker for offline support (optional)
   - HTTP caching headers

8. DEBOUNCING & THROTTLING:
   - Debounce search input (300ms)
   - Debounce filter changes (200ms)
   - Throttle scroll events (100ms)
   - Throttle resize events (200ms)

BEST PRACTICES:

1. ERROR HANDLING:
   - Error boundary components
   - Try-catch for data parsing
   - Graceful degradation
   - User-friendly error messages
   - Error logging (console or service)
   - Retry mechanisms

2. LOADING STATES:
   - Skeleton screens for each component
   - Loading spinners for actions
   - Progress bars for long operations
   - Disable buttons during loading
   - Show loading percentage if possible

3. ACCESSIBILITY (WCAG 2.1 AA):
   - Semantic HTML5 elements
   - ARIA labels and roles
   - Keyboard navigation
   - Focus management
   - Color contrast ratio 4.5:1
   - Screen reader testing
   - Skip navigation links
   - Announce dynamic content changes

4. CODE QUALITY:
   - TypeScript strict mode
   - ESLint with recommended rules
   - Prettier for formatting
   - Husky for pre-commit hooks
   - Unit tests for utilities
   - Integration tests for key flows

5. SECURITY:
   - Sanitize user inputs
   - Prevent XSS attacks (React handles by default)
   - Validate data types
   - No sensitive data in localStorage
   - HTTPS only (deployment)
   - Content Security Policy headers

6. SEO & META TAGS:
   - Descriptive page title
   - Meta description
   - Open Graph tags
   - Structured data (JSON-LD)
   - Sitemap (if multi-page)

7. MONITORING & ANALYTICS:
   - Track page views
   - Track user interactions
   - Monitor performance metrics
   - Error tracking
   - User feedback mechanism

Please generate:
1. Performance optimization utilities
2. Error boundary component with logging
3. Loading skeleton components for each section
4. Debounce and throttle utility functions
5. LocalStorage utilities with error handling
6. Accessibility utilities (focus trap, aria announcements)
7. ESLint and TypeScript configuration
8. Performance monitoring setup
9. Code splitting configuration
10. Production build optimization checklist
```

---

## Prompt 8: Deployment & Documentation

```
Prepare the EV Dashboard for production deployment:

DEPLOYMENT REQUIREMENTS:

1. BUILD OPTIMIZATION:
   - Production build with optimization
   - Environment variables setup
   - Source maps for debugging
   - Compression (gzip/brotli)
   - Remove development code
   - Optimize assets

2. HOSTING PLATFORMS (choose one):
   
   Option A - Vercel:
   - Create vercel.json configuration
   - Setup deployment settings
   - Environment variables
   - Custom domain (if needed)
   - Analytics integration
   
   Option B - Netlify:
   - Create netlify.toml configuration
   - Build command and output directory
   - Redirect rules
   - Environment variables
   
   Option C - GitHub Pages:
   - Setup gh-pages branch
   - Configure build script
   - Base URL configuration
   - CI/CD with GitHub Actions
   
   Option D - AWS S3 + CloudFront:
   - S3 bucket configuration
   - CloudFront distribution
   - Custom domain with Route53
   - SSL certificate

3. CI/CD PIPELINE:
   - Automated builds on push
   - Run tests before deployment
   - Deploy on merge to main
   - Preview deployments for PRs
   - Rollback capability

4. ENVIRONMENT SETUP:
   - Production environment variables
   - API endpoints (if any)
   - Analytics keys
   - Feature flags

5. PERFORMANCE CHECKLIST:
   - ✅ Lighthouse score >90
   - ✅ First Contentful Paint <2s
   - ✅ Time to Interactive <3.5s
   - ✅ Bundle size <500KB (gzipped)
   - ✅ Properly minified and compressed
   - ✅ Lazy loading implemented
   - ✅ Images optimized

DOCUMENTATION:

1. README.md:
   - Project title and description
   - Live demo URL
   - Screenshot of dashboard
   - Features list
   - Technology stack
   - Installation instructions
   - Development setup
   - Build commands
   - Deployment instructions
   - Project structure
   - API documentation (if any)
   - Contributing guidelines
   - License

2. CODE DOCUMENTATION:
   - JSDoc comments for functions
   - Component prop descriptions
   - Complex logic explanations
   - Utility function documentation
   - Type definitions with descriptions

3. USER GUIDE:
   - How to use the dashboard
   - Filter instructions
   - Chart interactions
   - Export functionality
   - Troubleshooting common issues

4. TECHNICAL DOCUMENTATION:
   - Architecture overview
   - Data flow diagram
   - Component hierarchy
   - State management approach
   - Performance optimizations applied
   - Browser compatibility
   - Known limitations

5. CHANGELOG:
   - Version history
   - Feature additions
   - Bug fixes
   - Breaking changes

TESTING BEFORE DEPLOYMENT:

1. Cross-browser testing:
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

2. Responsive testing:
   - Mobile (320px, 375px, 414px)
   - Tablet (768px, 1024px)
   - Desktop (1280px, 1920px)

3. Performance testing:
   - Run Lighthouse audit
   - Test with slow 3G throttling
   - Check bundle size
   - Verify lazy loading

4. Accessibility testing:
   - Screen reader testing (NVDA, JAWS, VoiceOver)
   - Keyboard navigation
   - Color contrast checker
   - WAVE accessibility tool

5. Functional testing:
   - All filters work correctly
   - Charts render properly
   - Table sorting and pagination
   - Export functionality
   - Error handling

FINAL CHECKLIST:

- [ ] All features implemented and tested
- [ ] No console errors in production
- [ ] All dependencies updated
- [ ] Security vulnerabilities checked
- [ ] Performance optimized
- [ ] Accessibility verified
- [ ] Documentation complete
- [ ] Live URL working
- [ ] GitHub repo configured (private)
- [ ] Collaborators added to repo
- [ ] Submission form filled

Please generate:
1. Complete README.md file
2. Deployment configuration files (vercel.json or netlify.toml)
3. Package.json with all scripts
4. Environment variables template (.env.example)
5. GitHub Actions workflow (optional)
6. User guide document
7. Technical documentation
8. Testing checklist
9. Deployment script
10. Post-deployment verification steps
```

---

## Prompt 9: Advanced Features (Optional Enhancements)

```
Add advanced features to make the dashboard stand out:

OPTIONAL ENHANCEMENTS:

1. INTERACTIVE MAP VISUALIZATION:
   - Use Leaflet or Mapbox GL JS
   - Plot vehicles by county with markers
   - Color-code by EV type or range
   - Cluster markers for dense areas
   - Click marker for details popup
   - Heatmap layer option
   - Zoom and pan controls
   - Legend for colors

2. COMPARISON MODE:
   - Compare two time periods (2020 vs 2024)
   - Compare two counties or cities
   - Side-by-side chart comparison
   - Difference/percentage change indicators
   - Toggle between absolute and relative values

3. TREND ANALYSIS:
   - Predictive trend line (simple linear regression)
   - Growth rate calculation
   - Year-over-year change percentage
   - Moving averages
   - Seasonal patterns (if applicable)

4. EXPORT & SHARING:
   - Export dashboard as PDF
   - Share specific filtered view via URL
   - Download individual charts as PNG
   - Copy shareable link
   - Embed widget code (iframe)

5. DATA INSIGHTS PANEL:
   - Auto-generated insights (e.g., "Tesla is the most popular make")
   - Key trends summary
   - Anomaly detection (unusual spikes/drops)
   - Fun facts about the data
   - AI-powered summary (if using API)

6. CUSTOMIZATION:
   - User preferences (save favorite filters)
   - Custom dashboard layouts (drag and drop)
   - Choose which charts to display
   - Theme customization (color schemes)
   - Dark mode toggle

7. REAL-TIME UPDATES:
   - WebSocket connection for live data (if backend exists)
   - Auto-refresh every N minutes
   - Show "new data available" notification
   - Animated transitions for data changes

8. ADVANCED FILTERS:
   - Saved filter presets ("Tesla vehicles in King County")
   - Complex filter logic (AND/OR conditions)
   - Date range picker for registration dates
   - Geolocation filter (vehicles near me)

9. DATA QUALITY INDICATORS:
   - Show data completeness percentage
   - Highlight missing or invalid data
   - Data freshness indicator (last updated)
   - Source attribution

10. ANIMATIONS & TRANSITIONS:
    - Chart entrance animations
    - Smooth filter transitions
    - Loading animations
    - Hover effects
    - Page transitions

Please generate:
1. Interactive map component with Leaflet
2. Comparison mode component
3. Trend analysis utilities
4. PDF export functionality
5. Data insights generator
6. User preferences system
7. Dashboard customization panel
8. Advanced filter component
9. Animation configuration
10. Implementation priority guide
```

---

## Prompt 10: Quality Assurance & Polish

```
Final quality assurance and polish for production:

QUALITY ASSURANCE:

1. CODE REVIEW CHECKLIST:
   - [ ] No hardcoded values (use constants)
   - [ ] No console.log in production
   - [ ] No commented-out code
   - [ ] Consistent naming conventions
   - [ ] Proper error handling everywhere
   - [ ] All TODOs resolved
   - [ ] No unused imports or variables
   - [ ] PropTypes or TypeScript types for all components
   - [ ] Functions are single-purpose
   - [ ] Code is DRY (Don't Repeat Yourself)

2. UI/UX POLISH:
   - [ ] Consistent spacing throughout
   - [ ] Proper loading states everywhere
   - [ ] Error messages are helpful
   - [ ] Empty states with guidance
   - [ ] Success feedback for actions
   - [ ] Smooth transitions and animations
   - [ ] Hover effects on interactive elements
   - [ ] Disabled states clearly visible
   - [ ] Tooltips for complex features
   - [ ] Confirmation dialogs for destructive actions

3. ACCESSIBILITY AUDIT:
   - [ ] All images have alt text
   - [ ] All buttons have aria-labels
   - [ ] Keyboard navigation works
   - [ ] Focus indicators visible
   - [ ] Color contrast meets WCAG AA
   - [ ] Forms have proper labels
   - [ ] Error messages associated with fields
   - [ ] Dynamic content announces changes
   - [ ] Skip to main content link
   - [ ] No keyboard traps

4. PERFORMANCE AUDIT:
   - [ ] Lighthouse score >90 on all metrics
   - [ ] No layout shifts (CLS < 0.1)
   - [ ] Fast initial load (<3s)
   - [ ] Smooth scrolling (60fps)
   - [ ] No memory leaks
   - [ ] Images lazy loaded
   - [ ] Code split appropriately
   - [ ] Bundle size optimized

5. BROWSER COMPATIBILITY:
   - [ ] Chrome (latest 2 versions)
   - [ ] Firefox (latest 2 versions)
   - [ ] Safari (latest 2 versions)
   - [ ] Edge (latest 2 versions)
   - [ ] Mobile Safari (iOS 14+)
   - [ ] Chrome Mobile (Android 10+)

6. RESPONSIVE TESTING:
   - [ ] iPhone SE (375px)
   - [ ] iPhone 12/13 (390px)
   - [ ] iPhone 14 Pro Max (430px)
   - [ ] iPad (768px)
   - [ ] iPad Pro (1024px)
   - [ ] Desktop (1280px)
   - [ ] Large desktop (1920px)
   - [ ] Ultra-wide (2560px)

7. DATA VALIDATION:
   - [ ] All chart data is accurate
   - [ ] Calculations are correct
   - [ ] Filters work as expected
   - [ ] Search returns correct results
   - [ ] Pagination is accurate
   - [ ] Export contains correct data

8. EDGE CASES:
   - [ ] Empty dataset handling
   - [ ] Single record handling
   - [ ] Very large dataset (10,000+ rows)
   - [ ] Special characters in data
   - [ ] Missing/null values
   - [ ] Invalid filter combinations
   - [ ] Network errors
   - [ ] Slow network (3G)

FINAL POLISH:

1. Visual Refinements:
   - Consistent shadows and borders
   - Proper whitespace and breathing room
   - Professional color palette
   - Smooth hover states
   - Loading skeleton matches final UI
   - Charts have professional appearance
   - Typography hierarchy is clear

2. Micro-interactions:
   - Button press animations
   - Checkbox/toggle animations
   - Dropdown animations
   - Chart hover effects
   - Tooltip appearances
   - Success/error message animations

3. Content:
   - Fix any typos
   - Consistent terminology
   - Clear, concise copy
   - Helpful empty states
   - Informative error messages
   - Professional tone

4. Metadata:
   - Proper page title
   - Meta description
   - Favicon
   - Open Graph image
   - Twitter Card tags

Please generate:
1. Complete QA testing checklist
2. Browser testing script
3. Accessibility testing guide
4. Performance optimization verification
5. Final pre-deployment checklist
6. Bug tracking template
7. User acceptance testing criteria
8. Polish and refinement list
9. Launch day checklist
10. Post-launch monitoring plan
```

---

## SUMMARY OF ALL PROMPTS

Use these prompts in sequence with Kiro:

1. **Project Setup** - Architecture and folder structure
2. **Data Processing** - CSV parsing and data management
3. **Dashboard Layout** - UI/UX design and layout components
4. **Visualizations** - Charts and graphs implementation
5. **Filtering System** - Advanced filtering and search
6. **Data Table** - Production-grade table with features
7. **Performance** - Optimizations and best practices
8. **Deployment** - Production build and documentation
9. **Advanced Features** - Optional enhancements (if time permits)
10. **Quality Assurance** - Final polish and testing

Each prompt builds on the previous one, creating a complete, production-ready dashboard.
```
