import { memo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { ChartDataPoint } from '../../types';
import { CHART_COLORS } from '../../constants';

interface PieChartCardProps {
  title: string;
  data: ChartDataPoint[];
}

export const PieChartCard = memo(({ title, data }: PieChartCardProps) => {
  // Custom label that only shows percentage inside, name in legend
  const renderLabel = ({ percent }: any) => {
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-2 sm:p-3">
      <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{title}</h3>
      <div className="h-40 sm:h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderLabel}
              outerRadius={50}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontSize: '11px' }} />
            <Legend 
              wrapperStyle={{ fontSize: '11px' }} 
              iconSize={8}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

PieChartCard.displayName = 'PieChartCard';
