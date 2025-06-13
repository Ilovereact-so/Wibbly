import React, { useEffect, useState } from 'react'
import { Pallete0, Pallete1, Pallete2, Pallete3, Pallete4, Pallete5, Pallets } from '../constants'
import $ from 'jquery';
import { usePallete } from '../Context/PalleteContext';
import { Options } from 'css.gg';

const PalleteSection = ({r}) => {      
    const {isPalleteNum, setPalleteNum, Pallete} = usePallete()


  return (
    <div id='UXPsys' ref={r} className='h-[100vh] mb-[100px] w-full flex md:flex-row flex-col-reverse justify-center  items-center sticky z-[2] top-[-420px] '>
        <div className=' md:w-[40vw] w-auto md:h-[65%] h-auto md:px-[35px] ss:px-[25px] px-[18px] bg-[#F6F7F8] md:rounded-[49px] rounded-[20px] md:ml-0 ss:ml-16 ml-8 ss:mr-16 mr-12'>
            <div className='pl-[25px] flex items-center mt-6'>
                <Options className='text-black scale-125'/>
                <div className='flex flex-col ml-12'>
                    <p className='font-bold font-Poppins md:text-[21px] text-[9px]'>Change</p>
                    <p className='font-Poppins md:text-[21px] text-[9px]'>your Color pallete</p>
                </div>
            </div>
            <div className=' md:mt-10 mt-6 mb-8 md:mb-0'>
                <div className='grid grid-template-columns saturate-50 hover:saturate-100 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-4 ease-in-out duration-300 w-full h-full justify-center items-center'>
                    {Pallets.map((item, index) => (
                        <div
                            id={"pallete" + index}
                            style={{backgroundColor: index === isPalleteNum ? Pallets[index].selectcolor:"white"}}
                            className={` md:p-4 ss:p-4 p-2 cursor-pointer rounded-md lg:m-2 md:m-4 ss:m-2 m-[4px]`}
                            key={index}
                            onClick={()=>setPalleteNum(index)} // setCheckpallete(index)
                        >
                            <img alt='color pallets' className='' src={item.image}/>

                        </div>
                    ))}
                </div>
            </div>
            <div></div>
        </div>
        <div className=' md:w-[40vw] w-full md:h-[65%] h-auto md:ml-12 ml-0 md:pl-0 ss:pl-[90px] pl-[30px]   mb-[50px] flex flex-col justify-start md:items-center items-start'>
            <div>
                <p className='font-Poppins font-bold md:text-[46px] text-[29px]'>Zmień</p>
                <p className='font-Poppins md:text-[26px] text-[15px] md:mb-16 mb-8'>kolory strony z podanych palet kolorów </p>
                <p className='font-Poppins md:text-[19px] text-[12px] mb-2'>Aktualnie wybrana paleta kolorów</p>
                {Pallete0.map((item, index) => (
                    <div
                        key={index}
                        style={{backgroundColor: Pallete[index]}}
                        className={` md:h-[55px] h-[36px] rounded-full font-Poppins md:text-[16px] text-[9px] flex items-center pl-8 mb-[12px] ease-in-out duration-300 mr-[80px] ${index > 1 ? "text-black" : "text-white"}`}
                    >
                        {Pallete[index]}
                    </div>
                ))}
                <div className='UXPsysanim md:text-[24px] md:static absolute bottom-0 md:w-auto w-[70%] md:left-0 left-[50%] md:translate-x-0 translate-x-[-50%] text-[15px] font-bold font-Poppins md:h-[70px] h-[54px] bg-black cursor-pointer  text-white rounded-full flex justify-center items-center mt-[70px]'>Select and save</div>
            </div>
        </div>
    </div>
  )
}

export default PalleteSection