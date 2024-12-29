import React, { useEffect } from 'react'
import LeftMenu from '../components/LeftMenu'
import ChatDetail from '../components/ChatDetail'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { getUser } from '../utils/userHandler';




const Whatsapp = () => {

  let navigate = useNavigate();
  
  const { user , setUser} = useAuth();

  const setUserData = async()=>{
    // console.log("useEffect from whatsapp : " , user);
    if(!user)
    {
      try {
        let res = await getUser();
        // console.log(res)
        setUser(res);
        navigate('/')
      } catch (e) {
        console.log("some error occured in api.jsx : ", e)
        navigate('/login');
      }
    }
    else{
      navigate('/')
    }
  }

  useEffect(()=>{
    setUserData();
  },[])
  useEffect(()=>{
    if(!user)
        navigate('/login');
  },[user])
  
  return (
    // main container
    <div className='w-screen h-screen overflow-hidden'>
        {/* components container */}
        <div className='flex justify-start whatsapp-bp:justify-center items-center bg-[#111a21] h-screen'>
            {/* left menu */}
            <div className='bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100'>
                <LeftMenu/>
            </div>
            {/* chat details */}
            <div className='bg-[#222f3f] min-w-[415px] max-w-[1200px] w-100 h-100'>
                <ChatDetail/>
            </div>
        </div>
    </div>
  )
}

export default Whatsapp;
