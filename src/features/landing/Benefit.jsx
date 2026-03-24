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

function ReasonCard({ stat, description }) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between"
      style={{
        backgroundImage: "radial-gradient(circle, #e0e7ff 1px, transparent 1px)",
        backgroundSize: "18px 18px",
        minHeight: "160px",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-gray-900 leading-snug">{stat}</h3>
        <PlusIcon />
      </div>
      <p className="text-xs text-gray-400 leading-relaxed mt-4">{description}</p>
    </div>
  );
}

function Benefit() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="text-center mb-12 max-w-lg mx-auto">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 mb-5 shadow-sm">
          Why Choose us
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          The Smarter Way to Run <br className="hidden sm:block" /> Your Business
        </h2>
      </div>

      {/* Responsive grid — 1 col mobile, 2 col tablet, 4 col desktop */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReasonCard
          stat="40% Faster Workflows"
          description="Automate invoices, reminders and daily tasks to reduce manual work."
        />
        <ReasonCard
          stat="3× Better Team Coordination"
          description="Keep everyone aligned with shared access and real-time updates."
        />
        <ReasonCard
          stat="100% Real-Time Visibility"
          description="Track income, expenses, and performance instantly from one place."
        />
        <ReasonCard
          stat="10k+ Businesses"
          description="Startups, agencies, and growing teams rely on us every day."
        />
      </div>
    </section>
  );
}

export default Benefit;
