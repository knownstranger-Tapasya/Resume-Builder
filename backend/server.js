require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const { apiLimiter, authLimiter, pdfLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const path = require("path");
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const resumeRoutes = require('./routes/resumeRoutes')

const app = express();

const allowedOrigins = [
    'https://resume-builder-five-flax.vercel.app',
    'https://resume-builder-git-main-knownstrangertapasyas-projects.vercel.app',
    'http://localhost:5173'
];

//Middleware to handle CORS
app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    })
);

//Connect Database
connectDB();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Resume Builder API is running',
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

//Rate limiting
app.use('/api/', apiLimiter);
app.use('/api/auth/', authLimiter);
app.use('/api/resume/download', pdfLimiter);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

//Server uploads folder
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"), {
        setHeaders: (res, path) => {
            res.set("Access-Control-Allow-Origin", allowedOrigins.join(', '));
        },
    })
);

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

//Error handling
app.use(errorHandler);

//MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));