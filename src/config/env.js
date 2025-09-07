// Environment variable validation
const requiredEnvVars = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    REACT_APP_ENV: process.env.REACT_APP_ENV || 'local',
    // Add other required environment variables here
    // REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    // REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
};

// Validate required environment variables
const validateEnvVars = () => {
    const missingVars = [];
    
    Object.entries(requiredEnvVars).forEach(([key, value]) => {
        if (!value || value === 'undefined') {
            missingVars.push(key);
        }
    });

    if (missingVars.length > 0) {
        console.warn('Missing environment variables:', missingVars);
        // In production, you might want to throw an error instead of just warning
        if (process.env.NODE_ENV === 'production') {
            throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
        }
    }
};

// Run validation
validateEnvVars();

export default requiredEnvVars;
