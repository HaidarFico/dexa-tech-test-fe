import React from "react";
import { NavLink } from "react-router";

function handleLogout(): void {
    localStorage.clear();
}
function Dashboard() {
    return (
        <>
            <h1 className="text-center mb-4">Dashboard</h1>
            <h4 className="text-center">Employee Modules</h4>
            <NavLink to={'/roll-call'}>
                <div className="row m-3"><button className="btn btn-outline-secondary">Roll Call</button></div>
            </NavLink>
            {localStorage.getItem('user-roles')?.includes('hr') &&
                <><h4 className="text-center">HR Modules</h4>
                    <NavLink to={'/employee-data'}>
                        <div className="row m-3"><button className="btn btn-outline-secondary">Employee Data Administration</button></div>
                    </NavLink>
                    <NavLink to={'/all-roll-call'}>
                        <div className="row m-3"><button className="btn btn-outline-secondary">View All Roll Call</button></div>
                    </NavLink></>}
            <NavLink to={'/'}>
                <div className="row mt-5" onClick={handleLogout}><button className="btn btn-outline-secondary">Logout</button></div>
            </NavLink>
        </>
    )
}

export default Dashboard;