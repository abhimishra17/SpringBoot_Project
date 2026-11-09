# Spring Boot Multi-Frontend Fullstack System

This project contains a **shared Spring Boot REST API backend** that powers **two independent React frontends**.

---

## 🏗️ Architecture

```text
                  ┌──────────────────────────────────────────────┐
                  │       Spring Boot Backend (Port 8080)        │
                  │  ├── /cloudvendor       (Vendor REST API)    │
                  │  └── /ecommerce-seller  (Seller REST API)    │
                  └──────────────────────┬───────────────────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    ▼                                         ▼
┌───────────────────────────────────────┐ ┌───────────────────────────────────────┐
│     frontend-vendors/ (Port 5173)     │ │     frontend-sellers/ (Port 5174)     │
│   Dedicated Cloud Vendor Portal       │ │   Dedicated E-commerce Seller Portal  │
└───────────────────────────────────────┘ └───────────────────────────────────────┘
```

---

## 🚀 Running the Applications

### 1. Start the Shared Backend (Port 8080)
```bash
cd SpringBoot_Project
mvn spring-boot:run
```

### 2. Start Frontend 1: Cloud Vendor Portal (Port 5173)
In a separate terminal:
```bash
cd SpringBoot_Project/frontend-vendors
npm run dev
```
👉 Open **http://localhost:5173**

### 3. Start Frontend 2: E-commerce Seller Portal (Port 5174)
In a separate terminal:
```bash
cd SpringBoot_Project/frontend-sellers
npm run dev
```
👉 Open **http://localhost:5174**

---

## 🔌 API Endpoints Reference

| Service | Port | Endpoint | Description |
|---|---|---|---|
| **Spring Boot Backend** | `8080` | `/cloudvendor` | Vendor CRUD API |
| **Spring Boot Backend** | `8080` | `/ecommerce-seller` | Seller CRUD API |
| **Frontend Vendors** | `5173` | `/` | UI for Cloud Vendors |
| **Frontend Sellers** | `5174` | `/` | UI for E-commerce Sellers |
