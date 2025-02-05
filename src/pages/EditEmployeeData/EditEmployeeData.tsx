import React from "react";
import { NavLink } from "react-router";
import EditEmployeeDataForm from "./EditEmployeeDataForm";
import NavBar from "../../components/NavBar";

function EditEmployeeData() {
    return (
        <>
            <NavBar />
            <EditEmployeeDataForm />
            <NavLink to={'/employee-data'}>
                <button className="btn btn-outline-secondary m-2 col">Back</button>
            </NavLink>
        </>
    )
}

export default EditEmployeeData;