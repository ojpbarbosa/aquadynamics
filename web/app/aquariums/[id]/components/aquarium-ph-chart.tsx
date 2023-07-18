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

import AquariumPHChartTooltip from './aquarium-ph-chart-tooltip'
import { Log } from '@/library/types'

type AquariumPHChartProps = {
  logs: Log[]
}

export default function AquariumPHChart({ logs }: AquariumPHChartProps) {
  const { theme } = useTheme()

  return (
    <ResponsiveContainer width="100%" height={200} min-width={300}>
      <AreaChart
        data={logs.map((log) => {
          return {
            pH: log.pH,
            timestamp: log.timestamp
          }
        })}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 30
        }}
        syncId="pH"
      >
        <CartesianGrid strokeDasharray="3 3" color="#262626" />

        <YAxis dataKey="pH" domain={[5, 10]}>
          <Label value="pH" position="left" angle={-90} dy="-10" />
        </YAxis>
        <Tooltip content={<AquariumPHChartTooltip payload={logs[0]} />} />
        <Area
          type="monotone"
          dataKey="pH"
          stroke={theme === 'light' ? '#aaa6fa' : '#8884d8'}
          fill={theme === 'light' ? '#aaa6fa' : '#8884d8'}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
