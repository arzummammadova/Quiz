import { Navigate } from 'react-router-dom';

const CheckAuth = ({ children }) => {
    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default CheckAuth;
