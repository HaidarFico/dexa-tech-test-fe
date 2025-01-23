import React from "react";
import { NavLink } from "react-router";
import RollCallViewTable from "./RollCallViewTable";

function ViewAllRollCalls() {
    return (
        <>
            <div>ViewAllRollCalls</div>
            <RollCallViewTable />
            <NavLink to={'/dashboard'}>
                <div>Back</div>
            </NavLink>
        </>
    )
}

export default ViewAllRollCalls;