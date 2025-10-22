import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  TextField,
  InputAdornment,
  Stack,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import CustomDropdown from "../CustomDropdown/custom-dropdown";
import SearchBarModalCard from "../../constants/SearchBarModalCard/SearchBarModalCard";
import axiosInstance from "../../config/axiosInstance";
import { front_end_url } from "../../constants/const";
import frontimg from "../../static/images/DrImages/searchIcon.png";
import PropTypes from "prop-types";

// Utility: Debounce function
const debounce = (func, delay = 350) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const SearchBarModal = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchValue("");
    setCardData([]);
    setError(null);
  };

  // Fetch search results
  const fetchSearchResult = useCallback(async (value) => {
    if (!value) {
      setCardData([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const resp = await axiosInstance.get(`/sec/patient/getPatientSearchAPI/${value}`);
      const data = resp?.data?.response;
      setCardData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Search API error:", err);
      setError("Failed to fetch search results. Please try again.");
      setCardData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced input handler
  const handleInputChange = useCallback(
    debounce((value) => {
      setSearchValue(value.trim().toLowerCase());
    }, 350),
    []
  );

  // Effect to fetch results when searchValue changes
  useEffect(() => {
    fetchSearchResult(searchValue);
  }, [searchValue, fetchSearchResult]);

  // Focus input when modal opens
  useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open]);

  return (
    <div className="search_bar_modal">
      {/* Search Trigger */}
      <Box
        onClick={handleOpen}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        border={1}
        borderColor="#AEAAAE"
        borderRadius="25px"
        width={{ xs: "100%", sm: "27em" }}
        height="38px"
        backgroundColor="#E6E1E5"
        paddingX={2}
        sx={{ cursor: "pointer" }}
        role="button"
        aria-label="Open search modal"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleOpen()}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          <SearchIcon sx={{ color: "#AEAAAE" }} />
          <Typography variant="body1" sx={{ color: "#AEAAAE" }}>
            Search here…
          </Typography>
        </Stack>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="search-modal-title"
        aria-describedby="search-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "60%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "8px",
            p: 4,
            maxHeight: "80vh",
            overflowY: "auto",
            outline: "none",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8, color: "grey.500" }}
            aria-label="Close search modal"
          >
            <CloseIcon />
          </IconButton>

          {/* Search Input */}
          <TextField
            inputRef={searchInputRef}
            fullWidth
            placeholder="Search here"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => handleInputChange(e.target.value)}
            sx={{
              mb: 3,
              mt: 5,
              backgroundColor: "#EFEFEF",
              borderRadius: "25px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" },
              },
            }}
            aria-label="Search input"
          />

          {/* Uncomment if dropdown is needed
          <CustomDropdown
            label="Select state"
            items={["Andaman and Nicobar Islands", "Andhra Pradesh", ...]}
            activeItem=""
            handleChange={(item) => console.log(item)}
          />
          */}

          <Box sx={{ borderBottom: "1px solid #E6E1E5", my: 2 }} />

          {/* Search Results */}
          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
            {loading ? (
              <Stack alignItems="center" spacing={2}>
                <CircularProgress size={24} />
                <Typography>Searching...</Typography>
              </Stack>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : cardData.length === 0 ? (
              <Stack alignItems="center" spacing={2}>
                <img
                  style={{ maxWidth: "200px", height: "auto" }}
                  src={frontimg}
                  alt="No results found"
                />
                <Typography>No Doctors Found</Typography>
              </Stack>
            ) : (
              cardData.map((data, index) => (
                <Link
                  key={data?.suid || index}
                  to={`${front_end_url}/patientDashboard/drDetailsCard/${data?.suid}`}
                  onClick={handleClose}
                  style={{
                    textDecoration: "none",
                    width: { xs: "100%", sm: "45%" },
                    height: "auto",
                  }}
                >
                  <SearchBarModalCard DrData={data} />
                </Link>
              ))
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};


export default SearchBarModal;