// This component will decide if the component can should be rendered or a user should first login
import { Navigate, useLocation } from "react-router-dom";
import { useAuthentication } from "./UserProvider";
import React from "react";
import Cookies from "js-cookie";
// If user is loggedIn this will redirect the user to the login route

export const DoctorAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    // If user is not logged in it will redirect it to the login page
    if (!Cookies.get("doctorEmail")&& !Authentication.doctor) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};
export const PatientAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    // If user is not logged in it will redirect it to the login page
    if (!Cookies.get("patientEmail") && !Authentication.patient) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};

export const HealthCareAuthentication = ({ children }) => {
    // If user is not logged in it will redirect it to the login page
    const Authentication = useAuthentication();
    if (!Cookies.get("hcfadmin_Email") && !Authentication.hcf){
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};

export const ClinicAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    // If user is not logged in it will redirect it to the login page
    if (!Cookies.get("clinicEmail")&& !Authentication.clinic) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};

export const DiagnostAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    // If user is not logged in it will redirect it to the login page
    if (!Cookies.get("diagnostic_Email")&& !Authentication.diagnost) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};