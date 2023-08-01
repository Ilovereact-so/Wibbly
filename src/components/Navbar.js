import React, { useEffect, useState } from 'react'
import { NavbarList } from '../constants'
import { Arrow, Createuplogo } from '../assets';
import $ from "jquery"

const Navbar = () => {
  const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
  const [option,setOption] = useState(0)


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

      $(window).on('resize scroll', function() {

        var scroll = $(window).scrollTop();//
        if ($('#Home').isInViewport()) {
            //console.log("SI")
            setOption(0)
        } if($('#UXPsys').isInViewport()) {
            //console.log("nope")
            setOption(1)
        }
        if($('#Aboatme').isInViewport()) {
          //console.log("nope")
          setOption(2)
      }
        // if ($('#ABMain').isInViewport()) {
        //     $(".ReactContener").animate({
        //         height: "0",
        //     },300)
        // }else{
        //     $(".ReactContener").animate({
        //         height: "100%",
        //     },300)
        // }

        //console.log(scroll)
        //console.log($('#Aboatme').offset().top)
      
    });

  return (
    <div>
      <div className='w-[600px] relative h-full left-[-12px] '>
        <div style={{backgroundColor: localpallete[3].color, boxShadow: "-2px 0px 20px 1px "+ localpallete[3].color +""  }} className='h-[100vh] sticky top-0 px-4 flex flex-col justify-between'>
          <div>
            <div className='flex justify-around items-center pt-8'>
              <div className='p-[4px] border-black border-2 rounded-[18px] mr-16'><img src={Createuplogo} className="w-[50px] h-[50px]"/></div>
              <div><p className='font-bold font-Poppins text-[24px]'>CreateUp  navbar</p></div>
            </div>
            <div className='mt-14 px-6'>
            {NavbarList.map((item, index) => (
              <a
                key={index}
                onClick={()=> setOption(index)} // 0 - Home ... 
                href={item.link}
                className={`w-full flex px-9 justify-between py-3 my-2 rounded-[21px] hover:bg-[rgba(255,255,255,0.52)] cursor-pointer ${
                  index === option ? "bg-[rgba(255,255,255,0.52)] font-bold" : ""
                }`}
                >
                <img src={Arrow} className='w-[10px]'/>
                <div className={`flex items-center justify-end`}>
                  <p className='text-[16px] font-Poppins'>{item.text}</p>
                  <i className={`${item.icon}  ml-8 `} alt={item.alt}></i>
                </div>
              </a>
              ))}
            </div>
          </div>
          <div>
            <div className='flex justify-around items-center pt-8'>
              <div className='p-[4px] border-black border-2 rounded-[18px] mr-16 opacity-0'><img src={Createuplogo} className="w-[50px] h-[50px]"/></div>
              <div><p className='font-bold font-Poppins text-[24px]'>Account</p></div>
            </div>
            <div className='mx-14 flex mb-12'>
              <div className='bg-[rgba(255,255,255,0.52)] w-full rounded-[46px] flex flex-col-reverse items-center py-6 px-8'>
                <div className='flex justify-between w-full'>
                  <div className='w-[60px] h-[60px] rounded-full flex justify-center items-center bg-black'><img src={Createuplogo} className='color-white w-[40px]'/></div>
                  <div className='font-Poppins font-bold text-white text-[18px] h-full flex justify-center items-center bg-black w-[228px] rounded-full mb-8'>Zaloguj się</div>
                </div>
                <div className='p-6 px-8 mb-8 bg-[rgba(195,195,195,0.2)] rounded-[20px] w-full h-full'>
                  <div className='w-full flex justify-end items-center mb-8'><p className='text-[#929292] text-[16px] font-Poppins'>Notifications</p><i className='gg-bell text-[#929292] scale-[0.9] ml-5'></i></div>
                  <div className='w-full flex justify-end items-center mb-8'><p className='text-[#929292] text-[16px] font-Poppins'>Support</p><i className='gg-shield text-[#929292] scale-[0.9] ml-5'></i></div>
                  <div className='w-full flex justify-end items-center'><p className='text-[#929292] text-[16px] font-Poppins'>Settings</p><i className='gg-toggle-off text-[#929292] scale-[0.9] ml-5'></i></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Navbar