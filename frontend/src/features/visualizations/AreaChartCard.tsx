import { memo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../../types';
import { CHART_COLORS } from '../../constants';

interface AreaChartCardProps {
  title: string;
  data: ChartDataPoint[];
  dataKey?: string;
}

export const AreaChartCard = memo(({ title, data, dataKey = 'value' }: AreaChartCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-2 sm:p-3">
      <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{title}</h3>
      <div className="h-40 sm:h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS[0]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={CHART_COLORS[0]} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
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
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={CHART_COLORS[0]} 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorValue)"
              name="Vehicles"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

AreaChartCard.displayName = 'AreaChartCard';
