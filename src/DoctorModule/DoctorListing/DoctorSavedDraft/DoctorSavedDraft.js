import React, { useState } from "react";
import DoctorListingNavbar from "../../CustomDoctorComponent/DoctorListingNavbar/DoctorListingBavbar";
import { Box, Typography } from "@mui/material";
import "./doctorSavedDraft.scss";
import CustomButton from "../../../components/CustomButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CustomDrActiveListingCard from "../../CustomDoctorComponent/Cards/CustomDrActiveListingCard/CustomDrActiveListingCard";

const DoctorSavedDraft = () => {
    const navigate = useNavigate();
    const [listingPlans, setListingPlans] = useState([]);

    useEffect(() => {
        document.getElementById("location-search-container").style.display = "none";
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // const response = await axiosInstance.get("/sec/getDoctordetailscompleteall");
            const response = await axios.get(`${baseURL}/sec/doctor/DocListingPlan/14`);
            console.log("Listing plan : ", response?.data?.response);
            setListingPlans(response?.data?.response);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "95%",
                    height: "100%",
                    height: "90%",
                    // border: "1px solid",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <DoctorListingNavbar />
                    </Box>
                    <div className="">
                        <CustomButton
                            label="Create New"
                            isTransaprent={"True"}
                            buttonCss={{
                                width: "170px",
                                borderRadius: "20px",
                            }}
                        ></CustomButton>
                        <MoreHorizIcon
                            style={{
                                color: "grey",
                            }}
                        />
                    </div>
                </Box>
                <Box
                    component={"div"}
                    sx={{
                        position: "relative",
                        top: "4em",
                        width: "100%",
                        display: "flex",
                        height: "100%",
                    }}
                >
                    <Box
                        component={"div"}
                        sx={{ display: "flex", flexDirection: "column", width: "100%" }}
                    >
                        {cards.map((card) => (
                            <CustomDrActiveListingCard
                                key={card.id}
                                label={card.label}
                                Idtype={card.Idtype}
                                Idnumber={card.Idnumber}
                                onDelete={() => handleDelete(card.id)}
                            />
                        ))}
                        {/* <CustomDrActiveListingCard label={"asdgfhksdj Listing"} Idtype={"Listing ID"} Idnumber={"0000123456"} /> */}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DoctorSavedDraft;
