import type { ChartConfig } from '../components/ChartGrid';
import type { ChartDataPoint } from '../../../types';

interface ChartData {
  makeOrModelData: ChartDataPoint[];
  evTypeData: ChartDataPoint[];
  yearData: ChartDataPoint[];
  countyData: ChartDataPoint[];
  stateData: ChartDataPoint[];
  cityData: ChartDataPoint[];
}

export const createChartsConfig = (
  chartData: ChartData,
  isSingleMakeFiltered: boolean,
  filteredMake: string | null
): ChartConfig[][] => {
  // Row 1 Charts
  const row1Charts: ChartConfig[] = [
    {
      type: isSingleMakeFiltered ? 'pie' : 'bar',
      title: isSingleMakeFiltered ? `${filteredMake} Models` : 'Top Makes',
      data: chartData.makeOrModelData,
    },
    {
      type: 'pie',
      title: 'EV Type Distribution',
      data: chartData.evTypeData,
    },
  ];

  // Row 2 Charts
  const row2Charts: ChartConfig[] = [
    {
      type: 'line',
      title: 'Vehicles by Year',
      data: chartData.yearData,
    },
    {
      type: 'bar',
      title: 'Top Counties',
      data: chartData.countyData,
    },
  ];

  // Row 3 Charts
  const row3Charts: ChartConfig[] = [
    {
      type: 'bar',
      title: 'State Distribution',
      data: chartData.stateData,
    },
    {
      type: 'area',
      title: 'Top Cities',
      data: chartData.cityData,
    },
  ];

  return [row1Charts, row2Charts, row3Charts];
};