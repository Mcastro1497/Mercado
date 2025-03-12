"use client"

import type React from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface FilterBarProps {
  currencies: string[]
  legislations: string[]
  filters: {
    currency: string
    legislation: string
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      currency: string
      legislation: string
    }>
  >
}

export function FilterBar({ currencies, legislations, filters, setFilters }: FilterBarProps) {
  const resetFilters = () => {
    setFilters({
      currency: "",
      legislation: "",
    })
  }

  return (
    <div className="flex flex-wrap gap-4 items-center mb-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Moneda de Pago</label>
        <Select
          value={filters.currency}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, currency: value }))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todas las monedas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las monedas</SelectItem>
            {currencies.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Legislación</label>
        <Select
          value={filters.legislation}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, legislation: value }))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todas las legislaciones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las legislaciones</SelectItem>
            {legislations.map((legislation) => (
              <SelectItem key={legislation} value={legislation}>
                {legislation}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" size="icon" onClick={resetFilters} className="mt-6">
        <X className="h-4 w-4" />
        <span className="sr-only">Limpiar filtros</span>
      </Button>
    </div>
  )
}

