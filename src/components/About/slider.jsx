"use client";
import React, { useState } from "react";
import Image from "next/image";
import { setConfig } from "next/config";
const Slider = () => {
  const arr = [
    "/assets/sliderPicOne.jpg",
    "/assets/landscape-9833605_1280.jpg",
    "/assets/new-york-city-9831647_1280.jpg",
    "/assets/landscape-9833604_1280.jpg",
  ];

  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((current - 1 + arr.length) % arr.length);
  };

  const next = () => {
    setCurrent((current + 1) % arr.length);
  };

  const left = (current - 1 + arr.length) % arr.length;
  const right = (current + 1) % arr.length;

  return (
    <div>
      <div className="flex justify-between">
        <Image
          src={arr[left]}
          width={300}
          height={300}
          alt="left"
          className="opacity-30"
        />
        <Image src={arr[current]} width={300} height={300} alt="current" />
        <Image
          src={arr[right]}
          width={300}
          height={300}
          alt="right"
          className="opacity-30"
        />
      </div>
      <div onClick={next} className="border-2 cursor-pointer">
        go right
      </div>
      <div onClick={prev} className="border-2 cursor-pointer">
        go left
      </div>
    </div>
  );
};

export default Slider;
