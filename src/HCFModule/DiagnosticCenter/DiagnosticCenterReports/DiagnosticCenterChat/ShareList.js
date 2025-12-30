import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
    Skeleton,
    CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../../components/CustomButton";
import { CloudUploadIcon } from "@heroicons/react/outline";
import DiagnostCenterTableCard from "./DiagnostCenterTableCard";
import CustomModal from "../../../../components/CustomModal";
import CustomTextField from "../../../../components/CustomTextField";
import CustomDropdown from "../../../../components/CustomDropdown";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import axiosInstance from "../../../../config/axiosInstance"; // Reusable axios instance with token handling
import CustomSnackBar from "../../../../components/CustomSnackBar";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback
import { useCallback } from "react";

import "./sharelist.scss";

const ShareList = () => {
    const [cardData, setCardData] = useState([]);
    const [labItems, setLabItems] = useState([]);
    const [activeItem, setActiveItem] = useState("");
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const staff_id = localStorage.getItem("diagnostic_suid");
    const [pdfFileName, setPdfFileName] = useState("");
    const [pdfBase64, setPdfBase64] = useState("");
    const [buttonloading, setButtonloading] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarType, setSnackBarType] = useState("success"); // "success", "error", etc.



    /**
     * Validate Diagnostic staff ID from localStorage
     * SECURITY: Ensures staff ID is present before making API calls
     * 
     * @returns {string|null} Staff ID or null if invalid
     */
    const validateStaffId = useCallback(() => {
        const staffId = localStorage.getItem("diagnostic_suid");

        if (!staffId) {
            logger.warn("⚠️ Diagnostic staff ID not found in localStorage");
            toastService.warning("Staff ID is missing. Please log in again.");
            return null;
        }

        logger.debug("✅ Diagnostic staff ID validated:", staffId);
        return staffId;
    }, []);

    /**
     * Fetch report share list
     * Loads all reports available for sharing
     */
    const fetchData = async () => {
        logger.debug("📋 Fetching report share list");
        setLoading(true);
        
        const staffId = validateStaffId();
        if (!staffId) {
            setLoading(false);
            return;
        }

        try {
            const resp = await axiosInstance.get(`/sec/hcf/reportShareList/${staffId}`);
            const reports = Array.isArray(resp?.data?.response) ? resp.data.response : [];
            
            logger.debug("✅ Report share list received", { count: reports.length });
            setCardData(reports);
        } catch (err) {
            logger.error("❌ Error fetching report share list:", err);
            logger.error("❌ Error response:", err?.response?.data);
            toastService.error("Failed to load report share list");
            setCardData([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch labs/departments
     * Loads all available labs for the diagnostic center
     */
    const fetchLabsDepartments = async () => {
        logger.debug("📋 Fetching labs/departments");
        
        const staffId = validateStaffId();
        if (!staffId) {
            return;
        }

        try {
            const resp = await axiosInstance.get(`/sec/hcf/getHcfLabs/${staffId}`);
            const labs = resp?.data?.response || [];
            
            logger.debug("✅ Labs/departments received", { count: labs.length });
            setLabItems(labs);
        } catch (err) {
            logger.error("❌ Error fetching labs/departments:", err);
            logger.error("❌ Error response:", err?.response?.data);
            toastService.error("Failed to load labs/departments");
            setLabItems([]);
        }
    };

    useEffect(() => {
        fetchData();
        fetchLabsDepartments();
    }, []);

    // Function to handle file input change
    const handleFileInput = (file) => {
        const uploadedFile = file?.target?.files[0]; // Get the uploaded file
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(",")[1]; // Extract base64 content
                setPdfBase64(base64String);
                setPdfFileName(uploadedFile.name.split(".")[0]); // Extract file name without extension
            };
            reader.readAsDataURL(uploadedFile); // Read file as base64
        }
    };
    /**
     * Post/upload report
     * Uploads a test report file to the server
     * 
     * @param {string} test_id - Test ID
     * @param {string} pdfFileName - PDF file name
     * @param {string} pdfBase64 - Base64 encoded PDF file
     */
    const postReport = async (test_id, pdfFileName, pdfBase64) => {
        logger.debug("📤 Uploading report", { test_id, pdfFileName });
        setButtonloading(true);
        
        const staffId = validateStaffId();
        if (!staffId) {
            setButtonloading(false);
            return;
        }

        // Validate inputs
        if (!test_id || !pdfFileName || !pdfBase64) {
            logger.warn("⚠️ Missing required fields for report upload");
            toastService.error("Please fill all required fields");
            setSnackBarMessage("Please fill all required fields");
            setSnackBarOpen(true);
            setSnackBarType("error");
            setButtonloading(false);
            return;
        }

        try {
            const response = await axiosInstance.post(
                `/sec/hcf/testReportUpload`,
                JSON.stringify({
                    test_id: String(test_id),
                    fileName: pdfFileName,
                    file: pdfBase64,
                    staff_id: staffId,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            
            logger.debug("✅ Report uploaded successfully", { response: response?.data });
            
            const successMessage = response?.data?.message || "Report Shared successfully!";
            setSnackBarMessage(successMessage);
            setSnackBarOpen(true);
            setSnackBarType("success");
            toastService.success(successMessage);
            
            fetchData(); // Refresh data after posting
        } catch (err) {
            logger.error("❌ Error uploading report:", err);
            logger.error("❌ Error response:", err?.response?.data);
            
            const errorMessage = err?.response?.data?.message ||
                                "Failed to upload report. Please try again.";
            
            setSnackBarMessage(errorMessage);
            setSnackBarOpen(true);
            setSnackBarType("error");
            toastService.error(errorMessage);
        } finally {
            setButtonloading(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} style={{ background: "white" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name/Booking ID</TableCell>
                        <TableCell align="right">Date & Time</TableCell>
                        <TableCell align="right">Test Name</TableCell>
                        <TableCell align="right">Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        Array.from(new Array(rowsPerPage)).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell colSpan={6} align="center">
                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : cardData.length > 0 ? (
                        cardData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((data) => {
                                return (
                                    <TableRow key={data?.suid}>
                                        <TableCell component="th" scope="row">
                                            <DiagnostCenterTableCard
                                                id={data?.test_id}
                                                name={`${data?.first_name} ${data?.middle_name}${data?.last_name}`}
                                                profile={data?.profile_picture}
                                            />
                                        </TableCell>
                                        <TableCell align="right">{data?.book_date}</TableCell>
                                        <TableCell align="right">{data?.test_name}</TableCell>
                                        <TableCell align="right">
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <CustomButton
                                                    label="Share"
                                                    isElevated
                                                    handleClick={() => setOpenDialog(!openDialog)}
                                                    isTransparent={true}
                                                    buttonCss={{ borderRadius: "50px" }}
                                                />
                                                <CustomModal
                                                    isOpen={openDialog}
                                                    title="Share"
                                                    class_name="share_list_modal"
                                                    disableBackdropClick={true}
                                                    conditionOpen={setOpenDialog}
                                                    maincontainerclassname="share_list_modal"
                                                    footer={
                                                        <Box className="share_list_modal">
                                                            <Box
                                                                sx={{
                                                                    width: "100%",
                                                                    display: "content",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    flexDirection: "column",
                                                                }}
                                                            >
                                                                <CustomTextField
                                                                    id={data?.suid}
                                                                    helperText={""}
                                                                    textcss={{ width: "100%" }}
                                                                    placeholder="Enter File Name Here"
                                                                    label=""
                                                                />
                                                                <CustomDropdown
                                                                    activeItem={activeItem}
                                                                    items={labItems}
                                                                    label="Select Labs"
                                                                    CustomSx={{
                                                                        width: "100%",
                                                                        marginTop: "2%",
                                                                    }}
                                                                    handleChange={(item) =>
                                                                        setActiveItem(item)
                                                                    }
                                                                />
                                                                <CustomTextField
                                                                    type="file"
                                                                    placeholder="Upload File"
                                                                    helperText={""}
                                                                    leftIcon={<CloudUploadIcon />}
                                                                    textcss={{ marginTop: "2%" }}
                                                                    onInput={handleFileInput} // Call file input handler
                                                                />
                                                                <CustomButton
                                                                    label={buttonloading ? <CircularProgress size={24} color="inherit" /> : "Share"}
                                                                    isTransparent={true}
                                                                    buttonCss={{
                                                                        borderRadius: "30px",
                                                                        marginTop: "2%",
                                                                    }}
                                                                    handleClick={() => {
                                                                        postReport(
                                                                            data?.test_id,
                                                                            pdfFileName,
                                                                            pdfBase64,
                                                                        );
                                                                    }
                                                                    }

                                                                />
                                                            </Box>
                                                        </Box>
                                                    }
                                                >
                                                    <Box className="Book-appointment-modal">
                                                        <Box
                                                            sx={{ width: "100%", height: "100%" }}
                                                        />
                                                    </Box>
                                                </CustomModal>
                                                <span style={{ marginLeft: "1%" }}>
                                                    {data?.status}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                <NoAppointmentCard text_one="No Data Available" />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <CustomSnackBar
                isOpen={snackBarOpen}
                message={snackBarMessage}
                type={snackBarType}
                hideDuration={4000}
                handleAction={() => setSnackBarOpen(false)}
            />
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={cardData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>

    );
};

export default ShareList;
