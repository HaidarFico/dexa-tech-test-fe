import React from "react";
import { Link } from "react-router";

function NotFound() {
    return (
        <div>
            404 Not Found
            <Link to={'/'}>Home</Link>
        </div>
    )
}

export default NotFound;