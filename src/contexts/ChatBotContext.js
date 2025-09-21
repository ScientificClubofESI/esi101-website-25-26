"use client";
import React, { createContext, useContext, useState } from 'react';

const ChatBotContext = createContext();

export const useChatBot = () => {
  const context = useContext(ChatBotContext);
  if (!context) {
    throw new Error('useChatBot must be used within a ChatBotProvider');
  }
  return context;
};

export const ChatBotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const openChatBot = () => setIsOpen(true);
  const closeChatBot = () => setIsOpen(false);

  return (
    <ChatBotContext.Provider
      value={{
        isOpen,
        messages,
        setMessages,
        openChatBot,
        closeChatBot,
      }}
    >
      {children}
    </ChatBotContext.Provider>
  );
};
