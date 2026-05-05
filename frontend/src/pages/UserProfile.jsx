import { useState } from "react";
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
import "./UserProfile.css";

function UserProfile() {
  const currentRole = "manager"; // change to "user", "manager", or "admin"

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [employee, setEmployee] = useState({
    name: "Sam Smith",
    role: "Jr Software Engineer",
    team: "IPE Classic",
    gender: "Male",
    age: "24 Years",
    email: "samsmith123@dxc.com",
    employeeId: "EMP-20152431-117",
    location: "London Road Building",
    phone: "+44 7896359568",
    dateJoined: "28/09/2025",
    tags: ["Software Engineer", "IPE Classic", "Java"],
    notes: "",
  });

  const canEdit = currentRole === "manager" || currentRole === "admin";

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
              <Edit size={14} />
              Edit
            </button>
          )}
        </div>

        <div className="info-grid">
          <InfoItem icon={<User />} label="Name" value={employee.name} />
          <InfoItem icon={<Calendar />} label="Date Joined" value={employee.dateJoined} />
          <InfoItem icon={<Briefcase />} label="Role" value={employee.role} />
          <InfoItem icon={<Briefcase />} label="Team" value={employee.team} />
          <InfoItem icon={<IdCard />} label="Employee ID" value={employee.employeeId} />
          <InfoItem icon={<Mail />} label="Work Email" value={employee.email} />
          <InfoItem icon={<MapPin />} label="Location Based" value={employee.location} />
          <InfoItem icon={<Phone />} label="Phone Number" value={employee.phone} />
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
                <Edit size={14} />
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
          <h3>Task Overview</h3>
          <p>Completion rate: 65%</p>

          <div className="stacked-bar">
            <div className="open" style={{ width: "50%" }}></div>
            <div className="progress" style={{ width: "20%" }}></div>
            <div className="complete" style={{ width: "30%" }}></div>
          </div>

          <div className="legend">
            <span><b className="open-dot"></b>Open</span>
            <span><b className="progress-dot"></b>In Progress</span>
            <span><b className="complete-dot"></b>Completed</span>
          </div>
        </div>

        <div className="overdue-card card">
          <h3>Overdue Tasks</h3>
          <p>Overdue rate: 15%</p>

          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Days Overdue</th>
                <th>Due Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Setting Up Work Local Environment</td>
                <td>15 Days</td>
                <td>05/09/2025</td>
              </tr>
              <tr>
                <td>Business Process</td>
                <td>10 Days</td>
                <td>10/09/2025</td>
              </tr>
              <tr>
                <td>Training Module 1</td>
                <td>5 Days</td>
                <td>15/09/2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {isEditOpen && canEdit && (
        <EditEmployeeModal
          employee={employee}
          setEmployee={setEmployee}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  );
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

function EditEmployeeModal({ employee, setEmployee, onClose }) {
  const [formData, setFormData] = useState({
    ...employee,
    tagsText: employee.tags.join(", "),
  });

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const saveChanges = () => {
    setEmployee({
      ...formData,
      tags: formData.tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

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
          <Input label="Name" value={formData.name} onChange={(v) => updateField("name", v)} />
          <Input label="Role" value={formData.role} onChange={(v) => updateField("role", v)} />
          <Input label="Team" value={formData.team} onChange={(v) => updateField("team", v)} />
          <Input label="Gender" value={formData.gender} onChange={(v) => updateField("gender", v)} />
          <Input label="Age" value={formData.age} onChange={(v) => updateField("age", v)} />
          <Input label="Work Email" value={formData.email} onChange={(v) => updateField("email", v)} />
          <Input label="Employee ID" value={formData.employeeId} onChange={(v) => updateField("employeeId", v)} />
          <Input label="Location Based" value={formData.location} onChange={(v) => updateField("location", v)} />
          <Input label="Phone Number" value={formData.phone} onChange={(v) => updateField("phone", v)} />
        </div>

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

export default UserProfile;