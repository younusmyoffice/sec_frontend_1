import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Skeleton,
    Typography,
    TablePagination,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { LabsCard } from "./LabsCard";
import pen from "../../../../static/images/DrImages/Pen.svg";
import CustomModal from "../../../../components/CustomModal";
import CustomDropdown from "../../../../components/CustomDropdown";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar";
import NoAppointmentCard from "../../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";


const AdminLabs = () => {
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [data1, setData1] = useState([]);
    const [labDepartments, setLabDepartments] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editopenDialog, setEditOpenDialog] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState("");
    const [editactiveDropdown, setEditActiveDropdown] = useState("")
    const [workingDays1From, setWorkingDays1From] = useState(null);
    const [workingDays1To, setWorkingDays1To] = useState(null);
    const [workingDays2From, setWorkingDays2From] = useState(null);
    const [workingDays2To, setWorkingDays2To] = useState(null);
    const [labdata, setLabData] = useState({
        lab_dept_id: null,
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        exam_name: null,
        lab_working_days_from: null,
        lab_working_days_to: null,
        lab_description: null,
        lab_working_time_from: null,
        lab_working_time_to: null,
    });
    const [isEditFilled, setIsEditFilled] = useState(false);
    const [editdata, setEditdata] = useState({
        exam_id: null,
        lab_dept_id: null,
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        exam_name: null,
        lab_working_days_from: null,
        lab_working_days_to: null,
        lab_description: null,
        lab_working_time_from: null,
        lab_working_time_to: null,
    });
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const [loading, setLoading] = useState(true); // Added loading state
    const [snackType, setSnackType] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const hcf_id = localStorage.getItem("hcfadmin_suid");

    //getting labs list
    const fetchData1 = async (hcf_id) => {
        setLoading(true); // Set loading to true
        try {
            const response = await axiosInstance.get(`/sec/hcf/getHcfLab/${hcf_id}`);
            setData1(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        fetchData1(hcf_id);
    }, [hcf_id]);
    // post api to add labs

    const handleWorkingDays1FromChange = (newValue) => {
        setWorkingDays1From(newValue);
        setLabData((prevState) => ({
            ...prevState,
            lab_working_days_from: newValue ? dayjs(newValue).format("YYYY-MM-DD") : null,
        }));
    };

    const handleWorkingDays1ToChange = (newValue) => {
        setWorkingDays1To(newValue);
        setLabData((prevState) => ({
            ...prevState,
            lab_working_days_to: newValue ? dayjs(newValue).format("YYYY-MM-DD") : null,
        }));
    };

    const handleWorkingDays2FromChange = (newValue) => {
        setWorkingDays2From(newValue);
    };

    const handleWorkingDays2ToChange = (newValue) => {
        setWorkingDays2To(newValue);
    };

    const checkFields = (formData) => {
        const isFilled =
            // formData.exam_name &&
            formData.lab_working_days_from &&
            formData.lab_working_days_to &&
            formData.lab_working_time_from &&
            formData.lab_working_time_to &&
            formData.lab_description &&
            formData.lab_dept_id && // Check department selection
            formData.hcf_id; // Check if hcf_id is set

        setIsFieldsFilled(isFilled);
    };

    useEffect(() => {
        checkFields(labdata); // Ensure fields are checked on each labdata update
    }, [labdata]);

    const fetchLabData = async () => {
        setSnackOpen(false);
        try {
            await axiosInstance.post(`/sec/hcf/addLabs?hcf_id=${hcf_id}`, JSON.stringify(labdata), {
                headers: { 
                    Accept: "Application/json",
                    "Content-Type": "application/json"
                },
            });
            await setSnackType("success");
            await setSnackMessage("Lab Created Successfully");
            setSnackOpen(true);
            setTimeout(() => setOpenDialog(false), 3000);
            fetchData1(hcf_id); // Refresh the list
        } catch (error) {
            alert("Fill the details properly");
            console.error(error.response);
            await setSnackType("error");
            await setSnackMessage("Some error occurred!!!");
            setSnackOpen(true);
        }
    };
    // editing labs handler 

    const handleEdit = (data) => {
        // setSelectedTest(data); // Set the selected test data
        setEditdata({
            exam_id: String(data.exam_id), // Convert sub_exam_id to a string
            lab_dept_id: String(data.lab_department_id),
            hcf_id: hcf_id,
            exam_name: data.exam_name,
            lab_working_days_from: data.lab_working_days_from,
            lab_working_days_to: data.lab_working_days_to,
            lab_working_time_from: data.lab_working_time_from,
            lab_working_time_to: data.lab_working_time_to,
            lab_description: data.lab_description,

        });
        setEditOpenDialog(true); // Open the modal
    };


const checkEditFields = (formData) => {
    const isEditFilled =
        formData.exam_id &&
        formData.exam_name &&
        formData.lab_working_days_from &&
        formData.lab_working_days_to &&
        formData.lab_working_time_from &&
        formData.lab_working_time_to &&
        formData.lab_description &&
        formData.lab_dept_id && // Check department selection
        formData.hcf_id; // Check if hcf_id is set

        setIsEditFilled(isEditFilled);
};

useEffect(() => {
    checkEditFields(editdata); // Ensure fields are checked on each labdata update
}, [editdata]);

const updateLabData = async () => {
    setSnackOpen(false);
    try {
        await axiosInstance.post(`/sec/hcf/addLabs?hcf_id=${hcf_id}`, JSON.stringify(editdata), {
            headers: { 
                Accept: "Application/json",
                "Content-Type": "application/json"
            },
        });
        await setSnackType("success");
        await setSnackMessage("Lab Updated Successfully");
        setSnackOpen(true);
        setTimeout(() => setEditOpenDialog(false), 3000);
        fetchData1(hcf_id); // Refresh the list
    } catch (error) {
        alert("Fill the details properly");
        console.error(error.response);
        await setSnackType("error");
        await setSnackMessage("Some error occurred!!!");
        setSnackOpen(true);
    }
};

const deleteLabData = async (exam_id) => {
    setSnackOpen(false);
    try {
        console.log("exam_id2", exam_id);
        console.log("Delete URL:", `/sec/hcf/deleteLab?exam_id=${exam_id}`);
        
        const response = await axiosInstance.delete(`/sec/hcf/deleteLab?exam_id=${exam_id}`);
        console.log("Delete response:", response);
        
        await setSnackType("success");
        await setSnackMessage("Lab Deleted Successfully");
        setSnackOpen(true);
        fetchData1(hcf_id); // Refresh the list
    } catch (error) {
        console.error("Delete error:", error);
        console.error("Error response:", error.response);
        console.error("Error response data:", error.response?.data);
        console.error("Error response status:", error.response?.status);
        console.error("Error response statusText:", error.response?.statusText);
        await setSnackType("error");
        await setSnackMessage("Some error occurred while deleting!!!");
        setSnackOpen(true);
    }
};
const handleEditDropdownChange = (selectedDepartment) => {
    const departmentId = departmentItems.find((item) => item.name === selectedDepartment)?.id;
    console.log(departmentId, "this lab id");
    setEditActiveDropdown(selectedDepartment);

    setEditdata((prevState) => ({
        ...prevState,
        lab_dept_id: String(departmentId), // Ensure lab_dept_id is stored as a string
    }));
};

    // Fetching lab departments
    const fetchLabs = async () => {
        try {
            const response = await axiosInstance.get(`/sec/labDepartments`);
            setLabDepartments(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        }
    };

    // UseEffect to fetch labs on component mount
    useEffect(() => {
        fetchLabs();
    }, []);

    // Transform the department data for the dropdown
    const departmentItems = labDepartments.map((department) => ({
        id: department.lab_department_id,
        name: department.lab_department_name,
    }));

    const handleDropdownChange = (selectedDepartment) => {
        const departmentId = departmentItems.find((item) => item.name === selectedDepartment)?.id;
        console.log(departmentId, "this lab id");
        setActiveDropdown(selectedDepartment);

        setLabData((prevState) => ({
            ...prevState,
            lab_dept_id: String(departmentId), // Ensure lab_dept_id is stored as a string
        }));
    };

    // Handle pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "90%", flexDirection: "row" }}>
            <CustomSnackBar type={snackType} message={snackMessage} isOpen={snackOpen} />

                <nav className="NavBar-Container-Appoinement">
                    <NavLink to="/hcfadmin/diagnosticcenter/labs">Labs</NavLink>
                    <NavLink to="/hcfadmin/diagnosticcenter/staff">Staff</NavLink>
                    <NavLink to="/hcfadmin/diagnosticcenter/blocked">Blocked</NavLink>
                    {/* lab creating button */}
                    <CustomButton
                        buttonCss={{ position: "absolute", right: "0", borderRadius: "6.25rem" }}
                        isTransaprent={true}
                        label="Create Lab"
                        handleClick={() => setOpenDialog(true)}
                    />
                    {/* Add Lab Modal */}
                    <Dialog
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        maxWidth="sm"
                        fullWidth
                        PaperProps={{
                            sx: {
                                borderRadius: "16px",
                                padding: "24px",
                                fontFamily: "Poppins, sans-serif"
                            }
                        }}
                    >
                        {/* Header */}
                        <DialogTitle sx={{ 
                            padding: 0, 
                            marginBottom: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <IconButton 
                                    onClick={() => setOpenDialog(false)}
                                    sx={{ 
                                        padding: "8px",
                                        "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" }
                                    }}
                                >
                                    <ArrowBackIcon sx={{ fontSize: "20px", color: "#666" }} />
                                </IconButton>
                                <Box>
                                    <Typography variant="h5" sx={{ 
                                        fontWeight: "bold", 
                                        margin: 0,
                                        color: "#313033",
                                        fontSize: "20px"
                                    }}>
                                        Add Lab
                                    </Typography>
                                    <Typography variant="body2" sx={{ 
                                        color: "#666", 
                                        margin: 0,
                                        fontSize: "14px"
                                    }}>
                                        Create a lab here
                                    </Typography>
                                </Box>
                            </Box>
                            <IconButton 
                                onClick={() => setOpenDialog(false)}
                                sx={{ 
                                    padding: "8px",
                                    "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" }
                                }}
                            >
                                <CloseIcon sx={{ fontSize: "20px", color: "#666" }} />
                            </IconButton>
                        </DialogTitle>

                        {/* Content */}
                        <DialogContent sx={{ padding: 0 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                {/* Department */}
                                <CustomDropdown
                                    label="Department"
                                    items={departmentItems.map((item) => item.name)}
                                    activeItem={activeDropdown}
                                    handleChange={handleDropdownChange}
                                    variant="standard"
                                    dropdowncss={{
                                        width: "100%",
                                        "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                        "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                        "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                    }}
                                />

                                {/* Lab Name */}
                  

                                {/* Working Days 1 */}
                                <Box>
                                    <Typography variant="subtitle1" sx={{ 
                                        fontWeight: "bold",
                                        color: "#313033",
                                        marginBottom: "16px",
                                        fontSize: "16px"
                                    }}>
                                        Working Days
                                    </Typography>
                                    <Box sx={{ 
                                        display: "flex", 
                                        justifyContent: "space-between", 
                                        gap: 2,
                                        alignItems: "center"
                                    }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="From"
                                                value={workingDays1From}
                                                onChange={handleWorkingDays1FromChange}
                                                slotProps={{
                                                    textField: {
                                                        variant: "standard",
                                                        sx: {
                                                            flex: 1,
                                                            "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                                            "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                                            "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                                        }
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                        <Typography sx={{ color: "#666", fontSize: "14px" }}>to</Typography>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="To"
                                                value={workingDays1To}
                                                onChange={handleWorkingDays1ToChange}
                                                slotProps={{
                                                    textField: {
                                                        variant: "standard",
                                                        sx: {
                                                            flex: 1,
                                                            "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                                            "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                                            "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                                        }
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>

                         

                                {/* Working Time */}
                                <Box>
                                    <Typography variant="subtitle1" sx={{ 
                                        fontWeight: "bold",
                                        color: "#313033",
                                        marginBottom: "16px",
                                        fontSize: "16px"
                                    }}>
                                        Working Time
                                    </Typography>
                                    <Box sx={{ 
                                        display: "flex", 
                                        justifyContent: "space-between", 
                                        gap: 2,
                                        alignItems: "center"
                                    }}>
                                        <TextField
                                            label="From"
                                            variant="standard"
                                            type="time"
                                            fullWidth
                                            required
                                            value={labdata.lab_working_time_from || ""}
                                            onChange={(event) => {
                                                setLabData((prevState) => ({
                                                    ...prevState,
                                                    lab_working_time_from: event.target.value + ":00",
                                                }));
                                            }}
                                            sx={{
                                                flex: 1,
                                                "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                                "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                                "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                            }}
                                        />
                                        <Typography sx={{ color: "#666", fontSize: "14px" }}>to</Typography>
                                        <TextField
                                            label="To"
                                            variant="standard"
                                            type="time"
                                            fullWidth
                                            required
                                            value={labdata.lab_working_time_to || ""}
                                            onChange={(event) => {
                                                setLabData((prevState) => ({
                                                    ...prevState,
                                                    lab_working_time_to: event.target.value + ":00",
                                                }));
                                            }}
                                            sx={{
                                                flex: 1,
                                                "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                                "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                                "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                            }}
                                        />
                                    </Box>
                                </Box>

                                {/* Description */}
                                <Box>
                                    <Typography variant="subtitle1" sx={{ 
                                        fontWeight: "bold",
                                        color: "#313033",
                                        marginBottom: "16px",
                                        fontSize: "16px"
                                    }}>
                                        Description
                                    </Typography>
                                    <TextField
                                        multiline
                                        rows={7}
                                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus quis sapien interdum commodo. Nunc tincidunt justo non dolor bibendum, vitae elementum elit tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi maximus, nisl."
                                        value={labdata.lab_description}
                                        onChange={(event) => {
                                            setLabData((prevState) => ({
                                                ...prevState,
                                                lab_description: event.target.value,
                                            }));
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "8px",
                                                fontFamily: "Poppins, sans-serif",
                                                fontSize: "14px",
                                                color: "#666",
                                                "& fieldset": {
                                                    borderColor: "#e0e0e0",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#1976d2",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#1976d2",
                                                },
                                            },
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "#999",
                                                opacity: 1,
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                        </DialogContent>

                        {/* Footer */}
                        <DialogActions sx={{ 
                            padding: 0, 
                            marginTop: "32px",
                            justifyContent: "center"
                        }}>
                            <CustomButton
                                buttonCss={{
                                    backgroundColor: "#E72B4A",
                                    color: "white",
                                    padding: "12px 48px",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "#d32f2f"
                                    }
                                }}
                                isDisabled={!isFieldsFilled}
                                label="Create"
                                handleClick={() => {
                                    setOpenDialog(false);
                                    fetchLabData();
                                    fetchData1(hcf_id);
                                }}
                            />
                        </DialogActions>
                    </Dialog>
                </nav>
                {/* Edit Lab Modal */}
                <Dialog
                    open={editopenDialog}
                    onClose={() => setEditOpenDialog(false)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: "16px",
                            padding: "24px",
                            fontFamily: "Poppins, sans-serif"
                        }
                    }}
                >
                    {/* Header */}
                    <DialogTitle sx={{ 
                        padding: 0, 
                        marginBottom: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <IconButton 
                                onClick={() => setEditOpenDialog(false)}
                                sx={{ 
                                    padding: "8px",
                                    "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" }
                                }}
                            >
                                <ArrowBackIcon sx={{ fontSize: "20px", color: "#666" }} />
                            </IconButton>
                            <Box>
                                <Typography variant="h5" sx={{ 
                                    fontWeight: "bold", 
                                    margin: 0,
                                    color: "#313033",
                                    fontSize: "20px"
                                }}>
                                    Edit Lab
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                    color: "#666", 
                                    margin: 0,
                                    fontSize: "14px"
                                }}>
                                    Edit lab here
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton 
                            onClick={() => setEditOpenDialog(false)}
                            sx={{ 
                                padding: "8px",
                                "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" }
                            }}
                        >
                            <CloseIcon sx={{ fontSize: "20px", color: "#666" }} />
                        </IconButton>
                    </DialogTitle>

                    {/* Content */}
                    <DialogContent sx={{ padding: 0 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            {/* Department */}
                            <CustomDropdown
                                label="Department"
                                items={departmentItems.map((item) => item.name)}
                                activeItem={editactiveDropdown}
                                handleChange={handleEditDropdownChange}
                                variant="standard"
                                dropdowncss={{
                                    width: "100%",
                                    "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                    "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                    "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                }}
                            />

                            {/* Lab Name */}
                            <TextField
                                label="Lab Name"
                                variant="standard"
                                fullWidth
                                required
                                value={editdata.exam_name || ""}
                                onChange={(event) => {
                                    setEditdata((prevState) => ({
                                        ...prevState,
                                        exam_name: event.target.value,
                                    }));
                                }}
                                sx={{
                                    "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                    "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                    "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                }}
                            />

                            {/* Working Days */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ 
                                    fontWeight: "bold",
                                    color: "#313033",
                                    marginBottom: "16px",
                                    fontSize: "16px"
                                }}>
                                    Working Days
                                </Typography>
                                <Box sx={{ 
                                    display: "flex", 
                                    justifyContent: "space-between", 
                                    gap: 2,
                                    alignItems: "center"
                                }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="From"
                                            value={editdata.lab_working_days_from ? dayjs(editdata.lab_working_days_from) : null}
                                            onChange={(newValue) => {
                                                setEditdata((prevState) => ({
                                                    ...prevState,
                                                    lab_working_days_from: newValue ? dayjs(newValue).format("YYYY-MM-DD") : null,
                                                }));
                                            }}
                                            slotProps={{
                                                textField: {
                                                    variant: "standard",
                                                    sx: {
                                                        flex: 1,
                                                        "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                                        "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                                        "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                                    }
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                    <Typography sx={{ color: "#666", fontSize: "14px" }}>to</Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="To"
                                            value={editdata.lab_working_days_to ? dayjs(editdata.lab_working_days_to) : null}
                                            onChange={(newValue) => {
                                                setEditdata((prevState) => ({
                                                    ...prevState,
                                                    lab_working_days_to: newValue ? dayjs(newValue).format("YYYY-MM-DD") : null,
                                                }));
                                            }}
                                            slotProps={{
                                                textField: {
                                                    variant: "standard",
                                                    sx: {
                                                        flex: 1,
                                                        "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                                        "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                                        "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                                    }
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>

                            {/* Working Time */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ 
                                    fontWeight: "bold",
                                    color: "#313033",
                                    marginBottom: "16px",
                                    fontSize: "16px"
                                }}>
                                    Working Time
                                </Typography>
                                <Box sx={{ 
                                    display: "flex", 
                                    justifyContent: "space-between", 
                                    gap: 2,
                                    alignItems: "center"
                                }}>
                                    <TextField
                                        label="From"
                                        variant="standard"
                                        type="time"
                                        fullWidth
                                        required
                                        value={editdata.lab_working_time_from ? editdata.lab_working_time_from.substring(0, 5) : ""}
                                        onChange={(event) => {
                                            setEditdata((prevState) => ({
                                                ...prevState,
                                                lab_working_time_from: event.target.value + ":00",
                                            }));
                                        }}
                                        sx={{
                                            flex: 1,
                                            "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                            "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                            "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                        }}
                                    />
                                    <Typography sx={{ color: "#666", fontSize: "14px" }}>to</Typography>
                                    <TextField
                                        label="To"
                                        variant="standard"
                                        type="time"
                                        fullWidth
                                        required
                                        value={editdata.lab_working_time_to ? editdata.lab_working_time_to.substring(0, 5) : ""}
                                        onChange={(event) => {
                                            setEditdata((prevState) => ({
                                                ...prevState,
                                                lab_working_time_to: event.target.value + ":00",
                                            }));
                                        }}
                                        sx={{
                                            flex: 1,
                                            "& .MuiInputLabel-root": { color: "#787579", fontFamily: "Poppins, sans-serif" },
                                            "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#1976d2" },
                                            "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" }
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* Description */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ 
                                    fontWeight: "bold",
                                    color: "#313033",
                                    marginBottom: "16px",
                                    fontSize: "16px"
                                }}>
                                    Description
                                </Typography>
                                <TextField
                                    multiline
                                    rows={7}
                                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus quis sapien interdum commodo. Nunc tincidunt justo non dolor bibendum, vitae elementum elit tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi maximus, nisl."
                                    value={editdata.lab_description}
                                    onChange={(event) => {
                                        setEditdata((prevState) => ({
                                            ...prevState,
                                            lab_description: event.target.value,
                                        }));
                                    }}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "8px",
                                            fontFamily: "Poppins, sans-serif",
                                            fontSize: "14px",
                                            color: "#666",
                                            "& fieldset": {
                                                borderColor: "#e0e0e0",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#1976d2",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#1976d2",
                                            },
                                        },
                                        "& .MuiInputBase-input::placeholder": {
                                            color: "#999",
                                            opacity: 1,
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    </DialogContent>

                    {/* Footer */}
                    <DialogActions sx={{ 
                        padding: 0, 
                        marginTop: "32px",
                        justifyContent: "center"
                    }}>
                        <CustomButton
                            buttonCss={{
                                backgroundColor: "#E72B4A",
                                color: "white",
                                padding: "12px 48px",
                                fontSize: "16px",
                                fontWeight: "500",
                                borderRadius: "8px",
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "#d32f2f"
                                }
                            }}
                            isDisabled={!isEditFilled}
                            label="Update"
                            handleClick={() => {
                                setEditOpenDialog(false);
                                updateLabData();
                                fetchData1(hcf_id);
                            }}
                        />
                    </DialogActions>
                </Dialog>
                <Box
                    component={"div"}
                    sx={{ position: "relative", top: "4em", width: "100%", height: "100%" }}
                >
                    <TableContainer component={Paper} style={{ background: "white" }}>
                        <Table sx={{ minWidth: 1 }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ fontWeight: "bold" }}>
                                    <TableCell>Name & Details</TableCell>
                                    <TableCell align="right">Department</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                        Array.from(new Array(rowsPerPage)).map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell colSpan={4} align="center">
                                                    <Skeleton variant="rectangular" width="100%" height={40} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : data1.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <NoAppointmentCard text_one={"No Data Found"} />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data1
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((data, index) => (
                                            <TableRow
                                                key={`${data.exam_id}-${index}`}
                                                sx={{
                                                    "&:last-child td, &:last-child th": {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        cursor: "pointer", // Pointer cursor on hover
                                                    }}
                                                    title="Edit lab" // Tooltip message on hover
                                                    onClick={() => navigate(`${data?.exam_id}`)} // Pass the clicked test's data to handleEdit

                                                >
                                                    <LabsCard
                                                        exam_name={data.exam_name}
                                                        exam_id={data.exam_id}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography
                                                        style={{
                                                            color: "#939094",
                                                            fontFamily: "Poppins",
                                                            cursor: "pointer", // Pointer cursor on hover
                                                        }}
                                                        onClick={() =>
                                                            navigate(`${data?.exam_id}`)
                                                        }
                                                        title="Add test" // Tooltip message on hover
                                                    >
                                                        {data.lab_department_name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <CustomButton
                                                        buttonCss={{ borderRadius: "6.25rem" }}
                                                        isDisabled={data.lab_status !== 1} // Disable the button if lab_status is not 1 (Inactive)
                                                        label={
                                                            data.lab_status === 1
                                                                ? "Active"
                                                                : "Inactive"
                                                        } // Show "Active" or "Inactive"
                                                        isTransaprent
                                                    />
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
                                                                backgroundColor: "#f44336",
                                                                color: "white",
                                                                minWidth: "auto",
                                                                padding: "8px"
                                                            }}
                                                            label="Delete"
                                                            isTransaprent={false}
                                                            handleClick={() => {
                                                                if (window.confirm("Are you sure you want to delete this lab?")) {
                                                                    deleteLabData(data.exam_id);
                                                                }
                                                            }}
                                                        />
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data1.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Rows per page:"
                    />
                    </TableContainer>
                    
                </Box>
            </Box>
        </>
    );
};

export default AdminLabs;
