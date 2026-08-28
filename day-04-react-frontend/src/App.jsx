import { useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeSearch from "./components/EmployeeSearch";
import { getEmployees, searchEmployees } from "./services/employeeService";

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

  return (
    <div className="container mt-5 mb-5">

      <h1 className="text-center mb-4">
        Employee Management System
      </h1>

      <EmployeeForm onEmployeeSaved={loadEmployees} />

      <EmployeeSearch
      onSearch={handleSearch}
      onClear={handleClearSearch}
    />

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