import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Paper,
    Typography,
    Card,
    CardContent,
    Skeleton,
    Button,
    Grid,
    Chip,
    Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../../../config/axiosInstance";
import CustomSnackBar from "../../../../components/CustomSnackBar";
import dayjs from "dayjs";

const DiagnostLabs = () => {
    const { labId } = useParams();
    const navigate = useNavigate();
    const [labData, setLabData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackType, setSnackType] = useState("success");
    const [snackMessage, setSnackMessage] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const hcf_id = localStorage.getItem("hcfadmin_suid");

    // Fetch lab data by labId
    const fetchLabData = async () => {
        setLoading(true);
        try {
            console.log("Fetching lab data for labId:", labId);
            const response = await axiosInstance.get(`/sec/hcf/getHcfLab/${hcf_id}`);
            console.log("All labs response:", response?.data);
            
            // Find the specific lab by labId
            const allLabs = response?.data?.response || [];
            const specificLab = allLabs.find(lab => lab.exam_id == labId);
            
            if (specificLab) {
                setLabData(specificLab);
                console.log("Found lab data:", specificLab);
            } else {
                console.log("Lab not found with ID:", labId);
                setSnackType("error");
                setSnackMessage("Lab not found!");
                setSnackOpen(true);
            }
        } catch (error) {
            console.error("Error fetching lab data:", error);
            setSnackType("error");
            setSnackMessage("Error fetching lab data!");
            setSnackOpen(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (labId && hcf_id) {
            fetchLabData();
        }
    }, [labId, hcf_id]);

    const handleBack = () => {
        navigate("/hcfadmin/diagnosticcenter/labs");
    };

    const handleEdit = () => {
        navigate(`/hcfadmin/diagnosticcenter/labs/${labId}/edit`);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this lab?")) {
            try {
                await axiosInstance.delete(`/sec/hcf/deleteLab?exam_id=${labId}`);
                setSnackType("success");
                setSnackMessage("Lab deleted successfully!");
                setSnackOpen(true);
                setTimeout(() => {
                    navigate("/hcfadmin/diagnosticcenter/labs");
                }, 2000);
            } catch (error) {
                console.error("Error deleting lab:", error);
                setSnackType("error");
                setSnackMessage("Error deleting lab!");
                setSnackOpen(true);
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Box sx={{ mt: 2 }}>
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton variant="text" width="40%" height={30} />
                    <Skeleton variant="text" width="80%" height={30} />
                </Box>
            </Box>
        );
    }

    if (!labData) {
        return (
            <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h5" color="error">
                    Lab not found
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={handleBack}
                    sx={{ mt: 2 }}
                >
                    Go Back
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={{ mr: 2 }}
                >
                    Back
                </Button>
                <Typography variant="h4" component="h1">
                    Lab Details
                </Typography>
            </Box>

            {/* Lab Details Card */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                        <Typography variant="h5" component="h2">
                            {labData.exam_name || "Lab Name Not Available"}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={handleEdit}
                                color="primary"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                onClick={handleDelete}
                                color="error"
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={3}>
                        {/* Basic Information */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                                Basic Information
                            </Typography>
                            
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Lab Name
                                </Typography>
                                <Typography variant="body1">
                                    {labData.exam_name || "Not specified"}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Department
                                </Typography>
                                <Typography variant="body1">
                                    {labData.department_name || "Not specified"}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Description
                                </Typography>
                                <Typography variant="body1">
                                    {labData.description || "No description available"}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Working Hours */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                                Working Hours
                            </Typography>
                            
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Working Days
                                </Typography>
                                <Typography variant="body1">
                                    {labData.lab_working_days_from && labData.lab_working_days_to 
                                        ? `${dayjs(labData.lab_working_days_from).format("MMM DD, YYYY")} - ${dayjs(labData.lab_working_days_to).format("MMM DD, YYYY")}`
                                        : "Not specified"
                                    }
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Working Time
                                </Typography>
                                <Typography variant="body1">
                                    {labData.lab_working_time_from && labData.lab_working_time_to 
                                        ? `${labData.lab_working_time_from} - ${labData.lab_working_time_to}`
                                        : "Not specified"
                                    }
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Status */}
                    <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid #e0e0e0" }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                            Status
                        </Typography>
                        <Chip 
                            label="Active" 
                            color="success" 
                            size="small"
                        />
                    </Box>
                </CardContent>
            </Card>

            {/* Snackbar for notifications */}
            <CustomSnackBar
                snackType={snackType}
                snackMessage={snackMessage}
                snackOpen={snackOpen}
                setSnackOpen={setSnackOpen}
            />
        </Box>
    );
};

export default DiagnostLabs;