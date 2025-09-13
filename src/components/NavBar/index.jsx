"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

const NavBar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  return (
    <section>
      <div
       className="navbar-bg flex justify-between py-2 px-6 rounded-3xl mt-2 mx-10 items-center"
        style={{
          backgroundColor: mounted && theme === 'dark' 
            ? 'var(--color-primary-800)' 
            : 'var(--color-primary-50)',
        }}
       >
        {/* ESI101 logo */}
        <div>
          <Image
            src="/assets/esi-icon.png"
            alt="esi-icon"
            width={96}
            height={64}
            className="rounded"
          />
        </div>
        
        <div>
          <ul className="flex items-center gap-6 text-md font-normal text-sm justify-between">
            <li>Home</li>
            <li>About</li>
            <li className="whitespace-nowrap">Student Q&A</li>
            <li>FAQ</li>
            <li>Contact</li>
            {/* Theme toggle replaces the static sun */}
            <li className="flex-shrink-0">
              <ThemeToggle />
            </li>
          </ul>
        </div>

        {/* BOT ICON */}
        <div>
          <Image
            src="/assets/bot.png"
            alt="bot"
            width={48}
            height={32}
            className="rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default NavBar;