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
          axiosInstance.get("/product/"),
          axiosInstance.get("/sale/orders"),
          axiosInstance.get("/inventory/stocks"),
          axiosInstance.get("/user/users"),
        ])

        // safely extract value — if a request failed, use null instead of crashing
        const resolve = (result) => result.status === "fulfilled" ? result.value.data : null

        setData({
          customers: resolve(customers),
          products: resolve(products),
          sales:    resolve(sales),
          stock:    resolve(stock),
          users:    resolve(users),
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