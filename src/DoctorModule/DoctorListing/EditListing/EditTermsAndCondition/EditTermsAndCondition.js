import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Thin wrapper: redirects to unified Terms & Conditions step (create/edit unified)
const EditTermsAndCondition = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const editingId = localStorage.getItem("editing_listing_id");
    if (editingId) {
      localStorage.setItem("listing_id", editingId);
    }
    localStorage.setItem("activeComponent", "listing");
    localStorage.setItem("path", "termandcondition");
    navigate("/doctordashboard/doctorListing/termandcondition", { replace: true });
  }, []);

  return null;
};

export default EditTermsAndCondition;

