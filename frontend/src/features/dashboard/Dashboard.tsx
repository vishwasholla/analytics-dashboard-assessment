import { memo, useEffect } from 'react';
import { useEVDataStore } from '../../store/useEVDataStore';
import { useCSVData } from '../../hooks/useCSVData';
import { aggregateByField, calculateStats } from '../../utils/dataProcessing';
import { APP_CONFIG } from '../../constants';
import { StatsCard } from '../visualizations/StatsCard';
import { BarChartCard } from '../visualizations/BarChartCard';
import { PieChartCard } from '../visualizations/PieChartCard';
import { DataTable } from '../table/DataTable';
import { FilterPanel } from '../filters/FilterPanel';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';

export const Dashboard = memo(() => {
  const { data: csvData, loading, errors, reload } = useCSVData('/data-to-visualize/sample_vehicle_population_data.csv');
  const { filteredData, setData } = useEVDataStore();

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

  // Prepare chart data
  const makeData = aggregateByField(filteredData, 'make', APP_CONFIG.MAX_CHART_ITEMS);
  const countyData = aggregateByField(filteredData, 'county', APP_CONFIG.MAX_CHART_ITEMS);
  const evTypeData = aggregateByField(filteredData, 'evType');
  const yearData = aggregateByField(filteredData, 'modelYear');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Show parsing errors if any */}
        {errors.length > 0 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Data Parsing Warnings</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  {errors.length} row(s) had parsing issues but were handled gracefully.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Vehicles"
                value={stats.totalVehicles.toLocaleString()}
                icon={
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
              <StatsCard
                title="BEV Count"
                value={stats.bevCount.toLocaleString()}
                icon={
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <StatsCard
                title="PHEV Count"
                value={stats.phevCount.toLocaleString()}
                icon={
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
              <StatsCard
                title="Avg Range"
                value={`${stats.avgRange} mi`}
                icon={
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarChartCard title="Top Makes" data={makeData} />
              <PieChartCard title="EV Type Distribution" data={evTypeData} />
            </div>

            {/* Data Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarChartCard title="Top Counties" data={countyData} />
              <BarChartCard title="Vehicles by Year" data={yearData} />
            </div>
          </div>
        </div>

        {/* Data Table - Full Width */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Details</h2>
          <DataTable />
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';
