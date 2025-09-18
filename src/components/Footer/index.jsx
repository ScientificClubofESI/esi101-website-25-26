"use client";
import React, { useState } from 'react';

const SocialIcon = ({iconlight, icondark, iconhover}) => {
  return (
    <>
          <img src={iconlight} alt="social media" 
          className='dark:hidden group-hover:hidden w-[2rem] md:w-[3.2rem]'/>
          <img src={icondark} alt="social media"
          className='hidden dark:block group-hover:hidden w-[2rem] md:w-[3.2rem]' />
          <img src={iconhover} alt="social media" 
          className='hidden group-hover:block w-[2rem] md:w-[3.2rem]'/>
    </>
  )
}


const Footer = ()=>{
  const [hovered, setHovered] = useState(false);

  return(
   <section>
    <div className='flex flex-col items-center gap-[0.75rem] mt-[2.5rem] md:gap-[1.5rem] mb-[0.5rem] mx-auto md:px-24 px-8'>
      <img src="/assets/esi-icon.png" alt="esi logo" 
      className='dark:hidden w-[20.1875rem] md:w-[35rem]'/>
      <img src="/assets/Dark Logo.svg" alt="esi logo"
      className='dark:block hidden w-[20.1875rem] md:w-[35rem] '/>

      <ul className='flex gap-[0.75rem] md:gap-[1.25rem]'>
        <li className='group'><a href="https://www.instagram.com/cse.club/?hl=fr" target="_blank" rel="noopener noreferrer">
        <SocialIcon iconlight="/assets/instagram.svg" icondark="/assets/instagramWhite.svg" iconhover="/assets/instagramOrange.svg" />
        </a></li>

       <li className='group'><a href="https://www.facebook.com/club.scientifique.esi" target="_blank" rel="noopener noreferrer">
        <SocialIcon iconlight="/assets/facebook.svg" icondark="/assets/facebookWhite.svg" iconhover="/assets/fbOrange.svg" />
        </a></li>

       <li className='group'><a href="https://www.youtube.com/@ClubScientifiqueESI-CSE" target="_blank" rel="noopener noreferrer">
        <SocialIcon iconlight="/assets/youtube.svg" icondark="/assets/youtubeWhite.svg"  iconhover="/assets/ytOrange.svg" />
        </a></li>

       <li className='group'><a href="https://www.linkedin.com/company/cse-club" target="_blank" rel="noopener noreferrer">
        <SocialIcon iconlight="/assets/linkedin.svg" icondark="/assets/linkedinWhite.svg" iconhover="/assets/lkOrange.svg" />
        </a></li>

       <li className='group'><a href="https://x.com/CSESI_Club" target="_blank" rel="noopener noreferrer">
        <SocialIcon iconlight="/assets/twitter.svg" icondark="/assets/twitterWhite.svg" iconhover="/assets/xOrange.svg"/>
        </a></li>
      </ul>

      <div className='flex items-center'>
      <p className='text-black dark:text-[#ECF1FC] text-xs md:text-xl'>Made with <span className="text-red-500 text-base">❤️</span> by</p>
        <img src="/assets/cseLightM.svg" alt='cse logo' 
        className='dark:hidden w-[4.55rem] md:w-[9.1rem]'/>
        <img src="/assets/cseDarkM.svg" alt="cse logo" 
        className='dark:block hidden w-[4.55rem] md:w-[9.1rem]'/>
      </div>
    </div>

<div className='absolute right-[6.06rem]'>
  <button className='relative hidden md:block bottom-[7rem]'
  onClick={() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  >
  <img src="/assets/uparrow.svg" alt="Scroll to top"
  className={` ${hovered ? 'opacity-0 ': 'opacity-100'}`}/>
  <img src="/assets/uparrowLight.svg" alt="Scroll to top" 
  className={`absolute top-0 right-0 ${hovered ? 'opacity-100' : 'opacity-0'}`}/>
  </button>
    </div>
   </section>
  );
}
export default Footer ;