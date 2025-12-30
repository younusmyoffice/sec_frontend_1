import React from "react";
import axiosInstance from "../../config/axiosInstance"; // Handles access token automatically
import logger from "../../utils/logger"; // Centralized logging

/**
 * Fetch doctor's available appointment dates
 * Retrieves the list of dates when the doctor has available appointments
 * 
 * @param {string|number} drID - Doctor's ID
 * @returns {Promise<Date[]>} Array of available dates
 */
export const FetchDoctorAvailableDates = async (drID) => {
    logger.debug("📅 Fetching available appointment dates", { drID });
    
    try {
        const resp = await axiosInstance.post(
            "/sec/patient/getAvailableAppointmentDates",
            JSON.stringify({
                doctor_id: Number(drID),
            }),
        );
        
        const date = resp?.data?.availableDates;
        const availableDates = date.map((dateString) => {
            const [year, month, day] = dateString.split("-").map(Number);
            return new Date(year, month - 1, day); // month -1 to get the correct month
        });
        
        logger.debug("✅ Available dates fetched successfully", { 
            count: availableDates.length 
        });
        
        return availableDates;
    } catch (err) {
        logger.error("❌ Failed to fetch available dates:", err);
        return []; // Return empty array on error
    }
};

/**
 * Fetch appointment package questions
 * Retrieves health assessment questions for the appointment
 * 
 * @param {string|number} drID - Doctor's ID
 * @param {string|number} listID - Doctor's list ID
 * @returns {Promise<Array>} Array of questions
 */
export const fetchQuestions = async (drID, listID) => {
    logger.debug("📋 Fetching appointment questions", { drID, listID });
    
    try {
        const response = await axiosInstance.post(
            "/sec/patient/createAppointmentPackageQuestion/",
            JSON.stringify({
                doctor_id: drID,
                is_active: 1,
                doctor_list_id: listID
            }),
        );
        
        const questions = response?.data?.response?.questions || [];
        
        logger.debug("✅ Questions fetched successfully", { 
            count: questions.length 
        });
        
        return questions;
    } catch (err) {
        logger.error("❌ Failed to fetch questions:", err);
        return []; // Return empty array on error
    }
};

/**
 * Fetch available appointment durations for a specific date
 * Retrieves the list of duration options available for booking
 * 
 * @param {string|number} drID - Doctor's ID
 * @param {string} date - Selected appointment date (YYYY-MM-DD)
 * @returns {Promise<Array>} Array of available durations
 */
export const fetchDocDuration = async (drID, date) => {
    logger.debug("⏱️ Fetching appointment durations", { drID, date });
    
    try {
        const response = await axiosInstance(
            `/sec/patient/getAppointmentPlanDuration/${drID}?date=${date}`
        );
        
        const duration = [];
        for (let key in response.data?.response?.durations) {
            duration.push(response.data?.response?.durations[key]?.plan_duration);
        }
        
        logger.debug("✅ Durations fetched successfully", { 
            count: duration.length,
            durations: duration 
        });
        
        return duration;
    } catch (err) {
        logger.error("❌ Failed to fetch durations:", err);
        return []; // Return empty array on error
    }
};


/**
 * Format date string to YYYY-MM-DD format
 * Converts a date string or Date object to ISO date format
 * 
 * @param {string|Date} inputDateStr - Date string or Date object
 * @returns {string} Formatted date string (YYYY-MM-DD)
 */
export function formatDate(inputDateStr) {
    try {
        // Create a Date object from the input string
        const date = new Date(inputDateStr);

        // Validate date
        if (isNaN(date.getTime())) {
            logger.error("❌ Invalid date format:", inputDateStr);
            return "";
        }

        // Extract year, month, and day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');

        // Format as "YYYY-MM-DD"
        return `${year}-${month}-${day}`;
    } catch (error) {
        logger.error("❌ Error formatting date:", error);
        return "";
    }
}


/**
 * Fetch available appointment packages
 * Retrieves consultation packages (message, video, call) with pricing
 * 
 * @param {Object} data - Package selection data (doctor_id, is_active, duration)
 * @returns {Promise<Array>} Array of available packages/plans
 */
export const fetchSelectPackage = async (data) => {
    logger.debug("📦 Fetching appointment packages", data);
    
    try {
        const response = await axiosInstance.post(
            "/sec/patient/createAppointmentPackageSelect/",
            JSON.stringify(data),
        );
        
        const plans = response?.data?.response?.plan || [];
        
        logger.debug("✅ Packages fetched successfully", { 
            count: plans.length 
        });
        
        return plans;
    } catch (err) {
        logger.error("❌ Failed to fetch packages:", err);
        return []; // Return empty array on error
    }
};