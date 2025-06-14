// BASE_URL configuration:
// - In development (npm run dev): "http://localhost:8000"
// - In production (after build): "" (empty string for relative paths, works with Vercel proxy)
export const BASE_URL = import.meta.env.DEV ? "http://localhost:8000" : "";

//utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        REGISTER : "/api/auth/register", // Signup
        LOGIN : "/api/auth/login", // Authenticate user and return JWT token
        GET_PROFILE : "/api/auth/profile", // Get logged-in user details
    },
    RESUME: {
        CREATE : "/api/resume", // POST- Create a new resume
        GET_ALL : "/api/resume", // GET- Get all resumes of logged-in user
        GET_BY_ID : (id) => `/api/resume/${id}`, // GET- Get a specific resume
        UPDATE : (id) => `/api/resume/${id}`,  // PUT- Update a resume
        DELETE : (id) => `/api/resume/${id}`, // DELETE- Delete a resume
        UPLOAD_IMAGES : (id) => `/api/resume/${id}/upload-images`, //PUT- Upload Thumbnail and Resume profile images
    },
    IMAGE: {
        UPLOAD_IMAGES : "/api/auth/upload-image",
    },
};