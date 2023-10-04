import React, { useEffect, useState } from 'react'
import { NavbarList } from '../constants'
import { Arrow, Createuplogo, Figurka } from '../assets';
import $ from "jquery"
import {useLocation, useNavigate } from 'react-router-dom';
import Auth from './Auth';
import { isExpired, decodeToken } from "react-jwt";
import { Canvas } from '@react-three/fiber';
import { Model3_figurka } from '../3D/Figurka3';
import { Model6_Figurka } from '../3D/Figurka6';

const Navbar = () => {
  const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
  const [option,setOption] = useState(0)
  const navigate = useNavigate();
  const [logged, setLogged] = useState(localStorage.getItem('rt'))
  //const [logged, setlogget] = useState(false)

  function user() {
    if(logged != null){
      const myDecodedToken = decodeToken(logged);
      //console.log(myDecodedToken)
      return myDecodedToken
    }
    
  }
  var auth
  if (process.env.NODE_ENV == 'production') {
    auth = "https://api.srv45036.seohost.com.pl/api/logout"
  } else {
    auth = "http://localhost:3003/api/logout"
  }

  function logout(){
    const data = JSON.stringify({
      at : localStorage.getItem('at'),
      rt : localStorage.getItem('rt')
    })
    $.ajax({
      url:auth,
      type:"POST",
      data: data,
      crossDomain: true,
      headers: {
        "accept": "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      xhrFields: {cors: false},
      contentType:"application/json; charset=utf-8",
      dataType:"json",
    }).then((res)=>{
      console.log(res)
      if(res){
        localStorage.removeItem("at")
        localStorage.removeItem("rt")
        setLogged(localStorage.getItem('rt'))
      }
    });
  }
  
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
                <div className='flex justify-between w-full items-end'>
                  <div className='h-full w-[90px] left-[-20px] relative flex justify-start items-end'>
                    <div className='absolute translate-x-[-50%] left-[58%] z-[1] h-full contrast-75'>
                    {logged !== null ? 
                        <Canvas>
                          <Model6_Figurka/>
                        </Canvas>
                        : ""
                    }
                      </div>
                    <div className={`mm:w-[60px] relative left-[20px] mm:h-[60px] w-[50px] h-[50px] rounded-full flex justify-center items-center bg-white ${logged !== null ? "bg-white" : "color-white"} `}>
                      {logged !== null ? 
                      ""
                      : 
                      <img src={Createuplogo} className={`w-[35px]`}/>}
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    {logged !== null ? <p className='font-Poppins text-black mm:text-[15px] text-[10px] mb-2'><span className='font-bold'>Witaj!</span> {user()?.username}</p> : ""}
                    <div onClick={()=>logged !== null ? logout() : navigate("/login")} className='font-Poppins font-bold text-white mm:text-[18px] h-[50px] text-[13px] flex justify-center items-center cursor-pointer bg-black mm:w-[228px] rounded-full mm:px-0 px-10 '>{ logged !== null ? "Wyloguj się" : "Zaloguj się"}</div>
                  </div>
                </div>
                <div className={`p-6 px-8 mb-8 bg-[rgba(195,195,195,0.2)] rounded-[20px] w-full h-full ${ logged !== null ? "bg-white" : "bg-[rgba(195,195,195,0.2)]"}`} >
                  <div className={`w-full flex justify-end items-center mb-8 text-[#929292] ${ logged !== null ? "text-black" : "text-[#929292]"}`}><p className='mm:text-[16px] text-[13px] font-Poppins'>Notifications{/*user()?.username*/}</p><i className='gg-bell scale-[0.9] ml-5'></i></div>
                  <div className={`w-full flex justify-end items-center mb-8 text-[#929292] ${ logged !== null ? "text-black" : "text-[#929292]"}`}><p className='mm:text-[16px] text-[13px] font-Poppins'>Support</p><i className='gg-shield scale-[0.9] ml-5'></i></div>
                  <div className={`w-full flex justify-end items-center text-[#929292] ${ logged !== null ? "text-black" : "text-[#929292]"}`}><p className='mm:text-[16px] text-[13px] font-Poppins'>Settings</p><i className='gg-toggle-off scale-[0.9] ml-5'></i></div>
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