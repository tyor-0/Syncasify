import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/services/instance";

export const useConfirmPayment = () => {
  const { id } = useParams(); // order ID from the URL /sales/:id/confirm
  const navigate = useNavigate();

  // Order data fetched from the backend
  const [order, setOrder] = useState(null);
  const [orderLoading, setOrderLoading] = useState(true);
  const [orderError, setOrderError] = useState(null);

  // Payment method — pre-selected from what the cashier chose on the sale page
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // Paystack reference — cashier pastes this after confirming on Paystack dashboard
  // Only required for card and transfer payments
  const [paymentReference, setPaymentReference] = useState("");

  // Submission state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Fetch the order when the page loads ──────────────────────────────────
  useEffect(() => {
    if (!id) return;
    fetchOrder();
  }, [id]);

  async function fetchOrder() {
    setOrderLoading(true);
    setOrderError(null);
    try {
      const res = await axiosInstance.get(`/sale/orders/${id}`);
      const fetchedOrder = res.data.order;
      setOrder(fetchedOrder);
      // Pre-select the payment method from when the sale was created
      setPaymentMethod(fetchedOrder.paymentMethod || "cash");
    } catch (err) {
      setOrderError("Could not load order. Please go back and try again.");
      console.error("Failed to fetch order:", err);
    } finally {
      setOrderLoading(false);
    }
  }

  // ── Confirm payment ───────────────────────────────────────────────────────
  // Calls PUT /sale/:id/confirm-payment
  // Stock is deducted here — this is the point of no return
  async function handleConfirmPayment() {
    if (!id) return;

    // For card and transfer, a reference is strongly recommended
    // but we don't hard-block — cashier may confirm manually without it
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.put(`/sale/orders/${id}/confirm-payment`, {
        paymentReference: paymentReference.trim() || null,
      });

      console.log("Payment confirmed:", res.data);

      // Navigate to the receipt page after successful confirmation
      navigate(`/admin/sales/${id}/receipt`);
    } catch (err) {
      const message =
        err.response?.data?.error || "Failed to confirm payment. Please try again.";
      setError(message);
      console.error("Confirm payment failed:", err);
    } finally {
      setLoading(false);
    }
  }

  // ── Cancel the order and go back ─────────────────────────────────────────
  async function handleCancelOrder() {
    if (!window.confirm("Are you sure you want to cancel this sale?")) return;

    try {
      await axiosInstance.delete(`/sale/orders/${id}/cancel`, {
        data: { reason: "Cancelled at checkout" },
      });
     navigate("/admin/sales/new");// go back to create a new sale
    } catch (err) {
      setError("Could not cancel the order. Please try again.");
      console.error("Cancel failed:", err);
    }
  }

  // Whether the confirm button should be disabled
  // For cash — always ready. For card/transfer — needs a reference
  const canConfirm =
    paymentMethod === "cash" || paymentReference.trim().length > 0;

  return {
    order,
    orderLoading,
    orderError,
    paymentMethod,
    setPaymentMethod,
    paymentReference,
    setPaymentReference,
    loading,
    error,
    canConfirm,
    handleConfirmPayment,
    handleCancelOrder,
  };
};