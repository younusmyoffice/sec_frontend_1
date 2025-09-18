import React, { useState, useEffect } from "react";
import { Modal, Typography, Box, IconButton, Skeleton } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import profileImage from "../../../../static/images/DrImages/profileImage.png"; // Sample image
import CustomModal from "../../../../components/CustomModal";
import "./CancelledCard.scss";
import DownloadIcon from "@mui/icons-material/Download";
import axiosInstance from "../../../../config/axiosInstance";

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

const CancelledCard = ({ name, profile_picture, appointment_date, appointment_id, patient_id }) => {
    const [openPatientModal, setOpenPatientModal] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const [clinicAppointmentPatient, setClinicAppointmentPatient] = useState([]);
    const handleViewClick = (patient_id, appointment_id) => {
        clinicAppointmentRequestsList(patient_id, appointment_id);
        setOpenPatientModal(true);

    };;

    const handleCloseModal = () => {
        setOpenPatientModal(false);
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
        <Box className="request-main-container" sx={{ padding: "1rem", borderRadius: "8px" }}>
            <Box display="flex" alignItems="center">
                {/* Profile Picture */}
                <Box
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        overflow: "hidden",
                        marginRight: "1rem",
                    }}
                >
                    <img
                        src={profile_picture || profileImage}
                        alt="Profile"
                        style={{ width: "100%", height: "100%" }}
                    />
                </Box>

                {/* Details */}
                <Box flex="1" textAlign="left">
                    <Typography
                        sx={{
                            color: "#313033",
                            fontFamily: "Poppins",
                            fontSize: "1.125rem",
                            fontWeight: 500,
                        }}
                    >
                        {name}
                    </Typography>
                    <Box display="flex" alignItems="center" gap="1rem">
                        <Typography
                            sx={{ color: "#787579", fontSize: "0.875rem", fontWeight: 400 }}
                        >
                            Schedule | {formatTimestamp(appointment_date)} | Pataient Details
                        </Typography>
                        <Box
                            component="a"
                            onClick={handleViewClick}
                            sx={{ color: "#E72B4A", fontSize: "0.875rem", cursor: "pointer" }}
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
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CancelledCard;
