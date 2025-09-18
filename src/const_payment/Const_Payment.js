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
        let request_payment_response = await values?.instance?.requestPaymentMethod();
        console.log("get nonve : " , request_payment_response)
        return request_payment_response?.nonce
    } catch (err) {
        console.log("Nonce error : ",err)
        return err?.message;
    }
};
