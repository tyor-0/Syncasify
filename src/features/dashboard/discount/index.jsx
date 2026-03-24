import { useDiscountDashboard } from "@/hooks/useDiscountDashboard";
import CustomerModal from "@/features/dashboard/customers/Customermodal";
import { TIERS, getTier, fmt, fmtDate, calcDiscount } from "@/utils/Discountutils";

/**
 * DiscountDashboard
 *
 * Pure display component — all logic and data fetching lives in useDiscountDashboard.
 *
 * Usage:
 *   <DiscountDashboard />
 */
export default function DiscountDashboard() {
  const {
    loading, error, refetch,
    query, tierFilter, sortBy, modal, metrics, rows,
    handleQuery, handleSearch, setSortBy,
    saveCustomer, deleteCustomer,
    openAdd, openEdit, closeModal, toggleTierFilter,
  } = useDiscountDashboard();

  // ── Loading state ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
        <div style={{ textAlign: "center" }}>
          <div style={s.spinner} />
          <p style={{ color: "#888", fontSize: 13, marginTop: 12 }}>Loading customers…</p>
        </div>
      </div>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#c0392b", fontSize: 14, marginBottom: 12 }}>{error}</p>
          <button style={s.addBtn} onClick={refetch}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div style={s.header}>
        <div>
          <h1 style={s.h1}>Customer discounts</h1>
          <p style={s.subtitle}>Spend-based tiers · auto-calculated pricing</p>
        </div>
        <button style={s.addBtn} onClick={openAdd}>+ Add customer</button>
      </div>

      {/* ── Metric cards ───────────────────────────────────────────────── */}
      <div style={s.metricsGrid}>
        {[
          { label: "Total customers",     value: metrics.total },
          { label: "Total revenue",        value: fmt(metrics.totalRevenue) },
          { label: "Avg spend / customer", value: fmt(metrics.avgSpend) },
          { label: "Discount-eligible",    value: metrics.eligibleCount, sub: "above New tier" },
          { label: "Total discount given", value: fmt(metrics.totalDiscount), sub: "across all customers" },
        ].map((m) => (
          <div key={m.label} style={s.metricCard}>
            <div style={s.metricLabel}>{m.label}</div>
            <div style={s.metricValue}>{m.value}</div>
            {m.sub && <div style={s.metricSub}>{m.sub}</div>}
          </div>
        ))}
      </div>

      {/* ── Tier filter pills ──────────────────────────────────────────── */}
      <div style={s.tierLegend}>
        {TIERS.map((t) => {
          const active = tierFilter === t.name;
          return (
            <button
              key={t.name}
              style={{
                ...s.tierPill,
                background:  active ? t.bg    : "transparent",
                borderColor: active ? t.color : "#d0cec8",
                color:       active ? t.text  : "#888",
              }}
              onClick={() => toggleTierFilter(t.name)}
            >
              <span style={{ ...s.dot, background: t.color }} />
              {t.name}{t.discount > 0 ? ` — ${t.discount}%` : " — no disc."}
              &nbsp;(≥{t.minSpend > 0 ? fmt(t.minSpend) : "₦0"})
            </button>
          );
        })}
      </div>

      {/* ── Controls ───────────────────────────────────────────────────── */}
      <div style={s.controls}>
        <input
          style={{ ...s.input, flex: 1, minWidth: 180 }}
          placeholder="Search customer…"
          value={query}
          onChange={handleQuery}
        />
        <select style={s.select} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="spent">Sort: amount spent</option>
          <option value="name">Sort: name A–Z</option>
          <option value="orders">Sort: orders</option>
          <option value="discount">Sort: discount %</option>
        </select>
        <button style={s.searchBtn} onClick={handleSearch}>Search</button>
        <button style={s.refetchBtn} onClick={refetch} title="Refresh data">↺ Refresh</button>
      </div>

      {/* ── Empty state ────────────────────────────────────────────────── */}
      {rows.length === 0 && (
        <div style={s.emptyState}>
          <p>No customers found..</p>
        </div>
      )}

      {/* ── Table ──────────────────────────────────────────────────────── */}
      {rows.length > 0 && (
        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr>
                {["Customer", "Phone", "Total spent", "Orders", "Last purchase", "Tier", "Discount", "Price after disc.", ""].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => {
                const tier = getTier(c.spent);
                const { discountPct, afterDiscount, saving } = calcDiscount(c.spent);
                return (
                  <tr key={c.id} style={s.row}>
                    <td style={{ ...s.td, fontWeight: 500 }}>
                      {c.name}
                      {c.email && <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{c.email}</div>}
                    </td>
                    <td style={{ ...s.td, color: "#888" }}>{c.phone || "—"}</td>
                    <td style={s.td}>{fmt(c.spent)}</td>
                    <td style={s.td}>{c.orders}</td>
                    <td style={{ ...s.td, color: "#888" }}>{fmtDate(c.lastDate)}</td>
                    <td style={s.td}>
                      <span style={{ ...s.badge, background: tier.bg, color: tier.text }}>
                        {tier.name}
                      </span>
                    </td>
                    <td style={{ ...s.td, fontWeight: 500 }}>
                      {discountPct > 0 ? `${discountPct}%` : "—"}
                    </td>
                    <td style={s.td}>
                      {discountPct > 0 ? (
                        <>
                          <span style={{ fontWeight: 500 }}>{fmt(afterDiscount)}</span>
                          <span style={{ fontSize: 11, color: "#888", marginLeft: 6 }}>
                            saves {fmt(saving)}
                          </span>
                        </>
                      ) : "—"}
                    </td>
                    <td style={s.td}>
                      <div style={s.actions}>
                        <button style={s.editBtn} onClick={() => openEdit(c)}>Edit</button>
                        <button style={{ ...s.editBtn, color: "#c0392b" }} onClick={() => deleteCustomer(c.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modal ──────────────────────────────────────────────────────── */}
      {modal && (
        <CustomerModal
          customer={modal === "add" ? null : modal}
          onSave={saveCustomer}
          onClose={closeModal}
        />
      )}

    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const s = {
  page: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    padding: "2rem",
    background: "#faf9f7",
    minHeight: "100vh",
    color: "#1a1a18",
  },
  header: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", marginBottom: "1.5rem",
    flexWrap: "wrap", gap: 12,
  },
  h1:       { fontSize: 24, fontWeight: 600, margin: 0, letterSpacing: "-0.02em" },
  subtitle: { fontSize: 13, color: "#888", margin: "4px 0 0" },
  addBtn: {
    padding: "8px 16px", borderRadius: 8, border: "none",
    background: "#1a1a18", color: "#fff",
    fontSize: 13, fontWeight: 500, cursor: "pointer",
  },

  // ✅ KEEP THESE (used in your UI)
  searchBtn: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    background: "#1a1a18",
    color: "#fff",
    fontSize: 13,
    cursor: "pointer",
  },
  refetchBtn: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "0.5px solid #d0cec8",
    background: "transparent",
    color: "#555",
    fontSize: 13,
    cursor: "pointer",
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 12, marginBottom: "1.5rem",
  },
  metricCard: {
    background: "#fff", border: "0.5px solid #e5e3db",
    borderRadius: 10, padding: "1rem",
  },
  metricLabel: { fontSize: 12, color: "#888", marginBottom: 4 },
  metricValue: { fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" },
  metricSub:   { fontSize: 11, color: "#aaa", marginTop: 2 },
  tierLegend:  { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1rem" },
  tierPill: {
    display: "flex", alignItems: "center", gap: 6,
    fontSize: 12, padding: "5px 12px", borderRadius: 99,
    border: "1px solid", cursor: "pointer", transition: "all 0.15s",
  },
  dot:      { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  controls: { display: "flex", gap: 10, marginBottom: "1rem", flexWrap: "wrap" },
  input: {
    padding: "8px 12px", fontSize: 13, borderRadius: 8,
    border: "0.5px solid #d0cec8", background: "#fff", color: "#1a1a18",
  },
  select: {
    padding: "8px 12px", fontSize: 13, borderRadius: 8,
    border: "0.5px solid #d0cec8", background: "#fff", color: "#1a1a18",
  },
  emptyState: {
    textAlign: "center", padding: "3rem",
    color: "#aaa", fontSize: 14,
  },
  tableWrap: {
    background: "#fff", border: "0.5px solid #e5e3db",
    borderRadius: 12, overflow: "auto",
  },
  table:   { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: {
    textAlign: "left", padding: "10px 14px",
    fontSize: 11, fontWeight: 600, color: "#888",
    background: "#faf9f7", borderBottom: "0.5px solid #e5e3db",
    textTransform: "uppercase", letterSpacing: "0.04em",
    whiteSpace: "nowrap",
  },
  td:      { padding: "11px 14px", borderBottom: "0.5px solid #f0ede6", whiteSpace: "nowrap" },
  row:     { transition: "background 0.1s" },
  badge: {
    display: "inline-block", fontSize: 11,
    fontWeight: 600, padding: "3px 9px", borderRadius: 99,
  },
  actions: { display: "flex", gap: 6 },
  editBtn: {
    fontSize: 11, padding: "3px 9px", borderRadius: 6,
    border: "0.5px solid #d0cec8", background: "transparent",
    cursor: "pointer", color: "#555",
  },

  spinner: {
    width: 28, height: 28, borderRadius: "50%",
    border: "2px solid #e5e3db",
    borderTopColor: "#1a1a18",
    animation: "spin 0.7s linear infinite",
    margin: "0 auto",
  },
};

// Inject spinner keyframes once
if (typeof document !== "undefined" && !document.getElementById("discount-spin")) {
  const style = document.createElement("style");
  style.id = "discount-spin";
  style.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
  document.head.appendChild(style);
}