"use client";
import React, { useState, useRef, useEffect } from "react";

const SUGGESTED_QUESTIONS = [
  "What are the negative aspects of the school?",
  "How does the admission process work?",
  "What extracurricular activities are offered?",
  "How can I contact the student community?",
];

const BotAvatar = ({ hover = false, className = "w-8 h-8" }) => (
  <img
    src={hover ? "/assets/bot-hover.png" : "/assets/ChatBot.png"}
    alt="Bot"
    className={`${className} select-none`}
    draggable={false}
  />
);
const CloseButton = () => (
  <img
    src={"/assets/Close.png"}
    alt="Close"
    className="w-8 h-8 select-none"
    draggable={false}
  />
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
  const [showScrollDown, setShowScrollDown] = useState(false);
  const showIntro = messages.length === 0 && !thinking;

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

  // Monitor scroll position to show scroll-to-bottom button
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 8;
      setShowScrollDown(!atBottom);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

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
      className="fixed inset-0 md:inset-auto md:bottom-8 md:top-auto w-full h-full md:w-[59vw] md:h-[73.8vh] z-50 bg-background-light md:rounded-3xl shadow-xl border border-primary-300 flex flex-col md:flex-row overflow-hidden md:right-8 md:left-auto md:ml-auto"
      aria-label="ChatBot"
    >
      {/* Left suggestions panel (desktop) */}
      <div className="hidden md:flex flex-col w-[29%] bg-background-light border-r border-neutral-100 p-2">
        <h2 className="text-secondary-500 text-center pb-4 h-24 mt-2 text-3xl font-normal mb-2">
          Questions
          <span className="block text-primary-500 text-2xl">You May Ask</span>
        </h2>
        <div className="space-y-3 overflow-y-auto pr-1">
          {SUGGESTED_QUESTIONS.map((q, i) => {
            const selected = i === selectedIdx;
            const thinkingMode = thinking && isDesktop;
            const base =
              "w-full text-left text-lg text-neutral-800 min-h-fit rounded-3xl px-4 py-3 transition-colors shadow-sm focus:outline-none";
            let colorClass;
            if (thinkingMode) {
              colorClass = selected
                ? "bg-primary-300 text-neutral-800"
                : "bg-primary-200 text-neutral-800"; // all neutral-800 text while thinking
            } else {
              colorClass = selected
                ? "bg-primary-300 text-primary-800"
                : "bg-primary-200 hover:bg-primary-300";
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
      <div className="flex-1 flex flex-col min-h-0 relative">
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
              <h1 className="mt-2 text-2xl md:text-3xl font-light text-neutral-700">
                Hi, <span className="text-primary-500">I'm Cissou</span> !
              </h1>
              <p className="mt-2 text-lg md:text-xl text-neutral-400 font-normal">
                What would you like to know ?
              </p>
            </div>
          </div>
        )}
        {/* Header */}
        <div className="flex items-center bg-background-light gap-3 px-12 h-11 md:h-[88px] py-3 md:py-0  sticky top-0 z-10">
          <div className="flex  items-center gap-6">
            <BotAvatar className="w-8 h-8 md:w-[46px] md:h-[42.17px]" />
            <span className="font-normal text-2xl text-primary-500">
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
              <CloseButton className=" md:w-12 md:h-12" />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div
          ref={scrollRef}
          className={`flex-1 overflow-y-auto px-5 py-4 ${
            showIntro ? "pb-10" : "pb-48 md:pb-6"
          } space-y-4 relative min-h-0`}
        >
          {messages.map((m, idx) => {
            const isBot = m.role === "bot";
            if (isBot) {
              return (
                <div
                  key={idx}
                  className="flex items-start gap-2 max-w-full relative z-20"
                >
                  <BotAvatar />
                  <div className="max-w-[80%] border text-neutral-700 shadow-sm rounded-2xl px-4 py-3 text-sm whitespace-pre-line leading-relaxed bg-white">
                    {m.content}
                  </div>
                </div>
              );
            }
            return (
              <div
                key={idx}
                className="ml-auto max-w-[85%] bg-primary-500 text-white rounded-2xl px-4 py-3 text-sm whitespace-pre-line leading-relaxed relative z-20"
              >
                {m.content}
              </div>
            );
          })}
          {thinking && (
            <div className="flex items-end gap-2 relative z-20">
              <BotAvatar />
              <div className="relative bg-neutral-50 text-primary-500 px-4 py-2 rounded-2xl shadow-sm border border-neutral-100 flex items-center gap-1 text-xs font-medium">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Sticky bottom input + mobile suggestions */}
        <div className=" bg-background-light md:shadow-input-area md:static fixed bottom-0 left-0 right-0 md:left-auto md:right-auto backdrop-blur supports-[backdrop-filter]:backdrop-blur z-20 border-t md:border-t-0">
          {messages.length === 0 && (
            <div className="md:hidden px-4 pt-3 pb-2 flex gap-3 overflow-x-auto scrollbar-none">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSuggestionClick(i)}
                  className={[
                    "p-6 min-w-60 max-h-20 text-md rounded-[45px] flex justify-center items-center transition-colors text-base",
                    i === selectedIdx
                      ? "bg-primary-300 text-primary-800"
                      : "bg-neutral-50 text-neutral-500 border",
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
                  className="w-full bg-transparent text-black outline-none text-base placeholder:text-neutral-400"
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
      {/* Scroll to bottom button */}
      {showScrollDown && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="absolute bottom-28 md:bottom-6 right-4 md:right-6 z-30 bg-primary-500 hover:bg-primary-600 text-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-lg"
          aria-label="Scroll to latest message"
        >
          ↓
        </button>
      )}
    </section>
  );
};

export default ChatBot;
