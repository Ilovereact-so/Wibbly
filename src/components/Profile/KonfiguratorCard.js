import React from 'react'

const KonfiguratorCard = () => {
  return (
    <div id="promt" className='w-full h-auto min-h-[450px] py-[30px] px-[40px] rounded-[50px] mb-[50px]'>
      <div className='h-full filter'>
        <div className='flex flex-col justify-between h-full'>
            <div>
                <p className='font-Poppins text-[40px] font-bold text-white pb-2'>Konfigurator</p>
                <p className='font-Poppins text-[17px] text-white'>stwórz swój projekt strony</p>
            </div>
            <div className='font-Poppins text-[19px] text-black font-bold bg-white p-4 text-center rounded-full mb-2'>Get Started</div>
        </div>
      </div>
  </div>
  )
}

export default KonfiguratorCard