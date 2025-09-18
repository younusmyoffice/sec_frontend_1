import React from "react";
import Carousel from "react-material-ui-carousel";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { MenuList2 } from "./data2";

const carousel = () => {
    return (
        <Carousel sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {MenuList2.map((Mycarousel) => (
                <Card
                    key={Mycarousel.key}
                    sx={{
                        display: "flex",
                        maxWidth: 310,
                        height: 128,
                        // marginLeft: -8,
                        // borderRadius: 2,
                        // marginTop: -3,
                        // marginBottom: -5,
                        m: 1,
                    }}
                >
                    <CardMedia
                        component="img"
                        height="140"
                        image={Mycarousel.image}
                        alt={Mycarousel.title}
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {Mycarousel.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {Mycarousel.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Carousel>
    );
};

export default carousel;
