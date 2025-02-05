import axios from "axios";
import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { NavLink, redirect } from "react-router";

function RollCallViewTable() {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (loading === true) {
            axios.get(`${process.env.REACT_APP_BE_URL}/roll-call-administration/roll-call?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            )
                .then((res) => {
                    setLoading(false);
                    let employeeRollCallArray = res.data.data.employeeRollCallArray[0];
                    if (employeeRollCallArray.length === 0) {
                        employeeRollCallArray = data;
                        setPage(page - 1);
                    }
                    setData(employeeRollCallArray);
                }).catch(() => {
                    setError('Failed to fetch data, login again please!');
                    setLoading(false);
                });
        }
    }, [page]);

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }
    if (error !== '') {
        return <div className="text-center text-danger mt-4">{error}</div>;
    }

    let items = [];
    items.push(
        <Pagination.Item key='previous' onClick={(e) => {
            if (page > 0) {
                setPage(page - 1)
                setLoading(true);
            }
        }}>
            Previous
        </Pagination.Item>,
        <Pagination.Item key='next' onClick={(e) => {
            setPage(page + 1)
            setLoading(true);
        }}>
            Next
        </Pagination.Item>,
    );

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Data Table</h2>
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>RollCallId</th>
                        <th>Full Name</th>
                        <th>UserId</th>
                        <th>ClockInTime</th>
                        <th>ClockOutTime</th>
                        <th>Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((val: any) => (
                        <tr key={val.rollCallId}>
                            <td>{val.rollCallId}</td>
                            <td>{val.fullName}</td>
                            <td>{val.userId}</td>
                            <td>{new Date(Date.parse(val.clockInTime) - timeZoneOffset).toISOString().slice(0, 19).replace('T', ' ')}</td>
                            <td>{val.clockOutTime ? new Date(Date.parse(val.clockOutTime) - timeZoneOffset).toISOString().slice(0, 19).replace('T', ' '): null}</td>
                            {/* <td>{val.clockInTime}</td> */}
                            {/* <td>{val.clockOutTime}</td> */}
                            <td><NavLink to={`/all-roll-call/${val.photoId}`}>see photo</NavLink></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <Pagination>{items}</Pagination>
            </div>
        </div>
    );
};

export default RollCallViewTable;