import {
    Box,
    Table,
    TextField,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Menu,
    MenuItem,
    Skeleton,
    Paper,
    TablePagination,
    Typography,
} from "@mui/material"; // Added missing imports
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, Fragment } from "react";
import "./adminlab.scss";
import CustomButton from "../../../../../components/CustomButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import axiosInstance from "../../../../../config/axiosInstance"; // Reusable axios instance with token handling
import NotFound from "../../../../../components/NotFound";
import { Testlist } from "./Testlist";
import pen from "../../../../../static/images/DrImages/Pen.svg";
import CustomModal from "../../../../../components/CustomModal";
import CustomTextField from "../../../../../components/CustomTextField";
import CustomSnackBar from "../../../../../components/CustomSnackBar";
import NoAppointmentCard from "../../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import logger from "../../../../../utils/logger"; // Centralized logging
import toastService from "../../../../../services/toastService"; // Toast notifications for user feedback
import { useCallback } from "react";

const AdminLabDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [data1, setData1] = useState([]);
    const [test, setTest] = useState([]);
    const [loading, setLoading] = useState(true);
    const hcf_id = localStorage.getItem("hcfadmin_suid");
    const exam_id = params.labId;
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [testdata, setTestData] = useState({
        lab_exam_id: exam_id,
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        sub_exam_name: null,
        test_subexam_price: null,
        test_description: null,
    });
    const [isEditFilled, setIsEditFilled] = useState(false);
    const [editdata, setEditdata] = useState({
        sub_exam_id: null,
        lab_exam_id: exam_id,
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        sub_exam_name: null,
        test_subexam_price: null,
        test_description: null,
    });
    const [snackType, setSnackType] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);

    /**
     * Validate HCF admin ID from localStorage
     * SECURITY: Ensures admin ID is present before making API calls
     * 
     * @returns {string|null} HCF admin ID or null if invalid
     */
    const validateHcfAdminId = useCallback(() => {
        const adminId = localStorage.getItem("hcfadmin_suid");

        if (!adminId) {
            logger.warn("⚠️ HCF Admin ID not found in localStorage");
            toastService.warning("HCF Admin ID is missing. Please log in again.");
            return null;
        }

        logger.debug("✅ HCF Admin ID validated:", adminId);
        return adminId;
    }, []);

    /**
     * Fetch lab details
     * Loads lab information for the selected lab ID
     */
    const fetchData1 = async () => {
        logger.debug("📋 Fetching lab details", { exam_id, hcf_id });
        setLoading(true);
        
        const adminId = validateHcfAdminId();
        if (!adminId || !exam_id) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.get(
                `/sec/hcf/getHcfSingleLab/${adminId}/${exam_id}`,
            );
            
            const labData = response?.data?.response || [];
            logger.debug("✅ Lab details received", { count: labData.length });
            setData1(labData);
        } catch (error) {
            logger.error("❌ Error fetching lab data:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to load lab details. Please try again.";
            toastService.error(errorMessage);
            setData1([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData1();
    }, []);

    /**
     * Get test list for the lab
     * Loads all tests associated with the lab
     */
    const getTests = async () => {
        logger.debug("📋 Fetching test list", { exam_id, hcf_id });
        setLoading(true);
        
        const adminId = validateHcfAdminId();
        if (!adminId || !exam_id) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.get(`/sec/hcf/getHcfTests/${adminId}/${exam_id}`);
            const tests = response?.data?.response || [];
            
            logger.debug("✅ Test list received", { count: tests.length });
            setTest(tests);
        } catch (error) {
            logger.error("❌ Error fetching test data:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to load tests. Please try again.";
            toastService.error(errorMessage);
            setTest([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTests();
    }, [hcf_id, exam_id]);

    // creating test post api

    useEffect(() => {
        checkFields(testdata); // Ensure fields are checked on each testdata update
    }, [testdata]);

    /**
     * Create new test
     * Posts test data to the server and refreshes the test list on success
     */
    const fetchTestData = async () => {
        logger.debug("📤 Creating new test");
        setSnackOpen(false);
        
        const adminId = validateHcfAdminId();
        if (!adminId) {
            return;
        }

        try {
            const response = await axiosInstance.post(
                `/sec/hcf/addTests`,
                JSON.stringify(testdata),
                {
                    headers: { 
                        Accept: "Application/json",
                        "Content-Type": "application/json"
                    },
                }
            );
            
            logger.debug("✅ Test created successfully", { response: response?.data });
            
            const successMessage = response?.data?.message || "Test Created Successfully";
            setSnackType("success");
            setSnackMessage(successMessage);
            setSnackOpen(true);
            toastService.success(successMessage);
            
            setTimeout(() => {
                setOpenDialog(false);
                // Reset form
                setTestData({
                    lab_exam_id: exam_id,
                    hcf_id: adminId,
                    sub_exam_name: null,
                    test_subexam_price: null,
                    test_description: null,
                });
            }, 2000);
            
            // Refresh test list
            getTests();
        } catch (error) {
            logger.error("❌ Error creating test:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to create test. Please fill all fields properly and try again.";
            
            setSnackType("error");
            setSnackMessage(errorMessage);
            setSnackOpen(true);
            toastService.error(errorMessage);
        }
    };
    const checkFields = (formData) => {
        const isFilled =
            formData.lab_exam_id &&
            formData.sub_exam_name &&
            formData.test_subexam_price &&
            formData.test_description &&
            formData.hcf_id; // Check if hcf_id is set

        setIsFieldsFilled(isFilled);
    };

    // Handle pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    const handleEdit = (data) => {
        setSelectedTest(data); // Set the selected test data
        setEditdata({
            sub_exam_id: String(data.sub_exam_id), // Convert sub_exam_id to a string
            lab_exam_id: exam_id,
            hcf_id: hcf_id,
            sub_exam_name: data.sub_exam_name,
            test_subexam_price: String(data.test_subexam_price),
            test_description: data.test_description,
        });
        logger.debug("✏️ Edit test clicked", { sub_exam_id: data.sub_exam_id, sub_exam_name: data.sub_exam_name });
        setOpenEditDialog(true); // Open the modal
    };
    const checkEditFields = (formData) => {
        const isFilled =
            formData.sub_exam_id &&
            formData.lab_exam_id &&
            formData.sub_exam_name &&
            formData.test_subexam_price &&
            formData.test_description &&
            formData.hcf_id; // Check if hcf_id is set

        setIsEditFilled(isFilled);
    };

    // creating test post api

    useEffect(() => {
        checkEditFields(editdata); // Ensure fields are checked on each testdata update
    }, [editdata]);

    /**
     * Update existing test
     * Posts updated test data to the server and refreshes the test list on success
     */
    const UpdateLab = async () => {
        logger.debug("📤 Updating test");
        setSnackOpen(false);
        
        const adminId = validateHcfAdminId();
        if (!adminId) {
            return;
        }

        try {
            const response = await axiosInstance.post(
                `/sec/hcf/addTests`,
                JSON.stringify(editdata),
                {
                    headers: { 
                        Accept: "Application/json",
                        "Content-Type": "application/json"
                    },
                }
            );
            
            logger.debug("✅ Test updated successfully", { response: response?.data });
            
            const successMessage = response?.data?.message || "Test Updated Successfully";
            setSnackType("success");
            setSnackMessage(successMessage);
            setSnackOpen(true);
            toastService.success(successMessage);
            
            setTimeout(() => setOpenEditDialog(false), 2000);
            
            // Refresh test list
            getTests();
        } catch (error) {
            logger.error("❌ Error updating test:", error);
            logger.error("❌ Error response:", error?.response?.data);
            
            const errorMessage = error?.response?.data?.message ||
                                "Failed to update test. Please fill all fields properly and try again.";
            
            setSnackType("error");
            setSnackMessage(errorMessage);
            setSnackOpen(true);
            toastService.error(errorMessage);
        }
    };

    /**
     * Delete test
     * Deletes a test by sub_exam_id and refreshes the test list on success
     * 
     * @param {Object} data - Test data object with sub_exam_id and sub_exam_name
     */
    const handleDelete = async (data) => {
        logger.debug("🗑️ Delete test requested", { sub_exam_id: data.sub_exam_id, sub_exam_name: data.sub_exam_name });
        
        // Use window.confirm for immediate feedback (could be replaced with CustomModal later)
        if (window.confirm(`Are you sure you want to delete "${data.sub_exam_name}"? This action cannot be undone.`)) {
            setSnackOpen(false);
            
            const adminId = validateHcfAdminId();
            if (!adminId) {
                return;
            }

            // Validate required IDs
            if (!data.sub_exam_id || !exam_id) {
                logger.error("❌ Missing required IDs for deletion", { sub_exam_id: data.sub_exam_id, exam_id });
                toastService.error("Invalid test ID. Please try again.");
                return;
            }

            try {
                const response = await axiosInstance.delete(
                    `/sec/hcf/deleteTest/${adminId}/${exam_id}/${data.sub_exam_id}`
                );
                
                logger.debug("✅ Test deleted successfully", { response: response?.data });
                
                const successMessage = response?.data?.message || "Test deleted successfully!";
                setSnackType("success");
                setSnackMessage(successMessage);
                setSnackOpen(true);
                toastService.success(successMessage);
                
                // Refresh the test list after successful deletion
                getTests();
            } catch (error) {
                logger.error("❌ Error deleting test:", error);
                logger.error("❌ Error response:", error?.response?.data);
                
                const errorMessage = error?.response?.data?.message ||
                                    "Failed to delete test. Please try again.";
                
                setSnackType("error");
                setSnackMessage(errorMessage);
                setSnackOpen(true);
                toastService.error(errorMessage);
            }
        }
    };
    return (
        <Box className={"adminlabs_main_container"}>
            <CustomSnackBar type={snackType} message={snackMessage} isOpen={snackOpen} />
            {/*---------------- Back Button --------------------- */}
            <Box className={"flex-space-between"}>
                <CustomButton
                    label="Back"
                    isTransaprent={true}
                    leftIcon={<ChevronLeftIcon />}
                    buttonCss={{ border: "none" }}
                    handleClick={() => navigate(-1)}
                />
            </Box>

            {/* ---------------- First Container --------------------- */}
            <Box
            className="first-container"
            sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "30px",
                marginBottom: "20px",
                border: "1px solid #e0e0e0",
            }}
        >
            <Box className={"working-days-container heading-container"}>
                <Box component={"div"} className={"text-align-left"}>
                    <h4>Department</h4>
                    {loading ? (
                        <Skeleton variant="text" width={150} height={30} />
                    ) : (
                        <h2>{data1[0]?.lab_department_name}</h2>
                    )}
                </Box>
                <Box
                    component={"div"}
                    className={"text-align-left description-container"}
                    sx={{
                        paddingTop: "30px",
                    }}
                >
                    <h4>Description</h4>
                    {loading ? (
                        <Skeleton variant="text" width="100%" height={60} />
                    ) : (
                        <p>{data1[0]?.lab_description}</p>
                    )}
                </Box>
            </Box>

            <Box className={"working-days-container first-container-inner-two"}>
                <Box component={"div"} className={"text-align-right"}>
                    <h2>Working Days</h2>
                    {loading ? (
                        <Skeleton variant="text" width={120} height={25} />
                    ) : (
                        <p>
                            {data1[0]?.lab_working_days_from} and {data1[0]?.lab_working_days_to}
                        </p>
                    )}
                </Box>

                <Box
                    component={"div"}
                    className={"text-align-right"}
                    sx={{
                        paddingTop: "30px",
                    }}
                >
                    <h2>Working Time</h2>
                    {loading ? (
                        <Skeleton variant="text" width={120} height={25} />
                    ) : (
                        <p>
                            {data1[0]?.lab_working_time_from} to {data1[0]?.lab_working_time_to}
                        </p>
                    )}
                </Box>
            </Box>
        </Box>

            {/* ---------------- Table Container ---------------------- */}
            <Box className={"table-container"}>
                <Box className={"table-container-inner-one"}>
                    <Box>
                        <h2>Listed Tests</h2>
                    </Box>
                    <Box>
                        <CustomButton
                            buttonCss={{ borderRadius: "25px", fontFamily: "Poppins" }}
                            isTransaprent={true}
                            label={"Create Test"}
                            handleClick={() => setOpenDialog(true)}
                        />
                        {/* model start from here */}
                        <CustomModal
                            isOpen={openDialog}
                            conditionOpen={setOpenDialog}
                            disableBackdropClick={true}
                            title={
                                <div style={{ textAlign: "center" }}>
                                    <h4 style={{ fontWeight: "bold", margin: "0" }}>Add Test</h4>
                                    <h6 style={{ color: "gray", margin: "0" }}>
                                        Create a Test here
                                    </h6>
                                </div>
                            }
                        >
                            <Fragment>
                                {/* Input fields for Test Name, Department, and Price */}
                                <Box
                                    component="form"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "15px",
                                        marginTop: "20px",
                                    }}
                                >
                                    <CustomTextField
                                        placeholder={"Enter Test Name"}
                                        label="Test Name"
                                        variant="standard"
                                        fullWidth
                                        helperText={""}
                                        defaultValue={testdata?.sub_exam_name}
                                        onInput={(e) =>
                                            setTestData({
                                                ...testdata,
                                                sub_exam_name: e.target.value,
                                            })
                                        }
                                    />
                                    <CustomTextField
                                        helperText={""}
                                        label="Department"
                                        variant="standard"
                                        fullWidth
                                        value
                                        defaultValue={data1[0]?.lab_department_name}
                                        isDisabled={true}
                                    />
                                    <CustomTextField
                                        type="number"
                                        placeholder={"Enter Test Price"}
                                        label="Price"
                                        variant="standard"
                                        fullWidth
                                        helperText={""}
                                        defaultValue={testdata?.test_subexam_price}
                                        onInput={(e) =>
                                            setTestData({
                                                ...testdata,
                                                test_subexam_price: e.target.value,
                                            })
                                        }
                                    />
                                    {/* Textarea for Description */}
                                    <CustomTextField
                                        label="Description"
                                        placeholder={"Enter Test Description"}
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        helperText={""}
                                        defaultValue={testdata?.test_description}
                                        rows={4} // Set the height of the textarea
                                        onInput={(e) =>
                                            setTestData({
                                                ...testdata,
                                                test_description: e.target.value,
                                            })
                                        }
                                    />
                                </Box>

                                {/* Create button */}
                                <CustomButton
                                    buttonCss={{
                                        borderRadius: "25px",
                                        fontFamily: "Poppins",
                                        marginTop: "20px",
                                    }}
                                    isDisabled={!isFieldsFilled}
                                    label={"Create"}
                                    handleClick={() => {
                                        fetchTestData();
                                    }}
                                />
                            </Fragment>
                        </CustomModal>
                        {/*edit model start from here */}
                        <CustomModal
                            isOpen={openEditDialog}
                            conditionOpen={setOpenEditDialog}
                            disableBackdropClick={true}
                            title={
                                <div style={{ textAlign: "center" }}>
                                    <h4 style={{ fontWeight: "bold", margin: "0" }}>Edit Test</h4>
                                    <h6 style={{ color: "gray", margin: "0" }}>Edit Test here</h6>
                                </div>
                            }
                        >
                            <Fragment>
                                {/* Input fields for Test Name, Department, and Price */}
                                <Box
                                    component="form"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "15px",
                                        marginTop: "20px",
                                    }}
                                >
                                    <CustomTextField
                                        placeholder={"Enter Test Name"}
                                        label="Test Name"
                                        variant="standard"
                                        fullWidth
                                        helperText={""}
                                        defaultValue={editdata?.sub_exam_name}
                                        onInput={(e) =>
                                            setEditdata({
                                                ...editdata,
                                                sub_exam_name: e.target.value,
                                            })
                                        }
                                    />
                                    <CustomTextField
                                        helperText={""}
                                        label="Department"
                                        variant="standard"
                                        fullWidth
                                        value
                                        defaultValue={data1[0]?.lab_department_name}
                                        isDisabled={true}
                                    />
                                    <CustomTextField
                                        type="number"
                                        placeholder={"Enter Test Price"}
                                        label="Price"
                                        variant="standard"
                                        fullWidth
                                        helperText={""}
                                        defaultValue={editdata?.test_subexam_price}
                                        onInput={(e) =>
                                            setEditdata({
                                                ...editdata,
                                                test_subexam_price: e.target.value,
                                            })
                                        }
                                    />
                                    {/* Textarea for Description */}
                                    <CustomTextField
                                        label="Description"
                                        placeholder={"Enter Test Description"}
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        helperText={""}
                                        defaultValue={editdata?.test_description}
                                        rows={4} // Set the height of the textarea
                                        onInput={(e) =>
                                            setEditdata({
                                                ...editdata,
                                                test_description: e.target.value,
                                            })
                                        }
                                    />
                                </Box>

                                {/* Create button */}
                                <CustomButton
                                    buttonCss={{
                                        borderRadius: "25px",
                                        fontFamily: "Poppins",
                                        marginTop: "20px",
                                    }}
                                    isDisabled={!isEditFilled}
                                    label={"Update"}
                                    handleClick={() => {
                                        UpdateLab();
                                    }}
                                />
                            </Fragment>
                        </CustomModal>
                    </Box>
                </Box>

                <TableContainer component={Paper} style={{ background: "white", padding: "20px" }}>
                    <Table sx={{ minWidth: 1 }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ fontWeight: "bold" }}>
                                <TableCell>Name & Details</TableCell>
                                <TableCell align="right">Department</TableCell>
                                <TableCell align="right">Pricing</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                        Array.from(new Array(rowsPerPage)).map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell colSpan={5} align="center">
                                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                            ) : test.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <NoAppointmentCard text_one={"No Data Found"} />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                test
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((data, index) => (
                                        <TableRow
                                            key={`${data.sub_exam_id}-${index}`}
                                            sx={{
                                                "&:last-child td, &:last-child th": {
                                                    border: 0,
                                                },
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Testlist
                                                    name={`${data.sub_exam_name}`}
                                                    staff_id={`${data.test_description}`}
                                                />
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                style={{
                                                    color: "#939094",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                {data.exam_name}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                style={{
                                                    color: "#939094",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                ₹{data.test_subexam_price}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                                                    <CustomButton
                                                        buttonCss={{ borderRadius: "6.25rem" }}
                                                        label={<img src={pen} alt="Edit" />}
                                                        isTransaprent
                                                        handleClick={() => handleEdit(data)} // Pass the clicked test's data to handleEdit
                                                    />
                                                    <CustomButton
                                                        buttonCss={{ 
                                                            borderRadius: "6.25rem",
                                                            backgroundColor: "#ff4444",
                                                            color: "white",
                                                            minWidth: "40px",
                                                            height: "40px",
                                                            "&:hover": {
                                                                backgroundColor: "#cc3333"
                                                            }
                                                        }}
                                                        label="×"
                                                        handleClick={() => handleDelete(data)}
                                                    />
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                    rowsPerPageOptions={[1, 5, 10, 25]}
                    component="div"
                    count={test.length} // Assuming the pagination is for tests
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Rows per page:"
                />
                </TableContainer>

                
            </Box>
        </Box>
    );
};

export default AdminLabDetail;
