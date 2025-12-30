import React, { Fragment, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom"; // ✅ Add navigation import

// import "./customUpcomingCard.scss";
// import CustomButton from '../../../components/CustomButton/custom-button';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import profileImage from "../../../static/images/DrImages/profileImage.png";
import CustomModal from "../../CustomModal";
import CustomRadioButton from "../../CustomRadioButton";
import CustomSnackBar from "../../CustomSnackBar";
import CustomButton from "../../CustomButton/custom-button";
import "./Upcoming.scss";
import axiosInstance from "../../../config/axiosInstance";

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date
        .toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })
        .replace(",", "");
};

const UpcomingCard = ({
    data = {},
    Joinlabel,
    onClickJoinHandler,
    StatusLabel,
    AcceptOrRejectButtonClicked,
    accAndRejClicked
}) => {
    const navigate = useNavigate(); // ✅ Add navigate hook
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenDialogCancle(false);
        setOpenDialogReschedule(false);
    };
    const [snackType, setSnackType] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openPatientModal, setOpenPatientModal] = useState(false);
    const [clinicAppointmentPatient, setClinicAppointmentPatient] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [openModal, setOpenModal] = useState(false);

    const [clicked, setClicked] = useState(false);
    const [joinAppointmentClinic, setJoinAppointmentClinic] = useState({
        appointment_id: null,
        doctor_id: null,
        patient_id: null, // ✅ Add missing patient_id field
        status: "in_progress", // ✅ Add missing status field
        option: "accept",
    });
    const [rejectAppointment, setRejectAppointment] = useState({
        appointment_id: data?.appointment_id,
        patient_id: data?.patient_id,
        doctor_id: data?.doctor_id,
        reason: "",
        status: "in_progress",
        option: "reject",
    });
    console.log("Reject appointment : ", rejectAppointment);
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log("upcoming cards data : ", data);
    const [openDialogCancle, setOpenDialogCancle] = useState(false);
    const [openDialogReschedule, setOpenDialogReschedule] = useState(false);

    const radioValues = [
        "I have a schedule clash",
        "I am not available at the schedule",
        "I have some other plans",
        "Reason4",
        "Reason5",
    ];
    const [radioVal, setRadioVal] = React.useState(radioValues[0]);

    useEffect(() => {
        setJoinAppointmentClinic({
            appointment_id: data?.appointment_id,
            doctor_id: data?.doctor_id,
            patient_id: data?.patient_id, // ✅ Add missing patient_id
            status: "in_progress", // ✅ Add missing status field
            option: "join",
        });
    }, []);

    const JoinAppointment = async () => {
        setClicked(!clicked);
        console.log("🔍 Joining clinic appointment with data:", joinAppointmentClinic);
        try {
            const response = await axiosInstance.post(
                "/sec/hcf/joinAppointmentClinic",
                JSON.stringify(joinAppointmentClinic),
                { 
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                },
            );
            setSnackMessage("Joined Successfully");
            setSnackType("success");
            setSnackOpen(true);
            console.log("✅ Join RESPONSE : ", response?.data);
            
            // ✅ Navigate to chat page after successful join
            const patientName = `${data?.first_name || ''}${data?.middle_name || ''}${data?.last_name || ''}`;
            const roomID = data?.roomid || data?.room_id || 'default';
            const appointmentId = data?.appointment_id;
            
            console.log("🔍 Navigation data:", { patientName, roomID, appointmentId });
            
            // Navigate to clinic chat page
            navigate(`/clinicDashboard/clinicmyappointment/clinicchats/${patientName}/${roomID}/${appointmentId}`);
            
            // acceptButtonClicked("child")
            AcceptOrRejectButtonClicked(!accAndRejClicked);
        } catch (error) {
            console.log("❌ Join ERROR:", error.response);
            setSnackMessage("Error during joining appointment");
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
            setSnackMessage("upcoming appointment Rejected");
            setSnackType("success");
            setSnackOpen(true); 
            console.log("RESPONSE : ", response?.data);
            AcceptOrRejectButtonClicked(!accAndRejClicked);
            setRejectAppointmentFlag(false);
        } catch (error) {
            console.log(error.response);
            setRejectAppointmentFlag(false);
            setSnackMessage("error during rejecting  appointment says ",error.response);
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
        const filepath = Array.isArray(clinicAppointmentPatient) && clinicAppointmentPatient[0]?.report_path;
        const filename = Array.isArray(clinicAppointmentPatient) && clinicAppointmentPatient[0]?.report_name;

        console.log("filepath", filepath)
    
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
                                src={data?.profile_picture}
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
                                    ? `Dr. ${data?.first_name || ""} ${data?.middle_name || ""} ${
                                          data?.last_name || ""
                                      }`.trim()
                                    : null}
                            </Typography>
                            <Box
                            ml={2}
                            px={1.5}
                            py={0.5}
                            border="1px solid #E72B4A"
                            borderRadius="16px"
                            color="#E72B4A"
                            fontSize="0.875rem"
                            fontWeight={500}
                        >
                            {StatusLabel}
                        </Box>
                        </div>
                        <div className="card-details-container">
                        
                            <Typography
                                sx={{
                                    color: "#787579",
                                    fontFamily: "Poppins",
                                    fontSize: "0.75rem",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    paddingTop: "8px",
                                    lineHeight: "1.125rem",
                                    letterSpacing: "0.006rem",
                                    width: "17rem",
                                }}
                            >
                                Schedule | {formatTimestamp(data?.appointment_date)}| {data?.attachments}
                            </Typography>
                            <Box
                                component={"a"}
                                sx={{
                                    color: "#E72B4A",
                                    fontFamily: "Poppins",
                                    fontSize: "0.75rem",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "1.125rem",
                                    letterSpacing: "0.006rem",
                                    paddingTop: "8px",

                                }}
                            >
                                View
                            </Box>
                            
                        </div>
                    </div>
                </div>
                {/* ------------ Button Container------------ */}
                <div className="request-button-container">
                    <div style={{ display: "flex", alignItems: "center", marginRight: "2%" }}>
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
                            label={Joinlabel}
                            isTransaprent={false}
                            handleClick={onClickJoinHandler || JoinAppointment} // ✅ Use onClickJoinHandler if provided, fallback to JoinAppointment
                        />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <MoreHorizIcon
                            sx={{
                                cursor: "pointer",
                                color: "#4f4d4d",
                                border: "1px solid #E6E1E5",
                                borderRadius: "50px",
                            }}
                            onClick={handleClick}
                        />
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
                                                    setRejectAppointment({
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
                                                    placeholder="Reason for rejecting the appointment"
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
                                                    label="Reject Appoitment"
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

export default UpcomingCard;
