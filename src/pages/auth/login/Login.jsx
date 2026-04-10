import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import { useToast } from 'arzu-toast-modal';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const { isLoading } = useSelector((state) => state.authReducer);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const actionResult = await dispatch(loginUser({ email, password }))
        
        if (loginUser.fulfilled.match(actionResult)) {
            showToast({
                type: 'success',
                title: 'SUCCESS',
                message: 'Login successful',
                duration: 4000,
                position: 'top-right',
            });
            navigate("/");
            setEmail("")
            setPassword("")
        } else if (loginUser.rejected.match(actionResult)) {
            showToast({
                type: 'error',
                title: 'ERROR',
                message: actionResult.payload || 'Login failed',
                duration: 4000,
                position: 'top-right',
            });
        }
    }

    return (
        <div className='mx-auto min-h-screen flex items-center justify-center'>
            <Card className='w-[500px] mx-auto p-10 rounded-3xl shadow-lg'>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-700">Email</label>
                        <Input
                            type="email"
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 font-medium text-gray-700">Password</label>
                        <Input
                            type="password"
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center mt-8">
                        <Button loading={isLoading}>
                            {isLoading ? 'YÜKLƏNİR...' : 'Login'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default Login;