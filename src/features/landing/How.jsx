import React from "react";

function StepCard({ number, title, description }) {
  return (
    <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex-1 min-w-0">
      <div className="text-5xl font-extrabold text-indigo-100 mb-12 leading-none select-none">
        {number}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

function How() {
  return (
    <section className="bg-[#f4f5fb] py-16 px-4">
      <div className="text-center mb-12 max-w-lg mx-auto">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 mb-5 shadow-sm">
          Our Process
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          Start in 3 Simple Steps
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          Get up and running quickly with a simple, guided setup designed to save time and eliminate complexity.
        </p>
      </div>

      {/* 1 col on mobile, 3 col on md+ */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <StepCard
          number="01"
          title="Quick & Easy Setup"
          description="Sign up in minutes, add your business details, and invite your team to get started instantly."
        />
        <StepCard
          number="02"
          title="Manage & Collaborate"
          description="Create invoices, manage clients, assign tasks, and collaborate with your team."
        />
        <StepCard
          number="03"
          title="Grow Your Business"
          description="Monitor income, expenses, and performance from one dashboard to make smarter decisions."
        />
      </div>
    </section>
  );
}

export default How;
