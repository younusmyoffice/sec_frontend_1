import { Box, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import sentLogo from "../../../static/images/DrImages/SendLogo.png";
import receiveLogo from "../../../static/images/DrImages/RecieveLogo.png";
import DangerousIcon from '@mui/icons-material/Dangerous';

/**
 * SendCard Component
 * 
 * Displays successful payment transaction card
 * Shows payment success icon and transaction ID
 * 
 * @param {Object} props - Component props
 * @param {string} props.Payment - Payment status text
 * @param {string|number} props.TRXID - Transaction ID
 * 
 * @component
 */
export const SendCard = ({ Payment, TRXID }) => {
    return (
        <Box sx={{ display: "flex" }}>
            {/* Success icon */}
            <Box
                component={"div"}
                sx={{ height: "3.44331rem", width: "3.44331rem", borderRadius: "0.5rem" }}
            >
                <img
                    src={sentLogo}
                    alt="Payment successful"
                    style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                />
            </Box>
            
            {/* Payment details */}
            <Box
                sx={{
                    marginLeft: "2%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                {/* Payment status */}
                <Typography
                    sx={{
                        color: "#313033", // Common color: #313033
                        fontFamily: "Poppins",
                        fontSize: "0.875rem",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "1.375rem",
                        letterSpacing: "0.00438rem",
                    }}
                >
                    {Payment || "Payment Successful"}
                </Typography>
                
                {/* Transaction ID */}
                <Typography
                    sx={{
                        color: "#939094", // Common color variant
                        fontFamily: "Poppins",
                        fontSize: "0.625rem",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "0.9375rem",
                        letterSpacing: "0.005rem",
                    }}
                >
                    TRX ID : {TRXID || "N/A"}
                </Typography>
            </Box>
        </Box>
    );
};

/**
 * ReceiveCard Component
 * 
 * Displays failed payment transaction card
 * Shows payment failure icon and transaction ID
 * 
 * @param {Object} props - Component props
 * @param {string} props.Payment - Payment status text
 * @param {string|number} props.TRXID - Transaction ID
 * 
 * @component
 */
export const ReceiveCard = ({ Payment, TRXID }) => {
    return (
        <Box sx={{ display: "flex" }}>
            {/* Failure icon */}
            <Box
                component={"div"}
                sx={{ height: "3.44331rem", width: "3.44331rem", borderRadius: "0.5rem" }}
            >
                <img
                    src={receiveLogo}
                    alt="Payment failed"
                    style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                />
            </Box>
            
            {/* Payment details */}
            <Box
                sx={{
                    marginLeft: "2%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                {/* Payment status */}
                <Typography
                    sx={{
                        color: "#313033", // Common color: #313033
                        fontFamily: "Poppins",
                        fontSize: "0.875rem",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "1.375rem",
                        letterSpacing: "0.00438rem",
                    }}
                >
                    {Payment || "Payment Failed"}
                </Typography>
                
                {/* Transaction ID */}
                <Typography
                    sx={{
                        color: "#939094", // Common color variant
                        fontFamily: "Poppins",
                        fontSize: "0.625rem",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "0.9375rem",
                        letterSpacing: "0.005rem",
                    }}
                >
                    TRX ID : {TRXID || "N/A"}
                </Typography>
            </Box>
        </Box>
    );
};

/**
 * FaildCard Component
 * 
 * Displays failed payment transaction card with danger icon
 * Shows payment failure icon and transaction ID
 * 
 * @param {Object} props - Component props
 * @param {string} props.Payment - Payment status text
 * @param {string|number} props.TRXID - Transaction ID
 * 
 * @component
 */
export const FaildCard = ({ Payment, TRXID }) => {
    return (
        <Box sx={{ display: "flex" }}>
            {/* Danger icon */}
            <Box
                component={"div"}
                sx={{ height: "3.44331rem", width: "3.44331rem", borderRadius: "0.5rem" }}
            >
                <DangerousIcon sx={{ color: "#F58A9B", fontSize: "3.5rem" }} />
            </Box>
            
            {/* Payment details */}
            <Box
                sx={{
                    marginLeft: "2%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                {/* Payment status */}
                <Typography
                    sx={{
                        color: "#313033", // Common color: #313033
                        fontFamily: "Poppins",
                        fontSize: "0.875rem",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "1.375rem",
                        letterSpacing: "0.00438rem",
                    }}
                >
                    {Payment || "Payment Failed"}
                </Typography>
                
                {/* Transaction ID */}
                <Typography
                    sx={{
                        color: "#939094", // Common color variant
                        fontFamily: "Poppins",
                        fontSize: "0.625rem",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "0.9375rem",
                        letterSpacing: "0.005rem",
                    }}
                >
                    TRX ID : {TRXID || "N/A"}
                </Typography>
            </Box>
        </Box>
    );
};

// PropTypes for type checking
SendCard.propTypes = {
    Payment: PropTypes.string,
    TRXID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SendCard.defaultProps = {
    Payment: "Payment Successful",
    TRXID: "N/A",
};

ReceiveCard.propTypes = {
    Payment: PropTypes.string,
    TRXID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ReceiveCard.defaultProps = {
    Payment: "Payment Failed",
    TRXID: "N/A",
};

FaildCard.propTypes = {
    Payment: PropTypes.string,
    TRXID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FaildCard.defaultProps = {
    Payment: "Payment Failed",
    TRXID: "N/A",
};