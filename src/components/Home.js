import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import $ from 'jquery'
import Navbar from './Navbar'
import PalleteSection from './PalleteSection'
import Aboatme from './Aboatme'

const Home = (loaded) => {

    //const [time, setTime] = useState({hours:"", minutes:""})
    const [minutes, setMinutes] = useState("")
    const [hours, setHours] = useState("")
    const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
    const [btn, setBtn] = useState(false)


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
    
    $( document ).ready(function(){
        getTime();
    });
    
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
    console.log(loaded.anim)

    $(window).scroll(function (event) {
        
        var scroll = $(window).scrollTop();
        if(scroll >= 400){
            $("#Banner").css('opacity','0.5')
        }else if(scroll < 400){
            $("#Banner").css('opacity','1')
        }
        
    });


    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
    
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
    
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).on('resize scroll', function() {
        var scroll = $(window).scrollTop();
        if ($('.UXPsysanim').isInViewport()) {
            console.log("SI")
            setBtn(true)
        } else {
            console.log("nope")
            setBtn(false)
        }
        //console.log(scroll)
        //console.log($('#Aboatme').offset().top)
        
        if ($('#Aboatme').offset().top < (scroll + 400)) {
            $("#Banner").css("opacity","0")
        }
    });

    if(loaded.anim === true){
        $("#Banner").animate({
            top: "+=30",
            opacity: 1
        },300)
    }
    $('-webkit-scrollbar-thumb').css('background',localpallete[1].color)
  return (
    <div>
        <div className='flex justify-center items-center h-[100vh] relative'>
            <div style={{color: localpallete[3].color}} id='Banner' className={`Banner fixed top-[-10px] text-[160px] opacity-20 font-bold ease-in-out duration-300  font-Poppins z-[-1]`}>CreateUp</div>

            <div className={`w-[0px] h-[65%] flex flex-col justify-end overflow-hidden ease-in duration-300 ${
                loaded.anim === true ? "w-[0px]" : "w-[40vw]"
            }`}>
                <div>
                <p className='text-black font-bold font-Poppins text-[40px] mb-6'>Create your website</p>
                <p className='text-black font-Poppins text-[19px] mb-6'>Utwórz własną stronę internetową</p>
                <table className='w-[25vw] mb-20'>
                    <tr><td className={`${table.td}`}>systemy/aplikacje webowe</td><td className={`${table.td}`}>portale internetowe</td></tr>
                    <tr><td className={`${table.td}`}>strony wizytówki</td></tr>
                </table>
                <div className='bg-black h-[70px] text-white font-bold font-Poppins text-[22px] flex justify-center items-center cursor-pointer rounded-full mr-[12vw] mb-5'>Get Started</div>
                </div>
            </div>

            <div className={`w-[40vw] h-[65%] bg-[#F6F7F8] opacity-80 rounded-[49px] flex flex-col justify-center items-center ease-in duration-300 relative ${
                loaded.anim === true ? "bg-white" : "bg-[#F6F7F8]"
            }`}>
                <Logo loaded={true}/>
                <div className='absolute bottom-14 flex justify-center items-center'>
                    <p style={{color: localpallete[1].color}} className='text-[17] font-bold font-Poppins'>{hours + ":" + minutes}</p>
                </div>
            </div>
            <div className='right-0 fixed top-[14vh] z-[10] flex flex-col items-end'>
                <a href='#UXPsys' style={{backgroundColor: localpallete[1].color}} className={`h-[157px] w-[37px] cursor-pointer hover:w-[48px] ease-in-out duration-300 mb-8 rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center ${
                        btn === true ? "w-[48px]" : ""
                    }`}>
                    <i className="gg-options text-white"></i>
                </a>
                <Navbar/>
            </div>
            <div className='absolute z-10 w-full flex justify-center items-center bottom-[20px]'>
                <div className={`arrow bg-[#F6F7F8] w-[80px] h-[80px] rounded-full flex justify-center items-start ease-in-out duration-300`}>
                    <div style={{backgroundColor: localpallete[0].color}} className={`w-[55px] h-[55px] rounded-full top-0 cursor-pointer hover:top-[-4px] ease-in-out duration-100 relative flex justify-center items-center`}>
                        <i className="gg-arrow-down text-white"></i>
                    </div>
                </div>
            </div>
        </div>
        <PalleteSection/>
        <div id='Aboatme' className='overflow-hidden' >
            <Aboatme/>
        </div>
    </div>
  )
}
const table = {td:"text-[12px] text-black font-Poppins "}

export default Home