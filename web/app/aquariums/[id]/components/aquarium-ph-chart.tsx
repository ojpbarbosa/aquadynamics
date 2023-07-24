'use client'

import {
  AreaChart,
  Area,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useTheme } from 'next-themes'

import AquariumPhChartTooltip from './aquarium-ph-chart-tooltip'
import { Log } from '@/library/types'

type AquariumPHChartProps = {
  logs: Log[]
}

export default function AquariumPhChart({ logs }: AquariumPHChartProps) {
  const { theme } = useTheme()

  return (
    <ResponsiveContainer width="100%" height={200} min-width={300}>
      <AreaChart
        data={logs.map((log) => {
          return {
            ph: log.ph,
            timestamp: log.timestamp
          }
        })}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 30
        }}
        syncId="ph"
      >
        <CartesianGrid strokeDasharray="3 3" color="#262626" />

        <YAxis dataKey="ph" domain={[5, 10]}>
          <Label value="ph" position="left" angle={-90} dy="-10" />
        </YAxis>
        <Tooltip content={<AquariumPhChartTooltip payload={logs[0]} />} />
        <Area
          type="monotone"
          dataKey="ph"
          stroke={theme === 'light' ? '#aaa6fa' : '#8884d8'}
          fill={theme === 'light' ? '#aaa6fa' : '#8884d8'}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
