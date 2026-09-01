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

        <h3 className="card-title mb-3">
          Search Employees
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="row g-2">

            <div className="col-md-8">

              <input
                type="text"
                className="form-control"
                placeholder="Search by name or employee code..."
                value={searchText}
                onChange={(event) =>
                  setSearchText(event.target.value)
                }
              />

            </div>

            <div className="col-md-2">

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Search
              </button>

            </div>

            <div className="col-md-2">

              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={handleClear}
              >
                Clear
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EmployeeSearch;