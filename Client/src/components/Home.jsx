import React from "react";
import { motion as Motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CalendarCheck2,
  Check,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <UsersRound size={20} />,
    title: "People, in sync",
    description: "Keep employee records, roles, and team details together.",
    tone: "violet",
  },
  {
    icon: <CalendarCheck2 size={20} />,
    title: "Time made simple",
    description: "Track attendance and manage leave without the back-and-forth.",
    tone: "blue",
  },
  {
    icon: <BriefcaseBusiness size={20} />,
    title: "Work that flows",
    description: "Give HR and managers the tools to keep everyday work moving.",
    tone: "amber",
  },
  {
    icon: <Award size={20} />,
    title: "Room to grow",
    description: "Share announcements and make learning part of the workday.",
    tone: "green",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="marketing-page">
      <header className="marketing-header">
        <button
          className="brand-lockup"
          type="button"
          onClick={() => navigate("/")}
          aria-label="StaffSync home"
        >
          <span className="brand-mark"><Sparkles size={18} /></span>
          <span>StaffSync</span>
        </button>
        <nav className="marketing-nav" aria-label="Main navigation">
          <a href="#features">Features</a>
          <button className="button button-quiet" onClick={() => navigate("/login")}>
            Sign in
          </button>
          <button className="button button-primary" onClick={() => navigate("/register")}>
            Get started <ArrowRight size={16} />
          </button>
        </nav>
      </header>

      <section className="marketing-hero">
        <div className="hero-copy">
          <div className="eyebrow"><span /> A happier way to work together</div>
          <Motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            Great teams run
            <span> better in sync.</span>
          </Motion.h1>
          <p>
            The people platform that brings your daily HR essentials into one
            clear, calm workspace.
          </p>
          <div className="hero-actions">
            <button className="button button-primary button-large" onClick={() => navigate("/register")}>
              Explore StaffSync <ArrowRight size={17} />
            </button>
            <button className="button button-outline button-large" onClick={() => navigate("/login")}>
              I already have an account
            </button>
          </div>
          <div className="hero-proof">
            <span className="proof-icon"><Check size={14} /></span>
            <span>Everything your team needs, nothing it doesn&apos;t.</span>
          </div>
        </div>

        <Motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          aria-label="StaffSync team dashboard preview"
        >
          <div className="preview-window">
            <div className="preview-topbar">
              <div className="preview-dots"><i /><i /><i /></div>
              <span>StaffSync workspace</span>
              <span className="preview-avatar">JS</span>
            </div>
            <div className="preview-body">
              <div className="preview-greeting">
                <div><span>MONDAY, OCTOBER 26</span><strong>Good morning, Jamie</strong></div>
                <span className="preview-add">+ Add update</span>
              </div>
              <div className="preview-stats">
                <div><span>Team members</span><strong>24</strong><small className="positive">↑ 2 this month</small></div>
                <div><span>Present today</span><strong>21</strong><small>87% of your team</small></div>
                <div><span>On leave</span><strong>3</strong><small>All caught up</small></div>
              </div>
              <div className="preview-lower">
                <div className="preview-panel">
                  <span className="preview-label">TEAM ACTIVITY</span>
                  <div className="activity-row"><span className="avatar avatar-violet">AC</span><div><b>Alex checked in</b><small>Product · just now</small></div><span className="activity-check"><Check size={13} /></span></div>
                  <div className="activity-row"><span className="avatar avatar-blue">MR</span><div><b>Morgan is in today</b><small>Design · 8:42 AM</small></div><span className="activity-check"><Check size={13} /></span></div>
                  <div className="activity-row"><span className="avatar avatar-amber">SK</span><div><b>Sam requested leave</b><small>Engineering · 9:10 AM</small></div><span className="activity-pending">Review</span></div>
                </div>
                <div className="preview-note">
                  <span className="note-sparkle"><Sparkles size={16} /></span>
                  <b>All on the same page</b>
                  <small>Announcements, updates, and team plans—right where you need them.</small>
                </div>
              </div>
            </div>
          </div>
          <div className="floating-note"><span className="floating-check"><Check size={15} /></span><span><b>Less busywork</b><small>More meaningful work</small></span></div>
        </Motion.div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <span className="eyebrow">MADE FOR YOUR WORKDAY</span>
          <h2>The essentials, all in one place.</h2>
          <p>Simple tools that help your people do their best work.</p>
        </div>
        <div className="feature-grid">
          {features.map((item, index) => (
            <Motion.article
              className="feature-card"
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <span className={`feature-icon ${item.tone}`}>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ArrowRight className="feature-arrow" size={17} />
            </Motion.article>
          ))}
        </div>
      </section>

      <footer className="marketing-footer">
        <span className="brand-lockup"><span className="brand-mark"><Sparkles size={15} /></span>StaffSync</span>
        <span>Thoughtful tools for people doing great work.</span>
        <span>© {new Date().getFullYear()} StaffSync</span>
      </footer>
    </main>
  );
};

export default Home;
