import { ProductsTable } from "@/components/products-table"
import { useGetAllInventory } from "@/hooks/use-all-inventory-product"

export default function AllProducts() {
  const { inventorys, loading, error, searchQuery, setSearchQuery, refetch } = useGetAllInventory();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <ProductsTable 
            data={inventorys}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  )
}