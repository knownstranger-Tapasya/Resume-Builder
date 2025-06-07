import React from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const EducationSection = ({ data = [], onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
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
        <h2 className="text-xl font-semibold">Education</h2>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaPlus className="mr-2" /> Add Education
        </button>
      </div>

      {data.map((education, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4 relative">
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700">Degree</label>
            <input
              type="text"
              value={education.degree || ''}
              onChange={(e) => handleChange(index, 'degree', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Bachelor of Science in Computer Science"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Institution</label>
            <input
              type="text"
              value={education.institution || ''}
              onChange={(e) => handleChange(index, 'institution', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="University Name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="text"
                value={education.startDate || ''}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="MM/YYYY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="text"
                value={education.endDate || ''}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="MM/YYYY or Expected MM/YYYY"
              />
            </div>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No education added. Click "Add Education" to begin.
        </div>
      )}
    </div>
  );
};

export default EducationSection; 