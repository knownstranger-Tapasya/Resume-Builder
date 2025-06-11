import React from 'react';

const MonthInput = ({ label, value, onChange, placeholder, error }) => {
  // Convert date string to YYYY-MM format for input[type="month"]
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    // If already in YYYY-MM format, return as is
    if (/^\d{4}-\d{2}$/.test(dateStr)) return dateStr;
    // If in MM/YYYY format, convert to YYYY-MM
    const parts = dateStr.split('/');
    if (parts.length === 2) {
      const [month, year] = parts;
      return `${year}-${month.padStart(2, '0')}`;
    }
    return dateStr;
  };

  // Convert YYYY-MM format to MM/YYYY for display
  const handleDateChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue) {
      onChange(e);
      return;
    }
    // Convert YYYY-MM to MM/YYYY
    const [year, month] = inputValue.split('-');
    const formattedDate = `${month}/${year}`;
    onChange({ ...e, target: { ...e.target, value: formattedDate } });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="month"
        value={formatDateForInput(value)}
        onChange={handleDateChange}
        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        }`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default MonthInput; 