import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const CustomModal = ({ conditionOpen, isOpen, title, footer, children, class_name, disableBackdropClick, maincontainerclassname }) => {

    const handleClose = () => {
        if (conditionOpen) {
            conditionOpen(false); // Set the parent component state to false to close the modal
        }
    };

    const handleBackdropClick = (event) => {
        if (disableBackdropClick) {
            event.stopPropagation();
        }
    };

    return (
        <div className={class_name}>
            <BootstrapDialog
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' || !disableBackdropClick) {
                        handleClose();
                    }
                }}
                aria-labelledby="customized-dialog-title"
                open={isOpen} 
                onBackdropClick={handleBackdropClick}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose} // Ensure this correctly calls handleClose
                >
                    {title}
                </BootstrapDialogTitle>
                <DialogContent>{children}</DialogContent>
                <DialogActions>{footer}</DialogActions>
            </BootstrapDialog>
        </div>
    );
};

CustomModal.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    footer: PropTypes.node,
    conditionOpen: PropTypes.func.isRequired, // Mark as required
    class_name: PropTypes.string,
    disableBackdropClick: PropTypes.bool,
};

export default CustomModal;

































// import React, { useEffect } from "react";
// import PropTypes from "prop-types";
// import { styled } from "@mui/material/styles";
// import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     "& .MuiDialogContent-root": {
//         padding: theme.spacing(2),
//     },
//     "& .MuiDialogActions-root": {
//         padding: theme.spacing(1),
//     },
// }));

// function BootstrapDialogTitle(props) {
//     const { children, onClose, ...other } = props;

//     return (
//         <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//             {children}
//             {onClose ? (
//                 <IconButton
//                     aria-label="close"
//                     onClick={onClose}
//                     sx={{
//                         position: "absolute",
//                         right: 8,
//                         top: 8,
//                         color: (theme) => theme.palette.grey[500],
//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//             ) : null}
//         </DialogTitle>
//     );
// }

// BootstrapDialogTitle.propTypes = {
//     children: PropTypes.node,
//     onClose: PropTypes.func.isRequired,
// };

// const CustomModal = ({ conditionOpen, isOpen, title, footer, children, class_name, disableBackdropClick }) => {
//     // useEffect(() => {
//     //     setOpen(isOpen);
//     // }, [isOpen]);

//     const handleClose = () => {
//         if (conditionOpen) conditionOpen(false);
//     };

//     const handleBackdropClick = (event) => {
//         if (disableBackdropClick) {
//             event.stopPropagation();
//         }
//     };

//     return (
//         <div className={class_name}>
//             <BootstrapDialog
//                 onClose={(event, reason) => {
//                     if (reason !== 'backdropClick' || !disableBackdropClick) {
//                         handleClose();
//                     }
//                 }}
//                 aria-labelledby="customized-dialog-title"
//                 open={isOpen} // Directly using the isOpen prop
//                 onBackdropClick={handleBackdropClick}
//             >
//                 <BootstrapDialogTitle
//                     id="customized-dialog-title"
//                     onClose={handleClose}
//                 >
//                     {title}
//                 </BootstrapDialogTitle>
//                 <DialogContent>{children}</DialogContent>
//                 <DialogActions>{footer}</DialogActions>
//             </BootstrapDialog>
//         </div>
//     );
// };

// CustomModal.propTypes = {
//     children: PropTypes.node,
//     isOpen: PropTypes.bool.isRequired,
//     title: PropTypes.string,
//     footer: PropTypes.node,
//     conditionOpen: PropTypes.func,
//     class_name: PropTypes.string,
//     disableBackdropClick: PropTypes.bool,
// };

// export default CustomModal;





























// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { styled } from "@mui/material/styles";
// import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     "& .MuiDialogContent-root": {
//         padding: theme.spacing(2),
//     },
//     "& .MuiDialogActions-root": {
//         padding: theme.spacing(1),
//     },
// }));

// function BootstrapDialogTitle(props) {
//     const { children, onClose, ...other } = props;

