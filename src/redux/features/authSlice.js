import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { data } from 'react-router-dom';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, data, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Xəta baş verdi');
    }
  }
);


export const loginUser=createAsyncThunk('/auth/login',async(data,{rejectWithValue})=>{
    try {
        const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`,data, {withCredentials:true})
        localStorage.setItem("token",res.data.token)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "xeta bas verdi ")
        
    }
})

export const logoutUser=createAsyncThunk('/auth/logout',
    async (data,{rejectWithValue}) => {
        try {
            const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`,data,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}, withCredentials:true})
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Xəta baş verdi') 
            
        }
        
    }

)

// export const loginUser=createAsyncThunk('/auth/login',
//   async (data, {rejectWithValue}) => {
//    try {
//     const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`,data)
//     localStorage.setItem("token",res.data.token)
//     return res.data;
    

//    } catch (error) {
//     return rejectWithValue(error.response?.data?.message || 'Xəta baş verdi') 
    
//    }
//   }

// )

// export const loginUser=createAsyncThunk('/auth/login',
//   async (data, {rejectWithValue}) => {
//    try {
//     const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`,data)
//     localStorage.setItem("token",res.data.token)
//     return res.data;
    

//    } catch (error) {
//     return rejectWithValue(error.response?.data?.message || 'Xəta baş verdi') 
    
//    }
//   }

// )

export const Me=createAsyncThunk('/auth/me',async(data,{rejectWithValue})=>{
  try {
    const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/me`,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}, withCredentials:true})
    return res.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Xəta baş verdi') 
    
  }
})
export const updateProfile=createAsyncThunk('/auth/update',async(data,{rejectWithValue})=>{
  try {
    const res=await axios.put(`${import.meta.env.VITE_BASE_URL}/api/auth/update`,data,
      {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}, withCredentials:true}
    )
    return res.data
    
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'xetta bas verdi')
    
  }
})



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending,(state)=>{
        state.isLoading=true
        state.error=null
      })
      .addCase(logoutUser.fulfilled,(state,action)=>{
        state.isLoading=false
        state.user=null
        localStorage.removeItem('token')
      })
      .addCase(logoutUser.rejected,(state,action)=>{
        state.isLoading=false
        state.error=action.payload
      })
      .addCase(Me.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Me.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(Me.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload;
        localStorage.removeItem('token');
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});



export const { clearError } = authSlice.actions;

export default authSlice.reducer;
