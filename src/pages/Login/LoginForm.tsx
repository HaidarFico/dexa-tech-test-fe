import { SyntheticEvent, useState } from "react";
import { redirect, useNavigate } from "react-router";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function LoginForm() {
    const navigate = useNavigate();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/auth/login', {
            email_address: emailAddress,
            password: password,
        });
        if (response.status !== 200) {
            return navigate('/login');
        }
        const token = response.data.data.token;
        const tokenDecoded: any = jwtDecode(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('user-id', tokenDecoded.userId);
        localStorage.setItem('user-roles', 'temp');
        return navigate('/dashboard');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} className="form-control" id="email_address" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default LoginForm