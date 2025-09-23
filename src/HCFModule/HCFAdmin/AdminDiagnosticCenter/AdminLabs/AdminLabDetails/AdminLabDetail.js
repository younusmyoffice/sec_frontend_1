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
import axiosInstance from "../../../../../config/axiosInstance";
import NotFound from "../../../../../components/NotFound";
import { Testlist } from "./Testlist";
import pen from "../../../../../static/images/DrImages/Pen.svg";
import CustomModal from "../../../../../components/CustomModal";
import CustomTextField from "../../../../../components/CustomTextField";
import CustomSnackBar from "../../../../../components/CustomSnackBar";
import NoAppointmentCard from "../../../../../PatientDashboard/PatientAppointment/NoAppointmentCard/NoAppointmentCard";

const AdminLabDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [data1, setData1] = useState([]);
    const [test, setTest] = useState([]);
    const [loading, setLoading] = useState(true);
    const hcf_id = localStorage.getItem("hcfadmin_suid");
    const exam_id = params.labid;
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

    console.log("this is prammmmsssseeeee", params);
    // Fetch lab details
    const fetchData1 = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `/sec/hcf/getHcfSingleLab/${hcf_id}/${exam_id}`,
            );
            console.log("response from : ", response?.data?.response);
            setData1(response?.data?.response);
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData1();
    }, []);

    // Get test list
    const getTests = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/sec/hcf/getHcfTests/${hcf_id}/${exam_id}`);
            console.log("response from : ", response?.data?.response);
            setTest(response?.data?.response);
        } catch (error) {
            console.error("Error fetching test data:", error.response);
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

    const fetchTestData = async () => {
        setSnackOpen(false);
        try {
            await axiosInstance.post(`/sec/hcf/addTests`, JSON.stringify(testdata), {
                headers: { Accept: "Application/json" },
            });
            await setSnackType("success");
            await setSnackMessage("Test Crested Succesfully");
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
        console.log("edit clicked for exam:", testdata);
        setOpenEditDialog(true); // Open the modal
``    };
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

    const UpdateLab = async () => {
        setSnackOpen(false);
        try {
            await axiosInstance.post(`/sec/hcf/addTests`, JSON.stringify(editdata), {
                headers: { Accept: "Application/json" },
            });
            await setSnackType("success");
            await setSnackMessage("Test Update Succesfully");
            setSnackOpen(true);
            setTimeout(() => setOpenEditDialog(false), 3000);
        } catch (error) {
            alert("Fill the details properly");
            console.error(error.response);
            await setSnackType("error");
            await setSnackMessage("some error occured!!!");
            setSnackOpen(true);
        }
    };

    const handleDelete = (data) => {
        // Logic for delete option
        console.log("Delete clicked for exam:", data.sub_exam_id);
        alert(`Do you want to delete ${data.sub_exam_name}?`);
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
