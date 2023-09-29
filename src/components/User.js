import React, { Suspense, useEffect, useState } from 'react'
import $, { post } from 'jquery'
import { Canvas } from '@react-three/fiber'
import { Model } from '../3D/Character';
import { OrbitControls } from '@react-three/drei';
import Logo from './Logo';
import {json, useNavigate } from 'react-router-dom';
import axios, { Axios } from 'axios';
import CheckUser from './CheckUser';
import CreateUser from './CreateUser';

const User = () => {
  const scale_l = 3.272727272727273; // window height() / text font size
  const scale_r = 4.2; // window height() / text font size
  const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
  const [rotationX, setRotationX] = useState(0)
  const rotationS = -38.216560509554140127388535031847 // scale from rotation 3d object max rotation is -6.28
  const [click, setClick] = useState(false)

  const navigate = useNavigate()
  

  const Next = () => {
    
    $("#form-user").addClass('waiting-form')
    
    setTimeout(()=>{
      $("#form-user").removeClass('waiting-form')
      setClick(true)
    },500)
    setTimeout(()=>{
      setClick(false)
      //console.log("click-false")
    },520)
  }


 
 
    
  //console.log(validateEmail())
    useEffect(() => {
      $("#form-user").css('max-height','0px')
      setTimeout(()=>{
        $("#form-user").css('max-height','700px')
      },500)

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
      let winH = $(window).height()
      $('#text-login').css('font-size', winH / scale_l )
      $('#text-register').css('font-size', winH / scale_r )
    })
    $( document ).ready(function(){
      let winH = $(window).height()
      $('#text-login').css('font-size', winH / scale_l )
      $('#text-register').css('font-size', winH / scale_r )
    });

    

    useEffect(()=>{
      const body = document.body;
      const ball = document.getElementById('modelScroll')
      const dock = document.getElementById('dockScroll')
      ball.onmousedown = function(event) {
        // (1) prepare to moving: make absolute and on top by z-index
        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;
        const dockleft = $('#dockScroll').offset().left;
        const docktop = $('#dockScroll').offset().top;
        ball.style.backgroundColor = localpallete[1].color
        //document.body.append(ball);
        // move it out of any current parents directly into body
        // to make it positioned relative to the body
      
        // centers the ball at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
          ball.style.left = pageX - ball.offsetWidth / 2 - dockleft + 'px';
          
          if(ball.offsetLeft < 0 ){
            //console.log(ball.style.left)
            ball.style.left = 0 + "px"
          }
          if(ball.offsetLeft > dock.offsetWidth - ball.offsetWidth){
            ball.style.left = dock.offsetWidth - ball.offsetWidth + 'px'
          }
          setRotationX(ball.offsetLeft / rotationS);
          
          //ball.style.top = pageY - ball.offsetHeight / 2 - docktop + 'px';
  
        }

        // move our absolutely positioned ball under the pointer
        moveAt(event.pageX, event.pageY);
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // (2) move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // (3) drop the ball, remove unneeded handlers
        body.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          ball.style.backgroundColor = '#000'
          ball.onmouseup = null;
        };

        ball.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          ball.style.backgroundColor = '#000'
          ball.onmouseup = null;
        };
        ball.ondragstart = function() {
          return false;
        };
      
      };
    })
    
    return (
    <div className='h-[100vh] w-full bg-[#F6F7F8]'>
        <div className='flex h-full'>
        <div id='text-login' className='font-Poppins font-bold text-[#363636] h-full w-auto lg:relative absolute z-[2] md:flex hidden justify-center items-center'><p className='rotate-180 inline-block drop-shadow-bottomRight'>Log In</p></div>
        <div className='w-full relative z-[2] flex lg:justify-evenly md:justify-end justify-center lg:mr-0 sm:mr-6 mr-0 sm:p-0 p-4  items-center'>
            <div className='w-[350px] 1xl:relative absolute h-full flex items-end pb-8'>
            <div className='relative w-full'>
                <div className='flex w-full items-center'>
                <div className='sm:min-w-[22px] min-w-[16px] sm:h-[22px] h-[16px] bg-[#C7C7C7] rounded-full mr-[2px]'></div>
                <div className='sm:h-[2px] h-[1px] w-full bg-[#707070]'></div>
                <div className='sm:min-w-[22px] min-w-[16px] sm:h-[22px] h-[16px] bg-[#C7C7C7] rounded-full ml-[2px]'></div>
                </div>
                <div className='px-[24px] w-full h-full absolute top-0 left-0'>
                <div id='dockScroll' className='w-full relative h-full flex items-center'>
                    <div style={{color: localpallete[1].color}} id='modelScroll' className='sm:w-[54px] w-[35px] sm:h-[28px] h-[18px] bg-black rounded-full'></div>
                </div>
                </div>
            </div>
            </div>
            <div id="form-user" className='bg-[rgba(255,255,255,0.92)] relative z-10 rounded-[60px] sm:px-24 px-8 sm:w-auto w-full sm:max-w-none max-w-[500px]  ease-in-out duration-300 overflow-hidden'>
            <div className='duration-200'>
                <CheckUser click={click}/>
                <div className='sm:mt-[90px] mt-[70px] font-Poppins font-bold text-white flex w-full justify-end'>
                    <p className='p-[10px] px-12 bg-black rounded-full sm:text-[18px] text-[13px] cursor-pointer' onClick={()=> Next()} >Dalej</p>
                </div>
                <div className='flex sm:mt-[55px] mt-[40px] w-full justify-center mb-4'>
                    <p className='font-Poppins text-black sm:text-[19px] text-[13px] mr-2'>Jeśli nie masz konta</p>
                    <a onClick={()=> navigate('/signup')} className='font-Poppins text-black sm:text-[19px] text-[13px] font-bold cursor-pointer'>utwórz je</a>
                </div> 
            </div>
            </div>
            
        </div>
        </div>
        <div className='absolute z-[1] top-0 right-0 w-full h-full  contrast-75'>
        <Canvas>
            <Model rotation={[ 0, rotationX, 0]}/>
        </Canvas>
        </div>
    </div>
    )
  
}

export default User