import { useMemo } from 'react';
import { aggregateByField, calculateStats } from '../../../utils/dataProcessing';
import { APP_CONFIG } from '../../../constants';
import type { EVData } from '../../../types';

export const useDashboardData = (filteredData: EVData[], filters: any) => {
  return useMemo(() => {
    // Calculate statistics
    const stats = calculateStats(filteredData);

    // Additional population statistics
    const uniqueCounties = new Set(filteredData.map(v => v.county)).size;
    const uniqueCities = new Set(filteredData.map(v => v.city)).size;
    const uniqueStates = new Set(filteredData.map(v => v.state)).size;
    const uniqueMakes = new Set(filteredData.map(v => v.make)).size;
    const uniqueModels = new Set(filteredData.map(v => v.model)).size;

    // Check if a single make is filtered
    const isSingleMakeFiltered = filters.makes.length === 1;
    const filteredMake = isSingleMakeFiltered ? filters.makes[0] : null;

    // Prepare chart data
    const makeData = aggregateByField(filteredData, 'make', APP_CONFIG.MAX_CHART_ITEMS);
    
    // If single make is filtered, show models instead
    const makeOrModelData = isSingleMakeFiltered
      ? aggregateByField(filteredData, 'model', APP_CONFIG.MAX_CHART_ITEMS)
      : makeData;
    
    const countyData = aggregateByField(filteredData, 'county', APP_CONFIG.MAX_CHART_ITEMS);
    const evTypeData = aggregateByField(filteredData, 'evType');
    const yearData = aggregateByField(filteredData, 'modelYear');
    
    // Location-based data
    const stateData = aggregateByField(filteredData, 'state', 10);
    const cityData = aggregateByField(filteredData, 'city', APP_CONFIG.MAX_CHART_ITEMS);

    return {
      stats,
      uniqueCounties,
      uniqueCities,
      uniqueStates,
      uniqueMakes,
      uniqueModels,
      isSingleMakeFiltered,
      filteredMake,
      chartData: {
        makeOrModelData,
        countyData,
        evTypeData,
        yearData,
        stateData,
        cityData,
      },
    };
  }, [filteredData, filters]);
};