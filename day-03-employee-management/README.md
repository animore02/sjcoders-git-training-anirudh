# Day 3 + Day 5 – Employee Management

Employee Management REST API built during the SJ Coders training program.

Day 5 focuses on securing the backend using Spring Security and JWT. I also added
BCrypt password hashing, request validation, role-based access control and global
exception handling.

## Technologies

- Java 21
- Spring Boot 4.1
- Spring Security
- JWT (JJWT 0.12.6)
- Spring Data JPA / Hibernate
- MySQL
- BCrypt
- Jakarta Bean Validation
- Postman

---

## Authentication

The application uses JWT-based authentication.

Basic flow:

```text
Register
   ↓
Password is hashed using BCrypt
   ↓
User is saved
   ↓
Login
   ↓
Credentials are checked
   ↓
JWT token is generated
   ↓
Token is used for protected APIs
```

Protected endpoints expect the token in the request header:

```text
Authorization: Bearer <token>
```

## How to Run

1. Go to the backend folder:

   ```bash
   cd day-03-employee-management/backend
   ```

2. Run the application:

   ```bash
   .\mvnw.cmd spring-boot:run
   ```

3. The server runs on: http://localhost:8080

4. Database configuration — create a `.env` file inside the backend folder:

   ```env
   DB_USERNAME=your_mysql_username
   DB_PASSWORD=your_mysql_password
   ```

5. Database used: `sjcoders_training`

Make sure MySQL is running before starting the application.

## Project Structure

```text
day-03-employee-management/
│
├── backend/
│   └── src/main/java/com/sjcoders/training/
│       ├── config/
│       │   └── SecurityConfig.java
│       │
│       ├── controller/
│       │   ├── AuthController.java
│       │   └── EmployeeController.java
│       │
│       ├── dto/
│       │   ├── LoginRequest.java
│       │   ├── RegisterRequest.java
│       │   ├── RegisterResponse.java
│       │   ├── EmployeeRequest.java
│       │   └── EmployeeResponse.java
│       │
│       ├── exception/
│       │   ├── GlobalExceptionHandler.java
│       │   ├── InvalidCredentialsException.java
│       │   ├── ResourceNotFoundException.java
│       │   └── DuplicateEmailException.java
│       │
│       ├── model/
│       │   ├── User.java
│       │   └── Employee.java
│       │
│       ├── repository/
│       │   ├── UserRepository.java
│       │   └── EmployeeRepository.java
│       │
│       ├── security/
│       │   ├── JwtService.java
│       │   └── JwtAuthenticationFilter.java
│       │
│       └── service/
│           ├── AuthService.java
│           └── EmployeeService.java
│
├── frontend/
├── Postman/
├── screenshots/
└── README.md
```

## Screenshots

Postman testing screenshots are available in the `screenshots/` folder.

The screenshots demonstrate:

- User registration and login
- JWT authentication
- ADMIN employee operations
- USER read-only access
- 401 Unauthorized
- 403 Forbidden
- 400 Bad Request
- 404 Not Found

## Day 5 Summary

In Day 5, I added security and validation to the Employee Management API.

Main things implemented:

- JWT authentication
- BCrypt password hashing
- Spring Security
- ADMIN and USER roles
- Protected employee APIs
- DTOs and request validation
- Global exception handling
- HTTP status handling
- Postman testing

The final result is that a USER can log in and view employee data, while an
ADMIN can add, edit and delete employees.