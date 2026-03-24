import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import data from "./data.json"
import { useState } from "react"

function Categories() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
        🚧
      </div>
      <h2 className="text-lg font-semibold text-foreground">Coming Soon</h2>
      <p className="text-sm text-muted-foreground text-center max-w-sm">
        This page is currently under construction. Check back soon.
      </p>
    </div>
  )
}

export default Categories;