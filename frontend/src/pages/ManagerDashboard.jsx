import { useState } from "react";
import {
  MoreHorizontal,
  Search,
  ListFilter,
  Eye,
  Pencil,
  Trash2,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import "./ManagerDashboard.css";

function ManagerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState(null);

  const employees = [
    {
      name: "Sam Smith",
      avatar: "🧑‍💻",
      open: 80,
      progress: 10,
      completed: 10,
      overdue: 20,
      notes: "Sam Smith",
    },
    {
      name: "John Cena",
      avatar: "👨‍💼",
      open: 20,
      progress: 10,
      completed: 60,
      overdue: 20,
      notes: "",
    },
    {
      name: "Harry Peter",
      avatar: "🧑‍🔧",
      open: 100,
      progress: 0,
      completed: 0,
      overdue: 100,
      notes: "Need to have a talk",
    },
    {
      name: "Parker Miles",
      avatar: "👨‍🎓",
      open: 74,
      progress: 10,
      completed: 10,
      overdue: 0,
      notes: "Need to add in Java training",
    },
    {
      name: "Logan Hogan",
      avatar: "👨‍💻",
      open: 0,
      progress: 10,
      completed: 90,
      overdue: 0,
      notes:
        "Task need to be provided as onboarding route is not yet fully assigned",
    },
  ];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "overdue" && employee.overdue > 0) ||
      (filter === "on-track" &&
        employee.overdue === 0 &&
        employee.completed >= 70) ||
      (filter === "low-progress" && employee.completed < 50) ||
      (filter === "completed" && employee.completed >= 80);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="manager-page">
      <div className="manager-title">
        <h1>IPE Product Stage | Team Induction Progress</h1>
        <p>Monitor onboarding progress, overdue tasks and team completion status.</p>
      </div>

      <section className="manager-summary-grid">
        <SummaryCard icon={<Users />} title="Users Joined" value="5" tone="blue" />
        <SummaryCard icon={<Clock />} title="Tasks In Progress" value="5" tone="amber" />
        <SummaryCard icon={<CheckCircle2 />} title="Mostly Complete" value="2" tone="green" />
        <SummaryCard icon={<AlertTriangle />} title="Tasks Overdue" value="3" tone="red" />
      </section>

      <section className="employee-table-card">
        <div className="table-header">
          <h2>Full Employee List</h2>

          <div className="table-actions">
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search Name"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <div className="filter-box">
              <ListFilter size={16} />
              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              >
                <option value="all">All</option>
                <option value="overdue">Overdue</option>
                <option value="on-track">On Track</option>
                <option value="low-progress">Low Progress</option>
                <option value="completed">Mostly Complete</option>
              </select>
            </div>
          </div>
        </div>

        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Open</th>
              <th>In Progress</th>
              <th>Completed</th>
              <th>Overdue</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.name}>
                <td>
                  <button
                    className="employee-name-link"
                    onClick={() => alert(`Open profile for ${employee.name}`)}
                  >
                    <span className="avatar">{employee.avatar}</span>
                    <span>{employee.name}</span>
                  </button>
                </td>

                <td>{employee.open}%</td>
                <td>{employee.progress}%</td>
                <td>{employee.completed}%</td>

                <td>
                  <span
                    className={`overdue-badge ${
                      employee.overdue === 0 ? "safe" : "risk"
                    }`}
                  >
                    {employee.overdue}%
                  </span>
                </td>

                <td className="notes-cell">
                  <span>{employee.notes}</span>
                </td>

                <td className="actions-cell">
                  <button
                    className="more-btn"
                    onClick={() =>
                      setOpenMenu(
                        openMenu === employee.name ? null : employee.name
                      )
                    }
                  >
                    <MoreHorizontal size={22} />
                  </button>

                  {openMenu === employee.name && (
                    <div className="row-menu">
                      <button onClick={() => alert(`View ${employee.name}`)}>
                        <Eye size={15} />
                        View User
                      </button>

                      <button
                        onClick={() =>
                          alert(`Add/Edit note for ${employee.name}`)
                        }
                      >
                        <Pencil size={15} />
                        Add / Edit Note
                      </button>

                      <button
                        className="danger"
                        onClick={() =>
                          alert(`Delete note for ${employee.name}`)
                        }
                      >
                        <Trash2 size={15} />
                        Delete Note
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function SummaryCard({ icon, title, value, tone }) {
  return (
    <div className={`summary-card ${tone}`}>
      <div className="summary-icon">{icon}</div>
      <div>
        <p>{title}</p>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

export default ManagerDashboard;