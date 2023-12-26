import React, { useEffect, useState } from 'react'
import { decodeToken } from 'react-jwt';

const SettingsCard = () => {
  const [logged, setLogged] = useState(localStorage.getItem('rt'))
  const [localpallete, setLocalpallete] = useState(JSON.parse(localStorage.getItem('Pallete')))
  function user() {
    if(logged != null){
        const myDecodedToken = decodeToken(logged);
        //console.log(myDecodedToken)
        return myDecodedToken
    }
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

  return (
    <div className='w-full h-auto min-h-[520px] p-[60px] rounded-[50px] mb-[50px] bg-white'>
      <div className='flex flex-col justify-between h-full'>
          <div>
              <p className='font-Poppins text-[32px] font-bold mt-1 text-black'>Ustawienia</p>
              <p style={{color: localpallete[3].color}} className='font-Poppins text-[17px]'>zadbaj o to co chcesz</p>
              <div className='mt-[40px]'>
                <p className='font-Poppins text-[17px] text-black font-bold'>Zmień <span className='font-[400]'>email</span></p>
                <input placeholder={user()?.email}  autoCapitalize='off' type='email' autoCorrect='off' className='w-full h-[50px] bg-[#E1E1E1] mt-2 font-Poppins rounded-full text-center'/>
              </div>
              <div className='mt-4'>
                <p className='font-Poppins text-[17px] text-black font-bold'>Zmień <span className='font-[400]'>nazwę urzytkownika</span></p>
                <input placeholder={user()?.username}  autoCapitalize='off' type="text" autoCorrect='off' className='w-full bg-[#E1E1E1] h-[50px] mt-2 font-Poppins rounded-full text-center'/>
              </div>
              
          </div>
          <div className='flex  justify-center'>
                <div style={{backgroundColor: localpallete[1].color}} className='font-Poppins text-white p-4 w-[150px] rounded-full text-center font-bold text-[17px]'>Zapisz</div>
          </div>
          
      </div>
    </div>
  )
}

export default SettingsCard