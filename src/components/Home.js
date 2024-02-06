import React, { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import Navbar, { NavBtn } from './Navbar'
import PalleteSection from './PalleteSection'
import Aboatme from './Aboatme'
import Main from '../Main.scss'
import "./Home-word.js"
import Offer from './Offer'
import Footer from './Footer'
import { debounce } from 'lodash';
import { useScroll, useTransform, motion, animate } from 'framer-motion'
import $ from 'jquery'
import Auth from './Auth.js'
import { useNavigate } from 'react-router-dom'

const Home = (loaded) => {

    //const [time, setTime] = useState({hours:"", minutes:""})
    const [minutes, setMinutes] = useState("")
    const [hours, setHours] = useState("")
    const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
    const [btn, setBtn] = useState(false)
    const [windowW, setWindowW] = useState()
    const [nav, setNav] = useState(false)
    const scale = 0.00125
    const navigate = useNavigate()

    const mainContainer = useRef()
    const { scrollYProgress } = useScroll({
        target: mainContainer,
        offset: ["start end", "end start"],
      });
  
  
      const opacity = useTransform(scrollYProgress,  (pos) => {
        
        return pos > 0 && pos >= 1 ? "0.4" : "1"; 
    })

    useEffect(() => {
        $('#openMenu-Btn').on('click', ()=> {
            if(nav === false){
                setNav(true)
                $("#App-Main").addClass("navigation")
            }
            if(nav === true){
                setNav(false)
                $("#App-Main").removeClass("navigation")
            } 
        })
        const handleResizeScroll = debounce(() => {
          setWindowW(window.innerWidth);
      
          if (window.innerWidth <= 730) {
            $(".Banner").css("transform", 'scale(' + window.innerWidth * scale + ')');
          } else {
            $(".Banner").css("transform", 'scale(1)');
          }
      
          if (nav === true) {
            handleClick(false);
          }
        }); // Czas opóźnienia w milisekundach
      
        // Dodajemy obsługę zdarzeń z opóźnieniem
        window.addEventListener('resize', handleResizeScroll);
        window.addEventListener('scroll', handleResizeScroll);
      
        return () => {
          // Usuwamy obsługę zdarzeń
          window.removeEventListener('resize', handleResizeScroll);
          window.removeEventListener('scroll', handleResizeScroll);
        };
        
      }, [nav]); // Pamiętaj o dodaniu 'nav' do zależności useEffect
      

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
    //date.getHours()
    //
    //if(time != date.getHours() +" : "+ date.getMinutes() ){
    //    if(date.getMinutes() <= 9){
    //        setTime(date.getHours() +" : 0"+ date.getMinutes())
    //    }else{
    //        setTime(date.getHours() +" : "+ date.getMinutes())
    //    }
    //}
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    })
    
    $( document ).ready( debounce(async () => {
        getTime();
    
        setWindowW($(window).innerWidth())
        if(windowW <= 730){
            $(".Banner").css("transform", 'scale('+ windowW * scale +')')
        }else{
            $(".Banner").css("transform", 'scale(1)')
        }
    },300));

    
    const handleClick = (data) => {
        if(data === true){
            setNav(true)
            $("#App-Main").addClass("navigation")
        }else if(data === false){
            setNav(false)
            $("#App-Main").removeClass("navigation")
        }
        if(data === "nav"){
            if(nav === false){
                setNav(true)
                $("#App-Main").addClass("navigation")
            }
            if(nav === true){
                setNav(false)
                $("#App-Main").removeClass("navigation")
            }
        }
    }
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
    //console.log(loaded.anim)

    // $(window).scroll(debounce(async () => {
    //     var scroll = $(window).scrollTop();
    //     if(scroll >= 400){
    //         $("#Banner").css('opacity','0.5')
    //     }else if(scroll < 400){
    //         $("#Banner").css('opacity','1')
    //     }
    // },100)
    // );
    // useEffect(()=>{
    //     $.fn.isInViewport = function() {
    //         if(this[0] != null){
    //             var elementTop = $(this).offset().top;
    //             var elementBottom = elementTop + $(this).outerHeight();
    
    //             var viewportTop = $(window).scrollTop();
    //             var viewportBottom = viewportTop + $(window).height();
    
    //             return elementBottom > viewportTop && elementTop < viewportBottom;
    //         }   
    //     };
    // })
        

    // $(window).on('resize scroll', debounce(async () => {
        
    //         var scroll = $(window).scrollTop();//
    //         // if($('#UXPsys').isInViewport()) {
    //         //     setBtn(true)
    //         // } else {
    //         //     //console.log("nope")
    //         //     setBtn(false)
    //         // }

    //         if($('#Aboatme')[0] != null){
    //             if ($('#Aboatme').offset().top < (scroll + 400) ) {
    //                 $("#Banner").css("opacity","0")
    //             }
    //         }

        
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
        
    //     },100)
    // );
    
    const [isTextGetStart, setTextGetStart] = useState('Zaczynajmy')
    const getStarted = () =>{
        const state = Auth()
        // const state = Auth().finally((onFinally)=>{
        //     return onFinally
        // })
        console.log(state)
        if(!state){
            animate("#startBtn div", { opacity: 1 }, { type: "spring" }, { ease: "easeIn" }, { duration: 0.3 })
            animate('#startBtn', {scaleX}, {type: 'keyframes' },)//repeat: 1
            setTextGetStart('Zaloguj sie')
        }else{
            const element = document.getElementById('Offer');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        if(isTextGetStart === 'Zaloguj sie'){
            navigate("/login")
        }
        
    }
    const scaleX = (
        ["0%","25%","50","75","100%"],
        [1,1.1,1,1.1,1]
    )

    const AboutCard = useRef()
    const PalleteCard = useRef()
    const OfferCard =  useRef()


    const refs = { 0 : mainContainer, 1 : PalleteCard, 2 : AboutCard,3 : OfferCard}

    if(loaded.anim === true){
        $("#Banner").animate({
            top: "+=30",
        },300)
    }
    $('-webkit-scrollbar-thumb').css('background',localpallete[1].color)
  return (
    <div id="App-Main" className='flex ease-in-out duration-300 relative'>
        <div className='w-[100vw] flex flex-col h-full'>
            <div id="Home" ref={mainContainer} className='flex lg:flex-row flex-col-reverse ss:justify-center justify-start items-center lg:mt-0 ss:mt-[185px] mt-[10px] h-[100vh] relative'>
                <motion.div style={{color: localpallete[3].color, opacity}} id='Banner' className={`Banner fixed ss:top-[-10px] top-[-20px] md:text-[160px] text-[123px] font-bold ease-in-out duration-300  font-Poppins z-[-1]`}>CreateUp</motion.div>

                <div className={`left-Home w-[0px] ss:h-[65%] h-[40%]  flex flex-col justify-end overflow-visible ease-in duration-300 ${
                    loaded.anim === true ? "w-[0px]" : "lg:w-[40vw] w-full lg:px-0 px-[8vw]"
                }`}>
                    <div>
                        <p className='text-black font-bold font-Poppins ss:text-[40px] text-[25px] mt-[30px] mb-6 word'></p>
                        <p className='text-black font-Poppins ss:text-[19px] text-[13px] mb-6'>Tworzymy strony internetowe</p>
                        <table className='lg:w-[25vw] w-full mb-20'>
                            <tr><td className={`${table.td}`}>systemy/aplikacje webowe</td><td className={`${table.td}`}>portale internetowe</td></tr>
                            <tr><td className={`${table.td}`}>strony wizytówki</td></tr>
                        </table>
                        <div onClick={()=> getStarted()} id='startBtn' className='bg-black ss:h-[70px] h-[50px] text-white font-bold font-Poppins ss:text-[22px] text-[15px] flex justify-center items-center cursor-pointer rounded-full lg:mr-[12vw] mb-5 relative'>
                            {isTextGetStart}
                            <motion.div  className='font-Poppins opacity-0 text-[13px] text-black inline-flex justify-center items-center px-10 py-5 bg-[#F8F8F8] absolute top-[64px] font-normal rounded-full'>Aby zacząć musisz sie zalogowac</motion.div>
                        </div>
                    </div>
                    
                </div>

                <div className={`lg:w-[40vw] py-[80px] w-[70vw] ss:h-[100%] md:min-h-[500px] lg:h-[65%] h-[40%] bg-[#F6F7F8] opacity-80 rounded-[49px] flex flex-col justify-center items-center ease-in duration-300 relative ${
                    loaded.anim === true ? "bg-white" : "bg-[#F6F7F8]"
                }`}>
                    <Logo loaded={true}/>
                    <div className='absolute bottom-14 flex justify-center items-center'>
                        <p style={{color: localpallete[1].color}} className='ss:text-[17] text-[12px] font-bold font-Poppins'>{hours + ":" + minutes}</p>
                    </div>
                </div>
                <div className='absolute z-10 w-full hidden lg:flex justify-center items-center bottom-[20px]'>
                    <div className={`arrow bg-[#F6F7F8] w-[80px] h-[80px] rounded-full flex justify-center items-start ease-in-out duration-300`}>
                        <div id='navdot' style={{backgroundColor: localpallete[0].color}} onClick={()=> handleClick(true)} className={`w-[55px] h-[55px] rounded-full top-0 cursor-pointer hover:top-[-4px] ease-in-out duration-100 relative flex justify-center items-center ${
                            nav === true ? "rotate-[-90deg]" : "rotate-0"
                        }`}>
                            <i className="gg-arrow-down text-white"></i>
                        </div>
                    </div>
                </div>
            </div>
            <PalleteSection r={PalleteCard}/>
            <div id='Aboatme' className='overflow-hidden' >
                <Aboatme r={AboutCard}/>
            </div>
            <Offer r={OfferCard}/>
            <Footer/>

        </div>
        <div className='absolute top-0 right-0 flex h-full'>
            <div className='relative'>
                <div className={`right-0 sticky top-[14vh] z-[10] flex flex-col items-end ease-in-out duration-300 ${
                nav === true ? "mm:translate-x-0 translate-x-[100%] mm:scale-[1] scale-x-[-1] scale-y-[1]" : ""
                }`}>
                    <NavBtn r={PalleteCard}/>
                </div>
            </div>
        </div>
        <Navbar refs={refs}/>
    </div>
  )
}
const table = {td:"ss:text-[12px] text-[9px] text-black font-Poppins "}

export default Home