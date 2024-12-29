import React from 'react'
import { useAuth } from '../../context/AuthContext';



const Chat = ({chatDetails, isOnline}) => {

    const {selectedUser , setSelectedUser} = useAuth();
    let {profilePic,fullName,
        createdAt,_id, unreadMsgs
        } = chatDetails;
    
  return (
    <div onClick={()=>setSelectedUser(chatDetails)} className={`flex justify-between items-center cursor-pointer w-100 h-[85px] px-4 hover:bg-[#202d33] ${selectedUser?._id === _id && 'bg-[#202d33]'}`}>
        <div className="relative flex items-center">
            {isOnline && (
                <div className="absolute top-0 right-2 w-3 h-3 bg-green-500 rounded-full"></div>
            )}
            <img
                src={profilePic}
                alt="profile-picture"
                className="w-[50px] rounded-full mr-5"
            />
        </div>

        <div className='flex justify-between w-100 h-100 py-3'>
            <div className='flex flex-col justify-between text-white gap-1'>
                <span className='font-medium'>{fullName}</span>
                <span className={`text-sm ${true? 'text-neutral-400':'text-white'}`}>{'last message'}</span>
            </div>
            <div className='text-white flex flex-col justify-between items-end h-100 text-xs'>
                <span className='text-emerald-500 min-w-[55px]'>{
createdAt
}</span>
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
