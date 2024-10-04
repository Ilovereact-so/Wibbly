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



const MainContainer = () => {
    const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
    const [width, setWidth] = useState($(window).width())
    const [isIndex, SetIndex] = useState(0)
    //const [multiRef, addMultiRef] = useMultiRefs();


  useEffect(()=>{
    $(window).on('resize', debounce(async () => {
      setWidth($(window).width())
    },100))
  })

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

    useEffect(() => {
      // Definiujemy funkcję asynchroniczną wewnątrz useEffect
      const asyncEffect = async () => {
        // Czekamy, aż referencja będzie gotowa
        if (refTarget.current) {
          // Przykład - symulujemy opóźnienie, aby pokazać asynchroniczność
          await new Promise((resolve) => setTimeout(resolve, 1000));
  
          // Możemy tu wykonać jakąkolwiek operację, która wymaga asynchroniczności
          console.log("Scroll progress for index:", index, scrollYProgress);
        }
      };
  
      // Wywołujemy asynchroniczną funkcję
      asyncEffect();
    }, [refTarget, scrollYProgress]);

    const backgroundColor = useTransform(scrollYProgress,  (pos) => {
      return pos >= min && pos < max ? "white" : null; 
    })
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
        style={{width, backgroundColor}}
        whileHover={{
          scale: 1.07
        }} 
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className='flex lg:justify-between justify-center items-center lg:w-[310px] w-[70px] lg:h-auto h-[70px] rounded-[40px] lg:py-[22px] py-0 lg:px-8 my-[20px] px-0 cursor-pointer origin-left options-profile'
      >
        <motion.div
          style={{scale}} className='flex justify-center items-center duration-300 ease-in-out'>
          <i alt={item.alt} className={`${item.icon} xl:scale-125 scale-100`}></i>
          <a className={`font-Poppins font-normal ml-8 text-[17px] lg:inline-block hidden`}
          >{item.text}</a>
        </motion.div>
        <motion.img src={Arrow} style={{opacity}} className='rotate-180 profile-icon mr-5 lg:inline-block hidden duration-200 ease-in-out'/>
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




  

  const navigate = useNavigate()
  const BackColor = (e)=>{
    animate(e.target, { color: localpallete[3].color}, {duration: 2, type: "spring"})
    console.log(e.target)
  }

  var auth
  useEffect(()=>{
    if (process.env.NODE_ENV == 'production') {
      auth = "https://api.srv45036.seohost.com.pl/api/logout"
    } else {
      auth = "http://localhost:3003/api/logout"
    }
  },[] )


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
        navigate("/")
      }
    });
  }
  const Home = useRef()
  const Config = useRef()
  const Settings = useRef()
  const Help =  useRef()


  const refs ={ 0 : Home, 1 : Config, 2 : Settings,3 : Help}
  
  if(width >= 768 ){
  return(
    <motion.div  className="w-[100vw] h-[400vh] flex bg-[#F6F7F8] overflow-hidden relative">
        <div id='menu-section' className='2xl:mx-12 mx-6 py-8 pb-16 xl:text-[42px] text-[36px] font-Poppins font-bold w-fit flex flex-col justify-between h-[100vh] fixed z-10'>
          <div className='flex flex-col justify-center items-start w-fit'>
            <motion.p style={{color:localpallete[3].color}} onHoverEnd={(e)=> BackColor(e)}  whileHover={{color: [(localpallete[3].color), "rgb(0,0,0)"]}} transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
            }} onClick={()=> navigate("/")} className='mb-[40px] lg:ml-8 cursor-pointer lg:inline-block hidden'>CreateUP</motion.p>
            {NavbarProfile.map((item, index) => (            
              <Card item={item} index={index} refTarget={refs[index]}/>
            ))}
          </div>
          <div style={{backgroundColor: localpallete[1].color}} className='rounded-full text-center lg:w-max flex items-center justify-center w-[75px] h-[57px]'>
            <p onClick={logout} className='font-Poppins text-white xl:text-[20px] text-[18px] xl:px-[80px] px-[75px] py-4 lg:inline-block hidden cursor-pointer'>Wyloguj</p>
            <i className="gg-log-out lg:hidden inline-block invert"></i>
          </div>
        </div>
        <div id='content-section' className={`w-full min-h-[400vh] h-auto 2xl:ml-[340px] xl:ml-[300px] lg:ml-[260px] ml-[100px]`}>
          <div className='fixed right-[-15%] z-[1] h-[100vh] w-[100%] brightness-[1.1]'>
              <Canvas>
                  <Model6_Figurka/>
              </Canvas>
          </div>
          <Start r={Home}/>
          <ConfigCard r={Config}/>
          
          <div ref={Settings} className="w-full h-[100vh] pl-6 pr-10 py-11 relative z-[2]">
              <div id='content-blur' className=' bg-[rgb(236,236,236,0.56)] rounded-3xl w-full h-full'>

              </div>
          </div>
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
            <div style={{backgroundColor: localpallete[2].color}} className='relative rounded-full px-4'>
              <div id='menu-slide-container' ref={ref}  className='rounded-full w-full py-[6px] pl-4 overflow-x-scroll ease-in-out duration-300'>
                <div  className='w-max flex'>
                  {NavbarProfile.map((item, index) => (            
                    <MobileCard item={item} index={index}/>
                  ))}
                </div>
                
              </div>
              <div className='absolute top-0 left-0 w-[50px] h-full rounded-l-[10px] p-[7px]'>
                <motion.div style={{opacity: BlokL_opacity}} className={`w-full h-full rounded-l-[17px] duration-300 ease-in-out bg-gradient-to-r from-[#A1A1A1] to-transparent`}>
                </motion.div>
              </div>
              <div className='absolute top-0 right-0 w-[50px] h-full rounded-r-[10px] p-[7px]'>
                <motion.div style={{opacity: BlokR_opacity}} className={`w-full h-full rounded-r-[17px] duration-300 ease-in-out bg-gradient-to-l from-[#A1A1A1] to-transparent `}>
                </motion.div>
              </div>
            </div>
          </div>
          <div className='relative z-[10] flex justify-center'>
            <div className='w-[90%] h-[30px] bg-gradient-to-b from-[#A1A1A1] to-transparent rounded-b-[17px] absolute top-0'></div>
          </div>
          <MobileCards index={isIndex} refs={refs}/>
        </div>
      </div>
    )
  }
  
}

const MobileCards =({index, refs})=>{
 
  if(index === 0){
    return (
      <Start r={refs[0]} />
    )
  }else if(index ===1){
    return(
      <ConfigCard r={refs[0]}/>
    )
  }
  
}

export default MainContainer