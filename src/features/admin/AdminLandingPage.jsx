import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import data from "@/features/dashboard/data.json"
import { useData } from "@/hooks/use-data"

export default function AdminLandingPage() {
  const { data: dashboardData, loading } = useData()

  console.log("dashboardData:", dashboardData)

  const totalCustomers = dashboardData?.customers?.customers?.length
    ?? dashboardData?.customers?.length
    ?? 0

  const totalProducts = dashboardData?.products?.products?.length
    ?? dashboardData?.products?.length
    ?? 0

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
          <DataTable data={data} />
        </div>
      </div>
    </div>
  )
}