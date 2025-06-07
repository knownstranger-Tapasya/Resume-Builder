import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaDownload, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { generatePDF } from '../../utils/pdfGenerator';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  // ... existing code ...

  const handleDownload = async (id) => {
    try {
      // Navigate to the resume view page and wait for it to load
      window.open(`/resume/view/${id}`, '_blank');
    } catch (err) {
      console.error('Failed to download resume:', err);
      toast.error('Failed to download resume');
    }
  };

  // ... existing code ...
}; 