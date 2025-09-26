import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Thin wrapper: redirects to unified Add Questioner step (create/edit unified)
const EditAddQuestioner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const editingId = localStorage.getItem("editing_listing_id");
    if (editingId) {
      localStorage.setItem("listing_id", editingId);
    }
    localStorage.setItem("activeComponent", "listing");
    localStorage.setItem("path", "addquestioner");
    navigate("/doctordashboard/doctorListing/addquestioner", { replace: true });
  }, []);

  return null;
};

export default EditAddQuestioner;

