/**
 * Comprehensive CSV Data Analysis and Test Case Generator
 * Analyzes electric vehicle data and generates filter test cases with detailed analysis
 */

const fs = require('fs');

class CSVAnalyzer {
    constructor() {
        this.data = [];
        this.analysis = {};
        this.testCases = {
            independent: [],
            grouped: []
        };
    }

    // Load and parse CSV data
    loadCSV(filePath) {
        try {
            const csvContent = fs.readFileSync(filePath, 'utf8');
            const lines = csvContent.split('\n').filter(line => line.trim());
            const headers = lines[0].split(',');
            
            this.data = lines.slice(1).map(line => {
                const values = this.parseCSVLine(line);
                const record = {};
                headers.forEach((header, index) => {
                    record[header.trim()] = values[index] ? values[index].trim() : '';
                });
                return record;
            }).filter(record => record['VIN (1-10)']); // Filter out empty records

            console.log(`Loaded ${this.data.length} records from CSV`);
            return true;
        } catch (error) {
            console.error('Error loading CSV:', error.message);
            return false;
        }
    }

    // Parse CSV line handling commas within quotes
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current);
        return result;
    }

    // Comprehensive data analysis
    analyzeData() {
        console.log('\nStarting comprehensive data analysis...\n');

        // Basic counts
        const totalVehicles = this.data.length;
        const bevVehicles = this.data.filter(record => 
            record['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)'
        ).length;
        const phevVehicles = this.data.filter(record => 
            record['Electric Vehicle Type'] === 'Plug-in Hybrid Electric Vehicle (PHEV)'
        ).length;

        // Average range calculation
        const rangeValues = this.data
            .map(record => parseInt(record['Electric Range']) || 0)
            .filter(range => range > 0);
        const avgRange = rangeValues.length > 0 ? 
            (rangeValues.reduce((sum, range) => sum + range, 0) / rangeValues.length).toFixed(2) : 0;

        // Geographic analysis
        const states = [...new Set(this.data.map(record => record.State))];
        const counties = [...new Set(this.data.map(record => record.County))];
        const cities = [...new Set(this.data.map(record => record.City))];

        // Manufacturer analysis
        const makes = [...new Set(this.data.map(record => record.Make))];
        const models = [...new Set(this.data.map(record => record.Model))];

        // Top makes analysis
        const makeCount = {};
        this.data.forEach(record => {
            const make = record.Make;
            makeCount[make] = (makeCount[make] || 0) + 1;
        });
        const topMakes = Object.entries(makeCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);

        // EV type percentage distribution
        const bevPercentage = ((bevVehicles / totalVehicles) * 100).toFixed(2);
        const phevPercentage = ((phevVehicles / totalVehicles) * 100).toFixed(2);

        // Vehicles by year
        const yearCount = {};
        this.data.forEach(record => {
            const year = record['Model Year'];
            if (year && year !== '0') {
                yearCount[year] = (yearCount[year] || 0) + 1;
            }
        });
        const vehiclesByYear = Object.entries(yearCount)
            .sort(([a], [b]) => parseInt(b) - parseInt(a));

        // Top counties (treating as countries for this analysis)
        const countyCount = {};
        this.data.forEach(record => {
            const county = record.County;
            countyCount[county] = (countyCount[county] || 0) + 1;
        });
        const topCounties = Object.entries(countyCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);

        // Top cities
        const cityCount = {};
        this.data.forEach(record => {
            const city = record.City;
            cityCount[city] = (cityCount[city] || 0) + 1;
        });
        const topCities = Object.entries(cityCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);

        // Store analysis results
        this.analysis = {
            totalVehicles,
            totalBEV: bevVehicles,
            totalPHEV: phevVehicles,
            avgRange: parseFloat(avgRange),
            uniqueStates: states.length,
            uniqueCounties: counties.length,
            uniqueCities: cities.length,
            uniqueMakes: makes.length,
            uniqueModels: models.length,
            topMakes,
            evTypeDistribution: {
                BEV: { count: bevVehicles, percentage: parseFloat(bevPercentage) },
                PHEV: { count: phevVehicles, percentage: parseFloat(phevPercentage) }
            },
            vehiclesByYear,
            topCounties,
            topCities,
            states,
            counties,
            cities,
            makes,
            models
        };

        this.printAnalysis();
    }

    // Print comprehensive analysis
    printAnalysis() {
        const a = this.analysis;
        
        console.log('='.repeat(80));
        console.log('                    COMPREHENSIVE CSV DATA ANALYSIS');
        console.log('='.repeat(80));
        
        console.log('\nBASIC STATISTICS:');
        console.log(`   Total Vehicles: ${a.totalVehicles.toLocaleString()}`);
        console.log(`   Total BEV: ${a.totalBEV.toLocaleString()}`);
        console.log(`   Total PHEV: ${a.totalPHEV.toLocaleString()}`);
        console.log(`   Average Range: ${a.avgRange} miles`);
        
        console.log('\nGEOGRAPHIC COVERAGE:');
        console.log(`   States: ${a.uniqueStates} (${a.states.join(', ')})`);
        console.log(`   Counties: ${a.uniqueCounties}`);
        console.log(`   Cities: ${a.uniqueCities}`);
        
        console.log('\nVEHICLE DIVERSITY:');
        console.log(`   Makes: ${a.uniqueMakes}`);
        console.log(`   Models: ${a.uniqueModels}`);
        
        console.log('\nTOP 10 MAKES:');
        a.topMakes.forEach(([make, count], index) => {
            console.log(`   ${index + 1}. ${make}: ${count.toLocaleString()} vehicles`);
        });
        
        console.log('\nEV TYPE DISTRIBUTION:');
        console.log(`   BEV: ${a.evTypeDistribution.BEV.count.toLocaleString()} (${a.evTypeDistribution.BEV.percentage}%)`);
        console.log(`   PHEV: ${a.evTypeDistribution.PHEV.count.toLocaleString()} (${a.evTypeDistribution.PHEV.percentage}%)`);
        
        console.log('\nVEHICLES BY YEAR (Top 10):');
        a.vehiclesByYear.slice(0, 10).forEach(([year, count]) => {
            console.log(`   ${year}: ${count.toLocaleString()} vehicles`);
        });
        
        console.log('\nTOP 10 COUNTIES:');
        a.topCounties.forEach(([county, count], index) => {
            console.log(`   ${index + 1}. ${county}: ${count.toLocaleString()} vehicles`);
        });
        
        console.log('\nTOP 10 CITIES:');
        a.topCities.forEach(([city, count], index) => {
            console.log(`   ${index + 1}. ${city}: ${count.toLocaleString()} vehicles`);
        });
        
        console.log('\n' + '='.repeat(80));
    }

    // Analyze filtered data comprehensively
    analyzeFilteredData(filteredData, filterName) {
        if (filteredData.length === 0) {
            return {
                totalVehicles: 0,
                totalBEV: 0,
                totalPHEV: 0,
                avgRange: 0,
                states: [],
                counties: [],
                cities: [],
                makes: [],
                models: [],
                topMakes: [],
                evTypeDistribution: { BEV: { count: 0, percentage: 0 }, PHEV: { count: 0, percentage: 0 } },
                vehiclesByYear: [],
                topCounties: [],
                topCities: []
            };
        }

        // Basic counts
        const totalVehicles = filteredData.length;
        const bevVehicles = filteredData.filter(record => 
            record['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)'
        ).length;
        const phevVehicles = filteredData.filter(record => 
            record['Electric Vehicle Type'] === 'Plug-in Hybrid Electric Vehicle (PHEV)'
        ).length;

        // Average range calculation
        const rangeValues = filteredData
            .map(record => parseInt(record['Electric Range']) || 0)
            .filter(range => range > 0);
        const avgRange = rangeValues.length > 0 ? 
            (rangeValues.reduce((sum, range) => sum + range, 0) / rangeValues.length).toFixed(2) : 0;

        // Geographic analysis
        const states = [...new Set(filteredData.map(record => record.State))];
        const counties = [...new Set(filteredData.map(record => record.County))];
        const cities = [...new Set(filteredData.map(record => record.City))];

        // Manufacturer analysis
        const makes = [...new Set(filteredData.map(record => record.Make))];
        const models = [...new Set(filteredData.map(record => record.Model))];

        // Top makes analysis
        const makeCount = {};
        filteredData.forEach(record => {
            const make = record.Make;
            makeCount[make] = (makeCount[make] || 0) + 1;
        });
        const topMakes = Object.entries(makeCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);

        // EV type percentage distribution
        const bevPercentage = totalVehicles > 0 ? ((bevVehicles / totalVehicles) * 100).toFixed(2) : 0;
        const phevPercentage = totalVehicles > 0 ? ((phevVehicles / totalVehicles) * 100).toFixed(2) : 0;

        // Vehicles by year
        const yearCount = {};
        filteredData.forEach(record => {
            const year = record['Model Year'];
            if (year && year !== '0') {
                yearCount[year] = (yearCount[year] || 0) + 1;
            }
        });
        const vehiclesByYear = Object.entries(yearCount)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .slice(0, 10);

        // Top counties
        const countyCount = {};
        filteredData.forEach(record => {
            const county = record.County;
            countyCount[county] = (countyCount[county] || 0) + 1;
        });
        const topCounties = Object.entries(countyCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);

        // Top cities
        const cityCount = {};
        filteredData.forEach(record => {
            const city = record.City;
            cityCount[city] = (cityCount[city] || 0) + 1;
        });
        const topCities = Object.entries(cityCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);

        return {
            totalVehicles,
            totalBEV: bevVehicles,
            totalPHEV: phevVehicles,
            avgRange: parseFloat(avgRange),
            states,
            counties,
            cities,
            makes,
            models,
            topMakes,
            evTypeDistribution: {
                BEV: { count: bevVehicles, percentage: parseFloat(bevPercentage) },
                PHEV: { count: phevVehicles, percentage: parseFloat(phevPercentage) }
            },
            vehiclesByYear,
            topCounties,
            topCities
        };
    }

    // Print detailed filter analysis
    printFilterAnalysis(analysis, filterName, criteria) {
        console.log(`\n${'='.repeat(80)}`);
        console.log(`DETAILED ANALYSIS FOR: ${filterName}`);
        console.log(`Filter Criteria: ${criteria}`);
        console.log(`${'='.repeat(80)}`);
        
        console.log(`\nBASIC STATISTICS:`);
        console.log(`   Total Vehicles: ${analysis.totalVehicles.toLocaleString()}`);
        console.log(`   Total BEV: ${analysis.totalBEV.toLocaleString()}`);
        console.log(`   Total PHEV: ${analysis.totalPHEV.toLocaleString()}`);
        console.log(`   Average Range: ${analysis.avgRange} miles`);
        
        console.log(`\nGEOGRAPHIC COVERAGE:`);
        console.log(`   States: ${analysis.states.length} (${analysis.states.join(', ')})`);
        console.log(`   Counties: ${analysis.counties.length}`);
        console.log(`   Cities: ${analysis.cities.length}`);
        
        console.log(`\nVEHICLE DIVERSITY:`);
        console.log(`   Makes: ${analysis.makes.length}`);
        console.log(`   Models: ${analysis.models.length}`);
        
        if (analysis.topMakes.length > 0) {
            console.log(`\nTOP MAKES:`);
            analysis.topMakes.forEach(([make, count], index) => {
                console.log(`   ${index + 1}. ${make}: ${count.toLocaleString()} vehicles`);
            });
        }
        
        console.log(`\nEV TYPE DISTRIBUTION:`);
        console.log(`   BEV: ${analysis.evTypeDistribution.BEV.count.toLocaleString()} (${analysis.evTypeDistribution.BEV.percentage}%)`);
        console.log(`   PHEV: ${analysis.evTypeDistribution.PHEV.count.toLocaleString()} (${analysis.evTypeDistribution.PHEV.percentage}%)`);
        
        if (analysis.vehiclesByYear.length > 0) {
            console.log(`\nVEHICLES BY YEAR:`);
            analysis.vehiclesByYear.forEach(([year, count]) => {
                console.log(`   ${year}: ${count.toLocaleString()} vehicles`);
            });
        }
        
        if (analysis.topCounties.length > 0) {
            console.log(`\nTOP COUNTIES:`);
            analysis.topCounties.forEach(([county, count], index) => {
                console.log(`   ${index + 1}. ${county}: ${count.toLocaleString()} vehicles`);
            });
        }
        
        if (analysis.topCities.length > 0) {
            console.log(`\nTOP CITIES:`);
            analysis.topCities.forEach(([city, count], index) => {
                console.log(`   ${index + 1}. ${city}: ${count.toLocaleString()} vehicles`);
            });
        }
        
        console.log(`\n${'='.repeat(80)}\n`);
    }

    // Generate independent filter test cases
    generateIndependentFilters() {
        console.log('\nGenerating Independent Filter Test Cases with Detailed Analysis...\n');
        
        const filters = [
            {
                type: 'Model Year',
                description: 'Vehicles with model year greater than 2020 and less than 2023',
                filter: record => {
                    const year = parseInt(record['Model Year']);
                    return year >= 2020 && year <= 2023;
                },
                criteria: 'Model Year >= 2020 AND Model Year <= 2023'
            },
            {
                type: 'Model Year',
                description: 'Vehicles from 2015 to 2018 (inclusive)',
                filter: record => {
                    const year = parseInt(record['Model Year']);
                    return year >= 2015 && year <= 2018;
                },
                criteria: 'Model Year >= 2015 AND Model Year <= 2018'
            },
            {
                type: 'Electric Range',
                description: 'Vehicles with electric range greater than 200 miles and less than 300 miles',
                filter: record => {
                    const range = parseInt(record['Electric Range']) || 0;
                    return range > 200 && range < 300;
                },
                criteria: 'Electric Range > 200 AND Electric Range < 300'
            },
            {
                type: 'Electric Range',
                description: 'Vehicles with electric range between 100 and 150 miles (inclusive)',
                filter: record => {
                    const range = parseInt(record['Electric Range']) || 0;
                    return range >= 100 && range <= 150;
                },
                criteria: 'Electric Range >= 100 AND Electric Range <= 150'
            },
            {
                type: 'Electric Range',
                description: 'Vehicles with electric range less than 50 miles',
                filter: record => {
                    const range = parseInt(record['Electric Range']) || 0;
                    return range > 0 && range < 50;
                },
                criteria: 'Electric Range > 0 AND Electric Range < 50'
            },
            {
                type: 'Make',
                description: 'Tesla vehicles only',
                filter: record => record.Make === 'TESLA',
                criteria: 'Make = TESLA'
            },
            {
                type: 'Make',
                description: 'Nissan vehicles only',
                filter: record => record.Make === 'NISSAN',
                criteria: 'Make = NISSAN'
            },
            {
                type: 'Make',
                description: 'BMW vehicles only',
                filter: record => record.Make === 'BMW',
                criteria: 'Make = BMW'
            },
            {
                type: 'EV Type',
                description: 'Battery Electric Vehicles (BEV) only',
                filter: record => record['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)',
                criteria: 'Electric Vehicle Type = BEV'
            },
            {
                type: 'EV Type',
                description: 'Plug-in Hybrid Electric Vehicles (PHEV) only',
                filter: record => record['Electric Vehicle Type'] === 'Plug-in Hybrid Electric Vehicle (PHEV)',
                criteria: 'Electric Vehicle Type = PHEV'
            },
            {
                type: 'County',
                description: 'Vehicles registered in King County',
                filter: record => record.County === 'King',
                criteria: 'County = King'
            },
            {
                type: 'County',
                description: 'Vehicles registered in Snohomish County',
                filter: record => record.County === 'Snohomish',
                criteria: 'County = Snohomish'
            },
            {
                type: 'County',
                description: 'Vehicles registered in Clark County',
                filter: record => record.County === 'Clark',
                criteria: 'County = Clark'
            },
            {
                type: 'CAFV Eligibility',
                description: 'Vehicles eligible for Clean Alternative Fuel Vehicle incentives',
                filter: record => record['Clean Alternative Fuel Vehicle (CAFV) Eligibility'] === 'Clean Alternative Fuel Vehicle Eligible',
                criteria: 'CAFV Eligibility = Clean Alternative Fuel Vehicle Eligible'
            },
            {
                type: 'CAFV Eligibility',
                description: 'Vehicles not eligible due to low battery range',
                filter: record => record['Clean Alternative Fuel Vehicle (CAFV) Eligibility'] === 'Not eligible due to low battery range',
                criteria: 'CAFV Eligibility = Not eligible due to low battery range'
            }
        ];

        // Execute and display results
        this.testCases.independent = filters.map((testCase, index) => {
            const filteredData = this.data.filter(testCase.filter);
            const analysis = this.analyzeFilteredData(filteredData, testCase.description);
            
            // Print detailed analysis for each filter
            this.printFilterAnalysis(analysis, testCase.description, testCase.criteria);
            
            const result = {
                id: index + 1,
                type: testCase.type,
                description: testCase.description,
                criteria: testCase.criteria,
                analysis: analysis,
                sampleRecords: filteredData.slice(0, 5).map(record => ({
                    make: record.Make,
                    model: record.Model,
                    year: record['Model Year'],
                    type: record['Electric Vehicle Type'],
                    range: record['Electric Range'],
                    county: record.County,
                    city: record.City
                }))
            };
            
            if (result.sampleRecords.length > 0) {
                console.log(`SAMPLE RECORDS:`);
                result.sampleRecords.forEach((sample, i) => {
                    console.log(`   ${i + 1}. ${sample.year} ${sample.make} ${sample.model} (${sample.type.includes('BEV') ? 'BEV' : 'PHEV'}) - ${sample.range} miles - ${sample.city}, ${sample.county} County`);
                });
                console.log('');
            }
            
            return result;
        });
    }

    // Generate group filter test cases (3 filters combined)
    generateGroupFilters() {
        console.log('\nGenerating Group Filter Test Cases (3 filters combined) with Detailed Analysis...\n');
        
        const groupFilters = [
            {
                description: 'Recent Tesla BEV vehicles with high range',
                filters: [
                    { type: 'Model Year', condition: record => parseInt(record['Model Year']) >= 2020 },
                    { type: 'Make', condition: record => record.Make === 'TESLA' },
                    { type: 'Electric Range', condition: record => parseInt(record['Electric Range']) > 250 }
                ],
                criteria: 'Model Year >= 2020 AND Make = TESLA AND Electric Range > 250'
            },
            {
                description: 'Older PHEV vehicles from King County',
                filters: [
                    { type: 'Model Year', condition: record => parseInt(record['Model Year']) < 2018 },
                    { type: 'EV Type', condition: record => record['Electric Vehicle Type'] === 'Plug-in Hybrid Electric Vehicle (PHEV)' },
                    { type: 'County', condition: record => record.County === 'King' }
                ],
                criteria: 'Model Year < 2018 AND Electric Vehicle Type = PHEV AND County = King'
            },
            {
                description: 'Mid-range BEV vehicles from 2019-2021 eligible for CAFV incentives',
                filters: [
                    { type: 'Model Year', condition: record => {
                        const year = parseInt(record['Model Year']);
                        return year >= 2019 && year <= 2021;
                    }},
                    { type: 'EV Type', condition: record => record['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)' },
                    { type: 'CAFV Eligibility', condition: record => record['Clean Alternative Fuel Vehicle (CAFV) Eligibility'] === 'Clean Alternative Fuel Vehicle Eligible' }
                ],
                criteria: 'Model Year >= 2019 AND Model Year <= 2021 AND Electric Vehicle Type = BEV AND CAFV Eligibility = Eligible'
            }
        ];

        this.testCases.grouped = groupFilters.map((testCase, index) => {
            const filteredData = this.data.filter(record => 
                testCase.filters.every(filter => filter.condition(record))
            );
            
            const analysis = this.analyzeFilteredData(filteredData, testCase.description);
            
            // Print detailed analysis for each group filter
            this.printFilterAnalysis(analysis, testCase.description, testCase.criteria);
            
            const result = {
                id: index + 1,
                description: testCase.description,
                criteria: testCase.criteria,
                filterTypes: testCase.filters.map(f => f.type),
                analysis: analysis,
                sampleRecords: filteredData.slice(0, 5).map(record => ({
                    make: record.Make,
                    model: record.Model,
                    year: record['Model Year'],
                    type: record['Electric Vehicle Type'],
                    range: record['Electric Range'],
                    county: record.County,
                    city: record.City
                }))
            };
            
            if (result.sampleRecords.length > 0) {
                console.log(`SAMPLE RECORDS:`);
                result.sampleRecords.forEach((sample, i) => {
                    console.log(`   ${i + 1}. ${sample.year} ${sample.make} ${sample.model} (${sample.type.includes('BEV') ? 'BEV' : 'PHEV'}) - ${sample.range} miles - ${sample.city}, ${sample.county} County`);
                });
                console.log('');
            }
            
            return result;
        });
    }

    // Export results to JSON
    exportResults() {
        const results = {
            analysis: this.analysis,
            testCases: this.testCases,
            metadata: {
                generatedAt: new Date().toISOString(),
                totalRecords: this.data.length,
                independentTestCases: this.testCases.independent.length,
                groupTestCases: this.testCases.grouped.length
            }
        };

        const outputPath = './csv-analysis-results.json';
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
        console.log(`\nResults exported to: ${outputPath}`);
        
        return results;
    }

    // Generate detailed markdown report
    generateDetailedReport() {
        const reportPath = './detailed-test-cases-report.md';
        const a = this.analysis;
        
        let report = `# Comprehensive CSV Data Analysis and Test Cases Report

## Executive Summary

This report provides a comprehensive analysis of the Electric Vehicle Population Data CSV file containing **${a.totalVehicles.toLocaleString()} records** from Washington state. The analysis includes detailed statistics, independent filter test cases, and group filter combinations with human-readable descriptions.

---

## Comprehensive Data Analysis Results

### Basic Statistics
- **Total Vehicles**: ${a.totalVehicles.toLocaleString()}
- **Total BEV (Battery Electric Vehicles)**: ${a.totalBEV.toLocaleString()} (${a.evTypeDistribution.BEV.percentage}%)
- **Total PHEV (Plug-in Hybrid Electric Vehicles)**: ${a.totalPHEV.toLocaleString()} (${a.evTypeDistribution.PHEV.percentage}%)
- **Average Electric Range**: ${a.avgRange} miles

### Geographic Coverage
- **States**: ${a.uniqueStates} (${a.states.join(', ')})
- **Counties**: ${a.uniqueCounties} unique counties
- **Cities**: ${a.uniqueCities} unique cities

### Vehicle Diversity
- **Unique Makes**: ${a.uniqueMakes} different manufacturers
- **Unique Models**: ${a.uniqueModels} different vehicle models

### Top 10 Vehicle Makes by Count
${a.topMakes.map(([make, count], index) => 
    `${index + 1}. **${make}**: ${count.toLocaleString()} vehicles (${((count / a.totalVehicles) * 100).toFixed(2)}%)`
).join('\n')}

### Vehicle Distribution by Year (Top 10)
${a.vehiclesByYear.slice(0, 10).map(([year, count], index) => 
    `${index + 1}. **${year}**: ${count.toLocaleString()} vehicles (${((count / a.totalVehicles) * 100).toFixed(2)}%)`
).join('\n')}

### Top 10 Counties by Vehicle Count
${a.topCounties.map(([county, count], index) => 
    `${index + 1}. **${county} County**: ${count.toLocaleString()} vehicles (${((count / a.totalVehicles) * 100).toFixed(2)}%)`
).join('\n')}

### Top 10 Cities by Vehicle Count
${a.topCities.map(([city, count], index) => 
    `${index + 1}. **${city}**: ${count.toLocaleString()} vehicles (${((count / a.totalVehicles) * 100).toFixed(2)}%)`
).join('\n')}

---

## Independent Filter Test Cases

${this.testCases.independent.map(testCase => `
### Test Case ${testCase.id}: ${testCase.type}
- **Description**: ${testCase.description}
- **Filter Criteria**: \`${testCase.criteria}\`
- **Total Vehicles**: ${testCase.analysis.totalVehicles.toLocaleString()}
- **BEV Count**: ${testCase.analysis.totalBEV.toLocaleString()} (${testCase.analysis.evTypeDistribution.BEV.percentage}%)
- **PHEV Count**: ${testCase.analysis.totalPHEV.toLocaleString()} (${testCase.analysis.evTypeDistribution.PHEV.percentage}%)
- **Average Range**: ${testCase.analysis.avgRange} miles
- **States**: ${testCase.analysis.states.length} (${testCase.analysis.states.join(', ')})
- **Counties**: ${testCase.analysis.counties.length}
- **Cities**: ${testCase.analysis.cities.length}
- **Makes**: ${testCase.analysis.makes.length}
- **Models**: ${testCase.analysis.models.length}
- **Status**: ${testCase.analysis.totalVehicles > 0 ? 'PASS' : 'FAIL (No matches)'}
${testCase.analysis.topMakes.length > 0 ? `- **Top Makes**: ${testCase.analysis.topMakes.slice(0, 5).map(([make, count]) => `${make} (${count})`).join(', ')}` : ''}
${testCase.sampleRecords.length > 0 ? `- **Sample Results**:
${testCase.sampleRecords.map((sample, i) => 
    `  ${i + 1}. ${sample.year} ${sample.make} ${sample.model} (${sample.type.includes('BEV') ? 'BEV' : 'PHEV'}) - ${sample.range} miles - ${sample.city}, ${sample.county} County`
).join('\n')}` : ''}
`).join('\n')}

---

## Group Filter Test Cases (3 Combined Filters)

${this.testCases.grouped.map(testCase => `
### Group Test Case ${testCase.id}: ${testCase.description}
- **Combined Filter Criteria**: \`${testCase.criteria}\`
- **Filter Categories**: ${testCase.filterTypes.join(' + ')}
- **Total Vehicles**: ${testCase.analysis.totalVehicles.toLocaleString()}
- **BEV Count**: ${testCase.analysis.totalBEV.toLocaleString()} (${testCase.analysis.evTypeDistribution.BEV.percentage}%)
- **PHEV Count**: ${testCase.analysis.totalPHEV.toLocaleString()} (${testCase.analysis.evTypeDistribution.PHEV.percentage}%)
- **Average Range**: ${testCase.analysis.avgRange} miles
- **States**: ${testCase.analysis.states.length} (${testCase.analysis.states.join(', ')})
- **Counties**: ${testCase.analysis.counties.length}
- **Cities**: ${testCase.analysis.cities.length}
- **Makes**: ${testCase.analysis.makes.length}
- **Models**: ${testCase.analysis.models.length}
- **Status**: ${testCase.analysis.totalVehicles >= 5 ? 'PASS' : 'WARN (Low matches)'}
- **Analysis**: This filter identifies ${testCase.description.toLowerCase()}.
${testCase.analysis.topMakes.length > 0 ? `- **Top Makes**: ${testCase.analysis.topMakes.slice(0, 5).map(([make, count]) => `${make} (${count})`).join(', ')}` : ''}
${testCase.sampleRecords.length > 0 ? `- **Sample Results**:
${testCase.sampleRecords.map((sample, i) => 
    `  ${i + 1}. ${sample.year} ${sample.make} ${sample.model} (${sample.type.includes('BEV') ? 'BEV' : 'PHEV'}) - ${sample.range} miles - ${sample.city}, ${sample.county} County`
).join('\n')}` : ''}
`).join('\n')}

---

*Report generated on: ${new Date().toISOString()}*
*Total processing time: <1 minute*
*Data source: Electric_Vehicle_Population_Data.csv (${a.totalVehicles.toLocaleString()} records)*
`;

        fs.writeFileSync(reportPath, report);
        console.log(`Detailed report exported to: ${reportPath}`);
        
        return reportPath;
    }

    // Generate human-readable summary report
    generateSummaryReport() {
        console.log('\nHUMAN-READABLE TEST CASE SUMMARY');
        console.log('='.repeat(80));
        
        console.log('\nINDEPENDENT FILTER TEST CASES:');
        console.log('-'.repeat(50));
        this.testCases.independent.forEach(testCase => {
            console.log(`\n${testCase.id}. ${testCase.description}`);
            console.log(`   Filter: ${testCase.criteria}`);
            console.log(`   Total Vehicles: ${testCase.analysis.totalVehicles.toLocaleString()}`);
            console.log(`   BEV: ${testCase.analysis.totalBEV.toLocaleString()} (${testCase.analysis.evTypeDistribution.BEV.percentage}%)`);
            console.log(`   PHEV: ${testCase.analysis.totalPHEV.toLocaleString()} (${testCase.analysis.evTypeDistribution.PHEV.percentage}%)`);
            console.log(`   Avg Range: ${testCase.analysis.avgRange} miles`);
            console.log(`   Counties: ${testCase.analysis.counties.length}, Cities: ${testCase.analysis.cities.length}, Makes: ${testCase.analysis.makes.length}`);
            console.log(`   Status: ${testCase.analysis.totalVehicles > 0 ? 'PASS' : 'FAIL (No matches)'}`);
        });
        
        console.log('\n\nGROUP FILTER TEST CASES:');
        console.log('-'.repeat(50));
        this.testCases.grouped.forEach(testCase => {
            console.log(`\n${testCase.id}. ${testCase.description}`);
            console.log(`   Combined Filters: ${testCase.criteria}`);
            console.log(`   Filter Categories: ${testCase.filterTypes.join(' + ')}`);
            console.log(`   Total Vehicles: ${testCase.analysis.totalVehicles.toLocaleString()}`);
            console.log(`   BEV: ${testCase.analysis.totalBEV.toLocaleString()} (${testCase.analysis.evTypeDistribution.BEV.percentage}%)`);
            console.log(`   PHEV: ${testCase.analysis.totalPHEV.toLocaleString()} (${testCase.analysis.evTypeDistribution.PHEV.percentage}%)`);
            console.log(`   Avg Range: ${testCase.analysis.avgRange} miles`);
            console.log(`   Counties: ${testCase.analysis.counties.length}, Cities: ${testCase.analysis.cities.length}, Makes: ${testCase.analysis.makes.length}`);
            console.log(`   Status: ${testCase.analysis.totalVehicles >= 5 ? 'PASS' : 'WARN (Low matches)'}`);
        });
        
        console.log('\n' + '='.repeat(80));
    }

    // Main execution method
    async run(csvFilePath) {
        console.log('Starting CSV Data Analysis and Test Case Generation\n');
        
        // Load CSV data
        if (!this.loadCSV(csvFilePath)) {
            return false;
        }
        
        // Perform comprehensive analysis
        this.analyzeData();
        
        // Generate test cases with detailed analysis
        this.generateIndependentFilters();
        this.generateGroupFilters();
        
        // Generate summary report
        this.generateSummaryReport();
        
        // Export results
        this.exportResults();
        
        // Generate detailed report
        this.generateDetailedReport();
        
        console.log('\nAnalysis and test case generation completed successfully!');
        return true;
    }
}

// Usage
const analyzer = new CSVAnalyzer();
const csvPath = '../public/data-to-visualize/Electric_Vehicle_Population_Data.csv';

analyzer.run(csvPath).then(success => {
    if (success) {
        console.log('\nAll operations completed successfully!');
    } else {
        console.log('\nAnalysis failed. Please check the CSV file path and format.');
    }
}).catch(error => {
    console.error('Unexpected error:', error);
});

module.exports = CSVAnalyzer;