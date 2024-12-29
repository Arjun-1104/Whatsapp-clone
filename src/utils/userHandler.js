import axios from 'axios';

export async function getUser(){

    
    try {
        let user = await axios.get('http://localhost:7896/api/users/getuser', {
            withCredentials : true,
        });
        return user.data.loggedInUser;
    } catch (e) {
        console.log(e);
        return null;
    }

}

export async function getAllUser(){

    
    try {
        let users = await axios.get('http://localhost:7896/api/users', {
            withCredentials : true,
        });
        return users.data;
    } catch (e) {
        console.log(e);
        return null;
    }

}

export async function registerUser(data){

    console.log(data);
    // try {
    //     let user = await axios.get('http://localhost:7896/api/users/getuser');
    //     return user;
    // } catch (e) {
    //     console.log(e);
    //     return null;
    // }

}

export async function loginUser(data){
    
    console.log(data);
    try {
        let user = await axios.post('http://localhost:7896/api/auth/login', data,{
            withCredentials : true,
            
        });
        
			localStorage.setItem("chat-user", JSON.stringify(user?.data?.user));
            
			// setAuthUser(data);
        return user;
    } catch (e) {
        console.log(e?.message);
        return null;
    }

}

export async function logoutUser(){
    
    
    try {
        let user = await axios.get('http://localhost:7896/api/auth/logout', {
            withCredentials : true
        });
        console.log("logout success", user)
        localStorage.removeItem("chat-user");
        
    } catch (e) {
        console.log(e?.message);
        return null;
    }

}