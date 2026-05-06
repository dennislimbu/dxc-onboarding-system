import { useEffect, useState } from "react";
import { CheckCircle2, Circle, ExternalLink, AlertTriangle } from "lucide-react";
import { completeTask, getTasksByUser } from "../services/taskService";
import { useAuth } from "../context/AuthContext";
import "./MyRoute.css";

function MyRoute() {
  const { user } = useAuth();
  const userId = user?.id;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadTasks();
    }
  }, [userId]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasksByUser(userId);
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (taskId) => {
    await completeTask(taskId);
    loadTasks();
  };

  const completedCount = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const progress =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="route-page">
      <div className="route-header">
        <div>
          <h1>My Route</h1>
          <p>Technical onboarding route assigned to {user?.name || "User"}.</p>
        </div>

        <div className="route-summary-card">
          <span>Overall Progress</span>
          <strong>{progress}%</strong>
        </div>
      </div>

      <div className="route-progress-bar">
        <div style={{ width: `${progress}%` }}></div>
      </div>

        {loading ? (
          <p className="loading-text">Loading onboarding tasks...</p>
        ) : (
        <div className="route-content">
          <section className="route-week card">
            <h2>Assigned Onboarding Tasks</h2>

            <div className="route-task-list">
              {tasks.length === 0 ? (
                <p className="empty-text">No tasks assigned yet.</p>
              ) : (
                tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onComplete={handleComplete}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function TaskRow({ task, onComplete }) {
  const isCompleted = task.status === "COMPLETED";
  const isOverdue =
    task.status !== "COMPLETED" &&
    task.dueDate &&
    new Date(task.dueDate) < new Date();

  return (
    <div className={`route-task ${isOverdue ? "overdue" : task.status.toLowerCase()}`}>
      <div className="task-left">
        {isCompleted ? <CheckCircle2 size={22} /> : <Circle size={22} />}

        <div>
          <h3>{task.title}</h3>
          <p>
            {task.type} · Due {task.dueDate || "Not set"}
          </p>
        </div>
      </div>

      <div className="task-right">
        {isOverdue && (
          <span className="overdue-warning">
            <AlertTriangle size={14} />
            Past due
          </span>
        )}

        <span className={`status-badge ${mapStatusClass(task.status, isOverdue)}`}>
          {formatStatus(task.status, isOverdue)}
        </span>

        <button className="resource-btn">
          <ExternalLink size={15} />
          Resource
        </button>

        {!isCompleted && (
          <button className="complete-btn" onClick={() => onComplete(task.id)}>
            Mark Complete
          </button>
        )}
      </div>
    </div>
  );
}

function mapStatusClass(status, isOverdue) {
  if (isOverdue) return "overdue";
  if (status === "OPEN") return "open";
  if (status === "IN_PROGRESS") return "progress";
  if (status === "COMPLETED") return "completed";
  return "open";
}

function formatStatus(status, isOverdue) {
  if (isOverdue) return "Overdue";
  if (status === "OPEN") return "Open";
  if (status === "IN_PROGRESS") return "In Progress";
  if (status === "COMPLETED") return "Completed";
  return status;
}

export default MyRoute;