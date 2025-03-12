import { NextResponse } from "next/server"
import { fetchMarketData } from "@/lib/google-sheets"

export const dynamic = "force-dynamic" // Esto evita el almacenamiento en caché de la ruta

export async function GET() {
  try {
    const data = await fetchMarketData()

    // Depuración: verificar los primeros datos
    if (data.length > 0) {
      console.log("API - Primer elemento:", {
        ticker: data[0].Ticker,
        instrumento: data[0].Instrumento,
        monedaPago: data[0]["Moneda de pago"],
        legislacion: data[0].Legislación,
        fechaVencimiento: data[0]["Fecha de vencimiento"],
        tir: data[0].TIR,
        duration: data[0].Duration,
      })
    }

    // Configurar encabezados para evitar el almacenamiento en caché
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Error en la API:", error)
    return NextResponse.json({ error: "Error al obtener los datos del mercado" }, { status: 500 })
  }
}

