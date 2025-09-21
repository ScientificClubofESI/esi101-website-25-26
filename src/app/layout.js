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
      <head>
        <title>ESI101</title>
        <meta name="description" content="ESI101 website 2025/2026 edition ggod luck for all 1CP students" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
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