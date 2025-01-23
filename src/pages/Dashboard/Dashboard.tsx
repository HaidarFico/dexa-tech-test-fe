import React from "react";
import { NavLink } from "react-router";

function Dashboard() {
    return (
        <>
            <div>Dashboard</div>
            <NavLink to={'/roll-call'}>
                <div>Roll Call</div>
            </NavLink>
            <NavLink to={'/employee-data'}>
                <div>Employee Data Administration</div>
            </NavLink>
            <NavLink to={'/all-roll-call'}>
                <div>View All Roll Call</div>
            </NavLink>
        </>
    )
}

export default Dashboard;