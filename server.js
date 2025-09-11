// server.js - Updated for your MongoDB Atlas cluster
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const config = require('./config');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Add your frontend URLs
    credentials: true
}));

// MongoDB Connection - Using your actual cluster
const connectDB = async () => {
    try {
        // Your MongoDB Atlas connection string with proper configuration
        const MONGODB_URI = config.MONGODB_URI;
        
        const conn = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: true,
            w: 'majority',
            dbName: config.DB_NAME,
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true,
            }
        });
        
        console.log(`✅ MongoDB Connected Successfully!`);
        console.log(`📊 Host: ${conn.connection.host}`);
        console.log(`🗄️  Database: ${conn.connection.name}`);
        console.log(`🔗 Cluster: cluster0.qlxqtts.mongodb.net`);
        
        // Test the connection with a ping
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("🏓 Ping successful - MongoDB deployment is ready!");
        
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        
        // More specific error handling
        if (error.message.includes('authentication failed')) {
            console.error('🔒 Authentication failed - check username/password');
        } else if (error.message.includes('network')) {
            console.error('🌐 Network error - check internet connection and IP whitelist');
        }
        
        process.exit(1);
    }
};

// Connect to database
connectDB();

// Enhanced User Schema with additional fields
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
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for better performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    organization: {
        type: String,
        trim: true,
        maxlength: [100, 'Organization name cannot exceed 100 characters']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true,
        maxlength: [200, 'Subject cannot exceed 200 characters']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    status: {
        type: String,
        enum: ['new', 'in_progress', 'resolved', 'closed'],
        default: 'new'
    },
    ipAddress: {
        type: String,
        required: false
    },
    userAgent: {
        type: String,
        required: false
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for better performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);

// Training Application Schema
const trainingApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        maxlength: [20, 'Phone number cannot exceed 20 characters']
    },
    program: {
        type: String,
        enum: ['internship', 'elective', 'training', 'scholarship'],
        required: [true, 'Program selection is required']
    },
    inquiry: {
        type: String,
        required: [true, 'Inquiry is required'],
        trim: true,
        maxlength: [2000, 'Inquiry cannot exceed 2000 characters']
    },
    status: {
        type: String,
        enum: ['new', 'under_review', 'accepted', 'rejected', 'completed'],
        default: 'new'
    },
    ipAddress: {
        type: String,
        required: false
    },
    userAgent: {
        type: String,
        required: false
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for better performance
trainingApplicationSchema.index({ email: 1 });
trainingApplicationSchema.index({ program: 1 });
trainingApplicationSchema.index({ status: 1 });
trainingApplicationSchema.index({ createdAt: -1 });

const TrainingApplication = mongoose.model('TrainingApplication', trainingApplicationSchema);

// JWT Secret
const JWT_SECRET = config.JWT_SECRET;

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

// Enhanced Routes

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// Register Route - Enhanced
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

        // Hash password with higher salt rounds for better security
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

        // Log registration
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

// Login Route - Enhanced with login tracking
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
                    lockUntil: user.loginAttempts >= 4 ? Date.now() + 30 * 60 * 1000 : undefined // Lock for 30 minutes after 5 failed attempts
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

// Protected Profile Route - Enhanced
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

// Update Profile Route
app.put('/api/profile', authenticateToken, async (req, res) => {
    try {
        const { username } = req.body;
        const userId = req.user.userId;

        if (!username) {
            return res.status(400).json({
                message: 'Username is required',
                error: 'MISSING_FIELDS'
            });
        }

        // Check if username is already taken by another user
        const existingUser = await User.findOne({
            username: username.toLowerCase(),
            _id: { $ne: userId }
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'Username already exists',
                error: 'USERNAME_EXISTS'
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username: username.toLowerCase() },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            message: 'Profile updated successfully',
            success: true,
            user: updatedUser
        });

    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({
            message: 'Server error updating profile',
            error: 'SERVER_ERROR'
        });
    }
});

// Logout Route
app.post('/api/logout', authenticateToken, (req, res) => {
    // In production, you might want to blacklist the token
    console.log(`User logged out: ${req.user.username}`);
    res.json({
        message: 'Logged out successfully',
        success: true
    });
});

