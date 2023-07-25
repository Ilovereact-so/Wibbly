import React, { useEffect, useState } from 'react'
import { githublogo, usemelogo } from '../assets';
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
          $('#ABMain').css("transform", "translateX(-100%)")
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
            <div className='h-[100vh] mt-[100px]'>
              <div style={{backgroundColor: localpallete[2].color}} className='h-full w-[100vw] flex relative'>
                <div className='flex flex-col justify-center ml-[80px] w-[30vw]'>
                  <p className='font-Poppins font-bold text-[40px] text-black mb-4'>Nasz Profil</p>
                  <p className='font-Poppins text-[20px] mb-[70px]'>Na innych serwisach</p>
                  <p className='font-Poppins text-[20px] mb-[30px]'>Naszą działalność rozwijamy także na innych
                    serwisach temu poświęconych. 
                  </p>
                  <p className='font-Poppins text-[20px] mb-[100px]'>Cała obecna strona
                    jest dostępna do podglądu na GitHubie(całość na
                    linencji….). </p>
                  <div className='h-[70px] bg-white w-[350px] rounded-full flex items-center justify-between px-11'>
                      <p className='font-Poppins text-[21px] font-bold'>1 / 2</p>
                      <div className='w-[40px] h-[40px] bg-black rounded-full flex items-center justify-center cursor-pointer' onClick={()=>handleclick()}>
                        <i className="gg-arrow-down text-white rotate-[270deg] scale-[0.75]"></i>
                      </div>
                  </div>
                </div>
                <div className='my-[200px] flex justify-center w-full ml-8'>
                  <div className='flex justify-center items-center absolute z-[1] top-[40px]'>
                    <p className='text-white font-Poppins font-bold text-[185px] filter drop-shadow-cartoon'>To My</p>
                  </div>

                  <div className='flex items-start h-full relative z-[2] mr-12'>
                    <div style={{backgroundColor: localpallete[1].color}} className='w-[390px] h-[320px]  levitationS rounded-[40px] px-11 pt-10 pb-6 flex flex-col'>
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

                  <div className='flex items-end h-full ml-12'>
                    <div className='w-[390px] h-[320px] bg-white rounded-[40px] px-11 pt-10 pb-6 flex flex-col  levitation'>
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

            <div className='h-[100vh] mt-[100px]'>
                <div style={{backgroundColor: localpallete[2].color}} className='h-full w-[100vw] flex relative'>
                  <div className='flex flex-col justify-center ml-[80px] w-[30vw]'>
                    <p className='font-Poppins font-bold text-[40px] text-black mb-4'>Nasz Profil</p>
                    <p className='font-Poppins text-[20px] mb-[70px]'>Na innych serwisach</p>
                    <p className='font-Poppins text-[20px] mb-[30px]'>Naszą działalność rozwijamy także na innych
                      serwisach temu poświęconych. 
                    </p>
                    <p className='font-Poppins text-[20px] mb-[100px]'>Cała obecna strona
                      jest dostępna do podglądu na GitHubie(całość na
                      linencji….). </p>
                    <div className='h-[70px] bg-white w-[350px] rounded-full flex items-center justify-between px-11'>
                        <p className='font-Poppins text-[21px] font-bold'>2 / 2</p>
                        <div className='w-[40px] h-[40px] bg-black rounded-full flex items-center justify-center cursor-pointer' onClick={()=>handleclick()}>
                          <i className="gg-arrow-down text-white rotate-[90deg] scale-[0.75]"></i>
                        </div>
                    </div>
                  </div>
              </div>      
            </div>
        </div> 
        )
}

export default Aboatme