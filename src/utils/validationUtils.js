// Validation utility functions for booking appointment

export const validateStep = (step, data, questions = null) => {
    switch (step) {
        case 0: // Details step
            return validateDetailsStep(data);
        case 1: // Date & Time step
            return validateDateTimeStep(data);
        case 2: // Duration step
            return validateDurationStep(data);
        case 3: // Questions step
            return validateQuestionsStep(data, questions);
        case 4: // Payment step
            return validatePaymentStep(data);
        default:
            return { isValid: true, errors: [] };
    }
};

const validateDetailsStep = (data) => {
    const errors = [];
    
    if (!data.patient_type) {
        errors.push("Please select patient type");
    }
    
    if (!data.name || data.name.trim() === "") {
        errors.push("Full name is required");
    } else if (data.name.trim().length < 2) {
        errors.push("Full name must be at least 2 characters");
    }
    
    if (!data.gender) {
        errors.push("Please select gender");
    }
    
    if (!data.age) {
        errors.push("Please select age");
    } else if (data.age < 0 || data.age > 120) {
        errors.push("Please enter a valid age");
    }
    
    if (!data.problem || data.problem.trim() === "") {
        errors.push("Please describe your problem");
    } else if (data.problem.trim().length < 10) {
        errors.push("Problem description must be at least 10 characters");
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

const validateDateTimeStep = (data) => {
    const errors = [];
    
    if (!data.appointment_date) {
        errors.push("Please select an appointment date");
    }
    
    if (!data.duration) {
        errors.push("Please select appointment duration");
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

const validateDurationStep = (data) => {
    const errors = [];
    
    if (!data.appointment_time) {
        errors.push("Please select a time slot");
    }
    
    if (!data.doctor_fee_plan_id) {
        errors.push("Please select a package plan");
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

const validateQuestionsStep = (data, questions = null) => {
    const errors = [];
    
    // If no questions are provided or questions array is empty, skip validation
    if (!questions || questions.length === 0) {
        return {
            isValid: true,
            errors: []
        };
    }
    
    // Check if all required questions are answered
    const questionKeys = Object.keys(data).filter(key => key.startsWith('answer_'));
    const answeredQuestions = questionKeys.filter(key => data[key] && data[key].trim() !== '');
    
    // If there are questions but not all are answered
    if (questions.length > 0 && answeredQuestions.length !== questions.length) {
        const unansweredCount = questions.length - answeredQuestions.length;
        errors.push(`Please answer all questions (${unansweredCount} remaining)`);
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

const validatePaymentStep = (data) => {
    const errors = [];
    
    if (!data.payment_method_nonce) {
        errors.push("Please complete payment");
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

export const getStepTitle = (step) => {
    const titles = [
        "Patient Details",
        "Select Date & Time",
        "Choose Package",
        "Answer Questions",
        "Payment"
    ];
    return titles[step] || "Step";
};

export const getStepSubtitle = (step) => {
    const subtitles = [
        "Tell us about yourself and your health concern",
        "Pick a convenient date and time for your appointment",
        "Select the consultation package that suits your needs",
        "Help us understand your condition better",
        "Complete your payment to confirm the appointment"
    ];
    return subtitles[step] || "";
};

// Mobile number validation functions
export const validateMobileNumber = (mobile, countryCode = "+1") => {
    if (!mobile || mobile.trim() === "") {
        return { isValid: false, message: "Mobile number is required" };
    }
    
    // Clean the mobile number
    const cleanedMobile = cleanMobileNumber(mobile);
    
    // Basic length validation based on country code
    const minLength = getMinLengthForCountry(countryCode);
    const maxLength = getMaxLengthForCountry(countryCode);
    
    if (cleanedMobile.length < minLength) {
        return { 
            isValid: false, 
            message: `Mobile number must be at least ${minLength} digits` 
        };
    }
    
    if (cleanedMobile.length > maxLength) {
        return { 
            isValid: false, 
            message: `Mobile number must not exceed ${maxLength} digits` 
        };
    }
    
    // Check if it contains only digits
    if (!/^\d+$/.test(cleanedMobile)) {
        return { 
            isValid: false, 
            message: "Mobile number should contain only digits" 
        };
    }
    
    // Country-specific validation patterns
    const pattern = getValidationPattern(countryCode);
    if (pattern && !pattern.test(cleanedMobile)) {
        return { 
            isValid: false, 
            message: getMobileHelperText(countryCode) 
        };
    }
    
    return { isValid: true, message: "" };
};

export const cleanMobileNumber = (mobile) => {
    if (!mobile) return "";
    
    // Remove all non-digit characters
    return mobile.replace(/\D/g, "");
};

export const getMobileHelperText = (countryCode) => {
    const helperTexts = {
        "+1": "Enter a valid US/Canada mobile number (10 digits)",
        "+91": "Enter a valid Indian mobile number (10 digits)",
        "+44": "Enter a valid UK mobile number (10-11 digits)",
        "+61": "Enter a valid Australian mobile number (9 digits)",
        "+49": "Enter a valid German mobile number (10-11 digits)",
        "+33": "Enter a valid French mobile number (10 digits)",
        "+86": "Enter a valid Chinese mobile number (11 digits)",
        "+81": "Enter a valid Japanese mobile number (10-11 digits)",
        "+82": "Enter a valid Korean mobile number (10-11 digits)",
        "+55": "Enter a valid Brazilian mobile number (10-11 digits)"
    };
    
    return helperTexts[countryCode] || "Enter a valid mobile number";
};

// Helper functions for mobile validation
const getMinLengthForCountry = (countryCode) => {
    const minLengths = {
        "+1": 10,   // US/Canada
        "+91": 10,  // India
        "+44": 10,  // UK
        "+61": 9,   // Australia
        "+49": 10,  // Germany
        "+33": 10,  // France
        "+86": 11,  // China
        "+81": 10,  // Japan
        "+82": 10,  // Korea
        "+55": 10   // Brazil
    };
    
    return minLengths[countryCode] || 7;
};

const getMaxLengthForCountry = (countryCode) => {
    const maxLengths = {
        "+1": 10,   // US/Canada
        "+91": 10,  // India
        "+44": 11,  // UK
        "+61": 9,   // Australia
        "+49": 11,  // Germany
        "+33": 10,  // France
        "+86": 11,  // China
        "+81": 11,  // Japan
        "+82": 11,  // Korea
        "+55": 11   // Brazil
    };
    
    return maxLengths[countryCode] || 15;
};

const getValidationPattern = (countryCode) => {
    const patterns = {
        "+1": /^[2-9]\d{9}$/,           // US/Canada: starts with 2-9, 10 digits
        "+91": /^[6-9]\d{9}$/,          // India: starts with 6-9, 10 digits
        "+44": /^[1-9]\d{9,10}$/,       // UK: starts with 1-9, 10-11 digits
        "+61": /^[2-9]\d{8}$/,          // Australia: starts with 2-9, 9 digits
        "+49": /^[1-9]\d{9,10}$/,       // Germany: starts with 1-9, 10-11 digits
        "+33": /^[1-9]\d{8}$/,          // France: starts with 1-9, 9 digits
        "+86": /^1[3-9]\d{9}$/,         // China: starts with 1, second digit 3-9, 11 digits
        "+81": /^[789]\d{9,10}$/,       // Japan: starts with 7-9, 10-11 digits
        "+82": /^[1-9]\d{9,10}$/,       // Korea: starts with 1-9, 10-11 digits
        "+55": /^[1-9]\d{9,10}$/        // Brazil: starts with 1-9, 10-11 digits
    };
    
    return patterns[countryCode] || null;
};