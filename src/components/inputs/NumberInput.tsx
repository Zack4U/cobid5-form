import React from 'react';

interface NumberInputProps {
  value: string | number;
  onChange: (value: number) => void;
  isActive: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, isActive }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange(0);
    } else {
      onChange(Number(val));
    }
  };

  return (
    <div className="transition-all duration-300">
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className={`w-full px-4 py-3 rounded-lg border ${
          isActive 
            ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
            : 'border-gray-300'
        } shadow-sm focus:outline-none transition-all`}
        placeholder="0"
        disabled={!isActive}
      />
    </div>
  );
};

export default NumberInput;