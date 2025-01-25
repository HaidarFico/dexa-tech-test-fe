import { SyntheticEvent, useState } from "react";
import { redirect, useNavigate } from "react-router";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function LoginForm() {
    const navigate = useNavigate();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const response = await axios.post(`${process.env.REACT_APP_BE_URL}/auth/login`, {
                email_address: emailAddress,
                password: password,
            });
            const token = response.data.data.token;
            const tokenDecoded: any = jwtDecode(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('user-id', tokenDecoded.userId);
            localStorage.setItem('user-roles', tokenDecoded.roles);
            localStorage.setItem('accessToken', token);
            return navigate('/dashboard');
        } catch(err) {
            return location.reload();
        } 
    }

    return (
        <>
            <div className="row bg-light shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="form-group m-2 col">
                        <label>Email address</label>
                        <input type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} className="form-control" id="email_address" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group m-2 col">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Enter password" />
                    </div>
                    <div className="row m-3"><button type="submit" className="btn btn-outline-secondary">Submit</button></div>
                </form>
            </div>
        </>
    );
}

export default LoginForm