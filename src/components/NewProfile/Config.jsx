import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
import { debounce, toString } from 'lodash';
import CreateCard from './CreateCard';
import EmptyCard from './EmptyCard';
import { Arrow } from '../../assets';
import { animate, useMotionValueEvent, motion, useScroll , useTransform } from 'framer-motion';
import { decodeToken } from 'react-jwt';
import ProjectCard from './ProjectCard';

const Config = ({r}) => {
    const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
    const [isIndex, SetIndex] = useState()
    const [isProject, setProject] = useState([])
    const [isScale, setScale] = useState(1)
    const [oldWinSize, setWinSize] = useState(1920)

    const scale_f = 12; // window height() / text font size
    const scale_p = 20; // window height() / text font size


  const WindowRes = ()=>{
    var winW = $(window).width()
    var winH = $(window).height()
    // var widthR = 1920
    // var heightR = 1080
    var pointR = winW / winH
    //console.log(pointR)
    return pointR
  }
  

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
      var winW = $(window).width()
      if(winW >= 768){
        let winH = $(window).height()
        $('#text-firstInfo').css('font-size', winH / scale_f )
        $('#text-project').css('font-size', winH / scale_p )
      }else{
        $('#text-firstInfo').css('font-size', "" )
        $('#text-project').css('font-size', "")
      }

    },100))
    $( document ).ready(function(){
      var winW = $(window).width()
      if(winW >= 768){
        let winH = $(window).height()
        $('#text-firstInfo').css('font-size', winH / scale_f )
        $('#text-project').css('font-size', winH / scale_p )
      }
    });
    

    const CardContainerSize = ()=>{
      let winW = $(window).width()
      if(oldWinSize !== winW){
        setScale(winW * 0.00052)
        setWinSize(winW)
        //console.log(isScale)
      }
      return isScale
    }


    var database_URL;
    if (process.env.NODE_ENV === 'production') {
      database_URL = "https://api.srv45036.seohost.com.pl/api/viewprojects"
    } else {
      database_URL = "http://localhost:3003/api/viewprojects"
    }

    const min = 0.1;
    const max = 0.8;
    const { scrollYProgress } = useScroll({
      target: r,
      offset: ["start end", "end start"],
    });
  
    const ProjectLoad = useTransform(scrollYProgress,  (pos) => {
      return pos > min ? 1 : 0; 
    })

    useMotionValueEvent(ProjectLoad, "change", () => {
      if(ProjectLoad.get() === 1 && isProject.length === 0){
        projectView()
      }
    })

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
      }
    ];

    const emptyPrj = {
      "name": "Empty",
      "type": "Empty"
    }
    const createPrj = {
        "name": "Create",
        "type": "Create"
      }
    
    const startPrj = [
      emptyPrj,
      emptyPrj,
      {
        "name": "Create",
        "type": "Create", 
      }
    ]
    
    const translate = (res) => {
      var dd = []
      if(res !== false){
        dd = [decodeToken(res[0]?.project)]
      }
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
        
        
      }else if(dd.length < 3 && dd.length !== 0){
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
        console.log(res)
        translate(res)
      })
      .catch((err)=>{
        console.log(err)
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
      //const NNN = document.getElementById('niga')
      const Card = useRef(null)
      //NNN.offsetLeft
      
      const xRange = [560,280,0]
      const x = (
        [0,1],
        [xRange[2],xRange[1]]
      )
      const ox = (
        [0,1],
        [xRange[1],xRange[0]]
      )
      const outx = (
        [0,1],
        [xRange[0],xRange[0]+100]
      )
      const cScale = (
        [0,1],
        [1.2,1]
      )
      const Opacity = (
        [0,1],
        [1,0]
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
        for (let index = 0; index < isProject.length-1; index+=1) {
          SetIndex(index)
        }
        //console.log(isIndex)
      }
      if(index == isIndex + 1 || (isIndex == isProject.length-1 && index <= -isProject.length + (isIndex + 1))){
        //setPos("110%")
        //setPos(xRange[1])

        animate(Card.current, {x, scale: 1.2} , { duration: 0.8, type: "keyframes"})
        //animate(Card.current, {scale: 1.20} , { duration: 0.8, delay: stagger(0.1),})
      }
      if(index == isIndex){
        //setPos("220%")
        //setPos(xRange[0])

        animate(Card.current, {x:ox, scale: cScale} , { duration: 0.8, type: "keyframes", ease:"easeOut"})
        //animate(Card.current, {scale: 1} , { duration: 0.8, type: "decay",})
      }else if(index == isIndex - 1 && isProject.length > 3){
        //animate(Card.current, {x: xRange[0]} , { duration: 0.8, type: "spring",})
        $(Card.current).css(`transform`,`translateX(${xRange[0]+100}px)`)
        animate(Card.current, {x:outx, opacity:Opacity} , { duration: 0.5, type: "keyframes" ,ease: "easeOut"})
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
        <EmptyCard item = {item} index = {index} refCard = {Card} isIndex={isIndex} ProjectL={isProject.length} offCard={off()} />
      )

    }else if(item?.type == "Create"){
      //console.log("niga2")
      return(
        <CreateCard item = {item} index = {index} refCard = {Card} isIndex={isIndex} ProjectL={isProject.length} offCard={off()} />
      )
    }else if(item?.type == "Default"){
      //console.log(item?.type)
      return(
        <ProjectCard item = {item} index = {index} refCard = {Card} isIndex={isIndex} ProjectL={isProject.length} offCard={off()} />
      )
    }
    
  }
  
  const first_divcards_config = useRef()
  const second_divcards_config = useRef()
  const first_p_config = useRef()

  
  const refTab = [first_divcards_config, second_divcards_config, first_p_config]

  const Pull = (ref, type)=> {
    const { scrollYProgress } = useScroll({
        offset: ["end end", "end start"],
        target: ref
    });
    
    const x = useTransform(scrollYProgress,  (pos) => {
          if(type == "classic"){
            if($(window).width() > 1160){
              return pos >= 0.6 && pos <= 0.8 ? 100 : 1; 
            }else{
              return pos >= 0.6 && pos <= 0.8 ? 30 : 1; 
            }
          }else if(type == "little" ){
            return pos >= 0.4 ? 60 : 1; 
          }
        })
        return x
    }
  return (
    <div className='md:h-auto h-full w-full md:overflow-visible overflow-auto relativ'>
    <div style={ WindowRes() < 1 && oldWinSize >= 768 ? {minHeight: "1080px"} : {minHeight:"100vh"}} ref={r} className="w-full min-h-[100vh] h-auto grid ss:pl-6 md:pr-10 ss:pr-6 pr-2 pl-2 py-11 relative z-[2]">
        <div id='content-blur' className=' bg-[rgb(236,236,236,0.56)] md:rounded-3xl rounded-[34px] w-full h-full flex flex-col justify-between 01xl:pl-28 01xl:pr-8 md:pl-16 pl-5 md:pr-12 pr-4 overflow-x-hidden'>
            <div className='w-full flex justify-between h-full'>
              <div className='mt-[20px] h-auto w-full flex flex-col justify-between'>
                <motion.div style={{x: Pull(refTab[0], "classic")}} ref={refTab[0]}  className='flex ease-in-out a2:flex-row flex-col duration-300'>
                  <div style={{backgroundColor: localpallete[0].color}} onClick={()=> projectView()} className={`font-Poppins cursor-pointer 01ss:text-[16px] text-[12px] px-5 py-2 text-white rounded-2xl my-4 01ss:mx-2 mx-[3px] inline-block a1:w-auto w-min`}>Stwórz projekt</div>
                  <div style={{backgroundColor: localpallete[0].color}} className={`font-Poppins 01ss:text-[16px] text-[12px] px-5 py-2 opacity-[0.6] text-white rounded-2xl a2:my-4 my-1 01ss:mx-2 mx-[3px] a1:w-auto w-min`}>Importuj projekt</div>
                </motion.div>
                <div className='flex items-center mt-16 w-full'>
                  <motion.div style={oldWinSize >= 768 ? {scale: CardContainerSize().toString()} : {}} className='flex w-full relative z-[3] h-[320px] lg:ml-12 ml-5 ss:origin-left origin-top-left md:left-0 ss:left-[-190px] left-[-130px] md:scale-100 ss:scale-[0.7] scale-[0.5] '>
                    {isProject.map((item, index)=>(
                      <DefaultCard index={index} item={item} />
                    ))}
                  </motion.div>
                  <div onClick={()=> handleClick()} className='bg-black select-none lg:rounded-[24px] ss:rounded-[20px] rounded-[15px] inline-flex justify-center items-center lg:min-w-[60px] ss:min-w-[50px] min-w-[38px] lg:min-h-[60px] ss:min-h-[50px] min-h-[38px] ml-16 3xl:translate-x-0 translate-x-10 z-[4] cursor-pointer ss:translate-y-0 translate-y-[-80px]'><img src={Arrow} className='invert rotate-180 ss:scale-75 scale-[0.6] '/></div>
                </div>
                
                <div className='w-full relative md:pl-14 pl-0 translate-x-[-60px] md:mb-4 mb-0 ss:mt-0 mt-7'>
                  <div className='mainOI bottom-0 a1:right-[0px] right-[-100px] absolute translate-x-[100%] rounded-br-[35px] w-[200px] h-[400px]'>
                    <div className="out">
                      <div className="in"></div>
                    </div>
                  </div>
                  <div id='white-container' className='bg-white opacity-60 w-full h-[300px] rounded-bl-[35px] relative'>
                  </div>
                  {/** <div className='absolute bg-white opacity-60 w-[400px] h-[400px] right-0'></div>*/}
                  {/**Text Section */}
                  <div className='absolute top-0 left-[60px] w-full h-full flex items-end pb-12 '>
                    {/**List */}
                    <ol className='lx:mx-8 mx-5 text-[#D1D1D1] font-Poppins xl:text-[12px] text-[10px] 01ss:block hidden'>
                      <motion.li style={{x: Pull(refTab[1], "classic")}} ref={refTab[1]} className='xl:mb-[120px] 2xl:mb-[100px] mb-[150px]  duration-300 ease-in-out'>#Jak zaczać</motion.li>
                      <motion.li style={{x: Pull(refTab[2], "classic")}} ref={refTab[2]} className='duration-300 ease-in-out' >#Jak działa konfigurator</motion.li>

                    </ol>
                    {/**Text Container */}
                    <div className='font-Poppins text-[15px] text-black flex flex-col'>
                      <motion.div style={{x: Pull(refTab[1], "classic")}} ref={refTab[1]} className='flex items-center duration-300 ease-in-out'>
                        <p className='leading-[33px] xl:leading-[1px] xl:text-[15px] text-[13px] a1:w-auto ss:w-[300px] w-auto'>
                          Wybierz
                          <span style={{backgroundColor: localpallete[3].color}} className='rounded-full xl:text-[17px] text-[13px] text-white mx-2 py-3 xl:px-6 px-4 font-bold scale-75'>Create</span>
                          by utworzyć kompozycje.
                        </p>
                      </motion.div>
                      <motion.div style={{x: Pull(refTab[2], "classic")}} ref={refTab[2]} className='mt-12 duration-300 ease-in-out xl:w-auto 01ss::w-[400px] w-auto xl:text-[15px] text-[13px]'>
                        <p className='font-bold text-[30px] mb-2'>Po co?</p>
                        <p>
                          Korzystając z kompozycji projektu jestes w stanie lepiej określić swoje wymagania odnośnie strony
                          zlecanej developerom. Dzięki temu wiemy czego tak naprawde oczekujesz spod naszej ręki.
                        </p>
                        
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='h-auto mt-[30px]'>
                <div className='font-Poppins font-bold text-black w-auto relative z-[10] flex justify-center items-start'>
                  <p id='text-project' className='inline-block font-normal 01ss:text-[22px] text-[16px]'>projekt</p>
                  <p id='text-firstInfo' className='rotate--180 inline-block drop-shadow-bottomRight 01ss:text-[40px] text-[29px]'>Twój pierwszy</p>                
                </div>
              </div>
            </div>
            
        </div>
    </div>
    </div>
  )
}

export default Config