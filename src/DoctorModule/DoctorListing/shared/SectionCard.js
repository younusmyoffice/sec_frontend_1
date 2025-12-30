/**
 * SectionCard Component
 * 
 * Reusable card component for consistent section styling across listing steps:
 * - Used in Add Plans, Add Questioner, Terms & Conditions
 * - Provides consistent border, padding, and spacing
 * - Supports optional title, subtitle, and action buttons
 * 
 * @component
 * @param {string} title - Main section title (optional)
 * @param {string} subtitle - Section description/subtitle (optional)
 * @param {ReactNode} actions - Action buttons/elements to display on the right (optional)
 * @param {ReactNode} children - Main content of the section card
 * @param {Object} sx - Additional Material-UI sx styles (optional)
 * 
 * @example
 * <SectionCard 
 *   title="Add Plans" 
 *   subtitle="Create consultation plans" 
 *   actions={<CustomButton label="Add" />}
 * >
 *   <AddPlanCard />
 * </SectionCard>
 */
import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

const SectionCard = ({ title, subtitle, actions, children, sx }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        border: '1px solid #E72B4A', // Red border matching brand color
        backgroundColor: '#ffffff', 
        borderRadius: '12px', 
        p: 3, // Padding: 24px
        mb: 3, // Bottom margin: 24px
        ...sx // Allow custom style overrides
      }}
    >
      {/* Header section: Title, Subtitle, and Actions */}
      {(title || actions) && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 2 // Bottom margin: 16px
        }}>
          {/* Left side: Title and Subtitle */}
          <Box>
            {title && (
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: 'poppins', 
                  fontWeight: 500, 
                  color: '#313033' // Dark gray text
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: 'poppins', 
                  color: '#787579' // Medium gray text
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          
          {/* Right side: Action buttons (Add, Edit, etc.) */}
          {actions && <Box>{actions}</Box>}
        </Box>
      )}
      
      {/* Main content area */}
      <Box>{children}</Box>
    </Paper>
  );
};

export default SectionCard;

