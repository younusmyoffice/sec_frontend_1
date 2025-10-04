import axiosInstance from '../config/axiosInstance';
import axios from 'axios';
// Import from lightweight constants to avoid circular imports
import { baseURL } from '../constants/apiConstants';

// Create a separate axios instance for Braintree token generation (no auth headers)
const braintreeAxios = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

/**
 * Payment Service with Environment-Based Handling
 * Development: Mock payment processing
 * Production: Real Braintree payment processing
 */

/**
 * Generate client token for payment gateway
 * @returns {Promise<string>} Client token
 */
export const generateClientToken = async () => {
  try {
    console.log("Fetching Braintree client token from paymentService");
    const response = await braintreeAxios.get('/sec/payment/generateToken'); // Use axios without auth headers
    console.log("Braintree client token response from paymentService:", response?.data);
    return response?.data?.clientToken || response?.data;
  } catch (error) {
    console.error('Error generating client token:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    throw error;
  }
};

/**
 * Process payment with environment-based handling
 * @param {Object} paymentData - Payment data
 * @param {string} paymentData.amount - Payment amount
 * @param {string} paymentData.user_id - User ID
 * @param {string} paymentData.doctor_fee_plan_id - Doctor fee plan ID
 * @param {string} paymentData.payment_method_nonce - Payment method nonce
 * @returns {Promise<Object>} Payment result
 */
export const processPayment = async (paymentData) => {
  try {
    const response = await axiosInstance.post('/sec/payment/processPayment', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

/**
 * Get payment method nonce from Braintree Drop-In instance
 * @param {Object} instance - Braintree Drop-In instance
 * @returns {Promise<string>} Payment method nonce
 */
export const getPaymentMethodNonce = async (instance) => {
  try {
    if (!instance) {
      throw new Error('Braintree instance not available');
    }
    
    const requestPaymentResponse = await instance.requestPaymentMethod();
    console.log('Payment method nonce generated:', requestPaymentResponse);
    return requestPaymentResponse.nonce;
  } catch (error) {
    console.error('Error getting payment method nonce:', error);
    throw error;
  }
};

/**
 * Check if running in development mode
 * @returns {boolean} True if development mode
 */
export const isDevelopmentMode = () => {
  return process.env.NODE_ENV === 'development' || 
         process.env.REACT_APP_ENV === 'development' ||
         window.location.hostname === 'localhost';
};

/**
 * Mock payment processing for development
 * @param {Object} paymentData - Payment data
 * @returns {Promise<Object>} Mock payment result
 */
export const mockPaymentProcessing = async (paymentData) => {
  console.log('Mock payment processing:', paymentData);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockTransactionId = `mock_txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    success: true,
    transaction: {
      id: mockTransactionId,
      status: 'authorized',
      amount: paymentData.amount,
      paymentMethodNonce: paymentData.payment_method_nonce
    },
    message: 'Payment processed successfully (Development Mode)',
    transdata: mockTransactionId
  };
};
