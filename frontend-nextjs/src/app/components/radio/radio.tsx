// components/CustomRadio.tsx
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface CustomRadioProps {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  value: string;
}

const CustomRadio: React.FC<CustomRadioProps> = ({ id, label, register, value }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        id={id}
        value={value}
        {...register('selectedOption')}
        className="hidden"
      />
      <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex items-center justify-center mr-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full hidden group-hover:block" />
      </div>
      <span>{label}</span>
    </label>
  );
};

export default CustomRadio;