//     return (
//         <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//             {children}
//             {onClose ? (
//                 <IconButton
//                     aria-label="close"
//                     onClick={onClose}
//                     sx={{
//                         position: "absolute",
//                         right: 8,
//                         top: 8,
//                         color: (theme) => theme.palette.grey[500],
//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//             ) : null}
//         </DialogTitle>
//     );
// }

// BootstrapDialogTitle.propTypes = {
//     children: PropTypes.node,
//     onClose: PropTypes.func.isRequired,
// };

// const CustomModal = ({ conditionOpen, isOpen, title, footer, children, class_name, disableBackdropClick }) => {
//     const [open, setOpen] = useState(isOpen);

//     const handleClose = () => {
//         setOpen(false);
//         if (conditionOpen) conditionOpen(false); // Notify parent component
//     };

//     const handleBackdropClick = (event) => {
//         if (disableBackdropClick) {
//             // Prevent backdrop click from closing the dialog
//             event.stopPropagation();
//         }
//     };

//     useEffect(() => {
//         setOpen(isOpen);
//     }, [isOpen]);

//     return (
//         <div className={class_name}>
//             <BootstrapDialog
//                 onClose={(event, reason) => {
//                     if (reason !== 'backdropClick' || !disableBackdropClick) {
//                         handleClose();
//                     }
//                 }}
//                 aria-labelledby="customized-dialog-title"
//                 open={open}
//                 onBackdropClick={handleBackdropClick}
//             >
//                 <BootstrapDialogTitle
//                     id="customized-dialog-title"
//                     onClose={handleClose}
//                 >
//                     {title}
//                 </BootstrapDialogTitle>
//                 <DialogContent>{children}</DialogContent>
//                 <DialogActions>{footer}</DialogActions>
//             </BootstrapDialog>
//         </div>
//     );
// };

// CustomModal.propTypes = {
//     children: PropTypes.node,
//     isOpen: PropTypes.bool,
//     title: PropTypes.string,
//     footer: PropTypes.node,
//     conditionOpen: PropTypes.func,
//     class_name: PropTypes.string,
//     disableBackdropClick: PropTypes.bool, // New prop type
// };

// export default CustomModal;




















// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { styled } from "@mui/material/styles";
// import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     "& .MuiDialogContent-root": {
//         padding: theme.spacing(2),
//     },
//     "& .MuiDialogActions-root": {
//         padding: theme.spacing(1),
//     },
// }));

// function BootstrapDialogTitle(props) {
//     const { children, onClose, ...other } = props;

//     return (
//         <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//             {children}
//             {onClose ? (
//                 <IconButton
//                     aria-label="close"
//                     onClick={onClose}
//                     sx={{
//                         position: "absolute",
//                         right: 8,
//                         top: 8,
//                         color: (theme) => theme.palette.grey[500],
//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//             ) : null}
//         </DialogTitle>
//     );
// }

// BootstrapDialogTitle.propTypes = {
//     children: PropTypes.node,
//     onClose: PropTypes.func.isRequired,
// };

// const CustomModal = ({ conditionOpen, isOpen, title, footer, children , class_name}) => {
//     const [open, setOpen] = useState(isOpen);

//     const handleClose = () => {
//         setOpen(!open);
//         // conditionOpen(false);
//     };

//     useEffect(() => setOpen(isOpen), [isOpen]);

//     return (
//         <div className={class_name}>
//             <BootstrapDialog
//                 onClose={handleClose}
//                 aria-labelledby="customized-dialog-title"
//                 open={open}
            
//                 // closeAfterTransition=
//                 // slots={{backdrop : 'static',
//                 //         keyboard : false
//                 //         }}
//             >
//                 <BootstrapDialogTitle
//                     id="customized-dialog-title"
//                     onClose={() => handleClose(false)}
//                 >
//                     {title}
//                 </BootstrapDialogTitle>
//                 <DialogContent>{children}</DialogContent>
//                 <DialogActions>{footer}</DialogActions>
//             </BootstrapDialog>
//         </div>
//     );
// };

// CustomModal.propTypes = {
//     children: PropTypes.node,
//     isOpen: PropTypes.bool,
//     title: PropTypes.string,
//     footer: PropTypes.node,
//     conditionOpen: PropTypes.node,
// };

// export default CustomModal;
