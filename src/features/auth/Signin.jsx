import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Signin() {
  const [tab, setTab] = useState("signin");
  const [keepLogged, setKeepLogged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 relative shadow-xl border border-gray-100">

        {/* Close button */}
        <button className="absolute top-5 right-5 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        {/* Tab switcher */}
        <div className="inline-flex bg-gray-100 rounded-full p-1 mb-8">
          <Link
            to="/auth"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${pathname === "/auth" ? "bg-indigo-500 text-white shadow-sm" : "text-gray-400 hover:text-gray-700"
              }`}
          >
            Sign In
          </Link>

          <Link
            to="/auth/signup"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${pathname === "/auth/signup" ? "bg-indigo-500 text-white shadow-sm" : "text-gray-400 hover:text-gray-700"
              }`}
          >
            Sign up
          </Link>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
        <p className="text-sm text-gray-400 mb-6">Enter your email and password to sign in!</p>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">

          {/* Email */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 rounded-xl px-4 py-3 transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 rounded-xl px-4 py-3 transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0">
              <rect x="3" y="11" width="18" height="11" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition-colors">
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>

          {/* Keep logged + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={keepLogged}
                onChange={() => setKeepLogged(!keepLogged)}
                className="w-4 h-4 rounded border-gray-300 accent-indigo-500"
              />
              <span className="text-sm text-gray-500">Keep me logged in</span>
            </label>
            <a href="#" className="text-sm text-indigo-500 hover:underline">Forgot password?</a>
          </div>

          {/* Submit */}
          <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors mt-1">
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 tracking-wide">OR SIGN IN WITH</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="flex gap-3">
            <button type="button" className="flex-1 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-xl py-3.5 flex items-center justify-center transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </button>
            <button type="button" className="flex-1 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-xl py-3.5 flex items-center justify-center transition-colors">
              <svg viewBox="0 0 24 24" fill="black" className="w-5 h-5">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.36.74 3.18.8 1.2-.24 2.36-.93 3.63-.84 1.54.12 2.71.74 3.46 1.9-3.17 1.9-2.42 5.78.5 6.9-.57 1.57-1.33 3.12-2.77 4.12zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </button>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-400 text-center mt-1">
            Don't have an account?{" "}
            <a href="#" className="text-indigo-500 font-medium hover:underline">Sign Up</a>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Signin;