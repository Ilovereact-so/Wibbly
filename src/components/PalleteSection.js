import React, { useEffect, useState } from 'react'
import { Pallete0, Pallete1, Pallete2, Pallete3, Pallete4, Pallete5, Pallets } from '../constants'
import $ from 'jquery';

const PalleteSection = () => {
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
    <div id='UXPsys' className='h-[100vh] w-full flex ss:flex-row flex-col-reverse justify-center  items-center relative '>
        <div className='ss:w-[40vw] w-auto ss:h-[65%] h-auto ss:px-[35px] px-[18px] bg-[#F6F7F8] ss:rounded-[49px] rounded-[20px] ss:ml-0 ml-8 mr-12'>
            <div className='pl-[25px] flex items-center mt-6'>
                <i className="gg-options text-black scale-125"></i>
                <div className='flex flex-col ml-12'>
                    <p className='font-bold font-Poppins ss:text-[21px] text-[9px]'>Change</p>
                    <p className='font-Poppins ss:text-[21px] text-[9px]'>your Color pallete</p>
                </div>
            </div>
            <div className=' ss:mt-10 mt-6 mb-8 ss:mb-0'>
                <div className='grid grid-template-columns saturate-50 hover:saturate-100 xl:grid-cols-4 lg:grid-cols-3 ss:grid-cols-2 grid-cols-4 ease-in-out duration-300 w-full h-full justify-center items-center'>
                    {Pallets.map((item, index) => (
                        <div
                            id={"pallete" + index}
                            className={`ss:p-4 p-2 cursor-pointer rounded-md lg:m-2 ss:m-4 m-[4px] bg-white`}
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
        <div className='ss:w-[40vw] w-full ss:h-[65%] h-auto ss:ml-12 ml-0 ss:pl-0 pl-[30px]   mb-[50px] flex flex-col justify-start ss:items-center items-start'>
            <div>
                <p className='font-Poppins font-bold ss:text-[46px] text-[29px]'>Zmień</p>
                <p className='font-Poppins ss:text-[26px] text-[15px] ss:mb-16 mb-8'>kolory strony z podanych palet kolorów </p>
                <p className='font-Poppins ss:text-[19px] text-[12px] mb-2'>Aktualnie wybrana paleta kolorów</p>\
                {Pallete0.map((item, index) => (
                    <div
                        key={index}
                        style={{backgroundColor: localpallete[index].color}}
                        className={`ss:h-[55px] h-[36px] rounded-full font-Poppins ss:text-[16px] text-[9px] flex items-center pl-8 mb-[12px] ease-in-out duration-300 mr-[80px] ${index > 1 ? "text-black" : "text-white"}`}
                    >
                        {item.color}
                    </div>
                ))}
                <div className='UXPsysanim ss:text-[24px] ss:relative absolute bottom-0 ss:w-auto w-[70%] ss:left-0 left-[50%] translate-x-[-50%] text-[15px] font-bold font-Poppins ss:h-[70px] h-[54px] bg-black cursor-pointer  text-white rounded-full flex justify-center items-center mt-[70px]'>Select and save</div>
            </div>
        </div>
    </div>
  )
}

export default PalleteSection