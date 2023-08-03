import React, { useEffect, useState } from 'react'
import { Offer1 } from '../constants';
import { Arrow, Arrowsscrollv } from '../assets';

const Offer = () => {
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
    <div className='h-[100vh] relative'>
        <div style={{color: localpallete[1].color}} className='absolute top-0 text-center w-full z-1'><p className='font-bold font-Poppins text-[322px]'>Oferta</p></div>
        <div className='flex w-full h-full relative z-2'>
            <div className='w-[66vw] pt-[100px] bg-[#b7b7b752] flex items-center justify-evenly'>
                <div className='bg-[#F6F7F8] w-auto inline-flex flex-col p-9 pb-5 rounded-[40px]'>
                    <p className='font-Poppins font-bold text-[23px] mb-5'>Strona "wizytówka" </p>
                    <div className='inline-flex flex-col mr-10'>
                    {
                        Offer1.map((item, index)=>(
                            <div
                            key={index}
                            className="flex"
                            >
                                <i className={`mr-3 ${
                                    item.check === 1 ? "gg-check-o border-transparent color-black" : "gg-close"
                                }`}
                                style={{color: localpallete[1].color}}
                                ></i>
                                <p className='inline font-Poppins text-[18px] mb-4'>
                                    {item.title}
                                </p>
                            </div>
                            
                        ))
                    }
                    </div>
                    <div className='flex flex-col px-10 mt-8'>
                        <div className='bg-white font-Poppins font-bold text-[20px] p-4 rounded-full flex justify-center items-center'>&gt; 900zł</div>
                        <div className='flex items-center justify-center relative top-[-10px]'><div className='bg-black p-4 px-14 rounded-full'><img src={Arrow} className='color-white rotate-[270deg]'/></div></div>
                    </div>
                    
                </div>

                <div className='bg-[#F6F7F8] w-auto inline-flex flex-col p-9 pb-5 rounded-[40px]'>
                    <p className='font-Poppins font-bold text-[23px] mb-5'>Strona "wizytówka" </p>
                    <div className='inline-flex flex-col mr-10'>
                    {
                        Offer1.map((item, index)=>(
                            <div
                            key={index}
                            className="flex"
                            >
                                <i className={`mr-3 ${
                                    item.check === 1 ? "gg-check-o border-transparent color-black" : "gg-close"
                                }`}
                                style={{color: localpallete[1].color}}
                                ></i>
                                <p className='inline font-Poppins text-[18px] mb-4'>
                                    {item.title}
                                </p>
                            </div>
                            
                        ))
                    }
                    </div>
                    <div className='flex flex-col px-10 mt-8'>
                        <div className='bg-white font-Poppins font-bold text-[20px] p-4 rounded-full flex justify-center items-center'>&gt; 900zł</div>
                        <div className='flex items-center justify-center relative top-[-10px]'><div className='bg-black p-4 px-14 rounded-full'><img src={Arrow} className='color-white rotate-[270deg]'/></div></div>
                    </div>
                    
                </div>
                
            </div>
            <div className='w-auto'></div>
        </div>
    </div>
  )
}

export default Offer