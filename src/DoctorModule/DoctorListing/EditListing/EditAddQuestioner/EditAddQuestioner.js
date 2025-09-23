import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Box, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Skeleton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DrImage from "../../../../static/images/DrImages/drProfileImage.png";
import CustomButton from "../../../../components/CustomButton";
import CustomTextField from "../../../../components/CustomTextField/custom-text-field";
import CustomSnackBar from "../../../../components/CustomSnackBar";
import axiosInstance from "../../../../config/axiosInstance";
import "./addquestioner.scss";

const AddQuestioner = () => {
    // State management
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackType, setSnackType] = useState("success");

    // Form data for editing
    const [formData, setFormData] = useState({
        question: "",
        ans_1: "",
        ans_2: "",
        ans_3: "",
        ans_4: ""
    });

    // Get doctor and listing IDs
    const doctorId = localStorage.getItem("doctor_suid");
    const listingId = localStorage.getItem("listing_id");

    // Fetch all questions on component mount
    useEffect(() => {
        fetchAllQuestions();
    }, []);

    const fetchAllQuestions = async () => {
        try {
            setLoading(true);
            console.log("Fetching questions for doctor_id:", doctorId, "listing_id:", listingId);
            
            const response = await axiosInstance.post("/sec/createUpdatedoctorlisting/questionAll", {
                doctor_id: parseInt(doctorId),
                doctor_list_id: parseInt(listingId)
            });

            console.log("Full API response:", response);
            console.log("Response data:", response?.data);
            console.log("Response structure:", response?.data?.response);
            console.log("AllQuestion array:", response?.data?.response?.allQuestion);
            
            if (response?.data?.response?.allQuestion && response?.data?.response?.allQuestion.length > 0) {
                setQuestions(response.data.response.allQuestion);
                console.log("Questions loaded successfully:", response.data.response.allQuestion);
            } else {
                setQuestions([]);
                console.log("No questions found in response");
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
            console.error("Error details:", error.response?.data);
            setSnackMessage("Failed to fetch questions");
            setSnackType("error");
            setSnackOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleEditQuestion = async (questionId) => {
        try {
            const response = await axiosInstance.get(`/sec/createUpdatedoctorlisting/questionById/${questionId}`);
            
            console.log("Question by ID response:", response?.data);
            
            if (response?.data?.response?.DocListingQuestion && response?.data?.response?.DocListingQuestion.length > 0) {
                const questionData = response.data.response.DocListingQuestion[0];
                console.log("Question data received for editing:", questionData);
                
                setEditingQuestion(questionData);
                
                const newFormData = {
                    question: questionData.question || "",
                    ans_1: questionData.ans_1 || "",
                    ans_2: questionData.ans_2 || "",
                    ans_3: questionData.ans_3 || "",
                    ans_4: questionData.ans_4 || ""
                };
                
                console.log("Setting form data:", newFormData);
                setFormData(newFormData);
                setEditModalOpen(true);
            }
        } catch (error) {
            console.error("Error fetching question details:", error);
            setSnackMessage("Failed to fetch question details");
            setSnackType("error");
            setSnackOpen(true);
        }
    };

    const handleUpdateQuestion = async () => {
        try {
            console.log("Current formData before update:", formData);
            console.log("Editing question:", editingQuestion);
            
            // Validate form data
            if (!formData.question.trim()) {
                setSnackMessage("Question text is required");
                setSnackType("error");
                setSnackOpen(true);
                return;
            }

            const payload = {
                doctor_id: parseInt(doctorId),
                doctor_list_id: parseInt(listingId),
                doctor_questions_id: editingQuestion.doctor_questions_id,
                question: formData.question.trim(),
                ans_1: formData.ans_1.trim(),
                ans_2: formData.ans_2.trim(),
                ans_3: formData.ans_3.trim(),
                ans_4: formData.ans_4.trim()
            };

            console.log("Updating question with payload:", payload);

            const response = await axiosInstance.post("/sec/createUpdatedoctorlisting/questionUpdate", payload);
            
            console.log("Update question response:", response?.data);
            
            setSnackMessage("Question updated successfully");
            setSnackType("success");
            setSnackOpen(true);
            setEditModalOpen(false);
            fetchAllQuestions(); // Refresh the list
        } catch (error) {
            console.error("Error updating question:", error);
            setSnackMessage("Failed to update question");
            setSnackType("error");
            setSnackOpen(true);
        }
    };

    const handleInputChange = (field, value) => {
        console.log(`Updating field ${field} with value:`, value);
        setFormData(prev => {
            const newData = {
                ...prev,
                [field]: value
            };
            console.log("Updated form data:", newData);
            return newData;
        });
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
        setEditingQuestion(null);
        setFormData({
            question: "",
            ans_1: "",
            ans_2: "",
            ans_3: "",
            ans_4: ""
        });
    };

    const renderQuestionCard = (question, index) => {
        console.log("Rendering question card:", question, "index:", index);
        return (
            <div key={question.doctor_questions_id || index} className="question-card">
                <div className="question-content">
                    <Typography variant="h6" className="question-text">
                        {question.question || "No question text"}
                    </Typography>
                    <div className="answers-container">
                        {question.ans_1 && (
                            <Typography variant="body2" className="answer-option">
                                A. {question.ans_1}
                            </Typography>
                        )}
                        {question.ans_2 && (
                            <Typography variant="body2" className="answer-option">
                                B. {question.ans_2}
                            </Typography>
                        )}
                        {question.ans_3 && (
                            <Typography variant="body2" className="answer-option">
                                C. {question.ans_3}
                            </Typography>
                        )}
                        {question.ans_4 && (
                            <Typography variant="body2" className="answer-option">
                                D. {question.ans_4}
                            </Typography>
                        )}
                    </div>
                </div>
                <div className="question-actions">
                    <IconButton 
                        onClick={() => handleEditQuestion(question.doctor_questions_id)}
                        className="edit-button"
                        aria-label="edit question"
                    >
                        <EditIcon />
                    </IconButton>
                </div>
            </div>
        );
    };

    const renderLoadingSkeletons = () => (
        <div className="loading-container">
            {[1, 2, 3].map((index) => (
                <div key={index} className="question-card">
                    <Skeleton variant="text" width="80%" height={40} />
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="70%" height={20} />
                </div>
            ))}
        </div>
    );

    return (
        <>
            <CustomSnackBar 
                type={snackType}
                isOpen={snackOpen}
                message={snackMessage}
                onClose={() => setSnackOpen(false)}
            />

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
                {/* Doctor Profile Section */}
                <div className="Doctor-detail-container">
                    <div className="doc-profile">
                        <div className="image-container">
                            <Box
                                sx={{ borderRadius: "8px", width: "100%", height: "100%" }}
                                component={"img"}
                                src={DrImage}
                            />
                        </div>
                        <div className="Detail-container">
                            <Typography className="doctor-name">
                                Dr.Maria Garcia
                            </Typography>
                            <Typography className="doctor-specialty">
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
                        />
                    </div>
                </div>

                {/* Questions Section */}
                <div className="questions-section">
                    <div className="section-header">
                        <Typography variant="h5" className="section-title">
                            Questionnaire
                        </Typography>
                            <CustomButton
                            label="Add New Question"
                            isTransaprent={"false"}
                            handleClick={() => {/* Navigate to add question page */}}
                                buttonCss={{
                                    display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                backgroundColor: "#E72B4A",
                                color: "white",
                                padding: "8px 16px",
                                borderRadius: "4px",
                            }}
                        />
                    </div>

                    {/* Questions List */}
                    <div className="questions-list">
                        {loading ? (
                            renderLoadingSkeletons()
                        ) : questions.length > 0 ? (
                            <>
                                {console.log("Rendering questions list, count:", questions.length)}
                                {questions.map((question, index) => renderQuestionCard(question, index))}
                            </>
                        ) : (
                            <div className="empty-state">
                                <Typography variant="h6" className="empty-title">
                                    No Questions Found
                                </Typography>
                                <Typography variant="body2" className="empty-description">
                                    Add your first question to get started.
                                </Typography>
                        </div>
                        )}
                    </div>
                </div>
                    </div>

            {/* Edit Question Modal */}
            <Dialog 
                open={editModalOpen} 
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
                className="edit-question-modal"
            >
                <DialogTitle>
                    <div className="modal-header">
                        <Typography variant="h6">Edit Question</Typography>
                        <IconButton onClick={handleCloseModal} size="small">
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="edit-form">
                        <CustomTextField
                            label="Question"
                            value={formData.question}
                            onChange={(e) => {
                                console.log("Question input changed:", e.target.value);
                                handleInputChange("question", e.target.value);
                            }}
                            textcss={{ width: "100%", marginBottom: "16px" }}
                        />
                        
                        <div className="answers-section">
                            <Typography variant="subtitle1" className="answers-title">
                                Answer Options
                            </Typography>
                            
                            <CustomTextField
                                label="Option A"
                                value={formData.ans_1}
                                onChange={(e) => {
                                    console.log("Option A input changed:", e.target.value);
                                    handleInputChange("ans_1", e.target.value);
                                }}
                                textcss={{ width: "100%", marginBottom: "12px" }}
                            />
                            
                            <CustomTextField
                                label="Option B"
                                value={formData.ans_2}
                                onChange={(e) => {
                                    console.log("Option B input changed:", e.target.value);
                                    handleInputChange("ans_2", e.target.value);
                                }}
                                textcss={{ width: "100%", marginBottom: "12px" }}
                            />
                            
                            <CustomTextField
                                label="Option C"
                                value={formData.ans_3}
                                onChange={(e) => {
                                    console.log("Option C input changed:", e.target.value);
                                    handleInputChange("ans_3", e.target.value);
                                }}
                                textcss={{ width: "100%", marginBottom: "12px" }}
                            />
                            
                            <CustomTextField
                                label="Option D"
                                value={formData.ans_4}
                                onChange={(e) => {
                                    console.log("Option D input changed:", e.target.value);
                                    handleInputChange("ans_4", e.target.value);
                                }}
                                textcss={{ width: "100%", marginBottom: "12px" }}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <CustomButton
                        label="Cancel"
                        isTransaprent={"true"}
                        handleClick={handleCloseModal}
                        buttonCss={{ marginRight: "8px" }}
                    />
                            <CustomButton
                        label="Update Question"
                        isTransaprent={"false"}
                        handleClick={handleUpdateQuestion}
                        buttonCss={{ backgroundColor: "#E72B4A", color: "white" }}
                    />
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddQuestioner;
