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
        } catch(err) {
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
            <div className="row">
                <h2 className="text-center">Current Time: {currentDate}</h2>
                <h3 className="text-center">Clock In</h3>
                <form onSubmit={handleSubmit}>
                    <h4 className="text-center">File Upload <strong>MUST</strong> Be An Image</h4>
                    <div className="input-group m-2">
                        <input id="file" type="file" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="btn btn-outline-secondary m-2 col">Absen</button>
                </form>
            </div>
        </>)
}

export default RollCallForm;