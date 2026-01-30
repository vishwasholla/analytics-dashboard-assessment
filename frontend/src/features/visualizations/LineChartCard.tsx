import { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../../types';
import { CHART_COLORS } from '../../constants';

interface LineChartCardProps {
  title: string;
  data: ChartDataPoint[];
  dataKey?: string;
}

export const LineChartCard = memo(({ title, data, dataKey = 'value' }: LineChartCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-2 sm:p-3">
      <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{title}</h3>
      <div className="h-40 sm:h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              stroke="#6b7280"
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 10 }} stroke="#6b7280" width={40} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontSize: '12px',
              }}
              formatter={(value: number) => [value, 'Vehicles']}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={CHART_COLORS[0]} 
              strokeWidth={2}
              dot={{ fill: CHART_COLORS[0], r: 3 }}
              activeDot={{ r: 5 }}
              name="Vehicles"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

LineChartCard.displayName = 'LineChartCard';
