import React, { Fragment, useState } from "react";
import { Typography } from "@mui/material";
import CustomTextField from "../../../../components/CustomTextField";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import upload from "../../../../static/images/DrImages/upload.png";

const Shared = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [textField1, setTextField1] = useState("");
    const [textField2, setTextField2] = useState("");
    return (
        <>
            <div className="items">
                <CustomButton label={"Share"} isElevated handleClick={() => setOpenDialog(true)} />
                <CustomModal
                    isOpen={openDialog}
                    title={"Send Report"}
                    footer={
                        <Fragment>
                            <CustomButton
                                label={"Save"}
                                handleClick={() => setOpenDialog(false)}
                                isTransaprent
                                isText
                            />
                        </Fragment>
                    }
                >
                    <div>
                        <CustomTextField
                            id={"standard-helperText1"}
                            label={"Select Category"}
                            defaultValue={textField1}
                            helperText={""}
                            onChange={(value) => setTextField1(value)}
                        />
                        <br />
                        <CustomTextField
                            id={"standard-helperText1"}
                            label={"Select Category"}
                            defaultValue={textField2}
                            helperText={""}
                            onChange={(value) => setTextField2(value)}
                        />
                        <br />
                        <br />
                        <img src={upload} />
                        <br />
                        <Typography
                            sx={{
                                color: "#939094",
                                fontFamily: "Poppins",
                                fontSize: "0.625rem",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "0.9375rem",
                                letterSpacing: "0.005rem",
                            }}
                        >
                            File type : Jpg, PNG, PDF, Tiff
                            <br />
                            Max file size : 2MB
                        </Typography>
                    </div>
                </CustomModal>
            </div>
        </>
    );
};
export default Shared;
