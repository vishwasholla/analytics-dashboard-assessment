import { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ChartDataPoint } from '../../types';
import { CHART_COLORS } from '../../constants';

interface BarChartCardProps {
  title: string;
  data: ChartDataPoint[];
  dataKey?: string;
}

export const BarChartCard = memo(({ title, data, dataKey = 'value' }: BarChartCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" label={{ value: 'Vehicles', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
              formatter={(value: number) => [value, 'Vehicles']}
            />
            <Legend formatter={() => 'Vehicles'} />
            <Bar dataKey={dataKey} fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} name="Vehicles" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

BarChartCard.displayName = 'BarChartCard';
