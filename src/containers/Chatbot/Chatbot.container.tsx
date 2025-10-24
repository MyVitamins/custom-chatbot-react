import type { FC } from "react";
import { ChatProvider } from "../../contexts/ChatContext";
import { ChatbotContent } from "./ChatbotContent.component";

export const Chatbot: FC = () => {
  return (
    <ChatProvider>
      <ChatbotContent />
    </ChatProvider>
  );
};
