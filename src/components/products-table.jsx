import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Columns3Icon,
  ChevronDownIcon,
  PlusIcon,
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
  ShoppingCartIcon,
} from "lucide-react"
import axiosInstance from "@/services/instance"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

// ── navigate and onAddToCart are now passed in from the component ──────────
const columns = (onEdit, onDelete, navigate) => [
  {
    accessorKey: "name",
    header: "Item",
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.category}</span>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">Stock</div>,
    cell: ({ row }) => (
      <div className="text-right flex items-center justify-end gap-1">
        {row.original.quantity}
        {row.original.isLowStock && (
          <span title="Low stock" className="text-orange-500 text-xs">⚠</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "sellingPrice",
    header: () => <div className="text-right">Selling Price</div>,
    cell: ({ row }) => (
      <div className="text-right">₦{row.original.sellingPrice.toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "costPrice",
    header: () => <div className="text-right">Cost Price</div>,
    cell: ({ row }) => (
      <div className="text-right">₦{row.original.costPrice.toLocaleString()}</div>
    ),
  },
  {
    id: "actions",
    header: "",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            <PencilIcon className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onDelete(row.original._id)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2Icon className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* ✅ Pass product via route state so AddtoCart can open the modal */}
          <DropdownMenuItem
            onClick={() =>
              navigate("/admin/sales/add-to-carts", { state: { product: row.original } })
            }
          >
            <ShoppingCartIcon className="mr-2 size-4" />
            Add to Cart
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export function ProductsTable({ data: initialData, refetch }) {
  const [data, setData] = React.useState(() => initialData)
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [columnFilters, setColumnFilters] = React.useState([])
  const [sorting, setSorting] = React.useState([])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const [editItem, setEditItem] = React.useState(null)
  const [deleteId, setDeleteId] = React.useState(null)
  const [deleting, setDeleting] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    setData(initialData)
  }, [initialData])

  const handleEdit = (item) => setEditItem(item)
  const handleDelete = (id) => setDeleteId(id)

  const confirmDelete = async () => {
    try {
      setDeleting(true)
      await axiosInstance.delete(`/inventory/stocks/${deleteId}`)
      toast.success("Item deleted successfully")
      setDeleteId(null)
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete item")
    } finally {
      setDeleting(false)
    }
  }

  const table = useReactTable({
    data,
    columns: columns(handleEdit, handleDelete, navigate), // ✅ navigate passed in
    state: { sorting, columnVisibility, columnFilters, pagination },
    getRowId: (row) => row._id,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <>
      <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
        <div className="flex items-center justify-between px-4 lg:px-6">
          <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
            <TabsTrigger value="outline">All Items</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Columns3Icon data-icon="inline-start" />
                  Columns
                  <ChevronDownIcon data-icon="inline-end" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {table
                  .getAllColumns()
                  .filter((col) => typeof col.accessorFn !== "undefined" && col.getCanHide())
                  .map((col) => (
                    <DropdownMenuCheckboxItem
                      key={col.id}
                      className="capitalize"
                      checked={col.getIsVisible()}
                      onCheckedChange={(value) => col.toggleVisibility(!!value)}
                    >
                      {col.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" onClick={() => navigate("/admin/inventory/new")}>
              <PlusIcon />
              <span className="hidden lg:inline">Add Item</span>
            </Button>
          </div>
        </div>
        <TabsContent
          value="outline"
          className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
        >
          <Input
            placeholder="Search by name"
            value={(table.getColumn("name")?.getFilterValue() ?? "")}
            onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
            className="w-full border-0 border-b rounded-none shadow-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground"
          />
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="border-b last:border-0">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger size="sm" className="w-16" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectGroup>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">Rows per page</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <div className="flex items-center gap-1">
                <Button variant="outline" className="hidden size-8 lg:flex" size="icon" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                  <ChevronsLeftIcon />
                </Button>
                <Button variant="outline" className="size-8" size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                  <ChevronLeftIcon />
                </Button>
                <Button variant="outline" className="size-8" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                  <ChevronRightIcon />
                </Button>
                <Button variant="outline" className="hidden size-8 lg:flex" size="icon" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                  <ChevronsRightIcon />
                </Button>
              </div>
              <span className="hidden text-sm text-muted-foreground lg:block">
                Showing {table.getState().pagination.pageSize} of{" "}
                {table.getFilteredRowModel().rows.length}
              </span>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Drawer */}
      {editItem && (
        <EditDrawer
          item={editItem}
          onClose={() => setEditItem(null)}
          refetch={refetch}
        />
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 flex flex-col gap-4">
            <h2 className="text-base font-semibold text-gray-900">Delete Item</h2>
            <p className="text-sm text-gray-500">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setDeleteId(null)} disabled={deleting}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function EditDrawer({ item, onClose, refetch }) {
  const isMobile = useIsMobile()
  const [form, setForm] = React.useState({
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    unit: item.unit,
    sellingPrice: item.sellingPrice,
    costPrice: item.costPrice,
  })
  const [saving, setSaving] = React.useState(false)

  const handleSave = async () => {
    try {
      setSaving(true)
      await axiosInstance.put(`/inventory/stocks/${item._id}`, form)
      toast.success(`${form.name} updated successfully`)
      refetch()
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update item")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Drawer open direction={isMobile ? "bottom" : "right"} onOpenChange={(open) => { if (!open) onClose() }}>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Edit {item.name}</DrawerTitle>
          <DrawerDescription>Update item details</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <div className="flex flex-col gap-2">
            <Label>Item Name</Label>
            <Input value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <Input value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Stock</Label>
              <Input type="number" value={form.quantity} onChange={(e) => setForm(p => ({ ...p, quantity: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Unit</Label>
              <Input value={form.unit} onChange={(e) => setForm(p => ({ ...p, unit: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Selling Price</Label>
              <Input type="number" value={form.sellingPrice} onChange={(e) => setForm(p => ({ ...p, sellingPrice: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Cost Price</Label>
              <Input type="number" value={form.costPrice} onChange={(e) => setForm(p => ({ ...p, costPrice: e.target.value }))} />
            </div>
          </div>
        </div>
        <DrawerFooter className="flex flex-row gap-2">
          <DrawerClose asChild>
            <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          </DrawerClose>
          <Button className="flex-1" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function TableCellViewer({ item }) {
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
          <DrawerDescription>View item details</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <div className="flex flex-col gap-3">
            <Label>Item Name</Label>
            <Input defaultValue={item.name} readOnly />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Category</Label>
            <Input defaultValue={item.category} readOnly />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label>Stock</Label>
              <Input defaultValue={item.quantity} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Unit</Label>
              <Input defaultValue={item.unit} readOnly />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label>Selling Price</Label>
              <Input defaultValue={`₦${item.sellingPrice?.toLocaleString()}`} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Cost Price</Label>
              <Input defaultValue={`₦${item.costPrice?.toLocaleString()}`} readOnly />
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