import React, { useState } from "react";

// Signup - Black Edition (Tailwind)
// Usage: drop this component in your React app. Tailwind CSS required for styling.

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate(values) {
    const errs = {};
    if (!values.name.trim()) errs.name = "Name is required";
    if (!values.email) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Enter a valid email";
    if (!values.password) errs.password = "Password is required";
    else if (values.password.length < 6) errs.password = "Password must be at least 6 characters";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setSubmitting(true);
    // simulate request
    await new Promise((r) => setTimeout(r, 700));

    // Normally you'd send `form` to your API here.
    console.log("Signup data:", form);

    setSubmitting(false);
    alert("Signup successful (demo) — check console for data");
    setForm({ name: "", email: "", password: "" });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 p-6">
      <div className="w-full max-w-md bg-[#0b0b0b] shadow-2xl rounded-2xl ring-1 ring-white/6 p-8">
        <header className="mb-6 text-center">
          <div className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold">AI</div>
            <div className="text-left">
              <h1 className="text-2xl font-semibold text-white">Chat Ai</h1>
              <p className="text-sm text-gray-300">Your AI buddy is just one signup away 🤖</p>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-xl border border-transparent bg-[#111111] px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? "ring-2 ring-red-600" : ""}`}
              placeholder="Your full name"
              autoComplete="name"
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-xl border border-transparent bg-[#111111] px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? "ring-2 ring-red-600" : ""}`}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className={`block w-full rounded-xl border border-transparent bg-[#111111] px-4 py-2 pr-12 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? "ring-2 ring-red-600" : ""}`}
                placeholder="Enter a strong password"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs bg-white/5 text-gray-200 hover:bg-white/8"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-white font-medium shadow-lg hover:opacity-95 disabled:opacity-60"
            >
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </div>

          <div className="text-center text-sm text-gray-400">
            By continuing, you agree to our <span className="text-indigo-300 underline">Terms</span> and <span className="text-indigo-300 underline">Privacy Policy</span>.
          </div>
        </form>

        <div className="mt-6 border-t border-white/6 pt-4 text-center">
          <p className="text-xs text-gray-400">Already have an account? <button className="text-indigo-300 underline">Sign in</button></p>
        </div>
      </div>
    </div>
  );
}
