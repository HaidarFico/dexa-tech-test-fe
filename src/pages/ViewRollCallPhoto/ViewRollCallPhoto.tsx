import React from "react";
import { NavLink, useParams } from "react-router";
import Photo from "./Photo";

function ViewRollCallPhoto() {
    return (
        <>
            <h1 className="text-center">View Photo</h1>
            <Photo photoId={useParams().photoId}  />
            <NavLink to={'/all-roll-call'}>
                <button className="btn btn-outline-secondary m-2">Back</button>
            </NavLink>
        </>
    )
}

export default ViewRollCallPhoto;