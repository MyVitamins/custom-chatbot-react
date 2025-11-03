import type { FC } from "react";
import { ChatProvider } from "../../contexts/ChatContext";
import { ChatbotContent } from "./ChatbotContent.component";

export interface ChatbotProps {
  isThemeRequired?: boolean;
  baseFontSize?: number;
}

export const Chatbot: FC<ChatbotProps> = ({ isThemeRequired = false, baseFontSize = 16 }) => {
  return (
    <ChatProvider>
      <ChatbotContent isThemeRequired={isThemeRequired} baseFontSize={baseFontSize} />
    </ChatProvider>
  );
};
