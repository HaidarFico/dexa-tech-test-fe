import React from "react";
import RegisterForm from "./RegisterForm";
import { NavLink } from "react-router";

function Register() {
    return (
        <>
            <div>Register</div>
            <RegisterForm></RegisterForm>
            <NavLink to={'/login'}>
                <div>Already have an account?</div>
            </NavLink>
            <NavLink to={'/'}>
                <div>Home</div>
            </NavLink>
        </>    )
}

export default Register;