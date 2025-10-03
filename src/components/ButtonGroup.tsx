import React from 'react';

interface ButtonGroupProps {
  options: string[];
  onButtonClick: (value: string) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ options, onButtonClick }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onButtonClick(option)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            {option}
          </button>
        ))}
    </div>
  );
};

export default ButtonGroup;
