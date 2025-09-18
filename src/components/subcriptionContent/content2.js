import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CustomButton from "../CustomButton/custom-button";

const content2 = () => {
    return (
        <Card sx={{ width: 175, height: 360, marginBottom: 0.5, border: "1px solid black" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography gutterBottom variant="h9" component="div" color="#313033">
                    Monthly
                </Typography>
                <Typography
                    gutterBottom
                    variant="h7"
                    component="div"
                    color="#313033"
                    fontWeight="bold"
                >
                    19$ / Month
                </Typography>
                {/* <Typography component="div" variant="h9" fontWeight="bold">
                Free / 14 Days Left
            </Typography> */}
                <Typography variant="body2" color="#AEAAAE">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, Sed ut tellus quis
                    sapien
                </Typography>

                <Stack marginTop={3} direction="row" alignItems="center" gap={1} padding={-2}>
                    <CheckCircleRoundedIcon style={{ color: "#F8BFC9", fontSize: "15px" }} />
                    <Typography fontSize="10px">Unlimited Consultations</Typography>
                </Stack>
                <Stack marginTop={1} direction="row" alignItems="center" gap={1} padding={-2}>
                    <CheckCircleRoundedIcon style={{ color: "#F8BFC9", fontSize: "15px" }} />
                    <Typography fontSize="10px">Option 2</Typography>
                </Stack>
                <Stack marginTop={1} direction="row" alignItems="center" gap={1} padding={-2}>
                    <CheckCircleRoundedIcon style={{ color: "#F8BFC9", fontSize: "15px" }} />
                    <Typography fontSize="10px">Option 3</Typography>
                </Stack>
                <Stack
                    marginTop={1}
                    marginBottom={3}
                    direction="row"
                    alignItems="center"
                    gap={1}
                    padding={-2}
                >
                    <CheckCircleRoundedIcon style={{ color: "#F8BFC9", fontSize: "15px" }} />
                    <Typography fontSize="10px">Option 4</Typography>
                </Stack>

                <CustomButton
                    label={"Choose Plan"}
                    isTransaprent={false}
                    isDisabled={false}
                    isElevated={false}
                    style={{
                        marginTop: "30px",
                        padding: "18px",
                    }}
                />
            </CardContent>

            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
        </Card>
    );
};

export default content2;
