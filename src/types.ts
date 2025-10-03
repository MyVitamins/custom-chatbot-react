export type Message = {
  id: string;
  role: "user" | "bot";
  type: "text" | "buttons" | "card" | "list" | "typing" | "canvas" | "product";
  content: any; // Can be string, { text: string }, { options: string[] }, { title: string, description: string, image?: string }, { list: string[] }, { url: string, display: string, height: number }, { sku: string, productId: string, title?: string, image?: string, url: string }, {}
  suggestedQuestions?: string[]; // Optional array of suggested follow-up questions
  structured?: Array<{
    sku: string;
    productId: number;
    title: string;
    image: string;
    url: string;
  }>; // Optional structured content for sidebar (products, etc.)
};

export type SidebarContent = {
  title: string;
  products: Array<{
    sku: string;
    productId: number;
    title: string;
    image: string;
    url: string;
  }>;
};

export type SidebarState = {
  isOpen: boolean;
  messageId: string | null;
};
