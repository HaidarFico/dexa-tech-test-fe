import axios from "axios";
import { MouseEvent, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

function RollCallClockOutForm() {
    const [currentDate, setDate] = useState(new Date().toISOString().slice(0, 19).replace('T', ' '));
    const navigate = useNavigate();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(localStorage.getItem('user-id'))
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const response = await axios.put('http://localhost:3000/roll-call-administration/roll-call', 
            {
                user_id: localStorage.getItem('user-id'),
                clock_out_time: currentTime,
            }
        );
        if (response.status !== 200) {
            return navigate('/home');
        }
        location.reload();
        // return navigate('/roll-call');
    };

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, []);

    const tick = useCallback(() => {
        setDate(new Date().toISOString().slice(0, 19).replace('T', ' '));
    }, []);

    return (
        <>
            <h1>Current Time: {currentDate}</h1>
            <form onSubmit={handleSubmit}>
                {/* <div className="mb-3">
                    <label className="form-label">Default file input example</label>
                    <input className="form-control" type="file" id="formFile" />
                </div> */}
                <button type="submit" className="btn btn-primary">Clock Out</button>
            </form>
        </>)
}

export default RollCallClockOutForm;