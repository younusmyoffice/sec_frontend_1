/**
 * Utility functions for handling profile pictures in different environments
 */
import React from 'react';

/**
 * Gets the appropriate image source for profile pictures
 * Priority: Base64 → Static (if base64 fails) → S3 URLs → Static (if S3 denied) → Static images
 * Works the same in both Development and Production environments
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
    
    // Priority 1: Check if it's a base64 data URL
    if (profilePicture.startsWith('data:image/')) {
        return profilePicture;
    }
    
    // Priority 2: If it's a base64 string without data URL prefix, add it
    if (profilePicture.length > 100 && !profilePicture.includes('http')) {
        return `data:image/jpeg;base64,${profilePicture}`;
    }
    
    // Priority 3: Check if it's an S3 URL or other HTTP URL
    if (profilePicture.startsWith('http')) {
        // For S3 URLs, we'll validate them asynchronously and fallback if needed
        // This will be handled by the component's error handling
        return profilePicture;
    }
    
    // Priority 4: Fallback to static image
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
 * Validates S3 URL and checks for access denied errors
 * @param {string} s3Url - The S3 URL to validate
 * @returns {Promise<boolean>} - Promise that resolves to true if URL is accessible, false if access denied
 */
export const validateS3Url = async (s3Url) => {
    if (!s3Url || !s3Url.startsWith('http')) {
        return false;
    }
    
    try {
        console.log('🔍 Validating S3 URL:', s3Url);
        const response = await fetch(s3Url, { 
            method: 'HEAD', // Use HEAD request to check if resource exists without downloading
            mode: 'cors'
        });
        
        if (response.ok) {
            console.log('✅ S3 URL is accessible');
            return true;
        } else if (response.status === 403) {
            console.log('❌ S3 URL access denied (403)');
            return false;
        } else {
            console.log('⚠️ S3 URL returned status:', response.status);
            return false;
        }
    } catch (error) {
        console.log('❌ S3 URL validation error:', error.message);
        return false;
    }
};

/**
 * Gets the appropriate image source with S3 validation
 * Priority: Base64 → Static (if base64 fails) → S3 URLs → Static (if S3 denied) → Static images
 * Handles S3 access denied errors by falling back to static images
 * @param {string} profilePicture - The profile picture from the API
 * @param {string} fallbackImage - Default image to use as fallback
 * @returns {Promise<string>} - Promise that resolves to the image source to use
 */
export const getProfileImageSrcWithValidation = async (profilePicture, fallbackImage) => {
    if (!profilePicture) {
        return fallbackImage;
    }
    
    // Check if it's a development mode file path
    if (profilePicture.startsWith('dev-uploads/')) {
        console.log('Development mode profile picture detected:', profilePicture);
        return fallbackImage;
    }
    
    // Priority 1: Check if it's a base64 data URL
    if (profilePicture.startsWith('data:image/')) {
        return profilePicture;
    }
    
    // Priority 2: If it's a base64 string without data URL prefix, add it
    if (profilePicture.length > 100 && !profilePicture.includes('http')) {
        return `data:image/jpeg;base64,${profilePicture}`;
    }
    
    // Priority 3: Check if it's an S3 URL or other HTTP URL
    if (profilePicture.startsWith('http')) {
        const isValid = await validateS3Url(profilePicture);
        if (isValid) {
            return profilePicture;
        } else {
            console.log('🔄 S3 URL not accessible, using fallback image');
            return fallbackImage;
        }
    }
    
    // Priority 4: Fallback to static image
    return fallbackImage;
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
            
            // Check for access denied errors
            if (response.status === 403) {
                console.log('❌ S3 URL access denied (403) - cannot convert to base64');
                throw new Error('S3 URL access denied');
            }
            
            if (!response.ok) {
                console.log('❌ HTTP URL returned status:', response.status);
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
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

/**
 * React hook for handling image loading with priority-based fallback
 * Priority: Base64 → Static (if base64 fails) → S3 URLs → Static (if S3 denied) → Static images
 * @param {string} imageSrc - The image source URL
 * @param {string} fallbackSrc - Fallback image source
 * @returns {object} - Object containing current image source and loading state
 */
export const useImageWithFallback = (imageSrc, fallbackSrc) => {
    const [currentSrc, setCurrentSrc] = React.useState(imageSrc);
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);
    
    React.useEffect(() => {
        if (!imageSrc) {
            setCurrentSrc(fallbackSrc);
            setIsLoading(false);
            return;
        }
        
        // Priority 1: If it's already a base64 or static image, use it directly
        if (imageSrc.startsWith('data:image/') || !imageSrc.startsWith('http')) {
            setCurrentSrc(imageSrc);
            setIsLoading(false);
            return;
        }
        
        // Priority 2: For HTTP URLs (S3), validate and handle errors
        setIsLoading(true);
        setHasError(false);
        
        const validateAndSetImage = async () => {
            try {
                const isValid = await validateS3Url(imageSrc);
                if (isValid) {
                    setCurrentSrc(imageSrc);
                } else {
                    console.log('🔄 S3 URL not accessible, using fallback');
                    setCurrentSrc(fallbackSrc);
                    setHasError(true);
                }
            } catch (error) {
                console.log('❌ Error validating image URL:', error);
                setCurrentSrc(fallbackSrc);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };
        
        validateAndSetImage();
    }, [imageSrc, fallbackSrc]);
    
    return {
        src: currentSrc,
        isLoading,
        hasError
    };
};
