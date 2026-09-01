import { useEffect, useState } from "react";
import {
  addEmployee,
  updateEmployee,
} from "../services/employeeService";

function EmployeeForm({
  selectedEmployee,
  onEmployeeSaved,
  onCancelEdit,
}) {
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

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        employeeCode: selectedEmployee.employeeCode || "",
        fullName: selectedEmployee.fullName || "",
        email: selectedEmployee.email || "",
        phone: selectedEmployee.phone || "",
        department: selectedEmployee.department || "",
        role: selectedEmployee.role || "",
        status: selectedEmployee.status || "ACTIVE",
      });

      setError("");
      setSuccess("");
    }
  }, [selectedEmployee]);

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
      if (selectedEmployee) {
        await updateEmployee(selectedEmployee.id, formData);
        setSuccess("Employee updated successfully!");
      } else {
        await addEmployee(formData);
        setSuccess("Employee added successfully!");
      }

      setFormData({
        employeeCode: "",
        fullName: "",
        email: "",
        phone: "",
        department: "",
        role: "",
        status: "ACTIVE",
      });

      onEmployeeSaved();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      employeeCode: "",
      fullName: "",
      email: "",
      phone: "",
      department: "",
      role: "",
      status: "ACTIVE",
    });

    setError("");
    setSuccess("");

    onCancelEdit();
  };

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body p-4">

        {/* Form Header */}
        <div className="mb-4">
          <h3 className="card-title mb-1">
            {selectedEmployee
              ? "Edit Employee"
              : "Add New Employee"}
          </h3>

          <p className="text-muted mb-0">
            {selectedEmployee
              ? "Update employee information"
              : "Enter employee details below"}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="row g-3">

            {/* Employee Code */}
            <div className="col-md-6">
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
            <div className="col-md-6">
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
            <div className="col-md-6">
              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
              />
            </div>

            {/* Phone */}
            <div className="col-md-6">
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
            <div className="col-md-6">
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
            <div className="col-md-6">
              <label className="form-label">
                Role / Designation
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
            <div className="col-md-6">
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

          </div>

          {/* Buttons */}
          <div className="mt-4">

            <button
              type="submit"
              className="btn btn-primary me-2"
            >
              {selectedEmployee
                ? "Update Employee"
                : "Save Employee"}
            </button>

            {selectedEmployee && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>

    </div>
  );
}

export default EmployeeForm;