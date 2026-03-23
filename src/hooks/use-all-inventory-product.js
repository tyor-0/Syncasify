import { useState, useEffect } from "react";
import axiosInstance from "../services/instance";

export const useGetAllInventory = () => {
    const [inventorys, setInventorys] = useState([]);
    const [filteredInventorys, setFilteredInventorys] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchInventory() {
        //  console.log("token in storage:", localStorage.getItem("token"));

        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get("/inventory/stocks");
            // console.log("inventory error:", err.response);
            setInventorys(response.data.inventorys);
            setFilteredInventorys(response.data.inventorys);
        } catch (err) {
            // console.log("err.response:", err.response);
            // console.log("err.request:", err.request);
            // console.log("err.message:", err.message);
            setError(err.response?.data?.error || "Failed to fetch inventory");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchInventory();
    }, []);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredInventorys(inventorys);
            return;
        }
        const query = searchQuery.toLowerCase();
        const results = inventorys.filter((item) =>
            item.name.toLowerCase().includes(query)
        );
        setFilteredInventorys(results);
    }, [searchQuery, inventorys]);

    return {
        inventorys: filteredInventorys,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        refetch: fetchInventory,
    };
};