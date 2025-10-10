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
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar";

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



    const fetchData = async () => {
        setLoading(true);
        try {
            const resp = await axiosInstance(`/sec/hcf/reportShareList/${staff_id}`);
            setCardData(Array.isArray(resp?.data?.response) ? resp.data.response : []);
        } catch (err) {
            console.log("Error:", err);
            setCardData([]); // Set to empty array on error
        } finally {
            setLoading(false);
        }
    };

    const fetchLabsDepartments = async () => {
        try {
            const resp = await axiosInstance(`/sec/hcf/getHcfLabs/${staff_id}`);
            setLabItems(resp?.data?.response || []);
        } catch (err) {
            console.log("Error:", err);
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
    const postReport = async (test_id, pdfFileName, pdfBase64) => {
        setButtonloading(true)
        try {
            await axiosInstance.post(
                `/sec/hcf/testReportUpload`,
                JSON.stringify({
                    test_id: String(test_id),
                    fileName: pdfFileName,
                    file: pdfBase64,
                    staff_id: staff_id,
                }),
            );
            setSnackBarMessage("Report Shared successfully!");
            setSnackBarOpen(true);
            setSnackBarType("success");
            fetchData(); // Refresh data after posting
        } catch (err) {
            setSnackBarMessage("Failed to upload report.");
            setSnackBarOpen(true);
            setSnackBarType("error");
            console.log("Error:", err);
        } finally {
            setButtonloading(false)
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
