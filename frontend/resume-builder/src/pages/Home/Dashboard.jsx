import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaDownload } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/resume', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setResumes(response.data);
    } catch (err) {
      console.error('Failed to load resumes:', err);
      if (err.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
      } else {
        toast.error('Failed to load resumes');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/resume/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Resume deleted successfully');
      fetchResumes();
    } catch (err) {
      console.error('Failed to delete resume:', err);
      toast.error('Failed to delete resume');
    }
  };

  const handleDownload = async (id) => {
    try {
      window.open(`/resume/view/${id}`, '_blank');
    } catch (err) {
      console.error('Failed to download resume:', err);
      toast.error('Failed to download resume');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Resumes</h2>
            <Link
              to="/resume/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaPlus className="mr-2" /> Create New Resume
            </Link>
          </div>

          {resumes.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
              <p className="text-gray-500">Create your first resume to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resumes.map((resume) => (
                <div
                  key={resume._id}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {resume.title || 'Untitled Resume'}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {new Date(resume.updatedAt).toLocaleDateString()}
                      </span>
                    </div>

                    {resume.thumbnailLink && (
                      <img
                        src={resume.thumbnailLink}
                        alt="Resume preview"
                        className="w-full h-32 object-cover rounded mb-4"
                      />
                    )}

                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleDownload(resume._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FaDownload className="mr-2" /> Download
                      </button>
                      <Link
                        to={`/resume/${resume._id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FaEdit className="mr-2" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(resume._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;