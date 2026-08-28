import { useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import { getEmployees } from "./services/employeeService";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="container mt-5 mb-5">

      <h1 className="text-center mb-4">
        Employee Management System
      </h1>

      <EmployeeForm onEmployeeSaved={loadEmployees} />

      {loading && (
        <div className="alert alert-info">
          Loading employees...
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!loading && !error && (
        <EmployeeList employees={employees} />
      )}

    </div>
  );
}

export default App;