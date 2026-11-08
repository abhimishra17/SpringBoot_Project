# Cloud Vendor Management System (Fullstack)

Fullstack application with a Spring Boot REST API backend and a modern React frontend for managing Cloud Vendors.

---

## 🏗️ Architecture

- **Backend**: Spring Boot 3.4 (Java 17, Spring Data JPA, MySQL / H2)
  - REST endpoints at `/cloudvendor`
  - CORS support enabled (`@CrossOrigin`)
- **Frontend**: React 18 + Vite (`SpringBoot_Project/frontend/`)
  - Axios REST client with Vite reverse proxy
  - Lucide icons, responsive data table & card views
  - Search, category & gender filters, sorting, CSV export, and pagination
  - Create, Update, Delete modals with real-time validation

---

## 🚀 Running the Application

### 1. Start the Spring Boot Backend (Port 8080)

Requires Java 17+ and Maven:

```bash
cd SpringBoot_Project
mvn spring-boot:run
```

The backend starts at `http://localhost:8080`.

### 2. Start the React Frontend (Port 5173)

In a separate terminal:

```bash
cd SpringBoot_Project/frontend
npm install
npm run dev
```

Open your browser at:
👉 **`http://localhost:5173`**

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/cloudvendor` | Retrieve all cloud vendors |
| `GET` | `/cloudvendor/{vendorId}` | Retrieve a specific vendor by ID |
| `POST` | `/cloudvendor` | Create a new vendor (validates age $\ge 18$, all fields required) |
| `PUT` | `/cloudvendor/{vendorId}` | Update an existing vendor's details |
| `DELETE` | `/cloudvendor/{vendorId}` | Delete a vendor by ID |
