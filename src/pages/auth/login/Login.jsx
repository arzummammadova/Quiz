import React from 'react'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/features/authSlice';
import { Button, Card, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [navigate]=useNavigate()
    const navigate=useNavigate();
    
    const dispatch=useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const actionResult=await dispatch(loginUser({email,password}))
        if(loginUser.fulfilled.match(actionResult)){
            alert("Login successful");
            navigate("/");
            setEmail("")
            setPassword("")
        }else if(loginUser.rejected.match(actionResult)){
            alert(actionResult.payload || "Login failed")
        }
    }

    // const handleSubmit=async(e)=>{
    //     e.preventDefault();
    //     try {
    //     const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`,{email,password});
    //     console.log(res.data);
    //     localStorage.setItem("token",res.data.token);
    //     window.location.href = "/";
    //     } catch (error) {
    //         console.log(error);
    //         alert(error.response?.data?.message || "Xəta baş verdi. Backendin işlədiyinə əmin olun.");
    //     }
    // }

    return (
        <div className='mx-auto min-h-screen flex items-center justify-center   '>
            <Card className='w-[500px]   mx-auto mt-20 p-10 rounded-3xl shadow-lg '>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-700">Email</label>
                        <Input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 font-medium text-gray-700">Password</label>
                        <Input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center mt-8">
                        <Button onClick={handleSubmit}> Login</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default Login