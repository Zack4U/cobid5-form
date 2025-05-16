import React from "react";

interface SelectInputProps {
  value: string;
  options: (string | number)[];
  onChange: (value: string) => void;
  isActive: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  value,
  options,
  onChange,
  isActive,
}) => {
  return (
    <div className="transition-all duration-300">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-lg border ${
          isActive
            ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            : "border-gray-300"
        } bg-white shadow-sm focus:outline-none transition-all`}
        disabled={!isActive}
      >
        <option value="">Seleccione una opción</option>
        {options.map((option, index) => (
          <option key={index} value={option.toString()}>
            {option.toString()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
