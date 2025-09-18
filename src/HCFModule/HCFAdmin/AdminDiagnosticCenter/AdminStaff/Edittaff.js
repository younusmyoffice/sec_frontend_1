import React, { Fragment, useState } from "react";
import pen from "../../../../static/images/DrImages/Pen.svg"
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomTextField from "../../../../components/CustomTextField";
import AddStaffModal from "./AddStaffModal";

import { Box } from "@mui/material";

const Edittaff = () => {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <>
        {/* <CustomButton label={<img src={pen} />} isTransaprent/> */}
        <div className="items">
        <CustomButton
                    buttonCss={{
                        marginLeft: "10%",
                        // marginTop: "-6%",
                        borderRadius: "50px",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        width: "149px",
                        height: "48px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "22px",
                    }}
                    isTransaprent={true}
                    label={<img src={pen}/>}
                    handleClick={() => setOpenDialog(!openDialog)}
                ></CustomButton>
                <CustomModal
                            isOpen={openDialog}
                            title={"Book Appointment"}
                            footer={
                                <Fragment>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        {/* <CustomButton
                                            label="Next"
                                            handleClick={() =>
                                                setPatientDetails(!openPatientDetails)
                                            }
                                        /> */}
                                    </Box>
                                </Fragment>
                            }
                        >
                            <Box>
                            <AddStaffModal/>
                            </Box>
                        </CustomModal>
                       
                    </div>
        </>
    )
}
export default Edittaff