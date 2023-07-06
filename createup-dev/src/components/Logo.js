import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { Pallete1G } from '../constants'

function Logo({loaded}) {
    const[color, setColor] = useState("");
    const data = {data:"h-[11px] rounded-[4px] bg-white"}
    useEffect(() => {
      if(loaded == false){
        StartColor()
      }
      if(loaded == true){
        Getcolor()
      }
    });
    
    const Getcolor = () => {
      let palette = window.localStorage.getItem("Palette")
      if(palette = "Pallete1G"){      
        for(let index = 0; index < Pallete1G.length; index++) {
          // Do some stuff
          $('#b'+ (index  + 1)).css('background-color',Pallete1G[index].color);
        }
    }
    }
    
    const StartColor = () => {
    window.localStorage.setItem("Palette", "Pallete1G");
    const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    // Run some loop in async function
    (async () => {
      // Loop for 5 times
      for(let index = 0; index < Pallete1G.length; index++) {
        // Do some stuff
        $('#b'+ (index  + 1)).css('background-color',Pallete1G[index].color);
        $('#b'+ (index  + 1)).fadeOut().fadeIn('slow');

        console.log(`Some stuff ${index}`);
        // Wait for timeout 1000 ms
        await timeout(30);
      }
    })();
    }

  return (
    <div className='w-full flex flex-col justify-center items-center '>
        <div id='b1' className={`w-[79px] ${data.data}`}></div>
        <div id='b2' className={`w-[125px] relative top-[-1px] ${data.data} `}></div>
        <div id='b3' className={`w-[147px] relative top-[-2px] ${data.data} `}></div>
        <div id='b4' className={`w-[163px] relative top-[-3px] ${data.data} `}></div>
        <div id='b5' className={`w-[185px] relative top-[-4px] ${data.data} `}></div>
        <div id='b6' className={`w-[203px] relative top-[-5px] ${data.data} `}></div>
        <div id='b7' className={`w-[223px] relative top-[-6px] ${data.data} `}></div>
        <div id='b8' className={`w-[223px] relative top-[-7px] ${data.data} `}></div>
        <div id='b9' className={`w-[243px] relative top-[-8px] ${data.data} `}></div>
        <div id='b10' className={`w-[243px] relative top-[-9px] ${data.data} `}></div>
        <div id='b11' className={`w-[243px] relative top-[-10px] mb-2 ${data.data} `}></div>

        <div id='b12' className={`w-[313px] relative top-[-11px] ${data.data} `}></div>
        <div id='b13' className={`w-[313px] relative top-[-12px] ${data.data} `}></div>
        <div id='b14' className={`w-[313px] relative top-[-13px] ${data.data} `}></div>
        <div id='b15' className={`w-[287px] relative top-[-14px] ${data.data} `}></div>
        <div id='b16' className={`w-[287px] relative top-[-15px] ${data.data} `}></div>
        <div id='b17' className={`w-[265px] relative top-[-16px] ${data.data} `}></div>
        <div id='b18' className={`w-[239px] relative top-[-17px] ${data.data} `}></div>
        <div id='b19' className={`w-[213px] relative top-[-18px] ${data.data} `}></div>
        <div id='b20' className={`w-[189px] relative top-[-19px] ${data.data} `}></div>
        <div id='b21' className={`w-[163px] relative top-[-20px] ${data.data} `}></div>
        <div id='b22' className={`w-[103px] relative top-[-21px] ${data.data}`}></div>
    </div>
  )
}
export default Logo