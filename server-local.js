// server-local.js - Local MongoDB version for testing
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

// MongoDB Connection - Local version
const connectDB = async () => {
    try {
        // Try local MongoDB first, then fallback to Atlas
        const localUri = "mongodb://localhost:27017/pacific-global-health";
        const atlasUri = "mongodb+srv://globalhealth:kTTTqqjoM4kcQg2b@cluster0.qlxqtts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        
        let conn;
        // try {
        //     console.log('🔄 Trying local MongoDB connection...');
        //     conn = await mongoose.connect(localUri, {
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true,
        //     });
        //     console.log('✅ Connected to LOCAL MongoDB!');
        // } catch (localError) {
            console.log('❌ Local MongoDB not available, trying Atlas...');
            conn = await mongoose.connect(atlasUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                retryWrites: true,
                w: 'majority',
                dbName: 'sample_mflix',
                serverApi: {
                    version: '1',
                    strict: true,
                    deprecationErrors: true,
                }
            });
            console.log('✅ Connected to MongoDB Atlas!');
        // }
        
        console.log(`📊 Host: ${conn.connection.host}`);
        console.log(`🗄️  Database: ${conn.connection.name}`);
        
        // Test the connection with a ping
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("🏓 Ping successful - MongoDB deployment is ready!");
        
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        
        if (error.message.includes('authentication failed')) {
            console.error('🔒 Authentication failed - check username/password');
            console.error('💡 Make sure your IP is whitelisted in MongoDB Atlas');
        } else if (error.message.includes('network')) {
            console.error('🌐 Network error - check internet connection and IP whitelist');
        }
        
        // Don't exit, continue with in-memory storage for demo
        console.log('⚠️  Continuing with demo mode (no database)');
    }
};

// Connect to database
connectDB();

// Enhanced User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username cannot exceed 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: Date
}, {
    timestamps: true
});

// Index for better performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);

// JWT Secret
const JWT_SECRET = 'pacific-global-health-super-secret-jwt-key-2024';

// Enhanced middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Access token required',
            error: 'MISSING_TOKEN'
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid or expired token',
                error: 'INVALID_TOKEN'
            });
        }
        req.user = user;
        next();
    });
};

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// Register Route
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Enhanced validation
        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required',
                error: 'MISSING_FIELDS'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters',
                error: 'PASSWORD_TOO_SHORT'
            });
        }

        // Check username format
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return res.status(400).json({
                message: 'Username can only contain letters, numbers, and underscores',
                error: 'INVALID_USERNAME'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]
        });

        if (existingUser) {
            const field = existingUser.email === email.toLowerCase() ? 'email' : 'username';
            return res.status(400).json({
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
                error: 'USER_EXISTS',
                field
            });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log(`New user registered: ${savedUser.username} (${savedUser.email})`);

        res.status(201).json({
            message: 'User registered successfully',
            success: true,
            token,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                createdAt: savedUser.createdAt
            }
        });

    } catch (error) {
        console.error('Registration error:', error);

        // Handle duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
                error: 'DUPLICATE_KEY',
                field
            });
        }

        res.status(500).json({
            message: 'Server error during registration',
            error: 'SERVER_ERROR'
        });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required',
                error: 'MISSING_CREDENTIALS'
            });
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password',
                error: 'INVALID_CREDENTIALS'
            });
        }

        // Check if account is active
        if (!user.isActive) {
            return res.status(401).json({
                message: 'Account is deactivated. Please contact support.',
                error: 'ACCOUNT_DEACTIVATED'
            });
        }

        // Check if account is locked
        if (user.lockUntil && user.lockUntil > Date.now()) {
            return res.status(423).json({
                message: 'Account temporarily locked due to too many failed attempts',
                error: 'ACCOUNT_LOCKED'
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // Increment login attempts
            await User.findByIdAndUpdate(user._id, {
                $inc: { loginAttempts: 1 },
                $set: {
                    lockUntil: user.loginAttempts >= 4 ? Date.now() + 30 * 60 * 1000 : undefined
                }
            });

            return res.status(401).json({
                message: 'Invalid email or password',
                error: 'INVALID_CREDENTIALS'
            });
        }

        // Successful login - reset attempts and update last login
        await User.findByIdAndUpdate(user._id, {
            $set: {
                lastLogin: new Date(),
                loginAttempts: 0
            },
            $unset: { lockUntil: 1 }
        });

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log(`User logged in: ${user.username} (${user.email})`);

        res.json({
            message: 'Login successful',
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                lastLogin: user.lastLogin,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Server error during login',
            error: 'SERVER_ERROR'
        });
    }
});

// Protected Profile Route
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select('-password -loginAttempts -lockUntil')
            .lean();

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: 'USER_NOT_FOUND'
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({
            message: 'Server error fetching profile',
            error: 'SERVER_ERROR'
        });
    }
});

// Logout Route
app.post('/api/logout', authenticateToken, (req, res) => {
    console.log(`User logged out: ${req.user.username}`);
    res.json({
        message: 'Logged out successfully',
        success: true
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        message: 'Internal server error',
        error: 'SERVER_ERROR'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Route not found',
        error: 'NOT_FOUND'
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);
});

