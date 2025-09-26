import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Thin wrapper: redirects to unified Add Plans step (create/edit unified)
const EditAddPlans = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const editingId = localStorage.getItem("editing_listing_id");
    if (editingId) {
      localStorage.setItem("listing_id", editingId);
    }
    localStorage.setItem("activeComponent", "listing");
    localStorage.setItem("path", "addplans");
    navigate("/doctordashboard/doctorListing/addplans", { replace: true });
  }, []);

  return null;
};

export default EditAddPlans;

