import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Container5 from "../Container5";
import Container3 from "../Container3";
import { baseURL } from "../../../../../constants/const";

const Department = () => {
    const [departData, setDepartData] = useState([]);

    const getDeparthcf = async () => {
        try {
            const response = await axios.get(`${baseURL}/sec/patient/HcfDeptDocdetails/26`);
            setDepartData(response.data?.response ?? []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getDeparthcf();
        console.log("Working Doctor request");
    }, []);

    return (
        <>
            <nav className="NavBar-Container-Appoinement">
                <NavLink to={"/patientdashboard/hcfDetailCard/:hcfID/about"}>About</NavLink>
                <NavLink to={"/patientdashboard/hcfDetailCard/:hcfID/department"}>
                    Department
                </NavLink>
                <NavLink to={"/patientdashboard/hcfDetailCard/:hcfID/labs"}>Labs</NavLink>
            </nav>
            <div className="about-data" style={{ marginTop: "4rem" }}>
                {departData.map((data, index) => (
                    <div key={data.suid + "" + index}>
                        {/* Conditionally render Container3 or Container5 */}
                        {index % 2 === 0 ? (
                            <Container5 lab_id={data.lab_id} />
                        ) : (
                            <Container3
                                test_id={data.test_id}
                                about={data.about}
                                amount={data.amount}
                                service_day_from={data.service_day_from}
                                service_day_to={data.service_day_to}
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Department;
