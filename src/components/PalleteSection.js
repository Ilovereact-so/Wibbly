import React, { useEffect, useState } from 'react'
import { Pallete0, Pallete1, Pallete2, Pallete3, Pallete4, Pallete5, Pallets } from '../constants'
import $ from 'jquery';

const PalleteSection = () => {
    const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))

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
    <div id='UXPsys' className='h-[100vh] w-full flex justify-center  items-center relative '>
        <div className='w-[40vw] h-[65%] px-[35px] bg-[#F6F7F8] rounded-[49px] mr-12'>
            <div className='pl-[25px] flex items-center mt-6'>
                <i className="gg-options text-black scale-125"></i>
                <div className='flex flex-col ml-12'>
                    <p className='font-bold font-Poppins text-[21px]'>Change</p>
                    <p className='font-Poppins text-[21px]'>your Color pallete</p>
                </div>
            </div>
            <div className=' mt-10'>
                <div className='grid grid-template-columns saturate-50 hover:saturate-100 grid-cols-4 ease-in-out duration-300 w-full h-full justify-center items-center'>
                    {Pallets.map((item, index) => (
                        <div
                            id={"pallete" + index}
                            className={`p-4 cursor-pointer rounded-md m-2 bg-white`}
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
        <div className='w-[40vw] h-[65%] ml-12 mb-[50px] flex flex-col justify-start items-center'>
            <div>
                <p className='font-Poppins font-bold text-[46px]'>Zmień</p>
                <p className='font-Poppins text-[26px] mb-16'>kolory strony z podanych palet kolorów </p>
                <p className='font-Poppins text-[19px] mb-2'>Aktualnie wybrana paleta kolorów</p>\
                {Pallete0.map((item, index) => (
                    <div
                        key={index}
                        style={{backgroundColor: localpallete[index].color}}
                        className={`h-[55px] rounded-full font-Poppins flex items-center pl-8 mb-[12px] ease-in-out duration-300 mr-[80px] ${index > 1 ? "text-black" : "text-white"}`}
                    >
                        {item.color}
                    </div>
                ))}
                <div className='UXPsysanim text-[24px] font-bold font-Poppins h-[70px] bg-black cursor-pointer  text-white rounded-full flex justify-center items-center mt-[70px]'>Select and save</div>
            </div>
        </div>
    </div>
  )
}

export default PalleteSection