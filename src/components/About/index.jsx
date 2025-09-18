import React from "react";
import Image from "next/image";
import Slider from "./slider";
const About = () => {
  return (
    <section className="relative my-10 p-5 md:p-10 lg:px-24 lg:py-14 flex flex-col justify-start gap-16 lg:gap-24">
      {" "}
      <div className="relative  ">
        <h1 className="text-primary-500 font-light text-heading-m  lg:text-[47px]  capitalize ">
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
      <div className="lg:grid lg:grid-cols-[50%_50%] gap-10 items-start">
        <div className="text-neutral-950 flex flex-col justify-start gap-8  w-full  dark:text-neutral-50">
          <p className="text-text-l ">
            CSE—the Scientific Club of ESI! Founded in 2008 by students from the
            National School of Computer Science, our mission is to enhance
            student life through engaging learning experiences and the sharing
            of knowledge in technology.
          </p>
          <div className="relative  font-light  w-full flex capitalize text-text-m rounded-full  gap-6 justify-evenly items-center  ">
            <div className="bg-primary-100  py-5  w-full flex capitalize text-text-m rounded-full justify-evenly items-center  dark:bg-primary-800">
              <span>+600 members</span>
            </div>
            <div className="h-[60px] absolute inset-0 m-auto clip-wave  bg-primary-100 rounded-t-sm rounded-b-sm w-14 dark:bg-primary-800 "></div>
            <div className="bg-primary-100   py-5 w-full flex capitalize text-text-m rounded-full justify-evenly items-center  dark:bg-primary-800">
              <span>+20 partners</span>
            </div>
          </div>
        </div>
        <Slider></Slider>
      </div>
      <div className=" hidden lg:block absolute space-y-reverse -bottom-16 w-72 md:w-[280px] lg -left-1 ">
        <Image src="/assets/Vector.svg" alt="vector" width={450} height={100} />
      </div>
    </section>
  );
};

export default About;
