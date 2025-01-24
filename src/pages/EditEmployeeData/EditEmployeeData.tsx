import React from "react";
import { NavLink } from "react-router";
import EditEmployeeDataForm from "./EditEmployeeDataForm";

function EditEmployeeData() {
    return (
        <>
            <div>EditEmployeeDataForm</div>
            <EditEmployeeDataForm />
            <NavLink to={'/employee-data'}>
                <div>Back</div>
            </NavLink>
        </>
    )
}

export default EditEmployeeData;