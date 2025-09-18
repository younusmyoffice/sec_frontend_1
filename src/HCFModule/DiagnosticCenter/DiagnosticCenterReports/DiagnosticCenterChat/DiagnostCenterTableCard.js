import React from "react";

const DiagnostCenterTableCard = ({ name, id, profile }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", padding: "0.5em", borderRadius: "8px",  width: "100%", margin: "0.5em 0" }}>
            <div style={{ width: "4em", height: "4em", marginRight: "1em", borderRadius: "8px", overflow: "hidden" }}>
                <img
                    src={profile || "https://images.unsplash.com/photo-1529946179074-87642f6204d7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt="Center"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>
            <div>
                <div style={{ fontSize: "1em", fontWeight: "500" }}>{name || "N/A"}</div>
                <div style={{ fontSize: "0.9em", color: "#555" }}>BookingId:{id || "NA"}</div>
            </div>
        </div>
    );
};

export default DiagnostCenterTableCard;
