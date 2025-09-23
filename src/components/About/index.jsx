import React from "react";
import Image from "next/image";
import Slider from "./slider";
const About = () => {
  return (
    <section className="relative my-16  p-5 md:p-16 my-24 lg:p-24 my-32  lg:grid lg:grid-cols-[50%_50%] gap-10 items-start" id="about">
      {" "}
      <div className="relative  flex flex-col justify-start gap-14 lg:gap-24">
        <div className="relative">
          <h1 className="text-primary-500 font-light text-heading-m  lg:text-[49px]  capitalize ">
            {" "}
            About <span className="text-secondary-500 uppercase">
              cse
            </span> club{" "}
          </h1>
          <div className="absolute top-7 w-72 md:w-[350px] lg:w-[450px] lg left-0 ">
            <Image
              src="/assets/Vector (1).svg"
              alt="vector"
              width={450}
              height={100}
            />
          </div>
        </div>
        <div className="">
          <div className="text-background-dark flex flex-col justify-start gap-10  w-full  dark:text-neutral-50">
            <p className="text-text-m md:text-text-l ">
              CSE—the Scientific Club of ESI! Founded in 2008 by students from
              the National School of Computer Science, our mission is to enhance
              student life through engaging learning experiences and the sharing
              of knowledge in technology.
            </p>
            <div className="relative  font-light  w-full flex capitalize text-text-m rounded-full  gap-6 justify-evenly items-center  ">
              <div className="bg-primary-100  py-5  w-full flex capitalize text-text-m rounded-full justify-evenly items-center  dark:bg-primary-800">
                <span>+1600 members</span>
              </div>
              <div className="h-[60px] absolute inset-0 m-auto clip-wave  bg-primary-100 rounded-t-sm rounded-b-sm w-14 dark:bg-primary-800 "></div>
              <div className="bg-primary-100   py-5 w-full flex capitalize text-text-m rounded-full justify-evenly items-center  dark:bg-primary-800">
                <span>+250 partners</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Slider></Slider>
      <div className=" hidden lg:block absolute space-y-reverse -bottom-16 w-72 md:w-[280px] lg -left-1 ">
        <Image src="/assets/Vector.svg" alt="vector" width={450} height={100} />
      </div>
      <div className=" hidden lg:block absolute -z-50 space-y-reverse top-10 w-72 md:w-[180px] lg right-2 ">
        <Image
          src="/assets/Group 4.png"
          alt="vector"
          width={450}
          height={100}
        />
      </div>
    </section>
  );
};

export default About;