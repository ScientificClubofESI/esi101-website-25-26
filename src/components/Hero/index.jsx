"use client";
import {useState, useEffect} from 'react';
import ChatBot from '../ChatBot/index.jsx';
import NavBar from '../NavBar/index.jsx';

const Hero = ()=>{
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
   <section className='mb-8 md:mb-16 mx-auto md:px-24 px-8'>
    <div className="flex flex items-start">
    <div className="flex flex-col items-center w-[50%] hidden md:block">
      <div className='flex gap-x-4'>
      <img src="/assets/hero-pic-2.png" alt="Hero" className='' />
            <img src="/assets/hero-pic-1.png" alt="Hero" className='h-full' />
      </div>
      <div className='relative -top-[8rem] -left-[0.5rem]'>
        <img src="/assets/union.svg" alt="Hero" className='dark:hidden'/>
        <img src="/assets/union.png" alt="Hero" className='dark:block hidden'/>
        <p className='relative left-[19rem] -top-[21rem] text-text-s text-primary-900 dark:text-primary-100'>Belong, grow, and shine at ESI.</p>
        <img src="/assets/circle.svg" alt="Hero" className='relative left-[21rem] -top-[16.5rem] dark:hidden'/>
        <img src="/assets/circle.png" alt="Hero" className='relative left-[21rem] -top-[16.5rem] dark:block hidden'/>
      </div>
    </div>
    <div className="md:w-[50%] w-full md:mt-12">
      <img src="/assets/esi-icon.png" alt="Logo" className='dark:hidden w-[40rem] my-8' />
      <img src="/assets/Dark%20Logo.svg" alt="Logo" className='hidden dark:block my-8' />
      <h1 className='md:text-heading-l text-text-l text-center md:text-left mb-8 text-primary-900 dark:text-background-light'>Welcome to <span className="text-secondary-500 dark:text-primary-500">ESI 101</span> space</h1>
      <p className='md:w-[29rem] text-text-s md:text-text-m md:text-left text-center text-neutral-800 dark:text-neutral-100'>Welcome to ESI 101, an exclusive event designed to help first-year students make the most of their journey at ESI !</p>
      <div className='mt-8 flex md:flex-row flex-col gap-6 justify-center md:justify-start  '>
        <button onClick={handleChatClick} className='flex items-center justify-center md:gap-4 gap-2 text-left px-8 py-2 bg-secondary-100 rounded-xl border-2 border-transparent hover:border-2 hover:border-secondary-500 hover:bg-secondary-50'>
          <img src="/assets/messages.svg" alt="Chat Icon" className='inline-block mr-2' />
          <div>
            <p className='text-neutral-500 text-text-xs md:text-text-m'>Chat</p>
            <p className='md:text-text-l text-text-s text-neutral-900'>With <span className='text-secondary-500'>Cissou</span></p>
          </div>
        </button>
        <button className='flex items-center md:gap-4 gap-2 justify-center text-left px-8 py-2 bg-secondary-100 rounded-xl border-2 border-transparent hover:border-2 hover:border-secondary-500 hover:bg-secondary-50'>
          <img src="/assets/video-play.svg" alt="Play video" className='inline-block mr-2' />
          <div>
            <p className='text-neutral-500 text-text-xs md:text-text-m'>Hear</p>
            <p className='md:text-text-l text-text-s text-neutral-900'>From <span className='text-secondary-500'>Cissou</span></p>
          </div>
        </button>
      </div>
    </div>
    </div>
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