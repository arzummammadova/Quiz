import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/features/authSlice';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.authReducer);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Dispatch the register action
        const actionResult = await dispatch(registerUser({ username, email, password }));
        
        if (registerUser.fulfilled.match(actionResult)) {
            alert('Qeydiyyat uğurludur! Zəhmət olmasa emailinizi təsdiqləyin.');
            setUsername('');
            setEmail('');
            setPassword('');
        } else if (registerUser.rejected.match(actionResult)) {
            alert(actionResult.payload || 'Qeydiyyat zamanı xəta baş verdi');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="mb-4 text-2xl font-bold">Register</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="username" 
                    className="border p-2 rounded"
                    required
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="email" 
                    className="border p-2 rounded"
                    required
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="password" 
                    className="border p-2 rounded"
                    required
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'Yüklənir...' : 'Register'}
                </button>
            </form>
        </div>
    )
}

export default Register;