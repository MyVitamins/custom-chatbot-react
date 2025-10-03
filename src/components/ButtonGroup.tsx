import React from 'react';

interface ButtonGroupProps {
  content: {
    text?: string;
    options: string[];
  };
  onButtonClick: (value: string) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ content, onButtonClick }) => {
  return (
    <div className="mb-4">
      {content.text && (
        <p className="text-gray-700 mb-3">{content.text}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {content.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onButtonClick(option)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
