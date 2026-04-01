import { Box } from '@mui/material'
import { Input } from 'antd'
import useSelection from 'antd/es/table/hooks/useSelection'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Me } from '../../redux/features/authSlice'

const Profile = () => {
    const dispatch=useDispatch();
    const user=useSelector((state)=>state.authReducer.user);
    console.log(user);
    
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("");

    useEffect(()=>{
        dispatch(Me());
        
    },[])
    
  return (
    <div className='mx-auto text-center items-center flex flex-col'>
        <Box className="w-[500px] h-[600px] items-center justify-center flex flex-col gap-5">
                <Input placeholder="default size"  value={user?.username} onChange={(e)=>{setUserName(e.target.value)}}/>
                <Input placeholder="default size" value={user?.email} onChange={(e)=>{setEmail(e.target.value)}}/>
           

        </Box>
    </div>
  )
}

export default Profile