import { memo } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard = memo(({ title, value, icon, trend }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-600 truncate">{title}</p>
          <p className="mt-1 text-xl sm:text-2xl font-bold text-gray-900 truncate">{value}</p>
          {trend && (
            <p className={`mt-1 text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span className="font-medium">
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-gray-600 ml-1 hidden sm:inline">vs last period</span>
            </p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg flex items-center justify-center ml-2">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
});

StatsCard.displayName = 'StatsCard';
