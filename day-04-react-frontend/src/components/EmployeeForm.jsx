import { useState } from "react";
import { addEmployee } from "../services/employeeService";

function EmployeeForm({ onEmployeeSaved }) {
  const [formData, setFormData] = useState({
    employeeCode: "",
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    status: "ACTIVE",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.employeeCode ||
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.department ||
      !formData.role
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const savedEmployee = await addEmployee(formData);

      console.log("Employee saved:", savedEmployee);

      setSuccess("Employee added successfully!");

      setFormData({
        employeeCode: "",
        fullName: "",
        email: "",
        phone: "",
        department: "",
        role: "",
        status: "ACTIVE",
      });

      onEmployeeSaved?.();
    } catch (error) {
      setError(error.message);
    }
  };
   
  
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h3 className="card-title mb-4">Add Employee</h3>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Employee Code */}
          <div className="mb-3">
            <label className="form-label">
              Employee Code
            </label>

            <input
              type="text"
              name="employeeCode"
              className="form-control"
              value={formData.employeeCode}
              onChange={handleChange}
              placeholder="Example: SJC-105"
            />
          </div>

          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              className="form-control"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          {/* Department */}
          <div className="mb-3">
            <label className="form-label">
              Department
            </label>

            <input
              type="text"
              name="department"
              className="form-control"
              value={formData.department}
              onChange={handleChange}
              placeholder="Example: Engineering"
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label">
              Role
            </label>

            <input
              type="text"
              name="role"
              className="form-control"
              value={formData.role}
              onChange={handleChange}
              placeholder="Example: Software Intern"
            />
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label">
              Status
            </label>

            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Save Employee
          </button>

        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;