"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

const NavBar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <section className="fixed top-0 left-4 right-4 md:left-10 md:right-10 z-50">
      <div
        className="navbar-bg flex flex-col rounded-3xl mt-2"
        style={{
          backgroundColor: mounted && theme === "dark" 
            ? "#1D3564" 
            : "#ECF1FC", 
        }}
      >
        {/* Main Navbar Row */}
        <div className="flex justify-between py-2 px-4 md:px-6 items-center">
          {/* Mobile Theme Toggle (left side) */}
          <div className="md:hidden">
            <ThemeToggle />
          </div>

          {/* ESI101 logo (center on mobile, left on desktop) */}
          <div className="flex-shrink-0">
            <Image
              src="/assets/esi-icon.png"
              alt="esi-icon"
              width={96}
              height={64}
              className="rounded"
            />
          </div>
          
          {/* Desktop Navigation (hidden on mobile) */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-4 lg:gap-6 text-md font-normal text-sm">
              <li className="hover:text-orange-500 transition-all duration-150 ease-in">
                <a href="#">Home</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in">
                <a href="#">About</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in whitespace-nowrap">
                <a href="#">Student Q&A</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in">
                <a href="#">FAQ</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in">
                <a href="#">Contact</a>
              </li>
              {/* Desktop Theme toggle */}
              <li className="flex-shrink-0">
                <ThemeToggle />
              </li>
            </ul>
          </div>

          {/* Desktop BOT ICON (hidden on mobile) */}
          <div
            className="hidden md:block relative cursor-pointer w-32 h-8 overflow-hidden rounded-xl"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src="/assets/bot.png"
              alt="default bot"
              className={`absolute top-0 right-0 w-8 h-8 rounded transition-opacity transition-transform duration-500 ease-in-out ${
                hovered ? "opacity-0 translate-x-[-24px]" : "opacity-100 translate-x-0"
              }`}
            />
            <img
              src="/assets/bot-hover.png"
              alt="hover bot"
              className={`absolute top-0 right-0 w-32 h-8 rounded transition-opacity transition-transform duration-500 ease-in-out ${
                hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[128px]"
              }`}
            />
          </div>
          
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
            <ul className="flex flex-col gap-4 text-md font-normal text-sm">
              <li className="hover:text-orange-500 transition-all duration-150 ease-in py-2 border-b border-opacity-20 border-gray-400">
                <a href="#" onClick={() => setMobileMenuOpen(false)}>Home</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in py-2 border-b border-opacity-20 border-gray-400">
                <a href="#" onClick={() => setMobileMenuOpen(false)}>About</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in py-2 border-b border-opacity-20 border-gray-400">
                <a href="#" onClick={() => setMobileMenuOpen(false)}>Student Q&A</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in py-2 border-b border-opacity-20 border-gray-400">
                <a href="#" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              </li>
              <li className="hover:text-orange-500 transition-all duration-150 ease-in py-2">
                <a href="#" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavBar;