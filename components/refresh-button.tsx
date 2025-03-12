"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function RefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const handleRefresh = async () => {
    setIsRefreshing(true)

    try {
      // Refrescar los datos
      await fetch("/api/market-data", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      // Refrescar la página
      router.refresh()
    } catch (error) {
      console.error("Error al refrescar datos:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="ml-auto">
      <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
      Actualizar datos
    </Button>
  )
}

