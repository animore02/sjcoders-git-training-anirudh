import { useState } from "react";

export default function EmployeeForm({ onEmployeeSaved }){
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event)=>{
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.designation ||
      !formData.phone
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    console.log("Employee:", formData);


    onEmployeeSaved?.();
  };

  return (
    <div>
      <div className="card-body">
        <h3 className="card-title">Add Employee</h3>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter employee name"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter employee email"
            />
          </div>

          {/* Department */}
          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              type="text"
              name="department"
              className="form-control"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter department"
            />
          </div>

          {/* Designation */}
          <div className="mb-3">
            <label className="form-label">Designation</label>
            <input
              type="text"
              name="designation"
              className="form-control"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter designation"
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <button type="submit" className="btn btn-primary">Save Employee</button>
        </form>
      </div>
    </div>
  );
}

