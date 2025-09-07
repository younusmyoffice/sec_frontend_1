import React, { Fragment } from "react";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import { useState } from "react";
import CustomDropdown from "../../../../components/CustomDropdown";
import upload from "../../../../constants/DrImages/upload.png"


export const ShareModal=()=>{
    const [openDialog, setOpenDialog] = useState(false);
    const dropdownItems = ["Radiology.pdf", "item2", "item3"];

    const [activeDropdown, setActiveDropdown] = useState("");
    const [activeFabDropdown, setActiveFabDropdown] = useState(dropdownItems[0]);
    return(
        <>
         <CustomButton
                            label={"Share"}
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
                                        label={"Send"}
                                        handleClick={() => setOpenDialog(false)}
                                        isText
                                        
                                    />
                                  
                                </Fragment>
                            }
                        >
                            <div>
                            <div className="component-library">
                    <div className="items">
                        <CustomDropdown
                            label={"File Name"}
                            items={dropdownItems}
                            CustomSx={{width:"300px"}}
                            activeItem={activeDropdown}
                            handleChange={(item) => setActiveDropdown(item)}
                        />
                            <div className="items">
                        <CustomDropdown
                            label={"Category"}
                            items={dropdownItems}
                            CustomSx={{width:"300px"}}
                            activeItem={activeDropdown}
                            handleChange={(item) => setActiveDropdown(item)}
                        />
                      </div>
                      <img src={upload} style={{width:"350px"}}/>
                    <div style={{color:"gray"}}>
                    <p>File type : Jpg, PNG, PDF, Tiff</p>
                      <p>No of files : 2MB</p>
                      <p>Max file size : 2MB</p>
                    </div>
                    </div>
                    </div>
                            </div>
                        </CustomModal>
                   
        </>
    )
}