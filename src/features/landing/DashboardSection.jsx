import React from 'react'

function Sidebar() {
  const navItems = [
    { label: "Dashboard", icon: "⊞", active: true },
    { label: "Invoices", icon: "📄" },
    { label: "Expenses", icon: "💳" },
    { label: "Clients", icon: "👤" },
    { label: "Reports", icon: "📊" },
    { label: "Team", icon: "👥" },
    { label: "Settings", icon: "⚙️" },
    { label: "Support", icon: "❓" },
  ];

  return (
    <div className="w-36 flex-shrink-0 bg-gradient-to-b from-indigo-700 to-indigo-900 rounded-l-2xl flex flex-col py-4 px-3">
      {/* Logo */}
      <div className="flex items-center gap-1.5 mb-6 px-1">
        <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-indigo-600 rounded-sm" />
        </div>
        <span className="text-white text-sm font-bold tracking-tight">Bizvance</span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer ${
              item.active ? "bg-white/20 text-white" : "text-indigo-200 hover:bg-white/10"
            }`}
          >
            <span className="text-[11px]">{item.icon}</span>
            <span className="text-[11px] font-medium">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}

function StatCard({ icon, iconBg, label, value, valueColor }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-3 flex-1">
      <div className={`w-7 h-7 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <span className="text-sm">{icon}</span>
      </div>
      <div>
        <div className="text-[10px] text-gray-400">{label}</div>
        <div className={`text-sm font-bold ${valueColor}`}>{value}</div>
      </div>
    </div>
  );
}

function IncomeExpenseChart() {
  // Simple SVG line chart
  const incomePoints = "30,70 70,55 110,65 150,35 190,45 230,30 270,20";
  const expensePoints = "30,80 70,75 110,80 150,70 190,75 230,65 270,55";

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold text-gray-800">Income vs Expense</span>
        <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1">
          <span className="text-[10px] text-gray-500">Last 6 Months</span>
          <span className="text-gray-400 text-[10px]">▾</span>
        </div>
      </div>

      <svg viewBox="0 0 300 110" className="w-full h-24">
        <defs>
          <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y axis labels */}
        {[["$15k", 18], ["$10k", 43], ["$5k", 68], ["$k", 93]].map(([label, y]) => (
          <text key={label} x="2" y={y} fontSize="7" fill="#9ca3af">{label}</text>
        ))}

        {/* Grid lines */}
        {[20, 45, 70, 95].map((y) => (
          <line key={y} x1="28" y1={y} x2="295" y2={y} stroke="#f3f4f6" strokeWidth="1" />
        ))}

        {/* Income area */}
        <polygon
          points={`30,110 ${incomePoints} 270,110`}
          fill="url(#incomeGrad)"
        />
        {/* Expense area */}
        <polygon
          points={`30,110 ${expensePoints} 270,110`}
          fill="url(#expenseGrad)"
        />

        {/* Income line */}
        <polyline
          points={incomePoints}
          fill="none"
          stroke="#6366f1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Expense line */}
        <polyline
          points={expensePoints}
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="none"
        />

        {/* Dots on income */}
        {incomePoints.split(" ").map((pt, i) => {
          const [x, y] = pt.split(",");
          return <circle key={i} cx={x} cy={y} r="2.5" fill="#6366f1" />;
        })}
        {/* Dots on expense */}
        {expensePoints.split(" ").map((pt, i) => {
          const [x, y] = pt.split(",");
          return <circle key={i} cx={x} cy={y} r="2.5" fill="#22c55e" />;
        })}

        {/* X axis labels */}
        {[["Jan", 30], ["Feb", 70], ["Mar", 110], ["Apr", 150], ["May", 190], ["Jun", 230], ["Jun", 270]].map(([label, x]) => (
          <text key={x} x={x} y="108" fontSize="7" fill="#9ca3af" textAnchor="middle">{label}</text>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex gap-4 mt-1">
        <div className="flex items-center gap-1">
          <div className="w-3 h-1.5 bg-indigo-500 rounded" />
          <span className="text-[9px] text-gray-400">Income</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-1.5 bg-indigo-200 rounded" />
          <span className="text-[9px] text-gray-400">Expense</span>
        </div>
      </div>
    </div>
  );
}

function RecentExpenses() {
  const expenses = [
    { label: "Office Supplies",      amount: "$300" },
    { label: "Software Subscription", amount: "$120" },
    { label: "Travel Expenses",       amount: "$450" },
    { label: "Advertising",           amount: "$600" },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 w-44 flex-shrink-0">
      <div className="text-xs font-semibold text-gray-800 mb-3">Recent Expenses</div>

      <div className="space-y-2.5">
        {expenses.map((e) => (
          <div key={e.label} className="flex justify-between items-center">
            <span className="text-[10px] text-gray-500">{e.label}</span>
            <span className="text-[10px] font-bold text-gray-800">{e.amount}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 text-right">
        <span className="text-[10px] text-indigo-500 cursor-pointer">View All &rsaquo;</span>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="flex w-full rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-gray-50" style={{ maxWidth: "720px" }}>
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-50 p-4 flex flex-col gap-3 min-w-0">

        {/* Top bar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <span className="text-xs text-gray-500 font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-[10px]">⚙</div>
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-[10px]">🔔</div>
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-300 to-indigo-500 rounded-full" />
          </div>
        </div>

        {/* Welcome */}
        <div className="text-sm font-bold text-gray-900">Welcome back, Sarah!</div>

        {/* Stat cards */}
        <div className="flex gap-2">
          <StatCard icon="✅" iconBg="bg-green-100"  label="Total Income"     value="$15,200" valueColor="text-gray-900" />
          <StatCard icon="🟠" iconBg="bg-orange-100" label="Total Expenses"   value="$5,780"  valueColor="text-orange-500" />
          <StatCard icon="⭐" iconBg="bg-yellow-100" label="Pending Invoices" value="$3,250"  valueColor="text-gray-900" />
        </div>

        {/* Chart + recent expenses */}
        <div className="flex gap-3">
          <IncomeExpenseChart />
          <RecentExpenses />
        </div>

      </div>
    </div>
  );
}

function DashboardSection() {
  return (
    <section className="bg-[#f4f5fb] py-20 px-4 flex justify-center">
      <DashboardPreview />
    </section>
  );
}

export default DashboardSection;