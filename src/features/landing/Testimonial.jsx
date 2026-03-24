import React from 'react'

const testimonials = [
  {
    name: "Liam Patel",
    company: "ScaleWise",
    avatarBg: "bg-gray-300",
    iconColor: "bg-gray-900",
    icon: "+",
    title: "Zero Setup Time",
    body: "Bizvance simplified everything for my business. Invoices and clients are now in one place.",
    featured: false,
  },
  {
    name: "Sarah Kim",
    company: "Beew Studio",
    avatarBg: "bg-pink-300",
    iconColor: "bg-green-500",
    icon: "↗",
    title: "Team Productivity Win",
    body: "Our team saves hours every day. Agents helped us automate tasks we didn't even know we could. No devs needed at all.",
    featured: true,
  },
  {
    name: "Cagatayhan",
    company: "Beew Studio",
    avatarBg: "bg-orange-300",
    iconColor: "bg-yellow-400",
    icon: "↓",
    title: "Boosted Workflow",
    body: "Bizvance gives us full control over our finances and clients. Clean dashboard, powerful features.",
    featured: true,
  },
  {
    name: "David Chen",
    company: "Optiq Systems",
    avatarBg: "bg-blue-300",
    iconColor: "bg-gray-200",
    icon: "○",
    title: "Massive Time Saver",
    body: "Clean dashboard, powerful features, very easy to use.",
    featured: false,
  },
  {
    name: "Cagatayhan",
    company: "Beew Studio",
    avatarBg: "bg-orange-300",
    iconColor: "bg-yellow-400",
    icon: "↓",
    title: "Boosted Workflow",
    body: "Agents helped us automate tasks we didn't even know we could. Clean dashboard, powerful.",
    featured: false,
  },
  {
    name: "Sarah Kim",
    company: "Beew Studio",
    avatarBg: "bg-pink-300",
    iconColor: "bg-green-500",
    icon: "↗",
    title: "Team Productivity Win",
    body: "Our team saves hours every day. No devs needed at all.",
    featured: true,
  },
  {
    name: "Liam Patel",
    company: "ScaleWise",
    avatarBg: "bg-gray-300",
    iconColor: "bg-gray-900",
    icon: "+",
    title: "Zero Setup Time",
    body: "Bizvance gives us full control over our finances and clients.",
    featured: true,
  },
  {
    name: "Sarah Kim",
    company: "Beew Studio",
    avatarBg: "bg-pink-300",
    iconColor: "bg-gray-200",
    icon: "○",
    title: "Team Productivity Win",
    body: "Our team saves hours every day. Agents helped us automate tasks we didn't even know we could.",
    featured: false,
  },
];

function TestimonialCard({ testimonial }) {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3 mb-4 ${testimonial.featured ? "opacity-100" : "opacity-60"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${testimonial.avatarBg} flex-shrink-0`} />
          <div>
            <div className="text-xs font-bold text-gray-900">{testimonial.name}</div>
            <div className="text-[10px] text-gray-400">{testimonial.company}</div>
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full ${testimonial.iconColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
          {testimonial.icon}
        </div>
      </div>
      <div>
        <div className="text-sm font-bold text-gray-900 mb-1">{testimonial.title}</div>
        <p className="text-xs text-gray-400 leading-relaxed">{testimonial.body}</p>
      </div>
    </div>
  );
}

function Testimonial() {
  const col1 = [testimonials[0], testimonials[4]];
  const col2 = [testimonials[1], testimonials[5]];
  const col3 = [testimonials[2], testimonials[6]];
  const col4 = [testimonials[3], testimonials[7]];

  return (
    <section className="bg-white py-16 px-4 overflow-hidden">
      <div className="text-center mb-14 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 mb-5 shadow-sm">
          LOVED BY 200+ TEAMS WORLDWIDE
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          Trusted by growing <br /> businesses worldwide
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          All your tools, data, and workflows come together so you can run your business faster and smarter.
        </p>
      </div>

      {/* 1 col on mobile, 2 col on sm, 4 col on md+ */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-start">
        <div className="flex flex-col md:mt-10">
          {col1.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
        </div>
        <div className="flex flex-col">
          {col2.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
        </div>
        <div className="flex flex-col md:mt-6">
          {col3.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
        </div>
        <div className="flex flex-col">
          {col4.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
