import React from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const SkillsSection = ({ data = [], onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        name: '',
        progress: 50,
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
      [field]: field === 'progress' ? parseInt(value) : value,
    };
    onChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Skills</h2>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaPlus className="mr-2" /> Add Skill
        </button>
      </div>

      {data.map((skill, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4 relative">
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700">Skill Name</label>
            <input
              type="text"
              value={skill.name || ''}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., JavaScript, Python, Project Management"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Proficiency Level</label>
              <span className="text-sm text-gray-500">{skill.progress}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={skill.progress || 50}
              onChange={(e) => handleChange(index, 'progress', e.target.value)}
              className="mt-1 block w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Expert</span>
            </div>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No skills added. Click "Add Skill" to begin.
        </div>
      )}
    </div>
  );
};

export default SkillsSection; 