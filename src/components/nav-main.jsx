import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  CirclePlusIcon,
  MailIcon,
  ChevronRight,
  PackageIcon,
  ShoppingCartIcon,
  UserPlusIcon,
  BoxIcon,
} from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const quickCreateItems = [
  {
    label: "Register Business",
    description: "Create a Business",
    icon: BoxIcon,
    url: "/admin/register/business",
  },
  {
    label: "Sell",
    description: "Create a new sale",
    icon: ShoppingCartIcon,
    url: "/admin/sales/new",
  },
  {
    label: "Add Customer",
    description: "Add a new CRM contact",
    icon: UserPlusIcon,
    url: "/admin/crm/customers/new",
  },
  {
    label: "Add Product",
    description: "Add a new inventory item",
    icon: PackageIcon,
    url: "/admin/inventory/new",
  },
]


export function NavMain({ items, onTitleChange }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const popoverRef = useRef(null)
  const triggerRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  function handleQuickCreate(item) {
    setOpen(false)
    onTitleChange?.(item.label)
    navigate(item.url)
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">

        {/* Quick Create + Inbox */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <div className="relative flex-1">
              <SidebarMenuButton
                ref={triggerRef}
                tooltip="Quick Create"
                onClick={() => setOpen((v) => !v)}
                className="min-w-8 w-full bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground">
                <CirclePlusIcon />
                <span>Quick Create</span>
              </SidebarMenuButton>

              {open && (
                <div
                  ref={popoverRef}
                  className="absolute left-0 top-full mt-2 z-50 w-64 rounded-lg border bg-popover shadow-md p-1"
                >
                  <p className="px-3 py-2 text-xs font-medium text-muted-foreground">
                    Quick actions
                  </p>
                  {quickCreateItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleQuickCreate(item)}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-background">
                        <item.icon className="size-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium leading-none">{item.label}</span>
                        <span className="mt-1 text-xs text-muted-foreground leading-none">
                          {item.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline">
              <MailIcon />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Nav items */}
        <SidebarMenu>
          {items.map((item) => {

            // No children — plain link
            if (!item.items) {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    onClick={() => onTitleChange?.(item.title)}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            }

            // Has children — collapsible dropdown
            return (
              <Collapsible key={item.title} asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((child) => (
                        <SidebarMenuSubItem key={child.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === child.url}
                            onClick={() => onTitleChange?.(child.title)}
                          >
                            <Link to={child.url}>
                              <span>{child.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>

                </SidebarMenuItem>
              </Collapsible>
            )

          })}
        </SidebarMenu>

      </SidebarGroupContent>
    </SidebarGroup>
  )
}