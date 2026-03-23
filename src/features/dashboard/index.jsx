import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useState } from "react"
import { useData } from "@/hooks/use-data"

export default function Dashboard() {
  const [activeTitle, setActiveTitle] = useState("Home")
  const { data, loading, error } = useData()

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" onTitleChange={setActiveTitle} />

      <SidebarInset>
        <SiteHeader title={activeTitle} />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

              {loading && (
                <p className="px-4 lg:px-6 text-muted-foreground text-sm">Loading...</p>
              )}

              {error && (
                <p className="px-4 lg:px-6 text-destructive text-sm">Failed to load dashboard data.</p>
              )}

              {data && (
                <SectionCards
                  totalCustomers={data.customers.customers.length}
                  totalProducts={data.products.products.length}
                  totalRevenue={null}
                  totalOrders={null}
                />
              )}

              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>

    </SidebarProvider>
  )
}