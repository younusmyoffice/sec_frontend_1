import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Box, Typography, CircularProgress, Pagination, Skeleton } from "@mui/material";
import DateModal from "../../../components/DateModal/DateModal";
import FilterModal from "../../../components/FilterModal/FilterModal";
import PatientadminCard from "../../../components/Card/PatientCard/PatientadminCard";
import CustomButton from "../../../components/CustomButton";
import { PaginationCard } from "../../../Dashboard/PatientAppointment/PatientCards";
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../../Dashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

const SuperAdminPatient = () => {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    
    const fetchData = async () => {
        try{
            const resp = await axiosInstance.get('/sec/superadmin/acessibility/patient');
            console.log("Dashboard Response from API: ",resp?.data);
            setCardData(resp?.data?.response || []);
            setLoading(false);
        }catch(err){
            console.log("Error : ", err);
            setLoading(false);
        }
      }
      
      useEffect( () => {
        fetchData();
      },[] )
    
      React.useEffect(() => {
        localStorage.setItem("activeComponent", "acessibility");
        localStorage.setItem("path", "patient");
    }, []);

    const totalCards = cardData.length; 
    const totalPages = Math.ceil(totalCards / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage; 
    const endIndex = startIndex + itemsPerPage; 
    const currentCards = cardData.slice(startIndex, endIndex); 

    const handlePageChange = (event, value) => {
        setCurrentPage(value); 
    };

    const renderSkeletons = () => (
        Array.from({ length: itemsPerPage }).map((_, index) => (
            <Skeleton 
                key={index}
                variant="rectangular"
                height={200} // adjust height based on PatientadminCard height
                style={{ marginBottom: '1rem', borderRadius: '10px' }}
            />
        ))
    );
    
    return (
        <>
            <div className="nav-d-f-container">
                <nav className="NavBar-Container-Appoinement">
                {loading ? (
                        <>
                            <Skeleton variant="text" width="30%" height={30} style={{ marginRight: '1rem' }} />
                            <Skeleton variant="text" width="30%" height={30} style={{ marginRight: '1rem' }} />
                            <Skeleton variant="text" width="30%" height={30} />
                        </>
                    ) : (
                        <>  
                    <NavLink to={"/superadmin/accessibility/doctors"}>Doctor</NavLink>
                    <NavLink to={"/superadmin/accessibility/patient"}>Patient</NavLink>
                    <NavLink to={"/superadmin/accessibility/hcf"}>HCF</NavLink>
                    </>
                    )}
                </nav>
                <div className="date-filter1">
                {loading ? (
                        <>
                            <Skeleton variant="rectangular" width={80} height={40} style={{ marginRight: '1rem' }} />
                            <Skeleton variant="rectangular" width={80} height={40} />
                        </>
                    ) : (
                        <>

                    <DateModal />
                    <FilterModal />
                    </>
                    )}
                </div>
            </div>
            <div className="doctor-container">
            {loading ? (
                    <div className="loader-container">
                        {renderSkeletons()}
                        <div style={{ display: "flex", justifyContent: "right" }}>
                            <Skeleton variant="rectangular" width={120} height={40} />
                        </div>
                    </div>
                ) : (
                    <>
                        {currentCards.map((data, index) => (
                            <PatientadminCard key={index} {...data} /> 
                        ))}
                <PatientadminCard />
                <PatientadminCard />
                <PatientadminCard />
                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "Right"}}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                    />
                </div>
               </>
                )} 
            </div>
        </>
    
    );
};

export default SuperAdminPatient;
