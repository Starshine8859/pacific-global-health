# Login System Setup Guide

This guide will help you set up and test the complete login system for Pacific Global Health.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Backend Server
```bash
npm run server
```
The server will start on `http://localhost:3001`

### 3. Start the Frontend (in a new terminal)
```bash
npm run dev
```
The frontend will start on `http://localhost:3000`

## 📋 Features

### ✅ Completed Features
- **User Registration**: Create new accounts with username, email, and password
- **User Login**: Secure authentication with JWT tokens
- **Password Security**: Passwords are hashed using bcrypt
- **Session Management**: JWT tokens stored in localStorage
- **User Interface**: Beautiful login/registration modal
- **Navigation Integration**: Login/logout buttons in navigation
- **MongoDB Integration**: User data stored in MongoDB Atlas
- **Account Security**: Login attempt tracking and account locking

### 🔧 Technical Details

#### Backend (server.js)
- **Express.js** server with MongoDB connection
- **Mongoose** for database operations
- **JWT** for authentication tokens
- **bcryptjs** for password hashing
- **CORS** enabled for frontend communication

#### Frontend
- **React Context** for authentication state management
- **Login Modal** with registration option
- **Navigation** shows user status and logout option
- **Responsive Design** works on mobile and desktop

#### Database Schema
```javascript
{
  username: String (unique, required)
  email: String (unique, required)
  password: String (hashed, required)
  isActive: Boolean (default: true)
  lastLogin: Date
  loginAttempts: Number (default: 0)
  lockUntil: Date (for account locking)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## 🧪 Testing

### Test the Login System
```bash
node test-login.js
```

This will test:
- User registration
- User login
- Profile access with authentication

### Manual Testing
1. Open `http://localhost:3000`
2. Click the "Login" button in the navigation
3. Try registering a new account
4. Try logging in with your credentials
5. Check that the navigation shows your username
6. Try logging out

## 🔐 API Endpoints

### POST /api/register
Register a new user
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### POST /api/login
Login with existing credentials
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### GET /api/profile
Get user profile (requires authentication)
Headers: `Authorization: Bearer <token>`

### POST /api/logout
Logout (requires authentication)
Headers: `Authorization: Bearer <token>`

### GET /api/health
Health check endpoint

## 🗄️ Database Configuration

The system is configured to use your MongoDB Atlas cluster:
- **Database**: `sample_mflix`
- **Username**: `globalhealth`
- **Password**: `ydtpHayBnv7YYl0U`
- **Cluster**: `cluster0.qlxqtts.mongodb.net`

## 🛠️ Configuration Files

### config.js
Contains all configuration settings:
- MongoDB connection string
- JWT secret
- Server port
- API URL

### server.js
Main backend server with:
- Database connection
- User schema and model
- Authentication middleware
- API routes
- Error handling

## 🔒 Security Features

1. **Password Hashing**: All passwords are hashed with bcrypt
2. **JWT Tokens**: Secure authentication tokens
3. **Account Locking**: Accounts are locked after 5 failed login attempts
4. **Input Validation**: Server-side validation for all inputs
5. **CORS Protection**: Configured for specific origins
6. **Error Handling**: Comprehensive error handling and logging

## 🚨 Troubleshooting

### Server Won't Start
- Check if MongoDB connection string is correct
- Ensure all dependencies are installed
- Check if port 3001 is available

### Login Not Working
- Verify server is running on port 3001
- Check browser console for errors
- Ensure MongoDB connection is working

### Database Connection Issues
- Verify MongoDB Atlas cluster is accessible
- Check IP whitelist in MongoDB Atlas
- Verify username and password are correct

## 📝 Next Steps

The login system is now fully functional! You can:
1. Add more user fields to the schema
2. Implement password reset functionality
3. Add user roles and permissions
4. Create protected routes
5. Add email verification
6. Implement social login (Google, Facebook, etc.)

## 🎉 Success!

Your login system is ready to use! Users can now:
- Register new accounts
- Login securely
- Access protected content
- Logout safely

The system is production-ready with proper security measures and error handling.

