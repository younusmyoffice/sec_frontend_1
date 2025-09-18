import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DoctorListing = () => {
    useEffect(() => {
        document.getElementById("location-search-container").style.display = "none";
    }, []);

    const navigate = useNavigate();
    const [navigateToRoute, setNavigateToRoute] = useState(
        localStorage.getItem("path") == "doctoractiveListing"
            ? "/doctordashboard/doctorListing/doctoractiveListing"
            : localStorage.getItem("path") == "doctorsavedInDraft"
            ? "/doctordashboard/doctorListing/doctorsavedInDraft"
            : "/doctordashboard/doctorListing/doctoractiveListing",
    );
    useEffect(() => {
        navigate(String(navigateToRoute));
    }, []);

    return (
        <>
            <div style={{ width: "100%", height: "96vh" }}>
                <Outlet />
            </div>
        </>
    );
};

export default DoctorListing;
