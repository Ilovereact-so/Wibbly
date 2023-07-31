import React, { useEffect, useState } from 'react'
import { NavbarList } from '../constants'
import { Arrow, Createuplogo } from '../assets';

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
      <div className='w-[50vw] relative h-full left-[-12px] '>
        <div style={{backgroundColor: localpallete[3].color}} className='h-[100vh] sticky top-0 px-4'>
            <div className='flex justify-around items-center pt-8'>
              <div className='p-[4px] border-black border-2 rounded-[18px]'><img src={Createuplogo} className="w-[50px] h-[50px]"/></div>
              <div><p className='font-bold font-Poppins text-[26px]'>CreateUp  navbar</p></div>
            </div>
            <div>
            {NavbarList.map((item, index) => (
              <div
                key={index}
                className="w-full flex px-9 justify-between py-4"
                >
                <img src={Arrow} className='w-[17px]'/>
                <div className='mx-4 flex items-center'>
                  <p className='pr-5'>{item.text}</p>
                  <i className={item.icon} alt={item.alt}></i>
                </div>
              </div>
              ))}
            </div>
        </div>
      </div>
    </div>
    
  )
}

export default Navbar