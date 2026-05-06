import { CheckCircle2, Clock, Edit, PlusCircle, UserCheck } from "lucide-react";
import "./History.css";

function History() {
  const historyItems = [
    {
      icon: CheckCircle2,
      title: "Task completed",
      description: "Complete Security Training was marked as completed.",
      date: "Today",
    },
    {
      icon: PlusCircle,
      title: "Task assigned",
      description: "Install Development Environment was added to onboarding route.",
      date: "Yesterday",
    },
    {
      icon: Edit,
      title: "Profile updated",
      description: "Employee department and role details were updated.",
      date: "2 days ago",
    },
    {
      icon: UserCheck,
      title: "Manager review",
      description: "Manager reviewed onboarding progress.",
      date: "3 days ago",
    },
    {
      icon: Clock,
      title: "Deadline reminder",
      description: "Security training deadline is approaching.",
      date: "4 days ago",
    },
  ];

  return (
    <div className="history-page">
      <div>
        <h1>History</h1>
        <p>Recent onboarding activity and task changes.</p>
      </div>

      <div className="history-list">
        {historyItems.map((item) => {
          const Icon = item.icon;

          return (
            <div className="history-card card" key={item.title}>
              <div className="history-icon">
                <Icon size={20} />
              </div>

              <div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>

              <span>{item.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;