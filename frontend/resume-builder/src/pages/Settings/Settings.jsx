import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaKey, FaBell, FaPalette, FaSave } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    theme: 'light'
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`);
        const { preferences } = response.data;
        if (preferences) {
          setSettings(prev => ({
            ...prev,
            emailNotifications: preferences.emailNotifications,
            theme: preferences.theme
          }));
        }
      } catch (err) {
        console.error('Failed to load preferences:', err);
        toast.error('Failed to load preferences');
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (settings.newPassword !== settings.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setSaving(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/change-password`,
        {
          oldPassword: settings.oldPassword,
          newPassword: settings.newPassword
        }
      );
      toast.success('Password updated successfully');
      setSettings(prev => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      console.error('Failed to update password:', err);
      toast.error(err.response?.data?.message || 'Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  const handlePreferencesChange = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/preferences`,
        {
          emailNotifications: settings.emailNotifications,
          theme: settings.theme
        }
      );
      toast.success('Preferences updated successfully');
    } catch (err) {
      console.error('Failed to update preferences:', err);
      toast.error('Failed to update preferences');
    } finally {
      setSaving(false);
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
            
            {/* Password Change Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaKey className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="oldPassword"
                      id="oldPassword"
                      value={settings.oldPassword}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={settings.newPassword}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={settings.confirmPassword}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {saving ? 'Saving...' : 'Change Password'}
                  </button>
                </div>
              </form>
            </div>

            {/* Preferences Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Preferences</h2>
              <form onSubmit={handlePreferencesChange} className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                    Email Notifications
                  </label>
                </div>

                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                    Theme
                  </label>
                  <select
                    name="theme"
                    id="theme"
                    value={settings.theme}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {saving ? (
                      'Saving...'
                    ) : (
                      <>
                        <FaSave className="mr-2" /> Save Preferences
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 