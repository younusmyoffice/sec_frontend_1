import React from "react";
import PropTypes from "prop-types";
// import Spinner from "../Spinner";
import "./page-loader.scss";

const PageLoader = ({ text }) => {
    return (
        <div className="page-loader">
            {/* <Spinner className="main-loader" /> */}
            <div className="info-text">{text}</div>
        </div>
    );
};

PageLoader.propTypes = {
    text: PropTypes.string,
};

export default PageLoader;
