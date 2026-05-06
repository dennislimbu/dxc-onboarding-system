import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  User,
  Calendar,
  Briefcase,
  IdCard,
  Tag,
  Edit,
  Save,
  X,
} from "lucide-react";
import { getUserById, updateUser } from "../services/userService";
import { getTasksByUser, createTaskForUser } from "../services/taskService";
import { useAuth } from "../context/AuthContext";
import "./UserProfile.css";

function UserProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const currentRole = user?.role;
  const canEdit = currentRole === "MANAGER" || currentRole === "ADMIN";
  

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      const data = await getUserById(id || 1);
      const userTasks = await getTasksByUser(data.id);

      setEmployee({
        id: data.id,
        name: data.fullName,
        role: data.jobTitle,
        team: data.department,
        gender: "Not set",
        age: "Not set",
        email: data.email,
        employeeId: `EMP-${data.id}`,
        location: data.location,
        phone: "Not set",
        dateJoined: "Not set",
        progress: data.onboardingProgress,
        tags: [data.role, data.department, data.jobTitle],
        notes: "",
      });

      setTasks(userTasks);
    } catch (error) {
      console.error("Failed to load user", error);
    } finally {
      setLoading(false);
    }
  };

  const saveEmployee = async (updatedEmployee) => {
    const payload = {
      fullName: updatedEmployee.name,
      email: updatedEmployee.email,
      role: updatedEmployee.tags[0] || "USER",
      department: updatedEmployee.team,
      jobTitle: updatedEmployee.role,
      location: updatedEmployee.location,
      onboardingProgress: updatedEmployee.progress,
    };

    const savedUser = await updateUser(employee.id, payload);

    setEmployee({
      ...updatedEmployee,
      name: savedUser.fullName,
      email: savedUser.email,
      role: savedUser.jobTitle,
      team: savedUser.department,
      location: savedUser.location,
      progress: savedUser.onboardingProgress,
    });
  };

  const addTask = async (taskData) => {
    await createTaskForUser(employee.id, taskData);
    const updatedTasks = await getTasksByUser(employee.id);
    setTasks(updatedTasks);
  };

  if (loading) {
    return <p className="loading-text">Loading user profile...</p>;
  }

  if (!employee) {
    return <p>User not found.</p>;
  }

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const openTasks = tasks.filter((task) => task.status === "OPEN").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      task.status !== "COMPLETED" &&
      task.dueDate &&
      new Date(task.dueDate) < new Date()
  );

  const progress =
    tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  return (
    <div className="user-profile-page">
      <section className="profile-left card">
        <h2>Employee Details</h2>

        <div className="profile-avatar">🧑‍💻</div>

        <h3>{employee.name}</h3>

        <div className="profile-chips">
          <span>{employee.gender}</span>
          <span>{employee.age}</span>
        </div>

        <div className="section-title">
          <h3>Basic Information</h3>

          {canEdit && (
            <button className="edit-small-btn" onClick={() => setIsEditOpen(true)}>
              Edit
            </button>
          )}
        </div>

        <div className="info-grid">
          <InfoItem icon={<User />} label="Name" value={employee.name} />
          <InfoItem
            icon={<Calendar />}
            label="Date Joined"
            value={employee.dateJoined}
          />
          <InfoItem icon={<Briefcase />} label="Role" value={employee.role} />
          <InfoItem icon={<Briefcase />} label="Team" value={employee.team} />
          <InfoItem
            icon={<IdCard />}
            label="Employee ID"
            value={employee.employeeId}
          />
          <InfoItem icon={<Mail />} label="Work Email" value={employee.email} />
          <InfoItem
            icon={<MapPin />}
            label="Location Based"
            value={employee.location}
          />
          <InfoItem
            icon={<Phone />}
            label="Phone Number"
            value={employee.phone}
          />
        </div>

        <div className="tags-section">
          <div className="tags-title">
            <Tag size={15} />
            <strong>Tags</strong>
          </div>

          <div className="tag-list">
            {employee.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="profile-right">
        <div className="notes-card card">
          <div className="notes-header">
            <h3>Notes</h3>

          {canEdit && (
            <button className="edit-small-btn" onClick={() => setIsEditOpen(true)}>
              Edit
            </button>
          )}
          </div>

          <textarea
            value={employee.notes}
            placeholder="Manager notes will appear here..."
            readOnly={!canEdit}
            onChange={(event) =>
              setEmployee({ ...employee, notes: event.target.value })
            }
          />
        </div>

        <div className="task-overview-card card">
          <div className="task-overview-header">
            <h3>Task Overview</h3>
            {canEdit && (
              <button className="add-task-btn" onClick={() => setIsAddTaskOpen(true)}>
                Add Task
              </button>
            )}
          </div>
          <p>Completion rate: {progress}%</p>

          <div className="stacked-bar">
            <div
              className="open"
              style={{
                width:
                  tasks.length === 0
                    ? "0%"
                    : `${(openTasks / tasks.length) * 100}%`,
              }}
            ></div>

            <div
              className="progress"
              style={{
                width:
                  tasks.length === 0
                    ? "0%"
                    : `${(inProgressTasks / tasks.length) * 100}%`,
              }}
            ></div>

            <div
              className="complete"
              style={{
                width:
                  tasks.length === 0
                    ? "0%"
                    : `${(completedTasks / tasks.length) * 100}%`,
              }}
            ></div>
          </div>

          <div className="legend">
            <span>
              <b className="open-dot"></b>Open
            </span>
            <span>
              <b className="progress-dot"></b>In Progress
            </span>
            <span>
              <b className="complete-dot"></b>Completed
            </span>
          </div>
        </div>

        <div className="overdue-card card">
          <h3>Overdue Tasks</h3>
          <p>
            Overdue rate:{" "}
            {tasks.length === 0
              ? 0
              : Math.round((overdueTasks.length / tasks.length) * 100)}
            %
          </p>

          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Days Overdue</th>
                <th>Due Date</th>
              </tr>
            </thead>

            <tbody>
              {overdueTasks.length === 0 ? (
                <tr>
                  <td colSpan="3" className="empty-text">No overdue tasks.</td>
                </tr>
              ) : (
                overdueTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{calculateDaysOverdue(task.dueDate)} Days</td>
                    <td>{task.dueDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isEditOpen && canEdit && (
        <EditEmployeeModal
          employee={employee}
          onSave={saveEmployee}
          onClose={() => setIsEditOpen(false)}
        />
      )}
      {isAddTaskOpen && canEdit && (
        <AddTaskModal
          onSave={addTask}
          onClose={() => setIsAddTaskOpen(false)}
        />
      )}
    </div>
  );
}

function calculateDaysOverdue(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  const difference = today - due;
  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="info-item">
      {icon}
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function EditEmployeeModal({ employee, onSave, onClose }) {
  const [formData, setFormData] = useState({
    ...employee,
    tagsText: employee.tags.join(", "),
  });

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const saveChanges = async () => {
    const updatedEmployee = {
      ...formData,
      tags: formData.tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    await onSave(updatedEmployee);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="edit-modal">
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <h2>Edit Employee Details</h2>

        <div className="modal-avatar">🧑‍💻</div>
        <p className="modal-user-name">{employee.name}</p>

        <div className="modal-grid">
          <Input
            label="Name"
            value={formData.name}
            onChange={(value) => updateField("name", value)}
          />
          <Input
            label="Role"
            value={formData.role}
            onChange={(value) => updateField("role", value)}
          />
          <Input
            label="Team"
            value={formData.team}
            onChange={(value) => updateField("team", value)}
          />
          <Input
            label="Gender"
            value={formData.gender}
            onChange={(value) => updateField("gender", value)}
          />
          <Input
            label="Age"
            value={formData.age}
            onChange={(value) => updateField("age", value)}
          />
          <Input
            label="Work Email"
            value={formData.email}
            onChange={(value) => updateField("email", value)}
          />
          <Input
            label="Employee ID"
            value={formData.employeeId}
            onChange={(value) => updateField("employeeId", value)}
          />
          <Input
            label="Location Based"
            value={formData.location}
            onChange={(value) => updateField("location", value)}
          />
          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(value) => updateField("phone", value)}
          />
        </div>

        <label className="modal-label">Progress</label>
        <input
          className="modal-input"
          type="number"
          min="0"
          max="100"
          value={formData.progress}
          onChange={(event) =>
            updateField("progress", Number(event.target.value))
          }
        />

        <label className="modal-label">Tags</label>
        <input
          className="modal-input"
          value={formData.tagsText}
          onChange={(event) => updateField("tagsText", event.target.value)}
        />

        <label className="modal-label">Notes</label>
        <textarea
          className="modal-textarea"
          value={formData.notes}
          onChange={(event) => updateField("notes", event.target.value)}
        />

        <div className="modal-actions">
          <button className="save-btn" onClick={saveChanges}>
            <Save size={15} />
            Save
          </button>

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="modal-field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}


function AddTaskModal({ onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "OPEN",
    category: "MANDATORY",
    type: "DOCUMENT",
    dueDate: "",
  });

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const saveTask = async () => {
    if (!formData.title || !formData.dueDate) {
      alert("Please enter a task title and due date.");
      return;
    }

    await onSave(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="edit-modal">
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <h2>Add Onboarding Task</h2>

        <div className="modal-grid">
          <Input
            label="Task Title"
            value={formData.title}
            onChange={(value) => updateField("title", value)}
          />

          <label className="modal-field">
            <span>Status</span>
            <select
              value={formData.status}
              onChange={(event) => updateField("status", event.target.value)}
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </label>

          <label className="modal-field">
            <span>Category</span>
            <select
              value={formData.category}
              onChange={(event) => updateField("category", event.target.value)}
            >
              <option value="MANDATORY">Mandatory</option>
              <option value="RECOMMENDED">Recommended</option>
            </select>
          </label>

          <label className="modal-field">
            <span>Type</span>
            <select
              value={formData.type}
              onChange={(event) => updateField("type", event.target.value)}
            >
              <option value="DOCUMENT">Document</option>
              <option value="VIDEO">Video</option>
              <option value="LINK">Link</option>
              <option value="SOFTWARE">Software</option>
              <option value="FORM">Form</option>
            </select>
          </label>

          <label className="modal-field">
            <span>Due Date</span>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(event) => updateField("dueDate", event.target.value)}
            />
          </label>
        </div>

        <label className="modal-label">Description</label>
        <textarea
          className="modal-textarea"
          value={formData.description}
          onChange={(event) => updateField("description", event.target.value)}
        />

        <div className="modal-actions">
          <button className="save-btn" onClick={saveTask}>
            <Save size={15} />
            Save Task
          </button>

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;