import { useState, useMemo } from "react";
import { getTier, calcDiscount } from "@/utils/Discountutils";

// Fallback sample data — used only when no initialCustomers prop is passed.
// Replace or remove once you wire up a real data source.
const FALLBACK_CUSTOMERS = [
  { id: 1, name: "Amaka Obi", spent: 1_200_000, orders: 52, lastDate: "2026-03-20" },
  { id: 2, name: "Tunde Adeyemi", spent: 820_000, orders: 34, lastDate: "2026-03-10" },
  { id: 3, name: "Ngozi Dike", spent: 610_000, orders: 29, lastDate: "2026-03-18" },
  { id: 4, name: "Chidera Eze", spent: 450_000, orders: 21, lastDate: "2026-02-28" },
  { id: 5, name: "Tobi Makinde", spent: 310_000, orders: 18, lastDate: "2026-03-15" },
  { id: 6, name: "Kemi Afolabi", spent: 230_000, orders: 13, lastDate: "2026-03-05" },
  { id: 7, name: "Fatima Bello", spent: 150_000, orders: 9, lastDate: "2026-03-01" },
  { id: 8, name: "Emeka Nwosu", spent: 95_000, orders: 7, lastDate: "2026-02-20" },
  { id: 9, name: "Biodun Hassan", spent: 70_000, orders: 5, lastDate: "2026-01-30" },
  { id: 10, name: "Seun Lawal", spent: 43_000, orders: 3, lastDate: "2026-02-14" },
];

/**
 * useDiscountDashboard
 *
 * Manages all state and logic for the discount dashboard.
 * The component stays a pure display layer — this hook owns everything else.
 *
 * @param {Array} initialCustomers - Seed data. Pass your API data here.
 * @returns {object} state + handlers for the dashboard
 */
export function useDiscountDashboard(initialCustomers = FALLBACK_CUSTOMERS) {
  // ── Core data ─────────────────────────────────────────────────────────────
  const [customers, setCustomers] = useState(initialCustomers);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("All");
  const [sortBy, setSortBy] = useState("spent");
  const [modal, setModal] = useState(null); // null | "add" | customer obj

  // ── Derived metrics ───────────────────────────────────────────────────────
  const metrics = useMemo(() => {
    const totalRevenue = customers.reduce((a, c) => a + c.spent, 0);
    const avgSpend = customers.length ? Math.round(totalRevenue / customers.length) : 0;
    const totalDiscount = customers.reduce((a, c) => a + calcDiscount(c.spent).saving, 0);
    const eligibleCount = customers.filter((c) => getTier(c.spent).discount > 0).length;

    return {
      total: customers.length,
      totalRevenue,
      avgSpend,
      totalDiscount,
      eligibleCount,
    };
  }, [customers]);

  // ── Filtered + sorted rows ────────────────────────────────────────────────
  const rows = useMemo(() => {
    const q = search.toLowerCase();

    const filtered = customers.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(q);
      const matchTier = tierFilter === "All" || getTier(c.spent).name === tierFilter;
      return matchSearch && matchTier;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name": return a.name.localeCompare(b.name);
        case "orders": return b.orders - a.orders;
        case "discount": return getTier(b.spent).discount - getTier(a.spent).discount;
        default: return b.spent - a.spent; // "spent"
      }
    });
  }, [customers, search, tierFilter, sortBy]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  function saveCustomer(data) {
    setCustomers((prev) => {
      const exists = prev.find((c) => c.id === data.id);
      return exists
        ? prev.map((c) => (c.id === data.id ? data : c))
        : [...prev, data];
    });
    setModal(null);
  }

  function deleteCustomer(id) {
    if (window.confirm("Remove this customer?")) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  }

  function openAdd() { setModal("add"); }
  function openEdit(c) { setModal(c); }
  function closeModal() { setModal(null); }

  function toggleTierFilter(tierName) {
    setTierFilter((prev) => (prev === tierName ? "All" : tierName));
  }

  return {
    // State
    customers,
    search,
    tierFilter,
    sortBy,
    modal,
    // Derived
    metrics,
    rows,
    // Setters
    setSearch,
    setSortBy,
    // Handlers
    saveCustomer,
    deleteCustomer,
    openAdd,
    openEdit,
    closeModal,
    toggleTierFilter,
  };
}