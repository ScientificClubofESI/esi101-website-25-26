import React from "react";
import Image from "next/image";
const About = () => {
  return (
    <section className=" m-5 md:m-10 lg:m-20">
      <div>
        <div className="relative  ">
          <h1 className="text-primary-500 font-light text-heading-m md:text-4xl lg:text-5xl  capitalize ">
            {" "}
            About <span className="text-secondary-500 uppercase">
              cse
            </span> club{" "}
          </h1>
          <div className="absolute top-5 w-72 md:w-[350px] lg:w-[450px] lg left-0 ">
            <Image
              src="/assets/Vector (1).svg"
              alt="vector"
              width={450}
              height={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
