import axios from "axios";
import { useState, useEffect } from "react";

function RollCallViewTable() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (loading === true) {
            axios.get(`http://localhost:3000/roll-call-administration/roll-call?page=${page}`)
                .then((res) => {
                    const employeeRollCallArray = res.data.data.employeeRollCallArray[0];
                    setData(employeeRollCallArray);
                    setLoading(false);
                }).catch(() => {
                    setError('Failed to fetch data');
                    setLoading(false);
                });
        }
    }, [loading]);

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }
    if (error !== '') {
        return <div className="text-center text-danger mt-4">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Data Table</h2>
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>RollCallId</th>
                        <th>UserId</th>
                        <th>ClockInTime</th>
                        <th>ClockOutTime</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((val: any) => (
                        <tr key={val.rollCallId}>
                            <td>{val.rollCallId}</td>
                            <td>{val.userId}</td>
                            <td>{val.clockInTime}</td>
                            <td>{val.clockOutTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RollCallViewTable;