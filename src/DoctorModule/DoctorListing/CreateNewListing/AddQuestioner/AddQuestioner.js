import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "../../../../components/CustomButton";
import "./addquestioner.scss";
import CustomTextField from "../../../../components/CustomTextField/custom-text-field";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar/custom-sack-bar";

const AddQuestioner = () => {
    useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "addquestioner");
    }, []);
    const [typemessage , setTypemessage] = useState("success");
    const [isopen , setIsopen] = useState(false);
    const [message , setMessage] = useState("");
    const [data, setData] = useState({
        questions: [
            {
                doctor_id: localStorage.getItem("doctor_suid"),
                doctor_list_id: localStorage.getItem("listing_id"),
                question: "",
                ans_1: "",
                ans_2: "",
                ans_3: "",
                ans_4: "",
            },
        ],
    });

    console.log("Questions Data : ", data);

    const fetchData = async () => {
        console.log("Entered the fetch data");
        setIsopen(false);
        try {
            let response = await axiosInstance.post(
                "/sec/createUpdatedoctorlisting/questionCreate",
                JSON.stringify(data),
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
                    doctor_id: localStorage.getItem("doctor_suid"),
                    doctor_list_id: localStorage.getItem("listing_id"),
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

    return (
        <>
            <CustomSnackBar isOpen={isopen} message={message} type={typemessage} />
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
                <div className="Add-container">
                    <Typography>Add Questioner</Typography>
                    <div className="Add-addicon">
                        <Box
                            sx={{
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
                                handleClick={handleAddQuestion}
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
                        </div>
                    </div>
                </div>
                <div className="question-answer-container">
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
                </div>

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
