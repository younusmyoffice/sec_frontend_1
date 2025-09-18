import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CardMembershipIcon from "@mui/icons-material/CardMembership";


const License = ({
    head,
    subhead,
    dates,
    description,
    certific_num,
    doctorLicensesId,
    handleEditLic
}) => {
   

    return (
        <div>
               
            <div className="medical-card-container">
                <div className="medical-card">
                    <Box
                        sx={{
                            width: "150px",
                            height: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor: "#F0F0F0",
                        }}
                    >
                        <CardMembershipIcon
                            style={{
                                fontSize: "30px",
                                width: "100px",
                                height: "100px",
                                color: "#E72B4A",
                            }}
                        />
                    </Box>
                    <div className="medical-details">
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    marginTop: "25px",
                                    marginLeft: "25px",
                                }}
                            >
                                {head ? head.toUpperCase() : ""}

                                </Typography>
                            <div className="edit-icon">
                                <EditIcon
                                    onClick={handleEditLic}
                                    style={{ cursor: "pointer", color: "#E72B4A" }}
                                />
                                <Typography
                                    onClick={handleEditLic}
                                    style={{
                                        color: "#E72B4A",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                        marginLeft: "5px",
                                    }}
                                >
                                    Edit
                                </Typography>
                            </div>
                        </Box>
                        <Typography className="Hospital-name" style={{ marginLeft: "25px" }}>
                            {subhead}
                        </Typography>
                        <Typography className="date" style={{ marginLeft: "25px" }}>
                            Certificate No:{certific_num}
                        </Typography>
                        <Typography className="date" style={{ marginLeft: "25px" }}>
                            {dates}
                        </Typography>
                        <Typography className="date" style={{ marginLeft: "25px" }}>
                            Description
                        </Typography>
                        <Typography
                            style={{
                                marginLeft: "6px",
                                display: "flex",
                                flex: "start"
                            }}
                        >
                            {description}
                        </Typography>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default License;
