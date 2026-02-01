import { memo } from 'react';
import { BarChartCard } from '../../visualizations/BarChartCard';
import { PieChartCard } from '../../visualizations/PieChartCard';
import { LineChartCard } from '../../visualizations/LineChartCard';
import { AreaChartCard } from '../../visualizations/AreaChartCard';
import type { ChartDataPoint } from '../../../types';

export interface ChartConfig {
  type: 'bar' | 'pie' | 'line' | 'area';
  title: string;
  data: ChartDataPoint[];
  dataKey?: string;
}

interface ChartGridProps {
  charts: ChartConfig[];
  gridCols: string;
}

const ChartComponent = memo(({ config }: { config: ChartConfig }) => {
  switch (config.type) {
    case 'bar':
      return <BarChartCard title={config.title} data={config.data} dataKey={config.dataKey} />;
    case 'pie':
      return <PieChartCard title={config.title} data={config.data} />;
    case 'line':
      return <LineChartCard title={config.title} data={config.data} dataKey={config.dataKey} />;
    case 'area':
      return <AreaChartCard title={config.title} data={config.data} dataKey={config.dataKey} />;
    default:
      return null;
  }
});

ChartComponent.displayName = 'ChartComponent';

export const ChartGrid = memo(({ charts, gridCols }: ChartGridProps) => {
  return (
    <div className={`grid ${gridCols} gap-2 sm:gap-3`}>
      {charts.map((chart, index) => (
        <ChartComponent key={`${chart.title}-${index}`} config={chart} />
      ))}
    </div>
  );
});

ChartGrid.displayName = 'ChartGrid';