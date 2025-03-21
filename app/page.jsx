import React from 'react';

// components
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import TypewriterEffect from "@/components/TypewriterEffect";
import DownloadButton from "@/components/DownloadButton";

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="container mx-auto flex-grow flex items-center">
        <div className="flex flex-col xl:flex-row items-center justify-between w-full">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none flex flex-col">
            <TypewriterEffect />
            <h1 className="h1 mb-6">
              Hello I'm <br /> <span className="text-accent">Ivan Rodriguez</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              I excel at crafting elegant digital experiences and I am
              proficient in various programming languages and technologies.
            </p>
            {/* btn and socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <DownloadButton />
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;