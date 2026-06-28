# Tracker Pay: MERN Expense Tracker 💸

Tracker Pay is a premium, modern, and fully featured MERN stack Expense Tracker. It features a sleek glassmorphic dark-mode dashboard built with React 19 and Tailwind CSS v4, connected to a robust Node.js/Express API and MongoDB database.

---

## ✨ Features

- **📊 Centralized Financial Dashboard:** Instantly tracks your Total Income, Total Expenses, and Net Balance in Indian Rupees (₹).
- **📈 Category Expense Breakdown:** A dynamic sorting bar chart that lists your expenses categorized (Food, Transport, Bills, etc.) and visualizes their percentage share of your total budget.
- **🔍 Real-Time Search & Filters:** Instantly search through your transaction history or filter by type (All, Income, Expense).
- **✏️ Full CRUD Capability:** Dynamically add, edit, and delete transactions with immediate, state-synced UI updates.
- **🔔 Floating Toast Notifications:** Clean, animated popup alerts confirming successful database actions (creating, updating, and deleting).
- **🔒 Backend Validation:** Enforced Mongoose constraints on categories and strict API validations on input parameters, checking for invalid MongoDB IDs.
- **📡 CORS Enabled:** Out-of-the-box support for API requests coming from cross-origin frontend clients.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Tailwind CSS v4, Axios, React Context API.
- **Backend:** Node.js, Express, MongoDB (Mongoose), dotenv, cors.

---

## 📂 Project Structure

```text
MERN-Expense-Tracker/
├── Backend/
│   ├── src/
│   │   ├── controllers/      # API logic (CRUD actions & validations)
│   │   ├── models/           # MongoDB Mongoose Schemas (Transaction, Summary)
│   │   ├── routes/           # Express Route definitions
│   │   ├── db/               # Database connection setup
│   │   └── app.js            # Express app configuration
│   ├── server.js             # Server entry point
│   └── package.json
└── Frontend/
    ├── src/
    │   ├── components/       # UI Components (Navbar, Dashboard, Form, List, Breakdown)
    │   ├── context/          # React Context (TransactionContext global state)
    │   ├── services/         # Axios API service wrapper
    │   ├── App.jsx           # Main layout and Toast renderer
    │   ├── main.jsx          # React app entry point
    │   └── index.css         # Tailwind directives & scrollbar styles
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB account or local installation

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` root folder and add your MongoDB connection URI and server port:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the development server (runs on `http://localhost:3000`):
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server (runs on `http://localhost:5173`):
   ```bash
   npm run dev
   ```

Open your browser and navigate to `http://localhost:5173` to start tracking!

---

## 📡 API Endpoints

All backend routes are prefixed with `/api/transaction`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/create` | Creates a new transaction (validates fields & enums) |
| **GET** | `/all` | Fetches all transactions (sorted by newest first) |
| **GET** | `/summary` | Aggregates and returns total income, total expense, and balance |
| **GET** | `/:id` | Fetches a single transaction by ID (validates MongoDB ID) |
| **PATCH** | `/update/:id` | Updates a transaction by ID (validates ID & runs validations) |
| **DELETE** | `/delete/:id` | Deletes a transaction by ID (validates MongoDB ID) |

---

## 📄 License
This project is licensed under the ISC License.
