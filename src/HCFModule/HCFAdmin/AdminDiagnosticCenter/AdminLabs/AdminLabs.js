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
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { LabsCard } from "./LabsCard";
import pen from "../../../../static/images/DrImages/Pen.svg";
import CustomModal from "../../../../components/CustomModal";
import CustomDropdown from "../../../../components/CustomDropdown";
import { LocalizationProvider, MultiInputTimeRangeField } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar";
import NoAppointmentCard from "../../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";


const AdminLabs = () => {
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [data1, setData1] = useState([]);
    const [labDepartments, setLabDepartments] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editopenDialog, setEditOpenDialog] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState("");
    const [editactiveDropdown, setEditActiveDropdown] = useState("")
    const [value, setValue] = useState([null, null]);
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

    const handleDateRangeChange = (newValue) => {
        setLabData((prevState) => ({
            ...prevState,
            lab_working_days_from: formatDate(newValue[0]),
            lab_working_days_to: formatDate(newValue[1]),
        }));
    };

    const handleTimeRangeChange = (newValue) => {
        setLabData((prevState) => ({
            ...prevState,
            lab_working_time_from: formatTime(newValue[0]),
            lab_working_time_to: formatTime(newValue[1]),
        }));
    };

    const formatDate = (date) => {
        return date ? dayjs(date).format("YYYY-MM-DD") : null;
    };

    const formatTime = (time) => {
        return time ? `${time.$H}:${time.$m}` : null;
    };

    const checkFields = (formData) => {
        const isFilled =
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
            await axiosInstance.post(`/sec/hcf/addLabs`, JSON.stringify(labdata), {
                headers: { Accept: "Application/json" },
            });
            await setSnackType("success");
            await setSnackMessage("Lab Crested Succesfully");
            setSnackOpen(true);
            setTimeout(() => setOpenDialog(false), 3000);
        } catch (error) {
            alert("Fill the details properly");
            console.error(error.response);
            await setSnackType("error");
            await setSnackMessage("some error occured!!!");
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

const handleDateRangeChangeEdit = (newValue) => {
    setEditdata((prevState) => ({
        ...prevState,
        lab_working_days_from: formatDate(newValue[0]),
        lab_working_days_to: formatDate(newValue[1]),
    }));
};
const handleTimeRangeChangeEdit = (newValue) => {
    setEditdata((prevState) => ({
        ...prevState,
        lab_working_time_from: formatTime(newValue[0]),
        lab_working_time_to: formatTime(newValue[1]),
    }));
};

const checkEditFields = (formData) => {
    const isEditFilled =
    formData.exam_id &&
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
        await axiosInstance.post(`/sec/hcf/addLabs`, JSON.stringify(editdata), {
            headers: { Accept: "Application/json" },
        });
        await setSnackType("success");
        await setSnackMessage("Lab Updated Succesfully");
        setSnackOpen(true);
        setTimeout(() => setOpenDialog(false), 3000);
    } catch (error) {
        alert("Fill the details properly");
        console.error(error.response);
        await setSnackType("error");
        await setSnackMessage("some error occured!!!");
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
                    {/* model start from here */}
                    <CustomModal
                        isOpen={openDialog}
                        conditionOpen={setOpenDialog}
                        disableBackdropClick={true}
                        title={
                            <div style={{ textAlign: "center" }}>
                                <h4 style={{ fontWeight: "bold", margin: "0" }}>Add Lab</h4>
                                <h6 style={{ color: "gray", margin: "0" }}>Create a lab here</h6>
                            </div>
                        }
                        footer={
                            <Fragment>
                                <CustomButton
                                    buttonCss={{
                                        borderRadius: "25px",
                                        fontFamily: "Poppins",
                                        marginTop: "20px",
                                    }}
                                    isDisabled={!isFieldsFilled}
                                    label={"Create"}
                                    handleClick={() => {
                                        setOpenDialog(false);
                                        fetchLabData();
                                        fetchData1(hcf_id);
                                    }}
                                />
                            </Fragment>
                        }
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
                            <CustomDropdown
                                label={"Department"}
                                items={departmentItems.map((item) => item.name)} // Extract just names for display
                                activeItem={activeDropdown}
                                handleChange={handleDropdownChange}
                                style={{ width: "100%" }}
                            />

                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                Working Days
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateRangePicker
                                    disablePast
                                    value={value}
                                    onChange={handleDateRangeChange}
                                    renderInput={(FromProps, ToProps) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <TextField
                                                {...FromProps}
                                                variant="outlined"
                                                fullWidth
                                            />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...ToProps} variant="outlined" fullWidth />
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>

                            <Typography
                                variant="subtitle1"
                                style={{ fontWeight: "bold", marginTop: 2 }}
                            >
                                Working Time
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["MultiInputTimeRangeField"]}>
                                    <MultiInputTimeRangeField
                                        onChange={handleTimeRangeChange}
                                        slotProps={{
                                            textField: ({ position }) => ({
                                                label: position === "start" ? "From" : "To",
                                                variant: "outlined",
                                                fullWidth: true,
                                            }),
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                Description
                            </Typography>
                            <textarea
                                className="textarea"
                                rows={7}
                                style={{
                                    width: "100%",
                                    color: "gray",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    padding: "8px",
                                    resize: "none",
                                }}
                                value={labdata.lab_description}
                                onChange={(event) => {
                                    setLabData((prevState) => ({
                                        ...prevState,
                                        lab_description: event.target.value,
                                    }));
                                }}
                            />
                        </Box>
                    </CustomModal>
                </nav>
                {/* Edit model start from here */}
                <CustomModal
                    isOpen={editopenDialog}
                    conditionOpen={setEditOpenDialog}
                    disableBackdropClick={true}
                    title={
                        <div style={{ textAlign: "center" }}>
                            <h4 style={{ fontWeight: "bold", margin: "0" }}>Edit Lab</h4>
                            <h6 style={{ color: "gray", margin: "0" }}>Edit lab here</h6>
                        </div>
                    }
                    footer={
                        <Fragment>
                            <CustomButton
                                buttonCss={{
                                    borderRadius: "25px",
                                    fontFamily: "Poppins",
                                    marginTop: "20px",
                                }}
                                isDisabled={!isEditFilled}
                                label={"Update"}
                                handleClick={() => {
                                    setEditOpenDialog(false);
                                    updateLabData();
                                    fetchData1(hcf_id);
                                }}
                            />
                        </Fragment>
                    }
                >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
                        <CustomDropdown
                            label={"Department"}
                            items={departmentItems.map((item) => item.name)} // Extract just names for display
                            activeItem={editactiveDropdown}
                            handleChange={handleEditDropdownChange}
                            style={{ width: "100%" }}
                        />

                        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Working Days
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateRangePicker
                                disablePast
                                value={value}
                                onChange={handleDateRangeChangeEdit}
                                renderInput={(FromProps, ToProps) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <TextField {...FromProps} variant="outlined" fullWidth />
                                        <Box sx={{ mx: 2 }}> to </Box>
                                        <TextField {...ToProps} variant="outlined" fullWidth />
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>

                        <Typography
                            variant="subtitle1"
                            style={{ fontWeight: "bold", marginTop: 2 }}
                        >
                            Working Time
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["MultiInputTimeRangeField"]}>
                                <MultiInputTimeRangeField
                                    onChange={handleTimeRangeChangeEdit}
                                    slotProps={{
                                        textField: ({ position }) => ({
                                            label: position === "start" ? "From" : "To",
                                            variant: "outlined",
                                            fullWidth: true,
                                        }),
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>

                        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            Description
                        </Typography>
                        <textarea
                            className="textarea"
                            rows={7}
                            style={{
                                width: "100%",
                                color: "gray",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                padding: "8px",
                                resize: "none",
                            }}
                            value={editdata.lab_description}
                            onChange={(event) => {
                                setEditdata((prevState) => ({
                                    ...prevState,
                                    lab_description: event.target.value,
                                }));
                            }}
                        />
                    </Box>
                </CustomModal>
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
                                                    <CustomButton
                                                        buttonCss={{ borderRadius: "6.25rem" }}
                                                        label={<img src={pen} alt="Edit" />}
                                                        isTransaprent
                                                        handleClick={() => handleEdit(data)} // Pass the clicked test's data to handleEdit
                                                    />
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
