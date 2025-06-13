import { useEffect, useState } from "react";
import "./App.css";
import React, { Suspense, lazy } from "react";
import { usePallete } from "./Context/PalleteContext.js";
import { delay, motion } from "framer-motion";
import Logo from "./components/Logo";
import Home from "./components/Home.js"

// Lazy load komponentu Home, z opóźnieniem zależnym od zakończenia animacji

function createDeferred() {
  let resolve;
  const promise = new Promise((res) => (resolve = res));
  return { promise, resolve };
}

const deferred = createDeferred();

const HomeLazy = lazy(() =>
  Promise.all([
    import("./components/Home"),
    deferred.promise, // Czeka na zakończenie animacji
  ]).then(([module]) => module)
);

function App({ userState }) {
  const [animationType, setAnimationType] = useState(null);
  const [isReady, setReady] = useState(false)
  //const [Home, setHome] = useState(null);

  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation");
    const navType = navigationEntries[0]?.type;

    if (navType === "reload" &&  sessionStorage.getItem("visited")) {
      //setAnimationType("loading-screen")
      setAnimationType("refresh-animation"); // Odświeżenie strony
      console.log("refresh_anim")
    } else if (!sessionStorage.getItem("visited")) {
      setAnimationType("loading-screen"); // Pierwsza wizyta
      console.log("lodaing_anim")
    }
    //import("./components/Home").then((mod) => setHome(() => mod.default));
  }, []);

  // Pełny ekran ładowania (tylko dla pierwszego wejścia)
  const LoadingScreen = ({ onComplete }) => {
    const { Pallete } = usePallete();

    function hexToRgba(hex, alpha = 1) {
      hex = hex.replace(/^#/, "");
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    return (
      <div className="w-full h-[100vh] flex flex-col bg-[#F2F2F2] justify-end overflow-hidden">
        <div style={{ backgroundColor: hexToRgba(Pallete[1], 0.96) }} className="rounded-[80%] 01xl:h-[600px] h-[400px] relative 01xl:top-[300px] top-[200px] z-10 backdrop-invert-[1]">
          
          <div className="text-[16px] font-Poppins font-bold text-black w-full text-center absolute top-[50%] translate-y-[-100%] flex flex-col items-center justify-center">
            <div className="mb-16 rounded-[20px]  flex justify-center items-center">
              <div style={{borderColor: "#414141" , borderTopColor:"transparent"}} className="mm:w-12 w-10 mm:h-12 h-10 border-4 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="font-Poppins font-normal text-[15px]">Wibbly</p>
            <p className="flex mb-4">
              Loading.
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  type: "keyframes",
                  duration: 1,
                  repeatDelay: 0.5,
                  repeat: Infinity,
                }}
              >
                .
              </motion.p>
            </p>
          </div>
        </div>

        <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] flex justify-center items-center">
          <p className="font-Poppins text-[clamp(60px,15vw,300px)]">Wibbly</p>
          <div className="flex justify-center items-center relative 01xl:scale-[0.4] 1ll:scale-[0.3] mm:scale-[0.2] scale-[0.1] origin-center 3xl:top-20 01xl:top-16 mm:top-10 ss:top-6 top-4 01xl:w-[145px] 1ll:w-[110px] mm:w-[80px] w-[36px]">
            <Logo onAnimationEnd={onComplete} />
          </div>
        </div>
        <div className=" absolute top-4 left-5 text-black font-Poppins">
            <h1 className="font-bold mm::text-[20px] text-[17px]">Coming soon...</h1>
            <p className="mm:text-[16px] text-[14px]">Strona wkrótce będzie dostępna. Trwają ostatnie prace przed uruchomieniem.</p>
        </div>
      </div>
    );
  };
  const {Pallete} = usePallete()
  // Overlay przy odświeżeniu strony
  const RefreshOverlay = () => (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 , display:"None"}}
      transition={{ duration: 0.8, delay:1,  display:{ delay:1.8 }}}
      className="fixed top-0 left-0 w-full h-full flex items-end justify-end z-20 bg-[#adadad73]"
    >
      <div className="mb-8 mr-8 px-14 py-6 rounded-[20px]  flex justify-center items-center">
        <div style={{borderColor: Pallete[0], borderTopColor:"transparent"}} className=" w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>

      </div>
    </motion.div>
  );

  // Funkcja, która ustawia stan "animacji zakończona" i ładuje Home
  const handleAnimationEnd = () => {
    deferred.resolve()
    sessionStorage.setItem("visited", "true");
  };

  return (
    <>
      {/* Refresh overlay tylko przy odświeżeniu */}
      {/** 
      {animationType === "refresh-animation" && <RefreshOverlay />}

      {animationType === "loading-screen" ? (
        <Suspense
          fallback={<LoadingScreen onComplete={handleAnimationEnd} />}
        >
          <HomeLazy userState={userState} />
        </Suspense>
      ) : (
          null
        
      )}
      {animationType === "refresh-animation" && <Home userState={userState} />}
      */}
      <LoadingScreen onComplete={handleAnimationEnd}/>
      
      
    </>
  );
}

export default App;
