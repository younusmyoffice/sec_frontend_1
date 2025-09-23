import React, { Fragment, useEffect, useState } from "react";
import profileImage from "../../../../static/images/DrImages/profileImage.png";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Skeleton, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import "./cardRequest.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import CustomModal from '../../../custom-modal';
import axios from "axios";
import CustomRadioButton from "../../../../components/CustomRadioButton";
import CustomModal from "../../../../components/CustomModal";
import GroupIcon from "../../../../static/images/DrImages/GroupIcon.svg";
import CustomButton from "../../../../components/CustomButton/custom-button";
import { baseURL } from "../../../../constants/const";
import axiosInstance from "../../../../config/axiosInstance";
import profileimg from "../../../../static/images/DrImages/pat1.png";
import DownloadIcon from "@mui/icons-material/Download";

const CustomRequestCard = ({ data = {}, label, AcceptOrRejectButtonClicked, accAndRejClicked, }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenDialogCancle(false);
        setOpenDialogReschedule(false);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openDialogCancle, setOpenDialogCancle] = useState(false);
    const [openDialogReschedule, setOpenDialogReschedule] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openPatientModal, setOpenPatientModal] = useState(false);
    const [clinicAppointmentPatient, setClinicAppointmentPatient] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const radioValues = [
        "I have a schedule clash",
        "I am not available at the schedule",
        "I have some emergency",
        "I am not well",
        "Other Emergencies",
    ];
    const [radioVal, setRadioVal] = React.useState(radioValues[0]);
    const [acceptAppointment, setAcceptAppointment] = useState({
        appointment_id: null,
        patient_id: null,
        doctor_id: null,
        status: null,
    });
    const [clicked, setClicked] = useState(false);

    const [rejectAppointment, setRejectappointment] = useState({
        appointment_id: data?.appointment_id,
        patient_id: data?.patient_id,
        doctor_id: data?.doctor_id,
        reason: null,
        status: "in_progress",
        option: "reject",
    });
    console.log("Reject appointment data : ", rejectAppointment);
    const [rejectClicked, setRejectClicked] = useState(false);
    const [appointmentRequestData, setAppointmentRequestData] = useState({
        appointment_id: null,
        patient_id: null,
        doctor_id: null,
        // reason: null,
        status: "in_progress",
        option: "accept",
    });


    useEffect(() => {
        setAppointmentRequestData({
            appointment_id: data?.appointment_id,
            patient_id: data?.patient_id,
            doctor_id: data?.doctor_id,
            status: "in_progress",
            option: "accept",
        });
    }, []);

    const AcceptAppointment = async () => {
        setClicked(!clicked);
        try {
            console.log("Sending appointment request data:", appointmentRequestData);
            console.log("API endpoint: /sec/Doctor/AppointmentsRequestsAccept");
            
            const response = await axiosInstance.post(
                "/sec/Doctor/AppointmentsRequestsAccept",
                appointmentRequestData,
            );
            
            console.log("API Response:", response?.data);
            alert(`Appointment ${response?.data?.response?.status || 'accepted successfully'}`);
            
            // acceptButtonClicked("child")
            AcceptOrRejectButtonClicked(!accAndRejClicked);
        } catch (error) {
            console.error("Accept appointment error:", error);
            console.error("Error response:", error.response?.data);
            alert(`Error: ${error.response?.data?.error || error.message || 'Failed to accept appointment'}`);
        }
    };

    const RejectAppointment = async () => {
        // setRejectClicked(true);
        console.log("Hitting reject request");
        try {
            console.log("Sending reject appointment data:", rejectAppointment);
            console.log("API endpoint: /sec/Doctor/AppointmentsRequestsReject");
            
            const response = await axiosInstance.post(
                "/sec/Doctor/AppointmentsRequestsReject",
                rejectAppointment,
            );
            
            console.log("Reject API Response:", response?.data);
            alert(`Appointment ${response?.data?.response?.status || 'rejected successfully'}`);
            
            AcceptOrRejectButtonClicked(!accAndRejClicked);
            setRejectAppointmentFlag(false);
        } catch (error) {
            console.error("Reject appointment error:", error);
            console.error("Error response:", error.response?.data);
            alert(`Error: ${error.response?.data?.error || error.message || 'Failed to reject appointment'}`);
            setRejectAppointmentFlag(false);
        }
    };

    const [rejectAppointmentFlag, setRejectAppointmentFlag] = useState(false);

    useEffect(() => {
        if (rejectAppointmentFlag) {
            RejectAppointment();
        }
    }, [rejectAppointmentFlag]);

    // const handleViewClick = () => {
    //     setOpenPatientModal(true);
    // };
    const handleViewClick = (patient_id, appointment_id) => {
        clinicAppointmentRequestsList(patient_id, appointment_id);
        setOpenPatientModal(true);

    };


    const [openModal, setOpenModal] = useState(false);

    const handleViewReport = () => {
        setOpenModal(true);
    };

    const filepath =
        Array.isArray(clinicAppointmentPatient) && clinicAppointmentPatient[0]?.report_path;
    const filename =
        Array.isArray(clinicAppointmentPatient) && clinicAppointmentPatient[0]?.report_name;

    console.log("filepath", filepath);

    const handleDownloadReport = () => {
        // Direct download link for Google Drive
        const link = document.createElement("a");
        link.target = "_blank";
        link.href = filepath;
        link.download = filename;
        link.click();
    };

    const clinicAppointmentRequestsList = async (patient_id, appointment_id) => {
        setLoading(true); // Set loading to true
        try {
            const response = await axiosInstance.get(
                `sec/hcf/${patient_id}/${appointment_id}/ClinicAppointmentPatient`,
            );
            const Count = response?.data?.response || [];
            setClinicAppointmentPatient(Count);
        } catch (error) {
            console.error("Error fetching request data:", error.response);
        } finally {
            setLoading(false); // Set loading to false
        }
    };


    console.log("clinicAppointmentPatient---->", clinicAppointmentPatient);
    const fileUrl = filepath && (filepath.startsWith("http") ? filepath : `/assets/${filepath}`);

    return (
        <>
            <div className="Request-main-container">
                <div className="Request-inner-container">
                    {/* -----Image Container-------- */}
                    <div style={{ width: "3.13981rem", height: "height: 4.71831rem" }}>
                        <div className="RequestimageContainer">
                            <Box
                                className="image-container"
                                component={"img"}
                                sx={{ width: "100%", height: "100%" }}
                                src={data?.profile_picture || profileimg} // Fallback for no image
                                alt="Profile Image"
                            ></Box>
                        </div>
                    </div>

                    {/* --------- Details Container-------- */}
                    <div style={{ marginLeft: "2%" }}>
                        <div style={{ display: "flex", justifyContent: "flex-start" }}>
                            <Typography
                                sx={{
                                    color: "#313033",
                                    fontFamily: "Poppins",
                                    fontSize: "1.125rem",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "1.75rem",
                                }}
                            >
                                {/* {data?.patientBookedName === null
                                    ? null
                                    : data?.patientBookedName} */}
                                {!data?.patientBookingName
                                    ? !data?.patientBookedName
                                        ? null
                                        : data?.patientBookedName
                                    : data?.patientBookingName}
                            </Typography>
                        </div>
                        <div className="card-details-container">
                            <Typography
                                sx={{
                                    color: "#787579",
                                    fontFamily: "Poppins",
                                    fontSize: "0.75rem",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "1.125rem",
                                    letterSpacing: "0.006rem",
                                    whiteSpace: "nowrap", // Prevent wrapping
                                    overflow: "hidden", // Handle overflow
                                    textOverflow: "ellipsis", // Show ellipsis
                                    flex: "1", // Allow it to take available space
                                }}
                            >
                                {data?.appointment_date}
                                {" | "}
                                {data?.attachments}
                                {" | "}
                                {data?.report_name}
                            </Typography>
                            <Box
                                component="a"
                                onClick={() => handleViewClick(data?.patient_id, data?.appointment_id)}
                                sx={{
                                    color: "#E72B4A",
                                    fontFamily: "Poppins",
                                    fontSize: "0.75rem",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "1.125rem",
                                    letterSpacing: "0.006rem",
                                    textDecoration: "none",
                                    whiteSpace: "nowrap", // Prevent wrapping
                                    "&:hover": {
                                        textDecoration: "underline",
                                        cursor: "pointer"

                                    },
                                }}
                            >
                                View
                            </Box>

                            <CustomModal
                                style={{ display: "flex" }}
                                isOpen={openPatientModal}
                                conditionOpen={setOpenPatientModal}
                                title={
                                    <Box
                                        sx={{
                                            border: "1px solid #E6E1E5",
                                            borderTop: "1px",
                                            borderRight: "1px",
                                            borderLeft: "1px",
                                            width: "570px",
                                            height: "82px",
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            paddingLeft: "16px",
                                        }}
                                    >
                                        {loading ? (
                                            <Skeleton variant="text" width="40%" height={30} />
                                        ) : (
                                            <h2
                                                style={{
                                                    textAlign: "left",
                                                    fontFamily: "Poppins",
                                                    fontSize: "20px",
                                                    fontStyle: "normal",
                                                    fontWeight: "500",
                                                    lineHeight: "30px",
                                                    width: "100%",
                                                    height: "30px",
                                                }}
                                            >
                                                Patient Details
                                            </h2>
                                        )}
                                    </Box>
                                }
                            >
                                {loading ? (
                                    // 🦴 Skeleton content for modal body
                                    <Box sx={{ padding: 2 }}>
                                        <Skeleton variant="text" width="30%" />
                                        <Skeleton variant="text" width="70%" />
                                        <Skeleton variant="text" width="30%" sx={{ mt: 2 }} />
                                        <Skeleton variant="text" width="70%" />
                                        <Skeleton variant="text" width="30%" sx={{ mt: 2 }} />
                                        <Skeleton variant="text" width="70%" />

                                        <Skeleton variant="text" width="40%" sx={{ mt: 4 }} />
                                        <Skeleton variant="text" width="90%" />
                                        <Skeleton variant="text" width="90%" />

                                        <Skeleton variant="text" width="40%" sx={{ mt: 4 }} />
                                        <Skeleton variant="text" width="100%" height={200} />
                                    </Box>
                                ) : (
                                    <>
                                        <div>Patient Details</div>
                                        <div className="textfield-cont">
                                            <div className="name-email">
                                                <Typography sx={{ color: "#787579", fontSize: "0.875rem", fontWeight: 400 }}>Name</Typography>
                                                <Typography>{`${clinicAppointmentPatient[0]?.first_name} ${clinicAppointmentPatient[0]?.middle_name} ${clinicAppointmentPatient[0]?.last_name}`}</Typography>
                                            </div>
                                            <div className="name-email">
                                                <Typography sx={{ color: "#787579", fontSize: "0.875rem", fontWeight: 400 }}>Age</Typography>
                                                <Typography>{clinicAppointmentPatient[0]?.age}</Typography>
                                            </div>
                                            <div className="name-email">
                                                <Typography sx={{ color: "#787579", fontSize: "0.875rem", fontWeight: 400 }}>Gender</Typography>
                                                <Typography>{clinicAppointmentPatient[0]?.gender}</Typography>
                                            </div>
                                        </div>
                                        <div>
                                            <div>Attached files</div>
                                            <div className="textfield-cont">
                                                <div className="name-email">
                                                    <Typography sx={{ color: "#787579", fontSize: "0.875rem", fontWeight: 400 }}>File name</Typography>
                                                    <Typography>{clinicAppointmentPatient[0]?.attachments}</Typography>
                                                </div>
                                                <div className="name-email">
                                                    <Typography sx={{ color: "#E72B4A", cursor: "pointer" }} onClick={handleViewReport}>view</Typography>
                                                </div>
                                                <div className="name-email">
                                                    <Typography
                                                        sx={{
                                                            color: "#E72B4A",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={handleDownloadReport}
                                                    >
                                                        <DownloadIcon sx={{ marginRight: "5px" }} /> Download
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div>Questions Details</div>
                                            <div className="textfield-cont">
                                                {[1, 2, 3, 4, 5].map((q) => (
                                                    <div className="name-email" key={q}>
                                                        <Typography sx={{ color: "#787579", fontSize: "0.875rem", fontWeight: 400 }}>
                                                            Question {q}
                                                        </Typography>
                                                        <Typography>{clinicAppointmentPatient[0]?.[`answer_${q}`] || "answer"}</Typography>
                                                    </div>
                                                ))}
                                            </div>
                                            <CustomModal isOpen={openModal} conditionOpen={setOpenModal}>
                                                <Box
                                                    sx={{
                                                        width: "870px",
                                                        border: "1px solid #E6E1E5",
                                                        height: "80vh",
                                                        padding: "20px",
                                                        backgroundColor: "white",
                                                        overflowY: "scroll",
                                                    }}
                                                >
                                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                                        Report
                                                    </Typography>
                                                    <Document
                                                        // file={fileUrl}
                                                        file={clinicAppointmentPatient[0]?.report_path}
                                                        onLoadSuccess={onDocumentLoadSuccess}
                                                        loading={<Typography>Loading PDF...</Typography>}
                                                        error={<Typography color="error">Failed to load PDF.</Typography>}
                                                        noData={<Typography>No PDF file provided.</Typography>}
                                                    >
                                                        {Array.from(new Array(numPages), (el, index) => (
                                                            <Page
                                                                key={`page_${index + 1}`}
                                                                pageNumber={index + 1}
                                                                width={800}
                                                            />
                                                        ))}
                                                    </Document>
                                                </Box>
                                            </CustomModal>
                                        </div>
                                    </>
                                )}
                            </CustomModal>

                        </div>
                    </div>
                </div>
                {/* ------------ Button Container------------ */}
                <div className="request-button-container">
                    <div style={{ display: "flex", alignItems: "center", marginRight: "2%" }}>
                        {label ? (
                            <CustomButton
                                buttonCss={{
                                    display: "flex",
                                    width: "9.3125rem",
                                    height: "2.5rem",
                                    padding: "0.5rem 1rem",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    flexShrink: "0",
                                    borderRadius: "6.25rem",
                                }}
                                label={label}
                                isTransaprent={false}
                                handleClick={AcceptAppointment}
                            />
                        ) : null}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {label ? (
                            <MoreHorizIcon
                                sx={{
                                    cursor: "pointer",
                                    color: "#E6E1E5",
                                    border: "1px solid #E6E1E5",
                                    borderRadius: "50px",
                                }}
                                onClick={handleClick}
                            />
                        ) : null}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            {/* ---------------------- Appointments and Re-Schedule--------------------------------------------------- */}
                            <MenuItem onClick={() => setOpenDialog(!openDialog)}>Reject</MenuItem>
                            <CustomModal
                                isOpen={openDialog}
                                title={"Reject Appointment Request"}
                                conditionOpen={setOpenDialog}
                                footer={
                                    <Fragment>
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        ></Box>
                                    </Fragment>
                                }
                            >
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography>
                                        Are you sure. you want to cancel the appointment
                                    </Typography>
                                </Box>
                                <div style={{ marginTop: "4%" }}>
                                    <>
                                        <Box
                                            sx={{
                                                marginTop: "5%",
                                                display: "flex",
                                                flexWrap: "wrap",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                }}
                                            >
                                                Reason For Rejection
                                            </Typography>
                                            <CustomRadioButton
                                                label={""}
                                                handleChange={({ target }) => {
                                                    setRadioVal(target.value);
                                                    setRejectappointment({
                                                        ...rejectAppointment,
                                                        reason: target.value,
                                                    });
                                                }}
                                                value={radioVal}
                                                items={radioValues}
                                            />
                                            <Box sx={{ marginTop: "5%", width: "100%" }}>
                                                <Typography>Add Note</Typography>
                                                <TextField
                                                    style={{ width: "100%", padding: "3%" }}
                                                    placeholder=" Note: Please leave the review here."
                                                    multiline
                                                    rows={3}
                                                    maxRows={4}
                                                />
                                            </Box>
                                            <Box
                                                sx={{
                                                    marginTop: "6%",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <CustomButton
                                                    handleClick={() =>
                                                        setRejectAppointmentFlag(true)
                                                    }
                                                    label="Reject Appointment"
                                                />
                                            </Box>
                                        </Box>
                                    </>
                                </div>
                            </CustomModal>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomRequestCard;
