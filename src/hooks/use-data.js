import { useEffect, useState } from "react"
import axiosInstance from "@/services/instance"

export function useData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAll() {
      try {
        const [customers, products, sales, stock, users] = await Promise.allSettled([
          axiosInstance.get("/crm/customers"),
          // axiosInstance.get("/product/products"),
          axiosInstance.get("/sale/orders"),
          axiosInstance.get("/inventory/stocks"),
          // axiosInstance.get("/user/users"),
        ])

        const resolve = (result) =>
          result.status === "fulfilled" ? result.value.data : null

        setData({
          customers: resolve(customers), // { customers: [...] }
          products:  resolve(products),  // { products: [...] }
          sales:     resolve(sales),     // { orders: [...] }
          stock:     resolve(stock),     // { inventorys: [...] }
          users:     resolve(users),     // null until endpoint exists
        })
      } catch (err) {
        console.error("useData error:", err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  return { data, loading, error }
}