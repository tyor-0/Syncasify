import React from 'react'

function PlusIcon() {
  return (
    <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
        <path d="M6 2v8M2 6h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function ReasonCard({ stat, description, offsetTop }) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between"
      style={{
        backgroundImage: "radial-gradient(circle, #e0e7ff 1px, transparent 1px)",
        backgroundSize: "18px 18px",
        minHeight: "180px",
        marginTop: offsetTop || "0px",
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-gray-900 leading-snug">{stat}</h3>
        <PlusIcon />
      </div>

      {/* Description at bottom */}
      <p className="text-xs text-gray-400 leading-relaxed mt-6">{description}</p>
    </div>
  );
}

function Benefit() {
  return (
    <section className="bg-white py-20 px-4">

      {/* Header */}
      <div className="text-center mb-14 max-w-lg mx-auto">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 mb-5 shadow-sm">
          Why Chose us
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
          The Smarter Way to Run <br /> Your Business
        </h2>
      </div>

      {/* Cards — staggered layout */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 items-start">

        <ReasonCard
          stat="40% Faster Workflows"
          description="Automate invoices, remind and daily tasks to reduce"
          offsetTop="0px"
        />

        <ReasonCard
          stat="3× Better Team Coordination"
          description="Keep everyone aligned with shared access, real-time"
          offsetTop="48px"
        />

        <ReasonCard
          stat="100% Real-Time Visibility"
          description="Track income, expenses, and performance instantly"
          offsetTop="0px"
        />

        <ReasonCard
          stat="10k+ Businesses"
          description="Startups, agencies, growing and teams relyations."
          offsetTop="48px"
        />

      </div>
    </section>
  );
}

export default Benefit;