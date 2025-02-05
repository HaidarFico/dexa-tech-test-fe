import React from "react";
import {  useNavigate } from "react-router";
import NavBar from "../../components/NavBar";

function Home() {
    const navigate = useNavigate()
    return (
        <>
            <NavBar />
            <div>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                    <h1 className="display-1 text-center"><strong>Welcome!</strong></h1>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/login')}>Login</button>
                    <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => navigate('register')}>Register</button>
                </div>
            </div>
        </>
    )
}

export default Home;