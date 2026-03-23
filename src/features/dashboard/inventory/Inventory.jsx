import { useInventory } from "../../../hooks/use-inventory";

// ─── Helper ────────────────────────────────────────────────────────────────
function formatCurrency(val) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(val);
}

// ─── Icons ─────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4h6v2" />
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const BoxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const TrendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
  </svg>
);
const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M16 13a1 1 0 1 0 2 0 1 1 0 0 0-2 0" /><path d="M2 10h20" />
  </svg>
);
const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const SpinnerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "inv-spin 0.7s linear infinite" }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// ─── Reusable form field ────────────────────────────────────────────────────
function FormField({ label, name, type = "text", placeholder, value, onChange, error, required }) {
  return (
    <div className="inv-field">
      <label className="inv-field-label">
        {label} {required && <span className="inv-req">*</span>}
      </label>
      <input
        className={`inv-field-input${error ? " inv-field-error" : ""}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      {error && <span className="inv-field-err-text">{error}</span>}
    </div>
  );
}

// ─── Stat card ─────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, accent, sub }) {
  return (
    <div className={`inv-stat-card inv-stat-${accent}`}>
      <div className={`inv-stat-icon inv-icon-${accent}`}>{icon}</div>
      <div className="inv-stat-body">
        <p className="inv-stat-label">{label}</p>
        <p className="inv-stat-value">{value}</p>
        {sub && <p className="inv-stat-sub">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export default function InventoryPage() {
  const {
    filteredProducts,
    stats,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    modalMode,
    formData,
    formErrors,
    submitting,
    deleteConfirmId,
    setDeleteConfirmId,
    openAddModal,
    openEditModal,
    closeModal,
    handleFormChange,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    LOW_STOCK_THRESHOLD,
  } = useInventory();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .inv-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .inv-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #0f1117;
          min-height: 100vh;
          color: #e8eaf0;
          padding: 28px 20px 60px;
        }

        /* ── Page header ── */
        .inv-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 28px;
        }
        .inv-header-left h1 {
          font-size: 24px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.4px;
        }
        .inv-header-left p {
          font-size: 13px;
          color: #6b7280;
          margin-top: 3px;
        }
        .inv-add-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 11px 18px;
          background: #6366f1;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 700;
          cursor: pointer;
          transition: background 0.18s, transform 0.1s, box-shadow 0.18s;
          box-shadow: 0 4px 14px rgba(99,102,241,0.35);
          white-space: nowrap;
        }
        .inv-add-btn:hover { background: #4f46e5; box-shadow: 0 6px 20px rgba(99,102,241,0.45); }
        .inv-add-btn:active { transform: scale(0.97); }

        /* ── Stats grid ── */
        .inv-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        @media (min-width: 640px) { .inv-stats { grid-template-columns: repeat(4, 1fr); } }

        .inv-stat-card {
          background: #1a1d27;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          border: 1px solid #23263a;
          transition: border-color 0.2s;
        }
        .inv-stat-card:hover { border-color: #35394f; }
        .inv-stat-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .inv-icon-indigo { background: rgba(99,102,241,0.15); color: #818cf8; }
        .inv-icon-emerald { background: rgba(16,185,129,0.15); color: #34d399; }
        .inv-icon-amber { background: rgba(245,158,11,0.15); color: #fbbf24; }
        .inv-icon-rose { background: rgba(244,63,94,0.15); color: #fb7185; }

        .inv-stat-body { flex: 1; min-width: 0; }
        .inv-stat-label { font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em; }
        .inv-stat-value { font-size: 19px; font-weight: 800; color: #fff; margin-top: 4px; line-height: 1.1; word-break: break-word; }
        .inv-stat-sub { font-size: 11px; color: #6b7280; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* ── Low stock banner ── */
        .inv-low-banner {
          display: flex; align-items: center; gap: 10px;
          background: rgba(245,158,11,0.1);
          border: 1px solid rgba(245,158,11,0.25);
          border-radius: 10px;
          padding: 12px 16px;
          margin-bottom: 20px;
          font-size: 13px; font-weight: 600; color: #fbbf24;
          cursor: pointer;
          transition: background 0.15s;
        }
        .inv-low-banner:hover { background: rgba(245,158,11,0.15); }

        /* ── Toolbar ── */
        .inv-toolbar {
          display: flex; gap: 10px; flex-wrap: wrap;
          margin-bottom: 16px;
          align-items: center;
        }
        .inv-search-wrap {
          flex: 1; min-width: 180px;
          position: relative;
        }
        .inv-search-icon {
          position: absolute; left: 12px; top: 50%;
          transform: translateY(-50%);
          color: #6b7280; pointer-events: none;
        }
        .inv-search {
          width: 100%;
          padding: 10px 14px 10px 36px;
          background: #1a1d27;
          border: 1px solid #23263a;
          border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; color: #e8eaf0;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .inv-search::placeholder { color: #4b5563; }
        .inv-search:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }

        .inv-filter-btns { display: flex; gap: 6px; }
        .inv-filter-btn {
          padding: 9px 14px;
          background: #1a1d27;
          border: 1px solid #23263a;
          border-radius: 9px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 600; color: #9ca3af;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .inv-filter-btn:hover { border-color: #6366f1; color: #818cf8; }
        .inv-filter-btn.active {
          background: rgba(99,102,241,0.15);
          border-color: #6366f1;
          color: #818cf8;
        }
        .inv-filter-btn.active-amber {
          background: rgba(245,158,11,0.12);
          border-color: rgba(245,158,11,0.4);
          color: #fbbf24;
        }

        /* ── Table ── */
        .inv-table-wrap {
          background: #1a1d27;
          border-radius: 14px;
          border: 1px solid #23263a;
          overflow: hidden;
        }
        .inv-table {
          width: 100%;
          border-collapse: collapse;
        }
        .inv-table thead tr {
          border-bottom: 1px solid #23263a;
        }
        .inv-table th {
          padding: 13px 16px;
          text-align: left;
          font-size: 11px; font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          white-space: nowrap;
        }
        .inv-table td {
          padding: 14px 16px;
          font-size: 14px;
          color: #d1d5db;
          border-bottom: 1px solid #1e2130;
          vertical-align: middle;
        }
        .inv-table tbody tr:last-child td { border-bottom: none; }
        .inv-table tbody tr {
          transition: background 0.12s;
        }
        .inv-table tbody tr:hover { background: #1e2130; }

        .inv-product-name { font-weight: 700; color: #f9fafb; }
        .inv-category-badge {
          display: inline-block;
          padding: 3px 9px;
          background: #23263a;
          border-radius: 99px;
          font-size: 11px; font-weight: 600;
          color: #9ca3af;
        }

        /* Quantity badge */
        .inv-qty {
          display: inline-flex; align-items: center; gap: 5px;
          font-weight: 700;
        }
        .inv-qty.low { color: #fbbf24; }
        .inv-qty.ok { color: #34d399; }

        /* Units sold bar */
        .inv-sales-wrap { min-width: 80px; }
        .inv-sales-bar-bg {
          height: 5px; background: #23263a;
          border-radius: 99px; margin-top: 4px;
        }
        .inv-sales-bar-fill {
          height: 5px; border-radius: 99px;
          background: linear-gradient(90deg, #6366f1, #818cf8);
          transition: width 0.4s ease;
        }
        .inv-sales-text { font-size: 12px; color: #9ca3af; }

        /* Action buttons */
        .inv-actions { display: flex; gap: 6px; }
        .inv-btn-edit, .inv-btn-delete {
          width: 30px; height: 30px;
          border: none; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.15s;
        }
        .inv-btn-edit { background: rgba(99,102,241,0.12); color: #818cf8; }
        .inv-btn-edit:hover { background: rgba(99,102,241,0.25); }
        .inv-btn-delete { background: rgba(244,63,94,0.1); color: #fb7185; }
        .inv-btn-delete:hover { background: rgba(244,63,94,0.22); }

        /* Empty / loading / error states */
        .inv-state-box {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 60px 20px;
          text-align: center;
          color: #6b7280;
          gap: 10px;
        }
        .inv-state-box p { font-size: 14px; font-weight: 500; }

        /* ── Modal overlay ── */
        .inv-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 200;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: inv-fade 0.2s ease;
        }
        @keyframes inv-fade { from { opacity: 0; } to { opacity: 1; } }

        .inv-modal {
          background: #1a1d27;
          border: 1px solid #2d3048;
          border-radius: 18px;
          width: 100%; max-width: 440px;
          padding: 28px 24px;
          animation: inv-pop 0.25s cubic-bezier(.32,1.1,.6,1);
        }
        @keyframes inv-pop {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .inv-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 22px;
        }
        .inv-modal-title { font-size: 18px; font-weight: 800; color: #fff; }
        .inv-modal-close {
          width: 32px; height: 32px;
          background: #23263a; border: none; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9ca3af; cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .inv-modal-close:hover { background: #2d3048; color: #fff; }

        .inv-form { display: flex; flex-direction: column; gap: 14px; }

        /* Field */
        .inv-field { display: flex; flex-direction: column; gap: 5px; }
        .inv-field-label { font-size: 12px; font-weight: 700; color: #9ca3af; letter-spacing: 0.01em; }
        .inv-req { color: #fb7185; margin-left: 2px; }
        .inv-field-input {
          padding: 11px 14px;
          background: #12141e;
          border: 1.5px solid #23263a;
          border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 500; color: #e8eaf0;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .inv-field-input::placeholder { color: #374151; }
        .inv-field-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
        .inv-field-input.inv-field-error { border-color: #fb7185; }
        .inv-field-err-text { font-size: 11px; color: #fb7185; font-weight: 600; }

        .inv-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .inv-submit-error {
          background: rgba(244,63,94,0.1);
          border: 1px solid rgba(244,63,94,0.25);
          border-radius: 8px; padding: 10px 14px;
          font-size: 12px; font-weight: 600; color: #fb7185;
        }

        .inv-modal-actions { display: flex; gap: 10px; margin-top: 6px; }
        .inv-btn-cancel {
          flex: 1; padding: 12px;
          background: #23263a; border: none; border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 700; color: #9ca3af;
          cursor: pointer; transition: background 0.15s;
        }
        .inv-btn-cancel:hover { background: #2d3048; color: #fff; }
        .inv-btn-primary {
          flex: 1; padding: 12px;
          background: #6366f1; border: none; border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 700; color: #fff;
          cursor: pointer;
          transition: background 0.18s, box-shadow 0.18s;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          box-shadow: 0 4px 14px rgba(99,102,241,0.3);
        }
        .inv-btn-primary:hover:not(:disabled) { background: #4f46e5; }
        .inv-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Delete confirm modal */
        .inv-delete-modal {
          background: #1a1d27;
          border: 1px solid #2d3048;
          border-radius: 18px;
          width: 100%; max-width: 360px;
          padding: 28px 24px;
          text-align: center;
          animation: inv-pop 0.25s cubic-bezier(.32,1.1,.6,1);
        }
        .inv-delete-icon {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(244,63,94,0.12);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px; color: #fb7185;
        }
        .inv-delete-title { font-size: 17px; font-weight: 800; color: #fff; margin-bottom: 8px; }
        .inv-delete-sub { font-size: 13px; color: #6b7280; margin-bottom: 22px; line-height: 1.6; }
        .inv-delete-actions { display: flex; gap: 10px; }
        .inv-btn-confirm-delete {
          flex: 1; padding: 12px;
          background: #ef4444; border: none; border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 700; color: #fff;
          cursor: pointer; transition: background 0.15s;
        }
        .inv-btn-confirm-delete:hover { background: #dc2626; }

        @keyframes inv-spin { to { transform: rotate(360deg); } }

        /* Mobile tweaks */
        @media (max-width: 560px) {
          .inv-table th:nth-child(3),
          .inv-table td:nth-child(3) { display: none; }
          .inv-table th:nth-child(5),
          .inv-table td:nth-child(5) { display: none; }
        }
      `}</style>

      <div className="inv-root">

        {/* ── Header ── */}
        <div className="inv-header">
          <div className="inv-header-left">
            <h1>Stock Overview</h1>
            <p>Take stock of everything in your store</p>
          </div>
          <button className="inv-add-btn" onClick={openAddModal}>
            <PlusIcon /> Add Product
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="inv-stats">
          <StatCard
            icon={<WalletIcon />}
            accent="indigo"
            label="Total Inventory Value"
            value={formatCurrency(stats.totalValue)}
          />
          <StatCard
            icon={<BoxIcon />}
            accent="emerald"
            label="Total Units"
            value={stats.totalUnits.toLocaleString()}
          />
          <StatCard
            icon={<WarningIcon />}
            accent="amber"
            label="Low Stock Items"
            value={stats.lowStockCount}
            sub={`≤ ${LOW_STOCK_THRESHOLD} units`}
          />
          <StatCard
            icon={<TrendIcon />}
            accent="rose"
            label="Top Seller"
            value={stats.topProduct?.name || "—"}
            sub={stats.topProduct ? `${stats.topProduct.unitsSold} units sold` : "No data yet"}
          />
        </div>

        {/* ── Low stock banner ── */}
        {stats.lowStockCount > 0 && (
          <div
            className="inv-low-banner"
            onClick={() => setFilterStatus("low")}
          >
            <AlertIcon />
            {stats.lowStockCount} item{stats.lowStockCount > 1 ? "s are" : " is"} running low on stock — tap to view
          </div>
        )}

        {/* ── Toolbar ── */}
        <div className="inv-toolbar">
          <div className="inv-search-wrap">
            <span className="inv-search-icon"><SearchIcon /></span>
            <input
              className="inv-search"
              type="text"
              placeholder="Search products or categories…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="inv-filter-btns">
            <button
              className={`inv-filter-btn${filterStatus === "all" ? " active" : ""}`}
              onClick={() => setFilterStatus("all")}
            >All</button>
            <button
              className={`inv-filter-btn${filterStatus === "low" ? " active-amber" : ""}`}
              onClick={() => setFilterStatus("low")}
            >⚠ Low</button>
            <button
              className={`inv-filter-btn${filterStatus === "ok" ? " active" : ""}`}
              onClick={() => setFilterStatus("ok")}
            >In Stock</button>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="inv-table-wrap">
          {loading ? (
            <div className="inv-state-box">
              <SpinnerIcon />
              <p>Loading inventory…</p>
            </div>
          ) : error ? (
            <div className="inv-state-box">
              <p style={{ color: "#fb7185" }}>{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="inv-state-box">
              <BoxIcon />
              <p>No products found</p>
            </div>
          ) : (
            <table className="inv-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sales</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const isLow = Number(product.quantity) <= LOW_STOCK_THRESHOLD;
                  const maxSold = Math.max(...filteredProducts.map((p) => Number(p.unitsSold) || 0), 1);
                  const barWidth = Math.round((Number(product.unitsSold) / maxSold) * 100);

                  return (
                    <tr key={product._id}>
                      <td>
                        <span className="inv-product-name">{product.name}</span>
                      </td>
                      <td>
                        <span className="inv-category-badge">
                          {product.category || "General"}
                        </span>
                      </td>
                      <td>{formatCurrency(product.price)}</td>
                      <td>
                        <span className={`inv-qty${isLow ? " low" : " ok"}`}>
                          {isLow && <AlertIcon />}
                          {product.quantity}
                        </span>
                      </td>
                      <td>
                        <div className="inv-sales-wrap">
                          <span className="inv-sales-text">{product.unitsSold || 0} sold</span>
                          <div className="inv-sales-bar-bg">
                            <div className="inv-sales-bar-fill" style={{ width: `${barWidth}%` }} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="inv-actions">
                          <button
                            className="inv-btn-edit"
                            onClick={() => openEditModal(product)}
                            title="Edit"
                          ><EditIcon /></button>
                          <button
                            className="inv-btn-delete"
                            onClick={() => setDeleteConfirmId(product._id)}
                            title="Delete"
                          ><TrashIcon /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {(modalMode === "add" || modalMode === "edit") && (
        <div className="inv-overlay" onClick={closeModal}>
          <div className="inv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="inv-modal-header">
              <h2 className="inv-modal-title">
                {modalMode === "add" ? "Add New Product" : "Edit Product"}
              </h2>
              <button className="inv-modal-close" onClick={closeModal}><CloseIcon /></button>
            </div>

            <form
              className="inv-form"
              onSubmit={modalMode === "add" ? handleAddProduct : handleEditProduct}
            >
              <FormField
                label="Product Name" name="name" placeholder="e.g. Wireless Headphones"
                value={formData.name} onChange={handleFormChange}
                error={formErrors.name} required
              />
              <FormField
                label="Category" name="category" placeholder="e.g. Electronics"
                value={formData.category} onChange={handleFormChange}
                error={formErrors.category}
              />
              <div className="inv-form-row">
                <FormField
                  label="Price (₦)" name="price" type="number" placeholder="0.00"
                  value={formData.price} onChange={handleFormChange}
                  error={formErrors.price} required
                />
                <FormField
                  label="Quantity" name="quantity" type="number" placeholder="0"
                  value={formData.quantity} onChange={handleFormChange}
                  error={formErrors.quantity} required
                />
              </div>
              <FormField
                label="Units Sold" name="unitsSold" type="number" placeholder="0"
                value={formData.unitsSold} onChange={handleFormChange}
                error={formErrors.unitsSold}
              />

              {formErrors.submit && (
                <div className="inv-submit-error">{formErrors.submit}</div>
              )}

              <div className="inv-modal-actions">
                <button type="button" className="inv-btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="inv-btn-primary" disabled={submitting}>
                  {submitting ? <><SpinnerIcon /> Saving…</> : modalMode === "add" ? "Add Product" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteConfirmId && (
        <div className="inv-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div className="inv-delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="inv-delete-icon">
              <TrashIcon />
            </div>
            <h3 className="inv-delete-title">Delete Product?</h3>
            <p className="inv-delete-sub">
              This will permanently remove the product from your inventory. This action cannot be undone.
            </p>
            <div className="inv-delete-actions">
              <button className="inv-btn-cancel" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button
                className="inv-btn-confirm-delete"
                onClick={() => handleDeleteProduct(deleteConfirmId)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}