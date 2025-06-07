import React from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const ProjectsSection = ({ data = [], onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        title: '',
        description: '',
        github: '',
        liveDemo: '',
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
        <h2 className="text-xl font-semibold">Projects</h2>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaPlus className="mr-2" /> Add Project
        </button>
      </div>

      {data.map((project, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4 relative">
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Title</label>
            <input
              type="text"
              value={project.title || ''}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Project Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={project.description || ''}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Describe the project, technologies used, and your role..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">GitHub Repository</label>
            <input
              type="url"
              value={project.github || ''}
              onChange={(e) => handleChange(index, 'github', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="https://github.com/username/project"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Live Demo URL</label>
            <input
              type="url"
              value={project.liveDemo || ''}
              onChange={(e) => handleChange(index, 'liveDemo', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="https://project-demo.com"
            />
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No projects added. Click "Add Project" to begin.
        </div>
      )}
    </div>
  );
};

export default ProjectsSection; 