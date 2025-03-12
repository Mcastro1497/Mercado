"use client"

import { useAutoRefresh } from "@/hooks/use-auto-refresh"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RefreshStatus() {
  const { isRefreshing, lastUpdated, refreshData, isAutoRefreshEnabled, setIsAutoRefreshEnabled } = useAutoRefresh(20) // Actualizar cada 20 segundos

  // Formatear la hora de última actualización
  const formattedTime = lastUpdated.toLocaleTimeString()

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="auto-refresh" checked={isAutoRefreshEnabled} onCheckedChange={setIsAutoRefreshEnabled} />
              <Label htmlFor="auto-refresh">Actualización automática (20s)</Label>
            </div>

            <Badge variant={isRefreshing ? "secondary" : "outline"} className="animate-pulse">
              {isRefreshing ? "Actualizando datos..." : `Última actualización: ${formattedTime}`}
            </Badge>
          </div>

          <Button variant="outline" size="sm" onClick={refreshData} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Actualizar ahora
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

