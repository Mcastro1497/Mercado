"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAutoRefresh(intervalSeconds = 20) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true)
  const router = useRouter()

  const refreshData = async () => {
    if (isRefreshing) return

    setIsRefreshing(true)

    try {
      const timestamp = Date.now()

      // Añadir un parámetro timestamp único para evitar caché
      await fetch(`/api/market-data?timestamp=${timestamp}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      router.refresh()
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error al refrescar datos:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    if (!isAutoRefreshEnabled) return

    refreshData() // Realizar una actualización inicial inmediata

    const intervalId = setInterval(() => {
      refreshData()
    }, intervalSeconds * 1000)

    return () => clearInterval(intervalId)
  }, [isAutoRefreshEnabled, intervalSeconds])

  return {
    isRefreshing,
    lastUpdated,
    refreshData,
    isAutoRefreshEnabled,
    setIsAutoRefreshEnabled,
  }
}

