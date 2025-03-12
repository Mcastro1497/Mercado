"use client"

import { fetchMarketData } from "@/lib/google-sheets"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export async function MarketDataTable() {
  const data = await fetchMarketData()

  return <ClientTable initialData={data} />
}

function ClientTable({ initialData }: { initialData: any[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [data, setData] = useState(initialData)

  // Asumiendo que los datos tienen las columnas A, B, C
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos del Mercado</CardTitle>
        <div className="mt-2">
          <Input
            placeholder="Buscar instrumento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {initialData.length > 0 &&
                  Object.keys(initialData[0]).map((header, index) => <TableHead key={index}>{header}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={Object.keys(initialData[0] || {}).length} className="text-center">
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

