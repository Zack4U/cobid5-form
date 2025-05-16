import React from 'react';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  isActive: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, isActive }) => {
  return (
    <div className="transition-all duration-300">
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-lg border ${
          isActive 
            ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
            : 'border-gray-300'
        } shadow-sm focus:outline-none transition-all`}
        placeholder="ejemplo@empresa.com"
        disabled={!isActive}
      />
    </div>
  );
};

export default EmailInput;