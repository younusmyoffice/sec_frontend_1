import React, { useState } from "react";
import "./DoctorAppointment.scss";
import CustomDropdown from "../../../components/CustomDropdown/custom-dropdown";
import { Typography } from "@mui/material";

const DoctorAppointmentCard = ({NumberOfAppointments=0 , AppointmentType="Parameters" }) => {
    const dropdownItems = ["Today", "Tomorrow", "Yesterday"];
    const [activeDropdown, setActiveDropdown] = useState("");
    return(
        <>
           <div className='DoctorDashboardCard'>
                    <div className="DropDown-field">
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
                        }} >{NumberOfAppointments}</Typography>
                    </div>
                    <div className="Number-Container">
                        <Typography sx={{
                            color: "#313033",
                            fontFamily: "Poppins",
                            fontSize: "1rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "1.5rem",
                        }} >{AppointmentType}</Typography>
                    </div>
            </div>
        </>
    )
}

export default DoctorAppointmentCard;