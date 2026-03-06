function ToolsCard() {
  const tools = [
    { name: "Microsoft Excel", letter: "X", letterBg: "#217346", barColor: "#6366f1" },
    { name: "Microsoft Word", letter: "W", letterBg: "#2b579a", barColor: "#8b5cf6" },
    { name: "Google", letter: "G", letterBg: "#ea4335", barColor: "#ef4444" },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mt-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold text-gray-700">Tools uses</span>
        <span className="text-xs text-gray-400">Monthly ▾</span>
      </div>

      <div className="space-y-2.5">
        {tools.map((tool) => (
          <div key={tool.name} className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
              style={{ backgroundColor: tool.letterBg }}
            >
              {tool.letter}
            </div>
            <span className="text-xs text-gray-600 w-28 truncate">{tool.name}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: "80%", backgroundColor: tool.barColor }}
              />
            </div>
            <span className="text-xs text-gray-400">80%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentsCard() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-gray-700">Payments Due</span>
        <span className="text-xs text-gray-400">Monthly ▾</span>
      </div>

      <svg viewBox="0 0 200 60" className="w-full h-14 mb-2">
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,45 C20,40 30,15 50,20 C70,25 80,50 100,35 C120,20 130,10 150,18 C170,26 180,45 200,30"
          fill="none"
          stroke="#f97316"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M0,45 C20,40 30,15 50,20 C70,25 80,50 100,35 C120,20 130,10 150,18 C170,26 180,45 200,30 L200,60 L0,60 Z"
          fill="url(#waveGrad)"
        />
      </svg>

      <div className="flex justify-between">
        <div className="text-center">
          <div className="text-sm font-bold text-gray-800">63,876</div>
          <div className="text-[10px] text-gray-400">Total Income</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-orange-500">$872,335</div>
          <div className="text-[10px] text-gray-400">Expense</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-gray-800">21,224</div>
          <div className="text-[10px] text-gray-400">Payment Due</div>
        </div>
      </div>
    </div>
  );
}

function BusinessOverviewCard() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mt-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold text-gray-700">Business Overview</span>
        <span className="text-xs text-gray-400">Monthly ▾</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-20 h-12 flex-shrink-0">
          <svg viewBox="0 0 80 45" className="w-full">
            <path d="M8,40 A32,32 0 0,1 72,40" fill="none" stroke="#e5e7eb" strokeWidth="8" strokeLinecap="round" />
            <path d="M8,40 A32,32 0 0,1 40,8"  fill="none" stroke="#6366f1" strokeWidth="8" strokeLinecap="round" />
            <path d="M40,8 A32,32 0 0,1 64,24"  fill="none" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" />
            <path d="M64,24 A32,32 0 0,1 72,40" fill="none" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />
          </svg>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] text-gray-400 whitespace-nowrap">
            Business Report
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-[10px] text-gray-600">Total: 1500</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[10px] text-gray-600">Due: 500</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[10px] text-gray-600">Active: 500</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProblemCard({ iconBg, icon, title, description, children }) {
  return (
    <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 flex flex-col">
      <div className={`w-11 h-11 rounded-2xl ${iconBg} flex items-center justify-center mb-5`}>
        {icon}
      </div>
      <h3 className="text-base font-bold text-gray-900 leading-snug mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      {children}
    </div>
  );
}

function ProblemSection() {
  return (
    <section className="bg-[#f4f5fb] py-20 px-4">
      {/* Header */}
      <div className="text-center mb-14 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 mb-6 shadow-sm">
          Business Challenges
        </div>

        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          Running a business shouldn't <br /> be this complicated
        </h2>

        <p className="text-gray-400 text-sm leading-relaxed">
          Too many tools, too much chaos. One smart dashboard that helps you stay organized, efficient, and in control.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        <ProblemCard
          iconBg="bg-indigo-500"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 9h18M8 4v5M16 4v5" />
            </svg>
          }
          title="Multiple tools for invoices, clients, and finance"
          description="Switching between tools wastes time and breaks your workflow."
        >
          <ToolsCard />
        </ProblemCard>

        <ProblemCard
          iconBg="bg-orange-500"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
          }
          title="Missed payments & delayed follow-ups"
          description="Manual tracking leads to forgotten invoices and late payments."
        >
          <PaymentsCard />
        </ProblemCard>

        <ProblemCard
          iconBg="bg-cyan-500"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="13" width="5" height="8" rx="1" />
              <rect x="9" y="9" width="5" height="12" rx="1" />
              <rect x="16" y="5" width="5" height="16" rx="1" />
            </svg>
          }
          title="No clear overview of your business health"
          description="Key insights are scattered, making smart decisions far harder."
        >
          <BusinessOverviewCard />
        </ProblemCard>

      </div>
    </section>
  );
}

export default ProblemSection;