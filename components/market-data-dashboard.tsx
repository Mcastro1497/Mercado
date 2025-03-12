import { fetchMarketData } from "@/lib/google-sheets"
import { InstrumentTabs } from "@/components/instrument-tabs"
import { RefreshStatus } from "@/components/refresh-status"

export async function MarketDataDashboard() {
  const data = await fetchMarketData()

  // Obtener tipos únicos de instrumentos
  const instrumentTypes = [...new Set(data.map((item) => item.Instrumento))]

  return (
    <>
      <RefreshStatus />
      <InstrumentTabs data={data} instrumentTypes={instrumentTypes} />
    </>
  )
}

