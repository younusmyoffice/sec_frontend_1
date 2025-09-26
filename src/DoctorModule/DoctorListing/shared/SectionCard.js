import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

const SectionCard = ({ title, subtitle, actions, children, sx }) => {
  return (
    <Paper elevation={0} sx={{ border: '1px solid #E6E1E5', borderRadius: '12px', p: 3, mb: 3, ...sx }}>
      {(title || actions) && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            {title && (
              <Typography variant="h6" sx={{ fontFamily: 'poppins', fontWeight: 500, color: '#313033' }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" sx={{ fontFamily: 'poppins', color: '#787579' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {actions && <Box>{actions}</Box>}
        </Box>
      )}
      <Box>{children}</Box>
    </Paper>
  );
};

export default SectionCard;

