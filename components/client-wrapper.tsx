"use client"

import { useState, useCallback } from "react"
import { InstrumentTabs } from "@/components/instrument-tabs"
import { DataSync } from "@/components/data-sync"
import { Toaster } from "@/components/ui/toaster"

interface MarketData {
  Ticker: string
  Instrumento: string
  "Moneda de pago": string
  Legislación: string
  "Fecha de vencimiento": string
  TIR: number
  Duration: number
}

interface ClientWrapperProps {
  initialData: MarketData[]
}

export function ClientWrapper({ initialData }: ClientWrapperProps) {
  const [data, setData] = useState<MarketData[]>(initialData)

  // Obtener tipos únicos de instrumentos
  const instrumentTypes = [...new Set(data.map((item) => item.Instrumento))]

  // Función para actualizar los datos después de la sincronización
  const refreshDataAfterSync = useCallback(async () => {
    console.log("Actualizando datos después de la sincronización...")

    try {
      // Forzar una nueva solicitud a la API sin caché
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/market-data?t=${timestamp}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status}`)
      }

      const freshData = await response.json()
      console.log(`Datos actualizados después de sincronización: ${freshData.length} registros`)

      if (freshData.length > 0) {
        // Actualizar el estado con los nuevos datos
        setData(freshData)
      }
    } catch (error) {
      console.error("Error al actualizar datos después de sincronización:", error)
    }
  }, [])

  return (
    <>
      <Toaster />
      <DataSync onSyncComplete={refreshDataAfterSync} />
      <InstrumentTabs data={data} instrumentTypes={instrumentTypes} />
    </>
  )
}

