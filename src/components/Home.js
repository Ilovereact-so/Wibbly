import React, { useState } from 'react'
import Logo from './Logo'
import { Pallete1 } from '../constants'
import $ from 'jquery'

const Home = (loaded) => {

    //const [time, setTime] = useState({hours:"", minutes:""})
    const [minutes, setMinutes] = useState("")
    const [hours, setHours] = useState("")
    
    //date.getHours()
    //
    //if(time != date.getHours() +" : "+ date.getMinutes() ){
    //    if(date.getMinutes() <= 9){
    //        setTime(date.getHours() +" : 0"+ date.getMinutes())
    //    }else{
    //        setTime(date.getHours() +" : "+ date.getMinutes())
    //    }
    //}
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
    if(loaded.anim === true){
        $("#Banner").animate({
            top: "+=25",
            opacity: 1
        },300)
    }
  return (
    <div className='flex justify-center items-center h-[100vh] relative'>
        <div style={{color: Pallete1[3].color}} id='Banner' className={`Banner absolute top-[-15px] text-[160px] opacity-20 font-bold font-Poppins z-10`}>CreateUp</div>

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

        <div className={`w-[40vw] h-[65%] bg-[#F6F7F8] rounded-[49px] flex flex-col justify-center items-center ease-in duration-300 relative ${
            loaded.anim === true ? "bg-white" : "bg-[#F6F7F8]"
        }`}>
            <Logo loaded={true}/>
            <div className='absolute bottom-14 flex justify-center items-center'>
                <p style={{color: Pallete1[1].color}} className='text-[17] font-bold font-Poppins'>{hours + ":" + minutes}</p>
            </div>
        </div>
        <div className='absolute w-full flex justify-center items-center bottom-[20px]'>
            <div className='bg-[#F6F7F8] w-[80px] h-[80px] rounded-full flex justify-center items-start'>
                <div style={{backgroundColor: Pallete1[0].color}} className='w-[55px] h-[55px] rounded-full top-0 cursor-pointer hover:top-[-4px] ease-in-out duration-100 relative flex justify-center items-center'>
                    <i className="gg-arrow-down text-white"></i>
                </div>
            </div>
        </div>
    </div>
  )
}
const table = {td:"text-[12px] text-black font-Poppins "}

export default Home