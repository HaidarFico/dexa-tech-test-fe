import axios from "axios";
import { MouseEvent, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

function RollCallForm() {
    const [currentDate, setDate] = useState(new Date().toISOString().slice(0, 19).replace('T', ' '));
    const [file, setFile] = useState<Blob | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const formData = new FormData();
        const userId: any = localStorage.getItem('user-id')
        formData.append('user_id', userId);
        formData.append('clock_in_time', currentTime);
        formData.append('photo', file);

        const response = await axios.post('http://localhost:3000/roll-call-administration/roll-call',
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        );
        // const response = await axios.post('http://localhost:3000/roll-call-administration/roll-call', 
        //     {
        //         user_id: localStorage.getItem('user-id'),
        //         clock_in_time: currentTime,
        //     },

        // );
        if (response.status !== 201) {
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <>
            <h1>Current Time: {currentDate}</h1>
            <form onSubmit={handleSubmit}>
                {/* <div className="mb-3">
                    <label className="form-label">Default file input example</label>
                    <input className="form-control" type="file" id="formFile" />
                </div> */}
                <div className="input-group">
                    <input id="file" type="file" onChange={handleFileChange} />
                </div>

                <button type="submit" className="btn btn-primary">Absen</button>
            </form>
        </>)
}

export default RollCallForm;