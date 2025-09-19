"use client";
import React, { useState, useRef, useEffect } from "react";
// Suggested questions shown in desktop sidebar and mobile chips
const SUGGESTED_QUESTIONS = [
  "What extracurricular activities are offered?",
  "How can I contact the student community?",
  "What programs are available?",
  "How do I apply?",
  "What are the tuition fees?",
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
    return isDark ? "/assets/dark bot.png" : "/assets/ChatBot.png";
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
    <img
      src={isDark ? "/assets/darkclose.png" : "/assets/close.png"}
      alt="Close"
      className={`${className} select-none`}
      draggable={false}
    />
  );
};

// Message components
const BotMessage = ({ content }) => (
  <div className="flex items-end gap-3 max-w-full relative z-20">
    <div className="flex-shrink-0">
      <BotAvatar className="w-8 h-8" />
    </div>
    <div
      className="relative w-64 p-2 text-gray-800 dark:text-gray-800 text-lg text-left rounded-2xl bg-gray-200 dark:bg-gray-700 z-20 opacity-70"
      style={{ borderBottomLeftRadius: "0" }}
    >
      <span className="relative z-10 break-words">{content}</span>
    </div>
  </div>
);

const UserMessage = ({ content }) => (
  <div className="ml-auto w-64 relative z-20">
    <div
      className="relative p-4 text-gray-800 dark:text-gray-200 text-lg text-right rounded-2xl bg-primary-100 dark:bg-primary-800 z-20 opacity-70"
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

const ChatBot = ({ defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen); // container visibility
  const [messages, setMessages] = useState([]); // start empty
  const [input, setInput] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const replyTimeoutRef = useRef(null);
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

  const sendMessage = (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setInput("");
    setThinking(true);

    // Simulate bot reply
    replyTimeoutRef.current = setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          content:
            "This is a placeholder response. Integrate your backend or API here.",
        },
      ]);
      setThinking(false);
      replyTimeoutRef.current = null;
    }, 1200);
  };

  const cancelThinking = () => {
    if (replyTimeoutRef.current) {
      clearTimeout(replyTimeoutRef.current);
      replyTimeoutRef.current = null;
      setThinking(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);
    };
  }, []);

  const handleSuggestionClick = (idx) => {
    setSelectedIdx(idx);
    const q = SUGGESTED_QUESTIONS[idx];
    setInput(q);
    // Auto send for both desktop and mobile now
    sendMessage(q);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary-500 text-white shadow-lg px-5 py-3 hover:bg-secondary-500 transition-colors"
      >
        <BotAvatar />
        <span className="font-medium hidden sm:inline">Chat</span>
      </button>
    );
  }

  return (
    <section
      className="fixed inset-0 md:inset-auto md:bottom-8 md:top-auto w-full h-full md:w-[59vw] md:h-[73.8vh] z-50 bg-background-light dark:bg-background-dark md:rounded-3xl shadow-xl   flex flex-col md:flex-row overflow-hidden md:right-8 md:left-auto md:ml-auto"
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
        <div className="flex items-center bg-background-light dark:bg-background-dark px-12 md:h-[88px] py-3 md:py-0  sticky top-0 z-10">
          <div className="flex  items-center gap-6">
            <BotAvatar className="w-8 h-8 md:w-[46px] md:h-[42.17px]" />
            <span className="font-normal text-2xl text-primary-500 dark:text-primary-300">
              Cissou
            </span>
          </div>
          <div className="ml-auto flex h-8 md:h-20">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1"
              aria-label="Close chat"
            >
              <CloseButton className="h-[32px] w-[32px] md:w-[35px] md:h-[35px]" />
            </button>
          </div>
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
  );
};

export default ChatBot;
