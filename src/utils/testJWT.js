import { decodeJWT } from './jwtUtils';

// Test JWT decoding with your specific token
const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMzYsImlhdCI6MTc1Nzc4NTk2NCwiZXhwIjoxNzU3ODE0NzY0fQ.B528WZKXGbHcfKGr68Z2bNcNnH5t6GOPn9WpQdzds0Q";

console.log("=== JWT DECODING TEST ===");
console.log("Test token:", testToken);

try {
    const decoded = decodeJWT(testToken);
    console.log("Decoded payload:", decoded);
    console.log("User ID:", decoded.userId);
    console.log("Role ID:", decoded.roleId);
    console.log("Email:", decoded.email);
    console.log("Is Expired:", decoded.isExpired);
    console.log("Issued At:", new Date(decoded.iat * 1000));
    console.log("Expires At:", new Date(decoded.exp * 1000));
} catch (error) {
    console.error("Error decoding test token:", error);
}

export { testToken };
