const API_URL = "http://localhost:8080/api/employees";

const employeeForm = document.getElementById("employeeForm");
const employeeTableBody = document.getElementById("employeeTableBody");
const message = document.getElementById("message");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");

function showMessage(text, type){

    message.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${text}
        </div>
    `;

    setTimeout(() => {
        message.innerHTML = "";
    }, 3000);
}


async function loadEmployees(){

    try{
        const response = await fetch(API_URL);
        if (!response.ok){
            throw new Error("Failed to load employees");
        }

        const employees = await response.json();
        displayEmployees(employees);

    } catch (error){
        console.error(error);
        showMessage("Unable to load employees", "danger");
    }
}


function displayEmployees(employees) {

    employeeTableBody.innerHTML = "";
    if (employees.length === 0) {
        employeeTableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">
                    No employees found
                </td>
            </tr>
        `;

        return;
    }

    employees.forEach(employee =>{
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.employeeCode}</td>
            <td>${employee.fullName}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.department}</td>
            <td>${employee.role}</td>
            <td>${employee.status}</td>
        `;

        employeeTableBody.appendChild(row);
    });
}



employeeForm.addEventListener("submit", async function(event){

    event.preventDefault();
    const employee = {

        employeeCode:
            document.getElementById("employeeCode").value,

        fullName:
            document.getElementById("fullName").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        department:
            document.getElementById("department").value,

        role:
            document.getElementById("role").value,

        status:
            document.getElementById("status").value
    };


    try{

        const response = await fetch(API_URL,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        });


        if(!response.ok){
            throw new Error("Failed to create employee");
        }


        const savedEmployee = await response.json();

        console.log("Saved employee:", savedEmployee);

        showMessage("Employee created successfully!", "success");

        employeeForm.reset();

        loadEmployees();

    } catch (error) {

        console.error(error);

        showMessage("Failed to create employee", "danger");
    }

});


searchButton.addEventListener("click", async function (){

    const query = searchInput.value.trim();
    if (!query){

        loadEmployees();

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/search?query=${encodeURIComponent(query)}`
        );

        if (!response.ok){
            throw new Error("Search failed");
        }

        const employees = await response.json();

        displayEmployees(employees);

    }catch(error){
        console.error(error);
        showMessage("Search failed", "danger");
    }

});



resetButton.addEventListener("click", function(){
    searchInput.value = "";
    loadEmployees();
});


loadEmployees();