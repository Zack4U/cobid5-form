import React from "react";

interface ScaleInputProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
  isActive: boolean;
}

const ScaleInput: React.FC<ScaleInputProps> = ({
  value,
  options,
  onChange,
  isActive,
}) => {
  const getLabel = (num: number) => {
    switch (num) {
      case 1:
        return "No Implementado";
      case 2:
        return "Parcialmente Implementado";
      case 3:
        return "Implementado";
      case 4:
        return "Gestionado";
      case 5:
        return "Optimizado";
      default:
        return num.toString();
    }
  };

  return (
    <div className="transition-all duration-300">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between px-2">
          <span className="text-sm text-gray-500">No Implementado</span>
          <span className="text-sm text-gray-500">
            Implementado y Optimizado
          </span>
        </div>

        <div className="flex justify-between items-center">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => isActive && onChange(option)}
              className={`relative flex-1 flex flex-col items-center justify-center py-3 px-1 transition-all duration-300 ${
                value === option
                  ? "bg-blue-500 text-white scale-105 z-10 shadow-md rounded-lg"
                  : isActive
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                  : "bg-gray-100 text-gray-500 rounded-lg"
              }`}
              disabled={!isActive}
            >
              <span className="text-lg font-semibold">{option}</span>
              <span className="text-xs mt-1">{getLabel(option)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScaleInput;
