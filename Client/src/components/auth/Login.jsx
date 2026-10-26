import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const role = res.data.user?.role;
      if (role === "Employee") navigate("/employee");
      else if (role === "HR") navigate("/hr");
      else if (role === "Manager") navigate("/manager");
      else navigate("/");
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-story">
        <button className="brand-lockup auth-brand" type="button" onClick={() => navigate("/")}>
          <span className="brand-mark"><Sparkles size={18} /></span><span>StaffSync</span>
        </button>
        <div className="auth-story-copy">
          <span className="eyebrow">A BETTER WORKDAY STARTS HERE</span>
          <h1>Good work happens when people feel in sync.</h1>
          <p>Your team&apos;s day-to-day, thoughtfully brought together in one place.</p>
          <div className="auth-quote">
            <span className="quote-mark">“</span>
            <p>Less time managing the busywork. More time doing work that matters.</p>
            <span className="quote-caption">THE STAFFSYNC WAY</span>
          </div>
        </div>
        <span className="auth-story-footer">People first. Always.</span>
      </section>
      <section className="auth-form-side">
        <button className="back-link" type="button" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to home
        </button>
        <div className="auth-form-wrap">
          <span className="eyebrow">WELCOME BACK</span>
          <h2>Sign in to your workspace</h2>
          <p className="auth-subtitle">Enter your details to pick up where you left off.</p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} autoComplete="email" required />
            <div className="password-label">
              <label htmlFor="password">Password</label>
            </div>
            <input id="password" name="password" type="password" placeholder="Enter your password" value={form.password} onChange={handleChange} autoComplete="current-password" required />
            <button type="submit" className="button button-primary auth-submit" disabled={loading}>
              {loading ? "Signing in..." : <>Sign in <ArrowRight size={17} /></>}
            </button>
          </form>
          <p className="auth-switch">New to StaffSync? <button type="button" onClick={() => navigate("/register")}>Create an account</button></p>
        </div>
        <p className="auth-legal">By continuing, you agree to use StaffSync responsibly.</p>
      </section>
    </main>
  );
};

export default Login;
