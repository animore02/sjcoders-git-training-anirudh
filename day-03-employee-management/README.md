# Day 3 + Day 5 – Employee Management with Authentication & RBAC

This is an Employee Management REST API built during the SJ Coders training program.  
Day 5 adds JWT-based authentication, BCrypt password hashing, Bean Validation, Role-Based Access Control (RBAC), and a global exception handler.

---

## Technologies Used

- Java 21 / Spring Boot 4.1
- Spring Security + JWT (jjwt 0.12.6)
- Spring Data JPA / Hibernate
- MySQL
- BCrypt (via Spring Security)
- Bean Validation (Jakarta Validation)
- Postman

---

## Authentication Flow

```
Client                         Server
  |                               |
  |-- POST /api/auth/register --> |  Validates input, hashes password, saves User
  |<-- 201 { id, name, email, role } --|
  |                               |
  |-- POST /api/auth/login -----> |  Validates credentials, generates JWT
  |<-- 200 { "token": "<JWT>" } --|
  |                               |
  |-- GET /api/employees -------> |  (Authorization: Bearer <JWT>)
  |   [JwtAuthenticationFilter]   |  Extracts email + role, sets SecurityContext
  |<-- 200 [...employees...] ----|
```

The JWT token:
- Is signed with a secret key using HMAC-SHA
- Contains the user's `email` (subject) and `role` (claim)
- Expires after **1 hour**
- Must be sent as: `Authorization: Bearer <token>`

---

## Role Permissions (RBAC)

| Action | Endpoint | ADMIN | USER |
|--------|----------|-------|------|
| Register | POST /api/auth/register | ✅ | ✅ |
| Login | POST /api/auth/login | ✅ | ✅ |
| List all employees | GET /api/employees | ✅ | ✅ |
| Search employees | GET /api/employees/search?query= | ✅ | ✅ |
| View employee by ID | GET /api/employees/{id} | ✅ | ✅ |
| Add employee | POST /api/employees | ✅ | ❌ (403) |
| Edit employee | PUT /api/employees/{id} | ✅ | ❌ (403) |
| Delete employee | DELETE /api/employees/{id} | ✅ | ❌ (403) |

---

## API Endpoints

### Auth (public — no token required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

**Register request body:**
```json
{
  "name": "Anirudh",
  "email": "anirudh@example.com",
  "password": "secret123",
  "role": "ADMIN"
}
```
> `role` must be `ADMIN` or `USER`.

**Login request body:**
```json
{
  "email": "anirudh@example.com",
  "password": "secret123"
}
```
**Login response:**
```json
{ "token": "eyJhbGci..." }
```

### Employee APIs (JWT required — `Authorization: Bearer <token>`)

| Method | Endpoint | Role Required |
|--------|----------|---------------|
| GET | `/api/employees` | ADMIN or USER |
| GET | `/api/employees/{id}` | ADMIN or USER |
| GET | `/api/employees/search?query=` | ADMIN or USER |
| POST | `/api/employees` | ADMIN only |
| PUT | `/api/employees/{id}` | ADMIN only |
| DELETE | `/api/employees/{id}` | ADMIN only |

**Employee request body (POST / PUT):**
```json
{
  "employeeCode": "EMP001",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "department": "Engineering",
  "role": "Developer",
  "status": "Active"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | Deleted successfully |
| 400 | Validation error (field errors returned) |
| 401 | Missing or invalid JWT token |
| 403 | Authenticated but insufficient role |
| 404 | Employee not found |
| 409 | Email already registered |
| 500 | Unexpected server error |

---

## Postman Testing Guide

### Step 1 — Register an ADMIN user
- **POST** `http://localhost:8080/api/auth/register`
- Body (raw JSON):
```json
{ "name": "Admin User", "email": "admin@test.com", "password": "admin123", "role": "ADMIN" }
```
- Expected: `201 Created` with `{ id, name, email, role }`

### Step 2 — Register a USER
- **POST** `http://localhost:8080/api/auth/register`
- Body:
```json
{ "name": "Regular User", "email": "user@test.com", "password": "user123", "role": "USER" }
```
- Expected: `201 Created`

### Step 3 — Login as ADMIN and copy the token
- **POST** `http://localhost:8080/api/auth/login`
- Body: `{ "email": "admin@test.com", "password": "admin123" }`
- Expected: `200 OK` → copy the value of `"token"`

### Step 4 — Test protected GET (USER or ADMIN token)
- **GET** `http://localhost:8080/api/employees`
- Header: `Authorization: Bearer <token>`
- Expected: `200 OK`

### Step 5 — Test POST as ADMIN (should succeed)
- **POST** `http://localhost:8080/api/employees`
- Header: `Authorization: Bearer <ADMIN token>`
- Body: employee JSON (see above)
- Expected: `201 Created`

### Step 6 — Test POST as USER (should fail with 403)
- Login as USER → get USER token
- **POST** `http://localhost:8080/api/employees` with `Authorization: Bearer <USER token>`
- Expected: `403 Forbidden` with JSON body

### Step 7 — Test without token (should fail with 401)
- **GET** `http://localhost:8080/api/employees` (no Authorization header)
- Expected: `401 Unauthorized` with JSON body

### Step 8 — Test Validation (400)
- **POST** `http://localhost:8080/api/auth/register` with missing fields
- Expected: `400 Bad Request` with `"errors": { "email": "...", ... }`

### Step 9 — Test 404
- **GET** `http://localhost:8080/api/employees/9999`
- Expected: `404 Not Found` with JSON body

---

## How to Run

```bash
cd day-03-employee-management/backend
.\mvnw.cmd spring-boot:run
```

Server starts at: `http://localhost:8080`

Create `.env` in `backend/` with:
```
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
```

Database: `sjcoders_training` (auto-created by Hibernate on first run)

---

## Project Structure

```
day-03-employee-management/
├── backend/
│   └── src/main/java/com/sjcoders/training/
│       ├── config/         SecurityConfig.java
│       ├── controller/     AuthController.java, EmployeeController.java
│       ├── dto/            LoginRequest, RegisterRequest, RegisterResponse
│       │                   EmployeeRequest, EmployeeResponse
│       ├── exception/      GlobalExceptionHandler, InvalidCredentialsException
│       │                   ResourceNotFoundException, DuplicateEmailException
│       ├── model/          User.java, Employee.java
│       ├── repository/     UserRepository.java, EmployeeRepository.java
│       ├── security/       JwtService.java, JwtAuthenticationFilter.java
│       └── service/        AuthService.java, EmployeeService.java
├── frontend/
├── Postman/
├── screenshots/
└── README.md
```