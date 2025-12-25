# Marwadtech

A full-stack MERN application with authentication, dashboard analytics, product management, and media upload functionality.

## Tech Stack

**Frontend:**
- React + Vite
- React Router
- Axios
- Tailwind CSS

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)
- Bcrypt (password hashing)

## Setup

### Prerequisites
- Node.js (v14+)
- MongoDB
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Marwadtech
```

2. **Backend Setup**
```bash
cd Backend
npm install
```

Create `.env` file in Backend folder:
```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

3. **Frontend Setup**
```bash
cd Frontend
npm install
```

## Running the Application

**Backend:**
```bash
cd Backend
npm start
```
Server runs on `http://localhost:5000`

**Frontend:**
```bash
cd Frontend
npm run dev
```
Client runs on `http://localhost:5173`

## Features

- **Authentication**: Register, Login, JWT-based auth
- **Dashboard**: View statistics (users, products, orders, revenue)
- **Products**: Search and view product listings
- **Media Upload**: Upload and preview images

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new user |
| POST | `/api/login` | Login user |
| GET | `/api/dashboard/dashboard` | Get dashboard stats |
| GET | `/api/products` | Get all products |
| POST | `/api/upload-image` | Upload image |

## Project Structure

```
Marwadtech/
├── Backend/
│   ├── controllers/     # Route handlers
│   ├── models/         # MongoDB schemas
│   ├── routers/        # API routes
│   ├── middlewares/    # Auth & upload middleware
│   ├── uploads/        # Uploaded files
│   └── server.js       # Entry point
├── Frontend/
│   ├── src/
│   │   ├── pages/      # Login, Register, Dashboard, Products, MediaUpload
│   │   ├── context/    # Auth context
│   │   ├── components/ # ProtectedRoute, Layout
│   │   └── api/        # Axios configuration
│   └── index.html
└── README.md
```

## Default Credentials
After registration, use your mobile number (10 digits) and password to login.

## License
MIT
