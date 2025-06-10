import React, { useState } from 'react';
import { FaUpload, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfileSection = ({ data, onChange, errors = {} }) => {
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        '/api/auth/upload-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      onChange({
        ...data,
        profileImageUrl: response.data.imageUrl
      });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onChange({
      ...data,
      profileImageUrl: ''
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Profile Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={data?.fullName || ''}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
            errors.fullName
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Designation</label>
        <input
          type="text"
          name="designation"
          value={data?.designation || ''}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
            errors.designation
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          placeholder="Software Engineer"
        />
        {errors.designation && (
          <p className="mt-1 text-sm text-red-600">{errors.designation}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
        <textarea
          name="summary"
          value={data?.summary || ''}
          onChange={handleChange}
          rows={4}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
            errors.summary
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          placeholder="Brief professional summary..."
        />
        {errors.summary && (
          <p className="mt-1 text-sm text-red-600">{errors.summary}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Profile Image</label>
        <div className="mt-1 flex items-center space-x-4">
          {data?.profileImageUrl ? (
            <div className="relative">
              <img
                src={data.profileImageUrl}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              >
                <FaTrash className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <FaUpload className="mr-2" />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Upload a professional profile photo (max 2MB)
        </p>
      </div>
    </div>
  );
};

export default ProfileSection; 