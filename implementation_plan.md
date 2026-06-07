# RateHub – Store Rating Management System Implementation Plan

This document outlines the design and execution steps for building **RateHub**, a production-ready full-stack rating management system.

## User Review Required

> [!IMPORTANT]
> - **Database Setup**: The application requires MySQL. Please make sure MySQL is running on your system, or you can configure a remote MySQL database by setting up the `.env` file in the `backend` folder.
> - **Default Credentials**: We will seed the database with a default Admin account on first run (`admin@ratehub.com` / `Admin@1234`) so that you can log in immediately.
> - **Port Configuration**:
>   - Backend runs on `http://localhost:5000`
>   - Frontend runs on `http://localhost:5173` (with dev proxy to `http://localhost:5000/api`)

## Open Questions
- Do you have an existing MySQL username/password you would like to use?
- If not, we will configure the default MySQL credentials to `root` with no password or `root` with `password` in `.env.example`, and you can edit them as needed.

---

## Database Design (MySQL + Sequelize)

### 1. `users` Table
- `id` (INT, Primary Key, Auto Increment)
- `name` (VARCHAR(60), Not Null) - Length validation: 20-60 characters
- `email` (VARCHAR(255), Unique, Not Null) - Unique constraint, email format validation, indexed
- `address` (VARCHAR(400), Nullable) - Length validation: max 400 characters
- `password` (VARCHAR(255), Not Null) - Hashed password (input validator will enforce 8-16 chars, one uppercase, one special char)
- `role` (ENUM('ADMIN', 'USER', 'STORE_OWNER'), Default: 'USER')
- `createdAt` & `updatedAt` (DATETIME)

### 2. `stores` Table
- `id` (INT, Primary Key, Auto Increment)
- `name` (VARCHAR(255), Not Null)
- `address` (VARCHAR(400), Not Null)
- `ownerId` (INT, Nullable, Foreign Key -> `users.id` on delete set null)
- `createdAt` & `updatedAt` (DATETIME)

### 3. `ratings` Table
- `id` (INT, Primary Key, Auto Increment)
- `userId` (INT, Not Null, Foreign Key -> `users.id` on delete cascade)
- `storeId` (INT, Not Null, Foreign Key -> `stores.id` on delete cascade)
- `rating` (INT, Not Null) - Range: 1 to 5
- `createdAt` & `updatedAt` (DATETIME)
- **Constraint**: Unique index on `(userId, storeId)` to prevent duplicate ratings per store.

---

## Backend Architecture (Express.js - MVC)

```
backend/
├── config/
│   └── db.config.js       # Database connection & Sequelize initialization
├── controllers/
│   ├── auth.controller.js  # Registration, login, change password
│   ├── admin.controller.js # Admin dashboard data and user/store creation
│   ├── store.controller.js # Store listing, searching
│   └── rating.controller.js# Star rating submission, updating
├── middlewares/
│   ├── auth.middleware.js  # JWT validation, role checking
│   └── error.middleware.js # Centralized error handler
├── models/
│   ├── index.js           # Sequelize associations mapping
│   ├── user.model.js      # User model definition
│   ├── store.model.js     # Store model definition
│   └── rating.model.js    # Rating model definition
├── routes/
│   ├── auth.routes.js     # Auth routes
│   ├── admin.routes.js    # Admin management routes
│   ├── store.routes.js    # Public/User store routes
│   └── rating.routes.js   # Rating routes
├── validators/
│   ├── auth.validator.js  # Input validation for registrations and password changes
│   ├── store.validator.js # Input validation for store creation
│   └── rating.validator.js# Input validation for rating submissions
├── server.js              # Server entry point
├── package.json           # Backend dependencies
└── .env                   # Environment configurations
```

---

