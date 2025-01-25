import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import Pagination from 'react-bootstrap/Pagination';

function EmployeeDataAdministrationViewTable() {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('LOADING')
        console.log(page)
        if (loading === true) {
            axios.get(`${process.env.REACT_APP_BE_URL}/employee-administration/employee-data?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            )
                .then((res) => {
                    const employeeDataArray = res.data.data.employeeDataArray[0];
                    setData(employeeDataArray);
                    setLoading(false);
                }).catch(() => {
                    setError('Failed to fetch data');
                    setLoading(false);
                });
        }
    }, [page]);

    let items = [];
    items.push(
        <Pagination.Item key='previous' onClick={(e) => {
            if(page > 0){
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
                        <th>Email Address</th>
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
                            <td>{val.emailAddress}</td>
                            <td>{val.fullName}</td>
                            <td>{val.dateOfBirth}</td>
                            <td>{val.gender}</td>
                            <td>{val.position}</td>
                            <td><NavLink to={`/employee-data/${val.userId}`}>edit</NavLink></td>
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

export default EmployeeDataAdministrationViewTable;