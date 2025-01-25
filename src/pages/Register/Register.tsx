import React from "react";
import RegisterForm from "./RegisterForm";
import { NavLink } from "react-router";

function Register() {
    return (
        <>
            <h1 className="text-center">Register</h1>
            <div className="d-flex justify-content-center align-items-center">
                <RegisterForm></RegisterForm>
            </div>
            <NavLink to={'/login'} className='d-flex justify-content-center mt-3'>
                <div>Already have an account?</div>
            </NavLink>
            <NavLink to={'/'} className='d-flex justify-content-center mt-1'>
                <div>Home</div>
            </NavLink>
        </>)
}

export default Register;