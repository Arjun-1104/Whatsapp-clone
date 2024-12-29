import axios from "axios";

export async function sendMessage(message,id){
    
    console.log(message, id);
    try {
        let res = await axios.post(`http://localhost:7896/api/messages/send/${id}`, {message},{
            withCredentials : true,
        });
        console.log("response from saveMessages : ", res, res.data);
        return res;
    } catch (e) {
        console.log(e?.message);
        return null;
    }

}

export async function getMessage(id){
    
    console.log(id);
    try {
        let res = await axios.get(`http://localhost:7896/api/messages/${id}`,{
            withCredentials : true,
        });
        // console.log(res, res.data);
        return res.data.messages;
    } catch (e) {
        console.log(e?.message);
        return null;
    }

}
