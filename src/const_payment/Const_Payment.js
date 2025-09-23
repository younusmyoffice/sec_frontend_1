import axiosInstance from "../config/axiosInstance";

export const get_client_token = async (payment_path) => {
    try {
        const resp = await axiosInstance(payment_path);
        return resp?.data
    } catch (err) {
        return err;
    }
};

export const get_nonce = async (values) => {
    try {
        // Check if instance is still valid before requesting nonce
        if (!values?.instance || typeof values.instance.requestPaymentMethod !== 'function') {
            throw new Error("Braintree instance is no longer valid. Please refresh the payment form.");
        }
        
        let request_payment_response = await values?.instance?.requestPaymentMethod();
        console.log("get nonce : " , request_payment_response)
        
        if (!request_payment_response?.nonce) {
            throw new Error("Failed to generate payment nonce. Please try again.");
        }
        
        return request_payment_response.nonce;
    } catch (err) {
        console.log("Nonce error : ", err);
        
        // Handle specific teardown error
        if (err?.message && err.message.includes('teardown')) {
            throw new Error("Payment form has been reset. Please refresh and try again.");
        }
        
        // Handle other errors
        throw new Error(err?.message || "Failed to generate payment nonce. Please try again.");
    }
};
