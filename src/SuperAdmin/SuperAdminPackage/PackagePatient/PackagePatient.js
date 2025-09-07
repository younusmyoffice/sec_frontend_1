import React from "react";
import { NavLink } from "react-router-dom";

const PackagePatient = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "package");
        localStorage.setItem("path", "packagepatient");
    }, []);
    return (
        <>
            <nav className="NavBar-Container-Appoinement">
                <NavLink to={"/superadmin/package/packagedoctor"}>Doctor</NavLink>
                <NavLink to={"/superadmin/package/packagepatient"}>Patient</NavLink>
            </nav>
        </>
    );
};

export default PackagePatient;
