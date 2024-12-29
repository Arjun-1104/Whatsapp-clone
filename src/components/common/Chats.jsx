import React, { useEffect, useState } from 'react'
import { ImFolderDownload } from 'react-icons/im'
import { chatsData } from '../../data/data';
import Chat from './Chat'
import { getAllUser } from '../../utils/userHandler';
import { useSocketContext } from '../../context/socketContext';

const Chats = ({filter}) => {
  let [chats,setChats] = useState([]);
  const { onlineUsers } = useSocketContext();

  useEffect(()=>{
    const setData = async()=>{
      console.log("fetching chats.")
      try {
        let res = await getAllUser();
        console.log(res)        
        setChats(res);
      } catch (e) {
        console.log("error in fetching chats ", e);
      }
    }
    setData();
  },[])

  
  useEffect(()=>{
    let newchats = filter?chats.filter((chat)=> chat.unreadMsgs):chatsData;
    setChats(newchats)
  },[filter])

  return (
    // chats main container
    <div className='flex flex-col overflow-y-scroll cursor-pointer h-100'>
        {/* archived container */}
        <div className='flex justify-between items-center w-100 min-h-[55px] px-3 hover:bg-[#202d33]'>
            {/* icons and text container */}
            <div className='flex justify-around items-center w-[150px]'>
                {/* icon */}
                <span className='text-emerald-500 text-lg'>
                    <ImFolderDownload/>
                </span>
                <h6 className='text-white'>Archived</h6>
            </div>
            {/* number of archived chats */}
            <p className='text-emerald-500 text-xs font-light'>7</p>
        </div>

      {/* chat single */}
      {chats.length > 0  && chats.map((chatDetails,i) =>{
        return (
          <Chat 
            key={chatDetails._id} 
            chatDetails={chatDetails}
            active={i===1}
            isOnline = {onlineUsers.find((id)=>id===chatDetails._id)}
            ></Chat>
        )
      } )}
    </div>
  )
}

export default Chats;
