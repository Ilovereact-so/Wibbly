import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion';

const EmptyCard = ({item, index, refCard, isIndex}) => {
    const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
    useEffect(() => {

        const alertMessage = () => {
          //alert('localStorage changed!');
          setLocalpallete(JSON.parse(localStorage.getItem('Pallete')))
          console.log("localStorage changed!'")
        }
    
        //window.localStorage.setItem("item", 'val 1');
        window.addEventListener('Pallete', alertMessage);
    
        //Remove the event listener when the component unmounts
        return () => {
          window.removeEventListener("Pallete", alertMessage);
        }
      }, []);
  return (
    <motion.div key={index} ref={refCard} className={`h-[300px] absolute bg-white w-[240px] font-Poppins inline-flex flex-col justify-between rounded-[60px] p-3 py-4 opacity-60 m-2 ${
      index === isIndex && index === isIndex + 2 ? "opacity-60" : ""
    }`}>
      <div className='flex w-full justify-center'>
      <div className='flex flex-col text-[#CECFD0] m-4'>
          <p className='text-[12px] font-bold'>Project {item?.name}</p>
          <p className='text-[10px]'>niewystarczająca ilość</p>
      </div>
      <div className='flex flex-col font-Poppins text-white m-4'>
          <div className='w-[4px] h-[4px] bg-[#CECFD0] rounded-full m-[1.5px]'></div>
          <div className='w-[4px] h-[4px] bg-[#CECFD0] rounded-full m-[1.5px]'></div>
          <div className='w-[4px] h-[4px] bg-[#CECFD0] rounded-full m-[1.5px]'></div>
      </div>
      </div>
      <div className='flex mx-3 my-2 mb-4 justify-center items-center border-[3px] border-solid border-[#CECFD0] rounded-[40px] h-full'>
          <p className='text-[#CECFD0] text-[25px] font-bold'>{index}</p>
      </div>
    </motion.div>
  )
}

export default EmptyCard