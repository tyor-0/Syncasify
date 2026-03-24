import React from "react";
import { useEffect, useState } from "react";

function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, #dde4ff 0%, #f0f2ff 40%, #ffffff 100%)",
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background blobs */}
      <div style={{
        position: "absolute", top: "10%", left: "5%",
        width: 260, height: 260,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "5%",
        width: 220, height: 220,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none",
      }} />

      <div
        style={{
          maxWidth: 720,
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(139,92,246,0.2)",
            borderRadius: 999,
            padding: "5px 14px 5px 6px",
            marginBottom: 28,
            backdropFilter: "blur(8px)",
            boxShadow: "0 2px 12px rgba(139,92,246,0.08)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <span style={{
            background: "linear-gradient(135deg, #7c3aed, #6366f1)",
            color: "white",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.06em",
            padding: "3px 9px",
            borderRadius: 999,
            textTransform: "uppercase",
          }}>
            New
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L4.09 12.97H11L10 22l8.91-10.97H13L13 2z"
                fill="#7c3aed" stroke="#7c3aed" strokeWidth="1" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 13, color: "#4b5563", fontWeight: 500 }}>
              Your Business, Simplified
            </span>
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(2rem, 6vw, 3.6rem)",
            fontWeight: 800,
            lineHeight: 1.12,
            color: "#0f0f1a",
            letterSpacing: "-0.03em",
            marginBottom: 20,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          One Dashboard To Manage<br />
          Your Entire{" "}
          <span style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Business.
          </span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: "clamp(0.875rem, 2vw, 1rem)",
            color: "#6b7280",
            lineHeight: 1.7,
            maxWidth: 460,
            margin: "0 auto 36px",
            fontWeight: 400,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
            padding: "0 8px",
          }}
        >
          From invoices to client management and expense tracking, Syncasify
          keeps your business organized in one platform.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s",
            padding: "0 8px",
          }}
        >
          <a
            href="/auth"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
              color: "white",
              padding: "12px 24px",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              display: "inline-block",
            }}
          >
            Get Started
          </a>

          <a
            href="#demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              color: "#111827",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              padding: "12px 16px",
              borderRadius: 10,
              transition: "color 0.2s ease",
            }}
          >
            <span style={{
              width: 34, height: 34,
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="12" height="13" viewBox="0 0 12 14" fill="none">
                <path d="M1 1.5L11 7L1 12.5V1.5Z" fill="#111827" stroke="#111827"
                  strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </span>
            Watch demo
          </a>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>
    </section>
  );
}

export default Hero;
