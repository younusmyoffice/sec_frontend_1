import { useState, useCallback } from 'react';

/**
 * Custom hook for managing verification loader state
 * @param {Object} options - Configuration options
 * @param {string} options.defaultTitle - Default title for the loader
 * @param {string} options.defaultMessage - Default message for the loader
 * @param {string} options.defaultSubMessage - Default sub-message for the loader
 * @param {string} options.progressColor - Default progress color
 * @returns {Object} - Verification loader state and methods
 */
const useVerificationLoader = (options = {}) => {
  const {
    defaultTitle = "Verification",
    defaultMessage = "Please wait while we process your request...",
    defaultSubMessage = "This may take a few moments...",
    progressColor = "#e72b49"
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  const [message, setMessage] = useState(defaultMessage);
  const [subMessage, setSubMessage] = useState(defaultSubMessage);

  /**
   * Show the verification loader
   * @param {Object} config - Configuration for the loader
   * @param {string} config.title - Title to display
   * @param {string} config.message - Message to display
   * @param {string} config.subMessage - Sub-message to display
   */
  const showLoader = useCallback((config = {}) => {
    setTitle(config.title || defaultTitle);
    setMessage(config.message || defaultMessage);
    setSubMessage(config.subMessage || defaultSubMessage);
    setIsLoading(true);
  }, [defaultTitle, defaultMessage, defaultSubMessage]);

  /**
   * Hide the verification loader
   */
  const hideLoader = useCallback(() => {
    setIsLoading(false);
  }, []);

  /**
   * Update the loader message while it's showing
   * @param {Object} config - Configuration to update
   * @param {string} config.title - New title
   * @param {string} config.message - New message
   * @param {string} config.subMessage - New sub-message
   */
  const updateMessage = useCallback((config = {}) => {
    if (config.title) setTitle(config.title);
    if (config.message) setMessage(config.message);
    if (config.subMessage) setSubMessage(config.subMessage);
  }, []);

  /**
   * Show loader with a promise - automatically hides when promise resolves/rejects
   * @param {Promise} promise - Promise to wait for
   * @param {Object} config - Configuration for the loader
   * @returns {Promise} - The original promise
   */
  const showLoaderWithPromise = useCallback(async (promise, config = {}) => {
    showLoader(config);
    try {
      const result = await promise;
      return result;
    } finally {
      hideLoader();
    }
  }, [showLoader, hideLoader]);

  return {
    // State
    isLoading,
    title,
    message,
    subMessage,
    progressColor,
    
    // Methods
    showLoader,
    hideLoader,
    updateMessage,
    showLoaderWithPromise,
    
    // Convenience methods for common use cases
    showDoctorVerification: useCallback(() => {
      showLoader({
        title: "Doctor Verification",
        message: "Verifying doctor credentials...",
        subMessage: "Please wait while we verify your credentials..."
      });
    }, [showLoader]),
    
    showPaymentProcessing: useCallback(() => {
      showLoader({
        title: "Payment Processing",
        message: "Processing your payment...",
        subMessage: "Please do not close this window..."
      });
    }, [showLoader]),
    
    showEmailVerification: useCallback(() => {
      showLoader({
        title: "Email Verification",
        message: "Sending verification email...",
        subMessage: "Check your inbox for the verification link"
      });
    }, [showLoader]),
    
    showProfileUpdate: useCallback(() => {
      showLoader({
        title: "Profile Update",
        message: "Updating your profile...",
        subMessage: "Please wait while we save your changes..."
      });
    }, [showLoader])
  };
};

export default useVerificationLoader;
