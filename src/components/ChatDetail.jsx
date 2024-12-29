import React, { useState, useEffect } from "react";
import RoundedBtn from "./common/RoundedBtn";
import { MdSearch } from "react-icons/md";
import { HiDotsVertical, HiOutlinePaperClip } from "react-icons/hi";
import { BiHappy } from "react-icons/bi";
import { cs1 } from "../assets/whatsapp";
import { BsFillMicFill } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../utils/userHandler";
import { useNavigate } from "react-router-dom";
import { getMessage, sendMessage } from "../utils/messageHandler";
import moment from "moment";
import { useSocketContext } from "../context/socketContext";
import useListenMessages from "../utils/useListenMessage";


const ChatDetail = () => {
  const [userInput, setUserInput] = useState("");
  const { selectedUser ,user ,setUser} = useAuth();
  const  {socket ,messages, setMessages}  = useSocketContext();
  const navigate = useNavigate();
  useListenMessages();

  const handelSubmit = async (e) => {
    
    e.preventDefault();
    if (!userInput.trim()) return;
    
    
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: userInput, time: moment().format("hh:mm A"), status: "seen", isUser: true },
    ]);


    await sendMessage(userInput, selectedUser._id);
    setUserInput("");
    

  };

  

  const handleInp = (e) => {
    handleTyping();
    setUserInput(e.target.value);
  };
  const handleLogout = async()=>{
    try{
      await logoutUser();
      setUser(null);
      navigate("/login");
    }
    catch(e)
    {
      console.log("error in log out" ,e);
    }
  }

  const getOldMessagesData = async()=>{
    let fetchedMessages = await getMessage(selectedUser._id);

    const formattedMessages = fetchedMessages.map((msg) => ({
      message: msg.message,
      time: moment(msg.createdAt).format("hh:mm A"),
      status: "delivered", 
      isUser: msg.senderId === user._id, 
    }));

    setMessages((prevMessages) => [...prevMessages, ...formattedMessages]);
  }

  useEffect(()=>{
    // console.log("current user -> ",user.fullName, user.username);
    // console.log("Opponent user -> ",selectedUser?.fullName, selectedUser?.username);
    setMessages([]);

    if(selectedUser) getOldMessagesData();

  },[selectedUser])

  // useEffect(() => {
  //   console.log("socket from chatDetails  : ", socket);
  //   if (socket) {
  //     socket?.on("typing", (senderId) => {
  //       if (senderId === selectedUser._id) {
  //         setIsTyping(true);
  //         setTimeout(() => setIsTyping(false), 2000); // Typing disappears after 2 seconds
  //       }
  //     });
  //     socket?.on('onlineUsers', (users) => {
  //       // setOnlineUsers(users);
  //       console.log("users from socket : ", users);
  //     });
  
  //   }
  
  //   return () => {
  //     if (socket) socket.off("typing");
  //     if (socket) socket.off("onlineUsers");
  //   };
  // }, [socket, selectedUser]);
 
  const handleTyping = () => {
    if (socket) {
      socket.emit("typing", { senderId: user._id, receiverId: selectedUser._id });
    }
  };

  return (
    <>
      {selectedUser ? (
        <div className="flex flex-col h-screen">
          <div className="flex justify-between bg-[#202d33] p-3 h-[60px]">
            <div className="flex items-center">
              <img
                src={selectedUser.profilePic}
                alt="chat-heading-picture"
                className="w-[45px] h-[45px] mr-5"
              />
              <div className="flex flex-col mt-3">
                <p className="text-white font-medium mb-0">
                  {selectedUser.fullName}
                </p>
                <p className="text-[#8796a1] text-xs">{selectedUser.active}</p>
              </div>
            </div>
            <div className="flex justify-between items-center w-[85px]">
              <RoundedBtn icon={<MdSearch />} />
              <button onClick={handleLogout}><RoundedBtn icon={<HiDotsVertical />} /></button>
            </div>
          </div>

          {/* Message Section */}
          <div className="h-full space-y-3 bg-[#0a131a] bg-[url('../assets/images/bg.webp')] bg-contain overflow-y-scroll py-3">
            {messages.length > 0 ? (
              messages.map((ele, index) =>
                ele.isUser ? (
                  <div
                    key={index}
                    className="chat text-end px-4 flex justify-end"
                  >
                    <div className="chatbox w-fit p-2 rounded-md bg-emerald-600 flex">
                      <span className="text-white">{ele.message}</span>
                      <div className="time flex flex-col ">
                        <span className="text-xs text-emerald-600 ">hello</span>
                        <span className="text-xs font-light flex mx-2 space-x-1 text-gray-300">
                          {ele.time}
                          <span>
                            <TiTick
                              className={`${
                                ele.status === "seen"
                                  ? "text-blue-400"
                                  : "text-black"
                              }`}
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="chat text-start px-4 flex justify-start"
                  >
                    <div className="chatbox w-fit p-2 rounded-md bg-gray-600 flex">
                      <span className="text-white">{ele.message}</span>
                      <div className="time flex flex-col ">
                        <span className="text-xs text-gray-600 ">hello</span>
                        <span className="text-xs font-light flex mx-2 space-x-1 text-gray-300">
                          {ele.time}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <div>hello ji</div>
            )}
          </div>

          <form
            onSubmit={handelSubmit}
            className="flex items-center bg-[#202d33] w-full h-[70px] p-2"
          >
            <RoundedBtn icon={<BiHappy />} />
            <RoundedBtn icon={<HiOutlinePaperClip />} />
            <input
              type="text"
              value={userInput}
              onChange={handleInp}
              placeholder="Type a messsage"
              className="bg-[#2c3943] rounded-lg outline-none text-sm text-neutral-200 w-full h-full px-3 placeholder:text-sm placeholder:text-[#8796a1]"
            />
            <button type="submit">
              <RoundedBtn icon={<IoSendSharp />} />
            </button>
            <RoundedBtn icon={<BsFillMicFill />} />
          </form>
        </div>
      ) : (
        <div className="bg-[#222E35] h-screen flex justify-center items-center ">
          <div className="main flex flex-col text-white text-center space-y-7">

          <div className=" mx-auto">
            <img className="h-50 w-50 mx-auto" src="https://static.whatsapp.net/rsrc.php/v4/y6/r/wa669aeJeom.png" alt="" />
          </div>
          <span className="text-3xl text-gray-300">Download Whatsapp for Windows</span>
          <div className="w-3/4 mx-auto text-center">
            <span className="text-sm text-gray-400">Make calls, share your screen and get a faster experience when you download the windows app</span></div>

          <div className="text-center"><button className="py-2 px-3 text-sm w-fit font-bold bg-[#00A884] hover:bg-[#123b32] text-gray-900 rounded-full">Get from Microsoft Store</button></div>
        </div>
          </div>
      )}
    </>
  );
};

export default ChatDetail;
