import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  isActive: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, isActive }) => {
  return (
    <div className="transition-all duration-300">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-lg border ${
          isActive 
            ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
            : 'border-gray-300'
        } shadow-sm resize-none focus:outline-none transition-all`}
        placeholder="Escriba su respuesta aquí..."
        disabled={!isActive}
        rows={4}
      />
    </div>
  );
};

export default TextInput;