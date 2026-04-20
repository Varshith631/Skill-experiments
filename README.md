# EXP-15 - JWT Authentication and Role Authorization

## Project Structure

- `backend`: Spring Boot + Spring Security + JWT + MySQL
- `frontend`: React + Vite role-based client for login, admin actions, and employee profile

## Database

- MySQL database: `testdb`
- Tables: `exp15_users` and `exp15_employee_records`

## Default Users

- `admin / admin123`
- `employee / employee123`

## Backend Endpoints

- `POST /register`
- `POST /login`
- `POST /admin/add`
- `DELETE /admin/delete?id=<id>`
- `GET /admin/employees`
- `GET /employee/profile`

## Run Commands

Backend:

```powershell
cd backend
mvn spring-boot:run
```

Frontend:

```powershell
cd frontend
npm run dev
```

## Postman Flow

1. `POST /login` with valid credentials to get JWT
2. Add `Authorization: Bearer <token>`
3. Test `/admin/add` and `/admin/delete` with ADMIN token
4. Test `/employee/profile` with EMPLOYEE token
5. Retry without token or with the wrong role to verify authorization failure
