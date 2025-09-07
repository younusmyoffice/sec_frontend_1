import React, { useState } from "react";
import CustomDropdown from "../../../../components/CustomDropdown"
import { Typography } from "@mui/material";

const DoctorAppointmentCard = () => {
    const dropdownItems = ["Today", "Tomorrow", "Yesterday"];
    const [activeDropdown, setActiveDropdown] = useState("");
    const cardItem=[{id:"02",info:"Reports Showed"},{id:"06",info:"Patient Added"}]
    return(
        <>
           <div className='DoctorDashboardCard'>
                    <div>
                        {/* <CustomDropdown
                                dropdowncss={{
                                    alignItem : "center",
                                    Width : "20%",
                                    marginRight : "8%",
                                }}
                                CustomSx={{width : "8em" ,   padding : "1% 8%"}}
                                label={"Select"}
                                items={dropdownItems}
                                activeItem={activeDropdown}
                                handleChange={(item) => setActiveDropdown(item)}
                            /> */}
                    </div>
                    <div className="Number-Container" >
                        <Typography sx={{
                            color: "#E72B4A",
                            fontFamily: "Poppins",
                            fontSize: "3rem",
                            fontStyle: "normal",
                            fontWeight: "600",
                            lineHeight: "4.625rem",
                        }} >02</Typography>
                    </div>
                    <div className="Number-Container">
                        <Typography sx={{
                            color: "#313033",
                            fontFamily: "Poppins",
                            fontSize: "1rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "1.5rem",
                        }} >Report Shared</Typography>
                    </div>
            </div>
        </>
    )
}

export default DoctorAppointmentCard;