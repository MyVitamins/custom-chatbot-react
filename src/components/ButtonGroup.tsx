import React from 'react';

interface ButtonGroupProps {
  buttons: Array<{
    text: string;
    value: string;
  }>;
  onButtonClick: (value: string) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, onButtonClick }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => onButtonClick(button.value)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
