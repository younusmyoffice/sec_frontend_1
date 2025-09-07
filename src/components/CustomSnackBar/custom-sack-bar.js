import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Snackbar, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomSnackBar = ({ isOpen, actionLabel, handleAction, message, hideDuration, type }) => {
    const [state, setState] = useState({
        open: isOpen,
        vertical: "top",
        horizontal: "right",
    });
    const { vertical, horizontal, open } = state;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setState({ ...state, open: false });
    };

    useEffect(() => {
        setState({ ...state, open: isOpen });
    }, [isOpen]);

    const action = (
        <Fragment>
            <Button color="primary" size="small" onClick={handleAction}>
                {actionLabel}
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            autoHideDuration={hideDuration}
            message={
                <span>
                    <IconButton>
                        <Box
                            bgcolor={`${type}.main`}
                            borderRadius="50%"
                            width={10}
                            height={10}
                            ml={-1.5}
                        />
                    </IconButton>
                    {message}
                </span>
            }
            action={action}
        />
    );
};

CustomSnackBar.defaultProps = {
    isOpen: false,
    actionLabel: "",
    handleAction: () => {},
    message: "",
    hideDuration: 5000,
    type: "",
};

CustomSnackBar.propTypes = {
    isOpen: PropTypes.bool,
    actionLabel: PropTypes.string,
    handleAction: PropTypes.func,
    message: PropTypes.string,
    hideDuration: PropTypes.number,
    type: PropTypes.string,
};

export default CustomSnackBar;
