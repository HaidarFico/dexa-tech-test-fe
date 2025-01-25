import React from "react";
import { NavLink } from "react-router";
import RollCallViewTable from "./RollCallViewTable";

function ViewAllRollCalls() {
    return (
        <>
            <h1 className="text-center">View All Roll Calls</h1>
            <RollCallViewTable />
            <NavLink to={'/dashboard'}>
                <button className="btn btn-outline-secondary m-2 col">Back</button>
            </NavLink>
        </>
    )
}

export default ViewAllRollCalls;