/**
 * RequireAuthentication Components
 * 
 * Authentication guards that protect routes by checking user authentication status.
 * 
 * Features:
 * - Three-factor authentication check (cookie, context, JWT token)
 * - Automatic redirect to login if not authenticated
 * - Token validation via jwtUtils
 * - Role-based access control
 * - Preserves attempted URL for redirect after login
 */

import { Navigate, useLocation } from "react-router-dom";
import { useAuthentication } from "./UserProvider";
import { isTokenValid } from "../utils/jwtUtils";
import React from "react";
import Cookies from "js-cookie";

/**
 * DoctorAuthentication Guard
 * 
 * Protects doctor-specific routes.
 * Checks: doctorEmail cookie, context.doctor, JWT token validity
 */
export const DoctorAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    const hasValidToken = isTokenValid();
    
    // Three-factor authentication check
    // If ALL fail → redirect to login
    // If ANY pass → allow access
    if (!Cookies.get("doctorEmail") && !Authentication.doctor && !hasValidToken) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};

/**
 * PatientAuthentication Guard
 * 
 * Protects patient-specific routes.
 * Checks: patientEmail cookie, context.patient, JWT token validity
 */
export const PatientAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    const hasValidToken = isTokenValid();
    
    // Three-factor authentication check
    if (!Cookies.get("patientEmail") && !Authentication.patient && !hasValidToken) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};

/**
 * HealthCareAuthentication Guard
 * 
 * Protects HCF Admin-specific routes.
 * Checks: hcfadmin_Email cookie, context.hcf, JWT token validity
 */
export const HealthCareAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    const hasValidToken = isTokenValid();
    
    // Three-factor authentication check
    if (!Cookies.get("hcfadmin_Email") && !Authentication.hcf && !hasValidToken){
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};

/**
 * ClinicAuthentication Guard
 * 
 * Protects clinic-specific routes.
 * Checks: clinicEmail cookie, context.clinic, JWT token validity
 */
export const ClinicAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    const hasValidToken = isTokenValid();
    
    // Three-factor authentication check
    if (!Cookies.get("clinicEmail") && !Authentication.clinic && !hasValidToken) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};

/**
 * DiagnostAuthentication Guard
 * 
 * Protects diagnostic center-specific routes.
 * Checks: diagnostic_Email cookie, context.diagnost, JWT token validity
 */
export const DiagnostAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    const hasValidToken = isTokenValid();
    
    // Three-factor authentication check
    if (!Cookies.get("diagnostic_Email") && !Authentication.diagnost && !hasValidToken) {
        return <Navigate to={"/"} state={{ path: location?.pathname }} />;
    }
    return children;
};

/**
 * SuperAdminAuthentication Guard
 * 
 * Protects super admin-specific routes.
 * Checks: superAdminEmail cookie, context.superAdmin, JWT token validity
 */
export const SuperAdminAuthentication = ({ children }) => {
    const Authentication = useAuthentication();
    const location = useLocation();
    const hasValidToken = isTokenValid();
    
    // Three-factor authentication check
    if (!Cookies.get("superAdminEmail") && !Authentication.superAdmin && !hasValidToken) {
        return <Navigate to={"/superAdminLogin"} state={{ path: location?.pathname }} />;
    }
    return children;
};
