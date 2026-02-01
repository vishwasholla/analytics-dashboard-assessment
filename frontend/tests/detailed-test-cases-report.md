# Comprehensive CSV Data Analysis and Test Cases Report

## Executive Summary

This report provides a comprehensive analysis of the Electric Vehicle Population Data CSV file containing **50,000 records** from Washington state. The analysis includes detailed statistics, independent filter test cases, and group filter combinations with human-readable descriptions.

---

## Comprehensive Data Analysis Results

### Basic Statistics
- **Total Vehicles**: 50,000
- **Total BEV (Battery Electric Vehicles)**: 39,461 (78.92%)
- **Total PHEV (Plug-in Hybrid Electric Vehicles)**: 10,539 (21.08%)
- **Average Electric Range**: 123.48 miles

### Geographic Coverage
- **States**: 1 (WA)
- **Counties**: 20 unique counties
- **Cities**: 152 unique cities

### Vehicle Diversity
- **Unique Makes**: 38 different manufacturers
- **Unique Models**: 132 different vehicle models

### Top 10 Vehicle Makes by Count
1. **TESLA**: 23,127 vehicles (46.25%)
2. **NISSAN**: 3,909 vehicles (7.82%)
3. **CHEVROLET**: 3,543 vehicles (7.09%)
4. **BMW**: 2,214 vehicles (4.43%)
5. **FORD**: 2,028 vehicles (4.06%)
6. **KIA**: 1,980 vehicles (3.96%)
7. **TOYOTA**: 1,568 vehicles (3.14%)
8. **JEEP**: 1,399 vehicles (2.80%)
9. **VOLKSWAGEN**: 1,328 vehicles (2.66%)
10. **HYUNDAI**: 1,234 vehicles (2.47%)

### Vehicle Distribution by Year (Top 10)
1. **2024**: 2,086 vehicles (4.17%)
2. **2023**: 16,791 vehicles (33.58%)
3. **2022**: 7,813 vehicles (15.63%)
4. **2021**: 5,227 vehicles (10.45%)
5. **2020**: 3,290 vehicles (6.58%)
6. **2019**: 3,029 vehicles (6.06%)
7. **2018**: 4,092 vehicles (8.18%)
8. **2017**: 2,275 vehicles (4.55%)
9. **2016**: 1,468 vehicles (2.94%)
10. **2015**: 1,266 vehicles (2.53%)

### Top 10 Counties by Vehicle Count
1. **King County**: 37,502 vehicles (75.00%)
2. **Clark County**: 4,838 vehicles (9.68%)
3. **Snohomish County**: 2,553 vehicles (5.11%)
4. **Kitsap County**: 2,154 vehicles (4.31%)
5. **Thurston County**: 1,524 vehicles (3.05%)
6. **Cowlitz County**: 440 vehicles (0.88%)
7. **Jefferson County**: 393 vehicles (0.79%)
8. **Yakima County**: 306 vehicles (0.61%)
9. **Island County**: 152 vehicles (0.30%)
10. **Clallam County**: 53 vehicles (0.11%)

### Top 10 Cities by Vehicle Count
1. **Seattle**: 10,427 vehicles (20.85%)
2. **Bellevue**: 4,573 vehicles (9.15%)
3. **Vancouver**: 3,008 vehicles (6.02%)
4. **Kirkland**: 2,751 vehicles (5.50%)
5. **Sammamish**: 2,599 vehicles (5.20%)
6. **Tukwila**: 2,205 vehicles (4.41%)
7. **Redmond**: 2,104 vehicles (4.21%)
8. **Bothell**: 1,744 vehicles (3.49%)
9. **Renton**: 1,437 vehicles (2.87%)
10. **Shoreline**: 1,391 vehicles (2.78%)

---

## Independent Filter Test Cases


