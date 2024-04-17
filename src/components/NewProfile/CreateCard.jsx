import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion';
const CreateCard = ({item, index, refCard, isIndex, ProjectL, offCard}) => {
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
    <motion.div key={index} ref={refCard} animate={index === isIndex ? {opacity: 0.6} : ""} style={ 
      offCard === 1 ? {background: "linear-gradient(153deg, "+ localpallete[1].color +", "+ localpallete[3].color +")"} :
      index === isIndex + 1 || (isIndex == ProjectL-1 && index <= -ProjectL + (isIndex + 1))? {background: "linear-gradient(180deg, "+ localpallete[1].color +", "+ localpallete[3].color +")"} :
      index === isIndex ? {background: "linear-gradient(207deg, "+ localpallete[1].color +", "+ localpallete[3].color +")"} : ""
    } className={`absolute w-[240px] h-[300px] font-Poppins inline-flex flex-col justify-between rounded-[55px] p-3 py-4 m-2`}>
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
        <div style={{backgroundColor: localpallete[3].color}} className='rounded-full text-[17px] text-white py-3 px-6 font-bold'>Create</div>
        <i className="gg-add scale-[1.3] invert mr-4"></i>
        </div>
    </motion.div>
  )
}

export default CreateCard