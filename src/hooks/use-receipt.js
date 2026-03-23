import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/services/instance";

export function useReceipt() {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetchReceipt();
  }, [id]);

  async function fetchReceipt() {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`/sale/orders/${id}/receipt`);
      setReceipt(res.data.receipt);
    } catch (err) {
      setError(
        err.response?.data?.error || "Could not load receipt. Please try again."
      );
      console.error("Failed to fetch receipt:", err);
    } finally {
      setLoading(false);
    }
  }

  return { receipt, loading, error };
}