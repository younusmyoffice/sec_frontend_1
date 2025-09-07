import React, { useState } from "react";
// import DoctorListingNavbar from "../../CustomDoctorComponent/DoctorListingNavbar/DoctorListingBavbar";
import { Box, Typography } from "@mui/material";
import "./doctorActiveListing.scss";
// import CustomButton from "../../../components/CustomButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import CustomDrActiveListingCard from "../../CustomDoctorComponent/Cards/CustomDrActiveListingCard/CustomDrActiveListingCard";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";
import CustomDrActiveListingCard from "../../CustomDoctorComponent/Cards/CustomDrActiveListingCard/CustomDrActiveListingCard";
import DoctorListingNavbar from "../../CustomDoctorComponent/DoctorListingNavbar/DoctorListingBavbar";

const DoctorActiveListing = () => {
    React.useEffect(() => {
        localStorage.setItem("activeComponent", "listing");
        localStorage.setItem("path", "doctoractiveListing");
    }, []);
    const navigate = useNavigate();
    const [cards, setCards] = useState([
        { id: 1, label: "Card 1", Idtype: "Type 1", Idnumber: "Number 1" },
        { id: 2, label: "Card 2", Idtype: "Type 2", Idnumber: "Number 2" },
        // ... other cards
    ]);

    const handleDelete = (id) => {
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
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
                            handleClick={() => {
                                navigate("/doctordashboard/doctorListing/listingdetails");
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
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "80%",
                        }}
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
                        {/* <CustomDrActiveListingCard label={"Secondary Listing"} Idtype={"Listing ID"} Idnumber={"0000123456"} /> */}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DoctorActiveListing;
