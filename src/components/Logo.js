import React, { useEffect, useRef, useState} from 'react'
import $ from 'jquery'
import { Pallete0G, Pallete1G, Pallete2G, Pallete3G, Pallete4G, Pallete5G } from '../constants'
import { usePallete } from '../Context/PalleteContext'
import {delay, motion} from 'framer-motion'

function Logo({onAnimationEnd}) {
    //const[color, setColor] = useState("");
    const [windowW, setWindowW] = useState()
    const scale = 0.000825

    $(window).on('resize scroll', function() {
      setWindowW($(window).innerWidth())
      
    });
    $( document ).ready(function(){
      setWindowW($(window).innerWidth())

      if(windowW <= 730){
        $(".logo-Home").css("transform", 'scale('+ windowW * scale +')')
      }else{
          $(".logo-Home").css("transform", 'scale(1)')
      }
  });
  const {isPalleteNum} = usePallete()
  
  const Pallets = [Pallete0G, Pallete1G, Pallete2G, Pallete3G, Pallete4G, Pallete5G]
  const steps = Pallets[isPalleteNum].length; // Ilość warstw = ilość cięciw

  const [isAnimationState, setAnimationState] = useState(false) 
  const elementRef = useRef()

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/** <hr className='bg-red-400 translate-y-[-50%] top-[50%] w-full absolute'/>*/}
      {Pallets[isPalleteNum].map((item, index) => {
        const height =  index <= 10 ?  13 : 16; // Wysokość każdej cięciwy
        const R1 = (height * steps) / 2; // Promień koła
        const y = index <= 10 ? R1 - (index +1) * height : R1 - (index ) * height; // Pozycja w osi Y (środek na R1)
        const chordWidth =  2 * Math.sqrt(Math.max(0, R1 ** 2 - y ** 2)) ; // Szerokość cięciwy
        const variants = {
          animate:{y:0, opacity:1},
          initial:{y: index <= 10 ? (12*11) + 6 : -(12*11) - 6 , opacity: 0} //liczba cięciw * ich wysokość - margin
        }
        return (
          <motion.div
            key={index}
            initial="initial"
            animate="animate"
            variants={variants}
            transition={{ ease: "linear", duration:6, opacity:{delay: index <= 10 ? index * 0.6 : ((index * -1) + 21) * 0.6}}}
            onAnimationComplete={index === steps - 1 ? () => onAnimationEnd(true) : undefined}
            style={{ backgroundColor: item.color, width: chordWidth }}
            className={`h-[12px] rounded-full ${index === 10 ? "mb-2":""}`}
          ></motion.div>
        );
      })}
    </div>
  );
}
export default Logo