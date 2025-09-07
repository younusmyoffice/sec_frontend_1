import React, { Fragment, useState, useCallback, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import DrImage from "../../../../constants/DrImages/drProfileImage.png";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomList from "../../../../components/CustomList";
import CustomTextField from "../../../../components/CustomTextField";
import CustomDropdown from "../../../../components/CustomDropdown";
import "./addplan.scss";
import axios from "axios";
import { baseURL } from "../../../../constants/const";
import CustomCheckBox from "../../../../components/CustomCheckBox";

const AddPlans = () => {
    const [value, setValue] = useState([null, null]);
    const [data, setData] = useState({
        plan_fee: "null",
        plan_name: "null",
        plan_duration: "null",
    });

    const getDoclistingdetails = async () => {
        try {
            const response = await axios.get("http://0.0.0.0:3000/sec/doctor/DocListingPlan/14");
            setplandata(response?.data?.response);
            console.log("API Listing DAta : ", response?.data?.response);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getDoclistingdetails();
        console.log("Working Doctor complete");
    }, []);

    // const [value, setValue] = useState(initialValue);

    const [activeDropdown1, setActiveDropdown1] = useState("");
    const [activeDropdown2, setActiveDropdown2] = useState("");
    const [activeDropdown3, setActiveDropdown3] = useState("");
    const dropdownItems = ["30 minutes", "60 minutes", "90minutes"];

    const handleDropdownChange = (item, dropdownName) => {
        switch (dropdownName) {
            case "dropdown1":
                setActiveDropdown1(item);
                break;
            case "dropdown2":
                setActiveDropdown2(item);
                break;
            case "dropdown3":
                setActiveDropdown3(item);
                break;
            default:
                break;
        }

        setData((prevData) => ({
            ...prevData,
            plan_duration: {
                ...prevData.plan_duration,
                [dropdownName]: item,
            },
        }));
        updateIsFieldsFilleddropdown();
    };
    const [openDialog, setOpenDialog] = useState(false);
    const [allChecked, setAllChecked] = useState(false);
    const [completedChecked, setCompletedChecked] = useState(false);
    const [cancelledChecked, setCancelledChecked] = useState(false);

    const handleCheckBoxChange = (checkboxType) => {
        switch (checkboxType) {
            case "all":
                setAllChecked(!allChecked);
                setCompletedChecked(false);
                setCancelledChecked(false);
                break;
            case "completed":
                setCompletedChecked(!completedChecked);
                setAllChecked(false);
                setCancelledChecked(false);
                break;
            case "cancelled":
                setCancelledChecked(!cancelledChecked);
                setAllChecked(false);
                setCompletedChecked(false);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <nav className="NavBar-Box-one">
                <NavLink to={"/doctordashboard/doctorListing/listingdetails"}>
                    Listing Details
                </NavLink>
                <NavLink to={"/doctordashboard/doctorListing/addplans"}>Add Plans</NavLink>
                <NavLink to={"/doctordashboard/doctorListing/addquestioner"}>
                    Add Questioner
                </NavLink>
                <NavLink to={"/doctordashboard/doctorListing/termandcondition"}>
                    Term & Conditions
                </NavLink>
            </nav>

            <div className="main-container">
                <div className="Doctor-detail-container">
                    <div className="doc-profile">
                        <div className="image-container">
                            <Box
                                sx={{ borderRadius: "8px", width: "100%", height: "100%" }}
                                component={"img"}
                                src={DrImage}
                            ></Box>
                        </div>
                        <div
                            className="Detail-container"
                            sx={{
                                // border:'1px solid',
                                // height:'60%',
                                marginTop: "1%",
                            }}
                        >
                            <Typography
                                style={{
                                    fontfamily: "Poppins",
                                    fontsize: "14px",
                                    fontstyle: "normal",
                                    fontweight: "500",
                                    lineheight: "22px",
                                    letterSpacing: "0.07px",
                                }}
                            >
                                Dr.Maria Garcia
                            </Typography>
                            <Typography
                                style={{
                                    fontfamily: "Poppins",
                                    fontsize: "10px",
                                    fontstyle: "normal",
                                    fontweight: "400",
                                    lineheight: "15px",
                                    letterSpacing: "0.08px",
                                    color: "grey",
                                }}
                            >
                                Neurologist
                            </Typography>
                        </div>
                    </div>
                    <div className="Edit-btn">
                        <CustomButton
                            label="Edit Profile"
                            isTransaprent={"false"}
                            buttonCss={{
                                display: "flex",
                                borderBottom: "1px",
                                borderTop: "1px",
                                borderRight: "1px",
                                borderLeft: "1px",
                                width: "122px",
                                height: "48px",
                                padding: "8px 16px",
                                justifycontent: "flex-end",
                                alignItems: "center",
                                gap: "8px",
                                flexShrink: "0",
                                color: "red",
                            }}
                        ></CustomButton>
                    </div>
                </div>

                <div className="Add-container">
                    <Typography>Add Plan</Typography>
                    <div className="Add-addicon">
                        <Box
                            sx={{
                                // border:'1px solid',
                                marginTop: "0.5rem",
                            }}
                        >
                            <AddIcon />
                        </Box>
                        <div className="Add-btn">
                            <CustomButton
                                label="Add"
                                isTransaprent={"True"}
                                isElevated
                                handleClick={() => setOpenDialog(!openDialog)}
                                buttonCss={{
                                    display: "flex",
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    borderRight: "1px",
                                    borderTop: "1px",
                                    fontfamily: "poppins",
                                    fontsize: "16px",
                                    fontstyle: "normal",
                                    fontweight: "500",
                                    lineheight: "30px",
                                    color: "#E72B4A",
                                }}
                            ></CustomButton>
                            <CustomModal
                                style={{
                                    display: "flex",
                                }}
                                isOpen={openDialog}
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
                                                width: "101px",
                                                height: "30px",
                                            }}
                                        >
                                            Add Plans
                                        </h2>
                                    </Box>
                                }
                                footer={
                                    <Fragment>
                                        {/* <CustomButton
                                        label={"action 1"}
                                        handleClick={() => setOpenDialog(false)}
                                        isTransaprent
                                        isText
                                    /> */}
                                        {/* <CustomButton
                                        label={"action 2"}
                                        isTransaprent
                                        handleClick={() => setOpenDialog(false)}
                                        isText
                                    /> */}
                                    </Fragment>
                                }
                            >
                                <div className="first-plan">
                                    <CustomCheckBox
                                        checked={allChecked}
                                        onChange={() => handleCheckBoxChange("all")}
                                    />
                                    <Typography
                                        style={{
                                            fontFamily: "poppins",
                                            fontsize: "14px",
                                            fontstyle: "normal",
                                            fontWeight: "500",
                                            lineHeight: "22px",
                                            letterSpacing: "0.07px",
                                        }}
                                    >
                                        Messaging Plan
                                    </Typography>
                                </div>
                                <div className="first-plan-content">
                                    <CustomTextField
                                        label="Price"
                                        helperText={""}
                                        textcss={{
                                            width: "250px",
                                            height: "56px",
                                            flexShrink: "0",
                                            color: "#787579",
                                            fontfamily: "poppins",
                                            fontsize: "16px",
                                            fontstyle: "normal",
                                            fontweight: "400",
                                            lineHeight: "24px",
                                        }}
                                        isDisabled={!allChecked}
                                    ></CustomTextField>
                                    <CustomDropdown
                                        label={"Duration"}
                                        items={dropdownItems}
                                        activeItem={activeDropdown1}
                                        dropdowncss={{
                                            width: "230px",
                                            height: "56px",
                                            color: "#E6E1E5",
                                        }}
                                        isDisabled={!allChecked}
                                    />
                                </div>
                                <div className="second-plan">
                                    <CustomCheckBox
                                        checked={completedChecked}
                                        onChange={() => handleCheckBoxChange("completed")}
                                    />
                                    <Typography
                                        style={{
                                            fontFamily: "poppins",
                                            fontsize: "14px",
                                            fontstyle: "normal",
                                            fontWeight: "500",
                                            lineHeight: "22px",
                                            letterSpacing: "0.07px",
                                        }}
                                    >
                                        Video Plan
                                    </Typography>
                                </div>
                                <div className="second-plan-content">
                                    <CustomTextField
                                        label="Price"
                                        helperText={""}
                                        textcss={{
                                            width: "250px",
                                            height: "56px",
                                            flexShrink: "0",
                                            color: "#787579",
                                            fontfamily: "poppins",
                                            fontsize: "16px",
                                            fontstyle: "normal",
                                            fontweight: "400",
                                            lineHeight: "24px",
                                        }}
                                        isDisabled={!completedChecked}
                                    ></CustomTextField>
                                    <CustomDropdown
                                        label={"Duration"}
                                        items={dropdownItems}
                                        activeItem={activeDropdown2}
                                        dropdowncss={{
                                            width: "230px",
                                            height: "56px",
                                            color: "#E6E1E5",
                                        }}
                                        isDisabled={!completedChecked}
                                    />
                                </div>
                                <div className="third-plan">
                                    <CustomCheckBox
                                        checked={cancelledChecked}
                                        onChange={() => handleCheckBoxChange("cancelled")}
                                    />
                                    <Typography
                                        style={{
                                            fontFamily: "poppins",
                                            fontsize: "14px",
                                            fontstyle: "normal",
                                            fontWeight: "500",
                                            lineHeight: "22px",
                                            letterSpacing: "0.07px",
                                        }}
                                    >
                                        Video Plan
                                    </Typography>
                                </div>
                                <div className="third-plan-content">
                                    <CustomTextField
                                        label="Price"
                                        helperText={""}
                                        textcss={{
                                            width: "250px",
                                            height: "56px",
                                            flexShrink: "0",
                                            color: "#787579",
                                            fontfamily: "poppins",
                                            fontsize: "16px",
                                            fontstyle: "normal",
                                            fontweight: "400",
                                            lineHeight: "24px",
                                        }}
                                        isDisabled={!cancelledChecked}
                                    ></CustomTextField>
                                    <CustomDropdown
                                        label={"Duration"}
                                        items={dropdownItems}
                                        activeItem={activeDropdown3}
                                        dropdowncss={{
                                            width: "230px",
                                            height: "56px",
                                            color: "#E6E1E5",
                                        }}
                                        isDisabled={!cancelledChecked}
                                    />
                                </div>
                                <div className="save-button">
                                    <CustomButton label="Save" />
                                </div>
                            </CustomModal>
                        </div>
                    </div>
                </div>
                <div className="Box1">
                    <div>
                        {plandata.map((plan, index) => (
                            <div className="detail-type1" key={index}>
                                <Typography
                                    style={{
                                        fontFamily: "poppins",
                                        fontSize: "18px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "28px",
                                        color: "#313033",
                                    }}
                                >
                                    {plan.plan_name}
                                </Typography>
                                <Typography
                                    style={{
                                        fontFamily: "poppins",
                                        fontSize: "12px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        color: "#787579",
                                    }}
                                >
                                    {plan.plan_fee} | {plan.plan_duration}
                                </Typography>
                            </div>
                        ))}
                    </div>
                    <div className="Delete-Edit">
                        <div className="Delete-Icon">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginTop: "0.5rem",
                                    marginLeft: "5%",
                                }}
                            >
                                <DeleteIcon />
                            </Box>
                            <CustomButton
                                label="Delete"
                                isTransaprent={"True"}
                                buttonCss={{
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    borderRight: "1px",
                                    borderTop: "1px",
                                }}
                            ></CustomButton>
                        </div>
                        <div className="Edit-Icon">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginTop: "0.5rem",
                                    marginLeft: "5%",
                                }}
                            >
                                <EditIcon />
                            </Box>
                            <CustomButton
                                label="Edit"
                                isTransaprent={"True"}
                                buttonCss={{
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    borderRight: "1px",
                                    borderTop: "1px",
                                }}
                            ></CustomButton>
                        </div>
                    </div>
                </div>

                <div className="Box2">
                    <div>
                        {plandata.map((plan, index) => (
                            <div className="detail-type1" key={index}>
                                <Typography
                                    style={{
                                        fontFamily: "poppins",
                                        fontSize: "18px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "28px",
                                        color: "#313033",
                                    }}
                                >
                                    {plan.plan_name}
                                </Typography>
                                <Typography
                                    style={{
                                        fontFamily: "poppins",
                                        fontSize: "12px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        color: "#787579",
                                    }}
                                >
                                    {plan.plan_fee} | {plan.plan_duration}
                                </Typography>
                            </div>
                        ))}
                    </div>
                    <div className="Delete-Edit">
                        <div className="Delete-Icon">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginTop: "0.5rem",
                                    marginLeft: "5%",
                                }}
                            >
                                <DeleteIcon />
                            </Box>
                            <CustomButton
                                label="Delete"
                                isTransaprent={"True"}
                                buttonCss={{
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    borderRight: "1px",
                                    borderTop: "1px",
                                }}
                            ></CustomButton>
                        </div>
                        <div className="Edit-Icon">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginTop: "0.5rem",
                                    marginLeft: "5%",
                                }}
                            >
                                <EditIcon />
                            </Box>
                            <CustomButton
                                label="Edit"
                                isTransaprent={"True"}
                                buttonCss={{
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    borderRight: "1px",
                                    borderTop: "1px",
                                }}
                            ></CustomButton>
                        </div>
                    </div>
                </div>

                <div className="Box3">
                    <div>
                        {plandata.map((plan, index) => (
                            <div className="detail-type1" key={index}>
                                <Typography
                                    style={{
                                        fontFamily: "poppins",
                                        fontSize: "18px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "28px",
                                        color: "#313033",
                                    }}
                                >
                                    {plan.plan_name}
                                </Typography>
                                <Typography
                                    style={{
                                        fontFamily: "poppins",
                                        fontSize: "12px",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        lineHeight: "18px",
                                        color: "#787579",
                                    }}
                                >
                                    {plan.plan_fee} | {plan.plan_duration}
                                </Typography>
                            </div>
                        ))}
                    </div>
                    <div className="Delete-Edit">
                        <div className="Delete-Icon">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginTop: "0.5rem",
                                    marginLeft: "5%",
                                }}
                            >
                                <DeleteIcon />
                            </Box>
                            <CustomButton
                                label="Delete"
                                isTransaprent={"True"}
                                buttonCss={{
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    borderRight: "1px",
                                    borderTop: "1px",
                                }}
                            ></CustomButton>
                        </div>
                        <div className="Edit-Icon">
                            <Box
                                sx={{
                                    // border:'1px solid',
                                    marginTop: "0.5rem",
                                    marginLeft: "5%",
                                }}
                            >
                                <EditIcon />
                            </Box>
                            <CustomButton
                                label="Edit"
                                isTransaprent={"True"}
                                buttonCss={{
                                    borderBottom: "1px",
                                    borderLeft: "1px",
                                    borderRight: "1px",
                                    borderTop: "1px",
                                }}
                            ></CustomButton>
                        </div>
                    </div>
                </div>
                <Box sx={{ marginTop: "1%" }}>
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Save As Draft"
                        isTransaprent={true}
                        // isDisabled={!isFieldsFilled}
                    />
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Next"
                        // isDisabled={!isFieldsFilled}
                        handleClick={() => fetchData()}
                    />
                </Box>
            </div>
        </>
    );
};

export default AddPlans;
