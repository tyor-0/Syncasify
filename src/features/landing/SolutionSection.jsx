import React from "react";


function LastTransactionPreview() {
  const transactions = [
    { id: "5886244454S", date: "27 Mar 2024", status: "Pending",   statusColor: "text-yellow-500 bg-yellow-50",  amount: "$25000.00" },
    { id: "5886244454S", date: "27 Mar 2024", status: "Converted", statusColor: "text-green-500 bg-green-50",   amount: "$25000.00" },
    { id: "5886244454S", date: "27 Mar 2024", status: "Rejected",  statusColor: "text-red-500 bg-red-50",       amount: "$25000.00" },
    { id: "5886244454S", date: "27 Mar 2024", status: "Completed", statusColor: "text-blue-500 bg-blue-50",     amount: "$25000.00" },
    { id: "5886244454S", date: "27 Mar 2024", status: "Converted", statusColor: "text-green-500 bg-green-50",   amount: "$25000.00" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-gray-800">Last Transaction</span>
        <span className="text-xs text-indigo-500 cursor-pointer">View &rsaquo;</span>
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="text-gray-400 border-b border-gray-100">
            <th className="text-left pb-2 font-medium">Transaction ID</th>
            <th className="text-left pb-2 font-medium">Date</th>
            <th className="text-left pb-2 font-medium">Status</th>
            <th className="text-right pb-2 font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0">
              <td className="py-2 text-gray-500">{tx.id}</td>
              <td className="py-2 text-gray-500">{tx.date}</td>
              <td className="py-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${tx.statusColor}`}>
                  {tx.status}
                </span>
              </td>
              <td className="py-2 text-right text-gray-700 font-medium">{tx.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ClientListPreview() {
  const clients = [
    { name: "Alphie Turner", time: "12 Aug 2022 | 10:00", amount: "$666.00", amountColor: "text-gray-800" },
    { name: "Bella Poarch",  time: "03 Aug 2022 | 14:00", amount: "$199.00", amountColor: "text-green-500" },
    { name: "Cinlia",        time: "30 July 2022 | 09:00", amount: "$68.99",  amountColor: "text-gray-800" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 w-full max-w-xs">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-gray-800">Client List</span>
        <span className="text-gray-400 text-lg leading-none">···</span>
      </div>

      <div className="space-y-3">
        {clients.map((client, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-gray-800">{client.name}</div>
              <div className="text-[10px] text-gray-400">{client.time}</div>
            </div>
            <div className={`text-xs font-bold ${client.amountColor}`}>{client.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPreview() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 w-full max-w-sm">
      <div className="text-sm font-semibold text-gray-800 mb-4">Reports &amp; Analytics</div>

      <div className="flex gap-4 mb-4 text-xs overflow-x-auto">
        <div className="flex-shrink-0">
          <div className="font-bold text-gray-800">$16,584</div>
          <div className="text-gray-400">New Sale</div>
        </div>
        <div className="flex-shrink-0">
          <div className="font-bold text-gray-800">$22,365.00</div>
          <div className="text-gray-400">Returns</div>
        </div>
        <div className="flex-shrink-0">
          <div className="font-bold text-gray-800">$120,254.00</div>
          <div className="text-gray-400">Revenue</div>
        </div>
        <div className="flex-shrink-0">
          <div className="font-bold text-gray-800">$325.12</div>
          <div className="text-gray-400">Growth</div>
        </div>
      </div>

      <svg viewBox="0 0 280 90" className="w-full h-20">
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="grad3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d="M0,70 C40,60 80,30 140,40 C180,48 220,55 280,35 L280,90 L0,90 Z" fill="url(#grad3)" />
        <path d="M0,75 C40,65 90,45 140,55 C185,63 230,68 280,50 L280,90 L0,90 Z" fill="url(#grad2)" />
        <path d="M0,80 C50,75 100,60 140,65 C190,72 240,75 280,62 L280,90 L0,90 Z" fill="url(#grad1)" />
        {[56, 112, 168, 224].map((x) => (
          <line key={x} x1={x} y1="10" x2={x} y2="85" stroke="#e0e7ff" strokeWidth="1" strokeDasharray="3,3" />
        ))}
        {[{ x: 56, label: "75%" }, { x: 112, label: "75%" }, { x: 168, label: "50%" }, { x: 224, label: "75%" }].map((l) => (
          <text key={l.x} x={l.x} y="25" textAnchor="middle" fontSize="8" fill="#6366f1" fontWeight="600">{l.label}</text>
        ))}
      </svg>
    </div>
  );
}

function CheckItem({ text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-indigo-500 flex-shrink-0">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {text}
    </div>
  );
}

function StatBadge({ value, label }) {
  return (
    <div>
      <div className="text-2xl font-extrabold text-gray-900">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}

function GetStartedButton() {
  return (
    <button className="mt-6 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-colors">
      Get Started
    </button>
  );
}

function SmartInvoiceFeature() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="flex-1 flex justify-center">
        <LastTransactionPreview />
      </div>

      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Invoice Management</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          Create professional invoices in seconds, send them instantly, and track payment status in real time—without manual follow-ups.
        </p>
        <div className="space-y-2">
          <CheckItem text="Saves up to 40% of admin time weekly" />
          <CheckItem text="Auto-fills data and follow-ups" />
          <CheckItem text="Eliminates manual entry errors" />
        </div>
        <GetStartedButton />
      </div>
    </div>
  );
}

function ClientManagementFeature() {
  return (
    <div className="flex flex-col md:flex-row-reverse items-center gap-10 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="flex-1 flex justify-center">
        <ClientListPreview />
      </div>

      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Centralized Client Management</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          Create professional invoices in seconds, send them instantly, and track payment status in real time—without manual follow-ups.
        </p>
        <div className="flex gap-8 mb-2">
          <StatBadge value="+42%" label="Faster Deal Closures" />
          <StatBadge value="99.9%" label="System Uptime" />
        </div>
        <GetStartedButton />
      </div>
    </div>
  );
}

function AnalyticsFeature() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="flex-1 flex justify-center">
        <AnalyticsPreview />
      </div>

      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Actionable Reports &amp; Analytics</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          Create professional invoices in seconds, send them instantly, and track payment status in real time—without manual follow.
        </p>
        <div className="space-y-2">
          <CheckItem text="Saves up to 40% of admin time weekly" />
          <CheckItem text="Auto-fills data and follow-ups" />
          <CheckItem text="Eliminates manual entry errors" />
        </div>
        <GetStartedButton />
      </div>
    </div>
  );
}

function SolutionSection() {
  return (
    <section className="bg-[#f4f5fb] py-20 px-4">

      {/* Header */}
      <div className="text-center mb-14 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 mb-5 shadow-sm">
          Business Solution
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          Everything your business <br /> needs in one place
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          All your tools, data, and workflows come together so you can run your business faster and smarter.
        </p>
      </div>

      {/* Feature rows */}
      <div className="max-w-5xl mx-auto space-y-6">
        <SmartInvoiceFeature />
        <ClientManagementFeature />
        <AnalyticsFeature />
      </div>

    </section>
  );
}

export default SolutionSection;