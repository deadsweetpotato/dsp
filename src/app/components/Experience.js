'use client'
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { EXP_OVERVIEW } from '../data/ExperienceData';
import Button from './Button';
import ExperienceCloud2 from '../../../public/experience-cloud-2.png';

import ExpSection from './ExpSection';

const ExperienceContext = React.createContext();

const Experience = () => {
  const parentRef = useRef(null);
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [experience, setExperience] = useState("KEEPUP");

  useEffect(() => {
    const unsubscribe = scrollY.onChange((value) => {
      if (value > 2300 && value < 2450){
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });

    return () => unsubscribe(); // cleanup
  }, [scrollY]);

  let totalHeight = "";
  if (experience === "HOYA DEVELOPERS") totalHeight = "275vh";
  else totalHeight = "230vh";

  return (
    <ExperienceContext.Provider value={{ experience, setExperience }}>
      <div ref={parentRef} 
          className='grid grid-cols-[30%_70%]'
          style={{height : totalHeight }}
      >

        {/* Sidebar (incl. Experience Menu) */}
        <Sidebar parentRef={parentRef} className='absolute z-[20] top-[40vh]'/>

        <div className='relative flex flex-col bg-[var(--main-beige)] text-[var(--main-red)] '>
          {/* overview */}
          <AnimatePresence>
            {isVisible && (
              <motion.section 
              className='sticky top-[38vh] z-[10] h-[10vh] mr-[20vw]'
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ease: "easeInOut", duration: 0.2}}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className='mb-[10px]'>{EXP_OVERVIEW.p1}</p>
              <p className='mb-[10px]'>{EXP_OVERVIEW.p2}</p>
              <p className='font-semibold italic'>{EXP_OVERVIEW.p3}</p>
            </motion.section>
            )}
          </AnimatePresence>

          {/* experience section */}
          <ExpSection experience={experience}/>

        </div>

      </div>
    </ExperienceContext.Provider>
  );
};

const Sidebar = ({parentRef}) => {

  const lenisRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.15, // Default is 0.1 (lower = smoother, higher = stiffer)
      smoothTouch: true, // Enable smooth scrolling on touch devices
    });
    lenisRef.current = lenis;



    // Update scrollY on scroll
    const handleScroll = () => {
      setScrollY(lenis.scroll); // Lenis provides the current scroll position
    };

    lenis.on("scroll", handleScroll);
    console.log(lenis.scroll);

    // Start Lenis
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Cleanup Lenis on unmount
    };
  }, []);

  const scrollValue = useMotionValue(scrollY);
  // const topPos = useTransform(scrollValue, [1800, 2000, 2500, 3000], [100, 120, 450, 1100]);
  const topPos = useTransform(scrollValue, [1800, 2000, 2500, 3000], [100, 120, 520, 1100]);
  const scaleValue = useTransform(scrollValue, [1800, 2000, 2500, 2700, 4000], [1, 2, 2, 1, 1]);
  const translateX = useTransform(scrollValue, [1800, 2000, 2500, 2700, 4000], ["5vw", "20vw", "20vw", "5vw", "5vw"]);

  useEffect(() => {
    scrollValue.set(scrollY); // Update Framer Motion's MotionValue on scroll
    console.log(scrollY);
  }, [scrollY, scrollValue]);

  return(
    <div className="relative h-full z-20 bg-[var(--main-beige)] overflow-visible">

      <div className="absolute z-10 ml-[10vw] h-[160vh] w-[4px] rounded-full bg-[var(--main-red)] text-[var(--main-red)]">
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 z-10 w-4 h-4 bg-[var(--main-red)] rounded-full"
          style={{ 
            top: topPos,
          }}  
        />
        <motion.h1 
          className='absolute text-[20px] font-bold text-[var(--main-red)]'
          style={{
            top: topPos,
            scale: scaleValue,
            translateX: translateX,
            transformOrigin: "left center", // Anchor scaling to the left
          }}
        >
          EXPERIENCE
        </motion.h1>

      </div>
      
      {/* experience section menu */}
      <Menu />


    </div>
  )
}

const Menu = () => {
  const { experience, setExperience } = React.useContext(ExperienceContext);

  useEffect(() => {
    console.log(experience)
  }, [experience]);

  return(
    <div className='relative z-0 h-full w-full pr-[100px] bg-[var(--main-beige)]'> 
      <Image className='absolute right-[0px] top-[10%] pt-[120vh]' src={ExperienceCloud2} alt={"ExperienceCloud2"}/>
      <div className='absolute right-[100px] top-[250px] pt-[130vh] flex flex-col gap-y-[20px] items-end'>
        <p className='text-[var(--main-red)] text-[10px] font-semibold italic'>––– 2024  </p>
        <Button 
          text={"KEEPUP"}
          onClick={() => {
              setExperience("KEEPUP")
            }}
         />
        <Button 
          text={"HOYALYTICS"}
          onClick={() => setExperience("HOYALYTICS")}
         />
        <Button 
          text={"HOYA DEVELOPERS"}
          onClick={() => setExperience("HOYA DEVELOPERS")}
         />
        <Button 
          text={"THE HOYA"}
          onClick={() => setExperience("THE HOYA")}
         />
        <Button 
          text={"HM ON TECH"}
          onClick={() => setExperience("HM ON TECH")}
         />

        <p className='text-[var(--main-red)] text-[10px] font-semibold italic'> ––– 2021 </p>
      </div>
      <div className="absolute bottom-[0] z-10 ml-[10vw] h-[35vh] w-[4px] rounded-full bg-[var(--main-red)]" />
    </div>
  )
}


export default Experience;