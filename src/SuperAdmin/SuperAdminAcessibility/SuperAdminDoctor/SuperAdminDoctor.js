import React, { useState } from "react";
import "./SuperAdminDoctor.scss";
import { NavLink } from "react-router-dom";
import {CircularProgress, Pagination, Skeleton } from "@mui/material";
import DateModal from "../../../components/DateModal/DateModal";
import FilterModal from "../../../components/FilterModal/FilterModal";
import AdminDoctorCard from "../../../components/Card/Superadmindoctorcard/AdminDoctorCard";
import { PaginationCard } from "../../../PatientDashboard/PatientAppointment/PatientCards";

const SuperAdminDoctor = () => {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalCards = 9; 
    const totalPages = Math.ceil(totalCards / itemsPerPage);

    const doctorCards = Array.from({ length: totalCards }, (_, index) => (
        <AdminDoctorCard key={index} />
    ));
    
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "acessibility");
        localStorage.setItem("path", "doctors");

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCards = doctorCards.slice(startIndex, endIndex);

    const renderSkeletons = () => (
        Array.from({ length: itemsPerPage }).map((_, index) => (
            <Skeleton 
                key={index}
                variant="rectangular"
                height={200}
                style={{ marginBottom: '1rem', borderRadius: '10px' }}
            />
        ))
    );

    return (
        <>
           {loading ? (
                   <div className="loader-container">
                   <Skeleton variant="rectangular" height={40} width="100%" style={{ marginBottom: '1rem' }} />
                   <div className="nav-d-f-container">
                       <div className="NavBar-Container-Appoinement">
                           <Skeleton variant="text" width="30%" height={30} style={{ marginRight: '1rem' }} />
                           <Skeleton variant="text" width="30%" height={30} style={{ marginRight: '1rem' }} />
                           <Skeleton variant="text" width="30%" height={30} />
                       </div>
                       <div className="date-filter1">
                           <Skeleton variant="rectangular" width={80} height={40} style={{ marginRight: '1rem' }} />
                           <Skeleton variant="rectangular" width={80} height={40} />
                       </div>
                   </div>
                   <div className="doctor-container">
                       {renderSkeletons()}
                   </div>
                   <div style={{ display: "flex", justifyContent: "Right" }}>
                       <Skeleton variant="rectangular" width={120} height={40} />
                   </div>
               </div>
            ) : (
                <>
            <div className="nav-d-f-container">
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/superadmin/accessibility/doctors"}>Doctor</NavLink>
                    <NavLink to={"/superadmin/accessibility/patient"}>Patient</NavLink>
                    <NavLink to={"/superadmin/accessibility/hcf"}>HCF</NavLink>
                </nav>
                <div className="date-filter1">
                    <DateModal />
                    <FilterModal />
                </div>
            </div>
            <div className="doctor-container">
            {currentCards} 
                <AdminDoctorCard />
                <AdminDoctorCard />
                <AdminDoctorCard />
                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "Right" }}>
                    <Pagination
                       count={totalPages}
                       page={currentPage}
                       onChange={handlePageChange}
                       color="primary"
                       size="large"
                     />
                </div>
            </div>
        </>
    )} 
    </>
    );
};
export default SuperAdminDoctor;
