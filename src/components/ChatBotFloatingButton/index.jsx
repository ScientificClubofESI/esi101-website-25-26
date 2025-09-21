"use client";
import React from 'react';
import { useChatBot } from '@/contexts/ChatBotContext';

// Custom hook for dark mode detection
const useDarkMode = () => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
};

const BotAvatar = ({ hover = false, className = "w-8 h-8" }) => {
  const isDark = useDarkMode();

  const getSrc = () => {
    if (hover) return "/assets/bot-hover.png";
    return isDark ? "/assets/dark bot.png" : "/assets/dark bot.png";
  };

  return (
    <img
      src={getSrc()}
      alt="Bot"
      className={`${className} select-none`}
      draggable={false}
    />
  );
};

// Floating button that only shows when chatbot is closed
const ChatBotFloatingButton = ({ className = "" }) => {
  const { isOpen, openChatBot } = useChatBot();

  if (isOpen) return null;

  return (
    <button
      type="button"
      onClick={openChatBot}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white shadow-lg hover:bg-secondary-500 transition-all duration-300 hover:scale-110 group ${className}`}
      aria-label="Open chat"
    >
      <div className="relative">
        <BotAvatar className="w-8 h-8" />
        {/* Message notification dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      </div>
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with Cissou
      </span>
    </button>
  );
};

export default ChatBotFloatingButton;
