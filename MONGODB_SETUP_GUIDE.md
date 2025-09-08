# MongoDB Atlas Connection Setup Guide

## Current Issue
Your MongoDB connection is failing because the password in the connection string is incorrect or the user doesn't have proper permissions.

## How to Fix

### Step 1: Get Your MongoDB Atlas Password

1. **Go to MongoDB Atlas Dashboard**
   - Visit: https://cloud.mongodb.com
   - Log in with your MongoDB Atlas account

2. **Navigate to Database Access**
   - In the left sidebar, click "Database Access"
   - Find the user "globalhealth"

3. **Reset the Password**
   - Click "Edit" next to the globalhealth user
   - Click "Edit Password"
   - Generate a new password or enter a custom one
   - **Copy the password** (you'll need it for the connection string)

### Step 2: Update Your Connection String

1. **Open `server.js`**
2. **Find this line** (around line 23):
   ```javascript
   const MONGODB_URI = "mongodb+srv://globalhealth:<db_password>@cluster0.qlxqtts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
   ```

3. **Replace `<db_password>` with your actual password**:
   ```javascript
   const MONGODB_URI = "mongodb+srv://globalhealth:YOUR_ACTUAL_PASSWORD@cluster0.qlxqtts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
   ```

### Step 3: Check Network Access

1. **Go to Network Access**
   - In MongoDB Atlas, click "Network Access" in the left sidebar
   - Make sure your IP address is whitelisted
   - For development, you can add `0.0.0.0/0` to allow all IPs (not recommended for production)

### Step 4: Test the Connection

Run the test script to verify your connection:
```bash
node test-connection.js
```

### Alternative: Create a New Database User

If you can't access the existing user, create a new one:

1. **In Database Access, click "Add New Database User"**
2. **Choose "Password" authentication**
3. **Create username and password**
4. **Grant "Read and write to any database" permissions**
5. **Use the new credentials in your connection string**

## Example Working Connection String

```javascript
const MONGODB_URI = "mongodb+srv://globalhealth:MySecurePassword123@cluster0.qlxqtts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
```

## Security Notes

- Never commit passwords to version control
- Use environment variables in production
- Consider using MongoDB Atlas connection string with environment variables

## Troubleshooting

- **Authentication failed**: Check username and password
- **Network timeout**: Check IP whitelist in Network Access
- **Connection refused**: Check if cluster is running (not paused)

## Next Steps

Once you've updated the password in `server.js`, you can:
1. Test the connection: `node test-connection.js`
2. Start your server: `node server.js`
3. Test the API endpoints

