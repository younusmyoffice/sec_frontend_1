import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Skeleton,
    Typography,
    TablePagination,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CustomButton from "../../../../components/CustomButton";
import { StaffCards } from "./StaffCards";
import CustomModal from "../../../../components/CustomModal";
import CustomTextField from "../../../../components/CustomTextField";
import Edittaff from "./Edittaff";
import axiosInstance from "../../../../config/axiosInstance";
import CustomDropdown from "../../../../components/CustomDropdown";
import pen from "../../../../static/images/DrImages/Pen.svg";
import NoAppointmentCard from "../../../../PatientModule/PatientAppointment/NoAppointmentCard/NoAppointmentCard";
import DoneIcon from "@mui/icons-material/Done";
import CustomOTPInput from "../../../../components/OTPInput";
import CustomSnackBar from "../../../../components/CustomSnackBar";

const AdminStaff = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDesignation, setSelectedDesignation] = useState(""); // State for Designation dropdown
    const [selectedDepartment, setSelectedDepartment] = useState(""); // State for Department dropdown
    const [snackType, setSnackType] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const [labDepartments, setLabDepartments] = useState([]);
    const [staffDesignation, setStaffDesignation] = useState([]);
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [textFields, setTextFields] = useState({
        first_name: "",
        email: "",
        mobile: "",
        role_id: "4",
        password: "",
        staff_designation: "",
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        lab_department_id: "",
    });
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [isEditFilled, setIsEditFilled] = useState(false);
    const [editdata, setEditdata] = useState({
        staff_id: null,
        first_name: null,
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        email: null,
        mobile: null,
        role_id: "4",
        password: null,
        added_by: null,
        staff_designation: null,
        dept_exam_id: null,
    });
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Current page starts at 0
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const [verifiedEmail, setVerifiedEmail] = useState(false);
    const [verifiedMobile, setVerifiedMobile] = useState(false);
    const [isEmailModalOtp, setIsEmailModalOtp] = useState(false);
    const [email, setEmail] = useState(""); // To store the email input
    const [mob, setMob] = useState(""); //to store the mobile input
    const [isMobModalOtp, setIsMobModalOtp] = useState(false);
    const [otp, setOtp] = useState(null);
    const [emailOtp, setEmailOtp] = useState({
        email: "",
        mobile: "",
        role_id: "4",
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        register_with_email: "true",
    });
    const [mobOtp, setMobOtp] = useState({
        email: "",
        mobile: "",
        role_id: "4",
        hcf_id: localStorage.getItem("hcfadmin_suid"),
        register_with_email: "false",
    });
    const [verifyEmail, setVerifyEmail] = useState({
        email: emailOtp.email, // First state
        activation_code: otp, // Second state
    });
    const [verifyMob, setVerifyMob] = useState({
        mobile: mobOtp.mobile,
        otp_code: otp,
    });
    const hcf_id = localStorage.getItem("hcfadmin_suid");

    // ------------------------------------------creating staff handler------------------------------------------//
    useEffect(() => {
        checkFields(textFields); // Ensure fields are checked on each textFields update
    }, [textFields]);
    const fetchTestData = async () => {
        setSnackOpen(false);
        try {
            await axiosInstance.post(`/sec/hcf/addStaff`, JSON.stringify(textFields), {
                headers: { Accept: "Application/json" },
            });
            await setSnackType("success");
            await setSnackMessage("staff Crested Succesfully");
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
            formData.first_name &&
            formData.email &&
            formData.mobile &&
            formData.role_id &&
            formData.password &&
            formData.hcf_diag_name &&
            formData.lab_department_id &&
            formData.hcf_id; // Check if hcf_id is set

        setIsFieldsFilled(isFilled);
    };

    //getting staff list

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/sec/hcf/getHcfStaff/${hcf_id}`);
            setData(response?.data?.response || []);
        } catch (error) {
            console.log("Error fetching staff data:", error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [hcf_id]);

    // Fetching lab departments

    const fetchLabs = async () => {
        try {
            const response = await axiosInstance.get(`/sec/labDepartments`);
            setLabDepartments(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        }
    };

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
        setSelectedDepartment(selectedDepartment);

        setTextFields((prevState) => ({
            ...prevState,
            lab_department_id: String(departmentId), // Ensure lab_dept_id is stored as a string
        }));
    };

    // Fetching staff Designation
    const fetchDesignation = async () => {
        try {
            const response = await axiosInstance.get(`/sec/staffDesignations`);
            setStaffDesignation(response?.data?.response || []);
        } catch (error) {
            console.error("Error fetching lab data:", error.response);
        }
    };

    useEffect(() => {
        fetchDesignation();
    }, []);

    // Transform the department data for the dropdown
    const designationItems = staffDesignation.map((designation) => ({
        id: designation.staff_designation_id,
        name: designation.staff_designation_name,
    }));

    const handleDropdownChange1 = (selectedDepartment) => {
        const designationId = designationItems.find((item) => item.name === selectedDepartment)?.id;
        console.log(designationId, "this staff id");
        setSelectedDesignation(selectedDepartment);

        setTextFields((prevState) => ({
            ...prevState,
            staff_designation: String(designationId), // Ensure lab_dept_id is stored as a string
        }));
    };

    // Handler for Create Password
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (confirmPassword && event.target.value !== confirmPassword) {
            setPasswordError(true); // Trigger error if they don't match
        } else {
            setPasswordError(false);
        }
    };

    // Handler for Confirm Password
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        if (event.target.value !== password) {
            setPasswordError(true); // Trigger error if they don't match
        } else {
            setPasswordError(false);
        }
    };

    // Calculate total pages
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Slice the data based on the current page
    const displayedData = data.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage,
    );

    //edit staff handler
    const handleEdit = (data) => {
        // setSelectedTest(data); // Set the selected test data
        setEditdata({
            staff_id: String(data.staff_id), // Convert sub_exam_id to a string
            first_name: data.first_name,
            hcf_id: hcf_id,
            email: data.email,
            mobile: String(data.mobile),
            role_id: "4",
            added_by: "hcf admin",
            hcf_diag_name: data.hcf_diag_name,
            dept_exam_id: String(data.dept_exam_id),
        });
        setOpenEditDialog(true); // Open the modal
    };

    const checkEditFields = (formData) => {
        const isFilled =
            formData.staff_id &&
            formData.first_name &&
            formData.email &&
            formData.mobile &&
            formData.role_id &&
            formData.password &&
            formData.hcf_diag_name &&
            formData.dept_exam_id &&
            formData.hcf_id; // Check if hcf_id is set

        setIsEditFilled(isFilled);
    };

    useEffect(() => {
        checkEditFields(editdata); // Ensure fields are checked on each testdata update
    }, [editdata]);

    const UpdateStaff = async () => {
        setSnackOpen(false);
        try {
            await axiosInstance.post(`/sec/hcf/updateStaff`, JSON.stringify(editdata), {
                headers: { Accept: "Application/json" },
            });
            await setSnackType("success");
            await setSnackMessage("Staff Update Succesfully");
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
    // Transform the department data for the dropdown
    const EditdepartmentItems = labDepartments.map((department) => ({
        id: department.lab_department_id,
        name: department.lab_department_name,
    }));

    const handleEditropdownChange = (selectedDepartment) => {
        const departmentId = EditdepartmentItems.find(
            (item) => item.name === selectedDepartment,
        )?.id;
        console.log(departmentId, "this lab id");
        setSelectedDepartment(selectedDepartment);

        setEditdata((prevState) => ({
            ...prevState,
            lab_department_id: String(departmentId), // Ensure lab_dept_id is stored as a string
        }));
    };
    // Transform the department data for the dropdown
    const EditdesignationItems = staffDesignation.map((designation) => ({
        id: designation.staff_designation_id,
        name: designation.staff_designation_name,
    }));

    const handleEditDropdownChange1 = (selectedDepartment) => {
        const designationId = EditdesignationItems.find(
            (item) => item.name === selectedDepartment,
        )?.name;
        console.log(designationId, "this staff id");
        setSelectedDesignation(selectedDepartment);

        setEditdata((prevState) => ({
            ...prevState,
            hcf_diag_name: String(designationId), // Ensure lab_dept_id is stored as a string
        }));
    };

    // -----------------------------------------email and mobile otp verfication handler start here-------------------------------------//

    // triggering otp for email verification
    const emailRegister = async () => {
        setSnackOpen(false); // Close the snackbar before the request
        try {
            await axiosInstance.post(`/sec/hcf/addStaff`, JSON.stringify(emailOtp), {
                headers: { Accept: "Application/json" },
            });

            // Set success message and type for the snackbar
            setSnackMessage("OTP has been sent to your email.");
            setSnackType("success");
            setSnackOpen(true);
        } catch (error) {
            // Set error message and type for the snackbar
            setSnackMessage("Please fill in the details properly.");
            setSnackType("error");
            setSnackOpen(true);
        }
    };

    const mobRegister = async () => {
        setSnackOpen(false); // Close the snackbar before the request
        try {
            await axiosInstance.post(`/sec/hcf/addStaff`, JSON.stringify(mobOtp), {
                headers: { Accept: "Application/json" },
            });

            // Set success message and type for the snackbar
            setSnackMessage("OTP has been sent to your mobile No.");
            setSnackType("success");
            setSnackOpen(true);
        } catch (error) {
            // Set error message and type for the snackbar
            setSnackMessage("Please fill in the details properly.");
            setSnackType("error");
            setSnackOpen(true);
        }
    };

    const checkEmailFields = (formData) => {
        const isFilled = formData.email && formData.mobile && formData.role_id && formData.hcf_id; // Check if hcf_id is set

        setIsFieldsFilled(isFilled);
    };
    const veriFyEmailOTPHandler = () => {
        emailVerify();
        console.log("handler clicked");
        setVerifiedEmail(!verifiedEmail);
    };
    const veriFyMobOTPHandler = () => {
        mobileVerify();
        console.log("handler clicked");
        setVerifiedMobile(!verifiedMobile);
    };
    // Handle email change
    const handleEmailChange = (e) => {
        setEmail(e.target.value); // Update email state on input change
        setEmailOtp({ ...emailOtp, email: e.target.value }); // Sync emailOtp state
        setMobOtp({...mobOtp, email: e.target.value})
        setVerifyEmail({ ...verifyEmail, email: e.target.value });
    };

    const handleMobChange = (e) => {
        setMob(e.target.value);
        setEmailOtp({ ...emailOtp, mobile: e.target.value });
        setMobOtp({ ...mobOtp, mobile: e.target.value}) // Sync emailOtp state
        setVerifyMob({ ...verifyMob, mobile: e.target.value });
    };
    // handler for verifying otp
    const emailVerify = async () => {
        setSnackOpen(false); // Close snackbar before making the request
        try {
            await axiosInstance.post(
                `/sec/hcf/verifyHCFDiagnosticStaffEmail`,
                JSON.stringify(verifyEmail),
                {
                    headers: { Accept: "Application/json" },
                },
            );

            // If OTP is correct
            setSnackMessage("Email verified successfully.");
            setSnackType("success");
            setSnackOpen(true);

            // Close the OTP modal
            setIsEmailModalOtp(false);
        } catch (error) {
            // If OTP is incorrect
            setSnackMessage("Wrong OTP. Please try again.");
            setSnackType("error");
            setSnackOpen(true);
        }
    };
    // handler for verifying otp
    const mobileVerify = async () => {
        setSnackOpen(false); // Close snackbar before making the request
        try {
            await axiosInstance.post(
                `/sec/hcf/verifyHCFDiagnosticStaffMobile`,
                JSON.stringify(verifyMob),
                {
                    headers: { Accept: "Application/json" },
                },
            );

            // If OTP is correct
            setSnackMessage("Mobile verified successfully.");
            setSnackType("success");
            setSnackOpen(true);

            // Close the OTP modal
            setIsEmailModalOtp(false);
        } catch (error) {
            // If OTP is incorrect
            setSnackMessage("Wrong OTP. Please try again.");
            setSnackType("error");
            setSnackOpen(true);
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", width: "98%", height: "90%", flexDirection: "row" }}>
                <CustomSnackBar type={snackType} message={snackMessage} isOpen={snackOpen} />
                <nav className="NavBar-Container-Appoinement">
                    <NavLink to={"/hcfadmin/diagnosticcenter/labs"}>Labs</NavLink>
                    <NavLink to={"/hcfadmin/diagnosticcenter/staff"}>Staff</NavLink>
                    <NavLink to={"/hcfadmin/diagnosticcenter/blocked"}>Blocked</NavLink>
                    <CustomButton
                        buttonCss={{ position: "absolute", right: "0", borderRadius: "6.25rem" }}
                        isTransaprent={true}
                        label="Add Staff"
                        handleClick={() => setOpenDialog(true)}
                    />
                </nav>
                {/* modal for adding staff */}
                <CustomModal
                    conditionOpen={setOpenDialog}
                    isOpen={openDialog}
                    disableBackdropClick={true}
                    title={<h5 style={{ fontWeight: "bold" }}>Create Staff</h5>}
                    footer={
                        <Fragment>
                            <CustomButton
                                buttonCss={{
                                    borderRadius: "25px",
                                    fontFamily: "PoppiveriFyEmailOTPHandlerns",
                                    marginTop: "20px",
                                }}
                                label={"Create"}
                                isDisabled={!verifiedEmail || !verifiedMobile} // Disable button if either verification is incomplete
                                handleClick={() => {
                                    fetchTestData();
                                }}
                            />
                        </Fragment>
                    }
                    style={{ width: "90%", maxWidth: "1000px", height: "auto" }} // Increased size of modal
                >
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(2, 1fr)" // 2-column grid layout
                        gap="20px" // Increased gap between fields for better spacing
                    >
                        <CustomDropdown
                            label={"Designation"}
                            items={designationItems.map((item) => item.name)} // Extract just names for display
                            activeItem={selectedDesignation} // State to hold active selected value
                            handleChange={handleDropdownChange1} // Function to handle dropdown changes
                            style={{ width: "100%" }}
                        />
                        <CustomDropdown
                            label={"Department"}
                            items={departmentItems.map((item) => item.name)} // Extract just names for display
                            activeItem={selectedDepartment} // State to hold active selected value
                            handleChange={handleDropdownChange} // Function to handle dropdown changes
                            style={{ width: "100%" }}
                        />
                        <CustomTextField
                            placeholder={"Enter Name"}
                            label="Name"
                            variant="standard"
                            fullWidth
                            helperText={""}
                            defaultValue={textFields?.first_name}
                            onInput={(e) =>
                                setTextFields({
                                    ...textFields,
                                    first_name: e.target.value,
                                })
                            }
                        />
                        <CustomTextField
                            placeholder={"Enter Email"}
                            label="Email"
                            variant="standard"
                            defaultValue={verifyEmail?.email} // Bind email state to input value
                            onChange={handleEmailChange} // Capture email input changes
                            onInput={(e) =>
                                setTextFields({
                                    ...textFields,
                                    email: e.target.value,
                                })
                            }
                            rightIcon={
                                verifiedEmail ? (
                                    <DoneIcon sx={{ color: "green" }} />
                                ) : (
                                    <p
                                        style={{
                                            fontFamily: "Poppins",
                                            fontSize: "0.6em",
                                            color: "#E72B4A",
                                        }}
                                    >
                                        verify
                                    </p>
                                )
                            }
                            onRightIconClick={() => {
                                // setVerifiedEmail(!verifiedEmail);
                                setIsEmailModalOtp(true);
                                emailRegister();
                                console.log("verify clicked");
                            }}
                            fullWidth
                            helperText={""}
                            type="email"
                        />

                        <CustomTextField
                            placeholder={"Enter Mobile Number"}
                            label="Mobile No"
                            variant="standard"
                            fullWidth
                            defaultValue={mob}
                            value={mob} // Bind email state to input value
                            onChange={handleMobChange}
                            onInput={(e) =>
                                setTextFields({
                                    ...textFields,
                                    mobile: e.target.value,
                                })
                            }
                            rightIcon={
                                verifiedMobile ? (
                                    <DoneIcon sx={{ color: "green" }} />
                                ) : (
                                    <p
                                        style={{
                                            fontFamily: "Poppins",
                                            fontSize: "0.6em",
                                            color: "#E72B4A",
                                        }}
                                    >
                                        verify
                                    </p>
                                )
                            }
                            onRightIconClick={() => {
                                // setVerifiedEmail(!verifiedEmail);
                                setIsMobModalOtp(true);
                                mobRegister()
                                console.log("verify clicked");
                            }}
                            helperText={""}
                        />
                        <CustomTextField
                            placeholder={"Enter Password"}
                            label="Create Password"
                            variant="standard"
                            fullWidth
                            type="password"
                            helperText={""}
                            value={password}
                            onChange={handlePasswordChange}
                            defaultValue={textFields?.password}
                            onInput={(e) =>
                                setTextFields({
                                    ...textFields,
                                    password: e.target.value,
                                })
                            }
                        />
                        <CustomTextField
                            placeholder={"Confirm Password"}
                            label="Confirm Password"
                            variant="standard"
                            type="password"
                            fullWidth
                            helperText={passwordError ? "Passwords do not match" : ""}
                            error={passwordError} // Highligh•••••••••t in red if there's an error
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </Box>
                </CustomModal>
                {/* modal for email otp verification  */}
                <CustomModal
                    isOpen={isEmailModalOtp}
                    conditionOpen={setIsEmailModalOtp}
                    title={"Enter Email OTP"}
                    disableBackdropClick={true}
                >
                    <div id="otp-box-container">
                        <CustomOTPInput
                            value={verifyEmail?.activation_code}
                            onChange={(value) => {
                                setVerifyEmail({ ...verifyEmail, activation_code: value });
                            }}
                            numInputs={6}
                            placeholder="*"
                        />
                        <div className="otpsent">
                            <p>The OTP has been sent to -{email}</p>
                        </div>
                        <CustomButton label={"Verify"} handleClick={veriFyEmailOTPHandler} />
                    </div>
                </CustomModal>
                {/* modal for mobile otp verification  */}
                <CustomModal
                    isOpen={isMobModalOtp}
                    conditionOpen={setIsMobModalOtp}
                    title={"Enter Mobile OTP"}
                    disableBackdropClick={true}
                >
                    <div id="otp-box-container">
                        <CustomOTPInput
                            value={otp}
                            onChange={(value) => {
                                setVerifyMob({ ...verifyMob, otp_code: value });
                            }}
                            numInputs={6}
                            placeholder="*"
                        />
                        <div className="otpsent">
                            <p>The OTP has been sent to - {mob} </p>
                        </div>
                        <CustomButton label={"Verify"} handleClick={veriFyMobOTPHandler} />
                    </div>
                </CustomModal>
                {/* modal for editing staff */}
                <CustomModal
                    conditionOpen={setOpenEditDialog}
                    isOpen={openEditDialog}
                    disableBackdropClick={true}
                    title={<h5 style={{ fontWeight: "bold" }}>Edit Staff</h5>}
                    footer={
                        <Fragment>
                            <CustomButton
                                buttonCss={{
                                    borderRadius: "25px",
                                    fontFamily: "PoppiveriFyEmailOTPHandlerns",
                                    marginTop: "20px",
                                }}
                                label={"Update"}
                                // isDisabled={!isFieldsFilled}
                                handleClick={() => {
                                    UpdateStaff();
                                }}
                            />
                        </Fragment>
                    }
                    style={{ width: "90%", maxWidth: "1000px", height: "auto" }} // Increased size of modal
                >
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(2, 1fr)" // 2-column grid layout
                        gap="20px" // Increased gap between fields for better spacing
                    >
                        <CustomDropdown
                            label={"Designation"}
                            items={EditdesignationItems.map((item) => item.name)} // Extract just names for display
                            activeItem={selectedDesignation} // State to hold active selected value
                            handleChange={handleEditDropdownChange1} // Function to handle dropdown changes
                            style={{ width: "100%" }}
                        />
                        <CustomDropdown
                            label={"Department"}
                            items={EditdepartmentItems.map((item) => item.name)} // Extract just names for display
                            activeItem={selectedDepartment} // State to hold active selected value
                            handleChange={handleEditropdownChange} // Function to handle dropdown changes
                            style={{ width: "100%" }}
                        />
                        <CustomTextField
                            placeholder={"Enter Name"}
                            label="Name"
                            variant="standard"
                            fullWidth
                            helperText={""}
                            defaultValue={editdata?.first_name}
                            onInput={(e) =>
                                setEditdata({
                                    ...editdata,
                                    first_name: e.target.value,
                                })
                            }
                        />
                        <CustomTextField
                            placeholder={"Enter Email"}
                            label="Email"
                            variant="standard"
                            defaultValue={email}
                            value={email} // Bind email state to input value
                            onChange={handleEmailChange} // Capture email input changes
                            fullWidth
                            helperText={""}
                            type="email"
                        />

                        <CustomTextField
                            placeholder={"Enter Mobile Number"}
                            label="Mobile No"
                            variant="standard"
                            fullWidth
                            defaultValue={mob}
                            value={mob} // Bind email state to input value
                            onChange={handleMobChange}
                            helperText={""}
                        />
                        <CustomTextField
                            placeholder={"Enter Password"}
                            label="Create Password"
                            variant="standard"
                            fullWidth
                            type="password"
                            helperText={""}
                            value={password}
                            onChange={handlePasswordChange}
                            defaultValue={editdata?.password}
                            onInput={(e) =>
                                setEditdata({
                                    ...editdata,
                                    password: e.target.value,
                                })
                            }
                        />
                        <CustomTextField
                            placeholder={"Confirm Password"}
                            label="Confirm Password"
                            variant="standard"
                            type="password"
                            fullWidth
                            helperText={passwordError ? "Passwords do not match" : ""}
                            error={passwordError} // Highligh•••••••••t in red if there's an error
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
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
                                    <TableCell align="right">Title</TableCell>
                                    <TableCell align="right">Department</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    Array.from(new Array(rowsPerPage)).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell colSpan={5} align="center">
                                                <Skeleton
                                                    variant="rectangular"
                                                    width="100%"
                                                    height={40}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : displayedData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <NoAppointmentCard text_one={"No Data Found"} />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    displayedData.map((item, index) => (
                                        <TableRow key={item.staff_id || index}>
                                            <TableCell component="th" scope="row">
                                                <StaffCards
                                                    name={`${item.first_name}`}
                                                    staff_id={`${item.staff_id}`}
                                                    lab_id={""}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    style={{
                                                        color: "#939094",
                                                        fontFamily: "Poppins",
                                                    }}
                                                >
                                                    {item.hcf_diag_name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    style={{
                                                        color: "#939094",
                                                        fontFamily: "Poppins",
                                                    }}
                                                >
                                                    {item.lab_department_name}`
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <CustomButton
                                                    buttonCss={{ borderRadius: "6.25rem" }}
                                                    isDisabled={item.diag_status !== 1} // Disable the button if lab_status is not 1 (Inactive)
                                                    label={
                                                        item.diag_status === 1
                                                            ? "Active"
                                                            : "Inactive"
                                                    }
                                                    isTransaprent
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <CustomButton
                                                    buttonCss={{ borderRadius: "6.25rem" }}
                                                    label={<img src={pen} alt="Edit" />}
                                                    isTransaprent
                                                    handleClick={() => handleEdit(item)} // Pass the clicked test's data to handleEdit
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
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            onPageChange={(event, newPage) => setCurrentPage(newPage)}
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(parseInt(event.target.value, 10));
                                setCurrentPage(0); // Reset to the first page
                            }}
                            labelRowsPerPage="Rows per page:"
                        />
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
};

export default AdminStaff;
