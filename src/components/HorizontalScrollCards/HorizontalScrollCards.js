import React, { useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import './HorizontalScrollCards.scss';

const HorizontalScrollCards = ({
    title,
    viewAllText = "View All",
    onViewAllClick,
    children,
    className = ""
}) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            const currentScroll = scrollRef.current.scrollLeft;
            const targetScroll = direction === 'left' 
                ? currentScroll - scrollAmount 
                : currentScroll + scrollAmount;
            
            scrollRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <Box className={`horizontal-scroll-cards ${className}`}>
            <Box className="section-header" sx={{ 
                    marginBottom: "1.5rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "2px solid #E72B4A",
                    width: "fit-content"
                }}>
                <Typography className="section-title">
                    {title}
                </Typography>
                {viewAllText && (
                    <Typography 
                        className="view-all-link"
                        onClick={onViewAllClick}
                    >
                        {viewAllText}
                    </Typography>
                )}
            </Box>
            
            <Box className="scroll-container">
                <IconButton 
                    className="scroll-button left"
                    onClick={() => scroll('left')}
                >
                    <ChevronLeft />
                </IconButton>
                
                <Box className="cards-wrapper" ref={scrollRef}>
                    <Box className="cards-container">
                        {children}
                    </Box>
                </Box>
                
                <IconButton 
                    className="scroll-button right"
                    onClick={() => scroll('right')}
                >
                    <ChevronRight />
                </IconButton>
            </Box>
        </Box>
    );
};

export default HorizontalScrollCards;
