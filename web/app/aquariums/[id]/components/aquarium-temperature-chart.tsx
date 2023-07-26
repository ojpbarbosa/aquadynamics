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

import AquariumTemperatureChartTooltip from './aquarium-temperature-chart-tooltip'
import { type Log } from '@/library/types'

type AquariumTemperatureChartProps = {
  logs: Log[]
}

export default function AquariumTemperatureChart({ logs }: AquariumTemperatureChartProps) {
  const { theme } = useTheme()

  return (
    <ResponsiveContainer width="100%" height={200} min-width={300}>
      <AreaChart
        data={logs.map((log) => {
          return {
            temperature: log.temperature,
            timestamp: log.timestamp
          }
        })}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 30
        }}
        syncId="temperature"
      >
        <CartesianGrid strokeDasharray="3 3" color="#262626" />

        <YAxis dataKey="temperature" domain={[20, 30]}>
          <Label value="°C" position="left" angle={-90} dy="-10" />
        </YAxis>
        <Tooltip content={<AquariumTemperatureChartTooltip payload={logs[0]} />} />
        <Area
          type="monotone"
          dataKey="temperature"
          stroke={theme === 'light' ? '#aaa6fa' : '#8884d8'}
          fill={theme === 'light' ? '#aaa6fa' : '#8884d8'}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
