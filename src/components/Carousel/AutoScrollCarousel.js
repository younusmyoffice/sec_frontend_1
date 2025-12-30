import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import { PlayArrow, Pause, NavigateBefore, NavigateNext } from '@mui/icons-material';
import CustomButton from '../CustomButton/custom-button';
import image1 from '../../static/images/DrImages/CardDoctor1.png';
import image2 from '../../static/images/DrImages/CardDoctor2.png';
import './AutoScrollCarousel.scss';

const AutoScrollCarousel = ({ 
    isLoading = false, 
    speed = 1, 
    autoPlay = true,
    showControls = true,
    variant = "default",
    cardCount = 4
}) => {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Define card data - matching the design
    const cardData = [
        {
            title: "Take control of your health with our user-friendly health care app.",
            subtitle: "Comprehensive healthcare management",
            image: image1,
            category: "Health Management",
            rating: 4.8
        },
        {
            title: "All your health related report at one place.",
            subtitle: "Centralized medical records",
            image: image2,
            category: "Medical Records",
            rating: 4.9
        },
        {
            title: "Book an appointment easily Access top healthcare professionals with one click.",
            subtitle: "Quick appointment booking",
            image: image1,
            category: "Appointments",
            rating: 4.7
        },
        {
            title: "Your health, our priority Discover personalized healthcare solutions today.",
            subtitle: "Personalized care solutions",
            image: image2,
            category: "Personalized Care",
            rating: 4.9
        },
    ];

    // Duplicate data for seamless loop
    const extendedData = [...cardData, ...cardData, ...cardData];

    useEffect(() => {
        if (isLoading || isHovered || !isPlaying) return;

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
    }, [isLoading, isHovered, speed, isPlaying]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handlePrevious = () => {
        const container = containerRef.current;
        if (container) {
            const cardWidth = container.scrollWidth / 3;
            container.scrollLeft = Math.max(0, container.scrollLeft - cardWidth);
        }
    };

    const handleNext = () => {
        const container = containerRef.current;
        if (container) {
            const cardWidth = container.scrollWidth / 3;
            container.scrollLeft = Math.min(container.scrollWidth, container.scrollLeft + cardWidth);
        }
    };

    const Card = ({ title, subtitle, image, category, rating, isLoading, index }) => {
        if (isLoading) {
            return (
                <Box className={`carousel-card carousel-card--${variant} loading`}>
                    <Box className="card-content">
                        <Box className="skeleton-text skeleton-text--title" />
                        <Box className="skeleton-text skeleton-text--subtitle" />
                        <Box className="skeleton-chip" />
                        <Box className="skeleton-button" />
                    </Box>
                    <Box className="card-image">
                        <Box className="skeleton-image" />
                    </Box>
                </Box>
            );
        }

        return (
            <Box className={`carousel-card carousel-card--${variant}`}>
                <Box className="card-content">
                    <Box className="card-header">
                        <Chip 
                            label={category}
                            size="small"
                            sx={{
                                backgroundColor: '#e3f2fd',
                                color: '#e72b4a',
                                fontWeight: 600,
                                fontSize: '11px',
                                marginBottom: '12px'
                            }}
                        />
                        <Typography variant="h6" className="card-title">
                            {title}
                        </Typography>
                        <Typography variant="body2" className="card-subtitle">
                            {subtitle}
                        </Typography>
                        <Box className="card-rating">
                            <Typography variant="caption" className="rating-text">
                                ⭐ {rating} Rating
                            </Typography>
                        </Box>
                    </Box>
                    <CustomButton
                        buttonCss={{ 
                            border: "none", 
                            marginTop: "16px",
                            backgroundColor: "#e72b4a",
                            color: "white",
                            borderRadius: "12px",
                            padding: "12px 24px",
                            fontSize: "14px",
                            fontWeight: "600",
                            textTransform: "none",
                            boxShadow: "0 4px 12px rgba(231, 43, 74, 0.3)",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                                backgroundColor: "#d32f2f",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 20px rgba(231, 43, 74, 0.4)",
                            }
                        }}
                        label="Learn More"
                        isTransaprent={false}
                    />
                </Box>
                <Box className="card-image">
                    <img src={image} alt="Healthcare" />
                    <Box className="image-overlay" />
                </Box>
            </Box>
        );
    };

    return (
        <Box className={`auto-scroll-carousel auto-scroll-carousel--${variant}`}>
            {showControls && (
                <Box className="carousel-controls">
                    <IconButton 
                        onClick={handlePrevious}
                        className="control-button control-button--prev"
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                transform: 'scale(1.1)'
                            }
                        }}
                    >
                        <NavigateBefore />
                    </IconButton>
                    
                    <IconButton 
                        onClick={handlePlayPause}
                        className="control-button control-button--play"
                        sx={{
                            backgroundColor: isPlaying ? '#e72b4a' : '#4caf50',
                            color: 'white',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                                backgroundColor: isPlaying ? '#d32f2f' : '#388e3c',
                                transform: 'scale(1.1)'
                            }
                        }}
                    >
                        {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    
                    <IconButton 
                        onClick={handleNext}
                        className="control-button control-button--next"
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                transform: 'scale(1.1)'
                            }
                        }}
                    >
                        <NavigateNext />
                    </IconButton>
                </Box>
            )}
            
            <Box 
                className="carousel-container"
                ref={containerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {extendedData.map((card, index) => (
                    <Card
                        key={`${card.title}-${index}`}
                        title={card.title}
                        subtitle={card.subtitle}
                        image={card.image}
                        category={card.category}
                        rating={card.rating}
                        isLoading={isLoading}
                        index={index}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default AutoScrollCarousel;