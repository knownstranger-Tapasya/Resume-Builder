import React from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const CertificationsSection = ({ data = [], onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        title: '',
        issuer: '',
        year: '',
      },
    ]);
  };

  const handleRemove = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: value,
    };
    onChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Certifications</h2>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaPlus className="mr-2" /> Add Certification
        </button>
      </div>

      {data.map((certification, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4 relative">
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700">Certification Title</label>
            <input
              type="text"
              value={certification.title || ''}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., AWS Certified Solutions Architect"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
            <input
              type="text"
              value={certification.issuer || ''}
              onChange={(e) => handleChange(index, 'issuer', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., Amazon Web Services"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              value={certification.year || ''}
              onChange={(e) => handleChange(index, 'year', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="YYYY"
            />
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No certifications added. Click "Add Certification" to begin.
        </div>
      )}
    </div>
  );
};

export default CertificationsSection; 