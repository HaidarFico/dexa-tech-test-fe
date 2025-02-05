import axios from "axios";
import { MouseEvent, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

function RollCallClockOutForm({ currentRollCall }: any) {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const [currentDate, setDate] = useState(new Date(Date.now() - timeZoneOffset).toISOString().slice(0, 19).replace('T', ' '));
    const navigate = useNavigate();

    const handleSubmit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const currentTime = new Date(Date.now() - timeZoneOffset).toISOString().slice(0, 19).replace('T', ' ');

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
        } catch (err) {
            console.log(err);
            location.reload();
        }
    };

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, []);

    const tick = useCallback(() => {
        setDate(new Date(Date.now() - timeZoneOffset).toISOString().slice(0, 19).replace('T', ' '));
    }, []);

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card shadow-lg p-4">
                    <h3 className="card-title text-center">Clock Out</h3>
                    <h5 className="card-title text-center">Clock In Time: {new Date(Date.parse(currentRollCall.clockInTime) - timeZoneOffset).toISOString().slice(0, 19).replace('T', ' ')}</h5>
                    <h5 className="card-title text-center">Current Time: {currentDate}</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="row"><button type="submit" className="btn btn-primary">Clock Out</button></div>
                    </form>
                </div>
            </div>
        </>)
}

export default RollCallClockOutForm;