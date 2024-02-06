import React, { useEffect, useState } from 'react'
import { Pallete0, Pallete1, Pallete2, Pallete3, Pallete4, Pallete5, Pallets } from '../constants'
import $ from 'jquery';

const PalleteSection = ({r}) => {
    const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))

    //$("body::-webkit-scrollbar-track").css("background","red");

    $("#pallete"+ localpallete[0].number).css("background-color",Pallets[localpallete[0].number].selectcolor)
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
      
    
    const setCheckpallete = (data) => {
        for(let i = 0; i <= Pallets.length; i++){
            if(data === i){
                $("#pallete" + data).css("background-color",Pallets[data].selectcolor)
                console.log("data",i)
            }else{
                $("#pallete" + i).css("background-color", "white")
            }
            
        }
       
    }

    //console.log('color', JSON.parse(window.localStorage.getItem("Pallete")))
    //const userData = JSON.parse(localStorage.getItem('Pallete'));
    
    const handleClick = (data) => {
        if(data != localpallete[0].number){ // eslint-disable-line
            console.log("number",localpallete[0].number)
            //$('body').fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
            //window.localStorage.setItem("Pallete", JSON.stringify(Pallete1 + index))
            setCheckpallete(data)
            if(data === 0){
                window.localStorage.setItem("Pallete", JSON.stringify(Pallete0))
                window.dispatchEvent(new Event("Pallete"))
            }
            if(data === 1){
                window.localStorage.setItem("Pallete", JSON.stringify(Pallete1))
                window.dispatchEvent(new Event("Pallete"))
            }
            if(data === 2){
                window.localStorage.setItem("Pallete", JSON.stringify(Pallete2))
                window.dispatchEvent(new Event("Pallete"))
            }
            if(data === 3){
                window.localStorage.setItem("Pallete", JSON.stringify(Pallete3))
                window.dispatchEvent(new Event("Pallete"))
            }
            if(data === 4){
                window.localStorage.setItem("Pallete", JSON.stringify(Pallete4))
                window.dispatchEvent(new Event("Pallete"))
            }
            if(data === 5){
                window.localStorage.setItem("Pallete", JSON.stringify(Pallete5))
                window.dispatchEvent(new Event("Pallete"))
            }
        }
        
    }

  return (
    <div id='UXPsys' ref={r} className='h-[100vh] mb-[100px] w-full flex md:flex-row flex-col-reverse justify-center  items-center relative '>
        <div className=' md:w-[40vw] w-auto md:h-[65%] h-auto md:px-[35px] ss:px-[25px] px-[18px] bg-[#F6F7F8] md:rounded-[49px] rounded-[20px] md:ml-0 ss:ml-16 ml-8 ss:mr-16 mr-12'>
            <div className='pl-[25px] flex items-center mt-6'>
                <i className="gg-options text-black scale-125"></i>
                <div className='flex flex-col ml-12'>
                    <p className='font-bold font-Poppins md:text-[21px] text-[9px]'>Change</p>
                    <p className='font-Poppins md:text-[21px] text-[9px]'>your Color pallete</p>
                </div>
            </div>
            <div className=' md:mt-10 mt-6 mb-8 md:mb-0'>
                <div className='grid grid-template-columns saturate-50 hover:saturate-100 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-4 ease-in-out duration-300 w-full h-full justify-center items-center'>
                    {Pallets.map((item, index) => (
                        <div
                            id={"pallete" + index}
                            className={` md:p-4 ss:p-4 p-2 cursor-pointer rounded-md lg:m-2 md:m-4 ss:m-2 m-[4px] bg-white`}
                            key={index}
                            onClick={()=>handleClick(index)} // setCheckpallete(index)
                        >
                            <img alt='color pallets' className='' src={item.image}/>

                        </div>
                    ))}
                </div>
            </div>
            <div></div>
        </div>
        <div className=' md:w-[40vw] w-full md:h-[65%] h-auto md:ml-12 ml-0 md:pl-0 ss:pl-[90px] pl-[30px]   mb-[50px] flex flex-col justify-start md:items-center items-start'>
            <div>
                <p className='font-Poppins font-bold md:text-[46px] text-[29px]'>Zmień</p>
                <p className='font-Poppins md:text-[26px] text-[15px] md:mb-16 mb-8'>kolory strony z podanych palet kolorów </p>
                <p className='font-Poppins md:text-[19px] text-[12px] mb-2'>Aktualnie wybrana paleta kolorów</p>\
                {Pallete0.map((item, index) => (
                    <div
                        key={index}
                        style={{backgroundColor: localpallete[index].color}}
                        className={` md:h-[55px] h-[36px] rounded-full font-Poppins md:text-[16px] text-[9px] flex items-center pl-8 mb-[12px] ease-in-out duration-300 mr-[80px] ${index > 1 ? "text-black" : "text-white"}`}
                    >
                        {localpallete[index].color}
                    </div>
                ))}
                <div className='UXPsysanim md:text-[24px] md:static absolute bottom-0 md:w-auto w-[70%] md:left-0 left-[50%] md:translate-x-0 translate-x-[-50%] text-[15px] font-bold font-Poppins md:h-[70px] h-[54px] bg-black cursor-pointer  text-white rounded-full flex justify-center items-center mt-[70px]'>Select and save</div>
            </div>
        </div>
    </div>
  )
}

export default PalleteSection