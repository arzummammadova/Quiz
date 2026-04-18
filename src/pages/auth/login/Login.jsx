import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/features/authSlice';
import { useNavigate, Link } from 'react-router-dom';
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
        <div className='bg-[#16171d] min-h-screen flex items-center justify-center p-4'>
            <div className='w-full max-w-[450px] bg-[#1e1f26] border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl'>
                <h2 className="text-3xl font-bold mb-8 text-center text-white">Login</h2>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                        <Input
                            type="email"
                            placeholder='Email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                        <Input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center mt-4">
                        <Button loading={isLoading} size="large" className="w-full h-12 text-base font-semibold">
                            {isLoading ? 'YÜKLƏNİR...' : 'Login'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account? <Link to="/register" className="text-white hover:underline transition-colors">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;