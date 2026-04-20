# React API Integration News Portal

This project is built for the FSAD Skill 11 workbook task.

## Features

- Local JSON fetch from `public/users.json`
- Public API fetch from `https://jsonplaceholder.typicode.com/users`
- Axios integration with `https://dummyjson.com/posts`
- Dropdown filtering by `userId`
- Refresh button for fake API posts
- React Router dashboard navigation
- Basic responsive styling
- Backend connection status shown on the dashboard

## Run the frontend

```bash
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Run the backend

Open another terminal:

```bash
cd ../AuthApp
mvn spring-boot:run
```

Backend default URL: `http://localhost:8080`
