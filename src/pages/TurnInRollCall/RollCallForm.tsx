import axios from "axios";
import { MouseEvent, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

function RollCallForm() {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const [currentDate, setDate] = useState(new Date(Date.now() - timeZoneOffset).toISOString().slice(0, 19).replace('T', ' '));
    const [file, setFile] = useState<Blob | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const currentTime = new Date(Date.now() - timeZoneOffset).toISOString().slice(0, 19).replace('T', ' ');

            const formData = new FormData();
            const userId: any = localStorage.getItem('user-id')
            formData.append('user_id', userId);
            formData.append('clock_in_time', currentTime);
            formData.append('photo', file);

            const response = await axios.post(`${process.env.REACT_APP_BE_URL}/roll-call-administration/roll-call`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            if (response.status !== 201) {
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <>
            <div className="container">
                <h4 className="text-center">Current Time: {currentDate}</h4>
            </div>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card shadow-lg p-4">
                    <h5 className="card-title text-center">Upload Your Picture</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Choose file</label>
                            <input className="form-control" type="file" id="file" name="file" onChange={handleFileChange}/>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Upload and Clock In</button>
                        </div>
                    </form>
                </div>
            </div>
        </>)
}

export default RollCallForm;