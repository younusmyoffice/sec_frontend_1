// This component will decide if the component can should be rendered or a user should first login
import { Navigate, useLocation } from "react-router-dom";
import { useAuthentication } from "./UserProvider";
import { isTokenValid } from "../utils/jwtUtils";
import React from "react";
import Cookies from "js-cookie";
// If user is loggedIn this will redirect the user to the login route

export const DoctorAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    const hasValidToken = isTokenValid();
    // If user is not logged in it will redirect it to the login page
    if (!Cookies.get("doctorEmail")&& !Authentication.doctor && !hasValidToken) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};
export const PatientAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    // If user is not logged in it will redirect it to the login page
    const hasValidToken = isTokenValid();
    if (!Cookies.get("patientEmail") && !Authentication.patient && !hasValidToken) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};

export const HealthCareAuthentication = ({ children }) => {
    // If user is not logged in it will redirect it to the login page
    const Authentication = useAuthentication();
    const hasValidToken = isTokenValid();
    if (!Cookies.get("hcfadmin_Email") && !Authentication.hcf && !hasValidToken){
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};

export const ClinicAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    const hasValidToken = isTokenValid();
    // If user is not logged in it will redirect it to the login page
    if (!Cookies.get("clinicEmail")&& !Authentication.clinic && !hasValidToken) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};

export const DiagnostAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    const hasValidToken = isTokenValid();
    // If user is not logged in it will redirect it to the login page
    if (!Cookies.get("diagnostic_Email")&& !Authentication.diagnost && !hasValidToken) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};
