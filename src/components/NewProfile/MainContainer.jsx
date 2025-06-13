import React, { useEffect, useRef, useState } from 'react'
import { NavbarProfile } from '../../constants';
import { Canvas } from '@react-three/fiber';
import { Model6_Figurka } from '../../3D/Figurka6';
import $ from 'jquery'
import { AnimatePresence, animate, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Arrow, Createuplogo, PathProfilelogo } from '../../assets';
import { Navigate, useNavigate } from 'react-router-dom';
import ConfigCard from './Config';
import Start from './Start';
import { debounce } from 'lodash';
import SettingsCard from './Settings';
import { fetchWithAuth } from '../AuthRequest';
import WsRequest from '../WsRequest';
import { useColorMode } from '../../Context/ColorModeContext';
import { usePallete } from '../../Context/PalleteContext';
import { LogOut } from 'css.gg';


const MainContainer = ({userState}) => {
    const {Pallete} = usePallete()
    const [width, setWidth] = useState($(window).width())
    const [isIndex, SetIndex] = useState(0)
    //const [multiRef, addMultiRef] = useMultiRefs();
    const navigate = useNavigate()
    useEffect(()=>{
      if(!userState){
        navigate("/")
      }
    },[])
    
  useEffect(()=>{
    $(window).on('resize', debounce(async () => {
      setWidth($(window).width())
    },100))
  })

  
 

  // ------------------- mobile
  const ref = useRef(null)

  const { scrollXProgress } = useScroll({ container: ref});
  var min = 0.03
  var max = 0.97

  const BlokL_opacity = useTransform(scrollXProgress,  (pos) => {
    return pos > min ? "1" : "0"; 
  })
  const BlokR_opacity = useTransform(scrollXProgress,  (pos) => {
    return pos > max ? "0" : "1"; 
  })



    // ------------------- mobile
  const Card = ({item, index, refTarget})=>{
    //const item.ref[index] = useRef()
    const min = 0.3;
    const max = 0.8;

    const { scrollYProgress } = useScroll({
      target: refTarget,
      offset: ["start end", "end start"],
    });
    const [isbg, setBg] = useState(false)
    
    const backgroundColor = useTransform(scrollYProgress,  (pos) => {
      return pos >= min && pos < max ? "white" : null;
    })

    // useEffect(()=>{
    //   console.log(isbg)
      
    // },[isbg])

    const opacity = useTransform(scrollYProgress,  (pos) => {
      if(window.innerWidth < 1024){
        return "0"
      }else{

        return pos >= min && pos < max ? "1" : "0"; 
      }
    })
    const scale = useTransform(scrollYProgress,  (pos) => {
      
      return pos >= min && pos < max ? 1.1 : 1; 
    })
    const widthInside = useTransform(scrollYProgress,  (pos) => {
      if(window.innerWidth < 1024){
        return 0
      }else{

        return pos >= min && pos < max ? "100%" : 0; 
      }
    })
    const width = useTransform(scrollYProgress,  (pos) => {
      if(pos >= min && pos < max){
        if(window.innerWidth < 1360){
          if(window.innerWidth < 1280){
            if(window.innerWidth < 1024){
              return 70
            }else{
              return 360; 
            }
          }else{
            return 400;
          }
        }else{
          return 460; 
        }
      }else if(pos <= 0){
        if(window.innerWidth < 1024){
          return 70
        }
      }else{
        if(window.innerWidth < 1024){
          return 70
        }else{
          return 310;
        }
      }
    })
    

    return (
      <motion.div
        key={index}
        id='menu-card'
        style={{width}}
        whileHover={{
          scale: 1.07
        }} 
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className={`flex lg:justify-between justify-center items-center lg:w-[310px] w-[70px] lg:h-auto h-[70px] rounded-[40px] lg:py-[22px] py-0 lg:px-8 my-[20px] px-0 cursor-pointer origin-left options-profile relative `}
      >
        <motion.div
          style={{scale}} className='flex justify-center items-center duration-300 ease-in-out relative z-[2]'>
          <i alt={item.alt} className={`${item.icon} xl:scale-125 scale-100`}></i>
          <a className={`font-Poppins font-normal ml-8 text-[17px] lg:inline-block hidden`}
          >{item.text}</a>
        </motion.div>
        <motion.img src={Arrow} style={{opacity}} className='rotate-180 profile-icon mr-5 lg:inline-block hidden duration-200 ease-in-out relative z-[2]'/>
        <div className='absolute top-0 left-0 h-full w-full z-0'>
          <motion.div style={{width:widthInside}} className='h-full w-0 bg-white rounded-[40px] ease-in-out duration-200'></motion.div>
        </div>
      </motion.div>
    )
  }
  const MobileCard = ({item, index})=>{

     const handleClick = () =>{
      SetIndex(index)

      var elementpos = $("#mobile-menu-card" + index).position().left
      var scrollP = $("#menu-slide-container").scrollLeft()
      console.log(elementpos, "elementpos")
      console.log(scrollP, "scrollpos")
      $("#menu-slide-container").animate({scrollLeft : (elementpos + scrollP)})
     }
    return (
      <motion.div
        key={index}
        id={"mobile-menu-card" + index}
        onClick={()=> handleClick ()}
        className={`flex items-center p-[15px] mx-1 rounded-full ease-in-out duration-200 transition-colors px-[50px] cursor-pointer ${isIndex === index ? 'bg-white' : 'text-[#959595]'}`}
      >
        <i alt={item.alt} className={`${item.icon}  `}></i>
        <a className={`font-Poppins font-normal ml-4 text-[12px] `}
        >{item.text}</a>
      </motion.div>
    )
  }




  

  
  const BackColor = (e)=>{
    animate(e.target, { color: Pallete[3]}, {duration: 2, type: "spring"})
    console.log(e.target)
  }

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
        navigate('/')
      }
      // Funkcja przetwarzająca dane np. translate(data)
  } catch (error) {
      console.error('Error fetching project data:', error);
  }
}

  // function logout(){
  //   const data = JSON.stringify({
  //     at : localStorage.getItem('at'),
  //     rt : localStorage.getItem('rt')
  //   })
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
  //     if(res){
  //       localStorage.removeItem("at")
  //       localStorage.removeItem("rt")
  //       navigate("/")
  //     }
  //   });
  // }
  const Home = useRef()
  const Config = useRef()
  const Settings = useRef()
  const Help =  useRef()


  const refs ={ 0 : Home, 1 : Config, 2 : Settings,3 : Help}

  const [refsReady, setRefsReady] = useState(false);

  // Asynchroniczny efekt do symulacji przygotowania referencji
  useEffect(() => {
    const prepareRefs = async () => {
      // Można dodać opóźnienie, symulując np. pobieranie danych lub czekanie na inne zasoby
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Kiedy referencje są gotowe, ustaw stan na true
      console.log("ready")
      setRefsReady(true);
    };

    prepareRefs();
  }, []);
  
  if(width >= 768 ){
  return(
    <motion.div  className="w-[100vw] h-[400vh] flex bg-[#F6F7F8] overflow-hidden relative">
        <div id='menu-section' className='2xl:mx-12 mx-6 py-8 pb-16 xl:text-[42px] text-[36px] font-Poppins font-bold w-fit flex flex-col justify-between h-[100vh] fixed z-10'>
          <div className='flex flex-col justify-center items-start w-fit'>
            <motion.p style={{color:Pallete[3]}} onHoverEnd={(e)=> BackColor(e)}  whileHover={{color: [(Pallete[3]), "rgb(0,0,0)"]}} transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
            }} onClick={()=> navigate("/")} className='mb-[40px] lg:ml-8 cursor-pointer lg:inline-block hidden'>CreateUP</motion.p>
            {refsReady && NavbarProfile.map((item, index)=> (            
              <Card item={item} index={index} refTarget={refs[index]}/>
            ))}
          </div>
          <div style={{backgroundColor: Pallete[1]}} className='rounded-full text-center lg:w-max flex items-center justify-center w-[75px] h-[57px]'>
            <p onClick={logout} className='font-Poppins text-white xl:text-[20px] text-[18px] xl:px-[80px] px-[75px] py-4 lg:inline-block hidden cursor-pointer'>Wyloguj</p>
            <LogOut className='lg:hidden inline-block invert'/>
          </div>
        </div>
        <div id='content-section' className={`w-full min-h-[400vh] h-auto 2xl:ml-[340px] xl:ml-[300px] lg:ml-[260px] ml-[100px]`}>
          <div className='fixed right-[-15%] z-[1] h-[100vh] w-[100%] brightness-[1.1]'>
              <Canvas>
                  <Model6_Figurka/>
              </Canvas>
          </div>
          <Start r={Home} userState={userState}/>
          <ConfigCard r={Config}/>
          <SettingsCard r={Settings}/>
          
          <div ref={Help} className="w-full h-[100vh] pl-6 pr-10 py-11 relative z-[2]">
              <div id='content-blur' className=' bg-[rgb(236,236,236,0.56)] rounded-3xl w-full h-full'>

              </div>
          </div>
        </div>
    </motion.div>
  ) 
  }else{

    return(
      <div  className="w-[100vw] h-[100vh] flex bg-[#F6F7F8] overflow-hidden relative">
        <div className='fixed z-[1] h-[100vh] w-[100%] brightness-[1.1] opacity-[0.7]'>
              <Canvas>
                  <Model6_Figurka/>
              </Canvas>
        </div>
        <div className='ss:px-7 px-5 py-8 relative z-10 w-[100vw] flex flex-col'>
          <div id='menu-section' className=''>
            <div className='flex flex-col mb-8 sm:ml-4 ml-0'>
              <p className='font-Poppins font-bold text-[39px] ss:ml-0 ml-3-  text-black'>Witaj</p>
              <p className='text-[21px] font-Poppins text-black'>Adamo</p>
            </div>
            <div style={{backgroundColor: Pallete[2]}} className='relative rounded-full px-4'>
              <div id='menu-slide-container' ref={ref}  className='rounded-full w-full py-[6px] pl-4 overflow-x-scroll ease-in-out duration-300'>
                <div  className='w-max flex'>
                  {NavbarProfile.map((item, index) => (            
                    <MobileCard item={item} index={index}/>
                  ))}
                </div>
                
              </div>
              <div className='absolute top-0 left-0 w-[50px] h-full rounded-l-[10px] p-[7px]'>
                <motion.div style={{opacity: BlokL_opacity, background: "linear-gradient(90deg, #A1A1A1, transparent)"}} className={`w-full h-full rounded-l-[17px] duration-300 ease-in-out`}>
                </motion.div>
              </div>
              <div className='absolute top-0 right-0 w-[50px] h-full rounded-r-[10px] p-[7px]'>
                <motion.div style={{opacity: BlokR_opacity, background: "linear-gradient(270deg, #A1A1A1, transparent)"}} className={`w-full h-full rounded-r-[17px] duration-300 ease-in-out `}>
                </motion.div>
              </div>
            </div>
          </div>
          <div className='relative z-[10] flex justify-center'>
            <div style={{background: "linear-gradient(180deg, #FFFFFF, transparent)"}} className='w-[90%] h-[30px] rounded-b-[17px] absolute top-0'></div>
          </div>
          <MobileCards index={isIndex} refs={refs}/>
        </div>
      </div>
    )
  }
  
}


const MobileCards =({index, refs})=>{
 
  switch(index){
    case 0 :
      return (
        <Start r={refs[0]} />
      )
    case 1:
      return(
        <ConfigCard r={refs[1]}/>
      )
    case 2:
      return(
        <SettingsCard r={refs[0]}/>
      )
  }
  // if(index === 0){
  //   console.log("mobile")
  //   return (
  //     <Start r={refs[0]} />
  //   )
  // }else if(index === 1){
  //   return(
  //     <ConfigCard r={refs[0]}/>
  //   )
  // }
  
}

export default MainContainer