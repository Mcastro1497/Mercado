"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface MarketData {
  Ticker: string
  Instrumento: string
  "Moneda de pago": string
  Legislación: string
  "Fecha de vencimiento": string
  TIR: number
  Duration: number
}

interface InstrumentTableProps {
  data: MarketData[]
}

export function InstrumentTable({ data }: InstrumentTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Formatear valores numéricos
  const formatNumber = (value: number) => {
    return typeof value === "number" ? value.toFixed(2) : value
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Datos del Instrumento</CardTitle>
        <div className="text-sm text-muted-foreground">{filteredData.length} instrumentos</div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border overflow-auto max-h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticker</TableHead>
                <TableHead>Moneda de Pago</TableHead>
                <TableHead>Legislación</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>TIR (%)</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>{row.Ticker}</TableCell>
                    <TableCell>{row["Moneda de pago"]}</TableCell>
                    <TableCell>{row.Legislación}</TableCell>
                    <TableCell>{row["Fecha de vencimiento"]}</TableCell>
                    <TableCell>{formatNumber(row.TIR)}</TableCell>
                    <TableCell>{formatNumber(row.Duration)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No se encontraron resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

