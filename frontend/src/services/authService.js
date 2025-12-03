// src/services/authService.js
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

// REGISTER
export function register(credentials) {
    return api.post("/auth/register", credentials);
}

// LOGIN
export function login(credentials) {
    return api.post("/auth/login", credentials);
}

// SEND OTP
export function requestPasswordReset(email) {
    return api.post("/auth/forgot", { email });
}

// VERIFY OTP
export function verifyOtp(email, otp) {
    return api.post("/auth/verify-otp", { email, otp });
}

// RESET PASSWORD
export function resetPassword(email, password) {
    return api.post("/auth/reset", { email, password });
}

export default {
    register,
    login,
    requestPasswordReset,
    verifyOtp,
    resetPassword,
};