### Test Case 1: Model Year
- **Description**: Vehicles with model year greater than 2020 and less than 2023
- **Filter Criteria**: `Model Year > 2020 AND Model Year < 2023`
- **Total Vehicles**: 33,121
- **BEV Count**: 28,080 (84.78%)
- **PHEV Count**: 5,041 (15.22%)
- **Average Range**: 119.54 miles
- **States**: 1 (WA)
- **Counties**: 17
- **Cities**: 137
- **Makes**: 31
- **Models**: 90
- **Status**: PASS
- **Top Makes**: TESLA (17608), CHEVROLET (1662), KIA (1352), FORD (1285), JEEP (1240)
- **Sample Results**:
  1. 2020 TESLA MODEL Y (BEV) - 291 miles - Seattle, King County
  2. 2023 TESLA MODEL Y (BEV) - 0 miles - Bothell, Snohomish County
  3. 2021 TESLA MODEL Y (BEV) - 0 miles - Suquamish, Kitsap County
  4. 2022 BMW X5 (PHEV) - 30 miles - Auburn, King County
  5. 2020 TESLA MODEL Y (BEV) - 291 miles - Seattle, King County


### Test Case 2: Model Year
- **Description**: Vehicles from 2015 to 2018 (inclusive)
- **Filter Criteria**: `Model Year >= 2015 AND Model Year <= 2018`
- **Total Vehicles**: 9,101
- **BEV Count**: 6,238 (68.54%)
- **PHEV Count**: 2,863 (31.46%)
- **Average Range**: 131.69 miles
- **States**: 1 (WA)
- **Counties**: 19
- **Cities**: 131
- **Makes**: 20
- **Models**: 47
- **Status**: PASS
- **Top Makes**: TESLA (3544), NISSAN (1483), CHEVROLET (1150), BMW (605), FORD (428)
- **Sample Results**:
  1. 2016 TESLA MODEL S (BEV) - 210 miles - Issaquah, King County
  2. 2017 FORD FUSION (PHEV) - 21 miles - Yelm, Thurston County
  3. 2018 KIA OPTIMA (PHEV) - 29 miles - Bothell, Snohomish County
  4. 2015 NISSAN LEAF (BEV) - 84 miles - Port Orchard, Kitsap County
  5. 2015 NISSAN LEAF (BEV) - 84 miles - Seattle, King County


### Test Case 3: Electric Range
- **Description**: Vehicles with electric range greater than 200 miles and less than 300 miles
- **Filter Criteria**: `Electric Range > 200 AND Electric Range < 300`
- **Total Vehicles**: 8,147
- **BEV Count**: 8,147 (100%)
- **PHEV Count**: 0 (0%)
- **Average Range**: 234.99 miles
- **States**: 1 (WA)
- **Counties**: 17
- **Cities**: 122
- **Makes**: 9
- **Models**: 14
- **Status**: PASS
- **Top Makes**: TESLA (6340), CHEVROLET (1076), KIA (246), AUDI (216), NISSAN (77)
- **Sample Results**:
  1. 2020 TESLA MODEL Y (BEV) - 291 miles - Seattle, King County
  2. 2019 TESLA MODEL S (BEV) - 270 miles - Seattle, King County
  3. 2016 TESLA MODEL S (BEV) - 210 miles - Issaquah, King County
  4. 2020 TESLA MODEL Y (BEV) - 291 miles - Seattle, King County
  5. 2019 TESLA MODEL 3 (BEV) - 220 miles - Yakima, Yakima County


### Test Case 4: Electric Range
- **Description**: Vehicles with electric range between 100 and 150 miles (inclusive)
- **Filter Criteria**: `Electric Range >= 100 AND Electric Range <= 150`
- **Total Vehicles**: 1,162
- **BEV Count**: 1,108 (95.35%)
- **PHEV Count**: 54 (4.65%)
- **Average Range**: 129.68 miles
- **States**: 1 (WA)
- **Counties**: 10
- **Cities**: 76
- **Makes**: 9
- **Models**: 9
- **Status**: PASS
- **Top Makes**: NISSAN (784), VOLKSWAGEN (202), BMW (83), MINI (31), KIA (25)
- **Sample Results**:
  1. 2019 BMW I3 (PHEV) - 126 miles - Bainbridge Island, Kitsap County
  2. 2017 NISSAN LEAF (BEV) - 107 miles - Bothell, Snohomish County
  3. 2017 NISSAN LEAF (BEV) - 107 miles - Olympia, Thurston County
  4. 2019 NISSAN LEAF (BEV) - 150 miles - Olympia, Thurston County
  5. 2014 TOYOTA RAV4 (BEV) - 103 miles - Pacific, King County


