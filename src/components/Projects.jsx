import { ChevronDown, Heart } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import Chart from "react-apexcharts";
import { useScroll, useTransform, motion, animate, useInView, color } from 'framer-motion'
import $ from 'jquery'
import { LetterList } from '../constants';
import { usePallete } from '../Context/PalleteContext';

const Projects = () => {
    const RefProject = useRef()
    const { scrollYProgress } = useScroll({
        target: RefProject,
        offset: ["start end", "end start"],
    });
    const {Pallete} = usePallete() 
    const y = useTransform(scrollYProgress,  (pos) => {
        return pos > 0.1 ? -70 : 50 ; 
    })
    const opacity = useTransform(scrollYProgress,  (pos) => {

        return pos > 0.1 ? 1 : 0 ; 
    })
    const listOpacity = useTransform(scrollYProgress,  (pos) => {

      return pos > 0.15 ? 0.2 : 1 ; 
    })
    const listHeight = useTransform(scrollYProgress,  (pos) => {

      return pos > 0.15 ? 0 : 100 ; 
    })
    const marginTop = useTransform(scrollYProgress,  (pos) => {

      return pos > 0.15 ? 0 : 24 ; 
    })
    const marginBottom = useTransform(scrollYProgress,  (pos) => {

      return pos > 0.15 ? 0 : 54 ; 
    })
    const display = useTransform(scrollYProgress,  (pos) => {

      return pos > 0.4 ? "none" : "flex" ; 
    })
    
    const postDisplay = useTransform(scrollYProgress,  (pos) => {
      
      return pos < 0.53? "none" : "flex" ; 
    })
    
    const PostOpacity = useTransform(scrollYProgress,  (pos) => {
      
      return pos < 0.6? 0 : 1 ; 
    })
    const opacityGraph = useTransform(scrollYProgress,  (pos) => {

      return pos > 0.4 ? 0 : 1 ; 
    })
    const graphScale= useTransform(
      scrollYProgress,
      [0.5, 0.58],
      [1,  4]
    );
    const graphX= useTransform(
      scrollYProgress,
      [0.5, 0.58],
      [0,  -(window.innerWidth/2)]
    );
    const textWidthrepost= useTransform(
      scrollYProgress,
      [0.54, 0.62],
      [0,  window.innerWidth-200]
    );
    
    const textAnimCenter= useTransform(
      scrollYProgress,
      [0.2, 0.4],
      [-300,  0]
    );

    
    // const Textwidth = (pos)=>{
    //   //let dp = document.getElementById("postText").style.display
    //   let totalWidth = 0;

    //   $("#postText").children().each(function() {
    //       totalWidth += $(this).outerWidth(true); // `true` uwzględnia marginesy
    //   }); //pos?.current > 0.54 ?  document.getElementById("postText").offsetWidth : 0
    //   console.log(totalWidth, pos.current)
    //   return totalWidth//width + ((window.innerWidth / 2)/4 - 20) // 4 to scale a -200 to margin right
    // }
    
    const [isTextW, setTextW] = useState(0)
    $(function () {
        const targetElement = $("#postText")[0]; // Pobieramy surowy element DOM
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.attributeName === "style") {
                    let displayValue = $(targetElement).css("display");
    
                    if (displayValue === "flex") {
                      setTextW($(targetElement).innerWidth() + ((window.innerWidth / 2)/4 - 20)) // 4 to scale a -200 to margin right
                    }
                }
            });
        });
    
        // Konfiguracja observera: śledzimy zmiany w atrybutach (w tym stylach)
        observer.observe(targetElement, { attributes: true, attributeFilter: ["style"] });
    
        // Opcjonalnie: zatrzymanie observera po wykryciu zmiany
        // observer.disconnect();
    });


    const textAnimWidth= useTransform(
      scrollYProgress,
      [0.2, 0.4, 0.56,0.7],
      [900,  0, 0, isTextW]
    );
    
    const graphAnimCenter= useTransform(
      scrollYProgress,
      [0.2, 0.4],
      [-300,  0]
    );
    const yContainer = useTransform(
      scrollYProgress,
      [0.42, 0.48],
      [0,  -(window.innerHeight/2-126.5)]
    );
    const roundedHeight = useTransform(
      scrollYProgress,
      [0.42, 0.48, 0.52],
      [0,  800, window.innerHeight * 1.2]
    );
    const backgroundColor = useTransform(
      scrollYProgress,
      [0.42, 0.48],
      [`bg-[rgba(11,11,11,0)]`,  '#0b0b0b']
    );

    const lineWidth = useTransform(scrollYProgress,  (pos) => {

      return 0.52 > pos > 0.42 ? window.innerWidth*1.2 : window.innerWidth-(80+200) ; 
    })
    const containerMargin = useTransform(scrollYProgress,  (pos) => {

      return pos > 0.42 ? 0 : "0 40px" ; 
    })
    const containerRadius = useTransform(scrollYProgress,  (pos) => {

      return pos > 0.42 ? 0 : 100 ; 
    })
    
    const TextlineWidth = useTransform(scrollYProgress,  (pos) => {

      return pos > 0.62 ? 5 : 0 ; 
    })
    
    const PostBackgroundColor = useTransform(scrollYProgress,  (pos) => {

      return pos > 0.57 ? "#6f6868" : '' ; 
    })
    // const letter_absolute = useTransform(scrollYProgress,  (pos) => {
    //   if(pos > 0.60){
    //     //console.dir($('#letter_0')[0].offsetParent.offsetLeft)
    //     console.log(($('#letter_0')[0].offsetLeft * 4 ) + ($('#letter_0')[0].offsetParent.offsetLeft * 4), window.outerWidth)
    //   }
    //   return ($('#letter_0')[0].offsetLeft * 4 ) + ($('#letter_0')[0].offsetParent.offsetLeft * 4) > window.outerWidth ? "absolute" : "static" ; 
    // })


    const options = {
      chart: {
        type: "radialBar",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
        },
        events: {
          mounted: (chart) => {
            chartInstance.current = chart;
          },
        },
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "40%",
          },
          track: {
            background: "#494949",
            strokeWidth: "100%",
          },
          dataLabels: {
            show: true,
          },
          barWidth:[5, 10, 15, 20]
        },
      },
      colors: Pallete,
      labels: ["Apple", "Microsoft", "Google", "Amazon"],
      legend: {
        position: "right",
      },
    };
    const [series, setSeries] = useState([35, 45, 55, 75]);
    const chartRef = useRef(null);
    const inView = useInView(chartRef, { triggerOnce: true, margin: "-250px" });
    const chartInstance = useRef(null);

    useEffect(() => {
      if (inView && chartInstance.current) {
        chartInstance.current.updateSeries([
          32, 44, 31, 41 // Zamiast dodawać nową serię, aktualizujemy istniejącą
        ], true);
      }
    }, [inView]);;

    const Letters = ({item, index}) =>{
      // const [isLeft, setLeft] = useState(false)
      const width = useTransform(scrollYProgress, (pos) => {
        const el = document.getElementById(item?.semiID);
        if (pos > 0.60 && el && el.offsetParent) {
          const left = el.offsetLeft * 4 + el.offsetParent.offsetLeft * 4;
          return left > window.innerWidth - 80 ? "auto" : 0;
        }
        console.log("0 - width")
        return 0;
      });

      return(
        <motion.p style={{width}} className='flex overflow-hidden'>{item.text}</motion.p>
      )
    }
    
  return (
    <motion.div style={{backgroundColor:backgroundColor}} id='projectsContainter' ref={RefProject} className='w-full h-[300vh] relative z-10'>
      <div className='sticky top-[600px]'>
          <motion.div style={{y, opacity}} className='duration-300 ease-in-out w-full flex justify-center items-center'>
              <div id='ProjectBTN' className='bg-[#0B0B0B] text-white w-[180px] h-[65px] rounded-full font-bold font-Poppins flex flex-col justify-center items-center'>
                  <p>Projekty w toku</p>
                  <div className='absolute top-0 left-[50%] translate-x-[-50%]'><ChevronDown/></div>
              </div>
          </motion.div>
          <motion.div style={{height:roundedHeight, width:lineWidth}} className='bg-[#0B0B0B] h-[1px] translate-y-[-50%] translate-x-[-50%] left-[50%] rounded-[70%] absolute top-[65px]  ease-in-out duration-300 transition-[width]'>
            <motion.div style={{display:postDisplay, opacity:PostOpacity}} className='text-white absolute top-0 right-0 font-Poppins flex flex-col items-end ease-in-out duration-500'>
              <h1 className='font-bold text-[20px]'>Projekty w toku</h1>
              <p className='text-[18px]'>dostępne aplikacje internetowe</p>
            </motion.div>
          </motion.div>
          <motion.div style={{margin:containerMargin, borderRadius:containerRadius}} className='bg-[#0b0b0b] font-Poppins p-10 flex justify-center py-11 h-full mx-[40px] rounded-[100px] ease-in-out duration-300'>
              {/** 
              <div className='flex flex-col'>
                  <h1 className='text-[30px] font-bold text-white mb-2'>Projekty w toku</h1>
                  <p className='text-[16px] text-white'>dostepne aplikacje internetowe</p>
              </div>
              
              
              */}

              <motion.div style={{y:yContainer, scale:graphScale, x:graphX}} className='flex justify-center'>
                <div className='flex relative'>
                        <motion.div ref={chartRef} style={{x:graphAnimCenter}} className='relative z-[1]'><Chart  options={options} series={series} type="radialBar" height={250} /></motion.div>
                </div>

                <motion.div style={{x:textAnimCenter, width:textAnimWidth}} className='flex left-[50%] text-white w-[900px] absolute z-[2] h-[250px] overflow-hidden whitespace-nowrap translate-x-[100%Z]'>
                    <div className='w-full h-full relative'>
                      <motion.div style={{}} className='w-auto absolute right-0 flex flex-col justify-center h-full'>
                        <motion.div style={{ display}} className='flex items-center relative '>
                            <h1  className='font-bold text-[32px] font-Poppins'>Terminarz z systemem ERP </h1>
                            <div className='bg-white text-black text-[15px] rounded-[30px] p-4 flex justify-center items-center font-bold ml-6'><Heart/></div>
                        </motion.div>
                        <motion.table style={{marginTop, marginBottom,display}} className='mt-6 text-[15px] ease-in-out duration-300 relative mb-14'>
                            
                            <tr>
                                <td >
                                    <motion.ul style={{opacity:listOpacity, height:listHeight}} className='ml-4 mr-6 list-disc ease-in-out duration-300 overflow-hidden max-h-[50px] pl-4'>
                                        <li className='text-[#494949]'>
                                            Fryzjerzy i kosmetolodzy
                                        </li>
                                        <li className='mt-1'>
                                            Mechanicy i serwisy samochodowe
                                        </li>
                                    </motion.ul>
                                </td>
                                <td>
                                    <motion.ul style={{opacity:listOpacity, height:listHeight}} className='ml-10 list-disc ease-in-out duration-300 overflow-hidden max-h-[50px] pl-4'>
                                        <li>
                                        Prawnicy i doradcy finansowi
                                        </li>
                                        <li className='mt-1'>
                                        Hotele i pensjonaty
                                        </li>
                                    </motion.ul>
                                </td>
                            </tr>
                        </motion.table>
                        <motion.div id='postText' style={{display:postDisplay}} className='text-[80px] font-SerifDM' >
                          {/*LetterList.map((item, index)=>(
                            <p id={"letter_"+index}>{item.text}</p>
                          ))*/}
                          <p>Zaufaj&nbsp;&nbsp;</p>
                          <p id="letter_0">t</p>
                          <p id="letter_1">e</p>
                          <p id="letter_2">c</p>
                          <p id="letter_3">h</p>
                          <p id="letter_4">n</p>
                          <p id="letter_5">o</p>
                          <p id="letter_6">l</p>
                          <p id="letter_7">o</p>
                          <p id="letter_8">g</p>
                          <p id="letter_9">i</p>
                          <p id="letter_10">i</p>
                          <p id="letter_11">.</p>
                        </motion.div>
                      </motion.div>
                    </div>
                </motion.div>
                
              </motion.div>
              <motion.div className='absolute z-20 font-SerifDM text-[30px] top-[60px] left-[60%] flex items-center' style={{display:postDisplay ,color:Pallete[0]}}>
                <motion.div style={{width:TextlineWidth}} animate={{opacity:[1,0,1]}} transition={{type:"keyframes",duration: 1.5, repeat: Infinity,repeatDelay:0.5}} className='h-[60px] bg-white mr-2'></motion.div>
                  {
                    LetterList.map((item,index)=>(
                      <Letters item={item} index={index}/>
                    ))
                  }
                </motion.div>
          </motion.div>
          
        </div>
    </motion.div>
  )
}

export default Projects