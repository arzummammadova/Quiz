import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Me, updateProfile } from '../../redux/features/authSlice'
import { Avatar, Flex } from 'antd';
import { FacebookOutlined, InstagramOutlined, UserOutlined } from '@ant-design/icons';
import { useToast } from 'arzu-toast-modal'
import { useNavigate } from 'react-router-dom'
import { Card, Typography } from 'antd'
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'

const { Title, Text } = Typography;

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const { isLoading } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [sosialLinks, setSosialLinks] = useState({
    facebook: "",
    instagram: ""
  })


  useEffect(() => {
    dispatch(Me());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUserName(user.username || "");
      setBio(user.bio || "")
    }
  }, [user]);

  const handleUpdateUser = async () => {
    const actionResult = await dispatch(updateProfile({ username, bio }));

    if (updateProfile.fulfilled.match(actionResult)) {
      showToast({
        type: 'success',
        title: 'Success',
        message: 'Profile updated successfully',
        duration: 4000,
        position: 'top-right',
      });
      dispatch(Me());
    } else {
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to update profile',
        duration: 4000,
        position: 'top-right',
      });
    }
  }

  return (
    <div className='mx-auto min-h-screen flex flex-col items-center justify-center p-4'>
      <div className="w-full max-w-[450px] mb-4 flex justify-start">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="text-white hover:!bg-white/10 hover:!text-white transition-all duration-300"
          style={{ color: 'white' }}
        >
          Back
        </Button>
      </div>

      <Card
        className='w-full max-w-[450px] p-6 rounded-3xl shadow-2xl'
        style={{
          background: '#ffffff',
          border: 'none'
        }}
      >
        <Flex vertical gap="large" style={{ width: '100%' }}>
          <div className="flex flex-col items-center">
            <Avatar
              size={84}
              icon={<UserOutlined />}
              className="bg-blue-500 mb-4 shadow-md"
            />
            {/* <Title level={3} className="m-0 text-gray-800">{user.username}Profile</Title> */}
            <Text type="secondary">Manage your account settings</Text>
          </div>

          <div className="w-full">

            <label className="block mb-2 font-semibold text-gray-700">Email</label>
            <Input
              size="large"
              value={user?.email}
              disabled
              className='rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500'
            />
            <label className="block mb-2 font-semibold text-gray-700">Username</label>
            <Input
              prefix={<EditOutlined className="text-gray-400" />}
              size="large"
              placeholder="Change your username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
            />

            <label className=''>Bio</label>
            <Input
              size="large"
              placeholder='Your bio'
              value={bio}
              onChange={(e) => setBio(e.target.value)}


            />

            <label>Sosial Links</label>
            <div className="flex flex-col gap-4  py-2 ">
              <Input
              prefix={<InstagramOutlined className="text-gray-400" />}
              size='large'
              placeholder='Instagram'
              onChange={(e)=>(setSosialLinks({...sosialLinks,instagram:e.target.value}))}
              value={sosialLinks.instagram}
              className='rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500'
              />

              <Input prefix={<FacebookOutlined className="text-gray-400" />}
              size='large'
              placeholder='Facebook'

              onChange={(e)=>(setSosialLinks({...sosialLinks,facebook:e.target.value}))}
              value={sosialLinks.facebook}
              className='rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-5000'

           
              />
            </div>


          </div>

          <Button
            type="primary"
            size="large"
            block
            loading={isLoading}
            onClick={handleUpdateUser}
            className="h-12 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-lg border-none"
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </Button>
        </Flex>
      </Card>
    </div>
  )

}

export default Profile