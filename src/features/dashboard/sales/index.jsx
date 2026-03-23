import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import data from "./data.json"
import { useState } from "react"

export default function Sales() {
  const [activeTitle, setActiveTitle] = useState("Home");

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

        <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
          <DataTable data={data} />
        </div>


      </SidebarInset>

    </SidebarProvider>
  )
}