import React from 'react'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    // const [navigate]=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
        const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`,{email,password});
        console.log(res.data);
        localStorage.setItem("token",res.data.token);
        // navigate("/")
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Xəta baş verdi. Backendin işlədiyinə əmin olun.");
        }
    }

    return (
        <div className='mx-auto min-h-screen '>
            <div className="">
                <div className="">
                    <img src="" alt="" />
                </div>

                <form action="" onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="">Email</label>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className="">
                        <label htmlFor="">Password</label>
                        <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>

        </div>
    )
}

export default Login