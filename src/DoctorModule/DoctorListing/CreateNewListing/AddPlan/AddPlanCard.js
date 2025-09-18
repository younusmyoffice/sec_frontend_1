import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "../../../../components/CustomButton";
import "./addplan.scss";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar";

const AddPlanCard = ({ planCardData, index, RendenDataAfterDelete, isDeleteVisible = true, isEditVisible = true }) => {

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackType, setSnackType] = useState("success");

    const [deletePlan] = useState({
        doctor_id: planCardData?.doctor_id,
        doctor_list_id: planCardData?.doctor_list_id,
        doctor_fee_plan_id: planCardData?.doctor_fee_plan_id
    });

    const DeleteDoctorPlan = async () => {
        RendenDataAfterDelete(false);
        try {
            const response = await axiosInstance.post(
                "/sec/createUpdatedoctorlisting/planDelete",
                JSON.stringify(deletePlan),
            );
            RendenDataAfterDelete(true);
            setSnackMessage("Plan deleted successfully.");
            setSnackType("success");
            setSnackOpen(true);
            console.log("Delete API Response:", response);
        } catch (error) {
            console.error("Delete API Error:", error);
            setSnackMessage("Failed to delete plan. Please try again.");
            setSnackType("error");
            setSnackOpen(true);
            RendenDataAfterDelete(false);
        }
    };

    return (
        <>
            <CustomSnackBar type={snackType} isOpen={snackOpen} message={snackMessage} />

            <div className="Box1">
                <div>
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
                            {planCardData?.plan_name}
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
                            {planCardData?.plan_fee} | {planCardData?.plan_duration}
                        </Typography>
                    </div>
                </div>
                <div className="Delete-Edit">
                    <div className="Delete-Icon" style={{ display: isDeleteVisible ? 'block' : 'none' }}>
                        <Box sx={{ marginTop: "0.5rem", marginLeft: "5%" }}>
                            <DeleteIcon />
                        </Box>
                        <CustomButton
                            label="Delete"
                            isTransaprent={true}
                            handleClick={DeleteDoctorPlan}
                            buttonCss={{
                                borderBottom: "1px",
                                borderLeft: "1px",
                                borderRight: "1px",
                                borderTop: "1px",
                            }}
                        />
                    </div>
                    <div className="Edit-Icon" style={{ display: isEditVisible ? 'block' : 'none' }}>
                        <Box sx={{ marginTop: "0.5rem", marginLeft: "5%" }}>
                            <EditIcon />
                        </Box>
                        <CustomButton
                            label="Edit"
                            isTransaprent={true}
                            buttonCss={{
                                borderBottom: "1px",
                                borderLeft: "1px",
                                borderRight: "1px",
                                borderTop: "1px",
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddPlanCard;
    