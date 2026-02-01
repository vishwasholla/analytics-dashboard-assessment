import { memo, useEffect, useState } from 'react';
import { useEVDataStore } from '../../store/useEVDataStore';
import { useCSVData } from '../../hooks/useCSVData';
import { DataTable } from '../table/DataTable';
import { FilterPanel } from '../filters/FilterPanel';
import { ActiveFilters } from '../filters/ActiveFilters';

// Dashboard components
import {
  LoadingState,
  ErrorState,
  WarningBanner,
  SidebarToggle,
  StatsGrid,
  ChartGrid,
} from './components';

// Hooks and configs
import { useDashboardData } from './hooks';
import { createVehicleStatsConfig, createPopulationStatsConfig, createChartsConfig } from './config';

export const Dashboard = memo(() => {
  const { data: csvData, loading, errors, reload } = useCSVData(import.meta.env.BASE_URL + 'data-to-visualize/Electric_Vehicle_Population_Data.csv');
  const { filteredData, filters, setData } = useEVDataStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load CSV data into store
  useEffect(() => {
    if (csvData.length > 0) {
      setData(csvData);
    }
  }, [csvData, setData]);

  // Process dashboard data
  const dashboardData = useDashboardData(filteredData, filters);

  // Show loading state
  if (loading.isLoading) {
    return <LoadingState progress={loading.progress} stage={loading.stage} />;
  }

  // Show error state
  if (loading.error) {
    return <ErrorState error={loading.error} onRetry={reload} />;
  }

  // Create stats configurations
  const vehicleStats = createVehicleStatsConfig({
    totalVehicles: dashboardData.stats.totalVehicles,
    bevCount: dashboardData.stats.bevCount,
    phevCount: dashboardData.stats.phevCount,
    avgRange: dashboardData.stats.avgRange,
    uniqueStates: dashboardData.uniqueStates,
    uniqueCounties: dashboardData.uniqueCounties,
    uniqueCities: dashboardData.uniqueCities,
    uniqueMakes: dashboardData.uniqueMakes,
    uniqueModels: dashboardData.uniqueModels,
  });

  const populationStats = createPopulationStatsConfig({
    totalVehicles: dashboardData.stats.totalVehicles,
    bevCount: dashboardData.stats.bevCount,
    phevCount: dashboardData.stats.phevCount,
    avgRange: dashboardData.stats.avgRange,
    uniqueStates: dashboardData.uniqueStates,
    uniqueCounties: dashboardData.uniqueCounties,
    uniqueCities: dashboardData.uniqueCities,
    uniqueMakes: dashboardData.uniqueMakes,
    uniqueModels: dashboardData.uniqueModels,
  });

  // Create charts configurations
  const [row1Charts, row2Charts, row3Charts] = createChartsConfig(
    dashboardData.chartData,
    dashboardData.isSingleMakeFiltered,
    dashboardData.filteredMake
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Show parsing errors if any */}
        <WarningBanner errorCount={errors.length} />

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 relative">
          {/* Mobile Filter Toggle Button */}
          <SidebarToggle 
            isOpen={isSidebarOpen} 
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
            variant="mobile" 
          />

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
          <SidebarToggle 
            isOpen={isSidebarOpen} 
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
            variant="desktop" 
          />

          {/* Main Content */}
          <div className={`
            flex-1 min-w-0 space-y-2 sm:space-y-3
            transition-all duration-300
            ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}
          `}>
            {/* Stats Cards - Row 1: Vehicle Types */}
            <StatsGrid 
              stats={vehicleStats} 
              gridCols="grid-cols-2 sm:grid-cols-2 md:grid-cols-4" 
            />

            {/* Stats Cards - Row 2: Population Analysis */}
            <StatsGrid 
              stats={populationStats} 
              gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-5" 
            />

            {/* Charts - Row 1 */}
            <ChartGrid 
              charts={row1Charts} 
              gridCols="grid-cols-1 md:grid-cols-2" 
            />

            {/* Charts - Row 2 */}
            <ChartGrid 
              charts={row2Charts} 
              gridCols="grid-cols-1 md:grid-cols-2" 
            />

            {/* Charts - Row 3: Location Analysis */}
            <ChartGrid 
              charts={row3Charts} 
              gridCols="grid-cols-1 md:grid-cols-2" 
            />
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
