"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { FolderSyncIcon as SyncIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface DataSyncProps {
  onSyncComplete?: () => Promise<void>
}

export function DataSync({ onSyncComplete }: DataSyncProps) {
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSynced, setLastSynced] = useState<Date>(new Date())
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState(true)
  const [syncCount, setSyncCount] = useState(0)

  // Formatear la hora de última sincronización
  const formattedTime = lastSynced.toLocaleTimeString()

  // Función para sincronizar datos
  const syncData = useCallback(async () => {
    if (isSyncing) return

    setIsSyncing(true)
    console.log("Iniciando sincronización de datos...")

    try {
      // Forzar una nueva solicitud a la API sin caché
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/sync-data?t=${timestamp}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`Error al sincronizar datos: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        console.log(`Sincronización exitosa: ${result.count} registros`)

        // Actualizar estado
        setLastSynced(new Date())
        setSyncCount((prev) => prev + 1)

        // Mostrar notificación de éxito
        toast({
          title: "Sincronización exitosa",
          description: `Se sincronizaron ${result.count} registros con Google Sheets`,
          variant: "default",
        })

        // Llamar al callback si existe
        if (onSyncComplete) {
          await onSyncComplete()
        }
      } else {
        console.log("Error en la sincronización:", result.message)

        // Mostrar notificación de error
        toast({
          title: "Error de sincronización",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error al sincronizar datos:", error)

      // Mostrar notificación de error
      toast({
        title: "Error",
        description: "No se pudieron sincronizar los datos",
        variant: "destructive",
      })
    } finally {
      setIsSyncing(false)
    }
  }, [isSyncing, onSyncComplete])

  // Efecto para la sincronización automática
  useEffect(() => {
    if (!isAutoSyncEnabled) return

    console.log("Configurando sincronización automática cada 10 segundos")

    const intervalId = setInterval(() => {
      console.log("Ejecutando sincronización automática...")
      syncData()
    }, 10000) // 10 segundos

    // Limpiar intervalo al desmontar o cuando cambian las dependencias
    return () => {
      console.log("Limpiando intervalo de sincronización automática")
      clearInterval(intervalId)
    }
  }, [isAutoSyncEnabled, syncData])

  // Realizar una sincronización inicial después de montar el componente
  useEffect(() => {
    // Pequeño retraso para asegurar que el componente esté completamente montado
    const timer = setTimeout(() => {
      console.log("Realizando sincronización inicial...")
      syncData()
    }, 1000)

    return () => clearTimeout(timer)
  }, [syncData])

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="auto-sync" checked={isAutoSyncEnabled} onCheckedChange={setIsAutoSyncEnabled} />
              <Label htmlFor="auto-sync">Sincronización automática (10s)</Label>
            </div>

            <Badge variant={isSyncing ? "secondary" : "outline"} className={isSyncing ? "animate-pulse" : ""}>
              {isSyncing ? "Sincronizando datos..." : `Última: ${formattedTime}`}
            </Badge>

            <Badge variant="outline">Sincronizaciones: {syncCount}</Badge>
          </div>

          <Button variant="outline" size="sm" onClick={syncData} disabled={isSyncing}>
            <SyncIcon className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
            Sincronizar ahora
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

