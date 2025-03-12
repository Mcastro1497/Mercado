import { Suspense } from "react"
import { MarketDataDashboard } from "@/components/market-data-dashboard"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Instrumentos del Mercado de Capitales</h1>
      <Suspense fallback={<DashboardSkeleton />}>
        <MarketDataDashboard />
      </Suspense>
    </main>
  )
}