### Test Case 5: Electric Range
- **Description**: Vehicles with electric range less than 50 miles
- **Filter Criteria**: `Electric Range > 0 AND Electric Range < 50`
- **Total Vehicles**: 9,569
- **BEV Count**: 2 (0.02%)
- **PHEV Count**: 9,567 (99.98%)
- **Average Range**: 27 miles
- **States**: 1 (WA)
- **Counties**: 19
- **Cities**: 124
- **Makes**: 25
- **Models**: 60
- **Status**: PASS
- **Top Makes**: TOYOTA (1482), JEEP (1399), BMW (1106), CHRYSLER (908), FORD (804)
- **Sample Results**:
  1. 2017 FORD FUSION (PHEV) - 21 miles - Yelm, Thurston County
  2. 2018 KIA OPTIMA (PHEV) - 29 miles - Bothell, Snohomish County
  3. 2022 BMW X5 (PHEV) - 30 miles - Auburn, King County
  4. 2021 AUDI Q5 E (PHEV) - 18 miles - Lynnwood, Snohomish County
  5. 2013 FORD C-MAX (PHEV) - 19 miles - Yakima, Yakima County


### Test Case 6: Make
- **Description**: Tesla vehicles only
- **Filter Criteria**: `Make = TESLA`
- **Total Vehicles**: 23,127
- **BEV Count**: 23,127 (100%)
- **PHEV Count**: 0 (0%)
- **Average Range**: 240.56 miles
- **States**: 1 (WA)
- **Counties**: 18
- **Cities**: 132
- **Makes**: 1
- **Models**: 5
- **Status**: PASS
- **Top Makes**: TESLA (23127)
- **Sample Results**:
  1. 2020 TESLA MODEL Y (BEV) - 291 miles - Seattle, King County
  2. 2023 TESLA MODEL Y (BEV) - 0 miles - Bothell, Snohomish County
  3. 2019 TESLA MODEL S (BEV) - 270 miles - Seattle, King County
  4. 2016 TESLA MODEL S (BEV) - 210 miles - Issaquah, King County
  5. 2021 TESLA MODEL Y (BEV) - 0 miles - Suquamish, Kitsap County


### Test Case 7: Make
- **Description**: Nissan vehicles only
- **Filter Criteria**: `Make = NISSAN`
- **Total Vehicles**: 3,909
- **BEV Count**: 3,909 (100%)
- **PHEV Count**: 0 (0%)
- **Average Range**: 105.41 miles
- **States**: 1 (WA)
- **Counties**: 16
- **Cities**: 106
- **Makes**: 1
- **Models**: 2
- **Status**: PASS
- **Top Makes**: NISSAN (3909)
- **Sample Results**:
  1. 2013 NISSAN LEAF (BEV) - 75 miles - Yakima, Yakima County
  2. 2015 NISSAN LEAF (BEV) - 84 miles - Port Orchard, Kitsap County
  3. 2015 NISSAN LEAF (BEV) - 84 miles - Seattle, King County
  4. 2013 NISSAN LEAF (BEV) - 75 miles - Seattle, King County
  5. 2013 NISSAN LEAF (BEV) - 75 miles - Lynnwood, Snohomish County


### Test Case 8: Make
- **Description**: BMW vehicles only
- **Filter Criteria**: `Make = BMW`
- **Total Vehicles**: 2,214
- **BEV Count**: 732 (33.06%)
- **PHEV Count**: 1,482 (66.94%)
- **Average Range**: 46.42 miles
- **States**: 1 (WA)
- **Counties**: 11
- **Cities**: 88
- **Makes**: 1
- **Models**: 13
- **Status**: PASS
- **Top Makes**: BMW (2214)
- **Sample Results**:
  1. 2022 BMW X5 (PHEV) - 30 miles - Auburn, King County
  2. 2019 BMW I3 (PHEV) - 126 miles - Bainbridge Island, Kitsap County
  3. 2014 BMW I3 (PHEV) - 72 miles - Renton, King County
  4. 2017 BMW I8 (PHEV) - 14 miles - Seattle, King County
  5. 2017 BMW X5 (PHEV) - 14 miles - Seattle, King County


