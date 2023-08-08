import React, { Suspense, useEffect, useState } from 'react'
import $ from 'jquery'
import { Canvas } from '@react-three/fiber'
import { Model } from '../3D/Character';
import { OrbitControls } from '@react-three/drei';
import Logo from './Logo';
import {useNavigate } from 'react-router-dom';

const User = () => {
  const scale = 3.272727272727273; // window height() / text font size
  const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
  const [rotationX, setRotationX] = useState(0)
  const rotationS = -38.216560509554140127388535031847 // scale from rotation 3d object max rotation is -6.28
  const navigate = useNavigate()
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

    $(window).on('resize scroll', function() {
      let winH = $(window).height()
      $('#text-login').css('font-size', winH / scale )
    })
    $( document ).ready(function(){
      let winH = $(window).height()
      $('#text-login').css('font-size', winH / scale )
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
    <div className='h-[100vh] bg-[#F6F7F8]'>
      <div className='flex'>
        <div id='text-login' className='font-Poppins font-bold text-[#363636] h-full w-auto relative z-[2] flex justify-center items-center'><p className='rotate-180 inline-block drop-shadow-bottomRight'>Log In</p></div>
        <div className='w-full relative z-[2] flex justify-evenly items-center'>
          <div className='w-[350px] h-full flex items-end pb-8'>
            <div className='relative w-full'>
              <div className='flex w-full items-center'>
                <div className='min-w-[22px] h-[22px] bg-[#C7C7C7] rounded-full mr-[2px]'></div>
                <div className='h-[2px] w-full bg-[#707070]'></div>
                <div className='min-w-[22px] h-[22px] bg-[#C7C7C7] rounded-full ml-[2px]'></div>
              </div>
              <div className='px-[24px] w-full h-full absolute top-0 left-0'>
                <div id='dockScroll' className='w-full relative h-full flex items-center'>
                  <div style={{color: localpallete[1].color}} id='modelScroll' className='w-[54px] h-[28px] bg-black rounded-full'></div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-[rgba(255,255,255,0.92)] rounded-[60px] px-24'>
            <div className='flex flex-col items-center'>
              <div onClick={()=> navigate("/")} className='scale-[0.33] h-[130px] cursor-pointer'>
                <Logo loaded={true}/>
              </div>
              <p style={{color: localpallete[1].color}} className='font-Poppins relative font-bold text-[35px] mx-[130px] mb-8'>Log in</p>
            </div>
            <p className='font-Poppins font-bold text-black text-[22px]'>Wpisz</p>
            <p className='font-Poppins text-black text-[19px] mb-6'>nazwe użytkownika lub email</p>
            <div className='h-[70px] mb-4'>
              <input className='w-full h-full rounded-full text-[16px] p-4 font-Poppins bg-[#F2F2F2]'/>
            </div>
            <p style={{color: localpallete[1].color}} className='font-Poppins font-bold text-[15px]'>nie pamiętasz ?</p>
            <div className='mt-[90px] font-Poppins font-bold text-white flex w-full justify-end'>
              <p className='p-[10px] px-12 bg-black rounded-full text-[18px]'>Dalej</p>
            </div>
            <div className='flex mt-[55px] w-full justify-center mb-4'>
              <p className='font-Poppins text-black text-[19px] mr-2'>Jeśli nie masz konta</p>
              <a className='font-Poppins text-black text-[19px] font-bold'>utwórz je</a>
            </div> 
          </div>
          
        </div>
      </div>
      <div className='absolute z-[1] top-0 right-0 w-full h-full scale-[0.9] contrast-75'>
        <Canvas>
          <Model rotation={[ 0, rotationX, 0]}/>
        </Canvas>
      </div>
    </div>
  )
}

export default User