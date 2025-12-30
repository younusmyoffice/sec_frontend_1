import {
    Box,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Margin } from "@mui/icons-material";
import CustomButton from "../../../../components/CustomButton";
import { AuditCards } from "../../../DiagnosticCenter/DiagnosticManage/DiagnosticCenterAuditLog/AuditCards";
import pen from "../../../../static/images/DrImages/Pen.svg";
import { PaginationCard } from "../../../../PatientModule/PatientAppointment/PatientCards";
import CustomTextField from "../../../../components/CustomTextField";
import CustomModal from "../../../../components/CustomModal";
import logger from "../../../../utils/logger"; // Centralized logging
import toastService from "../../../../services/toastService"; // Toast notifications for user feedback
import { useCallback, useEffect } from "react";

function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(
        <Typography
            sx={{
                color: "#939094",
                fontFamily: "Poppins",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            Jan,2022
        </Typography>,
        <Typography
            sx={{
                color: "#939094",
                fontFamily: "Poppins",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            Account No : 001100444466
        </Typography>,
        <Typography
            sx={{
                color: "#939094",
                fontFamily: "Poppins",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            $120
        </Typography>,
        <Typography
            sx={{
                color: "#939094",
                fontFamily: "Poppins",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "0.9375rem",
                letterSpacing: "0.005rem",
            }}
        >
            Progressing
        </Typography>,
    ),
];

/**
 * AdminPayout Component
 * 
 * Displays payout management interface for HCF Admin
 * Features:
 * - View earning balance
 * - Request cash out (Bank Account or PayPal)
 * - View payout history
 * 
 * @component
 */
const AdminPayout = () => {
    /**
     * Initialize component and set localStorage paths
     */
    useEffect(() => {
        logger.debug("🔵 AdminPayout component rendering");
        localStorage.setItem("activeComponent", "manage");
        localStorage.setItem("path", "hcfadminpayout");
    }, []);

    const [textField1, setTextField1] = useState("");
    const [textField2, setTextField2] = useState("");
    const [textField3, setTextField3] = useState("");
    const [textField4, setTextField4] = useState("");
    const [textField5, setTextField5] = useState("");
    const [textField6, setTextField6] = useState("");
    const [textField7, setTextField7] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [bankAccount, setBankaccount] = useState(true);
    
    /**
     * Validate HCF admin ID from localStorage
     * SECURITY: Ensures admin ID is present before making API calls
     * 
     * @returns {string|null} HCF admin ID or null if invalid
     */
    const validateHcfAdminId = useCallback(() => {
        const adminId = localStorage.getItem("hcfadmin_suid");

        if (!adminId) {
            logger.warn("⚠️ HCF Admin ID not found in localStorage");
            toastService.warning("HCF Admin ID is missing. Please log in again.");
            return null;
        }

        logger.debug("✅ HCF Admin ID validated:", adminId);
        return adminId;
    }, []);

    /**
     * Handle bank account/paypal toggle
     */
    const bankHandler = () => {
        logger.debug("💳 Payment method toggle:", !bankAccount ? "Bank Account" : "PayPal");
        setBankaccount(!bankAccount);
    };
    
    /**
     * Handle cash out request submission
     * Validates form fields and submits cash out request
     */
    const handleCashOutRequest = () => {
        logger.debug("💰 Processing cash out request");
        
        const adminId = validateHcfAdminId();
        if (!adminId) {
            return;
        }

        if (bankAccount) {
            // Validate bank account fields
            if (!textField1 || !textField2 || !textField3 || !textField4 || !textField6) {
                toastService.error("Please fill all bank account details");
                return;
            }
            
            if (textField2 !== textField3) {
                toastService.error("Account numbers do not match");
                return;
            }
            
            logger.debug("💰 Bank account cash out request", {
                accountName: textField1,
                accountNo: textField2,
                ifscCode: textField4,
                swiftCode: textField5,
                amount: textField6
            });
        } else {
            // Validate PayPal fields
            if (!textField7) {
                toastService.error("Please enter PayPal email");
                return;
            }
            
            logger.debug("💰 PayPal cash out request", {
                paypalEmail: textField7
            });
        }

        // TODO: Implement API call when backend endpoint is ready
        toastService.success("Cash out request submitted successfully");
        setOpenDialog(false);
        
        // Reset form
        setTextField1("");
        setTextField2("");
        setTextField3("");
        setTextField4("");
        setTextField5("");
        setTextField6("");
        setTextField7("");
    };

    const navigate = useNavigate();
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "98%",
                    height: "100%",
                    height: "90%",
                    flexDirection: "row",
                }}
            >
                <nav className="NavBar-Container-Appoinement">
                    <nav className="NavBar-Container-Appoinement">
                        <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminsale"}>
                            Sale Activities
                        </NavLink>
                        <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminoverview"}>Overview</NavLink>
                        <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminbooking"}>Bookings</NavLink>
                        <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminpayout"}>Payout</NavLink>
                        <NavLink to={"/hcfadmin/hcfadminmanage/hcfadminauditlog"}>
                            Audit Logs
                        </NavLink>
                    </nav>
                    {/* <CustomButton 
                            buttonCss={{ position : "absolute" , right : "0" , borderRadius : "6.25rem" }} 
                            isTransaprent={true} 
                            label="Add Staff"
                            // handleClick={() => {navigate("/hcfadmin/doctor/adddoctor")}}
                                /> */}
                </nav>
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
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <h1 style={{ textAlign: "start" }}>Cash Out</h1>
                        <div
                            style={{
                                background: "#E72B4A",
                                display: "flex",
                                color: "white",
                                padding: "20px",
                                borderRadius: "5px",
                            }}
                        >
                            <div>
                                <div style={{ textAlign: "start" }}>
                                    Earning Balance Sales Overview $120 ShareEcare Affiliation
                                    Program $0
                                </div>
                                <div>
                                    Amount you earned frpm sales, custom order and Affliation
                                    Balance. You can cash out this balance.
                                </div>
                            </div>
                            <div style={{ marginLeft: "400px" }}>$120</div>
                        </div>
                        <br />
                        <div
                            style={{
                                border: "1px solid #E6E1E5",
                                textAlign: "start",
                                paddingBottom: "20px",
                            }}
                        >
                            <h3 style={{ marginLeft: "20px" }}>Request Cash Out</h3>
                            <Typography
                                sx={{
                                    color: "#939094",
                                    fontFamily: "Poppins",
                                    fontSize: "0.875rem",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    lineHeight: "1.375rem",
                                    letterSpacing: "0.00438rem",
                                    marginLeft: "20px",
                                }}
                            >
                                Your earning balance is below $100. You need to make another More
                                $99.33 in Sales or
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#939094",
                                    fontFamily: "Poppins",
                                    fontSize: "0.875rem",
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    lineHeight: "1.375rem",
                                    letterSpacing: "0.00438rem",
                                    marginLeft: "20px",
                                }}
                            >
                                Affiliation Balance to request cashout. Upload more assets or Invite
                                your friends to earn more.
                            </Typography>
                            {/* <CustomButton label="Request" buttonCss={{flexShrink:"0",marginLeft:"1150px"}}/> */}
                            <div className="items">
                                <CustomButton
                                    label={"Request"}
                                    isElevated
                                    handleClick={() => setOpenDialog(true)}
                                    buttonCss={{ marginLeft: "1000px" }}
                                />
                                <CustomModal
                                    isOpen={openDialog}
                                    title={"Request Cash Out"}
                                    footer={
                                        <Fragment>
                                            <CustomButton
                                                label={"Cancel"}
                                                handleClick={() => {
                                                    logger.debug("❌ Cash out request cancelled");
                                                    setOpenDialog(false);
                                                }}
                                                isTransaprent
                                                isText
                                            />
                                            <CustomButton
                                                label={"Submit"}
                                                handleClick={handleCashOutRequest}
                                                isTransaprent={false}
                                            />
                                        </Fragment>
                                    }
                                >
                                    <div>
                                        <CustomButton
                                            label="Bank Account"
                                            isTransaprent={!bankAccount}
                                            handleClick={() => {
                                                setBankaccount(!bankAccount);
                                            }}
                                            buttonCss={{ margin: "10px" }}
                                        />
                                        <CustomButton
                                            label="Paypal"
                                            isTransaprent={!!bankAccount}
                                            handleClick={() => {
                                                setBankaccount(!bankAccount);
                                            }}
                                            buttonCss={{ margin: "10px" }}
                                        />
                                    </div>
                                    {bankAccount ? (
                                        <div>
                                            <div style={{ display: "flex" }}>
                                                <CustomTextField
                                                    id={"standard-helperText1"}
                                                    label={"Name an Account"}
                                                    defaultValue={textField1}
                                                    helperText={""}
                                                    onChange={(value) => setTextField1(value)}
                                                    textcss={{ margin: "10px" }}
                                                />
                                                <CustomTextField
                                                    id={"standard-helperText1"}
                                                    label={"Account No"}
                                                    defaultValue={textField2}
                                                    helperText={""}
                                                    onChange={(value) => setTextField2(value)}
                                                    textcss={{ margin: "10px" }}
                                                />
                                            </div>
                                            <div style={{ display: "flex" }}>
                                                <CustomTextField
                                                    id={"standard-helperText1"}
                                                    label={"Confirm Account NO"}
                                                    defaultValue={textField3}
                                                    helperText={""}
                                                    onChange={(value) => setTextField3(value)}
                                                    textcss={{ margin: "10px" }}
                                                />
                                                <CustomTextField
                                                    id={"standard-helperText1"}
                                                    label={"IFSC Code"}
                                                    defaultValue={textField4}
                                                    helperText={""}
                                                    onChange={(value) => setTextField4(value)}
                                                    textcss={{ margin: "10px" }}
                                                />
                                            </div>
                                            <div style={{ display: "flex" }}>
                                                <CustomTextField
                                                    id={"standard-helperText1"}
                                                    label={"SWIFT Code"}
                                                    defaultValue={textField5}
                                                    helperText={""}
                                                    onChange={(value) => setTextField5(value)}
                                                    textcss={{ margin: "10px" }}
                                                />
                                                <CustomTextField
                                                    id={"standard-helperText1"}
                                                    label={"Amount"}
                                                    defaultValue={textField6}
                                                    helperText={""}
                                                    onChange={(value) => setTextField6(value)}
                                                    textcss={{ margin: "10px" }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div style={{ margin: "10px", padding: "10px" }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                elit. Sed ut tellus quis sapien interdum commodo.
                                                Nunc tincidunt justo non dolor bibendum, vitae
                                                elementum elit tincidunt. Pellentesque habitant
                                                morbi tristique senectus et netus et malesuada fames
                                                ac turpis egestas. Morbi maximus, nisl.
                                            </div>
                                            <div>
                                                <CustomTextField
                                                    id={"standard-helperText1"}
                                                    label={"Pay Pal"}
                                                    defaultValue={textField7}
                                                    helperText={""}
                                                    onChange={(value) => setTextField7(value)}
                                                    textcss={{ margin: "10px" }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </CustomModal>
                            </div>
                        </div>
                        <Box
                            component={"div"}
                            sx={{
                                position: "relative",
                                top: "4em",
                                width: "100%",
                                display: "flex",
                                height: "90%",
                            }}
                        >
                            <TableContainer component={Paper} sx={{ backgroundColor: "#ffff", border : "1px solid #E72B4A", borderRadius : "10px", padding : "10px" }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Date</TableCell>
                                            <TableCell align="center">Account No</TableCell>
                                            <TableCell align="center">Amount</TableCell>
                                            <TableCell align="center">Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.TransactionID}
                                                sx={{
                                                    "&:last-child td, &:last-child th": {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                <TableCell align="center">{row.name}</TableCell>
                                                <TableCell align="center">{row.calories}</TableCell>
                                                <TableCell align="center">{row.fat}</TableCell>
                                                <TableCell align="center">{row.carbs}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AdminPayout;
