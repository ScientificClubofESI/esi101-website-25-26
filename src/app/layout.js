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
    // Method 1: Simple timer approach
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds loading

    return () => clearTimeout(timer);
    
    // Method 2: More sophisticated approach with image preloading
    // const preloadCriticalAssets = async () => {
    //   try {
    //     // Preload critical images
    //     const criticalImages = [
    //       '/assets/your-logo.png',
    //       '/assets/hero-image.jpg',
    //       '/assets/main-banner.png',
    //       // Add your most important images here
    //     ];

    //     const imagePromises = criticalImages.map((src) => {
    //       return new Promise((resolve, reject) => {
    //         const img = new Image();
    //         img.onload = resolve;
    //         img.onerror = resolve; // Continue even if some images fail
    //         img.src = src;
    //       });
    //     });

    //     // Wait for images to load
    //     await Promise.all(imagePromises);
    //     
    //     // Minimum loading time so animation is visible
    //     setTimeout(() => {
    //       setIsLoading(false);
    //     }, 1500);
    //   } catch (error) {
    //     console.log('Asset loading completed with some errors:', error);
    //     setTimeout(() => {
    //       setIsLoading(false);
    //     }, 2500);
    //   }
    // };

    // preloadCriticalAssets();
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