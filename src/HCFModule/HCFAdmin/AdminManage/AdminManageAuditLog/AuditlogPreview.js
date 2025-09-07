import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { AuditCards } from "../../../DiagnosticCenter/DiagnosticManage/DiagnosticCenterAuditLog/AuditCards";
import CustomButton from "../../../../components/CustomButton";


function createData(name, calories, fat, carbs, protein, action) {
    return { name, calories, fat, carbs, protein, action };
}

const rows = [
    createData(<AuditCards name={"Jolie"} specialist={"User"} Id={"001"} />, <Typography>Active</Typography>, <CustomButton buttonCss={{
        display: "inline-flex",
        height: "2rem",
        padding: "0.5rem 1rem",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        flexShrink: "0",
        borderRadius: "6.25rem"
    }}
        isTransaprent={"true"}
        label={"Xaqwkc12246"} />,
        <CustomButton buttonCss={{
            display: "inline-flex",
            height: "2rem",
            padding: "0.5rem 1rem",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            flexShrink: "0",
            borderRadius: "6.25rem"
        }}
            isTransaprent={"true"}
            isDisabled
            label={"Profile Edit"} />,
        <Typography sx={{
            color: "#939094",
            textAlign: "center",
            fontFamily: "Poppins",
            fontSize: "0.625rem",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "0.9375rem",
            letterSpacing: "0.005rem",
        }} >24 JAN 2023</Typography>
    ),

];

const AduitlogPreview = () => {
    return (
        <>
            <Table sx={{ minwidth: "1000", height: "300px" }} aria-label="simple table">
                <TableHead>
                <TableRow style={{ fontWeight: "bold" }}>
                        <TableCell>Name & Id</TableCell>
                        <TableCell align="right">Action ID</TableCell>
                        <TableCell align="right">Action</TableCell>
                        <br />
                        <div style={{ marginTop: "100px" }}><TableCell align="right">Timestamp</TableCell>    </div>
                         </TableRow>
                         </TableHead>
                         <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align='right'>{row.carbs}</TableCell>
                            <br />
                            <TableCell align='right'>{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </>
    )
}
export default AduitlogPreview
