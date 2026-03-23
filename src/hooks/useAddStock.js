import { useState } from "react";
import axiosInstance from "../services/instance";
import toast from "react-hot-toast";

export const useAddStock = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function addStock(payload) {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.post("/inventory/stocks", payload);
            toast.success(`${payload.name} added to inventory!`);
            return response.data;
        } catch (err) {
            const message = err.response?.data?.error || "Failed to add stock";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, addStock };
};