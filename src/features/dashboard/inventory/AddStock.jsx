import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddStock } from "../../../hooks/useAddStock";

const CATEGORIES = [
    "Electronics",
    "Groceries",
    "Clothing",
    "Furniture",
    "Health & Beauty",
    "Stationery",
    "Food & Beverage",
    "Other",
];

const UNITS = ["piece", "pack", "bottle", "crate", "kg", "litre", "carton", "other"];

const initialForm = {
    name: "",
    category: "",
    quantity: "",
    unit: "piece",
    costPrice: "",
    sellingPrice: "",
};

const AddStock = ({ onBack }) => {
    const { loading, error, addStock } = useAddStock();
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const profit =
        form.sellingPrice && form.costPrice
            ? (parseFloat(form.sellingPrice) - parseFloat(form.costPrice)).toFixed(2)
            : null;

    const margin =
        form.sellingPrice && form.costPrice && parseFloat(form.costPrice) > 0
            ? (
                  ((parseFloat(form.sellingPrice) - parseFloat(form.costPrice)) /
                      parseFloat(form.costPrice)) *
                  100
              ).toFixed(1)
            : null;

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Product name is required";
        if (!form.category) e.category = "Please select a category";
        if (form.quantity === "" || isNaN(form.quantity) || Number(form.quantity) < 0)
            e.quantity = "Enter a valid quantity";
        if (form.costPrice === "" || isNaN(form.costPrice) || Number(form.costPrice) < 0)
            e.costPrice = "Enter a valid cost price";
        if (form.sellingPrice === "" || isNaN(form.sellingPrice) || Number(form.sellingPrice) < 0)
            e.sellingPrice = "Enter a valid selling price";
        return e;
    };

    const handleSubmit = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        const payload = {
            name: form.name.trim(),
            category: form.category,
            quantity: Number(form.quantity),
            unit: form.unit,
            costPrice: parseFloat(form.costPrice),
            sellingPrice: parseFloat(form.sellingPrice),
        };

        const result = await addStock(payload);
        if (result) navigate("/admin/all-items");
    };

    return (
        <div style={styles.root}>
            {/* Header */}
            <div style={styles.header}>
                <button style={styles.iconBtn} onClick={onBack}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <span style={styles.headerTitle}>Add Stock</span>
                <button style={styles.iconBtn} onClick={() => { setForm(initialForm); setErrors({}); }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                </button>
            </div>

            <div style={styles.scroll}>
                {/* API error banner */}
                {error && (
                    <div style={styles.errorBanner}>
                        {error}
                    </div>
                )}

                {/* Product Name */}
                <div style={styles.field}>
                    <label style={styles.label}>
                        Product Name <span style={styles.req}>*</span>
                    </label>
                    <input
                        style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
                        placeholder="e.g. Wireless Mouse"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    {errors.name && <span style={styles.errMsg}>{errors.name}</span>}
                </div>

                {/* Category */}
                <div style={styles.field}>
                    <label style={styles.label}>
                        Category <span style={styles.req}>*</span>
                    </label>
                    <div style={styles.selectWrap}>
                        <select
                            style={{ ...styles.select, ...(errors.category ? styles.inputError : {}) }}
                            value={form.category}
                            onChange={(e) => handleChange("category", e.target.value)}
                        >
                            <option value="">Select category</option>
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <svg style={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                    {errors.category && <span style={styles.errMsg}>{errors.category}</span>}
                </div>

                {/* Quantity + Unit */}
                <div style={styles.row}>
                    <div style={{ ...styles.field, flex: 1 }}>
                        <label style={styles.label}>
                            Quantity <span style={styles.req}>*</span>
                        </label>
                        <input
                            style={{ ...styles.input, ...(errors.quantity ? styles.inputError : {}) }}
                            type="number"
                            min="0"
                            placeholder="0"
                            value={form.quantity}
                            onChange={(e) => handleChange("quantity", e.target.value)}
                        />
                        {errors.quantity && <span style={styles.errMsg}>{errors.quantity}</span>}
                    </div>
                    <div style={{ ...styles.field, flex: 1 }}>
                        <label style={styles.label}>Unit</label>
                        <div style={styles.selectWrap}>
                            <select
                                style={styles.select}
                                value={form.unit}
                                onChange={(e) => handleChange("unit", e.target.value)}
                            >
                                {UNITS.map((u) => (
                                    <option key={u} value={u}>{u}</option>
                                ))}
                            </select>
                            <svg style={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Prices */}
                <div style={styles.row}>
                    <div style={{ ...styles.field, flex: 1 }}>
                        <label style={styles.label}>
                            Cost Price <span style={styles.req}>*</span>
                        </label>
                        <div style={styles.inputIconWrap}>
                            <span style={styles.currency}>₦</span>
                            <input
                                style={{ ...styles.input, ...styles.inputWithIcon, ...(errors.costPrice ? styles.inputError : {}) }}
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                value={form.costPrice}
                                onChange={(e) => handleChange("costPrice", e.target.value)}
                            />
                        </div>
                        {errors.costPrice && <span style={styles.errMsg}>{errors.costPrice}</span>}
                    </div>
                    <div style={{ ...styles.field, flex: 1 }}>
                        <label style={styles.label}>
                            Selling Price <span style={styles.req}>*</span>
                        </label>
                        <div style={styles.inputIconWrap}>
                            <span style={styles.currency}>₦</span>
                            <input
                                style={{ ...styles.input, ...styles.inputWithIcon, ...(errors.sellingPrice ? styles.inputError : {}) }}
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                value={form.sellingPrice}
                                onChange={(e) => handleChange("sellingPrice", e.target.value)}
                            />
                        </div>
                        {errors.sellingPrice && <span style={styles.errMsg}>{errors.sellingPrice}</span>}
                    </div>
                </div>

                {/* Profit Preview */}
                {profit !== null && (
                    <div style={styles.profitCard}>
                        <div style={styles.profitItem}>
                            <span style={styles.profitLabel}>Profit / Unit</span>
                            <span style={{ ...styles.profitValue, color: parseFloat(profit) >= 0 ? "#16a34a" : "#dc2626" }}>
                                ₦{profit}
                            </span>
                        </div>
                        <div style={styles.profitDivider} />
                        <div style={styles.profitItem}>
                            <span style={styles.profitLabel}>Margin</span>
                            <span style={{ ...styles.profitValue, color: parseFloat(profit) >= 0 ? "#16a34a" : "#dc2626" }}>
                                {margin}%
                            </span>
                        </div>
                        <div style={styles.profitDivider} />
                        <div style={styles.profitItem}>
                            <span style={styles.profitLabel}>Stock Value</span>
                            <span style={{ ...styles.profitValue, color: "#1d4ed8" }}>
                                ₦{form.quantity ? (parseFloat(form.costPrice) * Number(form.quantity)).toFixed(2) : "—"}
                            </span>
                        </div>
                    </div>
                )}

                <div style={{ height: 100 }} />
            </div>

            {/* Footer */}
            <div style={styles.footer}>
                <button
                    style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add to Inventory"}
                </button>
            </div>
        </div>
    );
};

export default AddStock;

const styles = {
    root: {
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#f8f9fb",
        minHeight: "100vh",
        maxWidth: 430,
        margin: "0 auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        background: "#fff",
        borderBottom: "1px solid #eef0f3",
        position: "sticky",
        top: 0,
        zIndex: 10,
    },
    iconBtn: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#374151",
        padding: 4,
        display: "flex",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: 700,
        color: "#111827",
        letterSpacing: "-0.3px",
    },
    scroll: {
        flex: 1,
        overflowY: "auto",
        padding: "20px 20px 0",
    },
    errorBanner: {
        background: "#fef2f2",
        border: "1px solid #fecaca",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 13,
        color: "#dc2626",
        marginBottom: 16,
    },
    field: {
        marginBottom: 18,
        display: "flex",
        flexDirection: "column",
        gap: 6,
    },
    label: {
        fontSize: 13,
        fontWeight: 600,
        color: "#374151",
    },
    req: { color: "#f97316" },
    input: {
        border: "1.5px solid #e5e7eb",
        borderRadius: 10,
        padding: "12px 14px",
        fontSize: 15,
        color: "#111827",
        background: "#fff",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
    },
    inputError: {
        borderColor: "#f87171",
        background: "#fff8f8",
    },
    selectWrap: { position: "relative" },
    select: {
        border: "1.5px solid #e5e7eb",
        borderRadius: 10,
        padding: "12px 36px 12px 14px",
        fontSize: 15,
        color: "#111827",
        background: "#fff",
        outline: "none",
        width: "100%",
        appearance: "none",
        cursor: "pointer",
        boxSizing: "border-box",
    },
    chevron: {
        position: "absolute",
        right: 12,
        top: "50%",
        transform: "translateY(-50%)",
        width: 18,
        height: 18,
        color: "#6b7280",
        pointerEvents: "none",
    },
    row: {
        display: "flex",
        gap: 12,
    },
    inputIconWrap: { position: "relative" },
    currency: {
        position: "absolute",
        left: 12,
        top: "50%",
        transform: "translateY(-50%)",
        color: "#6b7280",
        fontSize: 15,
        fontWeight: 600,
        pointerEvents: "none",
    },
    inputWithIcon: { paddingLeft: 28 },
    errMsg: {
        fontSize: 12,
        color: "#ef4444",
    },
    profitCard: {
        background: "#fff",
        border: "1.5px solid #e5e7eb",
        borderRadius: 12,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        marginBottom: 18,
    },
    profitItem: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
    },
    profitDivider: {
        width: 1,
        height: 32,
        background: "#e5e7eb",
        margin: "0 4px",
    },
    profitLabel: {
        fontSize: 11,
        color: "#9ca3af",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.4px",
    },
    profitValue: {
        fontSize: 15,
        fontWeight: 700,
    },
    footer: {
        position: "sticky",
        bottom: 0,
        padding: "16px 20px",
        background: "linear-gradient(to top, #f8f9fb 80%, transparent)",
    },
    submitBtn: {
        width: "100%",
        background: "#f97316",
        color: "#fff",
        border: "none",
        borderRadius: 14,
        padding: "16px 0",
        fontSize: 16,
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 4px 16px rgba(249,115,22,0.35)",
    },
};