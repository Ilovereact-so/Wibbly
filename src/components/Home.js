import React, { useContext, useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import Navbar, { NavBtn } from './Navbar'
import PalleteSection from './PalleteSection'
import Aboatme from './Aboatme'
import Main from '../Main.scss'
import "./Home-word.js"
import Offer from './Offer'
import Footer from './Footer'
import { debounce } from 'lodash';
import { useScroll, useTransform, motion, animate, delay } from 'framer-motion'
import $ from 'jquery'
import Auth from './Auth.js'
import { useNavigate } from 'react-router-dom'
import { ArrowDown, Moon, Sun } from 'css.gg'
import { ColorModeProvider, useColorMode } from '../Context/ColorModeContext.js'
import Projects from './Projects.jsx'
import { usePallete } from '../Context/PalleteContext.js'
import Clock from 'react-live-clock';
import useWidth from '../Hooks/useWidth.js'

const Home = ({userState}) => {

    //const [time, setTime] = useState({hours:"", minutes:""})
    const [minutes, setMinutes] = useState("")
    const [hours, setHours] = useState("")
    const [btn, setBtn] = useState(false)
    const windowW= useWidth()
    const [nav, setNav] = useState(false)
    const scale = 0.0008
    const logoScale = 0.00125
    const navigate = useNavigate()
    const { Pallete } = usePallete();
    


    const mainContainer = useRef()
    const { scrollYProgress } = useScroll({
        target: mainContainer,
        offset: ["start end", "end start"],
      });
  
  
      const opacity = useTransform(scrollYProgress,  (pos) => {
        
        return pos > 0 && pos >= 1 ? "0.4" : "1"; 
    })
    const handleNavclick = (data)=>{
        setNav(data)
        if(data){
            $("#App-Main").addClass("navigation")
        }else{
            $("#App-Main").removeClass("navigation")

        }
    }      

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
        // ----------- narazie nie przypisany 
        // const state = Auth()
        // // const state = Auth().finally((onFinally)=>{
        // //     return onFinally
        // // })
        // console.log(state)
        // if(!state){
        //     animate("#startBtn div", { opacity: 1 }, { type: "spring" }, { ease: "easeIn" }, { duration: 0.3 })
        //     animate('#startBtn', {scaleX}, {type: 'keyframes' },)//repeat: 1
        //     setTextGetStart('Zaloguj sie')
        // }else{
        //     const element = document.getElementById('Offer');
        //     if (element) {
        //         element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        //     }
        // }
        // if(isTextGetStart === 'Zaloguj sie'){
        //     navigate("/login")
        // }
        
    }
    const scaleX = (
        ["0%","25%","50","75","100%"],
        [1,1.1,1,1.1,1]
    )

    const AboutCard = useRef()
    const PalleteCard = useRef()
    const OfferCard =  useRef()


    const refs = { 0 : mainContainer, 1 : PalleteCard, 2 : AboutCard,3 : OfferCard}

    
    
    const { colorMode, toggleColorMode } = useColorMode();
    useEffect(()=>{
        //windowW < 1024
        let auto = $('.auto');
        const mode = {
            "light" : $('.day'),
            "dark" : $('.night'),
            "auto" : $(".auto")
        }
        if(!colorMode){
            //$(".handleBTN").css("left", `${auto[0].offsetParent.offsetLeft + auto[0].offsetParent.offsetWidth - (windowW < 1024 ? 31:36)}px`)
            animate(".handleBTN", {left:  auto[0].offsetParent.offsetLeft +auto[0].offsetParent.offsetWidth - (windowW < 1024 ? 31:36)} , { duration: 1, type: "spring", ease: "easeInOut"})

        }else {
            console.log("pos")
            //$(".handleBTN").css("left", `${mode[colorMode][0].offsetParent.offsetLeft + mode[colorMode][0].offsetParent.offsetWidth - (windowW < 1024 ? 31:36)}px`)
            animate(".handleBTN", {left:  mode[colorMode][0].offsetParent.offsetLeft + mode[colorMode][0].offsetParent.offsetWidth - (windowW < 1024 ? 31:36)} , { duration: 1, type: "spring", ease: "easeInOut"})

        }
    },[windowW])

    const handleMode = async(e)=>{
        console.dir(e)

        console.log(e.target.offsetParent.offsetLeft, e.target.offsetParent.offsetWidth)

        animate(".handleBTN", {left:  e.target.offsetParent.offsetLeft + e.target.offsetParent.offsetWidth - (windowW < 1024 ? 31:36)} , { duration: 1, type: "spring", ease: "easeInOut"})
        toggleColorMode(e.target.defaultValue)
        
    }
    const handleAnimcomplete = () =>{
    }

    const texts = ['Create your website','It`s very simple']; // 🔄 Zmienne teksty

    const TypingEffect = () => {
      const [textIndex, setTextIndex] = useState(0);
      const [displayedText, setDisplayedText] = useState("");
      const [isDeleting, setIsDeleting] = useState(false);
    
      useEffect(() => {
        const currentText = texts[textIndex];
    
        if (!isDeleting) {
          // PISANIE tekstu
          if (displayedText.length < currentText.length) {
            setTimeout(() => {
              setDisplayedText(currentText.slice(0, displayedText.length + 1));
            }, 150); // ⏳ Tempo pisania (wolniejsze)
          } else {
            setTimeout(() => setIsDeleting(true), 1000); // ⏳ Czeka 1 sek przed kasowaniem
          }
        } else {
          // KASOWANIE tekstu
          if (displayedText.length > 0) {
            setTimeout(() => {
              setDisplayedText(currentText.slice(0, displayedText.length - 1));
            }, 100); // ⏳ Tempo kasowania (może być szybsze)
          } else {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length); // 🔄 Przejście do kolejnego tekstu
          }
        }
      }, [displayedText, isDeleting, textIndex]);
    
      return (
        <motion.div
          className='text-black inline-block pr-[4px] border-solid border-r-2 border-black font-bold font-Poppins ss:text-[40px]  text-[25px] mb-6 ease-in-out duration-300 transition-[height] mt-5'
        >
          {displayedText}
        </motion.div>
      );
    };
    
  return (
    <div id="App-Main" className='flex ease-in-out duration-300 relative bg-white ' bg={{ base: "white", _dark: "black" }}>
        <div className='w-[100vw] flex flex-col h-full'>
            <div id="Home" ref={mainContainer} className='header-container ss:justify-center justify-start items-center lg:mt-0 md:mt-[185px] ss:mt-[100px] mt-[10px] min-h-[100vh] h-auto relative'>
                <motion.div style={{color: Pallete[3], opacity, scale:windowW > 768 ? windowW*scale : windowW*scale * 2.6, gridArea:"banner"}} initial={{top:0}} whileInView={{top:40}} transition={{duration:0.3, ease:"easeIn"}} id='Banner' className={`Banner fixed md:text-[160px] text-[60px] font-bold  font-Poppins z-[1] w-full text-center transition-opacity`}>CreateUp</motion.div>
                    
                    <motion.div initial={{left:"50%"}} whileInView={windowW > 1024 ? {left:0} : null} transition={{left:{duration:1, ease:"backOut"}}} id='ModesBtn' style={{ gridArea: "buttons" }} className='bg-[#EBEBEB] lg:rounded-[25px] rounded-b-[35px] h-[56px] lg:w-[168px] w-[190px] flex p-auto justify-evenly items-center p-[4px] lg:px-0 px-5 lg:relative absolute lg:top-0 md:top-[-185px] ss:top-[-100px] top-[-10px] lg:left-0 left-[50%] lg:translate-x-0 translate-x-[-50%] z-10'>
                        <motion.div className='lg:w-[48px] lg:h-[48px] w-[40px] h-[40px] bg-[#b9b4b4] rounded-full absolute lg:top-[4px] top-[8px] z-10 opacity-40 brightness-[85%] handleBTN flex'></motion.div>
                        <label className='p-[12px] cursor-pointer'>
                            <div className='relative lg:w-[24px] w-[20px] lg:h-[24px] h-[20px] flex justify-center items-center'>
                                <input onClick={(e)=>handleMode(e)} className='lg:w-[24px] w-[20px] lg:h-[24px] h-[20px] opacity-0 day'  type='radio' name='colorMode' value="light" ></input>
                                <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] lg:scale-100 scale-[0.834]'><Sun/></div>
                            </div>
                        </label>
                        <label className='p-[12px] px-[18px] cursor-pointer'>
                            <div className='relative lg:w-[24px] w-[20px] lg:h-[24px] h-[20px] flex justify-center items-center'>
                                <input onClick={(e)=>handleMode(e)} className='lg:w-[24px] w-[20px] lg:h-[24px] h-[20px] opacity-0 night'  type='radio' name='colorMode' value="dark" ></input>
                                <div className='absolute top-[50%] left-[50%] translate-x-[-50%] lg:scale-100 scale-95 translate-y-[-50%]'><Moon /></div>
                            </div>
                        </label>
                        <label className='p-[12px] cursor-pointer'>
                            <div className='relative lg:w-[24px] w-[20px] lg:h-[24px] h-[20px] flex justify-center items-center'>
                                <input onClick={(e)=>handleMode(e)} className='lg:w-[24px] w-[20px] lg:h-[24px] h-[20px] opacity-0 auto'  type='radio' name='colorMode' value="auto" ></input>
                                <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'><p className='text-[10px] relative z-2'>Auto</p></div>
                            </div>
                        </label>
                    </motion.div>
                    {windowW > 1024 ? null : 
                    <div id='dynamic_island_constainer' className='absolute ss:top-[-185px] top-[-10px] left-[50%] translate-x-[-50%] flex'>
                        <div className="dynamic_island_out">
                            <div className="dynamic_island_in"></div>
                        </div>
                        <div className='bg-[#EBEBEB] w-[190px] rounded-b-[35px]'></div>
                        <div className="dynamic_island_out scale-x-[-1]">
                            <div className="dynamic_island_in"></div>
                        </div>   
                    </div>}         
                    <motion.div initial={{left:"50%"}} whileInView={{left:0}} transition={{left:{duration:1, ease:"backOut"}}} style={{ gridArea: "left"}} className='relative z-10 transition-[height] w-full lg:px-0 px-20'>
                        <TypingEffect />
                        <p className='text-black font-Poppins ss:text-[19px] text-[13px] mb-6'>Tworzymy strony internetowe</p>
                        <table className='lg:w-[25vw] w-full mb-20'>
                            <tr><td className={`${table.td}`}>systemy/aplikacje webowe</td><td className={`${table.td}`}>portale internetowe</td></tr>
                            <tr><td className={`${table.td}`}>strony wizytówki</td></tr>
                        </table>
                        <div onClick={()=> getStarted()} id='startBtn' className='bg-black ss:h-[70px] h-[50px] text-white font-bold font-Poppins ss:text-[22px] text-[15px] flex justify-center items-center cursor-pointer rounded-full lg:mr-[12vw] mb-5 relative min-w-[200px]'>
                            {isTextGetStart}
                            <motion.div  className='font-Poppins opacity-0 text-[13px] text-black inline-flex justify-center items-center px-10 py-5 bg-[#F8F8F8] absolute top-[64px] font-normal rounded-full'>Aby zacząć musisz sie zalogowac</motion.div>
                        </div>
                    </motion.div>
                    

                <motion.div  style={{gridArea: "right"}} initial={{x:"-50%"}} whileInView={{x:0}} transition={{x:{duration:1.3, ease:"backOut"}}} className={`lg:w-[40vw] py-[80px] ss:w-[65vw] w-[80vw] lg:px-0 px-8 h-[100%] md:min-h-[500px] lg:h-[60vh] bg-[#F6F7F8] opacity-80 rounded-[49px] flex flex-col justify-center items-center relative z-[2]`}>
                    
                    <motion.div style={{scale: windowW < 767 ? windowW * 1.1* logoScale : 1}}><Logo  onAnimationEnd={handleAnimcomplete}/> </motion.div>
                    <div className='absolute bottom-14 flex justify-center items-center'>
                        <p style={{color: Pallete[1]}} className='ss:text-[17] text-[12px] font-bold font-Poppins'>
                            <Clock format={'HH:mm'} ticking={true} timezone={'Europe/Warsaw'} />
                        </p>
                    </div>
                </motion.div>
                <div className='absolute z-10 w-full hidden lg:flex justify-center items-center bottom-[20px] '>
                    <div className={`arrow bg-[#F6F7F8] w-[80px] h-[80px] rounded-full flex justify-center items-start ease-in-out duration-300`}>
                        <div id='navdot' style={{backgroundColor: Pallete[0]}} className={`w-[55px] h-[55px] rounded-full top-0 cursor-pointer hover:top-[-4px] ease-in-out duration-100 relative flex justify-center items-center ${
                            nav === true ? "rotate-[-90deg]" : "rotate-0"
                        }`}>
                            <ArrowDown className='text-white'/>
                        </div>
                    </div>
                </div>
            </div>
            <PalleteSection r={PalleteCard}/>
            <Projects/>
            <div id='Aboatme' className='overflow-hidden' >
                <Aboatme r={AboutCard}/>
            </div>
            <Offer r={OfferCard}/>
            <Footer/>

        </div>
        <div className='absolute top-0 right-0 flex h-full'>
            <div className='relative'>
                <div className={`right-0 sticky top-[14vh] h-[72vh] z-[10] flex flex-col items-end ease-in-out duration-300 ${
                nav === true ? "mm:translate-x-0 translate-x-[100%] mm:scale-[1] scale-x-[-1] scale-y-[1]" : ""
                }`}>
                    <NavBtn r={PalleteCard} handleNavclick={handleNavclick}/>
                </div>
            </div>
        </div>
        <Navbar refs={refs} userState={userState}  />
    </div>
  )
}
const table = {td:"ss:text-[12px] text-[9px] text-black font-Poppins "}

export default Home