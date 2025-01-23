import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router";

function RegisterForm() {
    const navigate = useNavigate();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/auth/register', {
            email_address: emailAddress,
            password: password,
        });
        console.log(response)
        if (response.status !== 201) {
            return navigate('/register');
        }
        return navigate('/login');      
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

export default RegisterForm