### Test Case 9: EV Type
- **Description**: Battery Electric Vehicles (BEV) only
- **Filter Criteria**: `Electric Vehicle Type = BEV`
- **Total Vehicles**: 39,461
- **BEV Count**: 39,461 (100%)
- **PHEV Count**: 0 (0%)
- **Average Range**: 196.35 miles
- **States**: 1 (WA)
- **Counties**: 19
- **Cities**: 146
- **Makes**: 30
- **Models**: 74
- **Status**: PASS
- **Top Makes**: TESLA (23127), NISSAN (3909), CHEVROLET (2458), KIA (1397), VOLKSWAGEN (1328)
- **Sample Results**:
  1. 2020 TESLA MODEL Y (BEV) - 291 miles - Seattle, King County
  2. 2023 TESLA MODEL Y (BEV) - 0 miles - Bothell, Snohomish County
  3. 2019 TESLA MODEL S (BEV) - 270 miles - Seattle, King County
  4. 2016 TESLA MODEL S (BEV) - 210 miles - Issaquah, King County
  5. 2021 TESLA MODEL Y (BEV) - 0 miles - Suquamish, Kitsap County


### Test Case 10: EV Type
- **Description**: Plug-in Hybrid Electric Vehicles (PHEV) only
- **Filter Criteria**: `Electric Vehicle Type = PHEV`
- **Total Vehicles**: 10,539
- **BEV Count**: 0 (0%)
- **PHEV Count**: 10,539 (100%)
- **Average Range**: 30.62 miles
- **States**: 1 (WA)
- **Counties**: 20
- **Cities**: 128
- **Makes**: 25
- **Models**: 61
- **Status**: PASS
- **Top Makes**: BMW (1482), TOYOTA (1482), JEEP (1399), CHEVROLET (1085), CHRYSLER (908)
- **Sample Results**:
  1. 2017 FORD FUSION (PHEV) - 21 miles - Yelm, Thurston County
  2. 2018 KIA OPTIMA (PHEV) - 29 miles - Bothell, Snohomish County
  3. 2022 BMW X5 (PHEV) - 30 miles - Auburn, King County
  4. 2019 BMW I3 (PHEV) - 126 miles - Bainbridge Island, Kitsap County
  5. 2021 AUDI Q5 E (PHEV) - 18 miles - Lynnwood, Snohomish County


### Test Case 11: County
- **Description**: Vehicles registered in King County
- **Filter Criteria**: `County = King`
- **Total Vehicles**: 37,502
- **BEV Count**: 29,961 (79.89%)
- **PHEV Count**: 7,541 (20.11%)
- **Average Range**: 125.69 miles
- **States**: 1 (WA)
- **Counties**: 1
- **Cities**: 41
- **Makes**: 37
- **Models**: 130
- **Status**: PASS
- **Top Makes**: TESLA (17838), NISSAN (2842), CHEVROLET (2381), BMW (1767), KIA (1399)
- **Sample Results**:
  1. 2020 TESLA MODEL Y (BEV) - 291 miles - Seattle, King County
  2. 2019 TESLA MODEL S (BEV) - 270 miles - Seattle, King County
  3. 2016 TESLA MODEL S (BEV) - 210 miles - Issaquah, King County
  4. 2022 BMW X5 (PHEV) - 30 miles - Auburn, King County
  5. 2020 TESLA MODEL Y (BEV) - 291 miles - Seattle, King County


