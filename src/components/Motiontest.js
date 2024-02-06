//import "../styles.css";
import React, { useRef, useState } from "react";
import { motion, useTransform, useScroll, use, frame, useAnimation } from "framer-motion";
import { Input } from "./Inputtest";
import $ from "jquery"


export default function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);
 
  const controls = useAnimation();
  const { scrollY, scrollYProgress } = useScroll();

  // Obrót proporcjonalny do postępu scrolla
  const rotation = scrollY.get() * 360;

  // Aktualizacja animacji przy zmianie wartości scrolla
  React.useEffect(() => {
    controls.start({ rotate: rotation });
  }, [controls, rotation]);
  
  
  
//   $(window).on('scroll', function() {

//     var scroll = $(window).scrollTop(); 
//     var max_scroll = $(window).height()
//     const startDeg = 30 //choose strart position
//     var oneDeg = max_scroll / 360 //degree
//     var deg = scroll / oneDeg + startDeg
//     //var antyDeg = 360 - deg   
//     setRotate(deg)
// });


  return (
    <div className="w-[100vw] h-[200vh] flex items-center justify-center flex-col">
        <div className="h-[100vh] w-full flex justify-center items-center">
            <div>
                <motion.div
                className="box"
                animate={controls}
                transition={{ type: "spring" }}
                />
            </div>
            <div className="inputs">
                <Input value={x} set={setX}>
                x
                </Input>
                <Input value={y} set={setY}>
                y
                </Input>
                <Input value={rotate} set={setRotate} min={-180} max={180}>
                rotate
                </Input>
            </div>
        </div>
        <div className="h-[100vh] w-full">

        </div>
    </div>
  );
}
