import { Box, duration } from '@mui/material'
import { Button, Input } from 'antd'
import useSelection from 'antd/es/table/hooks/useSelection'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Me, updateProfile } from '../../redux/features/authSlice'
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Toast } from 'arzu-toast-modal'
import { Navigate, useNavigate } from 'react-router-dom'

const Profile = () => {
    const dispatch=useDispatch();
    const user=useSelector((state)=>state.authReducer.user);
    console.log(user);
    const navigate=useNavigate()

    
    
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("");

    useEffect(()=>{
        dispatch(Me());
        
    },[])


    const handleUpdateUser=()=>{
      dispatch(updateProfile({username,email}))
      dispatch(Me());
      alert("succes")
      
      showToast({
        type:"succes",
        title:"succes",
        duration:4000,
        position:"top-right",
        message:"Profile updated successfully"
      })
    }
    
  return (
    <div className='mx-auto text-center items-center flex flex-col'>
      <Button onClick={()=>{navigate(-1)}}>
        Back
      </Button>
        <Box className="w-[500px] h-[600px] items-center justify-center flex flex-col gap-5">
                  <Avatar size={64} icon={<UserOutlined />} />

                <Input type='text'  placeholder="default size"  value={username} onChange={(e)=>{setUserName(e.target.value)}}/>
          
                <Input className='text-white ' disabled type='email' placeholder="default size" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

              <Button onClick={handleUpdateUser}>Update  profile</Button>
           

        </Box>
    </div>
  )
}

export default Profile