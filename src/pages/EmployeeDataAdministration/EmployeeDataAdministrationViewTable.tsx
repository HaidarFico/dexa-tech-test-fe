import axios from "axios";
import { useState, useEffect } from "react";

function EmployeeDataAdministrationViewTable() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (loading === true) {
            axios.get(`http://localhost:3000/employee-administration/employee-data?page=${page}`)
                .then((res) => {
                    console.log("SAMPE SINI")
                    const employeeDataArray = res.data.data.employeeDataArray[0];
                    setData(employeeDataArray);
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
                        <th>User Id</th>
                        <th>Full Name</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((val: any) => (
                        <tr key={val.employeeDataId}>
                            <td>{val.userId}</td>
                            <td>{val.fullName}</td>
                            <td>{val.dateOfBirth}</td>
                            <td>{val.gender}</td>
                            <td>{val.position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeDataAdministrationViewTable;