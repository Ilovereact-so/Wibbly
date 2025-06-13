import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState } from 'react'
import { Model6_Figurka } from '../../3D/Figurka6';
import { Pallete0, Pallete1, Pallete2, Pallete3, Pallete4, Pallete5, Pallets } from '../../constants';
import $, { type, when } from 'jquery'
import WsRequest from '../WsRequest';
import {motion} from 'framer-motion'
import { fetchWithAuth } from '../AuthRequest';
import { debounce } from 'lodash';
import { usePallete } from '../../Context/PalleteContext';
import { CirclePlus, X, Check } from 'lucide-react';

const Settings = ({r}) => {
    
    const {Pallete} = usePallete()
    const [width, setWidth] = useState($(window).width())
    //const [multiRef, addMultiRef] = useMultiRefs();

    useEffect(()=>{
        $(window).on('resize', debounce(async () => {
        setWidth($(window).width())
        },100))
    })
    

    const[isActualS, setActualS] = useState([])
    const[isDefaultS, setDefaultS] = useState([])
    
    const [isComponents, SetComponents] = useState([])

    

    const getSettings = async()=>{
        const AS = await WsRequest.getSettings()
        const DS = await WsRequest.getDSettings()
        setDefaultS(DS)
        setActualS(AS)
        //console.log(AS)
    
    }

    const handleUserState = (index)=> {
        //console.log(isActualS)
        if(isActualS !== null){
            const found = isActualS.find((set)=> set?.settings_id === index)
            //console.log(isActualS)
            if(found){
                return Boolean(found?.settings_value)
            }else{
                return Boolean(isDefaultS.find((set)=>set.id === index)?.default)
            }
        }else if (isActualS == null){
            //console.log(isDefaultS)
            return Boolean(isDefaultS.find((set)=>set.id === index)?.default)
        }
        // if(isActualS[index]?.settings_id === index){
        //     console.log(isActualS[index]?.settings_id, index)
        //     return isActualS[index]?.Settings_value
        // }else{
        //     console.log(isActualS[index]?.settings_id, index)
        //     return true
        // }
    }

    useEffect(()=>{
        getSettings()
    },[])

    useEffect(() => {
        // Funkcja, która otrzymuje dane "settingsView" i aktualizuje stan
        const updateSettings = (newSettings) => {
            //console.log(newSettings)
            console.log("newSET")
            if(isDefaultS.length > 0){
                setActualS(newSettings)
            }
        };

        // Subskrybuj aktualizacje
        const unsubscribe = WsRequest.subscribeToSettingsUpdates(updateSettings);

        // Rozłącz nasłuchiwacza przy odmontowywaniu komponentu
        return () => {
            unsubscribe();
        };
    }, [isDefaultS]);

    useEffect(() => {
        //console.log(isActualS); // Zostanie wywołane po aktualizacji isActualS
        if(isActualS === null){
            const comp = [{
                "span":"Auto Save",
                "text":" - Automatyczny zapis projektów w konfiguratorze",
                "mode": handleUserState,
                "id":1
            },
            {
                "span":"Gesty i chowane menu",
                "text":" - tylko w wersji mobilnej",
                "mode":handleUserState,
                "id":2
            },
            {
                "span":"Dark mode",
                "text":" - ciemny motyw na całej stronie",
                "mode":handleUserState,
                "id":3
            },
            {
                "span":"Samouczek",
                "text":" - pomocne instrukcje w sekcji projektu",
                "mode":handleUserState,
                "id":4
            }]

            SetComponents(comp)
        }else if(isActualS.length > 0){
            const comp = [{
                "span":"Auto Save",
                "text":" - Automatyczny zapis projektów w konfiguratorze",
                "mode": handleUserState,
                "id":1
            },
            {
                "span":"Gesty i chowane menu",
                "text":" - tylko w wersji mobilnej",
                "mode":handleUserState,
                "id":2
            },
            {
                "span":"Dark mode",
                "text":" - ciemny motyw na całej stronie",
                "mode":handleUserState,
                "id":3
            },
            {
                "span":"Samouczek",
                "text":" - pomocne instrukcje w sekcji projektu",
                "mode":handleUserState,
                "id":4
            }]

            SetComponents(comp)
        }else{

        }
        
        
      }, [isActualS]); // Nasłuchuje zmian isActualS


    const[isBTNStates,setBTNStates] = useState([null,null,null,null])
    const handleValueChange = (newValue) =>{
        if(newValue?.state !== "default"){
            const newBTNStates = [...isBTNStates];
            newBTNStates[newValue?.index] = newValue?.state;
            setBTNStates(newBTNStates);
            //console.log(newValue)
        }else{
            const newBTNStates = [...isBTNStates];
            newBTNStates[newValue?.index] = null;
            setBTNStates(newBTNStates);       
        }
    } 

    const handleClick=()=>{
        if(isBTNStates.some(state => state != null)){
            //console.log(isBTNStates, "prefab")
            const nonNullWithIndex = isBTNStates
            .map((state, index) => ({ state: state !== null ? +state : null, id:index+1}))
            .filter(item => item.state !== null)
            
            const data = nonNullWithIndex
            //console.log(JSON.stringify(data))
            WsRequest.setSettings(JSON.stringify(data))
            
            setBTNStates([null,null,null,null])

        }   
    }
    const [user, setUser] = useState({email: "", password: ""})
    const [val_element, setVal_element] = useState(true)
    const [e_validate, setEValidate] = useState(false)
    const [p_validate, setPValidate] = useState(false)
    const [isOpenEditMenu, setOpenEditMenu]= useState(false)
    const send = JSON.stringify(user)
    
    const E_Check = (e) => {
        setVal_element(true)
        console.log(e)
        setUser((prev)=> ({ ...prev, email : e}))
        //console.log(user)
        let e_pattern = !(!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{1,})$/.test(e))
        setEValidate(e_pattern)
        console.log(e_validate)
    }
    const P_Check = (e) => {
        setVal_element(true)

        let e_pattern = (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(e))
        setUser((prev)=> ({ ...prev, password : e}))
        //console.log(e, e_pattern)
        setPValidate(e_pattern)
        console.log(p_validate)
      }
    const [isloginHandleBTN, setLoginHandleBTN] = useState(false) 
    var login_database_URL;
    if (process.env.NODE_ENV === 'production') {
      login_database_URL = "https://api.srv45036.seohost.com.pl/api/getaccess"
    } else {
      login_database_URL = `${process.env.REACT_APP_TUNNEL_URL}/api/getaccess`
    }
    

    
    const handleLoginBTN_click = async()=>{
        console.log(JSON.stringify(user))
        // const response = await fetch(login_database_URL, {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'authorization': at,
        //         'deviceId': d_id,
                
        //     },
        //     body: send
        // });
        // if (response.ok) {
        //     const data = await response.json();
        //     console.log(data,"data");
        //     console.log(document.cookie)
        // } else {
        //     throw new Error('Unauthorized');
        // }


        const data = await fetchWithAuth({url:login_database_URL,method:'POST', body:send,credentials:'include'})
        if(data){
            setVal_element(true)
            setOpenEditMenu(true)
            $("#Fpasword-input").val("")
        }else{
            setVal_element(false)
        }
    }
    const [open_conf, setOpenConf] = useState({ width: [330, 360, 240, 200, 100, 0], height: [204, 230, 160, 150, 100, 0], padding: ["24px 40px", "24px 40px","24px 40px", "24px 40px", "24px 40px", 0] })
    const Minivariants = {
        open: open_conf,
        closed: { width: "auto", height: "auto" },
    }
    const variants = {
        open: { opacity: 1, height:[500, 550], scale:[1,1.2,1]},
        closed: { opacity: 0.2, height:500 },
      }
      const BTNvariants = {
        open: { opacity: 0.5, translateX: [0,0,-24,-24], transition:{delay:0.4}},
        trans:{ translateX: 0, position:"relative", transition: {duration:0}},
        closed: { opacity: 0, translateX: 0 },
      }
      const BTN2variants = {
        open: { opacity: 0.5, translateX: [0,65], transition:{delay:0.7}},
        trans:{ translateX: 0, position:"relative", transition: {duration:0, visualDuration: 0.4}},
        closed: { opacity: 0, translateX: 0, position: "absolute" },
      }
      const variants_uSet_angle = {
        open: { width:100, height:[15, 5], borderRadius:[40, 0] },
        closed: {width:60, height:60 },
      }
      const variants_uSet_block = {
        open: { width:70, height:[10,0], borderTopRightRadius:"40px" },
        closed: {width:70, height:40 },
      }
      const variants_uSet_angleContainer = {
        open: { width:30, height:[7,0]},
        closed: {width:30, height:40 },
      }
      
    window.on = function(e) {
        console.log(e)
        setOpenConf(e)
        setOpenEditMenu(true)
        console.dir($("#data_check-container").children().animate({opacity: 0}, 200))
        return Minivariants.open
    }
    window.off = function() {
        setOpenEditMenu(false)
        setSaveBTNstate(false)
        console.dir($("#data_check-container").children().css("opacity","1"))
    }
    const [saveBTNstate, setSaveBTNstate] = useState(null)
    const [savehBTNstate, setSavehBTNstate] = useState(false)
    const [savecBTNstate, setSavecBTNstate] = useState(false)

    const CloseMenu = () =>{
        setOpenEditMenu(false)
        setSaveBTNstate(false)
        console.dir($("#data_check-container").children().animate({opacity: 1}, 200))

    }
    useEffect(()=>{
        console.log(savehBTNstate, saveBTNstate)
      },[savehBTNstate])
    
    useEffect(()=>{
        $("#closeSetBTN").children().animate({opacity:1})
    },[savecBTNstate])
    useEffect(()=>{
        $("#saveSetBTN").children().animate({opacity:1})
        console.log($("#saveSetBTN").children())
    },[savehBTNstate])
    //on({width: [330, 360, 240, 200, 100, 0], height: [204, 230, 160, 150, 100, 0], padding: ["24px 40px", "24px 40px","24px 40px", "24px 40px", "24px 40px", 0]})
    if(width >= 768 ){
    return (
    <div ref={r} className="w-full min-h-[100vh] h-auto pl-6 pr-10 py-11 relative z-[2]">
        <div id='content-blur' className=' bg-[rgb(236,236,236,0.56)] font-Poppins 01xl:px-20 px-14 py-10 pt-0 rounded-3xl w-full h-full'>
            {/**Sekcja Górna */}
            <div className='flex relative justify-between bottom-[-60px] z-10'>
                <div className='flex items-center'>
                    <h1 className='1ll:text-[85px] text-[65px] font-bold'>Edit</h1>
                    <p id='text-firstInfo' className='1ll:text-[23px] text-[17px] inline h-min ml-2'>Profile</p>
                </div>
                <div className='flex items-center'>
                    <div className='bg-white rounded-full 1ll:w-[100px] 1ll:h-[100px] w-[85px] h-[85px] p-2 mr-6'>
                        <div className='w-full h-full brightness-[1.5] opacity-75'>
                            <Canvas>
                                <Model6_Figurka/>
                            </Canvas>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div style={{backgroundColor:Pallete[0]}} className='p-3 px-7 rounded-full font-bold text-white 1ll:text-[18px] text-[16px]'>Change</div>
                        <p className='1ll:text-[14px] text-[12px] ml-2 mt-2'>your avatar</p>
                    </div>
                </div>
            </div>
            <div className='settings-container'>
                {/* Sekcja lewa */}
                <div className='inline-flex flex-col items-center' style={{ gridArea: "left" }}>
                    <motion.div animate={isOpenEditMenu ? "open":"closed"} variants={variants} transition={{ ease: "easeIn", duration: 0.4, scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },delay:0.2 }} className='bg-[#D8D8D8] w-auto inline-flex pl-10 pr-16 pt-[60px] pb-[60px] rounded-[30px] 1ll:rounded-tr-[60%] rounded-tr-[55%] flex-col h-[500px] opacity-[0.2] brightness-[0.8] justify-justify-between relative'>
                        <div className='flex flex-col justify-evenly h-[500px]'>
                            <div className=''>
                                <p>Email</p>
                                <input type='text' autoCorrect='off' placeholder='adamo@adm.pl'  className={`1ll:w-[300px] w-[230px] h-[50px] rounded-full text-[14px] p-3 bg-transparent font-Poppins border-black border-[1px] text-center text-black placeholder:text-black ${isOpenEditMenu ? "":"pointer-events-none"}`}/>
                            </div>
                            <div className=''>
                                <p>Nazwa urzytkownika</p>
                                <input type='text' autoCorrect='off' placeholder='Adamo01'  className={`1ll:w-[300px] w-[230px] h-[50px] rounded-full text-[14px] p-3 bg-transparent font-Poppins border-black border-[1px] text-center text-black placeholder:text-black ${isOpenEditMenu ? "":"pointer-events-none"}`}/>
                            </div>
                            <div className=''>
                                <p>Hasło</p>
                                <input type='password' autoCorrect='off' placeholder='*******'  className={`1ll:w-[300px] w-[230px] h-[50px] rounded-full text-[14px] p-3 bg-transparent font-Poppins border-black border-[1px] text-center text-black placeholder:text-black ${isOpenEditMenu ? "":"pointer-events-none"}`}/>
                            </div>
                        </div>
                        <div className='flex justify-center items-center w-full flex-row h-[80px] relative bottom-[-20px]'>
                            <motion.div id='saveSetBTN' onHoverStart={()=>setSavehBTNstate(true)} onMouseLeave={()=>setSavehBTNstate(false)}  animate={[isOpenEditMenu ? "open":"closed", saveBTNstate === "open" ? "trans":""]} variants={BTNvariants}  transition={{duration: 0.4, scale: { type: "spring", visualDuration: 0.4, bounce: 0.6 }, translateX:{type:"spring", stiffness: 200, damping: 10, delay:0.7}}} className={` invert-[90%] cursor-pointer transition_w bg-black text-white text-[18px] font-bold rounded-[30px] inline z-[3] mr-2 overflow-hidden ${
                                isBTNStates.some(element => element != null) ? " cursor-pointer":"opacity-50"
                            } ${
                                saveBTNstate === "open" && !savehBTNstate ? "duration-300 ease-in-out w-[40px] h-[40px] p-0 flex justify-center items-center":" w-[120px] h-[51px] px-8 py-3"
                            } ${
                                !savehBTNstate && saveBTNstate ? "duration-300 ease-in-out w-[40px] h-[40px] p-0 flex justify-center items-center":" w-[120px] h-[51px] px-8 py-3"
                            } `}>{saveBTNstate === "open" && !savehBTNstate ? <CirclePlus/>:<p className={`ease-in-out duration-[100ms] opacity-[0] ${!savehBTNstate && isOpenEditMenu ? "opacity-[1]":""}`}>Zapisz</p>}
                            </motion.div>
                            <motion.div id='closeSetBTN' onClick={()=>CloseMenu()} onHoverStart={()=>setSavecBTNstate(true)} onMouseLeave={()=>setSavecBTNstate(false)} animate={[isOpenEditMenu? "open": "closed", saveBTNstate === "open" ? "trans":""]} onAnimationComplete={(e)=> e === "open" ? setSaveBTNstate(e) :  null} variants={BTN2variants} transition={{type: "spring", duration: 0.4, bounce: 0.5,}} className={`p-2 bg-black rounded-full transition_w flex justify-center items-center absolute z-[2] ml-2 overflow-hidden cursor-pointer ${
                                savecBTNstate ? "duration-300 ease-in-out h-[51px] w-[100px]":" h-[40px] w-[40px] "
                            }`}>
                                { !savecBTNstate ? <X style={{color:Pallete[0]}} />:<p style={{color:Pallete[0]}} className={`ease-in-out duration-[100ms] text-[16px] font-bold opacity-[0] `}>Anuluj</p>}
                            </motion.div>
                        </div>
                        
                    </motion.div>
                    <motion.div id='data_check-container' animate={isOpenEditMenu ? "open":"closed"} variants={Minivariants} transition={{ ease: "linear", duration: 0.3 }} onMouseLeave={()=>setLoginHandleBTN(false)} className='flex flex-col items-center bg-white px-10 py-6 w-fit rounded-[60px] relative top-[-40px] overflow-hidden'>
                        <p className={`1ll:text-[16px] text-[14px] w-max ${val_element ? "":"text-red-600"}`}>{ val_element ? "Wpisz by mieć dostep" : "Nieprawidłowe dane"}</p>
                        <input type='email' autoCorrect='off' autoCapitalize='off' placeholder='email' onChange={(e)=> E_Check(e.target.value)} className={`1ll:w-[250px] w-[210px] h-[50px] rounded-full text-[12px] p-3 font-Poppins bg-[#f3f2f2] text-center text-black placeholder:text-black mt-4 ${
                          e_validate === true ? "text-black" : "text-red-600 autofilinputred"
                        }`}/>
                        <div className='mt-4 flex justify-evenly items-center w-full'>
                            <input id='Fpasword-input' type='password' autoCorrect='off' placeholder='hasło' autoCapitalize='off' onChange={(e)=> P_Check(e.target.value)} className={` h-[50px] rounded-full ease-in-out duration-300 text-[12px] p-3 font-Poppins bg-[#f3f2f2] text-center text-black placeholder:text-black ${
                            p_validate === true ? "text-black" : "text-red-600 autofilinputred"
                            }
                            ${
                                isloginHandleBTN && e_validate && p_validate ? "w-[118px]" : "1ll:w-[160px] w-[130px]"
                            }`}/>
                            <motion.div onHoverStart={()=>setLoginHandleBTN(true)} onClick={()=>isloginHandleBTN && e_validate && p_validate ? handleLoginBTN_click() : null} className={`!bg-black rounded-full ease-in-out duration-300 ${
                                e_validate && p_validate && !isloginHandleBTN ? "cursor-pointer shadow_approve_anim anim":""
                            }${
                                isloginHandleBTN && e_validate && p_validate ? "cursor-pointer w-[70px] text-center p-[10px]":"w-auto  p-[3px]"
                            }`}>
                                {isloginHandleBTN && e_validate && p_validate ? 
                                <p className='text-white text-[12px] font-Poppins'>Zaloguj</p>
                                 : 
                                 <Check className='text-white !bg-black !border-black'/>
                                }
                                
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
                {/* Sekcja prawa */}
                <div className='w-full h-auto flex flex-col ml-8' style={{ gridArea: "right" }}>
                    <div className='w-full 01xl:h-[220px] h-auto flex relative '>
                        <div className='set_container rounded-br-[35px] 1ll:w-[170px] w-[140px] h-[400px] absolute top-0 left-0 translate-x-[-100%]'>
                            <div className="set_out">
                                <div className="set_in "></div>
                            </div>      
                        </div>
                        
                        <div className='w-full h-auto bg-[rgba(255,255,255,0.5)] rounded-bl-[35px] rounded-r-[40px]'>
                            <hr className='mt-16 relative left-[-18px] 01xl:hidden'></hr>
                            <p className='01xl:text-[19px] text-[16px] 01xl:mt-4 mt-8 1xl:ml-4 01xl:ml-0 ml-4'><span className='font-bold '>Wybierz</span> kolor :</p>
                            <ChosePallete_SET/>
                            
                        </div>
                    </div>
                </div>
                {/* Sekcja dolna */}
                <div className='w-full h-auto flex flex-col 01xl:ml-8' style={{ gridArea: "footer" }}>
                    <div className='bg-[rgba(255,255,255,0.5)] w-full h-auto mt-8 rounded-[30px] pb-8 pt-14 px-10 ml-3 relative'>
                        {isComponents.map((item, index)=>(
                            <div key={index} className='flex items-center my-6'>
                                <OptionBTN userState={item?.mode(item?.id)} StateBTN={handleValueChange} index={index}/>
                                <p className='ml-3'><span className='font-bold text-[#1e1e1e] 01xl:text-[16px] text-[14px]'>{item?.span}</span> {item?.text}</p>
                            </div>
                        ))}
                        <div className='w-full flex justify-end mt-3'>
                            <div onClick={handleClick} className={`invert-[90%] bg-black text-white text-[18px] font-bold px-8 py-3 rounded-[30px] inline ${
                                isBTNStates.some(element => element != null) ? " cursor-pointer":"opacity-50 pointer-events-none"
                            }`}>Zatwierdź</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )}
  else{
    return(
        <div className='h-full w-full pt-14 overflow-y-auto relative'>
        <div ref={r} className='w-full h-max rounded-[50px] relative flex flex-col items-center overflow-x-hidden'>
            <div id='content-blur' className='absolute 02ss:w-[88%] w-[95%] h-full bg-[rgb(236,236,236,0.56)] rounded-[50px] z-[1]'></div>
                
                <div className='p-4 02ss:px-16 px-8 '>
                    {/* Kolory */} 
                    <div className='flex w-full mt-6 mb-9 items-center justify-between relative z-[5] mx-0 02ss:mx-2 '>
                        <div className='bg-white rounded-full ss:w-[85px] w-[78px] ss:h-[85px] h-[78px] p-2 mr-6'>
                            <div className='w-full h-full brightness-[1.5] opacity-75'>
                                <Canvas>
                                    <Model6_Figurka/>
                                </Canvas>
                            </div>
                        </div>
                        <div className='flex flex-col ss:mr-6 font-Poppins'>
                            <div style={{backgroundColor:Pallete[0]}} className='p-3 px-7 rounded-full font-bold text-white 1mm:text-[18px] ss:text-[16px] text-[14px]'>Change</div>
                            <p className='1mm:text-[14px] text-[10px] ml-2 mt-2'>your avatar</p>
                        </div>
                    </div>
                    <div className='w-full h-auto flex flex-col mb-8  mx-0 02ss:mx-2'>
                        <div className='w-full h-auto flex flex-col relative z-[4]'>
                            <div className='flex w-full h-full absolute top-[-80px] left-0'>
                                <div className='relative min-w-[140px] h-[80px] flex'>
                                    <div className='set_container rounded-br-[35px] w-[140px] h-[80px] absolute left-0 top-[80px] scale-y-[-1] translate-y-[-100%]'>
                                        <div className="set_out">
                                            <div className="set_in "></div>
                                        </div>      
                                    </div>
                                </div>
                                
                                <div className='bg-[rgba(255,255,255,0.5)] h-[80px] w-full rounded-tr-[35px]'></div>     
                            </div>
                            
                            <div className='w-full h-auto bg-[rgba(255,255,255,0.5)] rounded-br-[40px] rounded-l-[40px] font-Poppins'>
                                <p className='1mm:text-[16px] text-[12px] mt-8 ml-10'><span className='font-bold '>Wybierz</span> kolor :</p>
                                <ChosePallete_SET/>                  
                            </div>
                        </div>
                    </div>
                    {/* Form */} 
                    
                    <div className='flex flex-col items-center relative z-[4] w-full justify-center '>
                        <div className='flex items-center relative z-[5] top-[45px] w-[60vw]  justify-start font-Poppins'>
                            <h1 className='1mm:text-[75px] text-[62px] font-bold'>Edit</h1>
                            <p id='text-firstInfo' className='1mm:text-[20px] text-[15px] inline h-min ml-2'>Profile</p>
                        </div>
                        <motion.div animate={isOpenEditMenu ? "open":"closed"} variants={variants} transition={{ ease: "easeIn", duration: 0.4, scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },delay:0.2 }} className='bg-[#D8D8D8] w-auto inline-flex 02ss:pl-10 pl-9 02ss:pr-16 pr-14 pt-[60px] 1mm:text-[15px] text-[13px] font-Poppins pb-[60px] rounded-[30px] 1mm:rounded-tr-[60%] rounded-tr-[50%] flex-col h-[500px] opacity-[0.2] brightness-[0.8] justify-justify-between relative 1mm:w-auto w-full'>
                            <div className='flex flex-col justify-evenly h-[500px]'>
                                <div className=''>
                                    <p>Email</p>
                                    <input type='text' autoCorrect='off' placeholder='adamo@adm.pl'  className={`1mm:w-[300px] 02ss:w-[210px] w-full h-[50px] rounded-full 1mm:text-[14px] text-[12px] p-3 bg-transparent font-Poppins border-black border-[1px] text-center text-black placeholder:text-black ${isOpenEditMenu ? "":"pointer-events-none"}`}/>
                                </div>
                                <div className=''>
                                    <p>Nazwa urzytkownika</p>
                                    <input type='text' autoCorrect='off' placeholder='Adamo01'  className={`1mm:w-[300px] 02ss:w-[210px] w-full  h-[50px] rounded-full 1mm:text-[14px] text-[12px] p-3 bg-transparent font-Poppins border-black border-[1px] text-center text-black placeholder:text-black ${isOpenEditMenu ? "":"pointer-events-none"}`}/>
                                </div>
                                <div className=''>
                                    <p>Hasło</p>
                                    <input type='password' autoCorrect='off' placeholder='*******'  className={`1mm:w-[300px] 02ss:w-[210px] w-full rounded-full 1mm:text-[14px] text-[12px] p-3 bg-transparent font-Poppins border-black border-[1px] text-center text-black placeholder:text-black ${isOpenEditMenu ? "":"pointer-events-none"}`}/>
                                </div>
                            </div>
                            <div className='flex justify-center items-center w-full flex-row h-[80px] relative bottom-[-20px]'>
                                <motion.div id='saveSetBTN' onHoverStart={()=>setSavehBTNstate(true)} onMouseLeave={()=>setSavehBTNstate(false)}  animate={[isOpenEditMenu ? "open":"closed", saveBTNstate === "open" ? "trans":""]} variants={BTNvariants}  transition={{duration: 0.4, scale: { type: "spring", visualDuration: 0.4, bounce: 0.6 }, translateX:{type:"spring", stiffness: 200, damping: 10, delay:0.7}}} className={` invert-[90%] cursor-pointer transition_w bg-black text-white text-[18px] font-bold rounded-[30px] inline z-[3] mr-2 overflow-hidden ${
                                    isBTNStates.some(element => element != null) ? " cursor-pointer":"opacity-50"
                                } ${
                                    saveBTNstate === "open" && !savehBTNstate ? "duration-300 ease-in-out w-[40px] h-[40px] p-0 flex justify-center items-center":" w-[120px] h-[51px] px-8 py-3"
                                } ${
                                    !savehBTNstate && saveBTNstate ? "duration-300 ease-in-out w-[40px] h-[40px] p-0 flex justify-center items-center":" w-[120px] h-[51px] px-8 py-3"
                                } `}>{saveBTNstate === "open" && !savehBTNstate ? <CirclePlus/>:<p className={`ease-in-out duration-[100ms] opacity-[0] ${!savehBTNstate && isOpenEditMenu ? "opacity-[1]":""}`}>Zapisz</p>}
                                </motion.div>
                                <motion.div id='closeSetBTN' onClick={()=>CloseMenu()} onHoverStart={()=>setSavecBTNstate(true)} onMouseLeave={()=>setSavecBTNstate(false)} animate={[isOpenEditMenu? "open": "closed", saveBTNstate === "open" ? "trans":""]} onAnimationComplete={(e)=> e === "open" ? setSaveBTNstate(e) :  null} variants={BTN2variants} transition={{type: "spring", duration: 0.4, bounce: 0.5,}} className={`p-2 bg-black rounded-full transition_w flex justify-center items-center absolute z-[2] ml-2 overflow-hidden cursor-pointer ${
                                    savecBTNstate ? "duration-300 ease-in-out h-[51px] w-[100px]":" h-[40px] w-[40px] "
                                }`}>
                                    { !savecBTNstate ? <X style={{color:Pallete[0]}} />:<p style={{color:Pallete[0]}} className={`ease-in-out duration-[100ms] text-[16px] font-bold opacity-[0] `}>Anuluj</p>}
                                </motion.div>
                            </div>
                            
                        </motion.div>
                        <motion.div id='data_check-container' animate={isOpenEditMenu ? "open":"closed"} variants={Minivariants} transition={{ ease: "linear", duration: 0.3 }} onMouseLeave={()=>setLoginHandleBTN(false)} className='flex flex-col items-center bg-white ss:px-10 px-7 ss:py-6 py-5 w-fit 1mm:rounded-[60px] rounded-[50px] relative top-[-40px] overflow-hidden font-Poppins '>
                            <p className={`1mm:text-[16px] text-[13px] w-max ${val_element ? "":"text-red-600"}`}>{ val_element ? "Wpisz by mieć dostep" : "Nieprawidłowe dane"}</p>
                            <input type='email' autoCorrect='off' autoCapitalize='off' placeholder='email' onChange={(e)=> E_Check(e.target.value)} className={`1mm:w-[250px] ss:w-[180px] w-[120px] ss:h-[50px] h-[40px] rounded-full 1mm:text-[12px] text-[10px] p-3 font-Poppins bg-[#f3f2f2] text-center text-black placeholder:text-black ss:mt-4 mt-3 ${
                            e_validate === true ? "text-black" : "text-red-600 autofilinputred"
                            }`}/>
                            <div className='ss:mt-4 mt-2 flex justify-evenly items-center w-full'>
                                <input id='Fpasword-input' type='password' autoCorrect='off' placeholder='hasło' autoCapitalize='off' onChange={(e)=> P_Check(e.target.value)} className={` ss:h-[50px] h-[40px] rounded-full ease-in-out duration-300 1mm:text-[12px] text-[10px] p-3 font-Poppins bg-[#f3f2f2] text-center text-black placeholder:text-black ${
                                p_validate === true ? "text-black" : "text-red-600 autofilinputred"
                                }
                                ${
                                    isloginHandleBTN && e_validate && p_validate ? "1mm:w-[118px] ss:w-[75px] w-[65px]" : "1mm:w-[160px] ss:w-[100px] w-[70px]"
                                }`}/>
                                <motion.div onHoverStart={()=>setLoginHandleBTN(true)} onClick={()=>isloginHandleBTN && e_validate && p_validate ? handleLoginBTN_click() : null} className={`!bg-black rounded-full ease-in-out duration-300 ${
                                    e_validate && p_validate && !isloginHandleBTN ? "cursor-pointer shadow_approve_anim anim":""
                                }${
                                    isloginHandleBTN && e_validate && p_validate ? "cursor-pointer w-[70px] text-center p-[10px]":"w-auto  p-[3px]"
                                }`}>
                                    {isloginHandleBTN && e_validate && p_validate ? 
                                    <p className='text-white text-[12px] font-Poppins'>Zaloguj</p>
                                    : 
                                    <i className='gg-check-o text-white !bg-black !border-black'/>
                                    }
                                    
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                    {/* Ustawienia */} 
                    <div className='w-full h-auto flex flex-col relative z-[5] font-Poppins mb-3 top-[-30px]'>
                        <div className={`flex justify-between ease-linear duration-500 ${isOpenEditMenu ? "mt-[50px]":"mt-0"}`}>
                            <div className='flex items-end'>
                                <motion.div animate={isOpenEditMenu ? "open":"closed"} variants={variants_uSet_block} transition={{ ease: "linear", duration: 0.5 }} className='bg-[rgba(255,255,255,0.5)] ss:w-[70px] a1:w-[40px] w-[30px] h-[40px] rounded-tr-[20px]'></motion.div>
                                <motion.div animate={isOpenEditMenu ? "open":"closed"} variants={variants_uSet_angleContainer} transition={{ ease: "linear", duration: 0.5 }}  className='set_island_out'>
                                    <motion.div animate={isOpenEditMenu ? "open":"closed"} variants={variants_uSet_angle} transition={{ ease: "linear", duration: 0.5 }} className='set_island_in'></motion.div>
                                </motion.div>
                            </div>
                            <div className='flex'>
                                <motion.div animate={isOpenEditMenu ? "open":"closed"} variants={variants_uSet_angleContainer} transition={{ ease: "linear", duration: 0.5 }} className='set_island_out scale-x-[-1]'>
                                    <motion.div animate={isOpenEditMenu ? "open":"closed"} variants={variants_uSet_angle} transition={{ ease: "linear", duration: 0.5 }} className='set_island_in'></motion.div>
                                </motion.div>
                                <motion.div animate={isOpenEditMenu ? "open":"closed"} variants={variants_uSet_block} transition={{ ease: "linear", duration: 0.5 }} className='bg-[rgba(255,255,255,0.5)] ss:w-[70px] a1:w-[40px] w-[30px] h-[40px] rounded-tl-[20px]'></motion.div>

                            </div>
                        </div>
                        <div className='bg-[rgba(255,255,255,0.5)] w-full h-auto rounded-b-[30px] pb-8 pt-6 px-10 relative font-Poppins'>
                            {isComponents.map((item, index)=>(
                                <div key={index} className='flex items-center my-6'>
                                    <OptionBTN userState={item?.mode(item?.id)} StateBTN={handleValueChange} index={index}/>
                                    <p className='ml-3 1mm:text-[14px] text-[10px]'><span className='font-bold text-[#1e1e1e] 1mm:text-[15px] text-[12px]'>{item?.span}</span> {item?.text}</p>
                                </div>
                            ))}
                            <div className='w-full flex justify-end mt-8'>
                                <div onClick={handleClick} className={`invert-[90%] bg-black text-white 1mm:text-[16px] text-[14px] font-bold px-8 py-3 rounded-[30px] inline ${
                                    isBTNStates.some(element => element != null) ? " cursor-pointer":"opacity-50 pointer-events-none"
                                }`}>Zatwierdź</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}


const OptionBTN=({userState, StateBTN, index})=>{
    const {Pallete} = usePallete()
    const [isBTN_State, setBTN_State]= useState(userState)
    //console.log(userState)
    useEffect(()=>{
        if(isBTN_State === userState){
            StateBTN({state:"default",index: index})
        }else{
            StateBTN({state:isBTN_State,index: index})

        }
    },[isBTN_State])

    return(
        <div onClick={()=>setBTN_State(!isBTN_State)} className='bg-white min-w-[52px] w-[52px] h-[26px] rounded-full flex items-center px-[6px] '>
            <div style={{backgroundColor:isBTN_State ? Pallete[1] : "#707070"}} className={`w-[20px] h-[20px] rounded-full ease-out duration-200 ${
                isBTN_State ? "translate-x-[20px]":"translate-x-[0]"
            }`}></div>
        </div>
    )
}

const ChosePallete_SET=()=>{

    const {setPallete, Pallete, isPalleteNum} = usePallete()
    
        
    
    return(
        <div className='flex px-4 my-6 mb-12 3xl:max-w-[37vw] 1xl:max-w-[30vw] 02xl:max-w-[25vw] md:max-w-[22vw] w-full overflow-x-auto 01xl:ml-7'>
            <div className='01xl:inline-flex flex flex-wrap ease-in-out duration-300 h-auto md:justify-evenly justify-start items-center 01xl:min-w-max 01xl:my-2'>
                    {Pallets.map((item, index) => (
                        <div
                            id={"pallete" + index}
                            className={`p-[12px] max-w-[85px] max-h-[85px] min-w-[70px] min-h-[70px] hover:saturate-100 hover:scale-110 ease-out duration-150 cursor-pointer rounded-[13px] 01xl:my-0 my-2 mx-2  ${
                                isPalleteNum == index ? "bg-black":"bg-white saturate-50"
                            }`}
                            key={index}
                            style={{backgroundColor: isPalleteNum == index ? Pallete[2] :"white"}}
                            onClick={()=>setPallete(index) } // setCheckpallete(index)
                        >
                            <img alt='color pallets' className='' src={item.image}/>

                        </div>
                    ))}
                </div>         
        </div>
    )
}


export default Settings