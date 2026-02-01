import { memo } from 'react';
import { StatsCard } from '../../visualizations/StatsCard';

export interface StatsConfig {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface StatsGridProps {
  stats: StatsConfig[];
  gridCols: string;
}

export const StatsGrid = memo(({ stats, gridCols }: StatsGridProps) => {
  return (
    <div className={`grid ${gridCols} gap-2 sm:gap-3`}>
      {stats.map((stat, index) => (
        <StatsCard
          key={`${stat.title}-${index}`}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
        />
      ))}
    </div>
  );
});

StatsGrid.displayName = 'StatsGrid';