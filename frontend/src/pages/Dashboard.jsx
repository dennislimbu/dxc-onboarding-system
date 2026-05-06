import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTasksByUser } from "../services/taskService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      const data = await getTasksByUser(user.id);
      setTasks(data);
    } catch (error) {
      console.error("Failed to load dashboard tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const openTasks = tasks.filter((task) => task.status === "OPEN");
  const progressTasks = tasks.filter((task) => task.status === "IN_PROGRESS");
  const completedTasks = tasks.filter((task) => task.status === "COMPLETED");

  const overdueTasks = tasks.filter(
    (task) =>
      task.status !== "COMPLETED" &&
      task.dueDate &&
      new Date(task.dueDate) < new Date()
  );

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks.length / tasks.length) * 100);

  const chartData = [
    { name: "Open", value: openTasks.length, color: "#4A95FF" },
    { name: "In Progress", value: progressTasks.length, color: "#F2B765" },
    { name: "Completed", value: completedTasks.length, color: "#7ED67E" },
    { name: "Overdue", value: overdueTasks.length, color: "#D94F04" },
  ];

  return (
    <div className="dashboard">
      <section className="welcome-card card">
        <h2>
          Welcome <span className="profile-link">{user?.name || "User"}</span>
        </h2>
        <p>Your onboarding is {completionRate}% complete.</p>
      </section>

      {loading ? (
        <p className="loading-text">Loading dashboard...</p>
      ) : (
        <>
          <section className="summary-grid">
            <div className="card chart-card">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background: "#0E102C",
                      border: "none",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "13px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <p>{completionRate}% complete</p>
            </div>

            <div className="card overview-card">
              <h3>Onboarding Overview</h3>
              <p>
                You have {openTasks.length} open, {progressTasks.length} in
                progress, {completedTasks.length} completed and{" "}
                {overdueTasks.length} overdue tasks.
              </p>
            </div>
          </section>

          <section className="task-board">
            <TaskColumn title="Open" items={openTasks} status="open" />
            <TaskColumn title="In Progress" items={progressTasks} status="progress" />
            <TaskColumn title="Completed" items={completedTasks} status="complete" />
            <TaskColumn title="Deadlines" items={tasks} status="progress" deadline />
            <TaskColumn title="Overdue" items={overdueTasks} status="overdue" />
          </section>
        </>
      )}
    </div>
  );
}

function TaskColumn({ title, items, status, deadline }) {
  return (
    <div className="task-column card">
      <h3>{title}</h3>

      <div className="task-list">
        {items.length === 0 ? (
          <p className="empty-text">No tasks</p>
        ) : (
          items.map((task) => (
            <button key={task.id} className={`task-pill status-${status}`}>
              {deadline ? `${task.title} · ${task.dueDate}` : task.title}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;