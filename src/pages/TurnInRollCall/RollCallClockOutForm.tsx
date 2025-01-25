import axios from "axios";
import { MouseEvent, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

function RollCallClockOutForm({ currentRollCall }: any) {
    const [currentDate, setDate] = useState(new Date().toISOString().slice(0, 19).replace('T', ' '));
    const navigate = useNavigate();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const response = await axios.put(`${process.env.REACT_APP_BE_URL}/roll-call-administration/roll-call`,
            {
                user_id: localStorage.getItem('user-id'),
                clock_out_time: currentTime,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
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
            <div className="container text-center">
                <h1 className="text-center mt-3">Current Time: {currentDate}</h1>
                <h2 className="text-center mt-1 mb-4">Clock-in Time: {currentRollCall.clockInTime.slice(0, 19).replace('T', ' ')}</h2>
                <form onSubmit={handleSubmit}>
                    <button type="submit" className="btn btn-outline-secondary m-2">Clock Out</button>
                </form>
            </div>
        </>)
}

export default RollCallClockOutForm;