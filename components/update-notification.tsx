"use client"

import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"

interface UpdateNotificationProps {
  lastUpdated: Date
  isRefreshing: boolean
}

export function UpdateNotification({ lastUpdated, isRefreshing }: UpdateNotificationProps) {
  const [prevTime, setPrevTime] = useState<Date>(lastUpdated)

  useEffect(() => {
    // Solo mostrar notificación si la hora de actualización ha cambiado y no estamos en la carga inicial
    if (prevTime.getTime() !== lastUpdated.getTime() && prevTime.getTime() !== 0) {
      // Mostrar notificación de actualización exitosa
      toast({
        title: "Datos actualizados",
        description: `Última actualización: ${lastUpdated.toLocaleTimeString()}`,
        variant: "default",
      })
    }

    // Actualizar el tiempo previo
    setPrevTime(lastUpdated)
  }, [lastUpdated, prevTime])

  return null
}

