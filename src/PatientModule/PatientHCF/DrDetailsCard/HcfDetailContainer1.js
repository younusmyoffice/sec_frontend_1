import { Box, Typography, Skeleton } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import "./hcfdetailscard.scss";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import hcfpic from "../../../static/images/DrImages/doctor_alter.jpeg";
import CustomButton from "../../../components/CustomButton/custom-button";

const useStyles = makeStyles({
    drname: {
        color: "#313033",
        fontFamily: "Poppins",
        fontSize: "20px",
        fontStyle: "normal",
        fontWeight: "900",
        lineHeight: "30px",
    },
    specialist: {
        fontFamily: "Poppins",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "24px",
    },
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "space-between",
    },
});

const Container1 = ({
    Fname,
    profile_picture,
    company_name,
    business_name,
    worktime,
    isLoading, // Suggest passing isLoading from parent for better control
}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const handleBackClick = () => {
        // Navigate to 'PatientModule/dashboard/explore'
        navigate("/patientDashboard/dashboard/explore");
    };

    return (
        <Box sx={{ width: "100%" }}>
            {/* Button Container */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <CustomButton
                    label="Back"
                    isTransaprent={true}
                    leftIcon={<ChevronLeftIcon />}
                    buttonCss={{ border: "none" }}
                    handleClick={handleBackClick}
                    />
                
            </Box>

            {/* Doctor Card */}
            <Box className={classes.cardContainer}>
                <Box sx={{ display: "flex", marginTop: "1%", width: "70%" }}>
                    {/* Doctor Image */}
                    <Box sx={{ width: "213px", height: "184px" }}>
                        {isLoading ? (
                            <Skeleton variant="rectangular" width="100%" height="100%" />
                        ) : (
                            <Box
                                component={"img"}
                                src={profile_picture || hcfpic}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                    padding: "2%",
                                }}
                            />
                        )}
                    </Box>
                    {/* Doctor Details */}
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            padding: "2%",
                        }}
                    >
                        <Box>
                            <Typography className={classes.drname}>
                                {isLoading ? <Skeleton width={100} /> : business_name}
                            </Typography>
                            <Typography className={classes.specialist}>
                                {isLoading ? <Skeleton width={80} /> : company_name}
                            </Typography>
                            
                        </Box>
                    </Box>
                </Box>

                {/* Working Time */}
                <Box sx={{ marginTop: "70px" }}>
                    <Typography className={classes.drname}>
                        {isLoading ? <Skeleton width={120} /> : "Working Time"}
                    </Typography>
                    <Typography className={classes.specialist}>
                        {isLoading ? 
                            <Skeleton width={150} />
                         : worktime}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

Container1.propTypes = {
    Fname: PropTypes.string,
    profile_picture: PropTypes.string,
    company_name: PropTypes.string,
    business_name: PropTypes.string,
    service_day_from: PropTypes.string,
    service_day_to: PropTypes.string,
    isLoading: PropTypes.bool, // New prop type for loading
};

Container1.defaultProps = {
    isLoading: false, // Set a default value for loading state
};

export default Container1;
