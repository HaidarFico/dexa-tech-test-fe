import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import RollCallForm from "./RollCallForm";
import RollCallClockOutForm from "./RollCallClockOutForm";
import axios from "axios";

function TurnInRollCall() {
    const [isRollCallActive, setIsRollCallActive] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3000/roll-call-administration/roll-call/latest/${localStorage.getItem('user-id')}`)
            .then((response) => {
                const clockOutTime = response?.data?.data?.rollCallInstance?.clockOutTime;
                console.log(response?.data?.data?.rollCallInstance?.clockOutTime);
                if (clockOutTime === undefined || clockOutTime === null) {
                    setIsRollCallActive(true);
                } else {
                    setIsRollCallActive(false);
                }
            });
    });
    return (
        <>
            <div>Roll Call</div>
            {isRollCallActive ? <RollCallClockOutForm /> : <RollCallForm />}
            <NavLink to={'/dashboard'}>
                <div>Back</div>
            </NavLink>
        </>
    )
}

export default TurnInRollCall;