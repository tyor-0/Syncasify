import { AdminSidebar } from "@/features/admin/Admin-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useState } from "react"
import { Outlet } from "react-router-dom"

function AdminLayout() {
  const [activeTitle, setActiveTitle] = useState("Admin")

  return (
    <TooltipProvider>
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <AdminSidebar variant="inset" onTitleChange={setActiveTitle} />
        <SidebarInset>
          <SiteHeader title={activeTitle} />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

export default AdminLayout