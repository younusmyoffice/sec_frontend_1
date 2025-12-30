/**
 * Appointment Booking API Helper Functions
 * 
 * This module contains reusable API functions for appointment booking flow
 * Features:
 * - Fetch available appointment dates
 * - Fetch appointment questions
 * - Fetch doctor duration slots
 * - Fetch selectable packages
 * - Date formatting utilities
 * 
 * Security:
 * - All functions use axiosInstance (automatic JWT token injection) ✅
 * - Input validation for doctor IDs and dates
 * 
 * Error Handling:
 * - Comprehensive error handling with logging ✅
 * - Returns null/empty arrays on error for graceful degradation
 * 
 * @module bookappointmentapihelperfunction
 */

import axiosInstance from "../../../config/axiosInstance"; // Handles access token automatically
import logger from "../../../utils/logger"; // Centralized logging
import toastService from "../../../services/toastService"; // Toast notifications

/**
 * Fetch available appointment dates for a doctor
 * 
 * @param {number|string} drID - Doctor ID
 * @returns {Promise<Date[]|null>} Array of available dates or null on error
 * 
 * @example
 * const dates = await FetchDoctorAvailableDates(123);
 * if (dates) {
 *     console.log('Available dates:', dates);
 * }
 */
export const FetchDoctorAvailableDates = async (drID) => {
    // Validate doctor ID
    if (!drID || (typeof drID !== 'number' && typeof drID !== 'string')) {
        logger.error("❌ Invalid doctor ID provided:", drID);
        toastService.error("Invalid doctor ID");
        return null;
    }
    
    logger.debug("📅 Fetching available appointment dates", { doctorID: drID });
    
    try {
        const resp = await axiosInstance.post(
            "/sec/patient/getAvailableAppointmentDates",
            JSON.stringify({
                doctor_id: Number(drID),
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        logger.debug("✅ Available dates API response received", {
            hasDates: !!resp?.data?.availableDates,
            datesLength: resp?.data?.availableDates?.length || 0,
        });
        
        // Validate response structure
        if (!resp?.data?.availableDates || !Array.isArray(resp?.data?.availableDates)) {
            logger.warn("⚠️ Invalid available dates response structure");
            toastService.warning("No available dates found");
            return [];
        }
        
        // Convert date strings to Date objects
        const availableDates = resp.data.availableDates.map((dateString) => {
            try {
                const [year, month, day] = dateString.split("-").map(Number);
                if (!year || !month || !day) {
                    logger.warn("⚠️ Invalid date format:", dateString);
                    return null;
                }
                // month - 1 because Date constructor expects 0-based months
                return new Date(year, month - 1, day);
            } catch (error) {
                logger.error("❌ Error parsing date:", dateString, error);
                return null;
            }
        }).filter(date => date !== null); // Filter out invalid dates
        
        logger.debug("✅ Available dates processed successfully", {
            datesCount: availableDates.length
        });
        
        return availableDates;
    } catch (err) {
        logger.error("❌ Failed to fetch available dates:", err);
        toastService.error(
            err?.response?.data?.message || 
            "Failed to load available dates. Please try again."
        );
        return null;
    }
};

/**
 * Fetch appointment questions for a doctor and package
 * 
 * @param {number|string} drID - Doctor ID
 * @param {number|string} listID - Doctor list/package ID
 * @returns {Promise<Array|null>} Array of questions or null on error
 * 
 * @example
 * const questions = await fetchQuestions(123, 456);
 * if (questions) {
 *     console.log('Questions:', questions);
 * }
 */
export const fetchQuestions = async (drID, listID) => {
    // Validate doctor ID and list ID
    if (!drID || (typeof drID !== 'number' && typeof drID !== 'string')) {
        logger.error("❌ Invalid doctor ID provided:", drID);
        return null;
    }
    
    if (!listID || (typeof listID !== 'number' && typeof listID !== 'string')) {
        logger.error("❌ Invalid doctor list ID provided:", listID);
        return null;
    }
    
    logger.debug("❓ Fetching appointment questions", { doctorID: drID, listID });
    
    try {
        const response = await axiosInstance.post(
            "/sec/patient/createAppointmentPackageQuestion/",
            JSON.stringify({
                doctor_id: Number(drID),
                is_active: 1,
                doctor_list_id: Number(listID)
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        logger.debug("✅ Questions API response received", {
            hasQuestions: !!response?.data?.response?.questions,
            questionsLength: response?.data?.response?.questions?.length || 0,
        });
        
        // Validate response structure
        if (!response?.data?.response?.questions) {
            logger.warn("⚠️ No questions found in response");
            return [];
        }
        
        return response.data.response.questions;
    } catch (err) {
        logger.error("❌ Failed to fetch questions:", err);
        toastService.error(
            err?.response?.data?.message || 
            "Failed to load questions. Please try again."
        );
        return null;
    }
};

/**
 * Fetch available duration slots for a doctor on a specific date
 * 
 * @param {number|string} drID - Doctor ID
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<Array|null>} Array of duration options or null on error
 * 
 * @example
 * const durations = await fetchDocDuration(123, "2024-12-25");
 * if (durations) {
 *     console.log('Available durations:', durations);
 * }
 */
export const fetchDocDuration = async (drID, date) => {
    // Validate doctor ID
    if (!drID || (typeof drID !== 'number' && typeof drID !== 'string')) {
        logger.error("❌ Invalid doctor ID provided:", drID);
        return null;
    }
    
    // Validate date format (YYYY-MM-DD)
    if (!date || !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        logger.error("❌ Invalid date format provided:", date);
        toastService.error("Invalid date format");
        return null;
    }
    
    logger.debug("⏱️ Fetching doctor duration slots", { doctorID: drID, date });
    
    try {
        const response = await axiosInstance.get(
            `/sec/patient/getAppointmentPlanDuration/${drID}?date=${date}`
        );
        
        logger.debug("✅ Duration API response received", {
            hasDurations: !!response?.data?.response?.durations,
        });
        
        // Validate response structure
        if (!response?.data?.response?.durations) {
            logger.warn("⚠️ No durations found in response");
            return [];
        }
        
        // Extract duration values from response
        const duration = [];
        for (let key in response.data.response.durations) {
            const planDuration = response.data.response.durations[key]?.plan_duration;
            if (planDuration) {
                duration.push(planDuration);
            }
        }
        
        logger.debug("✅ Durations extracted successfully", {
            durationsCount: duration.length,
            durations: duration
        });
        
        return duration;
    } catch (err) {
        logger.error("❌ Failed to fetch durations:", err);
        toastService.error(
            err?.response?.data?.message || 
            "Failed to load available durations. Please try again."
        );
        return null;
    }
};

/**
 * Format date string to YYYY-MM-DD format
 * 
 * @param {string|Date} inputDateStr - Date string or Date object
 * @returns {string} Formatted date string in YYYY-MM-DD format
 * 
 * @example
 * const formatted = formatDate("2024-12-25T10:30:00");
 * // Returns: "2024-12-25"
 */
export function formatDate(inputDateStr) {
    // Validate input
    if (!inputDateStr) {
        logger.warn("⚠️ No date provided to formatDate");
        return "";
    }
    
    try {
        // Create a Date object from the input string
        const date = new Date(inputDateStr);
        
        // Validate date object
        if (isNaN(date.getTime())) {
            logger.error("❌ Invalid date string:", inputDateStr);
            return "";
        }
        
        // Extract year, month, and day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');
        
        // Format as "YYYY-MM-DD"
        const formatted = `${year}-${month}-${day}`;
        
        logger.debug("✅ Date formatted successfully", {
            input: inputDateStr,
            output: formatted
        });
        
        return formatted;
    } catch (error) {
        logger.error("❌ Error formatting date:", inputDateStr, error);
        return "";
    }
}

/**
 * Fetch selectable appointment packages for a doctor
 * 
 * @param {Object} data - Package selection data
 * @param {number|string} data.doctor_id - Doctor ID
 * @param {number} data.is_active - Active status (usually 1)
 * @param {string|number} data.duration - Appointment duration
 * @returns {Promise<Array|null>} Array of available packages or null on error
 * 
 * @example
 * const packages = await fetchSelectPackage({
 *     doctor_id: 123,
 *     is_active: 1,
 *     duration: "30"
 * });
 */
export const fetchSelectPackage = async (data) => {
    // Validate input data
    if (!data || typeof data !== 'object') {
        logger.error("❌ Invalid package data provided:", data);
        toastService.error("Invalid package selection data");
        return null;
    }
    
    if (!data.doctor_id || (typeof data.doctor_id !== 'number' && typeof data.doctor_id !== 'string')) {
        logger.error("❌ Invalid doctor ID in package data:", data.doctor_id);
        toastService.error("Invalid doctor ID");
        return null;
    }
    
    logger.debug("📦 Fetching selectable packages", {
        doctorID: data.doctor_id,
        duration: data.duration,
        isActive: data.is_active
    });
    
    try {
        const response = await axiosInstance.post(
            "/sec/patient/createAppointmentPackageSelect/",
            JSON.stringify({
                doctor_id: Number(data.doctor_id),
                is_active: data.is_active || 1,
                duration: data.duration
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        logger.debug("✅ Package API response received", {
            hasPlan: !!response?.data?.response?.plan,
            planLength: response?.data?.response?.plan?.length || 0,
        });
        
        // Validate response structure
        if (!response?.data?.response?.plan) {
            logger.warn("⚠️ No packages found in response");
            return [];
        }
        
        return response.data.response.plan;
    } catch (err) {
        logger.error("❌ Failed to fetch packages:", err);
        toastService.error(
            err?.response?.data?.message || 
            "Failed to load packages. Please try again."
        );
        return null;
    }
};