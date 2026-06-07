# RateHub – Store Rating Management System

RateHub is a production-ready, full-stack store rating management system built with a React (Vite) frontend, Node/Express backend, and MySQL database (using Sequelize ORM). It features a modern, premium **Purple SaaS theme**, role-based access control (RBAC), analytical dashboards, and real-time review submissions.

---

## 🚀 Key Features

### 🔐 1. Authentication & Authorization
* **Single Login System**: One central login form that automatically routes users to their corresponding dashboards based on their role.
* **JWT Security**: Secures all REST endpoints and holds user state.
* **Role-Based Guards (RBAC)**: Support for three distinct role domains:
  * `ADMIN`
  * `STORE_OWNER`
  * `USER`

### 🎨 2. Premium Purple SaaS Theme & UI
* **Elegant Colors**: Designed with HSL tailored purple shades (`#7C3AED` primary, `#9333EA` secondary, `#A855F7` accent) and neutral backgrounds (`#F8FAFC`).
* **Visual Excellence**: Uses Google Fonts (Inter), smooth gradients, subtle micro-animations, floating background gradient shapes, and modern frosted glassmorphism (`backdrop-filter`) card styles.
* **Responsive Layouts**: Designed to be fully responsive for desktop, tablet, and mobile views.

### 🌐 3. Public Landing Experience
* **Home Page**: A beautiful startup landing page featuring hero call-to-actions, brand integrations, feature benefit cards, and interactive steps.
* **About Us Page**: Introduces the platform mission and transparency values.
* **Contact Us Page**: Houses contact details and a modern glassmorphic inquiry form.
* **Privacy Policy**: Standard user privacy guidelines page.

### 👥 4. User Features (Customers)
* **Registration**: Public registration form validating name (20-60 chars), email, address (max 400 chars), and password strength.
* **Store Directory**: Interactive grid catalog of all registered stores with names, locations, and real-time average star ratings.
* **Interactive Star Rating**: Leave reviews (1-5 stars) using a custom star component with hover highlight scaling, active labels, and simple updates.
* **Security Settings**: Customers can securely change their passwords from their profiles.

### 🏢 5. Store Owner Features
* **Multi-Store Management**: Owners can own multiple stores. A dropdown selection allows switching analytics dashboard data instantly.
* **Store Analytics Card**: View real-time store averages, rating trends, and review volume.
* **Customer List**: A table displaying customer profiles (names, emails, addresses, review dates) who rated their store.
* **Rating Distributions Chart**: Interactive Recharts bar chart detailing rating frequencies (1 to 5 stars) using the primary purple palette.

### 🛠️ 6. Admin Features
* **SaaS Analytics Dashboard**: Overall metric summaries (Total Users, Total Stores, Total Ratings, Global Average).
* **Charts**: Recharts breakdown showing comparative counts and user role distributions.
* **User Management Directory**: Add users of any role, search user records, sort columns, view paginated users list, and pull drawers showing user detail cards + rating history.
* **Store Management Directory**: Add stores, assign/change store owners, and view reviews.

---

## 🛠️ Tech Stack & Architecture

### Backend (Express.js + Sequelize)
* **Design Pattern**: MVC (Model-View-Controller)
* **ORM**: Sequelize for database migrations, model definitions, and relational mapping.
* **Password Hashing**: Bcrypt (rounds: 10)
* **Auth**: JSON Web Tokens (JWT)
* **Validations**: Form input checkers verifying structural rules and string lengths.
* **Error Handling**: Centralized global middleware catching database constraint failures and server exceptions.

### Database Design (MySQL)
* **`users`**: User profiles with unique email indexes.
* **`stores`**: Registered store entities containing a foreign key referencing `users.id` (on delete set null).
* **`ratings`**: Star ratings (1-5 range) containing foreign keys referencing `users.id` and `stores.id` (on delete cascade) with a composite unique index on `(userId, storeId)` to prevent duplicate reviews.

### Frontend (ReactJS + Vite + Material UI)
* **Framework**: React (Vite build bundler)
* **Styling**: Material UI (MUI v9) with custom HSL Purple theme, frosted glassmorphism elements, and sleek shadows.
* **Routing**: React Router (v7) with client-side role guards.
* **Charts**: Recharts responsive charts.
* **Form Engine**: React Hook Form for client-side field validation.
* **HTTP Client**: Axios with global interceptors attaching JWTs and handles session timeouts (401).
* **Notifiers**: Snackbar alert toasts.

---

## 📂 Project Directory Structure

