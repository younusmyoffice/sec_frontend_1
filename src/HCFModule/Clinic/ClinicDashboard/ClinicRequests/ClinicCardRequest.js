import React, { Fragment, useEffect, useState } from "react";
import profileImage from "../../../../static/images/DrImages/profileImage.png";
import { NavLink, useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";

import { Box, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import "./ClinicCardRequest.scss";
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
import { Schedule } from "@mui/icons-material";
import CustomSnackBar from "../../../../components/CustomSnackBar";
import { formatDate } from "../../../../constants/const";

const ClinicCardRequest = ({ data = {}, label, AcceptOrRejectButtonClicked, accAndRejClicked }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [snackType, setSnackType] = useState("");
    const [openPatientModal, setOpenPatientModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [clinicAppointmentPatient, setClinicAppointmentPatient] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    const [snackMessage, setSnackMessage] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
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
            const response = await axiosInstance.post(
                "/sec/hcf/clinicAppointmentAccept",
                JSON.stringify(appointmentRequestData),
                { Accept: "Application/json" },
            );
            setSnackMessage("Appointment Confirmed");
            setSnackType("success");
            setSnackOpen(true);
            console.log("RESPONSE : ", response?.data);
            // acceptButtonClicked("child")
            AcceptOrRejectButtonClicked(!accAndRejClicked);
        } catch (error) {
            console.log(error.response);
            setSnackMessage("error during booking appointment");
            setSnackType("error");
            setSnackOpen(true);
        }
    };

    const RejectAppointment = async () => {
        // setRejectClicked(true);
        console.log("Hitting reject request");
        try {
            const response = await axiosInstance.post(
                "/sec/hcf/clinicAppointmentReject",
                JSON.stringify(rejectAppointment),
            );
            setSnackMessage("Appointment Booking Rejected");
            setSnackType("success");
            setSnackOpen(true); // alert(response?.data.response.status);
            console.log("RESPONSE : ", response?.data);
            AcceptOrRejectButtonClicked(!accAndRejClicked);
            setRejectAppointmentFlag(false);
            setOpenDialog(false);
        } catch (error) {
            console.log(error.response);
            setRejectAppointmentFlag(false);
            setSnackMessage("error during rejecting  appointment says ", error.response);
            setSnackType("error");
            setSnackOpen(true);
        }
    };

    const [rejectAppointmentFlag, setRejectAppointmentFlag] = useState(false);

    useEffect(() => {
        if (rejectAppointmentFlag) {
            RejectAppointment();
        }
    }, [rejectAppointmentFlag]);

    const navigate = useNavigate();
    //----------------------------------------------------modal code--------------------------------------------
    const patient_id = data?.patient_id;
    const appointment_id = data?.appointment_id;
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

    useEffect(() => {
        clinicAppointmentRequestsList(patient_id, appointment_id);
    }, []);

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
    const fileUrl = filepath && (filepath.startsWith("http") ? filepath : `/assets/${filepath}`);

    return (
        <>
            <div className="Request-main-container">
                <CustomSnackBar type={snackType} message={snackMessage} isOpen={snackOpen} />
                <div className="Request-inner-container">
                    {/* -----Image Container-------- */}
                    <div style={{ width: "3.13981rem", height: "height: 4.71831rem" }}>
                        <div className="RequestimageContainer">
                            <Box
                                className="image-container"
                                component={"img"}
                                sx={{ width: "100%", height: "100%" }}
                                src={data?.profile_picture || GroupIcon}
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
                                {data?.first_name || data?.middle_name || data?.last_name
                                    ? `${data?.first_name || ""} ${data?.middle_name || ""} ${
                                          data?.last_name || ""
                                      }`.trim()
                                    : null}
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
                                    width: "17rem",
                                }}
                            >
                                {/* Schedule | {data?.appointment_date.split("T")[0]} | Attachments{" "} */}
                                {"Schedule | "}
                                {formatDate(data?.appointment_date)}
                                {" | "}
                                {data?.attachments}
                            </Typography>
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
                                    color: "#4f4d4d",
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
                            <MenuItem onClick={() => setOpenPatientModal(!openPatientModal)}>
                                patient Details
                            </MenuItem>
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
                            {/* view modal */}
                            <CustomModal
                                style={{
                                    display: "flex",
                                }}
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
                                            justifycontent: "flexstart",
                                        }}
                                    >
                                        <h2
                                            style={{
                                                textAlign: "left",
                                                fontfamily: "poppins",
                                                fontSize: "20px",
                                                fontstyle: "normal",
                                                fontweight: "500",
                                                lineheight: "30px",
                                                width: "100%",
                                                height: "30px",
                                            }}
                                        >
                                            Patient Details
                                        </h2>
                                    </Box>
                                }
                            >
                                <div>Patient Details</div>
                                <div className="textfield-cont">
                                    <div className="name-email">
                                        <Typography
                                            sx={{
                                                color: "#787579",
                                                fontSize: "0.875rem",
                                                fontWeight: 400,
                                            }}
                                        >
                                            Name
                                        </Typography>
                                        <Typography>{`${clinicAppointmentPatient[0]?.first_name} ${clinicAppointmentPatient[0]?.last_name}`}</Typography>
                                    </div>
                                    <div className="name-email">
                                        <Typography
                                            sx={{
                                                color: "#787579",
                                                fontSize: "0.875rem",
                                                fontWeight: 400,
                                            }}
                                        >
                                            Age
                                        </Typography>
                                        <Typography>{clinicAppointmentPatient[0]?.age}</Typography>
                                    </div>
                                    <div className="name-email">
                                        <Typography
                                            sx={{
                                                color: "#787579",
                                                fontSize: "0.875rem",
                                                fontWeight: 400,
                                            }}
                                        >
                                            Gender
                                        </Typography>
                                        <Typography>
                                            {clinicAppointmentPatient[0]?.gender}
                                        </Typography>
                                    </div>
                                </div>
                                <div>
                                    <div>Attached files</div>
                                    <div className="textfield-cont">
                                        <div className="name-email">
                                            <Typography
                                                sx={{
                                                    color: "#787579",
                                                    fontSize: "0.875rem",
                                                    fontWeight: 400,
                                                }}
                                            >
                                                File name
                                            </Typography>
                                            <Typography>
                                                {clinicAppointmentPatient[0]?.attachments}
                                            </Typography>
                                        </div>
                                        <div className="name-email">
                                            <Typography
                                                sx={{ color: "#E72B4A", cursor: "pointer" }}
                                                onClick={handleViewReport}
                                            >
                                                view
                                            </Typography>
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
                                                <DownloadIcon sx={{ marginRight: "5px" }} />{" "}
                                                Download
                                            </Typography>
                                        </div>
                                    </div>
                                    <div>Questions Details</div>
                                    <div className="textfield-cont">
                                        <div className="name-email">
                                            <Typography
                                                sx={{
                                                    color: "#787579",
                                                    fontSize: "0.875rem",
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Question 1
                                            </Typography>
                                            <Typography>
                                                {clinicAppointmentPatient[0]?.answer_1 || "answer"}
                                            </Typography>
                                        </div>
                                        <div className="name-email">
                                            <Typography
                                                sx={{
                                                    color: "#787579",
                                                    fontSize: "0.875rem",
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Question 2
                                            </Typography>
                                            <Typography>
                                                {clinicAppointmentPatient[0]?.answer_2 || "answer"}
                                            </Typography>
                                        </div>
                                        <div className="name-email">
                                            <Typography
                                                sx={{
                                                    color: "#787579",
                                                    fontSize: "0.875rem",
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Question 3
                                            </Typography>
                                            <Typography>
                                                {clinicAppointmentPatient[0]?.answer_3 || "answer"}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="textfield-conte">
                                        <div className="name-email">
                                            <Typography
                                                sx={{
                                                    color: "#787579",
                                                    fontSize: "0.875rem",
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Question 4
                                            </Typography>
                                            <Typography>
                                                {clinicAppointmentPatient[0]?.answer_4 || "answer"}
                                            </Typography>
                                        </div>
                                        <div className="name-email">
                                            <Typography
                                                sx={{
                                                    color: "#787579",
                                                    fontSize: "0.875rem",
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Question 5
                                            </Typography>
                                            <Typography>
                                                {clinicAppointmentPatient[0]?.answer_5 || "answer"}
                                            </Typography>
                                        </div>
                                    </div>

                                    {/* Modal for displaying the report */}
                                    <CustomModal isOpen={openModal} conditionOpen={setOpenModal}>
                                        <Box
                                            sx={{
                                                width: "870px",
                                                border: "1px solid #E6E1E5",
                                                borderTop: "1px",
                                                borderRight: "1px",
                                                borderLeft: "1px",
                                                height: "80vh",
                                                padding: "20px",
                                                backgroundColor: "white",
                                            }}
                                        >
                                            <Typography variant="h6">Report</Typography>
                                            <iframe
                                                src={fileUrl}
                                                width="100%"
                                                height="100%"
                                                title="Report Viewer"
                                                style={{ border: "1px solid" }}
                                            />
                                        </Box>
                                    </CustomModal>
                                </div>
                            </CustomModal>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClinicCardRequest;
