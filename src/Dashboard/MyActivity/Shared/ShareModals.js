import React, { Fragment } from "react";

import Reports from "../../../constants/DrImages/report.png"
import CustomButton from "../../../components/CustomButton";
import CustomModal from "../../../components/CustomModal";
import { useState } from "react";




export const ShareModals=()=>{
    const [openDialog, setOpenDialog] = useState(false);
    // const dropdownItems = ["Radiology.pdf", "item2", "item3"];

    const [activeDropdown, setActiveDropdown] = useState("");
    // const [activeFabDropdown, setActiveFabDropdown] = useState(dropdownItems[0]);
    return(
        <>
                         <CustomButton
                            label={"View"}
                            isElevated
                            isTransaprent
                            handleClick={() => setOpenDialog(true)}
                        />
                        <CustomModal
                            isOpen={openDialog}
                            title={"Send Report"}
                            footer={
                                <Fragment>
                                    <CustomButton
                                        label={"Close"}
                                        handleClick={() => setOpenDialog(false)}
                                        isText
                                        
                                    />
                                  
                                </Fragment>
                            }
                        >
                            <div>
                            <img src={Reports}/>
                            </div>
                        </CustomModal>
                   
        </>
    )
}