# Scalable Web App with Authentication & Dashboard

## Project Overview

This project is a **full-stack web application** built as part of the *Frontend Developer Intern assignment*.
The goal was to build a **modern, scalable, and secure dashboard application** with authentication, protected routes, and CRUD functionality, while also demonstrating clean frontend–backend integration.

The application allows users to:

* Register & login securely using JWT authentication
* Access a protected dashboard
* Manage tasks (Create, Read, Update, Delete)
* Search and filter tasks
* View their user profile fetched from the backend

---

## Tech Stack

### Frontend

* **React.js (Vite)**
* **Material UI (MUI)** for responsive UI
* **React Router v6** for routing
* **Axios** for API communication
* **Context API** for authentication state

### Backend

* **Node.js + Express**
* **MongoDB + Mongoose**
* **JWT** for authentication
* **bcrypt** for password hashing

---

## Core Features

### Authentication

* User registration and login
* JWT-based authentication
* Password hashing using bcrypt
* Secure logout functionality

### Protected Routes

* Dashboard accessible only after login
* Route protection implemented using a custom `ProtectedRoute`

### Dashboard

* Display logged-in user profile (name & email)
* Task management (CRUD)
* Search tasks by title
* Filter tasks (All / Completed / Pending)

### Security

* JWT verification middleware
* Password hashing
* Protected backend APIs
* Proper error handling & validation

---

## Project Setup

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:8080
```

---

## API Endpoints (Summary)

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### User

* `GET /api/users/profile` (Protected)

### Tasks

* `GET /api/tasks`
* `POST /api/tasks`
* `PUT /api/tasks/:id`
* `DELETE /api/tasks/:id`

(All task routes are JWT protected)

---

## API Testing

All APIs were tested using:

* **Postman**
* **curl**

A Postman collection can be exported for reference.

---

## Folder Structure (Frontend)

```
src/
├── api/
├── components/
├── context/
├── pages/
├── routes/
└── App.jsx
```

---

## Assignment Status

All required features mentioned in the assignment have been successfully implemented.

---

## 🚀 Scalability & Production Considerations

If this application were to be scaled for production, the following improvements would be implemented:

### Frontend Scalability

* Introduce **state management libraries** (Redux Toolkit / React Query) for better data handling
* Implement **lazy loading & code splitting** to improve performance
* Add **role-based access control** for different user types
* Use environment-based API configuration for staging/production

### Backend Scalability

* API versioning (e.g., `/api/v1`)
* Refresh token mechanism for better session management
* Rate limiting & request throttling
* Centralized logging & monitoring
* Caching frequently accessed data (Redis)

### Security Enhancements

* HTTP-only cookies for token storage
* CSRF protection
* Input sanitization & schema validation
* Secure headers using Helmet

### Deployment

* Dockerized services
* CI/CD pipeline
* Cloud deployment (AWS / GCP / Azure)
* Load balancing for high traffic

These changes would ensure the application remains **secure, performant, and scalable** as user traffic grows.


## Author

**Firdosh Alam**
Frontend Developer Intern Candidate




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
