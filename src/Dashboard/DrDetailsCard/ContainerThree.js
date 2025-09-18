import React, { useState, useEffect } from "react";
import { Box, Typography, Link, Skeleton } from "@mui/material";
import personIcon from "../../static/images/person.png";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const ContainerThree = ({ description, review }) => {
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        // Simulate a loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

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

    const reviewsToShow =
        Array.isArray(review) && review.length > 0
            ? showAll
                ? review
                : review.slice(0, 2)
            : dummyReviews;

    return (
        <Box sx={{ width: "100%", display: "flex", marginTop: "5%" }}>
            {/* About me container */}
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

                {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={100} />
                ) : (
                    <Typography component={"h3"}>
                        {description ||
                            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."}
                    </Typography>
                )}
            </Box>

            {/* Reviews container */}
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

                {/* Review List */}
                <Box
                    sx={{
                        marginTop: "1%",
                        height: "calc(100% - 50px)", // Adjust height for header
                        overflowY: "auto",
                    }}
                >
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
                        : reviewsToShow.map((reviews, index) => (
                              <Box
                                  key={index}
                                  sx={{
                                      margin: "2% 1% 1% 1%",
                                      width: "98%",
                                      borderBottom: "1px solid #E6E1E5",
                                  }}
                              >
                                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                      <Box sx={{ display: "flex" }}>
                                          <Box
                                              component="img"
                                              alt="image"
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

export default ContainerThree;
