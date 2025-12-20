# Lynko 🔗

One link for everything. Share all your links in one place.

![Lynko Preview](https://github.com/user-attachments/assets/f6797474-0694-4e38-8517-6d3a31d5ebf5)

## What is this?

A link-in-bio app where you get one URL to share everywhere. Add all your social media, portfolio, store, whatever - visitors see everything on one clean page.

## Setup
**Backend** (`/backend/.env`):
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key
PORT=5000
```

**Frontend** (`/frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```