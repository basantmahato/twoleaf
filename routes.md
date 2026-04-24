# Project Routes Documentation

This document outlines all available routes for both the Frontend (Next.js) and Backend (Express API v1) for the TwoLeaf Services project.

---

## 🖥️ Frontend Routes (Client-side)

All dashboard routes are protected by the `RouteGuard` component and require a valid login session (Admin).

| Path | Access Level | Description |
| :--- | :--- | :--- |
| `/` | **Public** | Marketing landing page / Homepage. |
| `/login` | **Public** | Sign-in page for the CRM. |
| `/dashboard` | **Protected** | Main dashboard overview. |
| `/dashboard/leads` | **Protected** | Leads management table with CRUD operations. |
| `/unauthorized` | **Public** | Shown when a user lacks permission for a specific route. |

---

## 📡 Backend Routes (API v1)

**Base URL:** `http://localhost:5000/api/v1`

### 🔑 Authentication (`/auth`)

| Method | Path | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/login` | Public | Authenticates user and returns Access + Refresh tokens. |
| `POST` | `/refresh` | Public | Exchanges a valid Refresh Token for a new Access Token. |
| `GET` | `/me` | Admin | Returns the profile of the currently logged-in user. |
| `POST` | `/register` | Admin | Creates a new admin account. |
| `GET` | `/users` | Admin | Lists all registered admins. |

### 🎯 Leads Management (`/leads`)

| Method | Path | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Admin | Lists all leads. |
| `POST` | `/` | Admin | Creates a new lead. |
| `GET` | `/stats` | Admin | Returns aggregated statistics for the leads pipeline. |
| `GET` | `/:id` | Admin | Retrieves full details for a specific lead. |
| `PUT` | `/:id` | Admin | Updates a lead. |
| `DELETE` | `/:id` | Admin | Permanently deletes a lead from the system. |

---

## 🛡️ Access Control Summary

- **Public**: No authentication required.
- **Admin**: All protected routes require a valid `Authorization: Bearer <accessToken>` header and the user must be an `admin`. Since the system is now admin-only, all registered users are admins.
