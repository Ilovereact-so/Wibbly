import React, { useEffect, useState } from 'react'
import { Pallete1 } from '../constants'

const Navbar = () => {
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
    <div>
        <div style={{backgroundColor: localpallete[3].color}} className='ss:h-[157px] h-[119px] ss:w-[37px] w-[30px] hover:w-[37px] ease-in-out duration-300 rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center'>
            <i className="gg-menu-cake scale-[0.8]"></i>
        </div>
    </div>
  )
}

export default Navbar