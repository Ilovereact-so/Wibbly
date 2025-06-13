import React, { useEffect, useState } from 'react'
import { Offer1, Offer2, Offer3 } from '../constants';
import { Arrow} from '../assets';
import { usePallete } from '../Context/PalleteContext';
import { CircleCheck, X } from 'lucide-react';

const Offer = ({r}) => {
    const {Pallete} = usePallete()
  return (
    <div id='Offer' ref={r} className='lg:h-[100vh] h-auto relative z-[2]'>
        <div style={{color: Pallete[1]}} className='absolute top-0 text-center w-full z-1'><p className='font-bold font-Poppins xl:text-[322px] lg:text-[300px] md:text-[230px] sm:text-[175px] ss:text-[145px] text-[100px]'>Oferta</p></div>
        <div className='flex sm:flex-row flex-col w-full h-full relative z-[2]'>
            <div className='lg:w-[66vw] sm:w-[50vw] w-full pt-[100px] ss:px-0 px-8 relative bg-[#b7b7b752] flex lg:flex-row flex-col items-center justify-evenly'>
                <div className='bg-[rgba(246,247,248,0.82)] hover:bg-[rgba(246,247,248)] ease-in-out duration-300 ss:w-auto  w-full inline-flex flex-col 2xl:p-9 sm:p-8 ss:p-10 p-9 sm:px-10 ss:px-14 px-9 pb-5 lg:mb-0 mb-[50px] rounded-[40px]'>
                    <p className='font-Poppins font-bold 2xl:text-[23px] xl:text-[19px] text-[17px] mb-5'>Strona "wizytówka" </p>
                    <div className='inline-flex flex-col 2xl:mr-10 sm:mr-5 mr-[60px]'>
                    {
                        Offer1.map((item, index)=>(
                            <div
                            key={index}
                            className="flex"
                            >
                                {item.check == 1 ?<CircleCheck  style={{color: Pallete[0]}} className='border-transparent color-black mr-3'/> : <X className="mr-3" style={{color: Pallete[0]}}/>}
                                <p className='inline font-Poppins 2xl:text-[18px] xl:text-[15px] text-[12px] mb-4'>
                                    {item.title}
                                </p>
                            </div>
                            
                        ))
                    }
                    </div>
                    <div className='flex flex-col 2xl:px-10 xl:px-14 px-10 mt-8'>
                        <div className='bg-white font-Poppins font-bold 2xl:text-[20px] xl:text-[17px] text-[15px] 2xl:p-4 p-3 rounded-full flex justify-center items-center'>&gt; 900zł</div>
                        <div className='flex items-center justify-center relative top-[-10px]'><div className='bg-black rounded-full'><div className='2xl:p-4 p-3 2xl:px-14 px-12 hover:animate-pulse'><img src={Arrow} className='color-white ss:scale-[1] scale-[0.8] rotate-[270deg]'/></div></div></div>
                    </div>
                    
                </div>

                <div className='bg-[rgba(246,247,248,0.82)] hover:bg-[rgba(246,247,248)] ease-in-out duration-300 ss:w-auto w-full inline-flex flex-col 2xl:p-9 sm:p-8 ss:p-10 p-9 sm:px-10 ss:px-14 px-9 pb-5 rounded-[40px] lg:mb-0 mb-[100px] '>
                    <p className='font-Poppins font-bold 2xl:text-[23px] xl:text-[19px] text-[17px] mb-5'>Strona "wizytówka" Level 2 </p>
                    <div className='inline-flex flex-col 2xl:mr-10 sm:mr-5 mr-[60px]'>
                    {
                        Offer2.map((item, index)=>(
                            <div
                            key={index}
                            className="flex"
                            >   
                            {item.check == 1 ?<CircleCheck  style={{color: Pallete[0]}} className='border-transparent color-black mr-3'/> : <X className="mr-3" style={{color: Pallete[0]}}/>}
                                <p className='inline font-Poppins 2xl:text-[18px] xl:text-[15px] text-[12px] mb-4'>
                                    {item.title}
                                </p>
                            </div>
                            
                        ))
                    }
                    </div>
                    <div className='flex flex-col 2xl:px-10 xl:px-14 px-10 mt-8'>
                        <div className='bg-white font-Poppins font-bold 2xl:text-[20px] xl:text-[17px] text-[15px] 2xl:p-4 p-3 rounded-full flex justify-center items-center'>&gt; 1400 zł</div>
                        <div className='flex items-center justify-center relative top-[-10px]'><div className='bg-black rounded-full'><div className='2xl:p-4 p-3 2xl:px-14 px-12 hover:animate-pulse'><img src={Arrow} className='color-white ss:scale-[1] scale-[0.8] rotate-[270deg]'/></div></div></div>
                    </div>
                    
                </div>
                
                <div className='absolute bottom-4 right-10 font-Poppins xl:text-[14px] text-[12px]'><p>cena zależy od wymagań i wielkości projektu</p></div>
                
            </div>

            <div className='flex lg:w-[34vw] sm:w-[50vw] w-full justify-center ss:px-0 px-8 items-center lg:pt-[130px] sm:py-0 py-8 relative z-[1]'>
                <div className='bg-[rgba(246,247,248,0.82)] hover:bg-[rgba(246,247,248)] ease-in-out duration-300 ss:w-auto w-full inline-flex flex-col sm:p-9 ss:p-10 p-9 sm:px-10 ss:px-14 px-9 pb-5 rounded-[40px] z-[1]'>
                        <p className='font-Poppins font-bold 2xl:text-[23px] xl:text-[19px] text-[17px] mb-5'>Strona/Aplikacja webowa </p>
                        <div className='inline-flex flex-col 2xl:mr-10 sm:mr-5 mr-[60px]'>
                        {
                            Offer3.map((item, index)=>(
                                <div
                                key={index}
                                className="flex"
                                >
                                    {item.check == 1 ?<CircleCheck  style={{color: Pallete[0]}} className='border-transparent color-black mr-3'/> : <X className="mr-3" style={{color: Pallete[1]}}/>}
                                    
                                    <p className='inline font-Poppins 2xl:text-[18px] xl:text-[15px] text-[12px] mb-4'>
                                        {item.title}
                                    </p>
                                </div>
                                
                            ))
                        }
                        </div>
                        <div className='flex flex-col 2xl:px-10 xl:px-14 px-10 mt-8'>
                            <div className='bg-white font-Poppins font-bold 2xl:text-[20px] xl:text-[17px] text-[15px] 2xl:p-4 p-3 rounded-full flex justify-center items-center'>&gt; 2300 zł</div>
                            <div className='flex items-center justify-center relative top-[-10px]'><div className='bg-black rounded-full'><div className='2xl:p-4 p-3 2xl:px-14 px-12 hover:animate-pulse'><img src={Arrow} className='color-white ss:scale-[1] scale-[0.8] rotate-[270deg]'/></div></div></div>
                        </div>
                        
                    </div>
                    <div className='absolute top-0 left-0 w-full h-full z-[-1] bg-[#b7b7b752] rounded-br-[100%]'>
                        <div className="h-full w-auto  "></div>
                    </div> 
            </div>
        </div>
    </div>
  )
}

export default Offer
//lg:bg-[url('/src/assets/Triangle.svg')]