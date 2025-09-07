/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
// This component will decide if the component can should be rendered or a user should first login
/* eslint-disable prettier/prettier */
/* eslint-disable spaced-comment */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
import { Navigate, useLocation } from "react-router-dom";
import { useAuthentication } from "./UserProvider";
import React from "react";
import Cookies from "js-cookie";
// If user is loggedIn this will redirect the user to the login route

export const DoctorAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    // If user is not logged in it will redirect it to the login page
    if (!Authentication.doctor) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};

export const PatientAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    // If user is not logged in it will redirect it to the login page
    if (!Cookies.get("patientEmail")) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};

export const HealthCareAuthentication = ({ children }) => {
    // If user is not logged in it will redirect it to the login page
    const Authentication = useAuthentication();
    if (!Authentication.hcf) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};
