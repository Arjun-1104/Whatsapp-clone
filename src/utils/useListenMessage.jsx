import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";

import notificationSound from "../../public/new-message-sound.mp3";
import moment from "moment";

const useListenMessages = () => {

	const { socket } = useSocketContext();
	// const { messages, setMessages } = useConversation();
    const {message ,setMessages} = useSocketContext();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
            console.log("message from socket : ", newMessage.message);

            
                const formattedMessages = {
                  message: newMessage.message,
                  time: moment(newMessage.createdAt).format("hh:mm A"),
                  status: "delivered", 
                  isUser: false, 
                }
            
                setMessages((prevMessages) => [...prevMessages, formattedMessages]);
                // newMessage.shouldShake = true;
                const sound = new Audio(notificationSound);
			    sound.play();
			// setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket]);
};
export default useListenMessages;