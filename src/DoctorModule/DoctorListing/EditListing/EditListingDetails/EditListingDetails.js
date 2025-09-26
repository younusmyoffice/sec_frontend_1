import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Thin wrapper: redirects to unified Listing Details step (create/edit unified)
const EditListingDetails = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const editingId = localStorage.getItem("editing_listing_id");
    if (editingId) {
      localStorage.setItem("listing_id", editingId);
    }
    localStorage.setItem("activeComponent", "listing");
    localStorage.setItem("path", "listingdetails");
    navigate("/doctordashboard/doctorListing/listingdetails", { replace: true });
  }, []);

  return null;
};

export default EditListingDetails;

