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
import ChartTooltip from './chart-tooltip'

type AquariumTemperatureChartProps = {
  temperatures: {
    temperature: number
    timestamp: Date
  }[]
}

export default function AquariumTemperatureChart({ temperatures }: AquariumTemperatureChartProps) {
  return (
    <ResponsiveContainer width={'100%'} height={200} min-width={300}>
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
        <YAxis dataKey="temperature" min={14} max={36}>
          <Label value="°C" position="left" angle={-90} dy="-10" />
        </YAxis>
        <Tooltip
          content={
            <ChartTooltip
              term="Temperatura"
              value={`${temperatures[0].temperature.toFixed(1).replace('.', ',')} °C`}
              timestamp={new Date(temperatures[0].timestamp).toUTCString()}
            />
          }
        />
        <Area type="monotone" dataKey="temperature" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
