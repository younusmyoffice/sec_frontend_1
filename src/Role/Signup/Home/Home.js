import React from "react";
import { Box } from "@mui/material";
import Frame from "../../static/images/DrImages/Frame1.png";

const Home = () => {
    return (
        <>
            <div className="home-header">
                <Box component={"img"} src={Frame}></Box>
          
            </div>
        </>
    );
};

export default Home;
