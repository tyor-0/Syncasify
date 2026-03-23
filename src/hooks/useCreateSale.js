import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/instance";

export const useCreateSale = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // ── Search ────────────────────────────────────────────────────────────────
  async function handleSearch(query) {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const res = await axiosInstance.get(`/inventory/search?q=${query}`);
      setSearchResults(res.data.products);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }

  // ── Add to cart ───────────────────────────────────────────────────────────
  // quantity param is optional — defaults to 1 (original behaviour)
  // When called from the modal, quantity will be whatever the user set
  function addToCart(product, quantity = 1) {
    const qty = Math.max(1, Number(quantity));

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === product._id);

      if (existingItem) {
        // Already in cart — add the new quantity on top
        const newQty = existingItem.quantity + qty;
        return prevCart.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: newQty, subtotal: item.sellingPrice * newQty }
            : item
        );
      }

      // New product — add with chosen quantity
      return [
        ...prevCart,
        {
          productId: product._id,
          name: product.name,
          sellingPrice: product.sellingPrice,
          quantity: qty,
          subtotal: product.sellingPrice * qty,
          // Keep extra fields for modal re-open from cart row
          unit: product.unit,
          category: product.category,
          sku: product.sku,
          stockQuantity: product.quantity,
          lowStockThreshold: product.lowStockThreshold,
        },
      ];
    });

    setSearchQuery("");
    setSearchResults([]);
  }

  // ── Update quantity (typed input) ─────────────────────────────────────────
  function updateQuantity(productId, newQuantity) {
    if (newQuantity === "" || newQuantity === null) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId ? { ...item, quantity: "" } : item
        )
      );
      return;
    }

    const qty = Number(newQuantity);

    if (qty < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: qty, subtotal: item.sellingPrice * qty }
          : item
      )
    );
  }

  function handleQuantityBlur(productId, currentQuantity) {
    if (currentQuantity === "" || Number(currentQuantity) < 1) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: 1, subtotal: item.sellingPrice * 1 }
            : item
        )
      );
    }
  }

  // ── Remove ────────────────────────────────────────────────────────────────
  function removeFromCart(productId) {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  }

  // ── Total ─────────────────────────────────────────────────────────────────
  const cartTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);

  // ── Save Cart (saves as pending — shows up in saved carts dashboard) ──────
  async function saveCart() {
    if (cart.length === 0) {
      setError("Cart is empty. Add at least one product.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      paymentMethod,
      customerId: null,
    };

    try {
      await axiosInstance.post("/sale/orders", payload);
      setCart([]);                              // clear cart after saving
      setSearchQuery("");
      setSearchResults([]);
      navigate("/admin/sales/saved-carts");     // go straight to saved carts
    } catch (err) {
      const message = err.response?.data?.error || "Failed to save cart. Please try again.";
      setError(message);
      console.error("Save cart failed:", err);
    } finally {
      setSaving(false);
    }
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  async function handleSubmit() {
    if (cart.length === 0) {
      setError("Cart is empty. Add at least one product.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      paymentMethod,
      customerId: null,
    };

    try {
      const res = await axiosInstance.post("/sale/orders", payload);
      navigate(`/admin/sales/${res.data.order._id}/confirm`);
    } catch (err) {
      const message = err.response?.data?.error || "Something went wrong. Please try again.";
      setError(message);
      console.error("Sale creation failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return {
    searchQuery,
    searchResults,
    searchLoading,
    handleSearch,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    handleQuantityBlur,
    cartTotal,
    paymentMethod,
    setPaymentMethod,
    loading,
    saving,
    error,
    handleSubmit,
    saveCart,
  };
};