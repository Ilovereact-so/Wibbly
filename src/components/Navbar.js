import React, { useEffect, useState } from 'react'
import { NavbarList } from '../constants'
import { Arrow, Createuplogo } from '../assets';
import $ from "jquery"
import {useLocation, useNavigate } from 'react-router-dom';
import Auth from './Auth';

const Navbar = () => {
  const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
  const [option,setOption] = useState(0)
  const navigate = useNavigate();
    // $( document ).ready(function(){

      // if(data.access_token !== null){
      //   console.log(data, "reload data")
      //   $.ajax({
      //     url:auth,
      //     type:"POST",
      //     data: data,
      //     crossDomain: true,
      //     headers: {
      //       "accept": "application/json",
      //       "Access-Control-Allow-Origin":"*"
      //     },
      //     xhrFields: {cors: false},
      //     contentType:"application/json; charset=utf-8",
      //     dataType:"json",
      //   }).then((res)=>{
      //     console.log(res)
      //     localStorage.setItem("at",res.at)
      //     localStorage.setItem("rt",res.rt)
      //   });
      // }
    
    // });
  
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
      <div className='mm:w-[600px] w-[100vw] relative h-full lg:left-[-12px] '>
        <div style={{backgroundColor: localpallete[3].color, boxShadow: "-2px 0px 20px 1px "+ localpallete[3].color +""  }} className='h-[100vh] sticky top-0 px-4 flex flex-col justify-between'>
          <div className='overflow-hidden mm:hidden block absolute top-16  left-0 w-[370px] h-[370px] z-[-1] '><div className='absolute w-[370px] h-[370px] bg-white rounded-full top-0 left-[-45%] overflow-hidden'></div></div>
          <div>
            <div className='flex justify-around items-center pt-8'>
              <div className='p-[4px] border-black border-2 rounded-[18px] mr-16'><img src={Createuplogo} className="w-[50px] h-[50px]"/></div>
              <div><p className='font-bold font-Poppins mm:text-[24px] text-[19px]'>CreateUp  navbar</p></div>
            </div>
            <div className='mt-14 mm:px-6 px-4 mm:pl-0 pl-10'>
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
                  <p className='mm:text-[16px] text-[14px] font-Poppins'>{item.text}</p>
                  <i className={`${item.icon}  ml-8 `} alt={item.alt}></i>
                </div>
              </a>
              ))}
            </div>
          </div>
          <div>
            <div className='flex justify-around items-center pt-8'>
              <div className='p-[4px] border-black border-2 rounded-[18px] mr-16 opacity-0'><img src={Createuplogo} className="w-[50px] h-[50px]"/></div>
              <div><p className='font-bold font-Poppins mm:text-[24px] text-[19px]'>Account</p></div>
            </div>
            <div className='md:mx-14 mx-4 flex mb-12'>
              <div className='bg-[rgba(255,255,255,0.52)] w-full rounded-[46px] flex flex-col-reverse items-center py-6 px-8'>
                <div className='flex justify-between w-full'>
                  <div className='mm:w-[60px] mm:h-[60px] w-[50px] h-[50px] rounded-full flex justify-center items-center bg-black'><img src={Createuplogo} className='color-white w-[35px]'/></div>
                  <div onClick={()=>  navigate("/login")} className='font-Poppins font-bold text-white mm:text-[18px] text-[13px] h-full flex justify-center items-center cursor-pointer bg-black mm:w-[228px] rounded-full mm:px-0 px-10 '>Zaloguj się</div>
                </div>
                <div className='p-6 px-8 mb-8 bg-[rgba(195,195,195,0.2)] rounded-[20px] w-full h-full '>
                  <div className='w-full flex justify-end items-center mb-8'><p className='text-[#929292] mm:text-[16px] text-[13px] font-Poppins'>Notifications</p><i className='gg-bell text-[#929292] scale-[0.9] ml-5'></i></div>
                  <div className='w-full flex justify-end items-center mb-8'><p className='text-[#929292] mm:text-[16px] text-[13px] font-Poppins'>Support</p><i className='gg-shield text-[#929292] scale-[0.9] ml-5'></i></div>
                  <div className='w-full flex justify-end items-center'><p className='text-[#929292] mm:text-[16px] text-[13px] font-Poppins'>Settings</p><i className='gg-toggle-off text-[#929292] scale-[0.9] ml-5'></i></div>
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