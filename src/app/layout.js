"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Outfit } from "next/font/google";
import { ChatBotProvider } from "@/contexts/ChatBotContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "600", "700"], 
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} bg-background-light dark:bg-background-dark`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ChatBotProvider>
            {children}
          </ChatBotProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
