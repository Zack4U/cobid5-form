import React from 'react';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  isActive: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, isActive }) => {
  return (
    <div className="transition-all duration-300">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-lg border ${
          isActive 
            ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
            : 'border-gray-300'
        } shadow-sm focus:outline-none transition-all`}
        disabled={!isActive}
      />
    </div>
  );
};

export default DateInput;