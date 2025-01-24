import React from "react";
import { NavLink, useParams } from "react-router";
import Photo from "./Photo";

function ViewRollCallPhoto() {
    return (
        <>
            <div>ViewRollCallPhoto</div>
            <Photo photoId={useParams().photoId} />
            <NavLink to={'/all-roll-call'}>
                <div>Back</div>
            </NavLink>
        </>
    )
}

export default ViewRollCallPhoto;