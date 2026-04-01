import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/features/authSlice';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import { Card } from 'antd';
import { useToast } from 'arzu-toast-modal';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { showToast } = useToast();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.authReducer);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const actionResult = await dispatch(registerUser({ username, email, password }));

        if (registerUser.fulfilled.match(actionResult)) {
            navigate('/login');
        } else if (registerUser.rejected.match(actionResult)) {
            showToast({
                type: 'error',
                title: 'Error!',
                message: `${actionResult.payload || 'Qeydiyyat zamanı xəta baş verdi'}`,
                duration: 4000,
                position: 'top-right',
            });
        }
    };

    return (
        <div className='mx-auto min-h-screen flex items-center justify-center'>
            <Card className='w-[500px] p-10 rounded-3xl shadow-lg'>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>

                <form onSubmit={handleSubmit} className="w-full" noValidate>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-700">Username</label>
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-700">Email</label>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 font-medium text-gray-700">Password</label>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center mt-8">
                        <Button loading={isLoading}>
                            {isLoading ? 'Yüklənir...' : 'Register'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Register;