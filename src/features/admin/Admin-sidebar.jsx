import * as React from "react"
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  CameraIcon,
  FileTextIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  FileIcon,
  CommandIcon
} from "lucide-react"

const data = {

  navMain: [
    {
      title: "Home",
      url: "/admin",
      icon: LayoutDashboardIcon
    },
    {
      title: "Sales",
      url: "/admin/sales",
      icon: ListIcon,
      items: [
        { title: "Completed sales", url: "/admin/sales/compeleted-sales" },
        { title: "Refunds", url: "/admin/sales/refunds" },
        { title: "Saved carts", url: "/admin/sales/saved-carts" },
      ],

    },
    {
      title: "CRM",
      url: "/admin/crm",
      icon: UsersIcon,
      items: [
        { title: "Customers", url: "/admin/crm/customers" },
        { title: "Discounts", url: "/admin/sales/discounts" },
      ],
    },
    {
      title: "Reports",
      url: "/admin/reports",
      icon: FolderIcon,
      items: [
        { title: "Sales summary", url: "/admin/sales/sales-summary" },
        { title: "Sales by item", url: "/admin/sales/sales-by-item" },
        { title: "Sales by category", url: "/admin/sales/sales-by-category" },
        { title: "Sales by staff", url: "/admin/sales/sales-by-staff" },
        { title: "Sales by customer", url: "/admin/sales/sales-by-customer" },
        { title: "Sales by price groups", url: "/admin/sales/sales-by-price-groups" },
        { title: "Sales by method", url: "/admin/sales/sales-by-method" },
        { title: "Discounts", url: "/admin/sales/discounts" },
        { title: "Taxes", url: "/admin/sales/taxes" },
        { title: "Expiring inventory", url: "/admin/sales/expiring-inventory" },
        { title: "Inventory valuation", url: "/admin/sales/inventory-valuation" },
        { title: "Stock movement", url: "/admin/sales/stock-movement" },
      ],
    },
  ],

  inventory: [
    {
      title: "All items",
      url: "/admin/all-items",
      icon: DatabaseIcon
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: FileChartColumnIcon

    },
    {
      title: "Stock management",
      url: "/admin/stock-management",
      icon: FileIcon,
      items: [
        { title: "Stock adjustment" , url: "/admin/stock-management"},
        // { title: "Batch management", url: ""}
      ]
    },
  ],

  user: {
    name: "Syncasify",
    email: "michael@syncasify.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,

      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },

    {
      title: "Proposal",
      icon: FileTextIcon,

      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },

    {
      title: "Prompts",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2Icon
    },
    {
      title: "Get Help",
      url: "#",
      icon: CircleHelpIcon

    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon

    },
  ],


}

export function AdminSidebar({ onTitleChange, ...props
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>

      <SidebarHeader>

        <SidebarMenu>

          <SidebarMenuItem>

            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Business Name.</span>
              </a>
            </SidebarMenuButton>

          </SidebarMenuItem>

        </SidebarMenu>

      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} onTitleChange={onTitleChange} />
        <NavDocuments items={data.inventory} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
