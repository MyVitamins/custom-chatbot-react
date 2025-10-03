import React from 'react';
import MessageBubble from './MessageBubble';
import ButtonGroup from './ButtonGroup';
import ProductCard from './ProductCard';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';
import { type Message } from '../types';

interface MessageRendererProps {
  message: Message;
  messages: Message[];
  messageIndex: number;
  onButtonClick?: (value: string) => void;
  onQuestionClick?: (question: string) => void;
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ message, messages, messageIndex, onButtonClick, onQuestionClick }) => {
  const isUser = message.role === 'user';
  
  // Group consecutive product messages for grid layout
  const getConsecutiveProducts = () => {
    const products = [];
    let i = messageIndex;
    
    // If this is a product message, collect consecutive products
    if (message.type === 'product') {
      while (i < messages.length && messages[i].type === 'product' && messages[i].role === 'bot') {
        products.push(messages[i]);
        i++;
      }
    }
    
    return products;
  };
  
  const consecutiveProducts = getConsecutiveProducts();
  const isFirstProduct = message.type === 'product' && messageIndex === 0 || 
    (messageIndex > 0 && messages[messageIndex - 1].type !== 'product');
  
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
  
  // Handle typing indicator
  if (message.type === 'typing') {
    return <TypingIndicator />;
  }
  
      // Bot messages: professional content blocks with centered max-width
      return (
        <div className="mb-6">
          <div className="max-w-2xl mx-auto">
            {message.type === 'text' && (
              <div className="px-4 py-3">
                <div className="text-base leading-relaxed text-gray-800 dark:text-gray-100 whitespace-pre-wrap transition-colors duration-300 ease-in-out">
                  {message.content.text}
                </div>
              </div>
            )}
            
            {message.type === 'buttons' && (
              <div className="px-4 py-3">
                <ButtonGroup 
                  options={message.content.options} 
                  onButtonClick={onButtonClick || (() => {})} 
                />
              </div>
            )}
            
            {message.type === 'product' && isFirstProduct && (
              <div className="px-4 py-3">
                <div className={`grid gap-4 ${
                  consecutiveProducts.length === 1 
                    ? 'grid-cols-1 justify-center' 
                    : consecutiveProducts.length === 2 
                      ? 'grid-cols-1 md:grid-cols-2' 
                      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {consecutiveProducts.map((productMessage, index) => (
                    <ProductCard key={productMessage.id || index} {...productMessage.content} />
                  ))}
                </div>
              </div>
            )}
            
            {message.type === 'product' && !isFirstProduct && (
              // Skip rendering - this product is already rendered as part of the group
              null
            )}
            
            {message.type === 'list' && (
              <div className="px-4 py-3">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed text-gray-800 dark:text-gray-100 transition-colors duration-300 ease-in-out">
                  {message.content.items.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Dynamic Suggested Questions */}
            {message.suggestedQuestions && message.suggestedQuestions.length > 0 && onQuestionClick && (
              <SuggestedQuestions 
                onQuestionClick={onQuestionClick} 
                questions={message.suggestedQuestions}
                variant="dynamic"
              />
            )}
          </div>
        </div>
      );
};

export default MessageRenderer;