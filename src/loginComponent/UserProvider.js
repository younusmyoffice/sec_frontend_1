import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
const UserContextProvider = createContext(null);

// Here we will store the user credentials and pass it to the whole tree
export const UserProvider = ({ children }) => {
    // Here we are maintaining the state and defined the function of login and logout
    const [doctor, setDoctor] = useState();
    const [patient, setPatient] = useState();
    const [hcf, setHcf] = useState();
    const [clinic, setClinic] = useState();
    const [diagnost, setDiagnost] = useState();

    const DoctorLogin = (user) => {
        setDoctor(user);
    };

    const PatientLogin = (user) => {
        setPatient(user);
    };

    const HealthCare = (user) => {
        setHcf(user);
    };

    const ClinicLogin = (user) => {
        setClinic(user);
    };

    const DiagnostLogin = (user) => {
        setDiagnost(user);
    };

    const LogoutDoctor = () => {
        setDoctor(null);
    };

    const LogoutPatient = () => {
        setPatient(null);
    };

    const LoginHcf = () => {
        setHcf(null);
    };

    const LogoutClinic = () => {
        setClinic(null);
    };
    
    const LogoutDiagnost = () => {
        setHcf(null);
    };

    // using the UserContextProvider provider we will provide the values
    // Will wrap this component with the children props
    return (
        <UserContextProvider.Provider
            value={{
                doctor,
                DoctorLogin,
                patient,
                PatientLogin,
                LogoutDoctor,
                LogoutPatient,
                HealthCare,
                LoginHcf,
                hcf,
                DiagnostLogin,
                LogoutClinic,
                LogoutDiagnost,
                ClinicLogin,
                clinic,
                diagnost,

            }}
        >
            {children}
        </UserContextProvider.Provider>
    );
};
// we will define a function that returns a value of UserContextProvider
export const useAuthentication = () => {
    return useContext(UserContextProvider);
};
//We will wrap the entire component tree with the UserProvider
