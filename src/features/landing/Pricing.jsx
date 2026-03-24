import React, { useState } from 'react'

const plans = [
  {
    icon: "⊞",
    name: "Standard",
    description: "A simple plan for freelancers and solo business owners.",
    monthlyPrice: "$19",
    yearlyPrice: "$190",
    perUser: "/ One User",
    popular: false,
    features: [
      { text: "Invoice Management" },
      { text: "10,000+ components & variants" },
      { text: "Email Support" },
      { text: "Expense Tracking" },
      { text: "Variable modes" },
    ],
    licenses: [
      { text: "Single user license" },
      { text: "Commercial license" },
      { text: "Free lifetime updates" },
    ],
    buttonStyle: "bg-gray-900 text-white hover:bg-gray-800",
    cardStyle: "bg-white border border-gray-200",
  },
  {
    icon: "🕐",
    name: "Team",
    description: "Up to 5 users, perfect for teams, startups and agencies.",
    monthlyPrice: "$100",
    yearlyPrice: "$999",
    perUser: "/ 10 Users",
    popular: true,
    features: [
      { text: "Everything in Starter" },
      { text: "Advanced Reports & Analytics" },
      { text: "Team Collaboration" },
      { text: "Up to 5 Team Members" },
      { text: "Recurring Invoices" },
      { text: "Priority Support" },
    ],
    licenses: [
      { text: "5 user license" },
      { text: "Commercial license" },
      { text: "Free lifetime updates" },
    ],
    buttonStyle: "bg-indigo-500 text-white hover:bg-indigo-600",
    cardStyle: "bg-indigo-50 border border-indigo-200",
  },
  {
    icon: "🎯",
    name: "Enterprise",
    description: "Unlimited users and features for large organizations.",
    monthlyPrice: "$149",
    yearlyPrice: "$1490",
    perUser: "Unlimited Users",
    popular: false,
    features: [
      { text: "Everything in Team" },
      { text: "Dedicated Account Manager" },
      { text: "Custom Reports" },
      { text: "Multi-Branch Management" },
      { text: "Unlimited Users" },
      { text: "24/7 Premium Support" },
    ],
    licenses: [
      { text: "Unlimited user license" },
      { text: "Commercial license" },
      { text: "Free lifetime updates" },
    ],
    buttonStyle: "bg-gray-900 text-white hover:bg-gray-800",
    cardStyle: "bg-white border border-gray-200",
  },
];

function FeatureItem({ text }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-600">
      <span className="text-indigo-400">✓</span>
      <span>{text}</span>
    </div>
  );
}

function PlanCard({ plan, isYearly }) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div className={`relative rounded-3xl p-6 flex flex-col gap-5 w-full ${plan.cardStyle}`}>
      {plan.popular && (
        <div className="absolute top-4 right-4 bg-gray-900 text-white text-[10px] font-semibold px-3 py-1 rounded-full">
          Popular
        </div>
      )}
      <div>
        <div className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-base mb-4 shadow-sm">
          {plan.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
        <p className="text-xs text-gray-400 leading-relaxed">{plan.description}</p>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-gray-900">{price}</span>
        <span className="text-xs text-gray-400">{plan.perUser}</span>
      </div>
      <hr className="border-gray-200" />
      <div className="flex flex-col gap-2.5">
        {plan.features.map((f, i) => <FeatureItem key={i} text={f.text} />)}
      </div>
      <hr className="border-gray-200" />
      <div className="flex flex-col gap-2.5">
        {plan.licenses.map((l, i) => <FeatureItem key={i} text={l.text} />)}
      </div>
      <button className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors ${plan.buttonStyle}`}>
        Get Started
      </button>
    </div>
  );
}

function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="bg-white py-16 px-4">
      <div className="text-center mb-10 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 mb-5 shadow-sm">
          Choose Your Plan
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          Pricing That Grows With You
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          Flexible plans designed for freelancers, teams, and growing businesses—no hidden fees.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${!isYearly ? "bg-indigo-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${isYearly ? "bg-indigo-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* 1 col on mobile, 3 col on desktop */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} isYearly={isYearly} />
        ))}
      </div>
    </section>
  );
}

export default Pricing;
