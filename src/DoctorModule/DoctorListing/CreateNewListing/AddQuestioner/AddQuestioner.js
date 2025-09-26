import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomButton from "../../../../components/CustomButton";
import "./addquestioner.scss";
import CustomTextField from "../../../../components/CustomTextField/custom-text-field";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";
import EditQuestionModal from "./EditQuestionModal";
import { useListingMode } from "../../shared/useListingMode";
import SectionCard from "../../shared/SectionCard";
import StepHeader from "../../shared/StepHeader";

const AddQuestioner = () => {
    const { mode, listingId, doctorId, setUnifiedListingId } = useListingMode();

    useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "addquestioner");
        
        // Ensure unified listing id in edit mode
        setUnifiedListingId();
        
        // Step guard: require listing_id to proceed
        if (!listingId) {
            console.warn("No listing_id found. Redirecting to listing details.");
            navigate("/doctordashboard/doctorListing/listingdetails", { replace: true });
            return;
        }

        // Fetch existing questions
        fetchExistingQuestions();
    }, []);
    const [typemessage , setTypemessage] = useState("success");
    const [isopen , setIsopen] = useState(false);
    const [message , setMessage] = useState("");
    const [existingQuestions, setExistingQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [data, setData] = useState({
        questions: []
    });

    console.log("Questions Data : ", data);

    // Fetch existing questions
    const fetchExistingQuestions = async () => {
        setLoading(true);
        try {
            // Use backend route that returns questions by listing and doctor
            const response = await axiosInstance.get(`/sec/getdoctorlisting/questionAll/${listingId}/${doctorId}`);
            console.log("Existing questions response:", response.data);
            
            if (Array.isArray(response.data?.response)) {
                setExistingQuestions(response.data.response);
            } else {
                setExistingQuestions([]);
            }
        } catch (error) {
            console.error("Error fetching existing questions:", error);
            setExistingQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        console.log("Entered the fetch data");
        setIsopen(false);
        try {
            let response = await axiosInstance.post(
                "/sec/createUpdatedoctorlisting/questionCreate",
                JSON.stringify({
                    questions: data.questions.map(q => ({
                        ...q,
                        doctor_id: doctorId,
                        doctor_list_id: listingId,
                    }))
                }),
            );
            console.log("Added question response : " , response?.data?.response?.message);
            setMessage(response?.data?.response?.message);
            setTypemessage("success");
            setIsopen(true);
            setTimeout( () => {
            navigate("/doctordashboard/doctorListing/termandcondition", { replace: true });
            } ,2000 )
        } catch (error) {
            alert("Fill the details properly", error);
            setMessage("Not able to add the question")
            setTypemessage("error")
            console.log(error);
            setIsopen(true);
        }
    };

    const navigate = useNavigate();

    const handleAddQuestion = () => {
        setData((prevData) => ({
            questions: [
                ...prevData.questions,
                {
                    doctor_id: doctorId,
                    doctor_list_id: listingId,
                    question: "",
                    ans_1: "",
                    ans_2: "",
                    ans_3: "",
                    ans_4: "",
                },
            ],
        }));
    };

    const handleDeleteQuestion = (questionIndex) => {
        setData((prevData) => {
            const updatedQuestions = [...prevData.questions];
            updatedQuestions.splice(questionIndex, 1);
            return { questions: updatedQuestions };
        });
    };

    const handleInputChange = (event, questionIndex, field) => {
        const { value } = event.target;

        setData((prevData) => {
            const updatedQuestions = [...prevData.questions];
            updatedQuestions[questionIndex] = {
                ...updatedQuestions[questionIndex],
                [field]: value,
            };
            return { questions: updatedQuestions };
        });
    };

    const handleAnswerInputChange = (event, index, ansNum) => {
        const { value } = event.target;

        setData((prevData) => {
            const updatedQuestions = [...prevData.questions];
            updatedQuestions[index] = {
                ...updatedQuestions[index],
                [`ans_${ansNum}`]: value,
            };
            return { questions: updatedQuestions };
        });
    };

    // Edit question handlers
    const handleEditQuestion = (question) => {
        console.log("Editing question:", question);
        setSelectedQuestion(question);
        setEditModalOpen(true);
    };

    const handleQuestionUpdated = () => {
        // Refresh the questions list after editing
        fetchExistingQuestions();
        setEditModalOpen(false);
        setSelectedQuestion(null);
    };

    const handleDeleteExistingQuestion = async (questionId) => {
        try {
            const response = await axiosInstance.post("/sec/createUpdatedoctorlisting/questionDelete", {
                doctor_id: Number(localStorage.getItem("doctor_suid")),
                doctor_list_id: Number(localStorage.getItem("listing_id")),
                doctor_questions_id: Number(questionId),
            });
            console.log("Question deleted:", response.data);
            setMessage("Question deleted successfully");
            setTypemessage("success");
            setIsopen(true);
            // Refresh the questions list
            fetchExistingQuestions();
        } catch (error) {
            console.error("Error deleting question:", error);
            setMessage("Failed to delete question");
            setTypemessage("error");
            setIsopen(true);
        }
    };

    return (
        <>
            <CustomSnackBar isOpen={isopen} message={message} type={typemessage} />
            
            {/* Edit Question Modal */}
            <EditQuestionModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                questionData={selectedQuestion}
                onQuestionUpdated={handleQuestionUpdated}
            />
            <div className="main-container" style={{ width: '100%', maxWidth: 960, margin: '0 auto' }}>
                <StepHeader />
                <SectionCard
                  title="Existing Questions"
                  subtitle="Review and manage the preset questions shown to patients"
                  actions={
                    <CustomButton
                        label="Add"
                        isTransaprent={true}
                        isElevated
                        handleClick={handleAddQuestion}
                        buttonCss={{
                            border: "1px solid #E72B4A",
                            color: "#E72B4A",
                            fontFamily: "poppins",
                            fontSize: "14px",
                            padding: "6px 16px",
                            borderRadius: '24px'
                        }}
                    />
                  }
                >
                  {loading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <Box key={index} sx={{ marginBottom: 2 }}>
                                <Skeleton variant="rectangular" width="100%" height={120} />
                            </Box>
                        ))
                    ) : existingQuestions.length === 0 ? (
                        <Box sx={{ 
                            textAlign: "center", 
                            padding: "32px", 
                            color: "#666",
                            fontFamily: "poppins"
                        }}>
                            No existing questions found
                        </Box>
                    ) : (
                        existingQuestions.map((question, index) => (
                            <Box key={question.doctor_questions_id || index} className="question-card" sx={{ mb: 2 }}>
                                <div className="question-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="subtitle1" sx={{ fontFamily: "poppins", fontWeight: 500 }}>
                                        Question {index + 1}
                                    </Typography>
                                    <div className="question-actions">
                                        <CustomButton
                                            label="Edit"
                                            isTransaprent={true}
                                            handleClick={() => handleEditQuestion(question)}
                                            buttonCss={{
                                                border: "1px solid #E72B4A",
                                                color: "#E72B4A",
                                                fontFamily: "poppins",
                                                fontSize: "14px",
                                                padding: "4px 12px",
                                                marginRight: "8px"
                                            }}
                                        />
                                        <CustomButton
                                            label="Delete"
                                            isTransaprent={true}
                                            handleClick={() => handleDeleteExistingQuestion(question.doctor_questions_id)}
                                            buttonCss={{
                                                border: "1px solid #d32f2f",
                                                color: "#d32f2f",
                                                fontFamily: "poppins",
                                                fontSize: "14px",
                                                padding: "4px 12px"
                                            }}
                                        />
                                    </div>
                                </div>
                                <Typography variant="body1" sx={{ fontFamily: "poppins", marginBottom: "12px" }}>
                                    {question.question}
                                </Typography>
                                <div className="answers-grid">
                                    {[1, 2, 3, 4].map((ansNum) => (
                                        <Typography key={ansNum} variant="body2" sx={{ 
                                            fontFamily: "poppins", 
                                            color: "#666",
                                            marginBottom: "4px"
                                        }}>
                                            {ansNum}. {question[`ans_${ansNum}`] || "No answer"}
                                        </Typography>
                                    ))}
                                </div>
                            </Box>
                        ))
                    )}
                </SectionCard>

                <SectionCard title="Add / Edit Question" subtitle="Provide a question and up to 4 answer options">
                    <div className="text-fields">
                        {/* Mapping number of question s */}
                        {data.questions.map((question, index) => (
                            <div key={index} className="border-box">
                                <div className="text-fields">
                                    <CustomTextField
                                        label={`Question ${index + 1}`}
                                        helperText={""}
                                        textcss={{ width: "591px" }}
                                        // value={question.question}
                                        defaultValue={question.question}
                                        onInput={(event) => {
                                            handleInputChange(event, index, "question");
                                            const Copy = {
                                                ...data,
                                                question: event.target.value,
                                            };
                                            console.log(
                                                "this is the event  : ",
                                                event.target.value,
                                            );
                                            setData(Copy);
                                        }}
                                    ></CustomTextField>

                                    {[1, 2, 3, 4].map((ansNum) => (
                                        <CustomTextField
                                            key={ansNum}
                                            label={`Answer${ansNum}`}
                                            helperText={""}
                                            textcss={{ width: "591px" }}
                                            value={question[`ans_${ansNum}`]}
                                            defaultValue={question[`ans_${ansNum}`]}
                                            onInput={(event) =>
                                                handleAnswerInputChange(event, index, ansNum)
                                            }
                                        ></CustomTextField>
                                    ))}
                                </div>
                                <div
                                    className="Delete-Icon"
                                    style={{
                                        // border: "1px solid",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <DeleteIcon onClick={() => handleDeleteQuestion(index)} />
                                    </Box>

                                    <CustomButton
                                        label="Delete"
                                        isTransaprent={"True"}
                                        buttonCss={{
                                            width: "122px",
                                            height: "48px",
                                            borderTop: "1px",
                                            borderRight: "1px",
                                            borderBottom: "1px",
                                            borderLeft: "1px",
                                        }}
                                        handleClick={() => handleDeleteQuestion(index)}
                                    ></CustomButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                <Box sx={{ marginTop: "1%" }}>
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Save As Draft"
                        isTransaprent={true}
                        handleClick={() => fetchData()}
                    />
                    <CustomButton
                        buttonCss={{ width: "10.625rem", borderRadius: "6.25rem", margin: "0.5%" }}
                        label="Next"
                        handleClick={() => fetchData()}
                    />
                </Box>
            </div>
        </>
    );
};

export default AddQuestioner;
