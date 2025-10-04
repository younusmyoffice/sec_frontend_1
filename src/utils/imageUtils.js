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

/**
 * Converts any image format to base64 data URL for display
 * @param {string} profilePicture - The profile picture from the API
 * @returns {Promise<string>} - Promise that resolves to base64 data URL
 */
export const convertToBase64DataUrl = async (profilePicture) => {
    if (!profilePicture) {
        return null;
    }
    
    // If it's already a data URL, return as is
    if (profilePicture.startsWith('data:image/')) {
        console.log('✅ Already a base64 data URL');
        return profilePicture;
    }
    
    // If it's an HTTP URL, convert to base64
    if (profilePicture.startsWith('http')) {
        try {
            console.log('🔄 Converting HTTP URL to base64...');
            const response = await fetch(profilePicture);
            const blob = await response.blob();
            
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    console.log('✅ Successfully converted HTTP URL to base64');
                    resolve(reader.result);
                };
                reader.onerror = () => {
                    console.error('❌ Error converting HTTP URL to base64');
                    reject(new Error('Failed to convert image to base64'));
                };
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('❌ Error fetching image from URL:', error);
            throw error;
        }
    }
    
    // If it's a base64 string without prefix, add the prefix
    if (profilePicture.length > 100 && !profilePicture.includes('http') && !profilePicture.startsWith('dev-uploads/')) {
        console.log('✅ Adding data URL prefix to base64 string');
        return `data:image/jpeg;base64,${profilePicture}`;
    }
    
    // Skip development uploads
    if (profilePicture.startsWith('dev-uploads/')) {
        console.log('⚠️ Skipping dev-uploads path');
        return null;
    }
    
    console.log('❌ Unknown image format');
    return null;
};

/**
 * Processes profile image and ensures it's in base64 format for display
 * @param {string} profilePicture - The profile picture from the API
 * @param {string} fallbackImage - Default image to use as fallback
 * @returns {Promise<string>} - Promise that resolves to displayable image URL
 */
export const processProfileImage = async (profilePicture, fallbackImage = '/images/avatar.png') => {
    try {
        const base64Image = await convertToBase64DataUrl(profilePicture);
        return base64Image || fallbackImage;
    } catch (error) {
        console.error('Error processing profile image:', error);
        return fallbackImage;
    }
};
