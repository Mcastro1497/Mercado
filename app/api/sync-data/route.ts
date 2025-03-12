import { NextResponse } from "next/server"
import { fetchExternalData, writeToGoogleSheets } from "@/lib/google-sheets"

// Estas directivas son cruciales para evitar el almacenamiento en caché
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    console.log("API Sync: Iniciando sincronización de datos...")

    // 1. Obtener datos externos
    const externalData = await fetchExternalData()

    if (externalData.length === 0) {
      console.log("API Sync: No se obtuvieron datos externos")
      return NextResponse.json({ success: false, message: "No se obtuvieron datos externos" }, { status: 404 })
    }

    console.log(`API Sync: Se obtuvieron ${externalData.length} registros externos`)

    // 2. Escribir datos en Google Sheets
    const writeSuccess = await writeToGoogleSheets(externalData)

    if (!writeSuccess) {
      console.log("API Sync: Error al escribir en Google Sheets")
      return NextResponse.json({ success: false, message: "Error al escribir en Google Sheets" }, { status: 500 })
    }

    console.log("API Sync: Datos sincronizados correctamente")

    // 3. Devolver respuesta
    return NextResponse.json(
      {
        success: true,
        message: "Datos sincronizados correctamente",
        count: externalData.length,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  } catch (error) {
    console.error("Error en la API Sync:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error al sincronizar datos",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

