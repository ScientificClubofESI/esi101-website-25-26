"use client";
import React from 'react';
import { useChatBot } from '@/contexts/ChatBotContext';
import ChatBot from '@/components/ChatBot';

// This component will render the actual ChatBot when it should be open
const UnifiedChatBot = () => {
  const { isOpen, closeChatBot } = useChatBot();

  if (!isOpen) return null;

  return <ChatBot defaultOpen={true} onClose={closeChatBot} />;
};

export default UnifiedChatBot;
