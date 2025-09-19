"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import ChatBot from '../ChatBot/index.jsx';

const NavBar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  const handleChatClick = () => {
    setShowChatBot(true);
  };

  useEffect(() => {
    if (showChatBot) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showChatBot]);

  useEffect(() => setMounted(true), []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <section className="fixed top-0 left-4 right-4 md:left-10 md:right-10 z-50">
      <div
        className="flex flex-col rounded-3xl mt-2 bg-primary-500 md:bg-[#ECF1FC] md:dark:bg-[#1D3564]"  >
        {/* Main Navbar Row */}
        <div className="flex justify-between py-2 px-4 md:px-6 items-center">
          {/* Mobile Theme Toggle (left side) */}
          <div className="md:hidden">
            <ThemeToggle />
          </div>

          {/* ESI101 logo (center on mobile, left on desktop) */}
          <div className="hidden md:block flex-shrink-0">
            <Image
              src="/assets/esi-icon.png"
              alt="esi-icon"
              width={96}
              height={64}
              className="rounded"
            />
          </div>
           <div className="flex-shrink-0 md:hidden">
            <Image
              src="/assets/Logo-black.svg"
              alt="esi-icon"
              width={96}
              height={64}
              className="rounded"
            />
          </div>
          
          {/* Desktop Navigation (hidden on mobile) */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-4 lg:gap-6 text-md font-sans text-text-s">
              <li className="hover:text-orange-500 transition-all duration-150 ease-in">
                <a href="#hero">Home</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in">
                <a href="#about">About</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in whitespace-nowrap">
                <a href="#StudentQA">Student Q&A</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in">
                <a href="#faqs">FAQ</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in">
                <a href="#footer">Contact</a>
              </li>
              {/* Desktop Theme toggle */}
              <li className="flex-shrink-0">
                <ThemeToggle />
              </li>
            </ul>
          </div>

          {/* Desktop BOT ICON (hidden on mobile) */}
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={handleChatClick}
              className="hidden md:flex items-center gap-3  hover:rounded-full hover:bg-secondary-500 transition-all duration-300 hover:shadow-md"
            >
            {/* Text only visible on hover */}
              <span
                className={`text-background-light font-sans text-text-xs transition-opacity ml-5 duration-300 ${
                  hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}
              >
                Chat With Cissou
              </span>
              {/* Robot icon */}
              <img
                src={hovered ? "/assets/Robot-on-hover.svg" : "/assets/Robot-icon.svg"}
                alt="Robot Icon"
                  className={`transition-all duration-300 ${
                  hovered ? "w-15 h-15" : "w-10 h-10"
          }`}
              />
            </button>
          
          {/* Mobile Menu Button (right side) */}
          <div className="cursor-pointer md:hidden" onClick={toggleMobileMenu}>       
            <div className="w-8 h-8 flex flex-col justify-center items-center space-y-1">
              <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'translate-y-1 opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-current transition-all duration-300`}></div>
              <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? '-translate-y-1 opacity-0' : ''}`}></div>
            </div>
          </div>
        </div>

        {/* Mobile Menu (inside same navbar div) */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-4 px-4 md:px-6">
            <ul className="flex flex-col gap-4 text-background-light font-sans text-text-s">
              <li className="hover:text-orange-500 transition-all duration-150 ease-in py-2 border-b border-opacity-20 border-background-light">
                <a href="#hero" onClick={() => setMobileMenuOpen(false)}>Home</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in py-2 border-b border-opacity-20 border-background-light">
                <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in py-2 border-b border-opacity-20 border-background-light">
                <a href="#StudentQA" onClick={() => setMobileMenuOpen(false)}>Student Q&A</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in py-2 border-b border-opacity-20 border-background-light">
                <a href="#faqs" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in py-2 border-b border-opacity-20 border-background-light">
                <a href="#footer" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              </li>
              <li className=" flex justify-center">
            <button
              onClick={handleChatClick}
              className="flex items-center gap-3 rounded-full px-[24px] py-[10px]  shadow-md bg-secondary-500 md:hidden"
            >
              <img
                src="/assets/Robot.svg"
                alt="Robot Icon"
                  className="w-6 h-6"
              />
              <span
                className= "text-background-light font-sans text-text-s"
              >
                Chat With Cissou
              </span>
            </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Render ChatBot */}
      {showChatBot && (
        <div className='md:bg-black md:bg-opacity-50 fixed inset-0'>
          <span className='absolute md:top-44 md:right-16 top-4 right-9 z-50 text-primary-500 text-3xl cursor-pointer' onClick={() => setShowChatBot(false)} >X</span>
            <ChatBot />
        </div>
      )}
    </section>
  );
};

export default NavBar;