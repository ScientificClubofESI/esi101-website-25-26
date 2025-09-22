"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: "4px",
      }}
    >
      {theme === "dark" ? (
        <Image
          src="/assets/sun.png"   
          alt="Dark Mode"
          width={24}
          height={24}
        />
      ) : (
        <Image
          src="/assets/Moon.png"    
          alt="Light Mode"
          width={24}
          height={24}
        />
      )}
    </button>
  );
}
