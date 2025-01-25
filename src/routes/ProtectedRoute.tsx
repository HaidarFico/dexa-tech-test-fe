import { PropsWithChildren } from "react";
import { Navigate } from "react-router";
export const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const user = localStorage.getItem('user-id')
    if (!user) {
        return <Navigate to={'/login'} />;
    }
    return children;
};