import axiosInstance from "@/services/instance";
import { useState, useEffect } from "react";

export function useCart() {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancellingId, setCancellingId] = useState(null);
    const [confirmingId, setConfirmingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    // ─── Fetch pending + cancelled orders ─────────────────────────────────
    async function fetchSavedCarts() {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get(`/sale/orders?t=${Date.now()}`);
            const saved = res.data.orders.filter(
                (order) => order.status === "pending" || order.status === "cancelled"
            );
            setCarts(saved);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load saved carts.");
        } finally {
            setLoading(false);
        }
    }

    // ─── Confirm payment ───────────────────────────────────────────────────
    async function confirmCart(orderId, paymentReference = "") {
        setConfirmingId(orderId);
        try {
            await axiosInstance.put(`/sale/orders/${orderId}/confirm-payment`, {
                paymentReference,
            });
            await fetchSavedCarts();
        } catch (err) {
            alert(err.response?.data?.error || "Failed to confirm payment.");
        } finally {
            setConfirmingId(null);
        }
    }

    // ─── Cancel — marks as cancelled, stays visible for deletion ──────────
    async function cancelCart(orderId, reason = "Cancelled from saved carts") {
        setCancellingId(orderId);
        try {
            await axiosInstance.delete(`/sale/orders/${orderId}/cancel`, {
                data: { reason },
            });
            // Keep in UI but update status so Delete button appears
            setCarts((prev) =>
                prev.map((c) =>
                    c._id === orderId
                        ? { ...c, status: "cancelled", paymentStatus: "cancelled" }
                        : c
                )
            );
        } catch (err) {
            alert(err.response?.data?.error || "Failed to cancel cart.");
        } finally {
            setCancellingId(null);
        }
    }

    // ─── Hard delete — only for cancelled orders ───────────────────────────
    async function deleteCart(orderId) {
        setDeletingId(orderId);
        try {
            await axiosInstance.delete(`/sale/orders/${orderId}`);
            setCarts((prev) => prev.filter((c) => c._id !== orderId));
        } catch (err) {
            alert(err.response?.data?.error || "Failed to delete order.");
        } finally {
            setDeletingId(null);
        }
    }

    useEffect(() => {
        fetchSavedCarts();
    }, []);

    return {
        carts,
        loading,
        error,
        cancellingId,
        confirmingId,
        deletingId,
        fetchSavedCarts,
        confirmCart,
        cancelCart,
        deleteCart,
    };
}