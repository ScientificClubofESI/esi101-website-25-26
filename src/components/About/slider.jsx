"use client";
import React, { useState } from "react";

const Slider = () => {
  const ArrayOfImages = [
    "/assets/sliderPicOne.jpg",
    "/assets/datahack.jpg",
    "/assets/cse.jpg",
  ];

  // Each item will take one of three "slots": left, center, right
  const positions = [
    "absolute top-0 left-48 h-[350px] w-[320px] rounded-3xl z-10 bg-cover bg-center transition-all duration-500",
    "absolute top-6 left-20 h-[310px] w-[300px] rounded-3xl opacity-40 z-0 bg-cover bg-center transition-all duration-500",
    "absolute top-6 left-[300px] h-[310px] w-[300px] rounded-3xl opacity-40 z-0 bg-cover bg-center transition-all duration-500",
  ];

  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((current - 1 + ArrayOfImages.length) % ArrayOfImages.length);
  };

  const next = () => {
    setCurrent((current + 1) % ArrayOfImages.length);
  };

  return (
    <div className="relative h-[400px] w-full">
      <div className="relative h-full w-full">
        {ArrayOfImages.map((src, i) => {
          const posIndex =
            (i - current + ArrayOfImages.length) % ArrayOfImages.length;
          return (
            <div
              key={i}
              className={positions[posIndex]}
              style={{ backgroundImage: `url(${src})` }}
            ></div>
          );
        })}
      </div>

      <div className="absolute top-[40%] right-16 flex justify-between w-[70%] ">
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
