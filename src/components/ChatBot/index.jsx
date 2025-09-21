"use client";
import React, { useState, useRef, useEffect } from "react";
import { useChatBot } from '@/contexts/ChatBotContext';
// Suggested questions shown in desktop sidebar and mobile chips
const SUGGESTED_QUESTIONS = [
  "What is Cissou?",
  "What are the 1CP modules at ESI?",
  "What are the positive aspects of the school?",
  "Is it important to join the CSE club in the first year?",
  "What is CSE?",
];
// Custom hook for dark mode detection
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
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

const CloseButton = ({ className = "w-8 h-8" }) => {
  const isDark = useDarkMode();

  return (
    <div className="relative">
      <img
        src={isDark ? "/assets/darkclose.png" : "/assets/close.png"}
        alt="Close"
        className={`${className} select-none`}
        draggable={false}
        onError={(e) => {
          // Fallback if image fails to load
          e.target.style.display = 'none';
          e.target.nextElementSibling.style.display = 'block';
        }}
      />
      {/* SVG Fallback */}
      <svg 
        className={`${className} select-none hidden text-neutral-600 dark:text-neutral-300`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        style={{position: 'absolute', top: 0, left: 0}}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  );
};

// Message components
const BotMessage = ({ content }) => (
  <div className="flex items-end gap-3 max-w-full relative z-20">
    <div className="flex-shrink-0">
      <BotAvatar className="w-8 h-8" />
    </div>
    <div
      className="relative w-64 p-2 text-gray-800 dark:text-gray-800 text-lg text-left rounded-2xl bg-gray-200 dark:bg-gray-200 z-20 opacity-70"
      style={{ borderBottomLeftRadius: "0" }}
    >
      <span className="relative z-10 break-words">{content}</span>
    </div>
  </div>
);

const UserMessage = ({ content }) => (
  <div className="ml-auto w-64 relative z-20">
    <div
      className="relative p-4 text-gray-800 dark:text-gray-200 text-lg text-left rounded-2xl bg-primary-100 dark:bg-primary-800 z-20 opacity-70"
      style={{ borderBottomRightRadius: "0" }}
    >
      <span className="relative z-10 whitespace-pre-line leading-relaxed break-words">
        {content}
      </span>
    </div>
  </div>
);

const ThinkingIndicator = () => (
  <div className="flex items-end gap-3 max-w-full relative z-20">
    <div className="flex-shrink-0">
      <BotAvatar className="w-8 h-8" />
    </div>
    <div
      className="relative inline-flex items-center justify-center px-3 py-2 rounded-2xl bg-gray-50 dark:bg-gray-700 z-20 opacity-70"
      style={{ borderBottomLeftRadius: "0" }}
    >
      <div className="flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block w-1.5 h-1.5 mx-1.5 rounded-full bg-primary-500 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

const ChatBot = ({ defaultOpen = true, onClose }) => {
  const [open, setOpen] = useState(defaultOpen); // container visibility
  const { messages, setMessages } = useChatBot(); // Use shared messages
  const [input, setInput] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const showIntro = messages.length === 0 && !thinking;
  const showMobileSuggestions = messages.length === 0; // controls bottom padding on mobile

  // Track viewport width for behavior differences (auto-send suggestions desktop only)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handle = (e) => setIsDesktop(e.matches);
    handle(mq); // initial
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const sendMessage = async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed) return;
    
    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setInput("");
    setThinking(true);

    try {
      const response = await fetch('https://cissou.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmed,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          content: data.reply || data.response || data.message || "Sorry, I couldn't process your request.",
        },
      ]);
    } catch (error) {
      console.error('Chat API error:', error);
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  const cancelThinking = () => {
    setThinking(false);
  };

  const handleSuggestionClick = (idx) => {
    setSelectedIdx(idx);
    const q = SUGGESTED_QUESTIONS[idx];
    setInput(q);
    // Auto send for both desktop and mobile now
    sendMessage(q);
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white shadow-lg hover:bg-secondary-500 transition-all duration-300 hover:scale-110 group"
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
  }

  return (
    <>
      {/* Backdrop blur for desktop only */}
      <div className="hidden md:block fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-[59]" onClick={handleClose}></div>
      
      <section
        className="fixed inset-0 md:inset-auto md:bottom-8 md:top-auto w-full h-full md:w-[59vw] md:h-[73.8vh] z-[60] bg-background-light dark:bg-background-dark md:rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden md:right-8 md:left-auto md:ml-auto"
        aria-label="ChatBot"
      >
      {/* Left suggestions panel (desktop) */}
      <div className="hidden md:flex flex-col w-[29%] bg-background-light dark:bg-background-dark border-r-2 dark:border-neutral-900 border-neutral-100 p-2">
        <h2 className="text-secondary-500 text-center pb-4 h-24 mt-2 text-3xl font-normal mb-2">
          Questions
          <span className="block text-primary-500 text-2xl">You May Ask</span>
        </h2>
        <div className="space-y-3 overflow-y-auto pr-1">
          {SUGGESTED_QUESTIONS.map((q, i) => {
            const selected = i === selectedIdx;
            const thinkingMode = thinking && isDesktop;
            const base =
              "w-full text-left text-lg text-neutral-800 dark:text-neutral-200 min-h-fit rounded-3xl px-4 py-3 transition-colors shadow-sm focus:outline-none";
            let colorClass;
            if (thinkingMode) {
              // While thinking on desktop, keep backgrounds but force light gray text
              colorClass = selected
                ? "bg-primary-300 dark:bg-primary-800 !text-neutral-400 dark:!text-neutral-400"
                : "bg-primary-200 dark:bg-primary-800 !text-neutral-400 dark:!text-neutral-400";
            } else {
              colorClass = selected
                ? "bg-primary-300 dark:bg-primary-800 text-primary-800 dark:text-neutral-200"
                : "bg-primary-200 dark:bg-primary-800 hover:bg-primary-300 dark:hover:bg-primary-700";
            }
            return (
              <button
                key={q}
                type="button"
                disabled={thinkingMode}
                onClick={() => handleSuggestionClick(i)}
                className={[
                  base,
                  colorClass,
                  thinkingMode ? "cursor-default" : "cursor-pointer",
                ].join(" ")}
              >
                {q}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat column */}
      <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark min-h-0 relative">
        {/* Background image for desktop - positioned within chat column */}
        <div
          className="hidden md:block absolute pointer-events-none z-0"
          style={{
            width: "35%",
            height: "40%",
            top: "20%",
            left: "23.6%",
            transform: "translate(-50%, -50%)",
            opacity: 0.8,
          }}
        >
          <img
            src="/assets/background.png"
            alt=""
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
        {showIntro && (
          <div className="absolute left-0 right-0 top-1/2 -translate-y-[80%] md:-translate-y-[45%] flex flex-col items-center justify-center text-center px-6 select-none pointer-events-none z-10">
            <div className="flex flex-col items-center justify-center">
              <BotAvatar className="w-16 h-16 md:w-[60px] md:h-[55px]" />
              <h1 className="mt-2 text-2xl md:text-3xl font-light text-neutral-700 dark:text-neutral-300">
                Hi,{" "}
                <span className="text-primary-500 dark:text-primary-300">
                  I'm Cissou
                </span>{" "}
                !
              </h1>
              <p className="mt-2 text-lg md:text-xl text-neutral-400 dark:text-neutral-500 font-normal">
                What would you like to know ?
              </p>
            </div>
          </div>
        )}
        {/* Header */}
        <div className="flex items-center justify-between bg-background-light dark:bg-background-dark px-4 md:px-12 h-16 md:h-[88px] sticky top-0 z-[70] border-b border-neutral-200 dark:border-neutral-700 shadow-sm">
          <div className="flex items-center gap-3 md:gap-6">
            <BotAvatar className="w-8 h-8 md:w-[46px] md:h-[42.17px]" />
            <span className="font-normal text-xl md:text-2xl text-primary-500 dark:text-primary-300">
              Cissou
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center min-w-[44px] min-h-[44px] w-12 h-12 md:w-12 md:h-12 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors flex-shrink-0 touch-manipulation relative z-[80]"
            aria-label="Close chat"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <CloseButton className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>

        {/* Messages area */}
        <div
          ref={scrollRef}
          className={`flex-1 overflow-y-auto px-5 py-4 ${
            showMobileSuggestions ? "pb-48 md:pb-6" : "pb-24 md:pb-6"
          } space-y-4 relative min-h-0`}
        >
          {messages.map((m, idx) =>
            m.role === "bot" ? (
              <BotMessage key={idx} content={m.content} />
            ) : (
              <UserMessage key={idx} content={m.content} />
            )
          )}
          {thinking && <ThinkingIndicator />}
        </div>

        {/* Sticky bottom input + mobile suggestions */}
        <div className=" bg-background-light dark:bg-background-dark md:shadow-input-area md:static fixed bottom-0 left-0 right-0 md:left-auto md:right-auto backdrop-blur supports-[backdrop-filter]:backdrop-blur z-50 md:border-t-0">
          {showMobileSuggestions && (
            <div className="md:hidden px-4 pt-3 pb-2 flex gap-3 overflow-x-auto scrollbar-none">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSuggestionClick(i)}
                  className={[
                    "p-6 min-w-60 max-h-20 text-md rounded-[45px] flex justify-center items-center transition-colors text-base",
                    i === selectedIdx
                      ? "bg-primary-300 dark:bg-primary-800 text-primary-800 dark:text-neutral-200"
                      : "bg-neutral-50 dark:bg-primary-800 text-neutral-500 dark:text-neutral-200 ",
                  ].join(" ")}
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="px-3 py-4 md:px-3 flex items-end gap-3"
          >
            <div className="flex-1">
              <div className="rounded-full border h-12 border-neutral-300 bg-transparent px-4 py-2 focus-within:ring-2 focus-within:ring-primary-300 transition-shadow">
                <input
                  type="text"
                  className="w-full bg-transparent text-black dark:text-white outline-none text-base placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                  placeholder="Type here …"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setSelectedIdx(null)}
                />
              </div>
            </div>
            {thinking ? (
              <button
                type="button"
                onClick={cancelThinking}
                className="rounded-full flex items-center justify-center bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 w-14 h-14 transition-colors shadow-md"
                aria-label="Stop response"
              >
                <img
                  src="/assets/button-stop.png"
                  alt="Stop"
                  className="w-8 h-8 object-contain pointer-events-none select-none"
                  draggable={false}
                />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="rounded-full flex items-center justify-center bg-primary-500 w-14 h-14 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md"
                aria-label="Send message"
              >
                <img
                  src="/assets/button-sendy.png"
                  alt="Send"
                  className="w-8 h-8 object-contain pointer-events-none select-none"
                  draggable={false}
                />
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
    </>
  );
};

export default ChatBot;