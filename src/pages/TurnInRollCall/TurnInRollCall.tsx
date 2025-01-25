import React, { useEffect, useState } from "react";
import { data, NavLink } from "react-router";
import RollCallForm from "./RollCallForm";
import RollCallClockOutForm from "./RollCallClockOutForm";
import axios from "axios";

function TurnInRollCall() {
    const [isRollCallActive, setIsRollCallActive] = useState(false);
    const [currentRollCallData, setCurrentRollCallData] = useState<any>(null);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BE_URL}/roll-call-administration/roll-call/latest/${localStorage.getItem('user-id')}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        )
            .then((response) => {
                const clockOutTime = response?.data?.data?.rollCallInstance?.clockOutTime;
                if (clockOutTime === undefined || clockOutTime === null) {
                    setCurrentRollCallData(response?.data?.data?.rollCallInstance);
                    setIsRollCallActive(true);
                } else {
                    setIsRollCallActive(false);
                }
            });
    });
    return (
        <>
            <h1 className="text-center">Roll Call</h1>
            <div className="d-flex justify-content-center text-center">
                {isRollCallActive ? <RollCallClockOutForm currentRollCall={currentRollCallData} /> : <RollCallForm />}
            </div>
            <NavLink to={'/dashboard'}>
            <button type="button" className="btn btn-outline-secondary m-2 col">Back</button>
            </NavLink>
        </>
    )
}

export default TurnInRollCall;