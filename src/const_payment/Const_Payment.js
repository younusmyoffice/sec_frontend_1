import axiosInstance from "../config/axiosInstance";
import axios from "axios";
// Import baseURL directly to avoid circular deps through constants/const
import { baseURL } from "../constants/apiConstants";

// Create a separate axios instance for Braintree token generation (no auth headers)
const braintreeAxios = axios.create({
    baseURL: baseURL,
    timeout: 10000,
});

export const get_client_token = async (payment_path) => {
    try {
        console.log("Fetching Braintree client token from:", `${baseURL}${payment_path}`);
        const resp = await braintreeAxios(payment_path); // Use axios without auth headers
        console.log("Braintree client token response:", resp?.data);
        return resp?.data?.clientToken || resp?.data;
    } catch (err) {
        console.error("Braintree token generation error:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
        return err;
    }
};

export const get_nonce = async (values) => {
    try {
        // Check if instance is still valid before requesting nonce
        if (!values?.instance || typeof values.instance.requestPaymentMethod !== 'function') {
            throw new Error("Braintree instance is no longer valid. Please refresh the payment form.");
        }
        
        // Additional validation: check if instance is not torn down
        try {
            // Test if we can access the instance without errors
            const testAccess = values.instance.requestPaymentMethod;
            if (typeof testAccess !== 'function') {
                throw new Error("Braintree instance is no longer valid. Please refresh the payment form.");
            }
        } catch (accessError) {
            console.error("Instance access test failed:", accessError);
            throw new Error("Braintree instance is no longer valid. Please refresh the payment form.");
        }
        
        // Defensive: ensure any teardown in progress has settled
        await Promise.resolve();

        let request_payment_response = await values?.instance?.requestPaymentMethod();
        console.log("get nonce : " , request_payment_response)
        
        if (!request_payment_response?.nonce) {
            throw new Error("Failed to generate payment nonce. Please try again.");
        }
        
        return request_payment_response.nonce;
    } catch (err) {
        console.log("Nonce error : ", err);
        
        // Handle specific teardown error
        if (err?.message && (err.message.includes('teardown') || err.message.includes('no longer valid'))) {
            throw new Error("Payment form has been reset. Please refresh and try again.");
        }
        
        // Handle Braintree-specific errors
        if (err?.message && err.message.includes('Braintree')) {
            throw new Error("Braintree payment form is no longer valid. Please refresh the payment form.");
        }
        
        // Handle other errors
        throw new Error(err?.message || "Failed to generate payment nonce. Please try again.");
    }
};
