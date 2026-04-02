import { Box } from '@mui/material'
import { Button, Input, Avatar, Typography, Card } from 'antd' // Добавили Card и Typography для дизайна
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Me, updateProfile } from '../../redux/features/authSlice'
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { showToast } from 'arzu-toast-modal'
import { useNavigate } from 'react-router-dom'

const { Text, Title } = Typography;

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const navigate = useNavigate();

    const [username, setUserName] = useState("");

    // 1. Загружаем данные при входе
    useEffect(() => {
        dispatch(Me());
    }, [dispatch]);

    // 2. ИСПРАВЛЕНИЕ: Синхронизируем локальный стейт с данными из Redux
    // Без этого инпут будет пустым, даже если юзер авторизован
    useEffect(() => {
        if (user?.username) {
            setUserName(user.username);
        }
    }, [user]);

    const handleUpdateUser = () => {
        // ИСПРАВЛЕНИЕ: Убрали email, так как мы его не меняем (и стейта для него нет)
        dispatch(updateProfile({ username }));
        
        // Обновляем данные в стейте
        dispatch(Me());
        
        // Используем твой Toast вместо alert
        showToast({
            type: "success", // Обычно пишется с двумя 's'
            title: "Success",
            duration: 4000,
            position: "top-right",
            message: "Profile updated successfully"
        });
    }
    
    return (
        // Внешний контейнер (предполагаем, что фон страницы черный)
        <div className='min-h-screen flex flex-col items-center justify-center p-4 bg-black'>
            
            <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate(-1)}
                style={{ marginBottom: '20px', color: 'white' }}
                type="text"
            >
                Back
            </Button>

            {/* ДИЗАЙН: Используем белую карточку Ant Design для контраста */}
            <Card 
                style={{ width: 450, borderRadius: '16px', textAlign: 'center' }}
                bodyStyle={{ padding: '40px 30px' }}
            >
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff', marginBottom: '16px' }} />
                
                <Title level={3}>Profile Settings</Title>
                <Text type="secondary">Update your public information</Text>

                <Box className="flex flex-col gap-6 mt-8">
                    <div className='text-left'>
                        <Text strong>Username</Text>
                        <Input 
                            size="large"
                            placeholder="Enter your name" 
                            value={username} 
                            onChange={(e) => setUserName(e.target.value)}
                            style={{ marginTop: '8px' }}
                        />
                    </div>

                    <Button 
                        type="primary" 
                        size="large" 
                        block 
                        onClick={handleUpdateUser}
                        style={{ height: '45px', borderRadius: '8px', fontWeight: 'bold' }}
                    >
                        Update profile
                    </Button>
                </Box>
            </Card>
        </div>
    )
}

export default Profile