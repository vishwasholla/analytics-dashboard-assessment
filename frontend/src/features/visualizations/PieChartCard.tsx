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
    // Only show percentage if it's significant enough (>= 5%)
    return percent >= 0.05 ? `${(percent * 100).toFixed(0)}%` : '';
  };

  return (
    <div className="bg-white rounded-lg shadow p-2 sm:p-3">
      <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{title}</h3>
      <div className="h-48 sm:h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <Pie
              data={data}
              cx="50%"
              cy="40%"
              labelLine={false}
              label={renderLabel}
              outerRadius={40}
              innerRadius={0}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                fontSize: '11px',
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }} 
              formatter={(value: number, name: string) => [
                `${value} vehicles (${((value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)`,
                name
              ]}
            />
            <Legend 
              wrapperStyle={{ 
                fontSize: '10px',
                paddingTop: '8px'
              }} 
              iconSize={6}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              formatter={(value: string) => {
                // Truncate long model names for better display
                return value.length > 15 ? `${value.substring(0, 15)}...` : value;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

PieChartCard.displayName = 'PieChartCard';
