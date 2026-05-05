import { CheckCircle2, Circle, ExternalLink, AlertTriangle } from "lucide-react";
import "./MyRoute.css";

function MyRoute() {
  const weeks = [
    {
      title: "Week 1: Team and Environment Setup",
      tasks: [
        {
          title: "Business Process Overview",
          status: "open",
          dueDate: "10 May 2026",
          type: "Document",
        },
        {
          title: "Access Request",
          status: "completed",
          dueDate: "10 May 2026",
          type: "Form",
        },
        {
          title: "Work Local Environment",
          status: "progress",
          dueDate: "12 May 2026",
          type: "Guide",
        },
        {
          title: "Security Training",
          status: "overdue",
          dueDate: "08 May 2026",
          type: "Training",
        },
      ],
    },
    {
      title: "Week 2: Role-Specific Induction",
      tasks: [
        {
          title: "GitHub Setup",
          status: "open",
          dueDate: "17 May 2026",
          type: "Software",
        },
        {
          title: "Best Practices",
          status: "completed",
          dueDate: "18 May 2026",
          type: "Document",
        },
        {
          title: "Training Module 1",
          status: "progress",
          dueDate: "20 May 2026",
          type: "Video",
        },
      ],
    },
  ];

  return (
    <div className="route-page">
      <div className="route-header">
        <div>
          <h1>My Route</h1>
          <p>Technical onboarding route assigned to Sam Smith.</p>
        </div>

        <div className="route-summary-card">
          <span>Overall Progress</span>
          <strong>65%</strong>
        </div>
      </div>

      <div className="route-progress-bar">
        <div style={{ width: "65%" }}></div>
      </div>

      <div className="route-content">
        {weeks.map((week) => (
          <section className="route-week card" key={week.title}>
            <h2>{week.title}</h2>

            <div className="route-task-list">
              {week.tasks.map((task) => (
                <TaskRow key={task.title} task={task} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function TaskRow({ task }) {
  const isCompleted = task.status === "completed";
  const isOverdue = task.status === "overdue";

  return (
    <div className={`route-task ${task.status}`}>
      <div className="task-left">
        {isCompleted ? (
          <CheckCircle2 size={22} />
        ) : (
          <Circle size={22} />
        )}

        <div>
          <h3>{task.title}</h3>
          <p>
            {task.type} · Due {task.dueDate}
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

        <span className={`status-badge ${task.status}`}>
          {formatStatus(task.status)}
        </span>

        <button className="resource-btn">
          <ExternalLink size={15} />
          Resource
        </button>
      </div>
    </div>
  );
}

function formatStatus(status) {
  if (status === "open") return "Open";
  if (status === "progress") return "In Progress";
  if (status === "completed") return "Completed";
  if (status === "overdue") return "Overdue";
  return status;
}

export default MyRoute;