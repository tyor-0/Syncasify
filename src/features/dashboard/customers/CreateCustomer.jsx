import { useRef, useState } from "react";
import { useCreateCustomer } from "../../../hooks/useCreateCustomer";

const CUSTOMER_TYPES = ["Current", "New", "VIP", "Prospect"];

export default function AddNewCustomer({ onClose }) {
  const {
    formData,
    loading,
    errors,
    success,
    handleChange,
    handlePhotoChange,
    handleCustomerType,
    handleSubmit,
  } = useCreateCustomer();

  const fileRef = useRef();
  const [showTypeSheet, setShowTypeSheet] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');

        .anc-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .anc-root {
          font-family: 'Nunito', sans-serif;
          background: #f5f6fa;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .anc-phone {
          width: 100%;
          max-width: 390px;
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* Top bar */
        .anc-topbar {
          display: flex;
          align-items: center;
          padding: 18px 20px 10px;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .anc-close-btn {
          width: 36px; height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          color: #222;
          transition: background 0.15s;
        }
        .anc-close-btn:hover { background: #f0f0f0; }

        /* Title */
        .anc-title {
          padding: 10px 24px 22px;
          background: #fff;
        }
        .anc-title h1 {
          font-size: 26px;
          font-weight: 800;
          color: #111;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        /* Scroll body */
        .anc-body {
          flex: 1;
          overflow-y: auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* Field groups */
        .anc-field { display: flex; flex-direction: column; gap: 6px; }
        .anc-label {
          font-size: 13px;
          font-weight: 700;
          color: #555;
          letter-spacing: 0.01em;
        }
        .anc-input {
          width: 100%;
          padding: 13px 16px;
          background: #f5f6fa;
          border: 1.5px solid #ebebf0;
          border-radius: 12px;
          font-family: 'Nunito', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #111;
          outline: none;
          transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
          -webkit-appearance: none;
        }
        .anc-input::placeholder { color: #bbb; font-weight: 400; }
        .anc-input:focus {
          border-color: #2563eb;
          background: #fff;
          box-shadow: 0 0 0 3.5px rgba(37,99,235,0.10);
        }
        .anc-input.has-error { border-color: #ef4444; background: #fff5f5; }
        .anc-error-text {
          font-size: 12px;
          color: #ef4444;
          font-weight: 600;
          padding-left: 2px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Photo upload */
        .anc-photo-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 16px;
          background: #f5f6fa;
          border: 1.5px solid #ebebf0;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .anc-photo-btn:hover { background: #eef2ff; border-color: #c7d2fe; }
        .anc-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: #e0e7ff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .anc-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
        .anc-photo-label { font-size: 14px; font-weight: 700; color: #2563eb; }
        .anc-photo-sublabel { font-size: 11.5px; color: #aaa; font-weight: 500; margin-top: 1px; }

        /* Divider */
        .anc-divider { height: 1px; background: #f0f0f5; }

        /* Customer type row */
        .anc-type-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 2px;
          cursor: pointer;
          border-radius: 10px;
          transition: background 0.12s;
        }
        .anc-type-row:hover { background: #f7f8ff; }
        .anc-type-left { font-size: 15px; font-weight: 600; color: #222; }
        .anc-type-right {
          display: flex; align-items: center; gap: 4px;
          color: #2563eb; font-size: 15px; font-weight: 700;
        }

        /* Bottom sheet overlay */
        .anc-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 100;
          display: flex; align-items: flex-end; justify-content: center;
          animation: anc-fade-in 0.2s ease;
        }
        @keyframes anc-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .anc-sheet {
          background: #fff;
          width: 100%; max-width: 390px;
          border-radius: 24px 24px 0 0;
          padding: 8px 0 30px;
          animation: anc-slide-up 0.28s cubic-bezier(.32,1.1,.6,1);
        }
        @keyframes anc-slide-up {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .anc-sheet-handle {
          width: 40px; height: 4px;
          background: #ddd; border-radius: 99px;
          margin: 10px auto 18px;
        }
        .anc-sheet-title {
          font-size: 13px; font-weight: 700; color: #999;
          letter-spacing: 0.07em; text-transform: uppercase;
          padding: 0 22px 12px;
        }
        .anc-type-option {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 22px; cursor: pointer;
          transition: background 0.12s;
          font-size: 16px; font-weight: 600; color: #111;
        }
        .anc-type-option:hover { background: #f5f6fa; }
        .anc-type-option.selected { color: #2563eb; }
        .anc-type-check {
          width: 22px; height: 22px; border-radius: 50%;
          background: #2563eb;
          display: flex; align-items: center; justify-content: center;
        }

        /* Submit error */
        .anc-submit-error {
          background: #fff0f0; border: 1.5px solid #fecaca;
          border-radius: 10px; padding: 11px 14px;
          font-size: 13px; font-weight: 600; color: #ef4444; text-align: center;
        }

        /* CTA */
        .anc-cta {
          padding: 16px 20px 28px;
          background: #fff;
          position: sticky; bottom: 0;
        }
        .anc-submit-btn {
          width: 100%; padding: 16px;
          background: #2563eb; color: #fff;
          border: none; border-radius: 14px;
          font-family: 'Nunito', sans-serif;
          font-size: 16px; font-weight: 800; cursor: pointer;
          transition: background 0.18s, transform 0.1s, box-shadow 0.18s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 18px rgba(37,99,235,0.30);
        }
        .anc-submit-btn:hover:not(:disabled) {
          background: #1d4ed8;
          box-shadow: 0 6px 24px rgba(37,99,235,0.40);
        }
        .anc-submit-btn:active:not(:disabled) { transform: scale(0.98); }
        .anc-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .anc-submit-btn.success { background: #16a34a; box-shadow: 0 4px 18px rgba(22,163,74,0.30); }
        .anc-spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff; border-radius: 50%;
          animation: anc-spin 0.65s linear infinite;
        }
        @keyframes anc-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="anc-root">
        <div className="anc-phone">

          {/* Top bar */}
          <div className="anc-topbar">
            <button className="anc-close-btn" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Title */}
          <div className="anc-title">
            <h1>Add New Customer</h1>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit}>
            <div className="anc-body">

              {/* First name */}
              <div className="anc-field">
                <span className="anc-label">First name</span>
                <input
                  className={`anc-input${errors.firstName ? " has-error" : ""}`}
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <span className="anc-error-text">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                    {errors.firstName}
                  </span>
                )}
              </div>

              {/* Last name */}
              <div className="anc-field">
                <span className="anc-label">Last name</span>
                <input
                  className={`anc-input${errors.lastName ? " has-error" : ""}`}
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <span className="anc-error-text">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                    {errors.lastName}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="anc-field">
                <span className="anc-label">Email address</span>
                <input
                  className={`anc-input${errors.email ? " has-error" : ""}`}
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="anc-error-text">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="anc-field">
                <span className="anc-label">Phone number</span>
                <input
                  className={`anc-input${errors.phone ? " has-error" : ""}`}
                  type="tel"
                  name="phone"
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
                {errors.phone && (
                  <span className="anc-error-text">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                    {errors.phone}
                  </span>
                )}
              </div>

 
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />

              <div className="anc-divider" />

              {/* Customer type */}
              <div className="anc-type-row" onClick={() => setShowTypeSheet(true)}>
                <span className="anc-type-left">Customer type</span>
                <span className="anc-type-right">
                  {formData.customerType}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
              </div>

              <div className="anc-divider" />

              {errors.submit && (
                <div className="anc-submit-error">{errors.submit}</div>
              )}

            </div>

            {/* Sticky CTA */}
            <div className="anc-cta">
              <button
                type="submit"
                className={`anc-submit-btn${success ? " success" : ""}`}
                disabled={loading || success}
              >
                {loading ? (
                  <><div className="anc-spinner" /> Adding customer…</>
                ) : success ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><path d="M20 6L9 17l-5-5" /></svg>
                    Customer Added!
                  </>
                ) : (
                  "Add new customer"
                )}
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Customer Type Bottom Sheet */}
      {showTypeSheet && (
        <div className="anc-overlay" onClick={() => setShowTypeSheet(false)}>
          <div className="anc-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="anc-sheet-handle" />
            <div className="anc-sheet-title">Customer type</div>
            {CUSTOMER_TYPES.map((type) => (
              <div
                key={type}
                className={`anc-type-option${formData.customerType === type ? " selected" : ""}`}
                onClick={() => {
                  handleCustomerType(type);
                  setShowTypeSheet(false);
                }}
              >
                {type}
                {formData.customerType === type && (
                  <div className="anc-type-check">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}