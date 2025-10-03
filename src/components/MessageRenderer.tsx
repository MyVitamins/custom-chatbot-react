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
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'order-2' : 'order-1'}`}>
        {message.type === 'text' && (
          <MessageBubble role={message.role} text={message.content.text} />
        )}
        
        {message.type === 'buttons' && (
          <ButtonGroup 
            options={message.content.options} 
            onButtonClick={onButtonClick || (() => {})} 
          />
        )}
        
        {message.type === 'card' && (
          <Card {...message.content} />
        )}
        
        {message.type === 'list' && (
          <ul className="list-disc list-inside space-y-1">
            {message.content.items.map((item: string, index: number) => (
              <li key={index} className="text-sm">{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MessageRenderer;