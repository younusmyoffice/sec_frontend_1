/**
 * Utility functions for handling profile pictures in different environments
 */

/**
 * Gets the appropriate image source for profile pictures
 * Handles development mode, production mode, and fallbacks
 * @param {string} profilePicture - The profile picture from the API
 * @param {string} fallbackImage - Default image to use as fallback
 * @returns {string} - The image source to use
 */
export const getProfileImageSrc = (profilePicture, fallbackImage) => {
    if (!profilePicture) {
        return fallbackImage;
    }
    
    // Check if it's a development mode file path
    if (profilePicture.startsWith('dev-uploads/')) {
        console.log('Development mode profile picture detected:', profilePicture);
        console.log('Note: Development mode profile pictures need proper file serving implementation');
        // For now, return fallback until we implement proper dev file serving
        return fallbackImage;
    }
    
    // Check if it's a base64 data URL
    if (profilePicture.startsWith('data:image/')) {
        return profilePicture;
    }
    
    // Check if it's an S3 URL or other HTTP URL
    if (profilePicture.startsWith('http')) {
        return profilePicture;
    }
    
    // If it's a base64 string without data URL prefix, add it
    if (profilePicture.length > 100 && !profilePicture.includes('http')) {
        return `data:image/jpeg;base64,${profilePicture}`;
    }
    
    // Fallback to default image
    return fallbackImage;
};

/**
 * Checks if the profile picture is a development mode file path
 * @param {string} profilePicture - The profile picture from the API
 * @returns {boolean} - True if it's a dev file path
 */
export const isDevelopmentFile = (profilePicture) => {
    return profilePicture && profilePicture.startsWith('dev-uploads/');
};

/**
 * Checks if the profile picture is a base64 data URL
 * @param {string} profilePicture - The profile picture from the API
 * @returns {boolean} - True if it's a base64 data URL
 */
export const isBase64DataUrl = (profilePicture) => {
    return profilePicture && profilePicture.startsWith('data:image/');
};

/**
 * Checks if the profile picture is an HTTP URL
 * @param {string} profilePicture - The profile picture from the API
 * @returns {boolean} - True if it's an HTTP URL
 */
export const isHttpUrl = (profilePicture) => {
    return profilePicture && profilePicture.startsWith('http');
};
