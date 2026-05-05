import "./Dashboard.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const tasks = {
    open: ["Business Process", "Training Module 1", "Software Setup"],
    progress: ["Work Local Environment"],
    completed: ["Access Request", "Best Practices"],
    deadlines: ["GitHub Setup"],
    overdue: ["Security Training"],
  };

  return (
    <div className="dashboard">
      <section className="welcome-card card">
        <h2>
          Welcome <span className="profile-link">Sam Smith</span>
        </h2>
        <p>Your Technical onboarding is 65% complete.</p>
      </section>

      <section className="summary-grid">
        <section className="summary-grid">
        <div className="card chart-card">

            <ResponsiveContainer width="100%" height={220}>
            <PieChart>
                <Pie
                data={[
                    { name: "Open", value: 50, color: "#4A95FF" },
                    { name: "In Progress", value: 20, color: "#F2B765" },
                    { name: "Completed", value: 15, color: "#7ED67E" },
                    { name: "Overdue", value: 15, color: "#D94F04" }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                >
                {[
                    "#4A95FF",
                    "#F2B765",
                    "#7ED67E",
                    "#D94F04"
                ].map((color, index) => (
                    <Cell key={index} fill={color} />
                ))}
                </Pie>

                <Tooltip
                contentStyle={{
                    background: "#0E102C",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "13px"
                }}
                />
            </PieChart>
            </ResponsiveContainer>

            <p>65% complete</p>
        </div>
    </section>

        <div className="card overview-card">
          <h3>Onboarding Overview</h3>
          <p>Continue your assigned route and review overdue items first.</p>
        </div>
      </section>

      <section className="task-board">
        <TaskColumn title="Open" items={tasks.open} status="open" />
        <TaskColumn title="In Progress" items={tasks.progress} status="progress" />
        <TaskColumn title="Completed" items={tasks.completed} status="complete" />
        <TaskColumn title="Deadlines" items={tasks.deadlines} status="progress" />
        <TaskColumn title="Overdue" items={tasks.overdue} status="overdue" />
      </section>
    </div>
  );
}

function TaskColumn({ title, items, status }) {
  return (
    <div className="task-column card">
      <h3>{title}</h3>
      <div className="task-list">
        {items.map((item) => (
          <button key={item} className={`task-pill status-${status}`}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;