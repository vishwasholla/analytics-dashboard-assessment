# Electric Vehicle Population Analytics Dashboard - User Guide

## Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Dashboard Features](#dashboard-features)
4. [Filters](#filters)
5. [Visualizations](#visualizations)
6. [Data Table](#data-table)
7. [Export Functionality](#export-functionality)
8. [Responsive Design](#responsive-design)
9. [Tips and Best Practices](#tips-and-best-practices)

---

## Overview

The Electric Vehicle Population Analytics Dashboard is a comprehensive data visualization and analysis tool designed to explore electric vehicle (EV) population data. It provides interactive filtering, multiple chart types, and detailed data tables to help users understand EV adoption patterns, trends, and distributions.

### Key Capabilities
- **Real-time Filtering**: Apply multiple filters simultaneously to narrow down data
- **Interactive Visualizations**: View data through various chart types (bar, pie, line, area)
- **Detailed Data Table**: Browse individual vehicle records with sorting and pagination
- **CSV Export**: Download filtered data for external analysis
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

---

## Getting Started

### Accessing the Dashboard
1. Open the application in your web browser
2. The dashboard will automatically load the Electric Vehicle Population dataset
3. You'll see a loading progress bar while data is being processed
4. Once loaded, you'll see statistics cards, charts, and the data table

### Dashboard Layout
The dashboard consists of three main sections:
- **Left Sidebar**: Filter panel (collapsible on mobile)
- **Main Content Area**: Statistics cards and visualizations
- **Bottom Section**: Detailed data table with export functionality

---

## Dashboard Features

### Statistics Cards

The dashboard displays 9 key statistics at the top:

#### Row 1: Vehicle Type Statistics
1. **Total Vehicles**: Total number of EVs in the filtered dataset
2. **BEV Count**: Number of Battery Electric Vehicles (fully electric)
3. **PHEV Count**: Number of Plug-in Hybrid Electric Vehicles
4. **Avg Range**: Average electric range across all vehicles (in miles)

#### Row 2: Geographic & Manufacturer Statistics
5. **States**: Number of unique states represented
6. **Counties**: Number of unique counties
7. **Cities**: Number of unique cities
8. **Makes**: Number of unique vehicle manufacturers
9. **Models**: Number of unique vehicle models

All statistics update in real-time as you apply filters.

---

## Filters

The dashboard provides two levels of filtering: **Basic Filters** (in the sidebar) and **Advanced Filters** (in a modal).

### Basic Filters (Sidebar)

#### 1. Search Bar
- **Purpose**: Quick text search across multiple fields
- **Searches**: Make, Model, City, County, VIN, EV Type
- **Usage**: Type any keyword to instantly filter results
- **Example**: Search "Tesla" to see all Tesla vehicles

#### 2. Model Year Range
- **Type**: Dual-slider range selector
- **Purpose**: Filter vehicles by manufacturing year
- **Default**: Shows full range available in dataset
- **Usage**: Drag sliders to set minimum and maximum years
- **Display**: Shows selected range values above sliders

#### 3. Electric Range (miles)
- **Type**: Dual-slider range selector
- **Purpose**: Filter by electric driving range
- **Default**: 0 to maximum range in dataset
- **Usage**: Drag sliders to set desired range
- **Note**: Automatically handles vehicles with unknown range (0 miles)

#### 4. County Filter
- **Type**: Multi-select checkbox list
- **Purpose**: Filter by geographic county
- **Features**: 
  - Scrollable list of all counties
  - Select multiple counties simultaneously
  - Hover highlighting for better UX

#### 5. Make Filter
- **Type**: Multi-select checkbox list
- **Purpose**: Filter by vehicle manufacturer
- **Features**: Alphabetically sorted list
- **Special Behavior**: When a single make is selected, the "Top Makes" chart changes to show models for that make

#### 6. EV Type Filter
- **Type**: Multi-select checkbox list
- **Options**: 
  - **BEV** (Battery Electric Vehicle): Fully electric, no gas engine
  - **PHEV** (Plug-in Hybrid Electric Vehicle): Electric + gas engine
- **Purpose**: Filter by vehicle type

#### 7. Clear All Button
- **Location**: Top-right of filter panel
- **Purpose**: Reset all filters to default values
- **Visibility**: Only appears when filters are active

### Advanced Filters (Modal)

Click the "Advanced Filters" button at the bottom of the sidebar to access additional filtering options.

#### 1. CAFV Eligibility
- **Purpose**: Filter by Clean Alternative Fuel Vehicle eligibility status
- **Type**: Multi-select checkbox list
- **Options**: Various eligibility statuses from the dataset
- **Usage**: Select one or more eligibility types

#### 2. Unknown Range Vehicles
Two mutually exclusive options:
- **Include vehicles with unknown range (0 miles)**
  - Includes vehicles with no range data in results
  - Useful for comprehensive analysis
- **Show only vehicles with unknown range**
  - Shows ONLY vehicles with 0 miles range
  - Ignores the electric range filter
  - Useful for data quality analysis

#### 3. Base MSRP Range
- **Type**: Dual-slider range selector
- **Purpose**: Filter by manufacturer's suggested retail price
- **Range**: $0 to maximum MSRP in dataset
- **Behavior**:
  - When set to $0: Includes all vehicles (including N/A MSRP)
  - When > $0: Excludes vehicles with N/A MSRP
- **Display**: Shows selected range in dollar format

#### 4. Legislative District
- **Type**: Multi-select checkbox list
- **Purpose**: Filter by legislative district number
- **Features**: Numerically sorted list
- **Usage**: Select one or more districts

#### 5. Census Tract
- **Type**: Multi-select checkbox list with search
- **Features**:
  - Search box to filter census tracts
  - Shows first 100 matching results
  - Displays total count if more than 100
- **Usage**: 
  1. Type in search box to narrow down tracts
  2. Select desired census tracts
  3. Multiple selections allowed

#### Modal Controls
- **Save Filters**: Apply selected filters and close modal
- **Cancel**: Close modal without applying changes
- **X Button**: Close modal (same as Cancel)

---

## Visualizations

The dashboard includes 7 interactive charts that update based on applied filters.

### Chart Types and Purposes

#### 1. Top Makes (Bar Chart)
- **Location**: Top-left of main content
- **Purpose**: Shows top 10 vehicle manufacturers by count
- **Features**:
  - Horizontal bars for easy reading
  - Color-coded bars
  - Hover to see exact counts
- **Special Behavior**: When a single make is filtered, this changes to a **Pie Chart** showing model distribution for that make

#### 2. EV Type Distribution (Pie Chart)
- **Location**: Top-right of main content
- **Purpose**: Shows proportion of BEV vs PHEV vehicles
- **Features**:
  - Color-coded segments (Green for BEV, Blue for PHEV)
  - Percentage labels
  - Hover for exact counts

#### 3. Vehicles by Year (Line Chart)
- **Location**: Middle-left
- **Purpose**: Shows EV adoption trend over time
- **Features**:
  - Smooth line connecting data points
  - X-axis: Model years
  - Y-axis: Vehicle count
  - Hover to see year and count

#### 4. Top Counties (Bar Chart)
- **Location**: Middle-right
- **Purpose**: Shows top 10 counties by vehicle count
- **Features**:
  - Horizontal bars
  - Sorted by count (highest first)
  - Hover for exact values

#### 5. State Distribution (Bar Chart)
- **Location**: Bottom-left
- **Purpose**: Shows vehicle distribution across states
- **Features**:
  - Shows top 10 states
  - Useful for geographic analysis

#### 6. Top Cities (Area Chart)
- **Location**: Bottom-right
- **Purpose**: Shows top 10 cities by vehicle count
- **Features**:
  - Filled area under curve
  - Gradient coloring
  - Hover for city name and count

### Chart Interactions
- **Hover**: All charts support hover tooltips showing detailed information
- **Responsive**: Charts automatically resize based on screen size
- **Real-time Updates**: All charts update instantly when filters change

---

## Data Table

The data table displays individual vehicle records with full details.

### Table Features

#### Columns (13 total)
1. **ID**: Sequential row number
2. **VIN**: Vehicle Identification Number (first 10 characters)
3. **Make**: Manufacturer name
4. **Model**: Vehicle model name
5. **Year**: Model year (sortable)
6. **Type**: EV Type (BEV/PHEV) with color badges
7. **Range (mi)**: Electric range in miles (sortable)
8. **MSRP**: Base MSRP (shows "N/A" if not available)
9. **County**: Geographic county
10. **City**: City name
11. **State**: State abbreviation
12. **Postal Code**: ZIP code
13. **CAFV Eligibility**: Clean Alternative Fuel Vehicle eligibility status

#### Sorting
- **Sortable Columns**: Year and Range (mi)
- **How to Sort**: Click on column header
- **Sort Indicators**: 
  - Up arrow (▲): Ascending order (active in blue)
  - Down arrow (▼): Descending order (active in blue)
- **Multi-level Sorting**:
  - Primary sort: Year
  - Secondary sort: Range (when years are equal)
- **Default**: Year descending (newest first), Range descending (highest first)

#### Pagination
- **Items per Page**: 20 records
- **Controls**:
  - **««**: Jump to first page
  - **‹**: Previous page
  - **›**: Next page
  - **»»**: Jump to last page
- **Display**: Shows "Showing X to Y of Z results"
- **Behavior**: Resets to page 1 when filters or sorting changes

#### Visual Features
- **Hover Effect**: Rows highlight on hover for better readability
- **Color Badges**: EV Type displayed with colored badges
  - Green badge: BEV
  - Blue badge: PHEV
- **Borders**: Clear cell borders for easy scanning
- **Responsive**: Horizontal scroll on smaller screens

#### Empty State
When no data matches filters:
- Shows document icon
- Message: "No data found"
- Suggestion: "Try adjusting your filters to see more results"

---

## Export Functionality

### CSV Export Feature

#### Purpose
Export filtered data to CSV format for use in Excel, Google Sheets, or other analysis tools.

#### How to Export
1. Apply desired filters to narrow down data
2. Click the **"Export to CSV"** button above the data table
3. File downloads automatically to your browser's download folder

#### Export Details
- **Filename Format**: `ev-data-export-YYYYMMDD-HHMMSS.csv`
  - Example: `ev-data-export-20240130-143022.csv`
- **Encoding**: UTF-8 with BOM (opens correctly in Excel)
- **Content**: Exports ALL filtered records (not just current page)
- **Columns**: All 17 data fields included

#### Export States
- **Ready**: Blue button with download icon
- **Exporting**: Shows spinner and "Exporting..." text
- **Success**: Green message "Successfully exported X records" (disappears after 3 seconds)
- **Error**: Red error message (disappears after 5 seconds)

#### CSV Format
- RFC 4180 compliant
- Comma-separated values
- Quoted fields containing commas or special characters
- Header row with column names

---

## Responsive Design

The dashboard is fully responsive and adapts to different screen sizes.

### Desktop (1280px+)
- **Layout**: Sidebar + main content side-by-side
- **Sidebar**: Fixed width, always visible
- **Charts**: 2 columns
- **Table**: Full width with all columns visible
- **Toggle**: Desktop toggle button on left side

### Tablet (768px - 1279px)
- **Layout**: Collapsible sidebar
- **Sidebar**: Overlay when open
- **Charts**: 2 columns (may stack on smaller tablets)
- **Table**: Horizontal scroll for all columns
- **Toggle**: Floating button in top-right

### Mobile (< 768px)
- **Layout**: Full-width content
- **Sidebar**: Full-screen overlay when open
- **Charts**: Single column, stacked vertically
- **Table**: Horizontal scroll, compact spacing
- **Toggle**: Floating button in top-right
- **Statistics**: 2 columns instead of 4-5

### Sidebar Behavior
- **Desktop**: Toggle button on left, sidebar slides in/out
- **Mobile/Tablet**: 
  - Floating button in top-right corner
  - Sidebar overlays content when open
  - Dark backdrop behind sidebar
  - Close button (X) in top-right of sidebar
  - Tap backdrop to close

### Advanced Filters Modal
- **All Devices**: Centers on screen, not tied to filter button location
- **Responsive Width**: 
  - Mobile: 320px - 480px
  - Tablet: 480px - 768px
  - Desktop: 768px - 896px
- **Height**: Maximum 85% of viewport height
- **Scrolling**: Content area scrolls if needed
- **Buttons**: Stack vertically on mobile, horizontal on desktop

---

## Tips and Best Practices

### Efficient Filtering
1. **Start Broad**: Begin with basic filters (year, type) before advanced filters
2. **Use Search**: Quick way to find specific makes or models
3. **Combine Filters**: Multiple filters work together (AND logic)
4. **Check Statistics**: Watch the "Total Vehicles" card to see filter impact
5. **Clear All**: Use "Clear All" button to start fresh

### Data Analysis Workflows

#### Analyzing a Specific Manufacturer
1. Select make in sidebar (e.g., "Tesla")
2. View model distribution in pie chart
3. Check year trend in line chart
4. Export data for detailed analysis

#### Geographic Analysis
1. Filter by state or county
2. View city distribution in area chart
3. Check legislative districts in advanced filters
4. Export for mapping in GIS tools

#### Price Range Analysis
1. Open Advanced Filters
2. Set MSRP range
3. Note: Setting min > $0 excludes vehicles with N/A MSRP
4. Compare with range and year filters

#### Data Quality Check
1. Open Advanced Filters
2. Select "Show only vehicles with unknown range"
3. Review records with missing data
4. Export for data cleaning

### Performance Tips
- **Large Datasets**: Filters apply instantly, but export may take a few seconds
- **Pagination**: Use pagination to browse large result sets
- **Sorting**: Sort by year or range to find specific vehicles quickly
- **Export**: Export filtered data before applying additional filters for comparison

### Accessibility
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Meets WCAG 2.1 AA standards
- **Focus Indicators**: Clear focus rings on interactive elements

### Browser Compatibility
- **Recommended**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features**: All modern browsers support full functionality

---

## Troubleshooting

### Common Issues

#### Data Not Loading
- **Check**: Internet connection
- **Solution**: Refresh the page
- **Error Message**: Will display if CSV file cannot be loaded

#### Filters Not Working
- **Check**: Multiple filters may result in no matches
- **Solution**: Use "Clear All" and reapply filters one at a time
- **Verify**: Check "Total Vehicles" count

#### Export Not Working
- **Check**: Browser popup blocker
- **Solution**: Allow downloads from the site
- **Verify**: Check browser's download folder

#### Charts Not Displaying
- **Check**: Browser JavaScript is enabled
- **Solution**: Refresh the page
- **Fallback**: Data table still works

#### Mobile Sidebar Won't Close
- **Solution**: Tap the dark backdrop area
- **Alternative**: Tap the X button in top-right of sidebar

---

## Glossary

- **BEV**: Battery Electric Vehicle - Fully electric, no gasoline engine
- **PHEV**: Plug-in Hybrid Electric Vehicle - Electric motor + gasoline engine
- **CAFV**: Clean Alternative Fuel Vehicle - Eligibility for certain incentives
- **MSRP**: Manufacturer's Suggested Retail Price
- **VIN**: Vehicle Identification Number - Unique identifier for each vehicle
- **Census Tract**: Small geographic area defined by the U.S. Census Bureau
- **Legislative District**: Electoral district for state legislature
- **Electric Range**: Maximum distance vehicle can travel on electric power alone

---

## Support and Feedback

For questions, issues, or feature requests, please contact the development team or submit an issue through the project repository.

**Version**: 1.0.0  
**Last Updated**: January 2025
