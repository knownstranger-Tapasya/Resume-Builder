import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const InterestsSection = ({ data = [], onChange }) => {
  const [newInterest, setNewInterest] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newInterest.trim()) {
      onChange([...data, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemove = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Interests & Hobbies</h2>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Add an interest or hobby"
        />
        <button
          type="submit"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaPlus className="mr-2" /> Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {data.map((interest, index) => (
          <div
            key={index}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center gap-2"
          >
            <span>{interest}</span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-gray-500 hover:text-red-600"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No interests added. Add your hobbies and interests above.
        </div>
      )}
    </div>
  );
};

export default InterestsSection;
