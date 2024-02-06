import React, { useEffect, useState } from 'react'
import { githublogo, reactlogo, usemelogo } from '../assets';
import $ from "jquery"

const Aboatme = ({r}) => {
    const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
    const [slide, setSlide] = useState(1);
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
      
      const handleclick = () => {
        if(slide === 1){
          $('#ABMain').css("transform", `translateX(-100%) translateX(-9px)`)
          //$('#ABMain').css("transform", "translateX(-9px)")
          setSlide(2)
        }
        if(slide === 2){
          $('#ABMain').css("transform", "translateX(0)")
          setSlide(1)
        }
        //console.log("drop");
      }
        return (
        <div id='ABMain' ref={r} className='flex ease-in-out duration-300'>
            <div className='lg:h-[130vh] h-auto xl:h-[100vh]'>
              <div style={{backgroundColor: localpallete[2].color}} className='h-full w-[100vw] flex xl:flex-row flex-col relative'>
                <div className='flex flex-col justify-center lg:ml-[80px] ml-0 lg:px-0 px-12 xl:w-[30vw] lg:w-[60vw] w-full lg:mt-20 mt-8 xl:mt-0'>
                  <p className='font-Poppins font-bold lg:text-[40px] md:text-[32px] text-[29px] text-black mb-4'>Nasz Profil</p>
                  <p className='font-Poppins lg:text-[20px] md:text-[18px] text-[15px] lg:mb-[70px] mb-10'>Na innych serwisach</p>
                  <p className='font-Poppins lg:text-[20px] md:text-[17px] text-[14px] mb-[30px]'>Naszą działalność rozwijamy także na innych
                    serwisach temu poświęconych. 
                  </p>
                  <p className='font-Poppins lg:text-[20px] md:text-[17px] text-[14px] mb-[100px]'>Cała obecna strona
                    jest dostępna do podglądu na GitHubie(całość na
                    linencji….). </p>
                  <div className='lg:h-[70px] h-[48px] bg-white lg:w-[350px] md:w-[300px] w-[40%] rounded-full xl:static absolute bottom-16 flex items-center justify-between lg:px-11 px-8'>
                      <p className='font-Poppins lg:text-[21px] md:text-[15px] text-[13px] font-bold'>1 / 2</p>
                      <div className='lg:w-[40px] lg:h-[40px] w-[30px] h-[30px] bg-black rounded-full flex items-center justify-center cursor-pointer' onClick={()=>handleclick()}>
                        <i className="gg-arrow-down text-white rotate-[270deg] scale-[0.75]"></i>
                      </div>
                  </div>
                </div>
                <div className='lg:my-[200px] my-0 mb-[200px] xl:mt-[300px] lg:mt-28 mt-0 xl:pb-0 pb-20 xl:h-auto ss:h-[50vh] h-[30vh] flex justify-center w-full relative xl:static px-8 md:px-16 ss:px-14  lg:ml-8'>
                  <div className='flex justify-center items-center absolute z-[1] xl:top-[90px] lg:top-[-200px] top-[-80px]'>
                    <p className='text-white font-Poppins font-bold lg:text-[185px] text-[79px] filter drop-shadow-cartoon'>To My</p>
                  </div>

                  <div className='flex items-start h-full relative z-[2] 2xl:mr-12 xl:mr-5 md:mr-12 ss:mr-6 mr-4 lg:w-auto w-full'>
                    <div style={{backgroundColor: localpallete[1].color}} className='2xl:w-[390px] lg:w-[390px] w-full xl:w-[320px] lg:h-[320px] md:h-[228px] ss:h-[188px] h-[148px] ease-in-out duration-300  levitationS lg:rounded-[40px] rounded-[20px] lg:px-11 md:px-12 px-4 lg:pt-10 pt-4 pb-6 flex flex-col'>
                      <img className='lg:w-[25px] w-[16px]' src={usemelogo}/>
                      <p className='font-Poppins font-bold text-white lg:text-[23px] md:text-[16px] ss:text-[14px] text-[9px] mt-7'>CreateUp</p>
                      <p className='font-Poppins text-black lg:text-[23px] md:text-[16px] ss:text-[14px] text-[9px]'>Wybraniec Kamil</p>
                      <div className='flex justify-between h-full items-end'>
                        <p className='font-Poppins font-bold text-black lg:text-[19px] md:text-[15px] ss:text-[13px] text-[7px]'>Useme</p>
                        <div className='md:w-[40px] md:h-[40px] ss:w-[30px] ss:h-[30px] w-[19px] h-[19px] bg-black rounded-full flex items-center justify-center cursor-pointer'>
                          <i className="gg-arrow-down text-white rotate-[270deg] lg:scale-[0.75] scale-[0.45]"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-end h-full 2xl:ml-12 xl:ml-5 relative z-[2] md:ml-12 ss:ml-6 ml-4 lg:w-auto w-full'>
                    <div className='2xl:w-[390px] lg:w-[390px] w-full xl:w-[320px] lg:h-[320px] md:h-[228px] ss:h-[188px] h-[148px] ease-in-out duration-300 bg-white lg:rounded-[40px] rounded-[20px] lg:px-11 px-4 lg:pt-10 pt-4 pb-6 md:px-12 flex flex-col  levitation'>
                      <img className='lg:w-[25px] w-[16px]' src={githublogo}/>
                      <p className='font-Poppins font-bold text-black lg:text-[23px] md:text-[16px] ss:text-[14px] text-[9px] mt-7'>F-dev</p>
                      <p className='font-Poppins text-black lg:text-[23px] md:text-[16px] ss:text-[14px] text-[9px]'>Ilovereact-so</p>
                      <div className='flex justify-between h-full items-end'>
                        <p style={{color: localpallete[0].color}} className='font-Poppins font-bold lg:text-[19px] md:text-[15px] ss:text-[14px] text-[7px]'>GitHub</p>
                        <div style={{backgroundColor: localpallete[0].color}} className='md:w-[40px] md:h-[40px] ss:w-[30px] ss:h-[30px] w-[19px] h-[19px] rounded-full flex items-center justify-center cursor-pointer'>
                          <i className="gg-arrow-down text-white rotate-[270deg] lg:scale-[0.75] scale-[0.45]"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>      
          </div>

            <div className='xl:h-[100vh] lg:h-[130vh] h-auto bg-[#F6F7F8]'>
                <div className='h-full w-[100vw] flex xl:flex-row flex-col  relative '>
                  <div className='flex flex-col justify-center ss:ml-[80px] mx-12 xl:w-[40vw] md:w-[60vw] w-auto  mt-10 md:mt-20 xl:mt-0'>
                    <p className='font-Poppins font-bold ss:text-[32px] md:text-[40px] text-[29px] text-black mb-4'>Język i system</p>
                    <p className='font-Poppins md:text-[20px] ss:text-[18px] text-[15px] md:mb-[70px] mb-8'>z którego korzystamy przy tworzeniu stron</p>
                    <p className='font-Poppins md:text-[20px] ss:text-[17px] text-[14px] mb-[30px]'>Każda aplikacja/ witryna internetowa jest pisana i projektowana od podstaw. Nie używamy programów z  gotowymi szablonami typu wordpress, wix itp
                    </p>
                    <p className='font-Poppins ss:text-[18px] md:text-[20px] text-[14px] md:mb-[60px] mb-[40px]'>Posługujemy się językiem programowania React Js 
                      z asystą tailwinda. Aplikacje internetowe wypuszczane przez nas są całkowicie responsywne oraz dopasowują 
                      się pod preferencje klienta. 
                    </p>
                    <div className='md:h-[70px] h-[60px] bg-white md:w-[350px] w-auto mx-2 rounded-full flex items-center justify-between px-11'>
                        <p className='font-Poppins md:text-[21px] text-[15px] font-bold'>2 / 2</p>
                        <div className='md:w-[40px] md:h-[40px] w-[30px] h-[30px] bg-black rounded-full flex items-center justify-center cursor-pointer' onClick={()=>handleclick()}>
                          <i className="gg-arrow-down text-white rotate-[90deg] md:scale-[0.75] scale-[0.6]"></i>
                        </div>
                    </div>
                  </div>
                  <div className='xl:mt-[200px] lg:mt[300px] md:mt-[250px] mt-[80px]  xl:h-auto h-full flex relative xl:static justify-center items-end w-full md:ml-8 ml-0'>
                  <div className='flex justify-center items-center absolute z-[1] xl:top-[40px] md:top-[-180px] top-[-50px]'>
                    <p className='text-black font-Poppins font-bold lg:text-[185px] md:text-[135px] text-[68px] filter drop-shadow-cartoonB'>To My</p>
                  </div>
                  <div style={{backgroundColor: localpallete[2].color}} className={`overflow-hidden ease-in-out duration-700 z-10 2xl:px-32 xl:px-24 md:px-44 px-6 md:mx-0 mx-16 md:w-auto w-full opacity-[0.7] pt-0 rounded-t-[50px] flex justify-around items-center flex-col ${
                    slide === 1 ? "h-[0px] pt-0" : "h-full pt-9"
                  }`}>
                    <img src={reactlogo} className='reactlogo xl:w-auto md:w-[200px] w-[40vw]'/>
                    <p className='lg:text-[27px] md:text-[22px] text-[11px] text-black font-Poppins font-bold lg:mt-0 md:mt-10 lg:mb-0 md:mb-8 mt-0 mb-0'>React + Tailwindcss</p>
                  </div>
                </div>
              </div>      
            </div>
        </div> 
        )
}

export default Aboatme