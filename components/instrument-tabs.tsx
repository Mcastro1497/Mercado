"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InstrumentTable } from "@/components/instrument-table"
import { InstrumentChart } from "@/components/instrument-chart"
import { FilterBar } from "@/components/filter-bar"

interface MarketData {
  Ticker: string
  Instrumento: string
  "Moneda de pago": string
  Legislación: string
  "Fecha de vencimiento": string
  TIR: number
  Duration: number
}

interface InstrumentTabsProps {
  data: MarketData[]
  instrumentTypes: string[]
}

export function InstrumentTabs({ data, instrumentTypes }: InstrumentTabsProps) {
  const [filters, setFilters] = useState({
    currency: "",
    legislation: "",
  })

  // Obtener monedas y legislaciones únicas para los filtros
  const currencies = [...new Set(data.map((item) => item["Moneda de pago"]))]
  const legislations = [...new Set(data.map((item) => item.Legislación))]

  // Aplicar filtros a los datos
  const filteredData = data.filter((item) => {
    if (filters.currency && filters.currency !== "all" && item["Moneda de pago"] !== filters.currency) return false
    if (filters.legislation && filters.legislation !== "all" && item.Legislación !== filters.legislation) return false
    return true
  })

  return (
    <div className="space-y-4">
      <FilterBar currencies={currencies} legislations={legislations} filters={filters} setFilters={setFilters} />

      <Tabs defaultValue={instrumentTypes[0] || "default"}>
        <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${instrumentTypes.length}, minmax(0, 1fr))` }}>
          {instrumentTypes.map((type) => (
            <TabsTrigger key={type} value={type}>
              {type}
            </TabsTrigger>
          ))}
        </TabsList>

        {instrumentTypes.map((type) => {
          const instrumentData = filteredData.filter((item) => item.Instrumento === type)

          return (
            <TabsContent key={type} value={type} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InstrumentTable data={instrumentData} />
                <InstrumentChart data={instrumentData} />
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

