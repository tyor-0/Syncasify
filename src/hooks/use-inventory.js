import { useState, useEffect, useMemo } from "react";
import axiosInstance from "../services/instance";

const LOW_STOCK_THRESHOLD = 10;

export const useInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // "all" | "low" | "ok"

  // Modal state
  const [modalMode, setModalMode] = useState(null); // "add" | "edit" | null
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    unitsSold: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // ─── Fetch all products on mount ───────────────────────────────────────────
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/inventory");
      // Safely extract array — handle { products: [] }, { data: [] }, or a bare []
      const raw = res.data?.products ?? res.data?.data ?? res.data;
      setProducts(Array.isArray(raw) ? raw : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load inventory.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  // ─── Derived / computed values ─────────────────────────────────────────────
  const stats = useMemo(() => {
    // Guard: if products is somehow not an array, return safe defaults
    const list = Array.isArray(products) ? products : [];

    const totalValue = list.reduce(
      (sum, p) => sum + Number(p.price) * Number(p.quantity),
      0
    );
    const totalUnits = list.reduce((sum, p) => sum + Number(p.quantity), 0);
    const lowStockCount = list.filter(
      (p) => Number(p.quantity) <= LOW_STOCK_THRESHOLD
    ).length;
    const topProduct = [...list].sort(
      (a, b) => Number(b.unitsSold) - Number(a.unitsSold)
    )[0];

    return { totalValue, totalUnits, lowStockCount, topProduct };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    return list.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase());

      const isLow = Number(p.quantity) <= LOW_STOCK_THRESHOLD;
      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "low" && isLow) ||
        (filterStatus === "ok" && !isLow);

      return matchesSearch && matchesFilter;
    });
  }, [products, searchQuery, filterStatus]);

  // ─── Form handlers ─────────────────────────────────────────────────────────
  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validateForm() {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Product name is required";
    if (!formData.quantity || isNaN(formData.quantity) || Number(formData.quantity) < 0)
      errs.quantity = "Enter a valid quantity";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      errs.price = "Enter a valid price";
    return errs;
  }

  // ─── Open modals ───────────────────────────────────────────────────────────
  function openAddModal() {
    setFormData({ name: "", category: "", quantity: "", price: "", unitsSold: "" });
    setFormErrors({});
    setSelectedProduct(null);
    setModalMode("add");
  }

  function openEditModal(product) {
    setFormData({
      name: product.name,
      category: product.category || "",
      quantity: String(product.quantity),
      price: String(product.price),
      unitsSold: String(product.unitsSold || 0),
    });
    setFormErrors({});
    setSelectedProduct(product);
    setModalMode("edit");
  }

  function closeModal() {
    setModalMode(null);
    setSelectedProduct(null);
    setFormErrors({});
  }

  // ─── CRUD operations ───────────────────────────────────────────────────────
  async function handleAddProduct(e) {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        unitsSold: Number(formData.unitsSold) || 0,
      };
      const res = await axiosInstance.post("/inventory", payload);
      const newProduct = res.data?.product ?? res.data;
      setProducts((prev) => (Array.isArray(prev) ? [...prev, newProduct] : [newProduct]));
      closeModal();
    } catch (err) {
      setFormErrors({ submit: err.response?.data?.message || "Failed to add product." });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEditProduct(e) {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        unitsSold: Number(formData.unitsSold) || 0,
      };
      const res = await axiosInstance.put(`/inventory/${selectedProduct._id}`, payload);
      const updated = res.data?.product ?? res.data;
      setProducts((prev) =>
        Array.isArray(prev)
          ? prev.map((p) => (p._id === selectedProduct._id ? updated : p))
          : []
      );
      closeModal();
    } catch (err) {
      setFormErrors({ submit: err.response?.data?.message || "Failed to update product." });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteProduct(id) {
    try {
      await axiosInstance.delete(`/inventory/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setDeleteConfirmId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product.");
    }
  }

  return {
    // Data
    products,
    filteredProducts,
    stats,
    loading,
    error,

    // Search & filter
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,

    // Modal
    modalMode,
    formData,
    formErrors,
    submitting,
    deleteConfirmId,
    setDeleteConfirmId,

    // Handlers
    openAddModal,
    openEditModal,
    closeModal,
    handleFormChange,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,

    // Threshold export so JSX can use it
    LOW_STOCK_THRESHOLD,
  };
};