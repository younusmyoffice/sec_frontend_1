import React, { Fragment, useState } from "react";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import Reports from "../../../../static/images/DrImages/report.png";

export const ShareListModal = () => {
    const [openDialog, setOpenDialog] = useState(false);
    // const dropdownItems = ["Radiology.pdf", "item2", "item3"];

    const [activeDropdown, setActiveDropdown] = useState("");
    // const [activeFabDropdown, setActiveFabDropdown] = useState(dropdownItems[0]);
    return (
        <>
            <CustomButton
                label={"TST0001.pdf"}
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
                    <img src={Reports} />
                </div>
            </CustomModal>
        </>
    );
};
