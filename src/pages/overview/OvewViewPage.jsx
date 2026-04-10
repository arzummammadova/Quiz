import React, { useState } from 'react';
import { Card, Button, Progress, ConfigProvider, theme, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const { Title, Text } = Typography;

const OvewViewPage = () => {

  const navigate=useNavigate();

  const getCategories=async(category)=>{
    const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/quiz/topics/${category}`);
    console.log(res.data);
    navigate(`/quiz/${category}`);
  }

 

  return (
    <div className='mx-auto h-screen flex items-center justify-center gap-10'>
      <Card onClick={()=>{getCategories("backend")}} className='w-[500px] p-10 rounded-3xl shadow-lg  text-2xl font-bold uppercase text-center cursor-pointer hover:scale-105 transition-all duration-300'>
        BackEnd
      </Card>
      <Card onClick={()=>{getCategories("frontend")}} className='w-[500px] p-10 rounded-3xl shadow-lg text-2xl font-bold  uppercase text-center cursor-pointer hover:scale-105 transition-all duration-300'>
        FrontEnd
      </Card>
    </div>
  )
}

export default OvewViewPage;