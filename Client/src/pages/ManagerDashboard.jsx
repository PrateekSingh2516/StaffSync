import React, { useState } from "react";
import { CalendarDays, LogOut, Sparkles } from "lucide-react";
import LeaveApplications from "@/components/manager/LeaveApplications";
import TrainingManagement from "@/components/manager/TrainingManagement";

const tabs = [
  { id: "leave", label: "Leave requests" },
  { id: "training", label: "Learning & development" },
];

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("leave");
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-topbar">
        <a className="dashboard-brand" href="/">
          <span className="brand-mark"><Sparkles size={17} /></span>
          <span>StaffSync <small>PEOPLE WORKSPACE</small></span>
        </a>
        <div className="topbar-actions">
          <span className="today-label"><CalendarDays size={16} /> {new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</span>
          <span className="user-avatar">{user.name?.charAt(0)?.toUpperCase() || "M"}</span>
          <button className="button button-quiet logout-button" onClick={handleLogout}><LogOut size={16} /> Log out</button>
        </div>
      </header>
      <main className="dashboard-content">
        <section className="dashboard-welcome">
          <div>
            <span className="eyebrow">MANAGER WORKSPACE</span>
            <h1>Lead your team forward.</h1>
            <p>Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}. Keep your team moving and growing.</p>
          </div>
          <div className="welcome-date"><CalendarDays size={17} /><span>{new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</span></div>
        </section>
        <nav className="dashboard-tabs" aria-label="Manager sections">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`dashboard-tab ${activeTab === tab.id ? "active" : ""}`} aria-current={activeTab === tab.id ? "page" : undefined}>
              {tab.label}
            </button>
          ))}
        </nav>
        <section className="dashboard-panel">
          {activeTab === "leave" ? <LeaveApplications /> : <TrainingManagement />}
        </section>
      </main>
    </div>
  );
};

export default ManagerDashboard;
