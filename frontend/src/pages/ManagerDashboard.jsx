import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  UserCircle,
} from "lucide-react";
import "./ManagerDashboard.css";

function ManagerDashboard() {
  const employees = [
    {
      name: "Sam Smith",
      role: "Technical Analyst",
      progress: 65,
      completed: 8,
      inProgress: 3,
      open: 4,
      overdue: 1,
      status: "behind",
    },
    {
      name: "Priya Patel",
      role: "Business Analyst",
      progress: 85,
      completed: 11,
      inProgress: 2,
      open: 1,
      overdue: 0,
      status: "on-track",
    },
    {
      name: "James Carter",
      role: "Project Manager",
      progress: 35,
      completed: 4,
      inProgress: 2,
      open: 6,
      overdue: 3,
      status: "at-risk",
    },
  ];

  return (
    <div className="manager-page">
      <div className="manager-header">
        <div>
          <h1>Manager Dashboard</h1>
          <p>Track onboarding progress across your team.</p>
        </div>
      </div>

      <section className="manager-summary-grid">
        <SummaryCard title="Total New Starters" value="3" />
        <SummaryCard title="On Track" value="1" />
        <SummaryCard title="Behind" value="1" />
        <SummaryCard title="At Risk" value="1" warning />
      </section>

      <section className="employee-grid">
        {employees.map((employee) => (
          <EmployeeCard key={employee.name} employee={employee} />
        ))}
      </section>
    </div>
  );
}

function SummaryCard({ title, value, warning }) {
  return (
    <div className={`summary-card card ${warning ? "warning" : ""}`}>
      <p>{title}</p>
      <strong>{value}</strong>
    </div>
  );
}

function EmployeeCard({ employee }) {
  return (
    <div className={`employee-card card ${employee.status}`}>
      <div className="employee-top">
        <div className="employee-profile">
          <div className="employee-avatar">
            <UserCircle size={34} />
          </div>

          <div>
            <h2>{employee.name}</h2>
            <p>{employee.role}</p>
          </div>
        </div>

        {employee.overdue > 0 ? (
          <span className="risk-pill overdue">
            <AlertTriangle size={14} />
            {employee.overdue} overdue
          </span>
        ) : (
          <span className="risk-pill ok">
            <CheckCircle2 size={14} />
            On track
          </span>
        )}
      </div>

      <div className="employee-progress">
        <div className="progress-label">
          <span>Progress</span>
          <strong>{employee.progress}%</strong>
        </div>

        <div className="progress-bar">
          <div style={{ width: `${employee.progress}%` }}></div>
        </div>
      </div>

      <div className="employee-stats">
        <StatItem label="Completed" value={employee.completed} type="complete" />
        <StatItem label="In Progress" value={employee.inProgress} type="progress" />
        <StatItem label="Open" value={employee.open} type="open" />
        <StatItem label="Past Due" value={employee.overdue} type="overdue" />
      </div>

      <button className="view-details-btn">
        <Eye size={16} />
        View Details
      </button>
    </div>
  );
}

function StatItem({ label, value, type }) {
  return (
    <div className={`stat-item ${type}`}>
      <Clock size={15} />
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

export default ManagerDashboard;