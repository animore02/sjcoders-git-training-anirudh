# Day 3 - Employee Management

This is a simple Employee Management project made as part of the SJ Coders training.
The project has a frontend, backend, and MySQL database. 
The frontend communicates with the backend using REST APIs.

## Technologies Used
- HTML
- CSS
- JavaScript
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- Postman

## Features:
- Add a new employee
- View all employees
- Find employee by ID
- Search employees by name or employee code
- Store employee data in MySQL

## Employee Details
The employee contains:

- ID
- Employee Code
- Full Name
- Email
- Phone
- Department
- Role
- Status

## API Endpoints
| POST | /api/employees | Add employee |
| GET | /api/employees | Get all employees |
| GET | /api/employees/id | Get employee by ID |
| GET | /api/employees/search?query=text | Search employee |

## Database

Database name: `sjcoders_training`
Table name: `employee`

## How to Run

### Backend

Go to the backend folder:
-cd backend
-run command: .\mvnw.cmd spring-boot:run

## frontend
-run frontend

## Postman
-Postman collection is available in: postman/employee-management-api.json

## project structure 
day-03-employee-management/
│
├── backend/
├── frontend/
├── postman/
├── screenshots/
└── README.md