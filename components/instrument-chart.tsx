"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface MarketData {
  Ticker: string
  Instrumento: string
  "Moneda de pago": string
  Legislación: string
  "Fecha de vencimiento": string
  TIR: number
  Duration: number
}

interface InstrumentChartProps {
  data: MarketData[]
}

export function InstrumentChart({ data }: InstrumentChartProps) {
  // Preparar datos para el gráfico
  const chartData = data.map((item) => ({
    name: item.Ticker,
    x: item.Duration,
    y: item.TIR,
    moneda: item["Moneda de pago"],
    legislacion: item.Legislación,
    vencimiento: item["Fecha de vencimiento"],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico TIR vs Duration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]">
          <ChartContainer
            config={{
              data: {
                label: "Instrumentos",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Duration"
                  label={{ value: "Duration", position: "insideBottomRight", offset: -5 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="TIR"
                  label={{ value: "TIR (%)", angle: -90, position: "insideLeft" }}
                />
                <ChartTooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
                <Scatter name="Instrumentos" data={chartData} fill="var(--color-data)" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-background border rounded-md shadow-md p-3">
        <p className="font-bold">{data.name}</p>
        <p>TIR: {data.y.toFixed(2)}%</p>
        <p>Duration: {data.x.toFixed(2)}</p>
        <p>Moneda: {data.moneda}</p>
        <p>Legislación: {data.legislacion}</p>
        <p>Vencimiento: {data.vencimiento}</p>
      </div>
    )
  }

  return null
}

