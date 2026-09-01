import { useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeSearch from "./components/EmployeeSearch";
import {
  getEmployees,
  searchEmployees,
  deleteEmployee,
} from "./services/employeeService";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSearch = async (name) => {
    try {
      setLoading(true);
      setError("");

      const data = await searchEmployees(name);
      setEmployees(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    loadEmployees();
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setSelectedEmployee(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteEmployee(id);
      await loadEmployees();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="app-container">

      {/* Header */}
      <header className="app-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-1">Employee Management</h1>
              <p className="mb-0">
                Manage your employees efficiently
              </p>
            </div>

            <div className="header-badge">
              SJ Coders
            </div>
          </div>
        </div>
      </header>

      <main className="container py-4">

        {/* Form */}
        <EmployeeForm
          selectedEmployee={selectedEmployee}
          onEmployeeSaved={() => {
            loadEmployees();
            setSelectedEmployee(null);
          }}
          onCancelEdit={handleCancelEdit}
        />

        {/* Search */}
        <EmployeeSearch
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />

        {/* Loading */}
        {loading && (
          <div className="alert alert-info text-center shadow-sm">
            Loading employees...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="alert alert-danger shadow-sm">
            {error}
          </div>
        )}

        {/* Employee List */}
        {!loading && !error && (
          <EmployeeList
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p className="mb-0">
          SJ Coders • Employee Management System
        </p>
      </footer>

    </div>
  );
}

export default App;