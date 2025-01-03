'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { motion, useTransform } from "framer-motion";
import { EXP_BLURBS, EXP_IMPACTS, EXP_ROLES, EXP_PROJECTS, EXP_LINKS, EXP_TECHS } from '../data/ExperienceData';
import Button from './Button';
import Image from 'next/image';
import Arrow from '../../../public/Arrow.svg'
import ExperienceCloud2 from '../../../public/experience-cloud-2.png';


const ExperienceContext = React.createContext();

const ExpSection = () => {
  const [experience, setExperience] = useState("KEEPUP");

  return (
    <ExperienceContext.Provider value={{ experience, setExperience }}>
      <div className='relative h-full grid grid-cols-[30%_70%] '
        >
        <Menu />
        <section className='relative h-full mb-[10vh] px-[10vw] text-[var(--main-red)] bg-[var(--main-beige)]'>
          <Role experience={experience} />
          <Blurb experience={experience} />
          {(experience === "KEEPUP" || 
            experience === "HOYALYTICS" || 
            experience === "THE HOYA" ||
            experience === "HM ON TECH") 
            && <Impact experience={experience} />}
          
          {(experience === "HOYA DEVELOPERS") 
            && <Projects experience={experience} />}
        </section>
      </div>
    </ExperienceContext.Provider>

  );
};

const Role = ({experience}) => {
  return (
    <div className='relative w-full text-[30px] whitespace-nowrap'>
      <div className="flex flex-row font-semibold h-[30px] mb-[5px]">
        <h1>
          {EXP_ROLES[experience].title}
        </h1>
        <h1 className="ml-[5px] text-[var(--main-blue)]">
          @ {EXP_ROLES[experience].company}
        </h1>
      </div>
      <p className='text-[15px] italic font-semibold text-[var(--main-blue)]'>
        ({EXP_ROLES[experience].date})
      </p>

    </div>
  )
}

const Blurb = ({experience}) => {
  return (
    <div className='flex flex-col justify-center gap-y-3 mt-[5vh]'>
      {EXP_BLURBS[experience].map((paragraph, index) => (
        <div className='flex flex-row gap-x-5' key={index}>
          <Image src={Arrow} alt='arrow' className='w-[16px] h-[16px] mt-[2px]'/>
          <p className='leading-tight'>
            {paragraph}
          </p>
        </div>
      ))}
    
    </div>
  )
}

const Impact = ({experience}) => {
  return(
    <div>
      <div className='flex flex-row items-center gap-x-3 mt-[5vh]'>
        <h1 className='font-semibold text-[20px]'>IMPACT</h1>
        <div className='w-full h-[3px] bg-[var(--main-red)]'/>
      </div>

      {EXP_IMPACTS[experience].map((paragraph, index) => (
        <ul className='list-disc mt-[10px] ml-4 leading-tight space-y-[15px]' key={index}>
          <li>{paragraph}</li>
        </ul>
      ))}

      {/* tidbits – links, techstack */}
      <TidBits experience={experience}/>
    </div>
  )
}

const Projects = ({experience}) => {
  return(
    <div>
      <h1 className='font-bold italic text-[15px] mt-[5vh]'>PROJECTS</h1>

      {/* <p className='italic font-light whitespace-nowrap'>(S/S 24)</p> */}

      {Object.entries(EXP_PROJECTS[experience]).map(([project, details], index) => (
        <section className='mb-[30px]' key={index}>
          <div className='flex flex-row items-center justify-start gap-x-[5px] text-[var(--main-blue)] text-[25px]'>
            <h1 className='font-semibold whitespace-nowrap'>{project}</h1>
            <div className='ml-[10px] w-full h-[2px] bg-[var(--main-red)] rounded-[5px]' />
            {details.site && <Button 
              text={"SITE"}
              style={{
                borderWidth: '2px',
                opacity: '100%',
                fontSize: '15px',
                padding: '7px',
                paddingLeft: '10px',
                paddingRight: '10px',
                marginLeft: '10px'
              }}
              link={details.site}
            />}
          </div>
          <ul className='list-disc mt-[10px] ml-4 leading-tight space-y-[10px]'>
          {details.paragraphs.map((paragraph, paragraphIndex) => (
            <li key={paragraphIndex}>{paragraph}</li>
          ))}
          </ul>

        </section>
      ))}
            
      {/* tidbits -- links, tech stack */}
      <TidBits experience={experience} className="relative" />
      
    </div>
  )
}

const TidBits = ({experience}) => {
  return(
    <div 
        className='relative w-full h-[5vh] '
        style={{ marginTop: 'min(50px, 10vh)' }}
    >
        <div className='mb-[10px] h-[2px] rounded-[5px] bg-[var(--main-blue)] '/>

        <div className='flex flex-row justify-start '>
          <div className='flex flex-row gap-x-[10px]'>
            {EXP_LINKS[experience] && Object.entries(EXP_LINKS[experience]).map(([name, link], index) => (
              <Button 
              key={index}
              text={name} 
              style={{
                borderColor: 'var(--main-blue)',
                borderWidth: '2px',
                color: 'var(--main-blue)',
                opacity: '100%',
                fontSize: '18px'
              }}
              link={link}
            />
            ))}
          </div>

          <div className='ml-auto flex flex-row justify-end gap-x-[15px] text-[var(--main-blue)] text-[18px] font-semibold italic underline'>
            {EXP_TECHS[experience] && EXP_TECHS[experience].map((tech, index) => (
              <p key={index}>{tech}</p>
            ))}
          </div>
      </div>
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
      <Image className='absolute right-[0px] ' src={ExperienceCloud2} alt={"ExperienceCloud2"}/>
      <div className='absolute right-[100px] top-[130px] flex flex-col gap-y-[20px] items-end'>
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

export default ExpSection;