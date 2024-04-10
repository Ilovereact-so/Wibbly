import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
import { debounce } from 'lodash';
import CreateCard from './CreateCard';
import EmptyCard from './EmptyCard';
import { Arrow } from '../../assets';
import { animate, cubicBezier, motion, stagger, useMotionValue, useTransform } from 'framer-motion';
import { decodeToken } from 'react-jwt';
import ProjectCard from './ProjectCard';

const Config = ({r}) => {
    const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
    const [isIndex, SetIndex] = useState()
    const scale_f = 12; // window height() / text font size
    const scale_p = 20; // window height() / text font size
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

    $(window).on('resize scroll', debounce(async () => {
      let winH = $(window).height()
      $('#text-firstInfo').css('font-size', winH / scale_f )
      $('#text-project').css('font-size', winH / scale_p )
    },100))
    $( document ).ready(function(){
      let winH = $(window).height()
      $('#text-firstInfo').css('font-size', winH / scale_f )
      $('#text-project').css('font-size', winH / scale_p )
    });


    var database_URL;
    if (process.env.NODE_ENV === 'production') {
      database_URL = "https://api.srv45036.seohost.com.pl/api/viewprojects"
    } else {
      database_URL = "http://localhost:3003/api/viewprojects"
    }

    const [isProject, setProject] = useState([])
    const array = [
      {
        color: "#9BCDD2",
        number: 5
      },
      {
        color: "#FF8551"
      },
      {
        color: "#FFDEDE"
      },
      {
        color: "#FAF0E4"
      },
    ];

    const emptyPrj = {
      "name": "Empty",
      "type": "Empty", 
    }
    const createPrj = {
        "name": "Create",
        "type": "Create", 
      }
    
    const startPrj = [
      emptyPrj,
      {
        "name": "Create",
        "type": "Create", 
      },
      emptyPrj
    ]
    
    const translate = (res) => {

      var dd = [decodeToken(res[0]?.project)]
      for (let index = 1; index < res.length; index++) {
        dd = dd.concat(decodeToken(res[index]?.project))
      }

      if(dd.length >= 3){
        dd = dd.concat(createPrj)
        setProject(dd)
        // setTimeout(()=>{
        //   for (let index = 0; index < isProject.length-1; index++) {
        //     SetIndex(index)
        //   }
        //   console.log(isIndex)
        // },3000)
        
        
      }else if(dd.length < 3 || dd.length !== 0){
        for (let index = 0; index < 3-dd.length; index++) {
          dd = dd.concat(emptyPrj)
        }
        dd = dd.concat(createPrj)
        setProject(dd)
      }else{
        setProject(startPrj)
      }

      return dd
    }

    // console.log(isProject)
    // console.log(array)
    
  
    const send = JSON.stringify({access_token: localStorage.getItem('at')})
    
    const projectView = () => {
      $.ajax({
        url:database_URL,
        type:"POST",
        data: send,
        crossDomain: true,
        headers: {
          "accept": "application/json",
          "Access-Control-Allow-Origin":"*"
        },
        xhrFields: {cors: false},
        contentType:"application/json; charset=utf-8",
        dataType:"json",
      }).then((res)=>{

        translate(res)
      })
    }


    
    const handleClick = () => {
      if(isProject.length === 0){
        projectView()
      }else{
        if(isIndex == isProject.length-1){
          SetIndex(0)
        }else{       
          SetIndex(isIndex + 1)
          //SetIndex(isProject.length)  
        }
      }
      
      //console.log(isIndex)
      //return true
    }
      
    const DefaultCard = ({index, item})=>{
      
      const Card = useRef(null)

      const xRange = [560,280,0]
      const x = (
        [0,1],
        [xRange[2],xRange[1]]
      )
      const ox = (
        [0,1],
        [xRange[1],xRange[0]]
      )
      const cScale = (
        [0,1],
        [1.2,1]
      )
      const oOpacity = (
        [0,1],
        [0,1]
      )

    const off = () => {
      // 6 >= 8-2                       0 <=  -8 + (6 + 2)
      // 7 >= 8-2                      1 <=  -8 + (7 + 2) 
      //                              2 !<=  -8 + (6+2)  \
      //move()
      // 7 == 8-1                      0 <= -8 + (7+1) 
      if(isIndex >= isProject.length-2 && index <= -isProject.length + (isIndex + 2) ){
        // 7 >= 8-1                      1 >= -8 + (7+2)
        //                               0 >= -8 + (7+2)
        // 6 >= 8-1
        if(isIndex >= isProject.length-2 && index >= -isProject.length + (isIndex + 2)){
          return 1
        }
      }else{
        if(isIndex + 2 < index || isIndex - 1 > index){
          return 0
        }else if(index == isIndex + 2){
          return 1
        }
      }
    }
        
    useEffect(()=>{
      //console.log(Card.current)
      //animate(Card.current, { rotate: index === (isIndex + 1) ? 180 : 0 }, { duration: 1});
      if(isIndex == null){
        for (let index = 0; index < isProject.length-1; index++) {
          SetIndex(index)
        }
        console.log(isIndex)
      }
      if(index == isIndex + 1 || (isIndex == isProject.length-1 && index <= -isProject.length + (isIndex + 1))){
        //setPos("110%")
        //setPos(xRange[1])
        animate(Card.current, {x, scale: 1.2} , { duration: 0.8, type: "keyframes",})
        //animate(Card.current, {scale: 1.20} , { duration: 0.8, delay: stagger(0.1),})
      }
      if(index == isIndex){
        //setPos("220%")
        //setPos(xRange[0])
        animate(Card.current, {x:ox, scale: cScale} , { duration: 0.8, type: "keyframes", ease:"easeOut"})
        //animate(Card.current, {scale: 1} , { duration: 0.8, type: "decay",})
      }else if(index == isIndex - 1){
        //animate(Card.current, {x: xRange[0]} , { duration: 0.8, type: "spring",})
        $(Card.current).css(`transform`,`translateX(${xRange[0]+20}px)`)
        animate(Card.current, {opacity: 0} , { duration: 0.5, type: "spring", ease: "easeOut"})
        animate(Card.current, {display: "none"} , { delay:'0.6'})
      }
      const current = off()

      if(current === 0){
        $(Card.current).css(`display`,`none`)
      }
      else if(current === 1){
        animate(Card.current, {opacity: oOpacity} , { duration: 1, type: "keyframes", ease: "easeIn"})
      }
      //console.log(current)
    })
    if(item?.type == "Empty"){
      //console.log("niga1")
      return(
        <EmptyCard item = {item} index = {index} refCard = {Card} isIndex={isIndex}/>
      )

    }else if(item?.type == "Create"){
      //console.log("niga2")
      return(
        <CreateCard item = {item} index = {index} refCard = {Card} isIndex={isIndex}/>
      )
    }else if(item?.type == "Default"){
      //console.log(item?.type)
      return(
        <ProjectCard item = {item} index = {index} refCard = {Card} isIndex={isIndex}/>
      )
    }
    
  }

  return (
    <div ref={r}  className="w-full min-h-[100vh] h-auto grid pl-6 pr-10 py-11 relative z-[2]">
        <div id='content-blur' className=' bg-[rgb(236,236,236,0.56)] rounded-3xl w-full h-full flex flex-col justify-between 01xl:pl-28 01xl:pr-8 pl-16 pr-12'>
            <div className='w-full flex justify-between h-full'>
              <div className='mt-[70px] h-auto w-full'>
                <div className='flex '>
                  <div style={{backgroundColor: localpallete[0].color}} onClick={()=> projectView()} className={`font-Poppins cursor-pointer text-[16px] px-5 py-2 text-white rounded-2xl my-4 mx-2 inline-block`}>Stwórz projekt</div>
                  <div style={{backgroundColor: localpallete[0].color}} className={`font-Poppins text-[16px] px-5 py-2 opacity-[0.6] text-white rounded-2xl my-4 mx-2`}>Importuj projekt</div>
                </div>
                <div className='flex items-center mt-16 w-full'>
                  <div className='flex w-full relative z-[3] h-[320px] ml-12'>
                    {isProject.map((item, index)=>(
                      <DefaultCard index={index} item={item} />
                    ))}
                  </div>
                  <div onClick={()=> handleClick()} className='bg-black select-none rounded-[24px] inline-flex justify-center items-center min-w-[60px] min-h-[60px] ml-16 cursor-pointer'><img src={Arrow} className='invert rotate-180'/></div>
                </div>
                
                <div className='w-full relative top-[-100px] pl-10 translate-x-[-40px]'>
                  <div className='bg-white w-[200px] h-[260px] bottom-0 right-0 absolute translate-x-[100%] rounded-br-[35px]'></div>
                  <div className='bg-white w-full h-[400px] rounded-bl-[35px] rounded-tr-[30px]'>

                  </div>
                </div>
              </div>
              <div className='h-auto mt-[70px]'>
                <div className='font-Poppins font-bold text-black w-auto relative z-[2] flex justify-center items-start'>
                  <p id='text-project' className='inline-block font-normal'>projekt</p>
                  <p id='text-firstInfo' className='rotate--180 inline-block drop-shadow-bottomRight'>Twój pierwszy</p>                
                </div>
              </div>
            </div>
            
        </div>
    </div>
  )
}

export default Config