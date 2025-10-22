import { Box, Typography, Skeleton } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/CustomButton/custom-button";
import dotLogo from "../../static/images/dotIcon.png";
import DrImage from "../../static/images/DrImages/drProfileImage.png";
import CustomModal from "../../components/CustomModal/custom-modal";
import BookAppointmentModal from "./BookingAppointmentModal";
import axiosInstance from "../../config/axiosInstance";
import { getProfileImageSrc } from "../../utils/imageUtils";

const ContainerOne = ({ Fname, Mname, Lname, Qualification,hospital, DrImage, worktime, hcfDoc = false }) => {
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
            flexWrap: "nowrap",
            width: "100%",
            justifyContent: "space-between",
        },
        BookAppointmentContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        BookAppointmentContainerDetails: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
        },
    });

    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    let ID;
    if (params.resID) {
        ID = params.resID;
    } else if (params.hcddocid) {
        ID = params.hcddocid;
    }

    const navigate = useNavigate();

    useEffect(() => {
        // Simulate API call or data fetch
        const fetchData = () => {
            setTimeout(() => {
                setIsLoading(false); // Set loading to false after data fetch
            }, 2000); // Simulate 2 seconds loading time
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ width: "100%" }} id={"book_appointment_modal_container"}>
            {/* Button Container */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <CustomButton
                    label="Back"
                    isTransaprent={true}
                    leftIcon={<ChevronLeftIcon />}
                    buttonCss={{ border: "none" }}
                    handleClick={() => navigate(-1)}
                />
                <Box>
                    <Box component={"img"} src={dotLogo} alt="Dot logo..." />
                </Box>
            </Box>

            {/* Card and working time container */}
            <Box className={classes.cardContainer}>
                {/* Doctor Card */}
                <Box sx={{ display: "flex", marginTop: "1%", width: "70%" }}>
                    {/* Dr Image */}
                    <Box sx={{ width: "213px", height: "184px" }}>
                        {isLoading ? (
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height="100%"
                                sx={{ borderRadius: "8px" }}
                            />
                        ) : (
                            <Box
                                component={"img"}
                                src={getProfileImageSrc(DrImage, DrImage)}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                    padding: "2%",
                                }}
                            />
                        )}
                    </Box>

                    {/* Dr Details */}
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            padding: "2%",
                        }}
                    >
                        {isLoading ? (
                            <Box>
                                <Skeleton width={150} height={30} />
                                <Skeleton width={100} height={20} sx={{ marginTop: 1 }} />
                                <Skeleton width={120} height={20} sx={{ marginTop: 1 }} />
                            </Box>
                        ) : (
                            <Box>
                                <Typography className={classes.drname}>
                                    {Fname} {Mname} {Lname}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        color: "#AEAAAE",
                                    }}
                                >
                                    {Qualification}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: "Poppins",
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        color: "#AEAAAE",
                                    }}
                                >
                                    {hospital}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>

                {/* Working time container */}
                <Box className={classes.BookAppointmentContainer}>
                    <Box className={classes.BookAppointmentContainerDetails}>
                        {isLoading ? (
                            <Skeleton width={200} height={30} />
                        ) : (
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "20px",
                                    fontWeight: "500",
                                    
                                }}
                            >
                                Working Time
                            </Typography>
                        )}
                        {isLoading ? (
                            <Skeleton width={300} height={20} />
                        ) : (
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#AEAAAE",
                                }}
                            >
                                {worktime}
                            </Typography>
                        )}
                        {!isLoading && (
                            <CustomButton
                                label={"Book Appointment"}
                                isElevated
                                handleClick={() => setOpenDialog(!openDialog)}
                            />
                        )}
                        <CustomModal
                            isOpen={openDialog}
                            title={"Book Appointment"}
                            conditionOpen={setOpenDialog}
                        >
                            <Box className="Book-appointment-modal">
                                <BookAppointmentModal drID={ID} hcfDoc={hcfDoc} />
                            </Box>
                        </CustomModal>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

ContainerOne.propTypes = {
    Fname: PropTypes.string.isRequired,
    Mname: PropTypes.string.isRequired,
    Lname: PropTypes.string.isRequired,
    Qualification: PropTypes.string.isRequired,
};

export default ContainerOne;
