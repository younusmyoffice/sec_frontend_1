import React, { useState } from "react";
import CustomModal from "../../../../components/CustomModal";
import CustomButton from "../../../../components/CustomButton";
import report from "../../../../constants/DrImages/report.png"

const Pdf=()=>{
    const [openDialog, setOpenDialog] = useState(false);
    return(
        <>
           <div className="items">
                        <CustomButton
                            label={"View"}
                            isElevated
                            isTransaprent
                            handleClick={() => setOpenDialog(true)}
                        />
                        <CustomModal
                            isOpen={openDialog}
                            title={"Report.jpg"}
                        >
                            <div>
                                <img src={report}/>
                               </div>
                        </CustomModal>
                    </div>
        </>
    )
}
export default Pdf