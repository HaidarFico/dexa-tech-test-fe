import React from "react";
import { NavLink, useParams } from "react-router";
import Photo from "./Photo";
import NavBar from "../../components/NavBar";

function ViewRollCallPhoto() {
    return (
        <>
            <NavBar />
            <h1 className="text-center">View Photo</h1>
            <Photo photoId={useParams().photoId} />
            <NavLink to={'/all-roll-call'}>
                <button className="btn btn-outline-secondary m-2">Back</button>
            </NavLink>
        </>
    )
}

export default ViewRollCallPhoto;