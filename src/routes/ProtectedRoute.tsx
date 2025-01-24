import { Navigate } from "react-router";
export const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user-id')
    if (!user) {
        // return navigate('/login');
        return <Navigate to={'/login'} />;
    }
    return children;
};