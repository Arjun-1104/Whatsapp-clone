import React from 'react'
import RoundedBtn from './common/RoundedBtn'
import { MdSearch } from 'react-icons/md'
import { HiDotsVertical, HiOutlinePaperClip } from 'react-icons/hi'
import { BiHappy } from 'react-icons/bi'
import {cs1} from '../assets/whatsapp'
import { BsFillMicFill } from 'react-icons/bs'

const ChatDetail = () => {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex justify-between bg-[#202d33] p-3 h-[60px]'>
        <div className='flex items-center'>
            <img src={cs1} alt="chat-heading-picture" className='w-[45px] h-[45px] mr-5'/>
            <div className='flex flex-col mt-3'>
              <p className='text-white font-medium mb-0'>spot image</p>
              <p className='text-[#8796a1] text-xs'>online</p>
            </div>
        </div>
        <div className='flex justify-between items-center w-[85px]'>
          <RoundedBtn icon={<MdSearch/>}></RoundedBtn>
          <RoundedBtn icon={<HiDotsVertical/>}></RoundedBtn>
        </div>
      </div>

      {/* message section */}
      <div className='h-100 bg-[#0a131a] bg-[url("../assets/images/bg.webp")] bg-contain overflow-y-scroll py-3'>


      </div>


      <div className='flex items-center bg-[#202d33] w-100 h-[70px] p-2'>
        <RoundedBtn icon={<BiHappy/>}/>
        <span>
          <RoundedBtn icon={<HiOutlinePaperClip/>}/> 
        </span>

        <input type="text" placeholder='Type a masssage' className='bg-[#2c3943] rounded-lg outline-none text-sm text-neutral-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#8796a1]' />
        <span>
          <RoundedBtn icon={<BsFillMicFill/>}/> 
        </span>
      </div>
    </div>  
  )
}

export default ChatDetail
