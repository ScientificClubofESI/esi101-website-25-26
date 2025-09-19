"use client";
import {useState, useEffect} from 'react';
import ChatBot from '../ChatBot/index.jsx';
import NavBar from '../NavBar/index.jsx';

const Hero = ()=>{
  const youtubeVideoId = "CevCPGdWXBg";
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

  return(
<section className="relative mb-16 pt-0 px-5 pb-5 md:px-16 pb-16 mb-24 lg:px-24 pb-24 mb-32 font-sans" id="hero">
  <div className="flex items-start">
    <div className="relative flex flex-col items-center w-[50%] hidden md:block">
      <div className="flex gap-x-4">
        <img src="/assets/hero-pic-2.png" alt="Hero" />
        <img src="/assets/hero-pic-1.png" alt="Hero" className="h-full" />
      </div>
      <img src="/assets/union.svg" alt="" className="absolute top-[17rem] left-0 dark:hidden"/>
      <img src="/assets/union.png"alt="" className="absolute top-[17rem] left-0 dark:block hidden"/>
      <p className="absolute top-[18rem] left-[19rem] text-text-s text-primary-900 dark:text-primary-100">
        Belong, grow, and shine at ESI.
      </p>
      <img  src="/assets/circle.svg" alt="" className="absolute top-[25rem] left-[21rem] dark:hidden"/>
      <img src="/assets/circle.png" alt=""className="absolute top-[25rem] left-[21rem] dark:block hidden"/>
    </div>

    <div className="md:w-[50%] w-full md:mt-12">
      <img src="/assets/esi-icon.png" alt="Logo" className="dark:hidden w-[40rem] my-8"/>
      <img src="/assets/Dark%20Logo.svg" alt="Logo" className="hidden dark:block my-8"/>

      <h1 className="md:text-heading-l text-text-l text-center md:text-left mb-8 text-primary-900 dark:text-background-light">
        Welcome to
        <span className="text-secondary-500 dark:text-primary-500"> ESI 101 </span>
        space
      </h1>

      <p
        className="md:w-[29rem] text-text-s md:text-text-m md:text-left text-center text-neutral-800 dark:text-neutral-100"
      >
        Welcome to ESI 101, an exclusive event designed to help first-year students
        make the most of their journey at ESI!
      </p>

      <div
        className="mt-8 flex md:flex-row flex-col gap-6 justify-center md:justify-start"
      >
        <button
          onClick={handleChatClick}
          className="flex items-center justify-center md:gap-4 gap-2 text-left px-8 py-2 bg-secondary-100 rounded-xl border-2 border-transparent hover:border-secondary-500 hover:bg-secondary-50"
        >
          <img src="/assets/messages.svg" alt="Chat Icon" className="mr-2" />
          <div>
            <p className="text-neutral-500 text-text-xs md:text-text-m">Chat</p>
            <p className="md:text-text-l text-text-s text-neutral-900">
              With <span className="text-secondary-500">Cissou</span>
            </p>
          </div>
        </button>

        <button
         onClick={() => window.open(`https://www.youtube.com/watch?v=${youtubeVideoId}`, '_blank')}
          className="flex items-center md:gap-4 gap-2 justify-center text-left px-8 py-2 bg-secondary-100 rounded-xl border-2 border-transparent hover:border-secondary-500 hover:bg-secondary-50"
        >
          <img src="/assets/video-play.svg" alt="Play video" className="mr-2" />
          <div>
            <p className="text-neutral-500 text-text-xs md:text-text-m">Hear</p>
            <p className="md:text-text-l text-text-s text-neutral-900">
              From <span className="text-secondary-500">Students</span>
            </p>
          </div>
        </button>
      </div>
    </div>
  </div>
    <img
    src="/assets/hero-bg.svg"
    alt=""
    className="hidden md:block pointer-events-none select-none absolute right-0 bottom-0  h-[300px]"
  />
      {showChatBot && (
        <div className='md:bg-black md:bg-opacity-50 fixed inset-0'>
          <span className='absolute md:top-44 md:right-16 top-4 right-9 z-50 text-primary-500 text-3xl cursor-pointer' onClick={() => setShowChatBot(false)} >X</span>
            <NavBar />
            <ChatBot />
        </div>
      )}
   </section>
  );
}

export default Hero ;