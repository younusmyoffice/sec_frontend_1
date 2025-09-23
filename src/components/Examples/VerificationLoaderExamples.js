import React, { useState } from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import VerificationLoader from '../VerificationLoader';
import useVerificationLoader from '../../hooks/useVerificationLoader';

const VerificationLoaderExamples = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  
  // Using the hook
  const {
    isLoading: isHookLoading,
    showLoader,
    hideLoader,
    showDoctorVerification,
    showPaymentProcessing,
    showEmailVerification,
    showProfileUpdate
  } = useVerificationLoader();

  const handleBasicExample = () => {
    setShowBasic(true);
    setTimeout(() => setShowBasic(false), 3000);
  };

  const handleCustomExample = () => {
    setShowCustom(true);
    setTimeout(() => setShowCustom(false), 3000);
  };

  const handleHookExample = (type) => {
    switch (type) {
      case 'doctor':
        showDoctorVerification();
        setTimeout(hideLoader, 3000);
        break;
      case 'payment':
        showPaymentProcessing();
        setTimeout(hideLoader, 3000);
        break;
      case 'email':
        showEmailVerification();
        setTimeout(hideLoader, 3000);
        break;
      case 'profile':
        showProfileUpdate();
        setTimeout(hideLoader, 3000);
        break;
      default:
        showLoader({
          title: "Custom Verification",
          message: "Processing your request...",
          subMessage: "This is a custom example"
        });
        setTimeout(hideLoader, 3000);
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        VerificationLoader Examples
      </Typography>
      
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Basic Usage
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleBasicExample}
          sx={{ marginRight: 2 }}
        >
          Show Basic Loader
        </Button>
        <Button 
          variant="outlined" 
          onClick={handleCustomExample}
        >
          Show Custom Loader
        </Button>
      </Paper>

      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Hook Usage
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => handleHookExample('doctor')}
          >
            Doctor Verification
          </Button>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={() => handleHookExample('payment')}
          >
            Payment Processing
          </Button>
          <Button 
            variant="contained" 
            color="info"
            onClick={() => handleHookExample('email')}
          >
            Email Verification
          </Button>
          <Button 
            variant="contained" 
            color="success"
            onClick={() => handleHookExample('profile')}
          >
            Profile Update
          </Button>
          <Button 
            variant="outlined"
            onClick={() => handleHookExample('custom')}
          >
            Custom Example
          </Button>
        </Box>
      </Paper>

      {/* Basic Loader */}
      <VerificationLoader
        open={showBasic}
        title="Basic Verification"
        message="This is a basic example..."
        subMessage="It will close automatically in 3 seconds"
      />

      {/* Custom Loader */}
      <VerificationLoader
        open={showCustom}
        title="Custom Verification"
        message="This is a custom example with different styling..."
        subMessage="Notice the different colors and size"
        progressColor="#ff9800"
        progressSize={80}
        progressThickness={3}
      />

      {/* Hook Loader */}
      <VerificationLoader
        open={isHookLoading}
        title="Hook Example"
        message="This loader is controlled by the hook..."
        subMessage="Much cleaner code!"
      />
    </Box>
  );
};

export default VerificationLoaderExamples;
