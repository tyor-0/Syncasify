import { useState, useEffect } from "react";
import axiosInstance from "@/services/instance";

export const useGetAllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  async function getAllCustomers() {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/crm/customers?search=${encodeURIComponent(search)}`
      );
      // API returns { customers: [...] }
      const raw = res.data?.customers ?? res.data;
      setCustomers(Array.isArray(raw) ? raw : []);
    } catch (error) {
      console.log(error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }

  function handleQuery(e) {
    const value = e.target.value;
    setQuery(value);
  }

  function handleSearch() {
    setSearch(query);
  }

  useEffect(() => {
    getAllCustomers();
  }, [search]);

  return {
    customers,
    loading,
    query,
    handleQuery,
    handleSearch,
  };
};