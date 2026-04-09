import { Card, Modal,Button } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const OvewViewPage = () => {
  const [isModalOpen,setIsModalOpen]=useState(false);
    const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const [category,setCategory]=useState("")

  useEffect(()=>{
    
    const fetchCategory=async()=>{
      const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/quiz/topics/${category}`)
      console.log(res.data)
    }
    fetchCategory()
  },[category])

  return (
    <div className='mx-auto h-screen flex items-center justify-center gap-10'>
      <Card onClick={()=>setCategory("backend")} className='w-[500px] p-10 rounded-3xl shadow-lg  text-2xl font-bold uppercase text-center cursor-pointer hover:scale-105 transition-all duration-300'>
        BackEnd
      </Card>
      <Card  onClick={()=>setCategory("frontend")} className='w-[500px] p-10 rounded-3xl shadow-lg text-2xl font-bold  uppercase text-center cursor-pointer hover:scale-105 transition-all duration-300'>
        FrontEnd
      </Card>
       
 <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal>
        salam
      </Modal>
    </div>
  )
}

export default OvewViewPage