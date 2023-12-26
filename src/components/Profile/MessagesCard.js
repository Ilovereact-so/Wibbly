import React from 'react'

const MessagesCard = () => {
  return (
    <div id="promt" className='w-full h-auto min-h-[450px] p-[20px] rounded-[50px] mb-[50px]'>
      <div className='flex flex-col w-full h-full justify-between'>
        <div className='h-auto w-full flex flex-col items-center px-[40px]'>
          <p className='font-Poppins text-white text-[23px] font-bold mb-3'>Wiadomości</p>
          <hr className='h-[2px] w-full mx-3 bg-white'/>
        </div>
        <form className='w-full h-auto bg-white flex justify-center rounded-full'>
            <input type='text' placeholder='send message..' className='bg-[#E6E6E6] w-full py-3 px-3 pl-5 my-3 ml-6 outline-none placeholder:text-[#737373] mr-2 rounded-full text-[#737373] font-Popins text-[14px]'></input>
            <button type="submit" className='min-w-[45px] h-auto bg-[black] rounded-full my-3 mr-6 flex items-center justify-center hover:brightness-75 cursor-pointer'><i className='gg-arrow-down rotate-[-90deg] scale-[0.9] text-white'></i></button>
        </form>
      </div>
    </div>
  )
}

export default MessagesCard