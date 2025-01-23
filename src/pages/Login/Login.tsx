import React from "react";
import LoginForm from "./LoginForm";
import { NavLink } from "react-router";

function Login() {
    return (
        <>
            <div>Login</div>
            <LoginForm></LoginForm>
            <NavLink to={'/register'}>
                <div>Don't have an account?</div>
            </NavLink>
            <NavLink to={'/dashboard'}>
                <div>Home</div>
            </NavLink>
        </>
    )
}

export default Login;