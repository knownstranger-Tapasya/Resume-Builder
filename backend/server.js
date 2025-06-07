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

//Middleware to handle CORS
app.use(
    cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    })
);

//Connect Database
connectDB();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
        setHeaders: (res,path) => {
            res.set("Access-Control-Allow-Origin", "http://localhost:5173");
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