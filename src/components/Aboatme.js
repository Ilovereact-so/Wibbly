import React, { useEffect, useState } from 'react'
import { githublogo, reactlogo, usemelogo } from '../assets';
import $ from "jquery"

const Aboatme = () => {
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
        <div id='ABMain' className='flex ease-in-out duration-300'>
            <div className='ss:h-[130vh] h-[100vh] xl:h-[100vh] mt-[100px]'>
              <div style={{backgroundColor: localpallete[2].color}} className='h-full w-[100vw] flex xl:flex-row flex-col relative'>
                <div className='flex flex-col justify-center ss:ml-[80px] ml-0 ss:px-0 px-12 xl:w-[30vw] ss:w-[60vw] w-full ss:mt-20 mt-8 xl:mt-0'>
                  <p className='font-Poppins font-bold ss:text-[40px] text-[29px] text-black mb-4'>Nasz Profil</p>
                  <p className='font-Poppins ss:text-[20px] text-[15px] ss:mb-[70px] mb-10'>Na innych serwisach</p>
                  <p className='font-Poppins ss:text-[20px] text-[14px] mb-[30px]'>Naszą działalność rozwijamy także na innych
                    serwisach temu poświęconych. 
                  </p>
                  <p className='font-Poppins ss:text-[20px] text-[14px] mb-[100px]'>Cała obecna strona
                    jest dostępna do podglądu na GitHubie(całość na
                    linencji….). </p>
                  <div className='ss:h-[70px] h-[48px] bg-white ss:w-[350px] w-[50%] rounded-full xl:static absolute bottom-16 flex items-center justify-between ss:px-11 px-8'>
                      <p className='font-Poppins ss:text-[21px] text-[15px] font-bold'>1 / 2</p>
                      <div className='ss:w-[40px] ss:h-[40px] w-[30px] h-[30px] bg-black rounded-full flex items-center justify-center cursor-pointer' onClick={()=>handleclick()}>
                        <i className="gg-arrow-down text-white rotate-[270deg] scale-[0.75]"></i>
                      </div>
                  </div>
                </div>
                <div className='ss:my-[200px] my-0 mb-[200px] xl:mt-[300px] ss:mt-28 mt-0 xl:pb-0 pb-20 xl:h-auto h-[50vh] flex justify-center w-full relative xl:static px-8  ss:ml-8'>
                  <div className='flex justify-center items-center absolute z-[1] xl:top-[90px] ss:top-[-200px] top-[-80px]'>
                    <p className='text-white font-Poppins font-bold ss:text-[185px] text-[79px] filter drop-shadow-cartoon'>To My</p>
                  </div>

                  <div className='flex items-start h-full relative z-[2] 2xl:mr-12 xl:mr-5 ss:mr-12 mr-4 ss:w-auto w-full'>
                    <div style={{backgroundColor: localpallete[1].color}} className='2xl:w-[390px] ss:w-[390px] w-full xl:w-[320px] ss:h-[320px] h-[148px] ease-in-out duration-300  levitationS ss:rounded-[40px] rounded-[20px] ss:px-11 px-4 ss:pt-10 pt-4 pb-6 flex flex-col'>
                      <img className='ss:w-[25px] w-[16px]' src={usemelogo}/>
                      <p className='font-Poppins font-bold text-white ss:text-[23px] text-[9px] mt-7'>CreateUp</p>
                      <p className='font-Poppins text-black ss:text-[23px] text-[9px]'>Wybraniec Kamil</p>
                      <div className='flex justify-between h-full items-end'>
                        <p className='font-Poppins font-bold text-black ss:text-[19px] text-[7px]'>Useme</p>
                        <div className='ss:w-[40px] ss:h-[40px] w-[19px] h-[19px] bg-black rounded-full flex items-center justify-center cursor-pointer'>
                          <i className="gg-arrow-down text-white rotate-[270deg] ss:scale-[0.75] scale-[0.45]"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-end h-full 2xl:ml-12 xl:ml-5 relative z-[2] ss:ml-12 ml-4 ss:w-auto w-full'>
                    <div className='2xl:w-[390px] ss:w-[390px] w-full xl:w-[320px] ss:h-[320px] h-[148px] ease-in-out duration-300 bg-white ss:rounded-[40px] rounded-[20px] ss:px-11 px-4 ss:pt-10 pt-4 pb-6 flex flex-col  levitation'>
                      <img className='ss:w-[25px] w-[16px]' src={githublogo}/>
                      <p className='font-Poppins font-bold text-black ss:text-[23px] text-[9px] mt-7'>F-dev</p>
                      <p className='font-Poppins text-black ss:text-[23px] text-[9px]'>Ilovereact-so</p>
                      <div className='flex justify-between h-full items-end'>
                        <p style={{color: localpallete[0].color}} className='font-Poppins font-bold ss:text-[19px] text-[7px]'>GitHub</p>
                        <div style={{backgroundColor: localpallete[0].color}} className='ss:w-[40px] ss:h-[40px] w-[19px] h-[19px] rounded-full flex items-center justify-center cursor-pointer'>
                          <i className="gg-arrow-down text-white rotate-[270deg] ss:scale-[0.75] scale-[0.45]"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>      
          </div>

            <div className='xl:h-[100vh] ss:h-[130vh] h-[100vh] mt-[100px] bg-[#F6F7F8]'>
                <div className='h-full w-[100vw] flex xl:flex-row flex-col  relative '>
                  <div className='flex flex-col justify-center ss:ml-[80px] mx-12 xl:w-[40vw] ss:w-[60vw] w-auto  mt-10 ss:mt-20 xl:mt-0'>
                    <p className='font-Poppins font-bold s:text-[40px] text-[29px] text-black mb-4'>Język i system</p>
                    <p className='font-Poppins ss:text-[20px] text-[15px] ss:mb-[70px] mb-8'>z którego korzystamy przy tworzeniu stron</p>
                    <p className='font-Poppins ss:text-[20px] text-[14px] mb-[30px]'>Każda aplikacja/ witryna internetowa jest pisana i projektowana od podstaw. Nie używamy programów z  gotowymi szablonami typu wordpress, wix itp
                    </p>
                    <p className='font-Poppins ss:text-[20px] text-[14px] ss:mb-[60px] mb-[40px]'>Posługujemy się językiem programowania React Js 
                      z asystą tailwinda. Aplikacje internetowe wypuszczane przez nas są całkowicie responsywne oraz dopasowują 
                      się pod preferencje klienta. 
                    </p>
                    <div className='ss:h-[70px] h-[60px] bg-white ss:w-[350px] w-auto mx-2 rounded-full flex items-center justify-between px-11'>
                        <p className='font-Poppins ss:text-[21px] text-[15px] font-bold'>2 / 2</p>
                        <div className='ss:w-[40px] ss:h-[40px] w-[30px] h-[30px] bg-black rounded-full flex items-center justify-center cursor-pointer' onClick={()=>handleclick()}>
                          <i className="gg-arrow-down text-white rotate-[90deg] ss:scale-[0.75] scale-[0.6]"></i>
                        </div>
                    </div>
                  </div>
                  <div className='xl:mt-[200px] ss:mt-[300px] mt-[80px]  xl:h-auto h-full flex relative xl:static justify-center items-end w-full ss:ml-8 ml-0'>
                  <div className='flex justify-center items-center absolute z-[1] xl:top-[40px] ss:top-[-180px] top-[-50px]'>
                    <p className='text-black font-Poppins font-bold ss:text-[185px] text-[68px] filter drop-shadow-cartoonB'>To My</p>
                  </div>
                  <div style={{backgroundColor: localpallete[2].color}} className={`overflow-hidden ease-in-out duration-700 z-10 2xl:px-32 xl:px-24 ss:px-36 px-6 ss:mx-0 mx-16 ss:w-auto w-full opacity-[0.7] pt-0 rounded-t-[50px] flex justify-around items-center flex-col ${
                    slide === 1 ? "h-[0px] pt-0" : "h-full pt-9"
                  }`}>
                    <img src={reactlogo} className='reactlogo xl:w-auto ss:w-[200px] w-[40vw]'/>
                    <p className='ss:text-[27px] text-[11px] text-black font-Poppins font-bold'>React + Tailwindcss</p>
                  </div>
                </div>
              </div>      
            </div>
        </div> 
        )
}

export default Aboatme