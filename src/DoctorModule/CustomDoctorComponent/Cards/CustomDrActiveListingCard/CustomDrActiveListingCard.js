import { Box, Typography, IconButton, Menu } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CustomButton from "../../../../components/CustomButton";
import "./CustomDrActiveListing.scss";

/**
 * CustomDrActiveListingCard Component
 * 
 * Displays a listing card with horizontal layout:
 * - Title and Listing ID on the left
 * - Ellipsis menu, Delete, and Edit buttons on the right
 * 
 * @component
 */
const CustomDrActiveListingCard = ({ 
    label, 
    Idtype, 
    Idnumber, 
    onhandleClickButtonOne, 
    buttonOneLabel, 
    buttonTwoLabel, 
    onhandleClickButtonTwo,
    onEditClick,
    showEditButton = true,
    statusLabel,
    statusColor = "default"
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            className="custom-dr-active-listing-card"
            sx={{
                border: "1px solid #E6E1E5",
                borderRadius: "0.5rem",
                backgroundColor: "#ffffff",
                padding: "1.5rem",
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                transition: "all 0.2s ease",
                "&:hover": {
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fafafa",
                },
                "&:last-child": {
                    marginBottom: 0,
                },
            }}
        >
            {/* Left Section: Title and Listing ID */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    flex: 1,
                    minWidth: 0,
                }}
            >
                {/* Title */}
                <Typography
                    sx={{
                        color: "#313033",
                        fontFamily: "Poppins",
                        fontSize: "1.125rem",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "1.5rem",
                        marginBottom: "0.5rem",
                        wordBreak: "break-word",
                    }}
                >
                    {label || "Unnamed Listing"}
                </Typography>
                
                {/* Listing ID */}
                <Typography
                    sx={{
                        color: "#787579",
                        fontFamily: "Poppins",
                        fontSize: "0.875rem",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "1.25rem",
                        letterSpacing: "0.006rem",
                    }}
                >
                    {Idtype} : {Idnumber}
                </Typography>
            </Box>

            {/* Right Section: Ellipsis Menu, Delete, and Edit Buttons */}
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "0.75rem",
                    flexShrink: 0,
                }}
            >
                {/* Ellipsis Menu */}
                <IconButton
                    onClick={handleMenuClick}
                    sx={{
                        padding: "0.5rem",
                        color: "#787579",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                            color: "#313033",
                        },
                    }}
                >
                    <MoreHorizIcon />
                </IconButton>

                {/* Delete Button */}
                <CustomButton
                    label={buttonOneLabel}
                    isTransaprent={true}
                    buttonCss={{
                        width: "100px",
                        height: "2.5rem",
                        borderRadius: "20px",
                        fontSize: "0.875rem",
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        border: "1px solid #E72B4A",
                        color: "#313033",
                        backgroundColor: "transparent",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            backgroundColor: "#E72B4A",
                            color: "#ffffff",
                        },
                    }}
                    handleClick={onhandleClickButtonOne}
                />

                {/* Edit Button - Show if showEditButton is true */}
                {showEditButton && (
                    <CustomButton
                        label="Edit"
                        isTransaprent={false}
                        buttonCss={{
                            width: "100px",
                            height: "2.5rem",
                            borderRadius: "20px",
                            fontSize: "0.875rem",
                            fontFamily: "Poppins",
                            fontWeight: "500",
                            backgroundColor: "#E72B4A",
                            color: "#ffffff",
                            border: "none",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                backgroundColor: "#c41d37",
                            },
                        }}
                        handleClick={onEditClick}
                    />
                )}

                {/* Second Action Button (Deactivate/Activate) - Show if buttonTwoLabel is provided and not Edit */}
                {buttonTwoLabel && buttonTwoLabel !== "Edit" && (
                    <CustomButton
                        label={buttonTwoLabel}
                        isTransaprent={false}
                        buttonCss={{
                            width: "100px",
                            height: "2.5rem",
                            borderRadius: "20px",
                            fontSize: "0.875rem",
                            fontFamily: "Poppins",
                            fontWeight: "500",
                            backgroundColor: "#E72B4A",
                            color: "#ffffff",
                            border: "none",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                backgroundColor: "#c41d37",
                            },
                        }}
                        handleClick={onhandleClickButtonTwo}
                    />
                )}
            </Box>

            {/* Menu */}
            {open && (
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    {/* Add menu items here if needed */}
                </Menu>
            )}
        </Box>
    );
};

export default CustomDrActiveListingCard;