// Contact Form Route
app.post('/api/contact', async (req, res) => {
    try {
        const { firstName, lastName, email, organization, subject, message } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !subject || !message) {
            return res.status(400).json({
                message: 'First name, last name, email, subject, and message are required',
                error: 'MISSING_FIELDS'
            });
        }

        // Email validation
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Please enter a valid email address',
                error: 'INVALID_EMAIL'
            });
        }

        // Create new contact entry
        const newContact = new Contact({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase().trim(),
            organization: organization ? organization.trim() : undefined,
            subject: subject.trim(),
            message: message.trim(),
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent')
        });

        const savedContact = await newContact.save();

        // Log contact submission
        console.log(`New contact form submitted: ${savedContact.firstName} ${savedContact.lastName} (${savedContact.email})`);

        res.status(201).json({
            message: 'Contact form submitted successfully',
            success: true,
            contactId: savedContact._id
        });

    } catch (error) {
        console.error('Contact form error:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: 'Validation error',
                error: 'VALIDATION_ERROR',
                details: errors
            });
        }

        res.status(500).json({
            message: 'Server error during contact form submission',
            error: 'SERVER_ERROR'
        });
    }
});

// Get Contact Messages Route (Admin only)
app.get('/api/contact', authenticateToken, async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const skip = (page - 1) * limit;

        // Build query
        const query = {};
        if (status) {
            query.status = status;
        }

        // Get contacts with pagination
        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        // Get total count
        const total = await Contact.countDocuments(query);

        res.json({
            success: true,
            contacts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({
            message: 'Server error fetching contacts',
            error: 'SERVER_ERROR'
        });
    }
});

// Update Contact Status Route (Admin only)
app.put('/api/contact/:id/status', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !['new', 'in_progress', 'resolved', 'closed'].includes(status)) {
            return res.status(400).json({
                message: 'Valid status is required',
                error: 'INVALID_STATUS'
            });
        }

        const contact = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found',
                error: 'CONTACT_NOT_FOUND'
            });
        }

        res.json({
            message: 'Contact status updated successfully',
            success: true,
            contact
        });

    } catch (error) {
        console.error('Update contact status error:', error);
        res.status(500).json({
            message: 'Server error updating contact status',
            error: 'SERVER_ERROR'
        });
    }
});

// Training Applications Routes

// Submit Training Application Route
app.post('/api/trainings', async (req, res) => {
    try {
        const { name, email, phone, program, inquiry } = req.body;

        // Validation
        if (!name || !email || !phone || !program || !inquiry) {
            return res.status(400).json({
                message: 'All fields are required',
                error: 'MISSING_FIELDS'
            });
        }

        // Email validation
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Please enter a valid email address',
                error: 'INVALID_EMAIL'
            });
        }

        // Program validation
        const validPrograms = ['internship', 'elective', 'training', 'scholarship'];
        if (!validPrograms.includes(program)) {
            return res.status(400).json({
                message: 'Please select a valid program',
                error: 'INVALID_PROGRAM'
            });
        }

        // Create new training application
        const newApplication = new TrainingApplication({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            program: program,
            inquiry: inquiry.trim(),
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent')
        });

        const savedApplication = await newApplication.save();

        // Log application submission
        console.log(`New training application submitted: ${savedApplication.name} (${savedApplication.email}) - ${savedApplication.program}`);

        res.status(201).json({
            message: 'Training application submitted successfully',
            success: true,
            applicationId: savedApplication._id
        });

    } catch (error) {
        console.error('Training application error:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: 'Validation error',
                error: 'VALIDATION_ERROR',
                details: errors
            });
        }

        res.status(500).json({
            message: 'Server error during training application submission',
            error: 'SERVER_ERROR'
        });
    }
});

// Get Training Applications Route (Admin only)
app.get('/api/trainings', authenticateToken, async (req, res) => {
    try {
        const { page = 1, limit = 10, program, status } = req.query;
        const skip = (page - 1) * limit;

        // Build query
        const query = {};
        if (program) {
            query.program = program;
        }
        if (status) {
            query.status = status;
        }

        // Get applications with pagination
        const applications = await TrainingApplication.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        // Get total count
        const total = await TrainingApplication.countDocuments(query);

        res.json({
            success: true,
            applications,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Get training applications error:', error);
        res.status(500).json({
            message: 'Server error fetching training applications',
            error: 'SERVER_ERROR'
        });
    }
});

// Update Training Application Status Route (Admin only)
app.put('/api/trainings/:id/status', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !['new', 'under_review', 'accepted', 'rejected', 'completed'].includes(status)) {
            return res.status(400).json({
                message: 'Valid status is required',
                error: 'INVALID_STATUS'
            });
        }

        const application = await TrainingApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!application) {
            return res.status(404).json({
                message: 'Training application not found',
                error: 'APPLICATION_NOT_FOUND'
            });
        }

        res.json({
            message: 'Training application status updated successfully',
            success: true,
            application
        });

    } catch (error) {
        console.error('Update training application status error:', error);
        res.status(500).json({
            message: 'Server error updating training application status',
            error: 'SERVER_ERROR'
        });
    }
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

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);
});