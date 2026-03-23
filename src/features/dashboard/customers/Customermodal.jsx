import { useState } from "react";
import { getTier, fmt } from "@/utils/Discountutils";

/**
 * CustomerModal
 *
 * Renders a modal for adding or editing a customer.
 *
 * @prop {object|null} customer - null = add mode, object = edit mode
 * @prop {function}    onSave   - called with the saved customer object
 * @prop {function}    onClose  - called when the modal is dismissed
 */
export default function CustomerModal({ customer, onSave, onClose }) {
  const [name,     setName]     = useState(customer?.name     ?? "");
  const [spent,    setSpent]    = useState(customer?.spent    ?? "");
  const [orders,   setOrders]   = useState(customer?.orders   ?? "");
  const [lastDate, setLastDate] = useState(customer?.lastDate ?? "");

  const isEdit = Boolean(customer);
  const previewTier = getTier(parseInt(spent) || 0);

  function handleSave() {
    if (!name.trim()) return;
    onSave({
      id:       customer?.id ?? Date.now(),
      name:     name.trim(),
      spent:    parseInt(spent)  || 0,
      orders:   parseInt(orders) || 0,
      lastDate,
    });
  }

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={s.modalHeader}>
          <span style={s.modalTitle}>{isEdit ? "Edit customer" : "Add customer"}</span>
          <button style={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Fields */}
        <label style={s.label}>Customer name</label>
        <input
          style={s.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Amaka Obi"
          autoFocus
        />

        <label style={s.label}>Total amount spent (₦)</label>
        <input
          style={s.input}
          type="number"
          value={spent}
          onChange={(e) => setSpent(e.target.value)}
          placeholder="e.g. 250000"
        />

        {/* Live tier preview */}
        {parseInt(spent) > 0 && (
          <div style={{ ...s.tierPreview, background: previewTier.bg }}>
            <span style={{ color: previewTier.text, fontSize: 12, fontWeight: 500 }}>
              Tier: {previewTier.name}
              {previewTier.discount > 0
                ? ` — ${previewTier.discount}% discount · price after: ${fmt(Math.round(parseInt(spent) * (1 - previewTier.discount / 100)))}`
                : " — no discount yet"}
            </span>
          </div>
        )}

        <label style={s.label}>Number of orders</label>
        <input
          style={s.input}
          type="number"
          value={orders}
          onChange={(e) => setOrders(e.target.value)}
          placeholder="e.g. 12"
        />

        <label style={s.label}>Last purchase date</label>
        <input
          style={s.input}
          type="date"
          value={lastDate}
          onChange={(e) => setLastDate(e.target.value)}
        />

        {/* Actions */}
        <div style={s.actions}>
          <button style={s.btnCancel} onClick={onClose}>Cancel</button>
          <button style={s.btnSave}   onClick={handleSave}>
            {isEdit ? "Save changes" : "Add customer"}
          </button>
        </div>

      </div>
    </div>
  );
}

const s = {
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 200,
  },
  modal: {
    background: "#fff", borderRadius: 14,
    padding: "1.5rem", width: 360,
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  },
  modalHeader: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: "1.25rem",
  },
  modalTitle:  { fontSize: 16, fontWeight: 600 },
  closeBtn:    { background: "none", border: "none", fontSize: 14, cursor: "pointer", color: "#888" },
  label:       { fontSize: 12, color: "#888", display: "block", marginTop: 12, marginBottom: 4 },
  input: {
    width: "100%", padding: "8px 12px", fontSize: 13,
    borderRadius: 8, border: "0.5px solid #d0cec8",
    background: "#fff", color: "#1a1a18", boxSizing: "border-box",
  },
  tierPreview: { padding: "6px 10px", borderRadius: 8, marginTop: 6 },
  actions:     { display: "flex", gap: 8, marginTop: "1.25rem" },
  btnCancel: {
    flex: 1, padding: "9px", borderRadius: 8,
    border: "0.5px solid #d0cec8", background: "transparent",
    color: "#333", fontSize: 13, cursor: "pointer",
  },
  btnSave: {
    flex: 1, padding: "9px", borderRadius: 8,
    border: "none", background: "#1a1a18",
    color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer",
  },
};