### Test Case 12: County
- **Description**: Vehicles registered in Snohomish County
- **Filter Criteria**: `County = Snohomish`
- **Total Vehicles**: 2,553
- **BEV Count**: 2,205 (86.37%)
- **PHEV Count**: 348 (13.63%)
- **Average Range**: 144.12 miles
- **States**: 1 (WA)
- **Counties**: 1
- **Cities**: 22
- **Makes**: 32
- **Models**: 96
- **Status**: PASS
- **Top Makes**: TESLA (1585), NISSAN (133), BMW (104), CHEVROLET (98), FORD (94)
- **Sample Results**:
  1. 2023 TESLA MODEL Y (BEV) - 0 miles - Bothell, Snohomish County
  2. 2018 KIA OPTIMA (PHEV) - 29 miles - Bothell, Snohomish County
  3. 2021 AUDI Q5 E (PHEV) - 18 miles - Lynnwood, Snohomish County
  4. 2013 NISSAN LEAF (BEV) - 75 miles - Lynnwood, Snohomish County
  5. 2017 NISSAN LEAF (BEV) - 107 miles - Bothell, Snohomish County


### Test Case 13: County
- **Description**: Vehicles registered in Clark County
- **Filter Criteria**: `County = Clark`
- **Total Vehicles**: 4,838
- **BEV Count**: 3,588 (74.16%)
- **PHEV Count**: 1,250 (25.84%)
- **Average Range**: 112.59 miles
- **States**: 1 (WA)
- **Counties**: 1
- **Cities**: 10
- **Makes**: 32
- **Models**: 107
- **Status**: PASS
- **Top Makes**: TESLA (2000), CHEVROLET (446), NISSAN (405), TOYOTA (336), FORD (291)
- **Sample Results**:
  1. 2021 FORD MUSTANG MACH-E (BEV) - 0 miles - Vancouver, Clark County
  2. 2023 TESLA MODEL Y (BEV) - 0 miles - Vancouver, Clark County
  3. 2022 TESLA MODEL Y (BEV) - 0 miles - Vancouver, Clark County
  4. 2023 TESLA MODEL Y (BEV) - 0 miles - Vancouver, Clark County
  5. 2022 TESLA MODEL 3 (BEV) - 0 miles - Vancouver, Clark County


### Test Case 14: CAFV Eligibility
- **Description**: Vehicles eligible for Clean Alternative Fuel Vehicle incentives
- **Filter Criteria**: `CAFV Eligibility = Clean Alternative Fuel Vehicle Eligible`
- **Total Vehicles**: 18,749
- **BEV Count**: 13,428 (71.62%)
- **PHEV Count**: 5,321 (28.38%)
- **Average Range**: 152.31 miles
- **States**: 1 (WA)
- **Counties**: 19
- **Cities**: 144
- **Makes**: 29
- **Models**: 60
- **Status**: PASS
- **Top Makes**: TESLA (7408), NISSAN (3071), CHEVROLET (2214), BMW (1121), CHRYSLER (908)
- **Sample Results**:
  1. 2020 TESLA MODEL Y (BEV) - 291 miles - Seattle, King County
  2. 2019 TESLA MODEL S (BEV) - 270 miles - Seattle, King County
  3. 2016 TESLA MODEL S (BEV) - 210 miles - Issaquah, King County
  4. 2013 NISSAN LEAF (BEV) - 75 miles - Yakima, Yakima County
  5. 2015 NISSAN LEAF (BEV) - 84 miles - Port Orchard, Kitsap County


### Test Case 15: CAFV Eligibility
- **Description**: Vehicles not eligible due to low battery range
- **Filter Criteria**: `CAFV Eligibility = Not eligible due to low battery range`
- **Total Vehicles**: 5,220
- **BEV Count**: 2 (0.04%)
- **PHEV Count**: 5,218 (99.96%)
- **Average Range**: 19.93 miles
- **States**: 1 (WA)
- **Counties**: 17
- **Cities**: 112
- **Makes**: 18
- **Models**: 43
- **Status**: PASS
- **Top Makes**: JEEP (1399), TOYOTA (862), FORD (706), BMW (521), VOLVO (475)
- **Sample Results**:
  1. 2017 FORD FUSION (PHEV) - 21 miles - Yelm, Thurston County
  2. 2018 KIA OPTIMA (PHEV) - 29 miles - Bothell, Snohomish County
  3. 2021 AUDI Q5 E (PHEV) - 18 miles - Lynnwood, Snohomish County
  4. 2013 FORD C-MAX (PHEV) - 19 miles - Yakima, Yakima County
  5. 2018 KIA NIRO (PHEV) - 26 miles - Seattle, King County


