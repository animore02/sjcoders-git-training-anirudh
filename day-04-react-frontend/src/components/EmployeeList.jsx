function EmployeeList({ employees, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="card-title mb-1">
              Employee List
            </h3>

            <small className="text-muted">
              {employees.length} employee
              {employees.length !== 1 ? "s" : ""}
            </small>
          </div>
        </div>

        {employees.length === 0 ? (
          <div className="text-center py-5">
            <h5>No employees found</h5>
            <p className="text-muted">
              Try adding an employee or changing your search.
            </p>
          </div>
        ) : (

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>
                  <th>ID</th>
                  <th>Employee Code</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {employees.map((employee) => (

                  <tr key={employee.id}>

                    <td>
                      {employee.id}
                    </td>

                    <td>
                      <strong>
                        {employee.employeeCode}
                      </strong>
                    </td>

                    <td>
                      {employee.fullName}
                    </td>

                    <td>
                      {employee.email}
                    </td>

                    <td>
                      {employee.phone}
                    </td>

                    <td>
                      {employee.department}
                    </td>

                    <td>
                      {employee.role}
                    </td>

                    <td>
                      <span className="badge text-bg-success">
                        {employee.status}
                      </span>
                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => onEdit(employee)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(employee.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default EmployeeList;