import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from '../CustomButton/custom-button';
import image1 from '../../static/images/DrImages/CardDoctor1.png';
import image2 from '../../static/images/DrImages/CardDoctor2.png';
import './AutoScrollCarousel.scss';

const AutoScrollCarousel = ({ isLoading = false, speed = 1 }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Define card data - matching the design
  const cardData = [
    {
      title: "Take control of your health with our user-friendly health care app.",
      image: image1,
    },
    {
      title: "All your health related report at one place.",
      image: image2,
    },
    {
      title: "Book an appointment easily Access top healthcare professionals with one click.",
      image: image1,
    },
    {
      title: "Your health, our priority Discover personalized healthcare solutions today.",
      image: image2,
    },
  ];

  // Duplicate data for seamless loop
  const extendedData = [...cardData, ...cardData, ...cardData];

  useEffect(() => {
    if (isLoading || isHovered) return;

    const container = containerRef.current;
    if (!container) return;

    let animationId;
    let scrollPosition = 0;

    const animate = () => {
      if (container) {
        scrollPosition += speed;
        container.scrollLeft = scrollPosition;

        // Reset when we've scrolled through one complete set
        if (scrollPosition >= container.scrollWidth / 3) {
          scrollPosition = 0;
        }

        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isLoading, isHovered, speed]);

  const Card = ({ title, image, isLoading }) => {
    if (isLoading) {
      return (
        <Box className="carousel-card loading">
          <Box className="card-content">
            <Box className="skeleton-text" />
            <Box className="skeleton-button" />
          </Box>
          <Box className="skeleton-image" />
        </Box>
      );
    }

    return (
      <Box className="carousel-card">
        <Box className="card-content">
          <Typography variant="h6" className="card-title">
            {title}
          </Typography>
          <CustomButton
            buttonCss={{ 
              border: "none", 
              mt: 1,
              backgroundColor: "#ff6b9d",
              color: "white",
              borderRadius: "20px",
              padding: "8px 20px",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(255, 107, 157, 0.3)",
              "&:hover": {
                backgroundColor: "#ff5582",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(255, 107, 157, 0.4)",
              }
            }}
            label="Book Now"
            isTransaprent={false}
          />
        </Box>
        <Box className="card-image">
          <img src={image} alt="Doctor" />
        </Box>
      </Box>
    );
  };

  return (
    <Box 
      className="auto-scroll-carousel"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {extendedData.map((card, index) => (
        <Card
          key={`${card.title}-${index}`}
          title={card.title}
          image={card.image}
          isLoading={isLoading}
        />
      ))}
    </Box>
  );
};

export default AutoScrollCarousel;
