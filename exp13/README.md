# Exp 13 - Deployment of Full-Stack Application

Folder structure:

- `exp13/frontend`
- `exp13/backend`

Deployment approach used in this project:

1. Build the React frontend with Vite
2. Package the Spring Boot backend as a JAR
3. Use environment variables:
   - development: `VITE_API_BASE_URL=http://localhost:8082/api`
   - production: `VITE_API_BASE_URL=/api`
4. Copy the React `dist` output into `backend/src/main/resources/static`
5. Run the Spring Boot JAR and access the deployed app on port `8082`
