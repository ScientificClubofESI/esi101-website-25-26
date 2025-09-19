"use client";
import React, { useState } from "react";

const Slider = () => {
  const arr = [
    "/assets/sliderPicOne.jpg",
    "/assets/datahack.jpg",
    "/assets/cse.jpg",
  ];
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((current - 1 + arr.length) % arr.length);
  };
  const next = () => {
    setCurrent((current + 1) % arr.length);
  };

  // roles: left, center, right
  const roles = [
    "transform translate-x-0 top-8 h-[200px] w-[190px]  scale-100 opacity-100 z-20",
    "transform  translate-x-32 lg:translate-x-40 top-24 h-[130px] w-[120px] scale-90 opacity-70 z-0",
    "transform -translate-x-32 lg:-translate-x-40 top-24 h-[130px] w-[110px] scale-90 opacity-70 z-0",
  ];

  return (
    <div className="relative trans h-[300px]  md:h-[400px] lg:h-full flex items-center justify-center overflow-hidden">
      {arr.map((src, i) => {
        const roleIndex = (i - current + arr.length) % arr.length;
        return (
          <div
            key={i}
            className={`absolute  lg:top-10  lg:h-[390px] lg:w-[330px] rounded-3xl bg-cover bg-center transition-all duration-700 ease-in-out ${roles[roleIndex]}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        );
      })}

      <div className="absolute top-[80%] z-20  md:top-[45%] right-14 md:right-24 flex justify-evenly md:justify-between w-[70%] ">
        <button
          onClick={prev}
          className="h-fit w-fit flex items-center  border-2 border-primary-500 hover:border-secondary-500 rounded-full"
        >
          <svg
            className="stroke-primary-500 hover:stroke-secondary-500"
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 6l-6 6l6 6" />
          </svg>
        </button>
        <button
          onClick={next}
          className="h-fit w-fit flex items-center  border-2 border-primary-500 hover:border-secondary-500 rounded-full"
        >
          <svg
            className="stroke-primary-500 hover:stroke-secondary-500"
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 6l6 6l-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