## Frontend Architecture (ReactJS + Vite + Material UI)

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Layout.jsx          # Responsive Dashboard Sidebar/Navbar Layout
│   │   ├── StarRating.jsx      # Beautiful interactive star component with hover states
│   │   ├── ConfirmDialog.jsx   # Reuseable confirmation modal
│   │   └── ProtectedRoute.jsx  # Role-based route guard
│   ├── context/
│   │   ├── AuthContext.jsx     # Handles user sessions, JWT storage, login/logout
│   │   └── ToastContext.jsx    # Custom Snackbar notification system
│   ├── pages/
│   │   ├── Login.jsx           # Sign in page
│   │   ├── Register.jsx        # User registration page
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx  # Charts & stats for admins
│   │   │   ├── UsersManagement.jsx # Add & view users with filters
│   │   │   └── StoresManagement.jsx# Add & view stores with ratings
│   │   ├── user/
│   │   │   └── UserDashboard.jsx   # Store list with ratings, submit ratings modal
│   │   └── owner/
│   │   │   └── OwnerDashboard.jsx  # Store Owner dashboard (ratings, customer list)
│   │   └── Profile.jsx             # Password reset & profile details
│   ├── services/
│   │   └── api.js              # Centralized Axios instance with request/response interceptors
│   ├── theme.js                # Custom MUI theme (Blue #2563EB primary, clean shadows, fonts)
│   ├── App.jsx                 # Routing and layout structure
│   └── main.jsx                # App entrypoint
├── vite.config.js              # Dev proxy configuration
└── package.json                # Frontend dependencies
```

---

## Proposed Changes

We will create the following files in the project workspace:

### Backend Development

#### [NEW] [package.json](file:///c:/Users/snshi/Desktop/cdac prep/RateHub – Store Rating Management System/backend/package.json)
Contains express, mysql2, sequelize, jsonwebtoken, bcrypt, cors, dotenv.

#### [NEW] [db.config.js](file:///c:/Users/snshi/Desktop/cdac prep/RateHub – Store Rating Management System/backend/config/db.config.js)
Sequelize configuration, connecting to MySQL database.

#### [NEW] [models](file:///c:/Users/snshi/Desktop/cdac prep/RateHub – Store Rating Management System/backend/models)
- `user.model.js`: Define Schema with validation.
- `store.model.js`: Store Schema.
- `rating.model.js`: Rating Schema.
- `index.js`: Setup relations:
  - User has one Store (as owner) or multiple stores (as owner) - we'll support 1-to-many from user (owner) to store.
  - User has many Ratings. Store has many Ratings.
  - Rating belongs to User. Rating belongs to Store.

#### [NEW] [middlewares](file:///c:/Users/snshi/Desktop/cdac prep/RateHub – Store Rating Management System/backend/middlewares)
- `auth.middleware.js`: Validate JWT and check user roles (e.g. `verifyToken`, `isAdmin`, `isStoreOwner`, `isUser`).
- `error.middleware.js`: Centralized error catching.

#### [NEW] [validators](file:///c:/Users/snshi/Desktop/cdac prep/RateHub – Store Rating Management System/backend/validators)
- Validation files using custom Joi-like or express-validator schemas, or manual code checking to ensure exact criteria. We will use a clean validation utility.
  - Password rules: 8-16 chars, 1 uppercase, 1 special character.
  - Name: 20-60 characters.
  - Address: max 400 characters.

#### [NEW] [controllers](file:///c:/Users/snshi/Desktop/cdac prep/RateHub – Store Rating Management System/backend/controllers)
- `auth.controller.js`: Handles registering, login, changing password.
- `admin.controller.js`: Fetching total metrics (users, stores, ratings), adding stores, adding users, listing users with pagination and search.
- `store.controller.js`: Store catalog fetching with search, sorting, and pagination.
- `rating.controller.js`: Creating and updating reviews, getting owner reviews.

#### [NEW] [server.js](file:///c:/Users/snshi/Desktop/cdac prep/RateHub – Store Rating Management System/backend/server.js)
Express app bootstrapping, DB syncing, loading default user (Admin) data, and starting the listener.

---

### Frontend Development

#### [NEW] [package.json](file:///c:/Users/snshi/Desktop/cdac prep/RateHub – Store Rating Management System/frontend/package.json)
Vite project setup with `@mui/material`, `@emotion/react`, `@emotion/styled`, `axios`, `react-router-dom`, `recharts`, `react-hook-form`.

#### [NEW] [vite.config.js](file:///c:/Users/snshi/Desktop/cdac prep/RateHub – Store Rating Management System/frontend/vite.config.js)
Sets up dev server on port `5173` and maps proxy `/api` to `http://localhost:5000/api`.

#### [NEW] [theme.js](file:///c:/Users/snshi/Desktop/cdac prep/RateHub – Store Rating Management System/frontend/src/theme.js)
Custom Material UI theme:
- Primary color: `#2563EB` (vibrant blue)
- Backgrounds: `#F8FAFC` (sleek SaaS light gray)
- Paper & Cards: `#FFFFFF` with soft shadows (`box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05)`)
- Font: Inter (from Google Fonts)

#### [NEW] [context](file:///c:/Users/snshi/Desktop/cdac prep/RateHub – Store Rating Management System/frontend/src/context)
- `AuthContext.jsx`: Manages current logged-in user details, localStorage persistence of token, login/logout handlers.
- `ToastContext.jsx`: Provides notification toaster using MUI Snackbar + Alert.

#### [NEW] [components](file:///c:/Users/snshi/Desktop/cdac prep/RateHub – Store Rating Management System/frontend/src/components)
- `Layout.jsx`: SaaS Navigation Shell, responsive drawer for Sidebar navigation, Topbar profile button with avatar.
- `StarRating.jsx`: Custom star component with hover state, active fill, and text labels.
- `ConfirmDialog.jsx`: Confirmation modal for actions.

#### [NEW] [pages](file:///c:/Users/snshi/Desktop/cdac prep/RateHub – Store Rating Management System/frontend/src/pages)
- `Login.jsx` & `Register.jsx`: Sleek, professional cards with form validation messages.
- `admin/AdminDashboard.jsx`: Recharts grid showing User, Store, Rating growth or statistics, plus metrics grid.
- `admin/UsersManagement.jsx`: View and add users, with page size options, column sort, and search.
- `admin/StoresManagement.jsx`: Create and view stores. Includes assigning user owners.
- `user/UserDashboard.jsx`: Store cards grid with search, average rating badge, personal ratings, and review submission button.
- `owner/OwnerDashboard.jsx`: Store stats (avg rating), rating lists with customer profiles.

---

## Verification Plan

### Automated Tests
We will verify API connectivity and database schema synchronizations:
- Test that Sequelize initializes and builds tables properly in MySQL.
- Run `node server.js` to verify application startup and database connection success.

### Manual Verification
1. Open the UI in browser, sign up as a new User.
2. Log in as ADMIN (`admin@ratehub.com` / `Admin@1234`).
3. Add a Store Owner user, and add a Store, associating it with the Store Owner.
4. Log out and log in as the USER, search the store, and leave a 4-star rating.
5. Log in as the STORE_OWNER, and verify they can see their average rating and the details of the user who rated it.
6. Verify responsive views by resizing the browser.