---

## Group Filter Test Cases (3 Combined Filters)


### Group Test Case 1: Recent Tesla BEV vehicles with high range
- **Combined Filter Criteria**: `Model Year >= 2020 AND Make = TESLA AND Electric Range > 250`
- **Filter Categories**: Model Year + Make + Electric Range
- **Total Vehicles**: 2,058
- **BEV Count**: 2,058 (100%)
- **PHEV Count**: 0 (0%)
- **Average Range**: 295.44 miles
- **States**: 1 (WA)
- **Counties**: 13
- **Cities**: 92
- **Makes**: 1
- **Models**: 4
- **Status**: PASS
- **Analysis**: This filter identifies recent tesla bev vehicles with high range.
- **Top Makes**: TESLA (2058)
- **Sample Results**:
  1. 2020 TESLA MODEL Y (BEV) - 291 miles - Seattle, King County
  2. 2020 TESLA MODEL Y (BEV) - 291 miles - Seattle, King County
  3. 2020 TESLA MODEL 3 (BEV) - 322 miles - Seattle, King County
  4. 2020 TESLA MODEL 3 (BEV) - 322 miles - Seattle, King County
  5. 2020 TESLA MODEL 3 (BEV) - 266 miles - Rochester, Thurston County


### Group Test Case 2: Older PHEV vehicles from King County
- **Combined Filter Criteria**: `Model Year < 2018 AND Electric Vehicle Type = PHEV AND County = King`
- **Filter Categories**: Model Year + EV Type + County
- **Total Vehicles**: 1,751
- **BEV Count**: 0 (0%)
- **PHEV Count**: 1,751 (100%)
- **Average Range**: 32.49 miles
- **States**: 1 (WA)
- **Counties**: 1
- **Cities**: 37
- **Makes**: 14
- **Models**: 23
- **Status**: PASS
- **Analysis**: This filter identifies older phev vehicles from king county.
- **Top Makes**: CHEVROLET (490), FORD (382), BMW (319), TOYOTA (311), AUDI (103)
- **Sample Results**:
  1. 2014 BMW I3 (PHEV) - 72 miles - Renton, King County
  2. 2017 BMW I8 (PHEV) - 14 miles - Seattle, King County
  3. 2017 BMW X5 (PHEV) - 14 miles - Seattle, King County
  4. 2015 BMW I3 (PHEV) - 72 miles - Seattle, King County
  5. 2016 BMW I3 (PHEV) - 72 miles - Vashon, King County


### Group Test Case 3: Mid-range BEV vehicles from 2019-2021 eligible for CAFV incentives
- **Combined Filter Criteria**: `Model Year >= 2019 AND Model Year <= 2021 AND Electric Vehicle Type = BEV AND CAFV Eligibility = Eligible`
- **Filter Categories**: Model Year + EV Type + CAFV Eligibility
- **Total Vehicles**: 5,524
- **BEV Count**: 5,524 (100%)
- **PHEV Count**: 0 (0%)
- **Average Range**: 243.69 miles
- **States**: 1 (WA)
- **Counties**: 15
- **Cities**: 116
- **Makes**: 14
- **Models**: 19
- **Status**: PASS
- **Analysis**: This filter identifies mid-range bev vehicles from 2019-2021 eligible for cafv incentives.
- **Top Makes**: TESLA (3416), CHEVROLET (598), NISSAN (574), KIA (246), AUDI (216)
- **Sample Results**:
  1. 2020 TESLA MODEL Y (BEV) - 291 miles - Seattle, King County
  2. 2019 TESLA MODEL S (BEV) - 270 miles - Seattle, King County
  3. 2020 TESLA MODEL Y (BEV) - 291 miles - Seattle, King County
  4. 2020 TESLA MODEL 3 (BEV) - 322 miles - Seattle, King County
  5. 2019 TESLA MODEL 3 (BEV) - 220 miles - Yakima, Yakima County


---

*Report generated on: 2026-02-01T06:13:58.085Z*
*Total processing time: <1 second*
*Data source: Electric_Vehicle_Population_Data.csv (50,000 records)*
