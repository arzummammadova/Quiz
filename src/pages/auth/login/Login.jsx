import React from 'react'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/features/authSlice';

const Login = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    // const [navigate]=useNavigate()
    const dispatch=useDispatch();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const actionResult=await dispatch(loginUser({email,password}))
        if(loginUser.fulfilled.match(actionResult)){
            alert("Login successful")
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