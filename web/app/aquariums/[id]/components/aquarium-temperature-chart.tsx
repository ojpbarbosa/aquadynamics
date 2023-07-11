'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import AquariumTemperatureChartTooltip from './aquarium-temperature-chart-tooltip'
import { useTheme } from 'next-themes'

type AquariumTemperatureChartProps = {
  temperatures: {
    temperature: number
    timestamp: Date
  }[]
}

export default function AquariumTemperatureChart({ temperatures }: AquariumTemperatureChartProps) {
  const { theme } = useTheme()

  return (
    <ResponsiveContainer width="100%" height={200} min-width={300}>
      <AreaChart
        data={temperatures}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 30
        }}
        syncId="temperature"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp">
          <Label value="Registro" position="bottom" />
        </XAxis>
        <YAxis dataKey="temperature" domain={[20, 30]}>
          <Label value="°C" position="left" angle={-90} dy="-10" />
        </YAxis>
        <Tooltip content={<AquariumTemperatureChartTooltip payload={temperatures[0]} />} />
        <Area type="monotone" dataKey="temperature" stroke={'#bac5db'} fill={'#bac5dbdd'} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
