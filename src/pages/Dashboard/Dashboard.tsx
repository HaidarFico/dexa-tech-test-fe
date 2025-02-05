import React from "react";
import { NavLink } from "react-router";
import NavBar from "../../components/NavBar";

function handleLogout(): void {
    localStorage.clear();
}
function Dashboard() {
    return (
        <>
            <NavBar />
            <h1 className="text-center mb-4">Dashboard</h1>
            <h4 className="text-center">Employee Modules</h4>
            <div className="container">
                <NavLink to={'/roll-call'}>
                    <div className="row m-3"><button className="btn btn-outline-secondary">Roll Call</button></div>
                </NavLink>
            </div>
            {
                localStorage.getItem('user-roles')?.includes('hr') &&
                <>
                    <h4 className="text-center">HR Modules</h4>
                    <div className="container">
                        <NavLink to={'/employee-data'}>
                            <div className="row m-3"><button className="btn btn-outline-secondary">Employee Data Administration</button></div>
                        </NavLink>
                    </div>
                    <div className="container">
                        <NavLink to={'/all-roll-call'}>
                            <div className="row m-3"><button className="btn btn-outline-secondary">View All Roll Call</button></div>
                        </NavLink>
                    </div>
                </>
            }
            <div className="container">
                <NavLink to={'/'}>
                    <div className="row mt-5" onClick={handleLogout}><button className="btn btn-outline-secondary">Logout</button></div>
                </NavLink>
            </div>
        </>
    )
}

export default Dashboard;