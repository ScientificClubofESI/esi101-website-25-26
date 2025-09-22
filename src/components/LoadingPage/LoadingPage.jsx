import React from 'react';
import Image from 'next/image';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 bg-background-light dark:bg-background-dark flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo/Image */}
        <div className="relative">
          {/* Main image with bounce animation */}
          <div className="animate-bounce">
            <Image
              src="/assets/esi-icon.png" 
              alt="Loading"
              width={500}
              height={300}
              className="w-24 h-24 md:w-32 md:h-32"
              priority
            />
          </div>
          
        </div>

        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Loading...
          </h2>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse delay-0"></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;