```
RateHub – Store Rating Management System/
├── backend/
│   ├── config/
│   │   └── db.config.js       # Database connection & auto-creation checks
│   ├── controllers/
│   │   ├── admin.controller.js# Admin dashboard metrics & catalog managers
│   │   ├── auth.controller.js # Signups, logins, and password resets
│   │   ├── rating.controller.js# Rating submissions & owner report creators (multi-store support)
│   │   └── store.controller.js# Customer store searches
│   ├── middlewares/
│   │   ├── auth.middleware.js  # JWT parser & role verification guards
│   │   └── error.middleware.js # Standardized error formatter
│   ├── models/
│   │   ├── index.js           # Relational schema mappings
│   │   ├── rating.model.js    # Ratings schema & validators
│   │   ├── store.model.js     # Stores schema & validators
│   │   └── user.model.js      # Users schema & validators
│   ├── routes/
│   │   ├── admin.routes.js    # Admin endpoints
│   │   ├── auth.routes.js     # Public auth endpoints
│   │   ├── rating.routes.js   # Review submission endpoints
│   │   └── store.routes.js    # Store browsing endpoints
│   ├── validators/
│   │   ├── auth.validator.js  # Inputs validator rules (name, password strength)
│   │   ├── rating.validator.js# Input validations for reviews
│   │   └── store.validator.js # Input validations for stores
│   ├── .env                   # Configuration parameters (ignored from git)
│   ├── .env.example           # Example configuration template
│   ├── server.js              # Server entry point & seeders loader
│   └── package.json           # Backend dependency configuration
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── ConfirmDialog.jsx   # Dialog modal for events
    │   │   ├── Layout.jsx          # SaaS Drawer Layout for logged-in dashboards
    │   │   ├── ProtectedRoute.jsx  # Route guard checking authorization
    │   │   ├── PublicHeader.jsx    # Sticky transparent frosted navbar
    │   │   ├── PublicFooter.jsx    # Minimalist clean public footer
    │   │   └── StarRating.jsx      # Custom review rating component
    │   ├── context/
    │   │   ├── AuthContext.jsx     # Global authentication manager
    │   │   └── ToastContext.jsx    # Snackbar notifications provider
    │   ├── pages/
    │   │   ├── admin/
    │   │   │   ├── AdminDashboard.jsx# Metrics dashboards
    │   │   │   ├── StoresManagement.jsx# Store management panels
    │   │   │   └── UsersManagement.jsx # User directory & details
    │   │   ├── owner/
    │   │   │   └── OwnerDashboard.jsx# Analytics and reviews list (multi-store selector)
    │   │   ├── user/
    │   │   │   └── UserDashboard.jsx # Store catalog grids and ratings
    │   │   ├── Home.jsx            # SaaS Marketing Landing page
    │   │   ├── About.jsx           # Public About Us page
    │   │   ├── Contact.jsx         # Public Contact Us page
    │   │   ├── Privacy.jsx         # Public Privacy Policy page
    │   │   ├── Login.jsx           # Split-screen sign-in page with branding
    │   │   ├── Profile.jsx         # Profile information and password reset
    │   │   └── Register.jsx        # Account registration
    │   ├── services/
    │   │   └── api.js              # Axios configuration with interceptors
    │   ├── App.jsx                 # Client router routes & redirection configurations
    │   ├── index.css               # Reset layout rules
    │   ├── main.jsx                # Entrypoint loader
    │   └── theme.js                # Custom MUI Purple system theme tokens
    ├── index.html                  # Core HTML container
    ├── vite.config.js              # Dev proxy configuration
    └── package.json                # Frontend dependency configuration
```

---

## ⚡ Quick Start & Deployment Guide

### Prerequisites
1. **Node.js**: Verify version using `node -v` (version `>= 18.0.0` required).
2. **MySQL**: Verify MySQL database service is running locally on port `3306`.

### 1. Database Configuration
By default, the backend expects:
* **Host**: `localhost`
* **Port**: `3306`
* **User**: `root`
* **Password**: `root` (or empty based on your system)
* **Database**: `ratehub_db` (The system will check for its existence and auto-create the database if missing).

You can customize the credentials:
1. Navigate to `backend/.env` (duplicate `backend/.env.example` if it does not exist).
2. Change `DB_USER` and `DB_PASSWORD` to your local MySQL values.

### 2. Launch the Application

#### Step A: Launch the Backend
Open a command prompt and navigate to the `backend` directory:
```bash
cd backend
npm install
npm run dev
```
*(The backend connects to MySQL, provisions database tables, runs seed data, and listens on port `5000`)*

#### Step B: Launch the Frontend
Open a separate command prompt and navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
*(The frontend will start the dev server on `http://localhost:5173/` and proxy requests to backend API)*

---

## 🔑 Seed Test Credentials

The database is pre-seeded on first launch with three testing credentials representing each access role:

| Account Type | Email | Password | Assigned Assets / Permissions |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `admin@ratehub.com` | `Admin@1234` | System dashboard, User creation, Store setup |
| **STORE_OWNER** | `owner@ratehub.com` | `Owner@1234` | Assigned to store: **Tech Emporium** |
| **USER** | `user@ratehub.com` | `User@1234` | Customer account, left review for Tech Emporium |

---

## 🧪 Verification Checkpoints

1. **Authentication Flow**: Log in using `user@ratehub.com`. Observe redirection to the Customer Dashboard.
2. **Rating Submissions**:
   * Click **Modify Rating** on "Tech Emporium" or **Submit Rating** on "Green Grocers".
   * Hover over the stars to see dynamic label descriptions.
   * Click a star to submit, verifying that the success notification toast displays.
3. **Admin Controls**:
   * Log out and log in as `admin@ratehub.com`.
   * Check stats counts and role pie charts.
   * Go to **Users Management**, click **Add User** to register a new store owner.
   * Go to **Stores Management**, click **Add Store**, and assign the newly created owner to the new store.
4. **Store Owner Analytics**:
   * Log out and log in as the newly created store owner.
   * Verify the store analytics screen shows their store's name, rating averages, and rating distribution charts.
