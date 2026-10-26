import React, { useState } from "react";
import { CalendarDays, LogOut, Sparkles } from "lucide-react";
import AnnouncementsManager from "@/components/hr/AnnouncementsManager";
import AttendanceSummary from "@/components/hr/AttendanceSummary";
import EmployeeCRUD from "@/components/hr/EmployeeCRUD";
import LeaveApplications from "@/components/hr/LeaveApplications";

const tabs = [
  { id: "leaves", label: "Leave requests" },
  { id: "employees", label: "People" },
  { id: "announcements", label: "Announcements" },
  { id: "attendance", label: "Attendance" },
];

const HrDashboard = () => {
  const [activeTab, setActiveTab] = useState("leaves");
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  })();

  const renderContent = () => {
    switch (activeTab) {
      case "leaves": return <LeaveApplications />;
      case "employees": return <EmployeeCRUD />;
      case "announcements": return <AnnouncementsManager />;
      case "attendance": return <AttendanceSummary />;
      default: return null;
    }
  };

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
          <span className="user-avatar">{user.name?.charAt(0)?.toUpperCase() || "H"}</span>
          <button className="button button-quiet logout-button" onClick={handleLogout}><LogOut size={16} /> Log out</button>
        </div>
      </header>
      <main className="dashboard-content">
        <section className="dashboard-welcome">
          <div>
            <span className="eyebrow">HR WORKSPACE</span>
            <h1>Your people, in good hands.</h1>
            <p>Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}. Here&apos;s your team at a glance.</p>
          </div>
          <div className="welcome-date"><CalendarDays size={17} /><span>{new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</span></div>
        </section>
        <nav className="dashboard-tabs" aria-label="HR sections">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`dashboard-tab ${activeTab === tab.id ? "active" : ""}`} aria-current={activeTab === tab.id ? "page" : undefined}>
              {tab.label}
            </button>
          ))}
        </nav>
        <section className="dashboard-panel">{renderContent()}</section>
      </main>
    </div>
  );
};

export default HrDashboard;
