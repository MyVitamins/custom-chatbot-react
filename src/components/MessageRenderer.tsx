import React from 'react';
import MessageBubble from './MessageBubble';
import ButtonGroup from './ButtonGroup';
import Card from './Card';
import { type Message } from '../types';

interface MessageRendererProps {
  message: Message;
  onButtonClick?: (value: string) => void;
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ message, onButtonClick }) => {
  const isUser = message.role === 'user';
  
  if (isUser) {
    // User messages: right-aligned bubbles
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-xs lg:max-w-md">
          {message.type === 'text' && (
            <MessageBubble role={message.role} text={message.content.text} />
          )}
        </div>
      </div>
    );
  }
  
  // Bot messages: full-width content blocks
  return (
    <div className="mb-6">
      <div className="max-w-3xl">
        {message.type === 'text' && (
          <div className="p-4 text-gray-800 leading-relaxed">
            <div className="whitespace-pre-wrap">{message.content.text}</div>
          </div>
        )}
        
        {message.type === 'buttons' && (
          <div className="p-4">
            <ButtonGroup 
              options={message.content.options} 
              onButtonClick={onButtonClick || (() => {})} 
            />
          </div>
        )}
        
        {message.type === 'card' && (
          <div className="p-4">
            <Card {...message.content} />
          </div>
        )}
        
        {message.type === 'list' && (
          <div className="p-4">
            <ul className="list-disc list-inside space-y-2 text-gray-800 leading-relaxed">
              {message.content.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageRenderer;