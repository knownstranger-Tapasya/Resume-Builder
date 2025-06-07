const rateLimit = require('express-rate-limit');

// General API rate limit - 100 requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Auth rate limit - 20 requests per 15 minutes during development
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Increased from 5 to 20 for development
  message: 'Too many authentication attempts, please try again after 15 minutes'
});

// PDF generation rate limit - 10 requests per hour
const pdfLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: 'PDF generation limit reached, please try again after an hour'
});

module.exports = {
  apiLimiter,
  authLimiter,
  pdfLimiter
}; 