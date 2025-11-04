import type { FC } from "react";
import { ChatProvider } from "../../contexts";
import { ChatbotContent } from "./ChatbotContent";

export interface ChatbotProps {
  isThemeRequired?: boolean;
  baseFontSize?: number;
  sidebarZIndex?: number;
  maxHeight?: number;
}

export const Chatbot: FC<ChatbotProps> = ({ 
  isThemeRequired = false, 
  baseFontSize = 16,
  sidebarZIndex = 50,
  maxHeight
}) => {
  return (
    <ChatProvider>
      <ChatbotContent 
        isThemeRequired={isThemeRequired} 
        baseFontSize={baseFontSize}
        sidebarZIndex={sidebarZIndex}
        maxHeight={maxHeight}
      />
    </ChatProvider>
  );
};
