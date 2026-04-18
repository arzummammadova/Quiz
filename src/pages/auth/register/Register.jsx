import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/features/authSlice';
import { Link } from 'react-router-dom';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
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
            showToast({
                type: 'success',
                title: 'Uğurlu!',
                message: 'Qeydiyyat uğurludur! Zəhmət olmasa emailinizi təsdiqləyin.',
                duration: 4000,
                position: 'top-right',
            });
            setUsername('');
            setEmail('');
            setPassword('');
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
        <div className='bg-[#16171d] min-h-screen flex items-center justify-center p-4'>
            <div className='w-full max-w-[450px] bg-[#1e1f26] border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl'>
                <h2 className="text-3xl font-bold mb-8 text-center text-white">Register</h2>
                
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-300">Username</label>
                        <Input 
                            type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                        <Input 
                            type="email" 
                            placeholder="Email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                        <Input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center mt-4">
                        <Button loading={isLoading} size="large" className="w-full h-12 text-base font-semibold">
                            {isLoading ? 'Yüklənir...' : 'Register'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account? <Link to="/login" className="text-white hover:underline transition-colors">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;