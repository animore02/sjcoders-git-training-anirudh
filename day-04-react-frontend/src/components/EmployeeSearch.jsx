import { useState } from "react";

function EmployeeSearch({ onSearch, onClear }) {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchText.trim() === "") {
      onClear();
      return;
    }

    onSearch(searchText.trim());
  };

  const handleClear = () => {
    setSearchText("");
    onClear();
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h3 className="card-title mb-3">Search Employees</h3>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by employee name"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />

            <button
              type="submit"
              className="btn btn-primary"
            >
              Search
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeSearch;