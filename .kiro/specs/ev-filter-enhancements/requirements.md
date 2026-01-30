# Requirements Document

## Introduction

This document specifies the requirements for adding model year range and electric range filtering capabilities to the EV Dashboard. The dashboard currently supports filtering by search query, counties, cities, makes, models, and EV types. This enhancement will add two new filter types: a model year range filter (allowing users to select a minimum and maximum year) and an electric range filter (allowing users to filter vehicles by their electric range capabilities). These filters will integrate seamlessly with the existing Zustand-based filter system and provide users with more granular control over the displayed vehicle data.

## Glossary

- **Dashboard**: The React-based analytical interface displaying EV data with visualizations and tables
- **Filter_System**: The Zustand state management system that manages FilterState and applies filters to EVData
- **FilterState**: The TypeScript interface containing all active filter criteria including yearRange and the new rangeFilter
- **FilterPanel**: The UI component that displays all available filters and controls
- **Model_Year_Filter**: A range selector UI component allowing users to specify minimum and maximum model years
- **Electric_Range_Filter**: A filter UI component allowing users to filter vehicles by electric range (in miles)
- **EVData**: The processed vehicle data structure containing modelYear (number) and electricRange (number) fields
- **Range_Slider**: A dual-handle slider UI component for selecting numeric ranges
- **Filter_Reset**: The action that clears all active filters and returns to default state

## Requirements

### Requirement 1: Model Year Range Filter

**User Story:** As a dashboard user, I want to filter vehicles by model year range, so that I can analyze vehicles from specific time periods.

#### Acceptance Criteria

1. WHEN the FilterPanel renders, THE Model_Year_Filter SHALL display with the full available year range from the dataset
2. WHEN a user adjusts the minimum year value, THE Filter_System SHALL filter EVData to include only vehicles with modelYear greater than or equal to the selected minimum
3. WHEN a user adjusts the maximum year value, THE Filter_System SHALL filter EVData to include only vehicles with modelYear less than or equal to the selected maximum
4. WHEN both minimum and maximum values are set, THE Filter_System SHALL apply both constraints simultaneously
5. THE Model_Year_Filter SHALL display the currently selected year range values to the user
6. WHEN the dataset contains years from 2012 to 2024, THE Model_Year_Filter SHALL initialize with these bounds as the default range

### Requirement 2: Electric Range Filter

**User Story:** As a dashboard user, I want to filter vehicles by electric range, so that I can find vehicles that meet specific range requirements.

#### Acceptance Criteria

1. WHEN the FilterPanel renders, THE Electric_Range_Filter SHALL display with the full available range from the dataset (0-322 miles)
2. WHEN a user adjusts the minimum range value, THE Filter_System SHALL filter EVData to include only vehicles with electricRange greater than or equal to the selected minimum
3. WHEN a user adjusts the maximum range value, THE Filter_System SHALL filter EVData to include only vehicles with electricRange less than or equal to the selected maximum
4. WHEN both minimum and maximum range values are set, THE Filter_System SHALL apply both constraints simultaneously
5. THE Electric_Range_Filter SHALL display the currently selected range values in miles to the user

### Requirement 3: Filter State Integration

**User Story:** As a developer, I want the new filters to integrate with the existing filter system, so that all filters work together consistently.

#### Acceptance Criteria

1. WHEN a user applies the Model_Year_Filter, THE Filter_System SHALL combine it with all other active filters using AND logic
2. WHEN a user applies the Electric_Range_Filter, THE Filter_System SHALL combine it with all other active filters using AND logic
3. WHEN any filter changes, THE Filter_System SHALL update filteredData by calling filterEVData with the complete FilterState
4. WHEN filters are applied, THE Dashboard SHALL reset the current page to 1
5. THE FilterState interface SHALL include a rangeFilter field of type [number, number] for electric range bounds

### Requirement 4: Filter Reset Functionality

**User Story:** As a dashboard user, I want to reset all filters including the new range filters, so that I can quickly return to viewing all data.

#### Acceptance Criteria

1. WHEN a user clicks the "Clear All" button, THE Filter_System SHALL reset the Model_Year_Filter to the full dataset year range
2. WHEN a user clicks the "Clear All" button, THE Filter_System SHALL reset the Electric_Range_Filter to the full dataset range (0-322 miles)
3. WHEN filters are reset, THE Dashboard SHALL display all EVData without any filtering applied
4. WHEN the Model_Year_Filter or Electric_Range_Filter has non-default values, THE "Clear All" button SHALL be visible

### Requirement 5: User Interface Design

**User Story:** As a dashboard user, I want intuitive and accessible filter controls, so that I can easily adjust filtering parameters.

#### Acceptance Criteria

1. THE Model_Year_Filter SHALL use a Range_Slider component with two handles for minimum and maximum selection
2. THE Electric_Range_Filter SHALL use a Range_Slider component with two handles for minimum and maximum selection
3. WHEN a user interacts with a Range_Slider, THE Dashboard SHALL provide immediate visual feedback of the selected range
4. THE Range_Slider components SHALL be keyboard accessible for users who cannot use a mouse
5. THE Model_Year_Filter and Electric_Range_Filter SHALL be positioned in the FilterPanel below the existing multi-select filters
6. WHEN a Range_Slider handle is dragged, THE Dashboard SHALL display the current numeric value being selected

### Requirement 6: Data Processing Integration

**User Story:** As a developer, I want the filterEVData function to handle range filters, so that filtering logic remains centralized.

#### Acceptance Criteria

1. WHEN filterEVData receives a FilterState with yearRange values, THE function SHALL filter EVData based on the modelYear field
2. WHEN filterEVData receives a FilterState with rangeFilter values, THE function SHALL filter EVData based on the electricRange field
3. WHEN an EVData item has modelYear outside the yearRange bounds, THE filterEVData function SHALL exclude it from results
4. WHEN an EVData item has electricRange outside the rangeFilter bounds, THE filterEVData function SHALL exclude it from results
5. THE filterEVData function SHALL apply range filters after applying all other filter criteria

### Requirement 7: Performance and Responsiveness

**User Story:** As a dashboard user, I want filters to apply quickly without lag, so that I can explore data efficiently.

#### Acceptance Criteria

1. WHEN a user adjusts a Range_Slider, THE Filter_System SHALL debounce filter updates to avoid excessive re-renders
2. WHEN filtering completes, THE Dashboard SHALL update visualizations and tables within 500 milliseconds
3. WHEN the dataset contains 10,000+ records, THE Filter_System SHALL maintain responsive filter updates
4. THE Range_Slider components SHALL provide smooth dragging interactions without visual stuttering
