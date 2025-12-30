import React, { Fragment, useState } from "react";
import Reports from "../../../static/images/DrImages/report.png";
import CustomButton from "../../../components/CustomButton";
import CustomModal from "../../../components/CustomModal";

/**
 * ShareModals Component
 * 
 * Modal dialog for viewing and sharing medical reports
 * Features:
 * - View report in modal
 * - Close button to dismiss modal
 * 
 * Props: None (uses internal state for modal visibility)
 * 
 * @component
 */
export const ShareModals = () => {
    // State to control modal visibility
    const [openDialog, setOpenDialog] = useState(false);
    
    // Commented out dropdown functionality for future use
    // const [activeDropdown, setActiveDropdown] = useState("");
    
    return (
        <>
            {/* View Button - Opens modal when clicked */}
            <CustomButton
                label={"View"}
                isElevated
                isTransaprent
                handleClick={() => setOpenDialog(true)}
            />
            
            {/* Report Viewing Modal */}
            <CustomModal
                isOpen={openDialog}
                title={"Send Report"}
                footer={
                    <Fragment>
                        {/* Close Button - Dismisses modal */}
                        <CustomButton
                            label={"Close"}
                            handleClick={() => setOpenDialog(false)}
                            isText
                        />
                    </Fragment>
                }
            >
                {/* Report Image Display */}
                <div>
                    <img src={Reports} alt="Medical Report" />
                </div>
            </CustomModal>
        </>
    );
};
