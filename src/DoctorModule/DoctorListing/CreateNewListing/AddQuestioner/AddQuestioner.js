import React, { Fragment, useCallback, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import DrImage from "../../../../constants/DrImages/drProfileImage.png";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "../../../../components/CustomButton";
import CustomRadioButton from "../../../../components/CustomRadioButton/custom-radio-button";
import "./addquestioner.scss";
import CustomTextField from "../../../../components/CustomTextField/custom-text-field";
// import { Settings } from "@mui/icons-material";
// import IconButton from "@mui/material";
import CustomDropdown from "../../../../components/CustomDropdown";

const AddQuestioner = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "addquestioner");
    }, []);
    const [value, setValue] = useState([null, null]);
    const [data, setData] = useState({
        questions: [{ question: "", ans_1: "", ans_2: "", ans_3: "", ans_4: "" }],
    });

    const fetchData = async () => {
        console.log("Entered the fetch data");
        try {
            const response = await axios.post(
                `${baseURL}/sec/createUpdatedoctorlisting/question/9`,
                JSON.stringify(data),
                { Accept: "Application/json" },
            );
            console.log(response);
            navigate("/doctordashboard/doctorListing/termandcondition", { replace: true });
        } catch (error) {
            alert("Fill the details properly", error);
            console.log(error.response);
        }
    };

    useEffect(() => {}, []);
    console.log("Data for Add Questioner:", data);
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        setData((prevData) => ({
            questions: [
                ...prevData.questions,
                { question: "", ans_1: "", ans_2: "", ans_3: "", ans_4: "" },
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
                    <Typography>Add Questioner</Typography>
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
                        {data.questions.map((question, index) => (
                            <div key={index} className="border-box">
                                <div className="text-fields">
                                    <CustomTextField
                                        label={`Question ${index + 1}`}
                                        helperText={""}
                                        textcss={{ width: "591px" }}
                                        value={question.question}
                                        onInput={(event) => {
                                            handleInputChange(event, index, "question");
                                            let Copy = {
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
