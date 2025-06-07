# Deployment Guide for Resume Builder

## Prerequisites
- Node.js and npm installed
- MongoDB Atlas account (for database)
- A cloud platform account (e.g., Heroku, DigitalOcean, or Railway)
- Domain name (optional)

## Backend Deployment

1. Create a MongoDB Atlas cluster:
   - Go to MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string
   - Add your IP to the allowlist

2. Set up environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   PORT=5000
   CLIENT_URL=your_frontend_domain
   NODE_ENV=production
   ```

3. Deploy backend:
   ```bash
   # Navigate to backend directory
   cd backend

   # Install dependencies
   npm install

   # Build the application
   npm run build

   # Start the server
   npm start
   ```

## Frontend Deployment

1. Set up environment variables in frontend:
   Create `.env.production` in frontend/resume-builder:
   ```
   VITE_API_URL=your_backend_api_url
   ```

2. Build and deploy frontend:
   ```bash
   # Navigate to frontend directory
   cd frontend/resume-builder

   # Install dependencies
   npm install

   # Build the project
   npm run build
   ```

3. Deploy the `dist` folder to your preferred static hosting service (Netlify, Vercel, etc.)

## Recommended Hosting Platforms

### Backend:
- Railway.app (recommended for easy deployment)
- Heroku
- DigitalOcean
- AWS Elastic Beanstalk

### Frontend:
- Vercel (recommended for React applications)
- Netlify
- GitHub Pages
- Firebase Hosting

## Post-Deployment Checklist

1. Verify API connections
2. Test user authentication
3. Check file upload functionality
4. Verify database connections
5. Test PDF generation
6. Monitor error logs
7. Set up SSL certificates

## Monitoring and Maintenance

1. Set up monitoring:
   - Use logging service (e.g., Winston)
   - Set up error tracking (e.g., Sentry)
   - Monitor server health

2. Regular maintenance:
   - Keep dependencies updated
   - Monitor database performance
   - Regular backups
   - Security patches

## Security Considerations

1. Enable CORS properly
2. Set up rate limiting
3. Use secure headers
4. Implement proper validation
5. Regular security audits

## Troubleshooting

Common issues and solutions:
1. CORS errors: Check CORS configuration and allowed origins
2. Database connection: Verify MongoDB URI and network access
3. File upload issues: Check storage permissions
4. Build errors: Clear cache and node_modules

For any issues, check the application logs and monitoring tools. 