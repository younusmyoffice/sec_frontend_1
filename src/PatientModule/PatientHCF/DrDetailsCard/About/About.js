import React from "react";
import { NavLink, useParams } from "react-router-dom";
import ContainerThree from "../../../../PatientModule/DrDetailsCard/ContainerThree";
import { useLocation } from "react-router-dom";


const About = () => {
    const ID = useParams();
    console.log("Params abour : " , ID.hcfID)
    const location = useLocation();
    const { description } = location.state || {}; // Fall back to empty object if no state is passed
    return (
        <>
            <nav className="NavBar-Container-Appoinement">
                <NavLink to={`/patientdashboard/hcfDetailCard/${ID.hcfID}/about`}>About</NavLink>
                <NavLink to={`/patientdashboard/hcfDetailCard/${ID.hcfID}/department`}>
                    Department
                </NavLink>
                <NavLink to={`/patientdashboard/hcfDetailCard/${ID.hcfID}/labs`}>Labs</NavLink>
            </nav>
            <div className="about-data" style={{ marginTop: "4rem", width: "100%" }}>
                <ContainerThree description={description}/>
            </div>
        </>
    );
};

export default About;
