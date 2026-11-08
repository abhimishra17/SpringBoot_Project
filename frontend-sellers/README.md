# CloudVendor Hub - React Frontend

Modern React application for managing Cloud Vendors, integrated with the Spring Boot REST API (`/cloudvendor`).

## 🚀 Features

- **Full CRUD Support**:
  - **Display (Read)**: View all vendors in a structured Data Table or responsive Card Grid view.
  - **Create**: Add new vendors with client-side & backend validation rules (Age >= 18, all fields mandatory).
  - **Update**: Edit existing vendor details with pre-populated form values.
  - **Delete**: Safe vendor deletion with confirmation dialog modal.
- **Search & Filtering**:
  - Real-time search across Vendor Name, Category, Phone Number, Location, and ID.
  - Category and Gender/Entity filtering dropdowns.
  - Multi-attribute sorting (ID, Name, Age).
- **Interactive UI**:
  - Key business metrics dashboard (Total Vendors, Unique Categories, Average Age, Active Contacts).
  - Single-vendor detailed view modal.
  - Live Spring Boot API health status indicator.
  - Toast alert notifications for success/error feedback.
- **Zero CORS Issues**:
  - Pre-configured Vite dev server proxy forwarding `/cloudvendor` to `http://localhost:8080`.
  - Spring Boot `@CrossOrigin` enabled in `CloudAPIService.java`.

## 🛠️ Tech Stack

- **React 18**
- **Vite** (Ultra-fast build and dev server)
- **Axios** (REST API client)
- **Lucide React** (Clean, modern UI icons)
- **Modern CSS** (Responsive, accessible, custom design system)

## 📦 Getting Started

### 1. Ensure Spring Boot is Running
The Spring Boot backend should be running on port `8080`:
```bash
cd SpringBoot_Project
mvn spring-boot:run
```

### 2. Run the React Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:
👉 **`http://localhost:5173`**

## 🔌 API Endpoints Connected

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/cloudvendor` | Fetch all cloud vendors |
| `GET` | `/cloudvendor/{id}` | Fetch a single cloud vendor by ID |
| `POST` | `/cloudvendor` | Create a new cloud vendor |
| `PUT` | `/cloudvendor/{id}` | Update existing cloud vendor details |
| `DELETE` | `/cloudvendor/{id}` | Delete a cloud vendor |

