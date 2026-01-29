# TimeTracker 🕒

A robust MERN-stack application for tracking consultancy hours, managing customer contracts, and monitoring service utilization.

---

## 🚀 Overview

TimeTracker is designed to bridge the gap between service delivery and contract management. It allows consultants to log their daily tasks against specific customer contracts, providing real-time visibility into usage limits and contract health.

---

## 🛠 Tech Stack

### Frontend
- **React 19** (Vite)
- **Material UI (MUI) v7** - Premium design system & components.
- **Axios** - API communication.
- **Dayjs** - Date and time manipulation.
- **XLSX** - Exporting timesheets to Excel/CSV.
- **React Router Dom** - Client-side routing.

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** - Database modeling.
- **Sessions/Cookies** - Secure authentication.
- **Dayjs** - Server-side time calculations.

---

## 📂 Project Structure

```text
TimeTracker/
├── client/                 # Frontend (Vite + React)
│   ├── src/
│   │   ├── Components/     # UI Components
│   │   │   ├── AdminDashboard/     # Refactored Admin logic
│   │   │   ├── UserDashboard/      # Refactored User logic
│   │   │   └── ...                 # Auth & Shared components
│   │   ├── App.jsx         # Main routing & User context
│   │   └── main.jsx        # Entry point
│   └── package.json
└── server/                 # Backend (Node + Express)
    ├── model/              # Mongoose Schemas (Task, Contract, User, etc.)
    ├── index.js            # Main API entry & Middleware
    └── .env                # Environment configuration
```

---

## 🏗 Modular Architecture (Recent Refactor)

The dashboards have been refactored from monolithic files into a **Component-Based Architecture** to ensure high maintainability:

### Admin Dashboard
Located in `client/src/Components/AdminDashboard/`
- **Sidebar**: Centralized navigation.
- **OverviewSection**: Dashboard statistics and welcome state.
- **ManagementSections**: Specialized views for Users, Customers, Consultants, Products, and Contracts.
- **FormDialogs**: Generic dialog handler for all CRUD operations.

### User Dashboard
Located in `client/src/Components/UserDashboard/`
- **TimesheetSection**: Complex logic for task listing, searching, filtering, and grouping.
- **ContractSection**: Visualization of contract utilization (consumed vs. limit).
- **TaskFormSection**: Dedicated module for logging new work entries.
- **TaskDialogs**: Unified handler for task details and deletions.

---

## 🔑 Key Features

- **Role-Based Access**: Specialized dashboards for `Admin` and `User` roles.
- **Contract Utilization**: Real-time progress bars showing how many hours are left in a support contract.
- **Smart Grouping**: Group tasks by Customer, Consultant, Contract, or Date.
- **Flexible Export**: One-click export of filtered logs to Excel or CSV.
- **Chronological ID System**: Automatic `SR-ID` generation based on global entry order.

---

## 🛠 Getting Started

1. **Setup**:
   - `npm install` in the root directory (this will install the necessary tools like `concurrently`).

2. **Run Everything**:
   - `npm run dev` in the root directory. This will start both the Express server and the Vite client simultaneously.

---

## 👨‍💻 Maintainer Notes
When adding new dashboard features, avoid bloating the main `AdminDashboard.jsx` or `UserDashboard.jsx`. Instead, identify the relevant sub-component in the folders mentioned above or create a new one to keep the entry files lean.
