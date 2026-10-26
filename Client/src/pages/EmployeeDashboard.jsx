import React, { useEffect, useState } from "react";
import { CalendarDays, LogOut, Sparkles } from "lucide-react";
import Announcements from "@/components/employee/Announcements";
import LeaveApply from "@/components/employee/LeaveApply";
import LeaveList from "@/components/employee/LeaveList";
import Attendance from "@/components/employee/Attendance";
import { getMyLeaves } from "@/api/api";

const tabs = [
  { id: "announcements", label: "Overview" },
  { id: "leaves", label: "Time off" },
  { id: "attendance", label: "Attendance" },
  { id: "profile", label: "My profile" },
];

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  const [leaves, setLeaves] = useState([]);
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || { name: "there", email: "" };
    } catch {
      return { name: "there", email: "" };
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const fetchLeaves = async () => {
    try {
      const res = await getMyLeaves();
      setLeaves(res.data);
    } catch (err) {
      console.error("Failed to fetch leaves:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "leaves") fetchLeaves();
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "announcements":
        return <Announcements />;
      case "leaves":
        return (
          <div className="space-y-6">
            <LeaveApply onApplied={fetchLeaves} />
            <LeaveList leaves={leaves} />
          </div>
        );
      case "attendance":
        return <Attendance />;
      case "profile":
        return (
          <section className="profile-card">
            <div className="profile-avatar">{user.name?.charAt(0)?.toUpperCase() || "U"}</div>
            <div>
              <span className="eyebrow">YOUR ACCOUNT</span>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <span className="role-pill">Employee</span>
            </div>
          </section>
        );
      default:
        return null;
    }
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
          <span className="user-avatar">{user.name?.charAt(0)?.toUpperCase() || "U"}</span>
          <button className="button button-quiet logout-button" onClick={handleLogout}><LogOut size={16} /> Log out</button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="dashboard-welcome">
          <div>
            <span className="eyebrow">EMPLOYEE WORKSPACE</span>
            <h1>Good to see you, {user.name?.split(" ")[0] || "there"} <span>✦</span></h1>
            <p>Here&apos;s what&apos;s happening with your workday.</p>
          </div>
          <div className="welcome-date"><CalendarDays size={17} /><span>{new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</span></div>
        </section>

        <nav className="dashboard-tabs" aria-label="Employee sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`dashboard-tab ${activeTab === tab.id ? "active" : ""}`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <section className="dashboard-panel">{renderContent()}</section>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
