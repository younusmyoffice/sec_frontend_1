import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const content1 = () => {
    return (
        <Card
            sx={{ width: 175, height: 360, marginBottom: 0.5, border: "1px solid black" }}
            style={{ backgroundColor: "#E72B4A" }}
        >
            <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography gutterBottom variant="h9" component="div" color="#FFFFFF">
                    Trail
                </Typography>
                <Typography gutterBottom variant="h7" component="div" color="#FFFFFF">
                    Free /14 Days Left
                </Typography>
                {/* <Typography component="div" variant="h9" fontWeight="bold">
                Free / 14 Days Left
            </Typography> */}
                <Typography variant="body2" color="#F395A5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, Sed ut tellus quis
                    sapien
                </Typography>
                <Stack marginTop={3} direction="row" alignItems="center" gap={1} padding={-2}>
                    <CheckCircleRoundedIcon style={{ color: "#FFFFFF", fontSize: "15px" }} />
                    <Typography fontSize="10px" color="#FFFFFF">
                        03 Consultations
                    </Typography>
                </Stack>
                <Stack marginTop={1} direction="row" alignItems="center" gap={1} padding={-2}>
                    <CheckCircleRoundedIcon style={{ color: "#FFFFFF", fontSize: "15px" }} />
                    <Typography fontSize="10px" color="#FFFFFF">
                        Option 2
                    </Typography>
                </Stack>
                <Stack marginTop={1} direction="row" alignItems="center" gap={1} padding={-2}>
                    <CheckCircleRoundedIcon style={{ color: "#FFFFFF", fontSize: "15px" }} />
                    <Typography fontSize="10px" color="#FFFFFF">
                        Option 3
                    </Typography>
                </Stack>
                <Stack marginTop={1} direction="row" alignItems="center" gap={1} padding={-2}>
                    <CheckCircleRoundedIcon style={{ color: "#FFFFFF", fontSize: "15px" }} />
                    <Typography fontSize="10px" color="#FFFFFF">
                        Option 4
                    </Typography>
                </Stack>
            </CardContent>

            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
        </Card>
    );
};

export default content1;
