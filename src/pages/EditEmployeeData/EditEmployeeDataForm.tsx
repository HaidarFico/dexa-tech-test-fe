import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router";

function EditEmployeeDataForm() {
    const navigate = useNavigate();

    const [data, setData] = useState<null | any>();
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const params = useParams();

    useEffect(() => {
        if (loading === true) {
            axios.get(`${process.env.REACT_APP_BE_URL}/employee-administration/employee-data/${params.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            )
            .then((res) => {
                    console.log(res.data.data)
                    const employeeData = res.data.data;
                    if(employeeData.gender === null) {
                        employeeData.gender = 'm';
                    }
                    setData(employeeData);
                    setLoading(false);
                }).catch((res) => {
                    console.log(res)
                    setError('Failed to fetch data');
                    setLoading(false);
                });
        }
    }, []);

    const handleChange = async (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })        
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(data);
        const response = await axios.post(
            `${process.env.REACT_APP_BE_URL}/employee-administration/employee-data`,
            {
                "user_id": data.userId,
                "full_name": data.fullName,
                "date_of_birth": data.dateOfBirth,
                "gender": data.gender,
                "position": data.position
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        );
        if (response.status !== 200) {
            console.log(response);
            return location.reload();
        }
        return navigate('/employee-data')
    }

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }
    if (error !== '') {
        return <div className="text-center text-danger mt-4">{error}</div>;
    }

    return (
        <div className="container mt-4">
            {/* <h2 className="text-center mb-4">Employee Information</h2>
            <h3 className="text-center mb-4">{data?.}</h3> */}
            <h2 className="text-center mb-4">Edit Employee Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Full Name">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        placeholder={data.fullName ? data.fullName : 'Enter Employee\'s Full Name Here'}
                        // value={data.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Date Of Birth">Date Of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        // value={data?.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Position">Position</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        name="position"
                        placeholder={data?.position ? data?.position : "Enter your Employee's Position Here"}
                        // value={data?.position}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        // value={data?.gender}
                        onChange={handleChange}
                    >
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary btn-block">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditEmployeeDataForm;