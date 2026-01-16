# 🚀 Urban Nest - Quick Start Guide

## ✅ Backend Setup Complete!

আপনার backend এর সব files তৈরি হয়ে গেছে! এখন এটা run করার জন্য নিচের steps follow করুন:

## 📁 Current Structure

```
urban-nest/
├── backend/                    # ✅ Backend API (Complete)
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── propertyController.js
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Property.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── propertyRoutes.js
│   │   ├── utils/
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   ├── .gitignore
│   ├── README.md
│   └── ENV_SETUP.md
└── src/                        # ✅ Frontend (Complete)
    └── ... (Next.js files)
```

## 🎯 Next Steps

### 1. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the content from ENV_SETUP.md
```

**Create `.env` file:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/urban-nest
JWT_SECRET=your_secret_key_here_change_in_production
FRONTEND_URL=http://localhost:3000
```

### 2. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt install mongodb

# Start MongoDB
# Windows: Start MongoDB service from Services
# Mac/Linux: mongod
```

**Option B: MongoDB Atlas (Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

### 3. Start Backend

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Backend will run on: **http://localhost:5000**

### 4. Start Frontend

```bash
# In a new terminal, go to project root
cd ..

# Start Next.js dev server (should already be running)
npm run dev
```

Frontend will run on: **http://localhost:3000**

## 🧪 Test the API

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 📱 Frontend Integration

Frontend এ `.env.local` file এ backend URL add করুন:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🎨 shadcn/ui Components (Already Installed)

shadcn/ui install হয়ে গেছে! এখন components add করতে পারবেন:

```bash
# Add button component
npx shadcn@latest add button

# Add card component
npx shadcn@latest add card

# Add input component
npx shadcn@latest add input

# Add form component
npx shadcn@latest add form
```

## 📝 Available Commands

### Backend
```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
```

### Frontend
```bash
npm run dev     # Start Next.js dev server
npm run build   # Build for production
npm start       # Start production server
```

## 🔧 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas, check network access and database user

### Port Already in Use
```bash
# Change PORT in backend/.env
PORT=5001
```

### CORS Error
- Check `FRONTEND_URL` in backend `.env`
- Make sure it matches your frontend URL

## 📚 Documentation

- **Backend API**: See `backend/README.md`
- **Environment Setup**: See `backend/ENV_SETUP.md`
- **Frontend**: See main `README.md`

## 🎉 You're All Set!

1. ✅ Frontend with Next.js + Tailwind + shadcn/ui
2. ✅ Backend with Express + MongoDB + JWT
3. ✅ Complete authentication system
4. ✅ Property CRUD operations
5. ✅ Search and filter functionality

---

**Need Help?**
- Check README files in each folder
- Review ENV_SETUP.md for environment configuration
- Make sure both servers are running

Happy Coding! 🚀
