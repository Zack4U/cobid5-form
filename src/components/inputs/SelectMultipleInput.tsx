import React from "react";
import Select, { MultiValue } from "react-select";

interface MultiSelectInputProps {
  value: string[];
  options: (string | number)[];
  onChange: (value: string[]) => void;
  isActive: boolean;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  value,
  options,
  onChange,
  isActive,
}) => {
  const selectOptions = options.map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  const selectedOptions = selectOptions.filter((opt) =>
    value.includes(opt.value)
  );

  const handleChange = (
    selected: MultiValue<{ value: string; label: string }>
  ) => {
    onChange(selected ? selected.map((opt) => opt.value) : []);
  };

  return (
    <div className="transition-all duration-300">
      <Select
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        options={selectOptions}
        isDisabled={!isActive}
        placeholder="Seleccione una o varias opciones"
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
      />
    </div>
  );
};

export default MultiSelectInput;
