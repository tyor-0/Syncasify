import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { useData } from "@/hooks/use-data"

export default function AdminLandingPage() {
  const { data: dashboardData, loading } = useData()

  // ── Counts from real API data ─────────────────────────────────────────────
  const totalCustomers = dashboardData?.customers?.customers?.length ?? 0
  const totalProducts  = dashboardData?.stock?.inventorys?.length    ?? 0

  // ── Table rows: use real orders from API, fall back to [] while loading ───
  const tableData = dashboardData?.sales?.orders ?? []

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

          <SectionCards
            totalCustomers={loading ? "..." : totalCustomers}
            totalProducts={loading ? "..." : totalProducts}
          />

          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>

          {/* DataTable now receives real API data, not data.json */}
          <DataTable data={tableData} />

        </div>
      </div>
    </div>
  )
}