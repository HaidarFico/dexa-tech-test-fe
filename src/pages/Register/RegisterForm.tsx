import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router";

function RegisterForm() {
    const navigate = useNavigate();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("hr");

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(role)
        const response = await axios.post('http://localhost:3000/auth/register', {
            email_address: emailAddress,
            password: password,
            user_role: role,
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
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select
                        className="form-control"
                        id="role"
                        name="role"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="hr">HR</option>
                        <option value="user">Employee</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default RegisterForm