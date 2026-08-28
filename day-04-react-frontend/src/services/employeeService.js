const API_URL = "http://localhost:8080/api/employees";

export async function getEmployees() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load employees");
  }

  return await response.json();
}

export async function addEmployee(employee) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Failed to add employee");
  }

  return await response.json();
}