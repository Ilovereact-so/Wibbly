import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion';

const EmptyCard = ({item, index, refCard, isIndex, ProjectL, offCard}) => {
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
    <motion.div key={index} ref={refCard} animate={index === isIndex ? {opacity: 0.6} : ""}
     className={`absolute w-[240px] h-[300px] font-Poppins inline-flex flex-col justify-between rounded-[55px] p-3 py-4 m-2 to-[#FFFFFF] from-[#808080] bg-gradient-to-t EmptyCard-Opacity${
      offCard === 1 || index === isIndex ? "" :""
     }`}>
      <div className='flex w-full justify-center'>
      <div className='flex flex-col text-[#5e5e5e] m-4'>
          <p className='text-[12px] font-bold'>Project</p>
          <p className='text-[10px]'>niewystarczająca ilość</p>
      </div>
      <div className='flex flex-col font-Poppins text-white m-4'>
          <div className='w-[4px] h-[4px] bg-[#CECFD0] rounded-full m-[1.5px]'></div>
          <div className='w-[4px] h-[4px] bg-[#CECFD0] rounded-full m-[1.5px]'></div>
          <div className='w-[4px] h-[4px] bg-[#CECFD0] rounded-full m-[1.5px]'></div>
      </div>
      </div>
      <div className='flex mx-3 my-2 mb-4 justify-center items-center border-[3px] border-solid border-[#CECFD0] rounded-[40px] h-full'>
          <p className='text-[#DBDBDB] text-[25px] font-bold'>empty</p>
      </div>
    </motion.div>
  )
}

export default EmptyCard