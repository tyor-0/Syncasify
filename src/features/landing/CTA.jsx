import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function CtaBanner() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div
        className="rounded-3xl px-6 md:px-12 py-14 text-center relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 70% 50%, #4c1d95 0%, #1e1b4b 50%, #0f0e1a 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-3">
            Run Your Business from <br className="hidden sm:block" /> One Dashboard
          </h2>
          <p className="text-sm text-indigo-200 leading-relaxed mb-8 max-w-md mx-auto">
            Everything you need to know before getting started — clear answers, no confusion.
          </p>

          <button
            className="bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 shadow-sm"
            onClick={() => navigate("/auth")}>
            Get Started
          </button>

        </div>
      </div>
    </div>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-gray-900 mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white pt-16 pb-6 px-4 relative overflow-hidden">

      {/* Footer content */}
      <div className="max-w-5xl mx-auto relative z-10 mb-12">

        {/* Stack on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-12">

          {/* Brand */}
          <div className="md:w-56 md:flex-shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm opacity-90" />
              </div>
              <span className="text-lg font-extrabold text-gray-900">Bizvance</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-5">
              Everything you need to manage your business — clear, simple, powerful.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: "X", path: "M4 4l16 16M20 4L4 20" },
                { label: "F", path: "M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z" },
                { label: "I", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M6.5 6.5A9.5 9.5 0 1017.5 17.5 9.5 9.5 0 006.5 6.5z" },
                { label: "in", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
              ].map((icon) => (
                <a
                  key={icon.label}
                  href="#"
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-indigo-400 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-gray-500">
                    <path d={icon.path} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns — stack on mobile, row on desktop */}
          <div className="grid grid-cols-2 md:flex md:flex-1 md:justify-between gap-8">
            <FooterColumn
              title="Navigation"
              links={["Home", "Features", "Process", "Pricing", "Testimonials"]}
            />
            <FooterColumn
              title="Utility Pages"
              links={["Sign Up", "Sign In", "License", "404", "Password"]}
            />
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-sm font-bold text-gray-900 mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-indigo-400 flex-shrink-0">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.5 1.18 2 2 0 012.49-.5h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7a16 16 0 006.29 6.29l1.67-1.74a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-gray-500">+1 (415) 555-0198</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-indigo-400 flex-shrink-0">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-gray-500">support@bizvance.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-indigo-400 flex-shrink-0">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-gray-500">United States</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark — hidden on small screens */}
      <div className="hidden md:flex absolute bottom-10 left-0 right-0 justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="text-[120px] font-extrabold text-indigo-100 leading-none whitespace-nowrap"
          style={{ letterSpacing: "-2px" }}
        >
          Bizvance
        </span>
      </div>

      {/* Bottom bar */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 pt-6 border-t border-gray-100 relative z-10">
        <span className="text-xs text-gray-400">© All Copyrights reserved at Bizvance</span>
        <span className="text-xs text-gray-400">
          Design by <a href="#" className="text-indigo-500 hover:underline">Seative Digital</a>
        </span>
      </div>
    </footer>
  );
}

function CTA() {
  return (
    <div className="bg-white pt-16 md:pt-20">
      <CtaBanner />
      <Footer />
    </div>
  );
}

export default CTA;
