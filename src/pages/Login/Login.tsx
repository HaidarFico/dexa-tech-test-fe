import React from "react";
import LoginForm from "./LoginForm";
import { NavLink } from "react-router";

function Login() {
    return (
        <>
            <h1 className="text-center">Login</h1>
            <div className="d-flex justify-content-center align-items-center">
                <LoginForm></LoginForm>
            </div>
            <NavLink to={'/register'} className='d-flex justify-content-center mt-3'>
                <p>Don't have an account?</p>
            </NavLink>
            <NavLink to={'/'} className='d-flex justify-content-center mt-1'>
                <p>Home</p>
            </NavLink>
        </>
    )
}

export default Login;