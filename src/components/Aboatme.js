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
            <div className='h-[130vh] xl:h-[100vh] mt-[100px]'>
              <div style={{backgroundColor: localpallete[2].color}} className='h-full w-[100vw] flex xl:flex-row flex-col relative'>
                <div className='flex flex-col justify-center ml-[80px] xl:w-[30vw] w-[60vw] mt-20 xl:mt-0'>
                  <p className='font-Poppins font-bold text-[40px] text-black mb-4'>Nasz Profil</p>
                  <p className='font-Poppins text-[20px] mb-[70px]'>Na innych serwisach</p>
                  <p className='font-Poppins text-[20px] mb-[30px]'>Naszą działalność rozwijamy także na innych
                    serwisach temu poświęconych. 
                  </p>
                  <p className='font-Poppins text-[20px] mb-[100px]'>Cała obecna strona
                    jest dostępna do podglądu na GitHubie(całość na
                    linencji….). </p>
                  <div className='h-[70px] bg-white w-[350px] rounded-full xl:static absolute bottom-16 flex items-center justify-between px-11'>
                      <p className='font-Poppins text-[21px] font-bold'>1 / 2</p>
                      <div className='w-[40px] h-[40px] bg-black rounded-full flex items-center justify-center cursor-pointer' onClick={()=>handleclick()}>
                        <i className="gg-arrow-down text-white rotate-[270deg] scale-[0.75]"></i>
                      </div>
                  </div>
                </div>
                <div className='my-[200px] xl:mt-[300px] mt-28 xl:pb-0 pb-20 xl:h-auto h-[50vh] flex justify-center w-full relative xl:static  ml-8'>
                  <div className='flex justify-center items-center absolute z-[1] xl:top-[90px] top-[-200px]'>
                    <p className='text-white font-Poppins font-bold text-[185px] filter drop-shadow-cartoon'>To My</p>
                  </div>

                  <div className='flex items-start h-full relative z-[2] 2xl:mr-12 xl:mr-5 mr-12'>
                    <div style={{backgroundColor: localpallete[1].color}} className='2xl:w-[390px] w-[390px] xl:w-[320px] h-[320px] ease-in-out duration-300  levitationS rounded-[40px] px-11 pt-10 pb-6 flex flex-col'>
                      <img className='w-[25px]' src={usemelogo}/>
                      <p className='font-Poppins font-bold text-white text-[23px] mt-7'>CreateUp</p>
                      <p className='font-Poppins text-black text-[23px]'>Wybraniec Kamil</p>
                      <div className='flex justify-between h-full items-end'>
                        <p className='font-Poppins font-bold text-black text-[19px]'>Useme</p>
                        <div className='w-[40px] h-[40px] bg-black rounded-full flex items-center justify-center cursor-pointer'>
                          <i className="gg-arrow-down text-white rotate-[270deg] scale-[0.75]"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-end h-full 2xl:ml-12 xl:ml-5 ml-12'>
                    <div className='2xl:w-[390px] w-[390px] xl:w-[320px] h-[320px] ease-in-out duration-300 bg-white rounded-[40px] px-11 pt-10 pb-6 flex flex-col  levitation'>
                      <img className='w-[25px]' src={githublogo}/>
                      <p className='font-Poppins font-bold text-black text-[23px] mt-7'>F-dev</p>
                      <p className='font-Poppins text-black text-[23px]'>Ilovereact-so</p>
                      <div className='flex justify-between h-full items-end'>
                        <p style={{color: localpallete[0].color}} className='font-Poppins font-bold text-[19px]'>GitHub</p>
                        <div style={{backgroundColor: localpallete[0].color}} className='w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer'>
                          <i className="gg-arrow-down text-white rotate-[270deg] scale-[0.75]"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>      
          </div>

            <div className='xl:h-[100vh] h-[130vh] mt-[100px]'>
                <div className='h-full w-[100vw] flex xl:flex-row flex-col relative bg-[#F6F7F8]'>
                  <div className='flex flex-col justify-center ml-[80px] xl:w-[40vw] w-[60vw] mt-20 xl:mt-0'>
                    <p className='font-Poppins font-bold text-[40px] text-black mb-4'>Język i system</p>
                    <p className='font-Poppins text-[20px] mb-[70px]'>z którego korzystamy przy tworzeniu stron</p>
                    <p className='font-Poppins text-[20px] mb-[30px]'>Każda aplikacja/ witryna internetowa jest pisana i projektowana od podstaw. Nie używamy programów z  gotowymi szablonami typu wordpress, wix itp
                    </p>
                    <p className='font-Poppins text-[20px] mb-[60px]'>Posługujemy się językiem programowania React Js 
                      z asystą tailwinda. Aplikacje internetowe wypuszczane przez nas są całkowicie responsywne oraz dopasowują 
                      się pod preferencje klienta. 
                    </p>
                    <div className='h-[70px] bg-white w-[350px] rounded-full flex items-center justify-between px-11'>
                        <p className='font-Poppins text-[21px] font-bold'>2 / 2</p>
                        <div className='w-[40px] h-[40px] bg-black rounded-full flex items-center justify-center cursor-pointer' onClick={()=>handleclick()}>
                          <i className="gg-arrow-down text-white rotate-[90deg] scale-[0.75]"></i>
                        </div>
                    </div>
                  </div>
                  <div className='xl:mt-[200px] mt-[300px] xl:h-auto h-full flex relative xl:static justify-center items-end w-full ml-8'>
                  <div className='flex justify-center items-center absolute z-[1] xl:top-[40px] top-[-180px]'>
                    <p className='text-black font-Poppins font-bold text-[185px] filter drop-shadow-cartoonB'>To My</p>
                  </div>
                  <div style={{backgroundColor: localpallete[2].color}} className={`overflow-hidden ease-in-out duration-700 z-10 2xl:px-32 xl:px-24 px-36 opacity-[0.7] pt-0 rounded-t-[50px] flex justify-around items-center flex-col ${
                    slide === 1 ? "h-[0px] pt-0" : "h-full pt-9"
                  }`}>
                    <img src={reactlogo} className='reactlogo xl:w-auto w-[200px]'/>
                    <p className='text-[27px] text-black font-Poppins font-bold'>React + Tailwindcss</p>
                  </div>
                </div>
              </div>      
            </div>
        </div> 
        )
}

export default Aboatme