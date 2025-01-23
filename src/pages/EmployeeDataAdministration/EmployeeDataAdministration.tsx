import React from "react";
import { NavLink } from "react-router";
import EmployeeDataAdministrationViewTable from "./EmployeeDataAdministrationViewTable";

function EmployeeDataAdministration() {
    return (
        <>
            <div>ViewAllRollCalls</div>
            <EmployeeDataAdministrationViewTable />
            <NavLink to={'/dashboard'}>
                <div>Back</div>
            </NavLink>
        </>
    )
}

export default EmployeeDataAdministration;