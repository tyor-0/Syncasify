import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// ── Schema ───────────────────────────────────────────────────────────────────
export const schema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().optional(),
  phone: z.string(),
  amountSpent: z.number().optional(),
})

// ── Formatter ────────────────────────────────────────────────────────────────
export function formatCurrency(val) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(val || 0)
}

// ── Actions cell component ───────────────────────────────────────────────────
export function ActionsCell({ customer }) {
  const router = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          onClick={() => router(`/admin/crm/customers/${customer._id}`)}
        >
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router(`/admin/crm/customers/${customer._id}/edit`)}
        >
          Edit Details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          Delete Customer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ── Drawer viewer component ──────────────────────────────────────────────────
export function TableCellViewer({ item }) {
  const isMobile = useIsMobile()

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>Customer details</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="drawer-name">Full Name</Label>
              <Input id="drawer-name" defaultValue={item.name} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="drawer-email">Email</Label>
              <Input id="drawer-email" defaultValue={item.email || "—"} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="drawer-phone">Phone</Label>
              <Input id="drawer-phone" defaultValue={item.phone} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="drawer-amount">Amount Spent</Label>
              <Input
                id="drawer-amount"
                defaultValue={formatCurrency(item.amountSpent)}
                readOnly
              />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

// ── Columns factory ──────────────────────────────────────────────────────────
// Exported as a function so JSX inside columns doesn't cause ESLint
// "only exports components" errors in the main table file
export function getColumns() {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <TableCellViewer item={row.original} />,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.email || "—"}</span>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.phone}</span>
      ),
    },
    {
      accessorKey: "amountSpent",
      header: () => <div className="text-right">Amount Spent</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">
          {formatCurrency(row.original.amountSpent)}
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => <ActionsCell customer={row.original} />,
      enableHiding: false,
    },
  ]
}