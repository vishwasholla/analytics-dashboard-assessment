import { memo, useEffect, useState } from 'react';
import { useEVDataStore } from '../../store/useEVDataStore';
import { useCSVData } from '../../hooks/useCSVData';
import { aggregateByField, calculateStats } from '../../utils/dataProcessing';
import { APP_CONFIG } from '../../constants';
import { StatsCard } from '../visualizations/StatsCard';
import { BarChartCard } from '../visualizations/BarChartCard';
import { PieChartCard } from '../visualizations/PieChartCard';
import { LineChartCard } from '../visualizations/LineChartCard';
import { AreaChartCard } from '../visualizations/AreaChartCard';
import { DataTable } from '../table/DataTable';
import { FilterPanel } from '../filters/FilterPanel';
import { ActiveFilters } from '../filters/ActiveFilters';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';

export const Dashboard = memo(() => {
  const { data: csvData, loading, errors, reload } = useCSVData('/data-to-visualize/sample_vehicle_population_data.csv');
  const { filteredData, filters, setData } = useEVDataStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load CSV data into store
  useEffect(() => {
    if (csvData.length > 0) {
      setData(csvData);
    }
  }, [csvData, setData]);

  // Show loading state
  if (loading.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Loading EV Data...</h2>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${loading.progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {loading.stage === 'fetching' && 'Fetching CSV file...'}
              {loading.stage === 'parsing' && 'Parsing CSV data...'}
              {loading.stage === 'processing' && 'Processing vehicle data...'}
            </p>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  // Show error state
  if (loading.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-center text-gray-900">Failed to Load Data</h2>
          <p className="mt-2 text-sm text-center text-gray-600">{loading.error}</p>
          <button
            onClick={reload}
            className="mt-6 w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Show parsing errors if any */}
        {errors.length > 0 && (
          <div className="mb-4 sm:mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="ml-3">
                <h3 className="text-xs sm:text-sm font-medium text-yellow-800">Data Parsing Warnings</h3>
                <p className="mt-1 text-xs sm:text-sm text-yellow-700">
                  {errors.length} row(s) had parsing issues but were handled gracefully.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 relative">
          {/* Mobile Filter Toggle Button - Always visible on mobile */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed top-20 right-4 z-50 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle filters"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>

          {/* Filters Sidebar - Collapsible */}
          <div className={`
            fixed lg:static inset-y-0 left-0 z-40
            w-72 sm:w-80 lg:w-64 xl:w-72
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            ${!isSidebarOpen ? 'lg:w-0 lg:overflow-hidden' : ''}
            lg:self-start
          `}>
            {/* Overlay for mobile */}
            {isSidebarOpen && (
              <div 
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 -z-10"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}
            
            <div className="h-full overflow-y-auto bg-gray-50 lg:bg-transparent p-4 lg:p-0">
              {/* Close button for mobile */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close filters"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <FilterPanel />
            </div>
          </div>

          {/* Desktop Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block fixed left-4 top-24 z-30 bg-white text-gray-600 p-2 rounded-lg shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle filters"
          >
            <svg 
              className={`w-5 h-5 transform transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Main Content */}
          <div className={`
            flex-1 min-w-0 space-y-2 sm:space-y-3
            transition-all duration-300
            ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}
          `}>
            {/* Stats Cards - Row 1: Vehicle Types */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              <StatsCard
                title="Total Vehicles"
                value={stats.totalVehicles.toLocaleString()}
                icon={
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
              <StatsCard
                title="BEV Count"
                value={stats.bevCount.toLocaleString()}
                icon={
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <StatsCard
                title="PHEV Count"
                value={stats.phevCount.toLocaleString()}
                icon={
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
              <StatsCard
                title="Avg Range"
                value={`${stats.avgRange} mi`}
                icon={
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
              />
            </div>

            {/* Stats Cards - Row 2: Population Analysis */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
              <StatsCard
                title="States"
                value={uniqueStates}
                icon={
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <StatsCard
                title="Counties"
                value={uniqueCounties}
                icon={
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              />
              <StatsCard
                title="Cities"
                value={uniqueCities}
                icon={
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
              />
              <StatsCard
                title="Makes"
                value={uniqueMakes}
                icon={
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                }
              />
              <StatsCard
                title="Models"
                value={uniqueModels}
                icon={
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                }
              />
            </div>

            {/* Charts - Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {isSingleMakeFiltered ? (
                <PieChartCard 
                  title={`${filteredMake} Models`} 
                  data={makeOrModelData} 
                />
              ) : (
                <BarChartCard title="Top Makes" data={makeOrModelData} />
              )}
              <PieChartCard title="EV Type Distribution" data={evTypeData} />
            </div>

            {/* Charts - Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              <LineChartCard title="Vehicles by Year" data={yearData} />
              <BarChartCard title="Top Counties" data={countyData} />
            </div>

            {/* Charts - Row 3: Location Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              <BarChartCard title="State Distribution" data={stateData} />
              <AreaChartCard title="Top Cities" data={cityData} />
            </div>
          </div>
        </div>

        {/* Data Table - Full Width */}
        <div className="mt-4 sm:mt-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Vehicle Details</h2>
            </div>
            <ActiveFilters />
            <div className="p-2 sm:p-4">
              <DataTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';
