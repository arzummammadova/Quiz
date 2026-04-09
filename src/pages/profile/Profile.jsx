import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  Button, 
  Input, 
  Avatar, 
  Flex, 
  Card, 
  Typography 
} from 'antd'
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  FacebookOutlined, 
  InstagramOutlined, 
  GithubOutlined, 
  LockOutlined,
  UserOutlined,
  MailOutlined
} from '@ant-design/icons'
import { Me, updateProfile } from '../../redux/features/authSlice'
import { useToast } from 'arzu-toast-modal'

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
    facebook: "",
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
        facebook: user.socialLinks?.facebook || "",
        instagram: user.socialLinks?.instagram || "",
        github: user.socialLinks?.github || ""
      });
    }
  }, [user]);

  const handleUpdateUser = async () => {
    const data = {
      username,
      bio,
      socialLinks
    };
    
    if (password) {
      data.password = password;
    }

    const actionResult = await dispatch(updateProfile(data));

    if (updateProfile.fulfilled.match(actionResult)) {
      showToast({
        type: 'success',
        title: 'Uğurlu',
        message: 'Profil məlumatları yeniləndi',
        duration: 4000,
        position: 'top-right',
      });
      setPassword(""); // Clear password field after update
      dispatch(Me());
    } else {
      showToast({
        type: 'error',
        title: 'Xəta',
        message: actionResult.payload || 'Yenilənmə zamanı xəta baş verdi',
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
            <Title level={3} className="m-0 text-gray-800">Profil Məlumatları</Title>
            <Text type="secondary">Manage your account settings</Text>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
              <Input 
                size="large"
                prefix={<MailOutlined className="text-gray-400" />}
                value={user?.email}
                disabled
                className='rounded-lg bg-gray-50'
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">İstifadəçi adı</label>
              <Input
                prefix={<EditOutlined className="text-gray-400" />}
                size="large"
                placeholder="İstifadəçi adını dəyiş"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Yeni Şifrə (məcburi deyil)</label>
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                size="large"
                placeholder="Yeni şifrə daxil edin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Bio</label>
              <Input.TextArea
                size="large"
                placeholder='Haqqınızda məlumat'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
              />
            </div>

            <div className="border-t pt-4 mt-2">
              <Title level={5} className="mb-3 text-gray-700">Sosial Linklər</Title>
              <Flex vertical gap="middle">
                <div>
                  <Input
                    prefix={<FacebookOutlined className="text-[#1877F2]" />}
                    placeholder="Facebook link"
                    value={socialLinks.facebook}
                    onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Input
                    prefix={<InstagramOutlined className="text-[#E4405F]" />}
                    placeholder="Instagram link"
                    value={socialLinks.instagram}
                    onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Input
                    prefix={<GithubOutlined className="text-[#333]" />}
                    placeholder="GitHub link"
                    value={socialLinks.github}
                    onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                    className="rounded-lg"
                  />
                </div>
              </Flex>
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
            {isLoading ? 'Yenilənir...' : 'Profili Yenilə'}
          </Button>
        </Flex>
      </Card>
    </div>
  )

}

export default Profile