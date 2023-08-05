import React, { useEffect, useState } from 'react'
import { Createuplogo } from '../assets';
import $ from "jquery";

const Footer = () => {
    const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
    const [info, setInfo] = useState(false)

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

      const handleClick = () => {
        setInfo(!info)
        var n = $(document).height();
        $('html ').animate({ scrollTop: n }, 300);

      }
  return (
    <div className='h-full w-auto px-10'>
        <div onClick={()=>handleClick() } className='py-8 ss:px-8 ss:pr-24 bg-white flex ss:justify-between justify-center cursor-pointer'>
            <div className='flex flex-col ss:mr-0 mr-5'>
                <p className='font-bold font-Poppins ll:text-[22px] sm:text-[19px] text-[16px]'>Jak przebiega współpraca ?</p>
                <p className='font-Poppins ll:text-[16px] sm:text-[15px] text-[13px]'>przeczytaj zanim ją podejmiesz</p>
            </div>
            <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="11.98" height="17.955" viewBox="0 0 11.98 17.955" className={`rotate-[180deg] sm:scale-[1] scale-[0.8] ease-in-out duration-300 ${
                    info === true ? "rotate-[270deg]" : "rotate-[180deg]"
                }`}>
                    <path id="Path_32" style={{fill: localpallete[2].color}} data-name="Path 32" d="M19.734,14.848l.008.008-3,3-.008-.008-.008.008-3-3,.008-.008L7.761,8.865l3-3,5.982,5.982L22.721,5.87l3,3Z" transform="translate(17.851 -7.761) rotate(90)"/>
                </svg>
            </div>
        </div>
        <div className={`bg-white w-full h-auto flex md:flex-row flex-col overflow-hidden ease-in-out duration-300 ${
            info === true ? "h-auto max-h-[700px] sm:px-8 ss:px-3 px-0 mb-16 " : "max-h-0"
        }`}>
            <p className='ll:text-[15px] sm:text-[14px] text-[12px] font-Poppins m-4'>1.  korzystasz z konfiguratora widoku
                w którym masz do dyspozycji wybór 
                wszelakich cech strony, jej ogólny styl 
                i temat. Podajesz informacje 
                przydatne przy jej tworzeniu, np. czy masz 
                już wykupiony hosting i w jaki sposób 
                będziesz chciał sie dogadywać
            </p>
            <p className='ll:text-[15px] sm:text-[14px] text-[12px] font-Poppins m-4'>
                2. Po ukończeniu konfiguracji strony dogadujemy sie 
                (mailowo / Messenger w zależności wygody klienta)
                odnośnie potwierdzenia zlecenia i dalszych 
                kroków z tym związanych. 
            </p>
            <p className='ll:text-[15px] sm:text-[14px] text-[12px] font-Poppins m-4'>
                3. Współpracując z nami masz 100% transparentność 
                odnośnie wykonanej pracy. Jako nieliczni dajemy dostęp
                do na bieżąco aktualizowanej bazy plików strony
                na GitHubie wraz z projektami designu UI/UX do potwierdzenia.
                Staramy się dopasowywać jak to tylko możliwe do 
                stylu i ogólnego wyglądu strony według zaleceń klienta. 
                Utrzymujemy stały kontakt by nic nie zostało pominięte albo 
                zrobienie błędnie oczekiwać klienta
            </p>
        </div>
        <div style={{backgroundColor: localpallete[0].color}} className='py-4 flex ss:flex-row flex-col w-full ll:justify-center justify-between ll:px-0 px-8 relative rounded-full mb-5'>
            <div className='flex ss:mr-8 relative items-center'>
                <img src={Createuplogo} className='color-white pr-6 sm:scale-[1] scale-[0.7]'/>
                <p className='font-bold font-Poppins xl:text-[28px] lg:text-[24px] md:text-[18px] sm:text-[16px] text-[13px] ss:static absolute ss:w-auto w-full justify-center flex items-center text-white'>CreateUp</p>
            </div>
            <div className='flex ll:h-full items-center ss:justify-end ss:mt-0 mt-3 justify-center ll:right-10 top-0 ll:absolute'>
                <p className='font-Poppins lg:text-[14px] sm:text-[12px] text-[10px] text-white '>ⓒ 2023 | Wszystkie prawa zastrzeżone</p>
            </div>
            
        </div>
    </div>
    
  )
}

export default Footer