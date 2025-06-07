# Resume Builder

A modern, full-stack MERN (MongoDB, Express.js, React, Node.js) application for creating, managing, and sharing professional resumes.

## Overview
This project is built using the MERN stack:
- **M**ongoDB - Document database for storing user data and resumes
- **E**xpress.js - Node.js web application framework
- **R**eact - Frontend user interface library
- **N**ode.js - JavaScript runtime environment

## Features

- **User Authentication**
  - Secure signup and login
  - JWT-based authentication
  - Protected routes and API endpoints

- **Resume Management**
  - Create multiple resumes
  - Edit and update existing resumes
  - Delete unwanted resumes
  - Download resumes as PDF
  - Preview resumes before downloading

- **Modern UI/UX**
  - Responsive design
  - Clean and intuitive interface
  - Real-time preview
  - Form validation
  - Toast notifications

- **Profile Management**
  - Update user profile
  - Change password
  - Profile image upload

## Tech Stack

### MERN Stack Core
- MongoDB - NoSQL database
- Express.js - Web application framework
- React.js - Frontend library
- Node.js - JavaScript runtime

### Frontend
- React.js with Vite
- React Router DOM for routing
- Axios for API requests
- TailwindCSS for styling
- React Icons
- React Hot Toast for notifications
- HTML2PDF.js for PDF generation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt.js for password hashing
- Multer for file uploads

## Project Structure

```
RESUMEBUILDER/
├── frontend/
│   ├── resume-builder/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── context/
│   │   │   ├── pages/
│   │   │   ├── utils/
│   │   │   └── App.jsx
│   │   └── package.json
│   └── package.json
└── backend/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── uploads/
    └── server.js
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/RESUMEBUILDER.git
cd RESUMEBUILDER
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd ../frontend/resume-builder
npm install
```

4. Environment Variables

Create a `.env` file in the backend directory:
```env
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Create a `.env` file in the frontend/resume-builder directory:
```env
VITE_API_URL=http://localhost:8000/api
```

5. Start the Application

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend/resume-builder
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Resume
- `GET /api/resume` - Get all resumes for logged-in user
- `POST /api/resume` - Create a new resume
- `GET /api/resume/:id` - Get specific resume
- `PUT /api/resume/:id` - Update resume
- `DELETE /api/resume/:id` - Delete resume

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TailwindCSS](https://tailwindcss.com/) 