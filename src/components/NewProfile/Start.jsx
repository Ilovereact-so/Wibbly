import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
import { animate, motion, useScroll, useTransform } from 'framer-motion';
import { Createuplogo, PathProfilelogo } from '../../assets';
import setFilter from '../../constants/Colors';
import { debounce } from 'lodash';
import { isExpired, decodeToken } from "react-jwt";
import WsRequest from '../WsRequest';
import { usePallete } from '../../Context/PalleteContext';
import { Search } from 'lucide-react';


const Start = ({r, userState}) => {
    const {Pallete} = usePallete()
    const [width, setWidth] = useState($(window).width())
    //const [multiRef, addMultiRef] = useMultiRefs();

    useEffect(()=>{
        $(window).on('resize', debounce(async () => {
        setWidth($(window).width())
        },100))
    })

    const first_p_home = useRef()
    const second_p_home = useRef()
    const first_description_home = useRef()
    
    const refTabHome = [first_p_home, second_p_home, first_description_home]

    const WindowRes = ()=>{
        var winW = $(window).width()
        var winH = $(window).height()
        // var widthR = 1920
        // var heightR = 1080
        var pointR = winW / winH
        //console.log(pointR)
        return pointR
      }


    const Clock = () =>{
        const [minutes, setMinutes] = useState("")
        const [hours, setHours] = useState("")
        useEffect(()=>{
          getTime()
        })
     
        function getTime(){
          const date = new Date();
          if(minutes !== date.getMinutes()){
              if(date.getMinutes() <= 9){
                  setMinutes("0" + date.getMinutes())
              }else{
                  setMinutes(date.getMinutes())
              }
              if(date.getHours() < 9){
                  setHours("0" + date.getHours())
                  //console.log("<9")
              }else{
                  setHours(date.getHours())
                  //console.log(">9")
              };
              const delay = 60- date.getSeconds();
              timeout(delay)
              
          }
        }
        function timeout(data){
            setTimeout(()=>{
                getTime();
            },data)
        }
        return (
          <p className='font-Poppins text-black 01xl:text-[30px] text-[24px]'>{hours} : {minutes}</p>
        )
    }

    const data = ()=>{
    var isFocus = $("#search-profile").is(":focus")
    var size = $("#container-search-profile").width()
    animate(".arrow", isFocus ? { x: -(size - 75)} : { x: 0} , { duration: 0.8, type: "spring"})
    animate("#search-profile", isFocus ? { paddingLeft : 64 } : { paddingLeft : 24} , { duration: 0.8, type: "spring",})
    animate("#search-profile", isFocus ? { filter, opacity} : {filter, opacity} , { duration: 0.8, type: "keyframes",})
    }

    const Pull = (ref)=> {
    const { scrollYProgress } = useScroll({
        offset: ["end end", "end start"],
        target: ref
    });
    
    const x = useTransform(scrollYProgress,  (pos) => {
            return pos >= 0.7 ? 100 : 1; 
        })
        return x
    }

    const opacity = (
        ["0%","20%","80","100%"],
        [1,0.3,0.3,1]
        
    )
    const filter = (
    ["0%","20%","80","100%"],
    ["blur(0px)","blur(1px)","blur(1px)","blur(0px)"]
    )

    const[userData, setUserData] = useState(null)
    useEffect(()=>{
        async function user() {
        if(userState){
            const data = await WsRequest.getDataUser()
            console.log(data)
            setUserData(data)
        }
        }

        user()
    },[])
    

    if(width >= 768 ){
  return (
    <div ref={r} style={ WindowRes() < 1 ? {minHeight: "1080px"} : {}}  className="w-full min-h-[100vh] h-auto grid pl-6 pr-10 py-11 relative z-[2]">
        <div id='content-blur' className=' bg-[rgb(236,236,236,0.56)] rounded-3xl w-full h-full flex flex-col 01xl:pl-28 01xl:pr-20 pl-16 pr-12'>
            <div className='flex mt-14 justify-between'>
            <div className='flex flex-col 2xl:ml-[140px] xl:ml-[120px] lg:ml-[75px]'>
                <p className='font-Poppins font-bold 01xl:text-[70px] text-[60px] 2xl:text-[100px] text-black'>Witaj</p>
                <p className='2xl:text-[50px] text-[30px]  font-Poppins text-black'>{userData?.username}</p>
            </div>
            <div className='flex justify-center items-start'>
                <div id='container-search-profile' className='01xl:h-[54px] h-[45px] xl:min-w-[200px] min-w-[130px] 2xl:w-[360px] 01xl:w-[300px] xl:w-[260px] w-[220px] rounded-full relative flex items-center justify-end 01xl:mr-16 mr-10 ml-8'>
                <motion.input whileFocus={() => data()} type='text' id='search-profile' className='01xl:h-[60px] h-[48px] font-Poppins w-full rounded-full p-4 px-16 focus:outline-none'/>
                <Search className='absolute right-8 arrow 01xl:scale-[1] scale-[0.9]'/>
                </div>
                <div className='relative flex justify-center items-center 01xl:scale-[1] scale-[0.8] origin-top'>
                <img style={{filter: setFilter(Pallete[0])}} id='PathProfilelogo' className='' src={PathProfilelogo}/>
                <img src={Createuplogo} className=" absolute invert-[1] xl:scale-[1] scale-[0.7]"/>
                </div>
            </div>
            </div>
            <div className='mt-12 flex flex-col h-full justify-between'>
                <motion.p style={{x: Pull(refTabHome[0])}} ref={first_p_home}  className='font-Poppins font-normal ease-in-out duration-300 text-black 01xl:text-[18px] text-[16px] max-w-[750px]'>
                To twój panel użytkownika. Mozesz tu zmieniać kolory strony, przejść do
                konfiguratora witryn lub nawiązać z nami kontakt
                </motion.p>
            <div className='font-Poppins '>
                <motion.p style={{x: Pull(refTabHome[1])}} ref={second_p_home} className='2xl:text-[65px] 01xl:text-[50px] text-[40px] font-bold text-white mb-3 ease-in-out duration-300'>Dziękujemy za</motion.p>
                <motion.div style={{backgroundColor: Pallete[2], x: Pull(refTabHome[2])}} ref={first_description_home} className='font-normal 01xl:text-[18px] text-[16px]  text-white rounded-[30px] p-10 max-w-[50vw] ease-in-out duration-300'>
                zaufanie związane z korzystaniem z naszych usług. Skorzystaj z opcji
                konfiguratora byśmy mogli dokładnie sie zrozumieć na drodze tworzenia strony
                </motion.div>
            </div>
            <div className='flex justify-between'>
                <div></div>
                <div className='mb-8'>{<Clock/>}</div>
            </div>
            </div>
        </div>
    </div>
  )}
  else{
    return(
        <div className='h-full w-full pt-14 overflow-auto relative'>
            <div ref={r} className='w-full h-max rounded-[50px] relative flex flex-col items-center'>
                <div id='content-blur' className='absolute w-full h-full bg-[rgb(236,236,236,0.56)] rounded-[50px] z-[1]'></div>
                <div className='relative z-[5] ss:px-6 px-3 w-full'>
                    <div className='relative flex justify-center items-center 01xl:scale-[1] scale-[0.8] origin-top top-[-25px]'>
                        <img style={{filter: setFilter(Pallete[0])}} id='PathProfilelogo' className='scale-[1.2]' src={PathProfilelogo}/>
                        <img src={Createuplogo} className=" absolute invert-[1] scale-[1.1] "/>
                    </div>
                    <p className='font-Poppins text-black text-[14px] max-w-[490px] mb-9 mx-4'>
                    To twój panel użytkownika. Mozesz tu zmieniać kolory strony, przejść do
                    konfiguratora witryn lub nawiązać z nami kontakt
                    </p>
                    <div id='container-search-profile' className='h-[45px]  min-w-[200px] w-full rounded-full relative flex items-center justify-end mb-10 px-4'>
                        <motion.input whileFocus={() => data()} type='text' id='search-profile' className='ss:h-[54px] h-[48px] font-Poppins w-full rounded-full p-4 px-16 focus:outline-none '/>
                        <Search className='absolute right-12 arrow ss:scale-[0.9] scale-[0.8]'/>
                    </div>
                    <p className='ss:text-[30px] text-[27px] font-bold text-white mb-3 ease-in-out duration-300 font-Poppins ml-3'>Dziękujemy za</p>
                    <div style={{backgroundColor: Pallete[2]}} className='font-normal mx-3 text-[14px] font-Poppins text-white rounded-[30px] p-5 ease-in-out duration-300 mb-14'>
                    zaufanie związane z korzystaniem z naszych usług. Skorzystaj z opcji
                    konfiguratora byśmy mogli dokładnie sie zrozumieć na drodze tworzenia strony
                    </div>
                    <div className='flex ss:justify-start justify-center items-center w-full'>
                        <div style={{backgroundColor: Pallete[1]}} className='rounded-full text-center w-full flex items-center justify-center h-[47px] max-w-[260px] mb-4 mx-5'>
                        <p className='font-Poppins text-white text-[17px] px-[75px] py-4 font-bold'>Wyloguj</p>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Start