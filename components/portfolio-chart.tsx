"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"

// Generate mock data for the chart
const generateChartData = (timeframe: string) => {
  const data = []
  let days = 7

  switch (timeframe) {
    case "1D":
      days = 1
      break
    case "1W":
      days = 7
      break
    case "1M":
      days = 30
      break
    case "3M":
      days = 90
      break
    case "1Y":
      days = 365
      break
    case "ALL":
      days = 730
      break
  }

  // Starting value
  let value = 3000

  // For 1D, use hours instead of days
  if (timeframe === "1D") {
    for (let i = 0; i < 24; i++) {
      // Random fluctuation between -1% and +1%
      const change = (Math.random() * 2 - 1) * 0.01
      value = value * (1 + change)

      const hour = i.toString().padStart(2, "0") + ":00"
      data.push({
        time: hour,
        value: value.toFixed(2),
      })
    }
  } else {
    const now = new Date()

    for (let i = days; i >= 0; i--) {
      const date = new Date()
      date.setDate(now.getDate() - i)

      // Random fluctuation between -2% and +2%
      const change = (Math.random() * 4 - 2) * 0.01
      value = value * (1 + change)

      // Format date based on timeframe
      let formattedDate
      if (timeframe === "1W") {
        formattedDate = date.toLocaleDateString("en-US", { weekday: "short" })
      } else if (timeframe === "1M" || timeframe === "3M") {
        formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      } else {
        formattedDate = date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      }

      data.push({
        time: formattedDate,
        value: value.toFixed(2),
      })
    }
  }

  return data
}

interface PortfolioChartProps {
  timeframe: string
}

export function PortfolioChart({ timeframe }: PortfolioChartProps) {
  const [data, setData] = useState(generateChartData(timeframe))

  useEffect(() => {
    setData(generateChartData(timeframe))
  }, [timeframe])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={10} />
        <YAxis
          tickFormatter={(value) => `$${value}`}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickMargin={10}
          domain={["auto", "auto"]}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="p-2 border shadow-sm bg-background">
                  <div className="text-sm font-medium">{payload[0].payload.time}</div>
                  <div className="text-sm font-bold">${Number(payload[0].value).toLocaleString()}</div>
                </Card>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

