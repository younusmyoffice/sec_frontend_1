import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Link, Skeleton } from "@mui/material";
import personIcon from "../../static/images/person.png";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

/**
 * ContainerThree Component
 * 
 * Displays doctor information in two sections:
 * - About Me: Doctor's description
 * - Reviews: Patient reviews with star ratings and "Show All" toggle
 * 
 * Features:
 * - Loading skeletons while data loads
 * - Toggle between showing all reviews or just first 2
 * - Fallback to dummy reviews if no reviews available
 * 
 * @param {Object} props - Component props
 * @param {string} props.description - Doctor's description
 * @param {Array} props.review - Array of patient reviews
 * 
 * @component
 */
const ContainerThree = ({ description, review }) => {
    const [loading, setLoading] = useState(true); // Loading state
    const [showAll, setShowAll] = useState(false); // Toggle for showing all reviews

    /**
     * Simulate loading state while data is being fetched
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    /**
     * Dummy reviews for fallback when no reviews are available
     * Used to demonstrate the component structure
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
        {
            profile_picture: personIcon,
            first_name: "romen rick",
            review_type: 3,
            description: "Amazing experience, exceeded my expectations.",
        },
        {
            profile_picture: personIcon,
            first_name: "hank pimp",
            review_type: 2,
            description: " Did not exceeded my expectations.",
        },
    ];

    /**
     * Determine which reviews to display
     * - If showAll is true: show all reviews
     * - If showAll is false: show only first 2 reviews
     * - Fallback to dummy reviews if no reviews available
     */
    const reviewsToShow =
        Array.isArray(review) && review.length > 0
            ? showAll
                ? review
                : review.slice(0, 2)
            : dummyReviews;

    return (
        <Box sx={{ width: "100%", display: "flex", marginTop: "5%" }}>
            {/* About Me Section - Doctor's description */}
            <Box
                sx={{
                    width: "50%",
                    height: "355px",
                    borderRadius: "8px",
                    marginRight: "1%",
                    border: "1px solid #E6E1E5",
                    textAlign: "left",
                    padding: "2%",
                }}
            >
                {/* About Me Title */}
                {loading ? (
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
                {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={100} />
                ) : (
                    <Typography component={"h3"}>
                        {description ||
                            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."}
                    </Typography>
                )}
            </Box>

            {/* Reviews Section - Patient reviews with ratings */}
            <Box
                sx={{
                    width: "50%",
                    height: "355px",
                    borderRadius: "8px",
                    marginLeft: "1%",
                    border: "1px solid #E6E1E5",
                    padding: "2%",
                }}
            >
                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    {loading ? (
                        <Skeleton variant="text" width="40%" height={30} />
                    ) : (
                        <Typography component="h2" sx={{ padding: "1%" }}>
                            Reviews
                        </Typography>
                    )}

                    {loading ? (
                        <Skeleton variant="text" width="20%" height={30} />
                    ) : (
                        <Link
                            onClick={() => setShowAll(!showAll)}
                            style={{
                                cursor: "pointer",
                                textDecoration: "none",
                                color: "#E72B4A",
                                padding: "1%",
                            }}
                        >
                            {showAll ? "Show Less" : "View All"}
                        </Link>
                    )}
                </Box>

                {/* Review List - Scrollable */}
                <Box
                    sx={{
                        marginTop: "1%",
                        height: "calc(100% - 50px)", // Adjust height for header
                        overflowY: "auto",
                    }}
                >
                    {/* Loading skeletons for reviews */}
                    {loading
                        ? [1, 2].map((_, index) => (
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
                        : /* Actual reviews */
                          reviewsToShow.map((reviews, index) => (
                              <Box
                                  key={index}
                                  sx={{
                                      margin: "2% 1% 1% 1%",
                                      width: "98%",
                                      borderBottom: "1px solid #E6E1E5",
                                  }}
                              >
                                  {/* Reviewer Info Header */}
                                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                      {/* Reviewer Profile and Name */}
                                      <Box sx={{ display: "flex" }}>
                                          <Box
                                              component="img"
                                              alt="Reviewer profile"
                                              src={reviews.profile_picture || personIcon}
                                              sx={{
                                                  width: "40px",
                                                  height: "40px",
                                                  borderRadius: "50%",
                                              }}
                                          />
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
                                      
                                      {/* Star Rating */}
                                      <Box sx={{ display: "flex", alignItems: "center" }}>
                                          {Array.from({ length: 5 }).map((_, starIndex) =>
                                              starIndex < reviews.review_type ? (
                                                  <StarIcon
                                                      key={starIndex}
                                                      sx={{ color: "#E7B24A" }}
                                                  />
                                              ) : (
                                                  <StarBorderIcon
                                                      key={starIndex}
                                                      sx={{ color: "#E7B24A" }}
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
                                          color: "#939094",
                                      }}
                                  >
                                      {reviews.description || "No review provided."}
                                  </Typography>
                              </Box>
                          ))}
                </Box>
            </Box>
        </Box>
    );
};

// PropTypes for type checking
ContainerThree.propTypes = {
    description: PropTypes.string,
    review: PropTypes.arrayOf(PropTypes.shape({
        profile_picture: PropTypes.string,
        first_name: PropTypes.string,
        review_type: PropTypes.number,
        description: PropTypes.string
    })),
};

ContainerThree.defaultProps = {
    description: "",
    review: [],
};

export default ContainerThree;
