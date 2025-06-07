import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Home/Dashboard";
import EditResume from './pages/ResumeUpdate/EditResume';
import ViewResume from './pages/ResumeView/ViewResume';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import { AuthProvider, ProtectedRoute } from './context/AuthContext';

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/*Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/resume/view/:resumeId" element={<ViewResume />} />
            
            {/*Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/resume/:resumeId" element={
              <ProtectedRoute>
                <EditResume />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </Router>

      <Toaster 
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </>
  )
}

export default App