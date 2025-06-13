import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion';
import { usePallete } from '../../Context/PalleteContext';
import { CirclePlus } from 'lucide-react';

const CreateCard = ({item, index, refCard, isIndex, ProjectL, offCard}) => {
    const {Pallete} = usePallete()
  return (
    <motion.div key={index} ref={refCard} animate={index === isIndex ? {opacity: 0.6} : ""} style={ 
      offCard === 1 ? {background: "linear-gradient(153deg, "+ Pallete[1] +", "+ Pallete[3] +")"} :
      index === isIndex + 1 || (isIndex == ProjectL-1 && index <= -ProjectL + (isIndex + 1))? {background: "linear-gradient(180deg, "+ Pallete[1] +", "+ Pallete[3] +")"} :
      index === isIndex ? {background: "linear-gradient(207deg, "+ Pallete[1] +", "+ Pallete[3] +")"} : ""
    } className={`absolute md:right-0 w-[240px] h-[300px] font-Poppins inline-flex flex-col justify-between rounded-[55px] p-3 py-4 m-2`}>
        <div className='flex'>
        <div className='flex flex-col text-white mx-4'>
            <p className='text-[40px] font-bold'>Stwórz</p>
            <p className='text-[17px] translate-y-[-8px]'>projekt</p>
        </div>
        <div className='flex flex-col font-Poppins text-white m-4'>
            <div className='w-[4px] h-[4px] bg-white rounded-full m-[1.5px]'></div>
            <div className='w-[4px] h-[4px] bg-white rounded-full m-[1.5px]'></div>
            <div className='w-[4px] h-[4px] bg-white rounded-full m-[1.5px]'></div>
        </div>
        </div>
        <div className='flex mx-4 my-2 justify-between items-center'>
        <div style={{backgroundColor: Pallete[3]}} className='rounded-full text-[17px] text-white py-3 px-6 font-bold'>Create</div>
        <CirclePlus className='scale-[1.3] invert mr-4'/>
        </div>
    </motion.div>
  )
}

export default CreateCard