/**
 * HCFDoctorDetailContainerThree Component
 * 
 * Displays doctor about section and reviews:
 * - About/description text
 * - Patient reviews with ratings
 * - Show more/less functionality for reviews
 * 
 * Features:
 * - Loading skeleton states ✅
 * - Expandable review list
 * - Star rating display
 * - Fallback dummy reviews when no data available
 * 
 * @component
 */

import React, { useState, useEffect } from "react";
import { Box, Typography, Link, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import personIcon from "../../../../static/images/person.png";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import logger from "../../../../utils/logger"; // Centralized logging

/**
 * ContainerThree Component - About and Reviews Display
 * 
 * @param {string} description - Doctor's description/about text
 * @param {Array} review - Array of review objects
 * @param {string} review[].first_name - Reviewer's first name
 * @param {string} review[].profile_picture - Reviewer's profile picture URL
 * @param {number} review[].review_type - Rating (1-5)
 * @param {string} review[].description - Review description text
 * @param {boolean} isLoading - Loading state for skeleton display
 */
const ContainerThree = ({ description = "", review = [], isLoading = false }) => {
    logger.debug("🔵 HCFDoctorDetailContainerThree component rendering", {
        hasDescription: !!description,
        reviewsCount: review?.length || 0,
        isLoading
    });
    
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    /**
     * useEffect: Simulate loading state
     * Can be replaced with actual data fetching if needed
     */
    useEffect(() => {
        // Simulate a loading delay
        const timer = setTimeout(() => {
            setLoading(false);
            logger.debug("✅ ContainerThree loading completed");
        }, 1000); // Reduced from 2 seconds to 1 second
        return () => clearTimeout(timer);
    }, []);
    
    // Use prop isLoading if provided, otherwise use local loading state
    const displayLoading = isLoading || loading;

    /**
     * Dummy reviews for fallback display
     * Used when no real reviews are available
     */
    const dummyReviews = [
        {
            profile_picture: personIcon,
            first_name: "John Doe",
            review_type: 4,
            description: "Great service! Would highly recommend.",
        },
        {
            profile_picture: personIcon,
            first_name: "Jane Smith",
            review_type: 5,
            description: "Amazing experience, exceeded my expectations.",
        },
    ];

    /**
     * Determine which reviews to display
     * Shows all reviews if showAll is true, otherwise shows first 2
     * Falls back to dummy reviews if no real reviews available
     */
    const reviewsToShow =
        Array.isArray(review) && review.length > 0
            ? showAll
                ? review
                : review.slice(0, 2)
            : dummyReviews;
    
    /**
     * Handle View All / Show Less toggle
     * Expands or collapses the review list
     */
    const handleToggleReviews = () => {
        logger.debug(`🔄 Toggling reviews display: ${showAll ? "Show Less" : "View All"}`);
        setShowAll(!showAll);
    };

    return (
        <Box sx={{ width: "100%", display: "flex", marginTop: "5%" }}>
            {/* About Me Section */}
            <Box
                sx={{
                    width: "50%",
                    height: "355px",
                    borderRadius: "8px",
                    marginRight: "1%",
                    border: "1px solid #E6E1E5", // Border color - should use SCSS variable
                    textAlign: "left",
                    padding: "2%",
                }}
            >
                {/* About Me Title */}
                {displayLoading ? (
                    <Skeleton variant="text" width="60%" height={30} />
                ) : (
                    <Typography
                        sx={{
                            fontFamily: "Poppins",
                            fontSize: "25px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "30px",
                            padding: "1%",
                        }}
                        component={"h2"}
                    >
                        About Me
                    </Typography>
                )}

                {/* About Me Description */}
                {displayLoading ? (
                    <Skeleton variant="rectangular" width="100%" height={100} />
                ) : (
                    <Typography component={"h3"}>
                        {description ||
                            "No description available for this doctor."}
                    </Typography>
                )}
            </Box>

            {/* Reviews Section */}
            <Box
                sx={{
                    width: "50%",
                    height: "355px",
                    borderRadius: "8px",
                    marginLeft: "1%",
                    border: "1px solid #E6E1E5", // Border color - should use SCSS variable
                    padding: "2%",
                }}
            >
                {/* Reviews Header with View All Toggle */}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    {displayLoading ? (
                        <Skeleton variant="text" width="40%" height={30} />
                    ) : (
                        <Typography component="h2" sx={{ padding: "1%" }}>
                            Reviews
                        </Typography>
                    )}

                    {/* View All / Show Less Link */}
                    {displayLoading ? (
                        <Skeleton variant="text" width="20%" height={30} />
                    ) : (
                        <Link
                            onClick={handleToggleReviews}
                            style={{
                                cursor: "pointer",
                                textDecoration: "none",
                                color: "#E72B4A", // Primary brand color - should use SCSS variable
                                padding: "1%",
                            }}
                        >
                            {showAll ? "Show Less" : "View All"}
                        </Link>
                    )}
                </Box>

                {/* Review List - Scrollable container */}
                <Box
                    sx={{
                        marginTop: "1%",
                        height: "calc(100% - 50px)", // Adjust height for header
                        overflowY: "auto",
                    }}
                >
                    {displayLoading ? (
                        // Loading skeletons for reviews
                        [1, 2].map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    margin: "2% 1% 1% 1%",
                                    width: "98%",
                                    borderBottom: "1px solid #E6E1E5",
                                }}
                            >
                                <Skeleton variant="rectangular" width="100%" height={50} />
                                <Skeleton
                                    variant="text"
                                    width="80%"
                                    height={20}
                                    sx={{ marginTop: "8px" }}
                                />
                            </Box>
                        ))
                    ) : (
                        // Review items
                        reviewsToShow.map((reviews, index) => (
                            <Box
                                key={index}
                                sx={{
                                    margin: "2% 1% 1% 1%",
                                    width: "98%",
                                    borderBottom: "1px solid #E6E1E5",
                                }}
                            >
                                {/* Review Header with Avatar and Rating */}
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Box sx={{ display: "flex" }}>
                                        {/* Reviewer Profile Picture */}
                                        <Box
                                            component="img"
                                            alt={`${reviews.first_name || "Anonymous"} profile`}
                                            src={reviews.profile_picture || personIcon}
                                            sx={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                            }}
                                        />
                                        {/* Reviewer Name */}
                                        <Typography
                                            sx={{
                                                marginLeft: "10%",
                                                fontFamily: "Poppins",
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                lineHeight: "24px",
                                            }}
                                        >
                                            {reviews.first_name || "Anonymous"}
                                        </Typography>
                                    </Box>
                                    {/* Star Rating Display */}
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        {Array.from({ length: 5 }).map((_, starIndex) =>
                                            starIndex < (reviews.review_type || 0) ? (
                                                <StarIcon
                                                    key={starIndex}
                                                    sx={{ 
                                                        color: "#E7B24A", // Star color - should use SCSS variable
                                                        fontSize: "20px"
                                                    }}
                                                />
                                            ) : (
                                                <StarBorderIcon
                                                    key={starIndex}
                                                    sx={{ 
                                                        color: "#E7B24A", // Star color - should use SCSS variable
                                                        fontSize: "20px"
                                                    }}
                                                />
                                            ),
                                        )}
                                    </Box>
                                </Box>
                                {/* Review Description */}
                                <Typography
                                    sx={{
                                        textAlign: "left",
                                        marginTop: "2%",
                                        fontFamily: "Poppins",
                                        fontSize: "18px",
                                        fontWeight: "400",
                                        lineHeight: "21px",
                                        color: "#939094", // Secondary text color - should use SCSS variable
                                    }}
                                >
                                    {reviews.description || "No review provided."}
                                </Typography>
                            </Box>
                        ))
                    )}
                </Box>
            </Box>
        </Box>
    );
};

// PropTypes for component documentation and type checking
ContainerThree.propTypes = {
    description: PropTypes.string, // Doctor's description/about text
    review: PropTypes.arrayOf(PropTypes.shape({
        first_name: PropTypes.string,
        profile_picture: PropTypes.string,
        review_type: PropTypes.number, // Rating 1-5
        description: PropTypes.string,
    })), // Array of review objects
    isLoading: PropTypes.bool, // Loading state for skeleton display
};

// Default props
ContainerThree.defaultProps = {
    description: "",
    review: [],
    isLoading: false,
};

export default ContainerThree;
