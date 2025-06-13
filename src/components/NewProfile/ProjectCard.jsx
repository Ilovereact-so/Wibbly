import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion';
import { usePallete } from '../../Context/PalleteContext';
const ProjectCard = ({item, index, refCard, isIndex, ProjectL, offCard}) => {
  const {Pallete} = usePallete()
  return (
    <motion.div key={index} ref={refCard} animate={index === isIndex ? {opacity: 0.6} : ""} style={ 
      offCard === 1 ? {background: "linear-gradient(153deg, "+ Pallete[1] +", "+ Pallete[3] +")"} :
      index === isIndex + 1 || (isIndex == ProjectL-1 && index <= -ProjectL + (isIndex + 1))? {background: "linear-gradient(180deg, "+ Pallete[1] +", "+ Pallete[3] +")"} :
      index === isIndex ? {background: "linear-gradient(207deg, "+ Pallete[1] +", "+ Pallete[3] +")"} : ""
    } className={`PropertyCard md:0-auto absolute w-[240px] h-[300px] font-Poppins inline-flex flex-col justify-between rounded-[55px] p-3 py-4 m-2`}>
      <div className='flex flex-col w-full'>
        <div className='flex w-full justify-between px-4'>
            <div className='flex flex-col text-white m-4 mb-1'>
                <p className='text-[17px] font-bold'>Project: </p>
            </div>
            <div className='flex flex-col font-Poppins text-white m-4 mb-0 mt-5'>
                <div className='w-[3px] h-[3px] bg-white rounded-full m-[1.3px]'></div>
                <div className='w-[3px] h-[3px] bg-white rounded-full m-[1.3px]'></div>
                <div className='w-[3px] h-[3px] bg-white rounded-full m-[1.4px]'></div>
            </div>
        </div>
        <div className='w-full px-4 '>
          <div style={{backgroundColor:Pallete[1]}} className='text-[17px] w-full rounded-full flex justify-center items-center py-2 opacity-[0.8] text-white backdrop-opacity-60'>{item?.name}</div>
          <div className='flex justify-between font-Poppins mt-5'>
            <p className='font-bold text-[10px] text-black'>created at:</p>
            <p className='text-black text-[11px]'>2024-02-18 16:24:22</p>
          </div>
          <div className='flex justify-between font-Poppins mt-2'>
            <p className='font-bold text-[10px] text-black'>updated at:</p>
            <p className='text-black text-[11px]'>2024-02-18 16:24:22</p>
          </div>
        </div>
      </div>
      <div className='flex px-4 my-2 w-ful justify-center items-center'>
        <div className='rounded-full text-[14px] text-black py-3 px-14 font-bold bg-white text-center'>Open</div>
      </div>
    </motion.div>
  )
}

export default ProjectCard