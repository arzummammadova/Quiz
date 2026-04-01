import React from 'react'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/features/authSlice';
import Input from '../../../components/input/Input';
import { Card } from 'antd';
import { useToast } from 'arzu-toast-modal';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [navigate]=useNavigate()
    const { showToast } = useToast();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const actionResult = await dispatch(loginUser({ email, password }));

        if (loginUser.fulfilled.match(actionResult)) {
            navigate('/');
        } else if (loginUser.rejected.match(actionResult)) {
                 showToast({
            type: 'error',
            title: 'Error!',
            message: `${actionResult.payload || 'Login zamanı xəta baş verdi'}`,
            duration: 4000,
            position: 'top-right',
          })
        }
    };

    return (
        <div className='mx-auto min-h-screen flex items-center justify-center   '>
            <Card className='w-[500px]   mx-auto mt-20 p-10 rounded-3xl shadow-lg '>
                <div className="">
                    <img src="" alt="" />
                </div>

                <form action="" onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="">Email</label>
                        <Input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="">
                        <label htmlFor="">Password</label>
                        <Input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>


                </form>

            </Card>


        </div>
    )
}

export default Login