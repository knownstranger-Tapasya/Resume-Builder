import React from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import MonthInput from '../inputs/MonthInput';

const EducationSection = ({ data = [], onChange, errors = {} }) => {
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
    // Ensure the date is not empty when saving
    if ((field === 'startDate' || field === 'endDate') && value === '') {
      return;
    }
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
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                errors[`education.${index}.degree`]
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              placeholder="Bachelor of Science in Computer Science"
            />
            {errors[`education.${index}.degree`] && (
              <p className="mt-1 text-sm text-red-600">{errors[`education.${index}.degree`]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Institution</label>
            <input
              type="text"
              value={education.institution || ''}
              onChange={(e) => handleChange(index, 'institution', e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                errors[`education.${index}.institution`]
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              placeholder="University Name"
            />
            {errors[`education.${index}.institution`] && (
              <p className="mt-1 text-sm text-red-600">{errors[`education.${index}.institution`]}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <MonthInput
                label="Start Date"
                value={education.startDate || ''}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="MM/YYYY"
                error={errors[`education.${index}.startDate`]}
              />
              {errors[`education.${index}.startDate`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`education.${index}.startDate`]}</p>
              )}
            </div>
            <div>
              <MonthInput
                label="End Date"
                value={education.endDate || ''}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                placeholder="MM/YYYY or Expected YYYY"
                error={errors[`education.${index}.endDate`]}
              />
              {errors[`education.${index}.endDate`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`education.${index}.endDate`]}</p>
              )}
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