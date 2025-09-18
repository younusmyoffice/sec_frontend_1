import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", // Replace with your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Modify the request config here (e.g., add headers, authentication tokens)
        const accessToken = Cookies.get("token");
        // const accessToken = localStorage.get("access_token");

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
            // if (config.headers) config.headers.token = `Bearer ${accessToken}`;
            console.log("add token")
        }
        return config;
    },
    (error) => {
        // Handle request errors here

        return Promise.reject(error);
    },
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Modify the response data here (e.g., parse, transform)
        return response;
    },
    (error) => {
        // Handle response errors here
        return Promise.reject(error);
    },
);

export default axiosInstance;
