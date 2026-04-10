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
  const [password, setPassword] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    github: ""
  });

  useEffect(() => {
    dispatch(Me());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUserName(user.username || "");
      setBio(user.bio || "");
      setSocialLinks({
        instagram: user.socialLinks?.instagram || "",
        github: user.socialLinks?.github || ""
      });
    }
  }, [user]);

  const handleUpdateUser = async () => {
    const data = { username, bio, socialLinks };
    if (password) data.password = password;

    const actionResult = await dispatch(updateProfile(data));

    if (updateProfile.fulfilled.match(actionResult)) {
      showToast({
        type: 'success',
        title: 'UĞURLU',
        message: 'Profil məlumatları yeniləndi',
        duration: 4000,
        position: 'top-right',
      });
      setPassword(""); 
      dispatch(Me());
    } else {
      showToast({
        type: 'error',
        title: 'XƏTA',
        message: actionResult.payload || 'Yenilənmə zamanı xəta baş verdi',
        duration: 4000,
        position: 'top-right',
      });
    }
  }

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#16171d]'>
      
      <div className="w-full max-w-[750px] mb-4 flex justify-start">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="text-white bg-transparent border-transparent hover:!bg-transparent hover:!border-white/40 px-6 flex items-center transition-all duration-300"
          style={{ 
            color: 'white',
            borderWidth: '2px',
            borderStyle: 'solid',
            height: '45px',
            borderRadius: '14px'
          }}
        >
          GERİ
        </Button>
      </div>

      <Card
        className='w-full max-w-[750px] rounded-[3.5rem] border-none shadow-2xl'
        style={{
          background: '#fffdfa', 
          padding: '10px'
        }}
      >
        <Flex vertical gap="middle" className="pt-2">
          
          <div className="flex flex-col items-center relative py-2">
            <div className="absolute top-2 left-40 w-3 h-3 bg-pink-200 rounded-full"></div>
            <div className="absolute bottom-2 right-40 w-5 h-5 bg-cyan-100 rounded-full opacity-60"></div>

            <div className="relative p-1.5 bg-gradient-to-tr from-pink-200 via-purple-100 to-cyan-100 rounded-full">
              <Avatar
                size={90}
                icon={<SmileOutlined />}
                className="bg-white text-pink-300 border-4 border-white shadow-sm"
              />
            </div>
            <Title level={3} className="mt-2 mb-0 !font-black !text-gray-800 tracking-tight">
              PROFİLİM
            </Title>
            <Text className="text-gray-400 font-medium">Hesab məlumatlarını yeniləyin</Text>
          </div>

          <div className="flex flex-col gap-5 px-10">
            <div>
              <label className="block mb-2 ml-4 text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">E-POÇT ÜNVANI</label>
              <Input 
                size="large"
                prefix={<MailOutlined className="text-pink-300" />}
                value={user?.email || ""}
                disabled
                className='rounded-full bg-gray-50 border-none h-12 text-gray-400 shadow-inner px-6'
              />
            </div>

            <Flex gap="large">
              <div className="flex-1">
                <label className="block mb-2 ml-4 text-[10px] font-black uppercase tracking-[0.15em] text-pink-400">İSTİFADƏÇİ ADI</label>
                <Input
                  prefix={<EditOutlined className="text-pink-400" />}
                  size="large"
                  placeholder="Yeni istifadəçi adı daxil edin"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="rounded-full border-2 border-pink-50 h-12 hover:border-pink-200 focus:border-pink-300 transition-all bg-white px-6 text-gray-700 shadow-sm font-bold"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2 ml-4 text-[10px] font-black uppercase tracking-[0.15em] text-purple-400">ŞİFRƏ</label>
                <Input.Password
                  prefix={<LockOutlined className="text-purple-400" />}
                  size="large"
                  placeholder="Yeni şifrə daxil edin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-full border-2 border-purple-50 h-12 hover:border-purple-100 focus:border-purple-200 transition-all bg-white px-6 shadow-sm"
                />
              </div>
            </Flex>

            <div>
              <label className="block mb-2 ml-4 text-[10px] font-black uppercase tracking-[0.15em] text-cyan-500">HAQQIMDA</label>
              <Input.TextArea
                size="large"
                placeholder="Özünüz haqqında məlumat verin"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="rounded-[2rem] border-2 border-cyan-50 hover:border-cyan-100 focus:border-cyan-200 transition-all bg-white px-6 pt-3 text-gray-700 shadow-sm"
              />
            </div>

            <Divider className="!my-0 border-gray-100">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">SOSİAL MEDİA</span>
            </Divider>

            <Flex gap="middle">
              <Input
                prefix={<img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="IG" style={{ width: 22 }} />}
                placeholder="INSTAGRAM URL"
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                className="rounded-full border-2 border-gray-50 hover:border-pink-200 bg-white shadow-sm h-12 px-5 flex-1"
              />
              <Input
                prefix={<img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GH" style={{ width: 22 }} />}
                placeholder="GITHUB URL"
                value={socialLinks.github}
                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                className="rounded-full border-2 border-gray-50 hover:border-purple-200 bg-white shadow-sm h-12 px-5 flex-1"
              />
            </Flex>
          </div>

          <div className="px-10 pb-4 mt-2">
            <Button
              type="primary"
              size="large"
              block
              loading={isLoading}
              onClick={handleUpdateUser}
              className="h-14 rounded-2xl font-black text-lg border-transparent"
              style={{ 
                color: 'white',
                border: 'none' 
              }}
            >
              YADDA SAXLA
            </Button>
          </div>
        </Flex>
      </Card>
    </div>
  )
}

export default Profile;