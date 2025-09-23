"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Outfit } from "next/font/google";
import { ChatBotProvider } from "@/contexts/ChatBotContext";
import { useState, useEffect } from "react";
import LoadingPage from "@/components/LoadingPage/LoadingPage"; 

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "600", "700"], 
});

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>ESI101</title>
        <meta name="description" content="ESI101 website 2025/2026 edition good luck for all 1CP students" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body
        className={`${outfit.variable} bg-background-light dark:bg-background-dark`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ChatBotProvider>
            {isLoading ? (
              <LoadingPage />
            ) : (
              children
            )}
          </ChatBotProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}