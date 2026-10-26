import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Register = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Employee" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/register`, form);
      navigate("/login");
      setIsLogin?.(true);
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Registration failed. Please try again.");
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
          <span className="eyebrow">MAKE WORK FEEL A LITTLE BETTER</span>
          <h1>Bring your people and your work together.</h1>
          <p>Get your team started with a calmer, more connected way to manage the workday.</p>
          <div className="auth-quote">
            <span className="quote-mark">“</span>
            <p>Great teams aren&apos;t built by tools. They&apos;re enabled by the right ones.</p>
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
          <span className="eyebrow">GET STARTED</span>
          <h2>Create your account</h2>
          <p className="auth-subtitle">A few details and you&apos;re ready to go.</p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} autoComplete="name" required />
            <label htmlFor="email">Work email</label>
            <input id="email" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} autoComplete="email" required />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Create a password" value={form.password} onChange={handleChange} autoComplete="new-password" required />
            <label htmlFor="role">Your role</label>
            <select id="role" name="role" value={form.role} onChange={handleChange}>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="HR">HR</option>
            </select>
            <button type="submit" className="button button-primary auth-submit" disabled={loading}>
              {loading ? "Creating account..." : <>Create account <ArrowRight size={17} /></>}
            </button>
          </form>
          <p className="auth-switch">Already have an account? <button type="button" onClick={() => navigate("/login")}>Sign in</button></p>
        </div>
        <p className="auth-legal">By continuing, you agree to use StaffSync responsibly.</p>
      </section>
    </main>
  );
};

export default Register;
