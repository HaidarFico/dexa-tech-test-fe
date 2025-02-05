import React from "react";
import { NavLink } from "react-router";
import EmployeeDataAdministrationViewTable from "./EmployeeDataAdministrationViewTable";
import NavBar from "../../components/NavBar";

function EmployeeDataAdministration() {
    return (
        <>
            <NavBar />
            <h1 className="text-center">View All Employee's Data</h1 >
            <EmployeeDataAdministrationViewTable />
            <NavLink to={'/dashboard'}>
                <button className="btn btn-outline-secondary m-2 col">Back</button>
            </NavLink>
        </>
    )
}

export default EmployeeDataAdministration;