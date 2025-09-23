import React,{useState, useEffect} from "react";
// import "./SuperAdminDoctor.scss";
import { NavLink } from "react-router-dom";
import { Box, Typography, CircularProgress, Pagination, Skeleton} from "@mui/material";
import DateModal from "../../../components/DateModal/DateModal";
import FilterModal from "../../../components/FilterModal/FilterModal";
import HCFAdminCard from "../../../components/Card/HCFadminCard/HCFAdminCard";
import CustomButton from "../../../components/CustomButton";
import { PaginationCard } from "../../../PatientDashboard/PatientAppointment/PatientCards";
import axiosInstance from "../../../config/axiosInstance";
import NoAppointmentCard from "../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

const SuperAdminHCF = () => {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const[currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const fetchData = async () => {
        setLoading(true);
        try{
            const resp = await axiosInstance.get('/sec/superadmin/acessibility/hcf');
            console.log("Dashboard Response from API: ",resp?.data);
            setCardData(resp?.data?.response || []);
        }catch(err){
            console.log("Error : ", err);
        }finally {
            setLoading(false);
        }
      };
      
      useEffect( () => {
        fetchData();
      },[] )
    
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "acessibility");
        localStorage.setItem("path", "hcf");

        const timer = setTimeout(() => {
            setLoading(false);
            setCardData([
                { id: 1, name: "Healthcare Facility 1" },
                { id: 2, name: "Healthcare Facility 2" },
                { id: 3, name: "Healthcare Facility 3" },
                { id: 4, name: "Healthcare Facility 4" },
                { id: 5, name: "Healthcare Facility 5" },
            ]);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const renderSkeletons = () => (
        <>
            <Skeleton variant="rectangular" height={150} style={{ borderRadius: "10px", marginBottom: "1rem" }} />
            <Skeleton variant="rectangular" height={150} style={{ borderRadius: "10px", marginBottom: "1rem" }} />
            <Skeleton variant="rectangular" height={150} style={{ borderRadius: "10px", marginBottom: "1rem" }} />
        </>
    );

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    
    const paginatedData = cardData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);;



    return (
    <>
    {loading ? (
            <div className="loader-container">
            <div className="nav-d-f-container">
            <nav className="NavBar-Container-Appoinement">
                            <Skeleton variant="text" width="30%" height={30} style={{ marginRight: '1rem' }} />
                            <Skeleton variant="text" width="30%" height={30} style={{ marginRight: '1rem' }} />
                            <Skeleton variant="text" width="30%" />
                        </nav>
                        <div className="date-filter1">
                            <Skeleton variant="rectangular" width={80} height={40} style={{ marginRight: '1rem' }} />
                            <Skeleton variant="rectangular" width={80} height={40} />
                        </div>
                    </div>
                    <div className="doctor-container">
                        {renderSkeletons()}
                        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "Right" }}>
                            <Skeleton variant="rectangular" width={120} height={40} />
                        </div>
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
            {paginatedData.map((data, index) => (
                            <HCFAdminCard key={index} data={data} />
                        ))}
                        <Box display="flex" justifyContent="right" mt={2}>
                            <Pagination
                                count={Math.ceil(cardData.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                
                            />
                        </Box>
                     </div>
                 </>
              )}
         </>
     );
};
export default SuperAdminHCF; 



