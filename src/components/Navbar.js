import React, { useEffect, useRef, useState } from 'react'
import { NavbarList } from '../constants'
import { Arrow, Createuplogo, Figurka, colorBucketGif } from '../assets';
import $ from "jquery"
import {useLocation, useNavigate } from 'react-router-dom';
import Auth from './Auth';
import { Canvas } from '@react-three/fiber';
import { Model3_figurka } from '../3D/Figurka3';
import { Model6_Figurka } from '../3D/Figurka6';
import { debounce } from 'lodash';
import { useTransform, motion, useScroll, animate, easeInOut } from 'framer-motion';
import WsRequest from './WsRequest';
import { fetchWithAuth } from './AuthRequest';
import { usePallete } from '../Context/PalleteContext';
import {Bell, Menu, PaintBucket, Settings, Shield, Smartphone, } from "lucide-react"

const Navbar = ({refs, userState}) => {
  const [option,setOption] = useState(0)
  const navigate = useNavigate();
  const[userData, setUserData] = useState(null)
  const {Pallete} = usePallete()
  useEffect(()=>{
    async function user() {
      if(userState){
        const data = await WsRequest.getDataUser()
        console.log(data)
        setUserData(data)
      }
    }
    console.log("cwl")
    user()
  },[])
 
  var auth
  if (process.env.NODE_ENV == 'production') {
    auth = "https://api.srv45036.seohost.com.pl/api/logout"
  } else {
    auth = `${process.env.REACT_APP_TUNNEL_URL}/api/logout`
  }

    async function logout() {
        try {
          const data = await fetchWithAuth({url:auth, credentials:"include"});
          console.log(data)
          if(data){
            localStorage.removeItem("at")
            localStorage.removeItem("d_id")
            WsRequest.close()
            window.location.reload()
          }
          // Funkcja przetwarzająca dane np. translate(data)
      } catch (error) {
          console.error('Error fetching project data:', error);
      }
    }

  



    //   $(window).on('resize scroll', debounce(async () => {

    //     var scroll = $(window).scrollTop();//
    //     if ($('#Home').isInViewport()) {
    //         //console.log("SI")
    //         setOption(0)
    //     } if($('#UXPsys').isInViewport()) {
    //         //console.log("nope")
    //         setOption(1)
    //     }
    //     if($('#Aboatme').isInViewport()) {
    //       //console.log("nope")
    //       setOption(2)
    //     }
    //     // if ($('#ABMain').isInViewport()) {
    //     //     $(".ReactContener").animate({
    //     //         height: "0",
    //     //     },300)
    //     // }else{
    //     //     $(".ReactContener").animate({
    //     //         height: "100%",
    //     //     },300)
    //     // }

    //     //console.log(scroll)
    //     //console.log($('#Aboatme').offset().top)
      
    // },100));
   
  const Menu = ({index, item}) => {

    const { scrollYProgress } = useScroll({
      target: refs[index],
      offset: ["start end", "end start"],
    });
    const min = 0.3;
    const max = 0.8;

    const backgroundColor = useTransform(scrollYProgress,  (pos) => {
      
      return pos >= min && pos < max ? "rgba(255,255,255,0.52)" : null; 
    })

    const fontWeight = useTransform(scrollYProgress,  (pos) => {
      
      return pos >= min && pos < max ? "bold" : null; 
    })
 

    return(
      <motion.a
        key={index}
        onClick={()=> setOption(index)} // 0 - Home ... 
        href={item.link}
        style={{backgroundColor, fontWeight}}
        className={`w-full flex px-9 justify-between py-3 my-2 rounded-[21px] hover:bg-[rgba(255,255,255,0.52)] cursor-pointer `}
        >
        <img src={Arrow} className='w-[10px]'/>
        <div className={`flex items-center justify-end`}>
          <p className='mm:text-[16px] text-[14px] font-Poppins'>{item.text}</p>
          <i className={`${item.icon}  ml-8 `} alt={item.alt}></i>
        </div>
      </motion.a>
    )
  }

  return (
    <div>
      <div className='mm:w-[600px] w-[100vw] relative h-full lg:left-[-12px] '>
        <div style={{backgroundColor: Pallete[3], boxShadow: "-2px 0px 20px 1px "+ Pallete[3] +""  }} className='h-[100vh] sticky top-0 px-4 flex flex-col justify-between'>
          <div className='overflow-hidden mm:hidden block absolute top-16  left-0 w-[370px] h-[370px] z-[-1] '><div className='absolute w-[370px] h-[370px] bg-white rounded-full top-0 left-[-45%] overflow-hidden'></div></div>
          <div>
            <div className='flex justify-around items-center pt-8'>
              <div className='p-[4px] border-black border-2 rounded-[18px] mr-16'><img src={Createuplogo} className="w-[50px] h-[50px]"/></div>
              <div><p className='font-bold font-Poppins mm:text-[24px] text-[19px]'>CreateUp  navbar</p></div>
            </div>
            <div className='mt-14 mm:px-6 px-4 mm:pl-0 pl-10'>
              {NavbarList.map((item, index) => (
                <Menu index={index} item={item}/>
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
                  <div className='h-full w-[90px] cursor-pointer overflow-hidden left-[-20px] relative flex justify-start items-end'>
                    <div id='profile-Btn' onClick={()=>userState ? navigate("/profile") : ""} className=' absolute translate-x-[-50%] left-[58%] z-[1] h-full opacity-[0.85] contrast-[0.8]'>
                    {userState ? 
                        <Canvas>
                          <Model6_Figurka/>
                        </Canvas>
                        : ""
                    }
                      </div>
                    <div className={`mm:w-[60px] relative left-[20px] mm:h-[60px] w-[50px] h-[50px] rounded-full flex justify-center items-center bg-white ${userState ? "bg-[white]" : "color-white"} `}>
                      {userState ? 
                      ""
                      : 
                      <img src={Createuplogo} className={`w-[35px]`}/>}
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    {userState ? <p className='font-Poppins text-black mm:text-[15px] text-[10px] mb-2'><span className='font-bold'>Witaj!</span> {userData?.username}</p> : ""}
                    <div onClick={()=>userState  ? logout() : navigate("/login")} className='font-Poppins font-bold text-white mm:text-[18px] h-[50px] text-[13px] flex justify-center items-center cursor-pointer bg-black mm:w-[228px] rounded-full mm:px-0 px-10 '>{ userState ? "Wyloguj się" : "Zaloguj się"}</div>
                  </div>
                </div>
                <div className={`p-6 px-8 mb-8 bg-[rgba(195,195,195,0.2)] rounded-[20px] w-full h-full ${ userState ? "bg-white" : "bg-[rgba(195,195,195,0.2)]"}`} >
                  <div className={`w-full flex justify-end items-center mb-8 text-[#929292] ${ userState  ? "text-black" : "text-[#929292]"}`}><p className='mm:text-[16px] text-[13px] font-Poppins'>Notifications{/*user()?.username*/}</p><Bell className='scale-[0.9] ml-5'/></div>
                  <div className={`w-full flex justify-end items-center mb-8 text-[#929292] ${ userState  ? "text-black" : "text-[#929292]"}`}><p className='mm:text-[16px] text-[13px] font-Poppins'>Support</p><Shield className='scale-[0.9] ml-5'/></div>
                  <div className={`w-full flex justify-end items-center text-[#929292] ${ userState  ? "text-black" : "text-[#929292]"}`}><p className='mm:text-[16px] text-[13px] font-Poppins'>Settings</p><Settings className='scale-[0.9] ml-5'/></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}


export const NavBtn = ({r, handleNavclick}) => {
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: r,
    offset: ["start end", "end start"],
  });

  const min = 0.3;
  const max = 0.8;

  const width = useTransform(scrollYProgress,  (pos) => {
    if(window.innerWidth > 450){
      return pos >= min && pos < max ? "47px" : null; 
    }else if(window.innerWidth <= 450){
      return pos >= min && pos < max ? "47px" : null; 
    }
    
  })
  


  const [isMOCB, setMOBC] = useState(0)
  const [isopenDs, setopenDs] = useState(0)
  const {Pallete} = usePallete()
  const openDs=(e, type)=>{
    if(type == "open" && isopenDs != 1){
      setopenDs(1)

    }else if(type == "close"){
      setopenDs(0)

    }else if (type == "open" && isopenDs == 1){
      window.location.href = 'https://dev.srv45036.seohost.com.pl';
    }
  }
  const [isOpenMenu,setOpenMenu] = useState(false)
  
  return(
    <div className='flex flex-col items-end h-full justify-between'>
      <div className='flex flex-col items-end'>
        <motion.a href='#UXPsys' onMouseOver={()=>setMOBC(0)} onMouseLeave={()=>setMOBC(0)} style={{backgroundColor: Pallete[1], width}} className={`ss:h-[157px] h-[119px] ss:w-[37px] w-[30px] cursor-pointer hover:w-[37px] ease-in-out duration-300 mb-8 rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center `}>{/**${
                btn === true ? "w-[37px] ss:w-[47px]" : ""
            } */}
            <PaintBucket className={`text-white scale-[0.8] ${ isMOCB === 1 ? "hidden":""}`}/>
            <img src={colorBucketGif} className={`${ isMOCB === 1 ? "":"hidden"}`}/>

        </motion.a>
        <div id='openMenu-Btn' style={{backgroundColor: Pallete[3]}} onClick={()=>{handleNavclick(!isOpenMenu); setOpenMenu(!isOpenMenu)}}  className='ss:h-[157px] cursor-pointer h-[119px] ss:w-[37px] w-[30px] hover:w-[37px] ease-in-out duration-300 rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center'> {/**onClick={()=> handleClick("nav")} */}
            <Menu className='scale-[0.8]'/>
        </div>
      </div>
      
      <motion.div id='openDevsite' onMouseLeave={(e)=>openDs(e.currentTarget, "close")} onClick={(e)=>openDs(e.currentTarget, "open")} style={{backgroundColor: Pallete[0]}} className={`ss:h-[70px] cursor-pointer h-[50px] ease-in-out duration-300 rounded-tl-[30px] rounded-bl-[30px] flex items-center justify-start ${
        isopenDs === 1 ? "w-[250px]":"ss:w-[37px] w-[30px]"
      } ${
        isOpenMenu ? "translate-x-[100%] ss:translate-x-[0]  scale-x-[-1] ss:scale-x-[1]":""
      }`} >
        <Smartphone className='scale-[0.8] text-white ml-[12px]'/>
        <p className={`whitespace-nowrap overflow-hidden duration-300 ease-in-out text-white font-Poppins  ${isopenDs === 1 ? "w-full ml-2":" w-0 "}`}>Przejdź do <span className='font-bold'>Createup.dev</span></p>
      </motion.div>
    </div>
  )
}

export default Navbar