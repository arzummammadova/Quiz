import React, { useState } from 'react';
import { Card, Button, Progress, ConfigProvider, theme, Typography } from 'antd';


const { Title, Text } = Typography;

const OvewViewPage = () => {

 

  return (
    <div className='mx-auto h-screen flex items-center justify-center gap-10'>
      <Card className='w-[500px] p-10 rounded-3xl shadow-lg  text-2xl font-bold uppercase text-center cursor-pointer hover:scale-105 transition-all duration-300'>
        BackEnd
      </Card>
      <Card className='w-[500px] p-10 rounded-3xl shadow-lg text-2xl font-bold  uppercase text-center cursor-pointer hover:scale-105 transition-all duration-300'>
        FrontEnd
      </Card>
    </div>
  )
}

export default OvewViewPage;