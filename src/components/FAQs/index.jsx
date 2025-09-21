"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// le3ziz
const FAQS_DATA = [
  {
    q: "What is the purpose of the ESI 101 event organized by the CSE ?",
    a: "ESI 101 is designed to greatly benefit first-year students by offering essential guidance and resources to help them navigate university life and manage their studies effectively."  },
    {
    q: "Who is the target audience for ESI 101?",
    a:
"ESI 101 is aimed at first-year students who have just joined the school, offering essential foundational knowledge."  },
  {
    q: "Who can join the CSE?",
    a:
"Every university student, regardless of their level or field of study, is welcome. Whether you're a beginner or experienced, there's a place for you among us."  },
  {
    q: "How can I fully integrate into the club?",
    a:
      "You can fully integrate into the club by actively participating in events, joining project teams, attending weekly meetings, and connecting with other members through our social activities and workshopsYou can fully integrate into the club by actively participating in events, joining project teams, attending weekly meetings, and connecting with other members through our social activities and workshops.",
  },
  {
    q: "What events does the CSE organize?",
    a:
"We regularly organize hands-on workshops, expert-led conferences, as well as both internal and external hackathons."  },
];


const Chevron = ({ open }) => (
  <svg
    className={`h-5 w-5 transition-transform duration-300 ${
      open ? "rotate-180" : "rotate-0"
    }`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FAQs = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openAllMobile, setOpenAllMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)'); 
    const update = () => setIsMobile(!mq.matches);
    update();
    mq.addEventListener?.('change', update);
    // balak kahel ytasti el website from an old browser
    mq.addListener?.(update);
    return () => {
      mq.removeEventListener?.('change', update);
      mq.removeListener?.(update);
    };
  }, []);

  // 3la jal el questions
  useEffect(() => {
    if (!isMobile) setOpenAllMobile(false);
  }, [isMobile]);

  const toggle = (idx) => {
    if (isMobile) {
      // Mobile: toggle all items together
      setOpenAllMobile((prev) => !prev);
      return;
    }
    // Desktop/Tablet: classic accordion per index
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="relative my-16  p-5 md:p-16  lg:p-24 font-sans" id="faqs">
      {/* Section title */}
    <div className="relative inline-block mb-10 ">
      <div className="relative  flex flex-col justify-start gap-14 lg:gap-24">
        <div className="relative">
        <h1 className="font-light text-heading-m  lg:text-[47px] text-primary-500 dark:text-background-light leading-none">
          <span className="text-secondary-500">FAQs</span>{" "}
          <span className="text-primary-500">at a glance</span>
        </h1>
          <div className="absolute top-7 w-72 md:w-[350px] lg:w-[450px] lg left-0 ">
            <Image
              src="/assets/Vector (1).svg"
              alt="vector"
              width={450}
              height={100}
            />
          </div>
        </div>
    </div>
     </div>
      {/* Background vector image "i made it only for medium and bigger screens" */}
      <img
        src="/assets/faq-bg-vector.png"
        alt=""
        className="hidden md:block pointer-events-none select-none absolute translate-y-10 right-0 h-[350px]"
      />

      {/* Desktop/Tablet accordion */}
      <div className="hidden md:flex md:flex-col gap-6 mt-10 pr-6">
        {FAQS_DATA.map((item, idx) => {
          const open = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden bg-primary-50 dark:bg-primary-800/60 border border-transparent hover:border-primary-200 dark:hover:border-primary-700 transition-colors"
            >
              <button
                className="w-full flex items-center justify-between text-left px-6 py-5 text-text-m md:text-text-l font-normal text-neutral-900 dark:text-neutral-100"
                onClick={() => toggle(idx)}
                aria-expanded={open}
                aria-controls={`faq-panel-${idx}`}
              >
                <span>{item.q}</span>
                <span className="text-neutral-700 dark:text-neutral-100">
                  <Chevron open={open} />
                </span>
              </button>
              <div
                id={`faq-panel-${idx}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 md:px-20 pb-8 -mt-1 max-w-4xl mx-auto text-text-m leading-8 text-neutral-800 dark:text-neutral-100/90">
                    {item.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: horizontally scrollable cards */}
      <div className="md:hidden mt-8 -mx-2 px-2 overflow-x-auto faq-no-scrollbar">
        <div className="flex gap-4">
          {FAQS_DATA.map((item, idx) => {
            const open = openAllMobile;
            return (
              <div
                key={idx}
                className="min-w-[85%] bg-primary-50 dark:bg-primary-800/60 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-xs text-secondary-500 font-semibold">{`${String(
                      idx + 1
                    ).padStart(2, "0")}.`}</p>
                    <h3 className="text-text-m font-semibold text-neutral-900 dark:text-neutral-100 mt-1">
                      {item.q}
                    </h3>
                  </div>
                  <button
                    className="shrink-0 text-neutral-700 dark:text-neutral-100"
                    onClick={() => toggle(idx)}
                    aria-expanded={open}
                    aria-controls={`mobile-faq-${idx}`}
                  >
                    <Chevron open={open} />
                  </button>
                </div>
                <div
                  id={`mobile-faq-${idx}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out mt-2 ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-text-s font-normal leading-7 text-neutral-800 dark:text-neutral-100/90 mt-2">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Component-scoped CSS to hide the horizontal scrollbar on mobile list 
      puisque daretly problem when you open only one on mobile */}
      <style jsx>{`
        .faq-no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .faq-no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

{ /* l3ziz ki lhe9t hna ma3naha rak interessted :) */ }
export default FAQs;
