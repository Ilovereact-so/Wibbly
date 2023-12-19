import { Canvas } from '@react-three/fiber'
import React, { useEffect, useState } from 'react'
import { Model6_Figurka } from '../../3D/Figurka6'
import { decodeToken } from 'react-jwt'
import $ from 'jquery'
import { Index } from '../..'
import KonfiguratorCard from './KonfiguratorCard'
import SupportCard from './SupportCard'
import MessagesCard from './MessagesCard'
import SettingsCard from './SettingsCard'
import { Home, Konfigurator, Messages, Settings, Support } from '../../assets'
import { Navigate, useNavigate } from 'react-router-dom'

const MainProfile = () => {
    const [logged, setLogged] = useState(localStorage.getItem('rt'))
    const [T_option, setT_option] = useState({1:'', 2:'',3:'',4:''})
    const [L_option, setL_option] = useState({1:'', 2:'',3:'',4:''})
    const [H_option, setH_option] = useState({1:'', 2:'',3:'',4:''})
    const [W_option, setW_option] = useState({1:'', 2:'',3:'',4:''})
    const [distance_option, setDistance_option] = useState({1:'', 2:'',3:'',4:''})

    const navigate = useNavigate()
    function user() {
        if(logged != null){
            const myDecodedToken = decodeToken(logged);
            //console.log(myDecodedToken)
            return myDecodedToken
        }
    }

    const Calcualte_T_option = () => {
        setT_option({
            1 : $('#Configure').offset().top,
            2 : $('#Support').offset().top,
            3 : $('#Settings').offset().top,
            4: $('#Messages').offset().top
        })

    }
    const Calcualte_L_option = () => {
        setL_option({
            1 : $('#Configure').offset().left,
            2 : $('#Support').offset().left,
            3 : $('#Settings').offset().left,
            4 : $('#Messages').offset().left
        });

    }
    const Calcualte_H_option = () => {
        setH_option({
            1 : $('#Configure').height(),
            2 : $('#Support').height(),
            3 : $('#Settings').height(),
            4 : $('#Messages').height()
        });

    }
    const Calcualte_W_option = () => {
        setW_option({
            1 : $('#Configure').width(),
            2 : $('#Support').width(),
            3 : $('#Settings').width(),
            4 : $('#Messages').width()
        });

    }
    const Calculate_Index = () => {
        var scroll = $(window).scrollTop()
        const windowH = ($(window).height() - 200) / 2 ;
        var themost = 0;
        var themostindex = 0;
        var i = 1
        
        do{
            //console.log(i)
            var state = W_option[i] + L_option[i];
            //console.log(windowH, T_option[i])
            if(themost < state && (T_option[i] - scroll) > windowH){
                themost = state;
                themostindex = i -1;
                //console.log(themostindex)
                
            }
            
            if(i === 4){
                //console.log(themostindex)
                return themostindex
            }
            i = i + 1
        }while (i < 5)
        //console.log(themost, themostindex)
    }

     const MenuPos = () => {
        //Calcualte_T_option()
        //Calcualte_H_option()
        Calcualte_L_option()
        Calcualte_W_option()
        Calcualte_T_option()
        //console.log(Calculate_Index())
    }
    useEffect(()=>{
        Reload()
    },[])

    const Reload = () =>{
        MenuPos()
        var scroll = $(window).scrollTop();
        var max_scroll = $(window).height()
        const startDeg = 30 //choose strart position
        var oneDeg = max_scroll / 360 //degree
        var deg = scroll / oneDeg + startDeg
        var antyDeg = 360 - deg
        //console.log(deg)
        $('#menu').css('transform','rotate('+ deg +'deg)')
        $('.optionA').css('transform','rotate('+ antyDeg +'deg) translateY(-50%) scale(0.8)')
        $('.optionB').css('transform','rotate('+ antyDeg +'deg) translateX(-50%) scale(0.8)')
        $('.menu_infoText').css('transform','rotate('+ antyDeg +'deg)')
    }

    $(window).on('resize scroll',function() {
        Reload()
    });

  return (
    <div className='flex w-full h-[200vh]'> {/**Background */}
        <div id='Main' className='flex w-full h-[100vh] fixed'>
            <div className='flex justify-center w-full float-right h-auto m-[40px] z-[2] bg-[rgba(236,236,236,0.55)] relative rounded-[40px]'>
            <div onClick={() => navigate("/")} className='absolute top-7 left-7 flex justify-center rounded-[30px] cursor-pointer items-center bg-white'>
                <img src={Home} className='px-7 py-3 scale-[0.8]'/>
            </div>
                <div className='w-[57vw] h-full  flex justify-center items-center mr-[50px]'>
                    <div className='w-[45vw] h-[45vw] flex justify-center items-center'>
                        <div id='menu' className='rounded-full relative bg-[rgba(169,169,169,0.16)] backdrop-blur-[10px] w-full flex justify-center items-center h-full'>
                            <div className='flex flex-col menu_infoText'>
                                <p className='text-[17px] font-Poppins text-black pb-2'>Wybrano:</p>
                                <p className='text-[20px] font-Poppins font-bold text-black'>Konfigurator</p>
                            </div>
                            <div className='absolute w-full h-full'>
                                <img src={Konfigurator} id='Configure' className='optionA absolute right-[-100px] origin-top top-[50%] translate-y-[-50%]' ></img>
                                <img src={Support} id='Support' className='optionB absolute origin-left bottom-[-60px] left-[50%] translate-x-[-50%]'></img>
                                <img src={Settings} id='Settings' className='optionA absolute origin-top left-[-100px] top-[50%] translate-y-[-50%]'></img>
                                <img src={Messages} id='Messages' className='optionB absolute origin-left top-[-60px] left-[50%] translate-x-[-50%]'></img>
                            </div>                           
                        </div>    
                    </div>
                </div> {/**Menu */}
                <div className='flex flex-col w-auto h-full max-w-[450px] justify-between'>
                    <div className='mt-[50px]'>
                        <p className='font-Poppins font-bold text-[49px] text-black mb-3'>Witaj</p>
                        <p className='font-Poppins text-[25px] text-black mb-2'>{user()?.username}</p>
                        <p className='font-Poppins text-[16px] text-black'>
                            To twój panel użytkownika. Mozesz tu 
                            zmieniać kolory strony, przejść do
                            konfiguratora witryn lub nawiązać z nami kontakt
                        </p>
                    </div>
                    {Prompt[Calculate_Index()].element}
                </div>
            </div>


            <div className='absolute right-[-15%] z-[1] h-full w-[100%] '>
                <Canvas>
                    <Model6_Figurka/>
                </Canvas>
            </div>
        </div>
    </div>
  )
}

const Prompt = [
    {
        element: [<KonfiguratorCard/>],
    },
    {
        element: [<SupportCard/>],
    },
    {
        element: [<SettingsCard/>],
    },
    {
        element: [<MessagesCard/>],
    },
]

export default MainProfile