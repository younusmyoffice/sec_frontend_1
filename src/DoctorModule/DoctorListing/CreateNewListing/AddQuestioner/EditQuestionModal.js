import React, { useState, useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomTextField from "../../../../components/CustomTextField";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
import "./addquestioner.scss";

const EditQuestionModal = ({
    isOpen,
    onClose,
    questionData,
    onQuestionUpdated,
}) => {
    const [formData, setFormData] = useState({
        question: "",
        ans_1: "",
        ans_2: "",
        ans_3: "",
        ans_4: ""
    });
    const [loading, setLoading] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackType, setSnackType] = useState("success");
    const [isLoadingQuestionData, setIsLoadingQuestionData] = useState(false);

    // Fetch question data when modal opens
    const fetchQuestionData = async (questionId) => {
        setIsLoadingQuestionData(true);
        try {
            console.log("EditQuestionModal - Fetching question data for ID:", questionId);
            const response = await axiosInstance.get(`/sec/createUpdatedoctorlisting/questionById/${questionId}`);
            
            console.log("EditQuestionModal - API Response:", response.data);
            const list = response.data?.response?.DocListingQuestion;
            const question = Array.isArray(list) && list.length ? list[0] : null;
            if (question) {
                
                console.log("EditQuestionModal - Question data received:", question);
                
                const newFormData = {
                    question: question?.question || "",
                    ans_1: question?.ans_1 || "",
                    ans_2: question?.ans_2 || "",
                    ans_3: question?.ans_3 || "",
                    ans_4: question?.ans_4 || ""
                };
                
                console.log("EditQuestionModal - Setting form data to:", newFormData);
                setFormData(newFormData);
            } else {
                console.error("EditQuestionModal - No question data found in response");
                setSnackMessage("Failed to load question data");
                setSnackType("error");
                setSnackOpen(true);
            }
        } catch (error) {
            console.error("EditQuestionModal - Error fetching question data:", error);
            setSnackMessage("Failed to load question data");
            setSnackType("error");
            setSnackOpen(true);
        } finally {
            setIsLoadingQuestionData(false);
        }
    };

    useEffect(() => {
        console.log("EditQuestionModal - useEffect triggered, isOpen:", isOpen, "questionData:", questionData);
        
        if (questionData && isOpen) {
            // Extract question ID from questionData
            const questionId = questionData?.doctor_questions_id || questionData?.question_id;
            console.log("EditQuestionModal - Question ID extracted:", questionId);
            
            if (questionId) {
                fetchQuestionData(questionId);
            } else {
                console.error("EditQuestionModal - No question ID found in questionData");
                setSnackMessage("No question ID found");
                setSnackType("error");
                setSnackOpen(true);
            }
        }
    }, [questionData, isOpen]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.question || !formData.ans_1 || !formData.ans_2) {
            setSnackMessage("Please fill in the question and at least 2 answers");
            setSnackType("error");
            setSnackOpen(true);
            return;
        }

        setLoading(true);
        try {
            const payload = {
                doctor_questions_id: Number(questionData?.doctor_questions_id || questionData?.question_id),
                doctor_id: Number(questionData?.doctor_id),
                doctor_list_id: Number(questionData?.doctor_list_id),
                question: formData.question,
                ans_1: formData.ans_1,
                ans_2: formData.ans_2,
                ans_3: formData.ans_3,
                ans_4: formData.ans_4
            };

            console.log("Updating question with payload:", payload);

            const response = await axiosInstance.post(
                "/sec/createUpdatedoctorlisting/questionUpdate",
                payload
            );

            setSnackMessage(response?.data?.response?.message || "Question updated successfully");
            setSnackType("success");
            setSnackOpen(true);
            
            // Call the callback to refresh the questions list
            if (onQuestionUpdated) {
                onQuestionUpdated();
            }
            
            // Close the modal after a short delay
            setTimeout(() => {
                onClose();
            }, 1500);

        } catch (error) {
            console.error("Error updating question:", error);
            setSnackMessage(error?.response?.data?.error || "Failed to update question");
            setSnackType("error");
            setSnackOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    console.log("EditQuestionModal - Rendering modal, isOpen:", isOpen);
    console.log("EditQuestionModal - Current formData:", formData);
    
    return (
        <>
            <CustomSnackBar isOpen={snackOpen} message={snackMessage} type={snackType} />
            
            <CustomModal
                isOpen={isOpen}
                onClose={handleClose}
                disableBackdropClick={loading}
                style={{ zIndex: 9999 }}
                title={
                    <Typography variant="h6" fontFamily="poppins" fontWeight="500">
                        Edit Question
                    </Typography>
                }
                footer={
                    <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                        <CustomButton
                            label="Cancel"
                            isTransaprent={true}
                            handleClick={handleClose}
                            disabled={loading || isLoadingQuestionData}
                            buttonCss={{
                                border: "1px solid #E72B4A",
                                color: "#E72B4A",
                                fontFamily: "poppins",
                                fontSize: "16px",
                                fontWeight: "500"
                            }}
                        />
                        <CustomButton
                            label={loading ? "Updating..." : "Update Question"}
                            handleClick={handleSubmit}
                            disabled={loading || isLoadingQuestionData}
                            buttonCss={{
                                backgroundColor: "#E72B4A",
                                color: "white",
                                fontFamily: "poppins",
                                fontSize: "16px",
                                fontWeight: "500",
                                "&:hover": {
                                    backgroundColor: "#d61e3f"
                                }
                            }}
                        />
                    </div>
                }
            >
                <div style={{ padding: "20px", minWidth: "500px" }}>
                    {isLoadingQuestionData ? (
                        <div style={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            height: "200px",
                            flexDirection: "column",
                            gap: "16px"
                        }}>
                            <CircularProgress size={40} />
                            <Typography variant="body1" fontFamily="poppins">
                                Loading question data...
                            </Typography>
                        </div>
                    ) : (
                        <div>
                            <div style={{ marginBottom: "20px" }}>
                                <CustomTextField
                                    label="Question"
                                    CustomValue={formData.question || ""}
                                    onChange={(e) => handleInputChange('question', e.target.value)}
                                    textcss={{
                                        width: "100%",
                                        fontFamily: "poppins",
                                        fontSize: "16px"
                                    }}
                                    multiline
                                    rows={3}
                                    required
                                />
                            </div>

                            {[1, 2, 3, 4].map((ansNum) => (
                                <div key={ansNum} style={{ marginBottom: "16px" }}>
                                    <CustomTextField
                                        label={`Answer ${ansNum}`}
                                        CustomValue={formData[`ans_${ansNum}`] || ""}
                                        onChange={(e) => handleInputChange(`ans_${ansNum}`, e.target.value)}
                                        textcss={{
                                            width: "100%",
                                            fontFamily: "poppins",
                                            fontSize: "16px"
                                        }}
                                        required={ansNum <= 2}
                                    />
                                </div>
                            ))}

                            {loading && (
                                <div style={{ 
                                    display: "flex", 
                                    justifyContent: "center", 
                                    alignItems: "center", 
                                    marginTop: "20px" 
                                }}>
                                    <CircularProgress size={24} />
                                    <Typography style={{ marginLeft: "12px", fontFamily: "poppins" }}>
                                        Updating question...
                                    </Typography>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </CustomModal>
        </>
    );
};

export default EditQuestionModal;
