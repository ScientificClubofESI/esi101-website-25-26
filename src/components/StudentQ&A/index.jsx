"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

const StudentQA = () => {
  const youtubeVideoId = "CevCPGdWXBg";
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section className='relative my-16  p-5 md:p-16 mt-24 lg:p-24 mt-32  ' id="StudentQA">
      <div className="relative flex flex-col justify-start gap-14 lg:gap-16">
        <div className="relative">
          <h1 className="text-primary-500 font-light text-heading-l lg:text-[49px]">
            {" "} Student <span className="text-secondary-500 uppercase"> {" "} Q&A </span> 
          </h1>
          <div className="absolute top-7 w-72 md:w-[350px] lg:w-[450px] lg left-0">
            <Image
              src="/assets/Vector (1).svg"
              alt="vector"
              width={450}
              height={100}
            />
          </div>
        </div>
        <div className="text-background-dark flex flex-col justify-start gap-10 w-full dark:text-neutral-50">
          <p className="text-text-m md:text-text-l">
            Have questions about student life, classes, or projects at ESI? We'll share our real experiences to answer them and help you navigate your first steps with confidence. Our experiences will guide you through challenges and help you make the most of your time here.
          </p>
        </div>
        <div className="relative flex flex-col items-center w-[100%] hidden md:block h-[760px]">
          <img src="/assets/top-left.svg" alt="top-left" className="absolute top-0 left-0 z-10"/>
          <img src="/assets/middle-left.svg" alt="middle-left" className="absolute top-[310px] left-0 z-10"/>
          <img src="/assets/bottom-left.svg" alt="middle-left" className="absolute top-[610px] left-0 z-10"/>
          <img src="/assets/bottom-right.svg" alt="middle-left" className="absolute top-[455px] right-0 z-10"/>
          <img src="/assets/top-right.svg" alt="middle-left" className="absolute top-0 right-0 z-10"/>
          <img src="/assets/Intersect.svg" alt="" className="absolute top-0 left-[216px] opacity-[30%] z-0"/>
          
          <div className="absolute top-0 left-[216px] w-[848px] h-[598px] overflow-hidden shadow-lg z-0">
            <div 
              className="w-full h-full relative cursor-pointer"
              style={{
                mask: 'url(#video-mask)',
                WebkitMask: 'url(#video-mask)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center'
              }}
              onClick={handlePlayPause}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover "
                muted
                loop
                playsInline
                controls={false}
              >
                <source src="/assets/clipforvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="hover:scale-110 transition-all duration-300">
                    <svg 
                      width="120" 
                      height="133" 
                      viewBox="0 0 190 211" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="drop-shadow-lg"
                    >
                      <path 
                        d="M73.1662 161.018C68.7361 161.018 64.5873 159.852 60.9308 157.521C52.2816 152.003 47.5 140.889 47.5 126.277V84.6969C47.5 70.0855 52.2816 58.9715 60.9308 53.4534C69.5799 47.9353 80.6199 48.9456 92.1521 56.2513L124.709 77.0026C136.171 84.3083 142.5 94.412 142.5 105.448C142.5 116.484 136.171 126.588 124.709 133.894L92.1521 154.645C85.5422 158.92 79.0729 161.018 73.1662 161.018Z" 
                        fill="#F8FAFB"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            
            {/* SVG mask definition */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <mask id="video-mask">
                  <rect width="100%" height="100%" fill="black"/>
                  <path d="M824 0.5C837.255 0.500002 848 11.2452 848 24.5V421.5C848 434.755 837.255 445.5 824 445.5H764C750.745 445.5 740 456.245 740 469.5V574.5C740 587.755 729.255 598.5 716 598.5H24C10.7452 598.5 0 587.755 0 574.5V331.5C7.73109e-07 318.245 10.7452 307.5 24 307.5H84C97.2548 307.5 108 296.755 108 283.5V24.5C108 11.2452 118.745 0.5 132 0.5H824Z" fill="white"/>
                </mask>
              </defs>
            </svg>
          </div>
        </div>

        <div className="w-[100%] h-[50%]  md:hidden">
            <div 
              className="w-full h-full relative cursor-pointer"
              onClick={handlePlayPause}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-[25px] "
                muted
                loop
                playsInline
                controls={false}
              >
                <source src="/assets/clipforvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="hover:scale-110 transition-all duration-300">
                    <svg 
                      width="60" 
                      height="60" 
                      viewBox="0 0 190 211" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="drop-shadow-lg"
                    >
                      <path 
                        d="M73.1662 161.018C68.7361 161.018 64.5873 159.852 60.9308 157.521C52.2816 152.003 47.5 140.889 47.5 126.277V84.6969C47.5 70.0855 52.2816 58.9715 60.9308 53.4534C69.5799 47.9353 80.6199 48.9456 92.1521 56.2513L124.709 77.0026C136.171 84.3083 142.5 94.412 142.5 105.448C142.5 116.484 136.171 126.588 124.709 133.894L92.1521 154.645C85.5422 158.92 79.0729 161.018 73.1662 161.018Z" 
                        fill="#F8FAFB"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
        </div>
        
        <div className="flex justify-center md:justify-end">
          <button 
            onClick={() => window.open(`https://www.youtube.com/watch?v=${youtubeVideoId}`, '_blank')}
            className="px-7 py-3 rounded-full bg-primary-600 text-background-light text-text-m md:text-text-l hover:bg-primary-700 transition-colors duration-300 cursor-pointer"
          >
            Watch the full video here!
          </button>
        </div>
      </div>
          <img
              src="/assets/Asset-3.svg"
              alt=""
              className="hidden md:block pointer-events-none select-none absolute right-0 bottom-0 translate-y-32  h-[300px]"/>
    </section>
  );
}

export default StudentQA;