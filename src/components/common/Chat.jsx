import React from 'react'

const Chat = ({chatDetails}) => {
    let {pp,contact,msg,time,unreadMsgs,active} = chatDetails;

  return (
    <div className={`flex justify-between items-center cursor-pointer w-100 h-[85px] px-4 hover:bg-[#202d33] ${active && 'bg-[#202d33]'}`}>
        <img src={pp} alt="pofile-picture" className='w-[50px] rounded-full mr-5'/>

        <div className='flex justify-between w-100 h-100 py-3'>
            <div className='flex flex-col justify-between text-white gap-1'>
                <span className='font-medium'>{contact}</span>
                <sapn className={`text-sm ${unreadMsgs? 'text-neutral-400':'text-white'}`}>{msg}</sapn>
            </div>
            <div className='text-white flex flex-col justify-between items-end h-100 text-xs'>
                <span className='text-emerald-500 min-w-[55px]'>{time}</span>
                {unreadMsgs && (
                    <div className='flex justify-center items-center bg-emerald-500 rounded-full w-[20px] h-[20px]' >
                        <p className='text-emerald-900 fw-bold mb-0'>{unreadMsgs}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Chat
