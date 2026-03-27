import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser, Me } from '../../../redux/features/authSlice'

const Header = () => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
     dispatch(logoutUser());
  }

  useEffect(() => {
    // Only dispatch Me if there is a token in localStorage
    if (localStorage.getItem('token')) {
      dispatch(Me());
    }
  }, [dispatch]);
  
  return (
    <div>
      <nav className='flex max-w-7xl mx-auto container'>
        <ul className='flex gap-4 items-center justify-center mx-auto py-8'>
          <li><Link to=''>Home</Link></li>
          <li><Link to=''>Quiz</Link></li>
          <li><Link to=''>About</Link></li>
          <li><Link to=''>Contact</Link></li>
          
          {user ? (
            <>
              <button>
                Profile ({user.username})
              </button>
              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Header