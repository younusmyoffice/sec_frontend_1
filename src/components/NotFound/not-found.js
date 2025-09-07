import React from "react";
import { Link } from "react-router-dom";
import "./not-found.scss";

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Oops! Something is wrong.</p>
            <Link className="btn btn-primary" to="/">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
