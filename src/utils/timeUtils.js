const convertTo12Hour = (time24) => {
    if (!time24) return "";
    
    // Extract time part if it's a datetime string
    const timeOnly = time24.includes('T') ? time24.split('T')[1] : time24;
    const [hours, minutes] = timeOnly.split(':');
    
    const hour = parseInt(hours);
    const minute = minutes || '00';
    
    if (hour === 0) {
        return `12:${minute} AM`;
    } else if (hour < 12) {
        return `${hour}:${minute} AM`;
    } else if (hour === 12) {
        return `12:${minute} PM`;
    } else {
        return `${hour - 12}:${minute} PM`;
    }
};

const isAppointmentTimeReached = (appointmentDate, appointmentTime, backendJoinStatus = null) => {
    // If backend already calculated join_status, use it as primary source
    if (backendJoinStatus !== null && backendJoinStatus !== undefined) {
        console.log("Using backend join_status:", backendJoinStatus);
        return backendJoinStatus === 1;
    }
    
    // Fallback to frontend calculation if backend status not available
    if (!appointmentDate || !appointmentTime) return false;
    
    try {
        // Determine timezone based on environment
        const isDevelopment = process.env.NODE_ENV === 'development' || process.env.REACT_APP_ENV === 'development';
        const now = new Date();
        
        let currentDate, currentTime;
        
        if (isDevelopment) {
            // Use local time for development
            currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format
            currentTime = now.toTimeString().split(' ')[0]; // HH:MM:SS format
            console.log("Frontend Development Mode: Using local time");
        } else {
            // Convert to IST timezone for production (same as backend)
            const istOffset = 5.5 * 60; // IST is UTC+5:30
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const istTime = new Date(utc + (istOffset * 60000));
            
            currentDate = istTime.toISOString().split('T')[0]; // YYYY-MM-DD format
            currentTime = istTime.toTimeString().split(' ')[0]; // HH:MM:SS format
            console.log("Frontend Production Mode: Using IST time");
        }
        
        // Parse appointment date and time
        const appointmentDateStr = appointmentDate.split('T')[0]; // Extract date part
        const appointmentTimeStr = appointmentTime.includes('T') 
            ? appointmentTime.split('T')[1].split('.')[0] // Extract time part and remove milliseconds
            : appointmentTime.split('.')[0]; // Remove milliseconds if present
        
        console.log("Current date:", currentDate, "Current time:", currentTime);
        console.log("Appointment date:", appointmentDateStr, "Appointment time:", appointmentTimeStr);
        
        // Check if it's the same date
        if (currentDate !== appointmentDateStr) {
            console.log("Date mismatch - appointment not today");
            return false;
        }
        
        // Compare times (HH:MM:SS format)
        const currentTimeMinutes = timeToMinutes(currentTime);
        const appointmentTimeMinutes = timeToMinutes(appointmentTimeStr);
        
        console.log("Current time in minutes:", currentTimeMinutes);
        console.log("Appointment time in minutes:", appointmentTimeMinutes);
        
        // Allow joining 5 minutes before the appointment time (matching backend logic)
        const timeDifference = appointmentTimeMinutes - currentTimeMinutes;
        const canJoin = timeDifference <= 5 && timeDifference >= -30; // 5 minutes before to 30 minutes after
        
        console.log("Time difference (minutes):", timeDifference);
        console.log("Can join:", canJoin);
        
        return canJoin;
    } catch (error) {
        console.error("Error checking appointment time:", error);
        return false;
    }
};

const timeToMinutes = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 60 + minutes + (seconds || 0) / 60;
};

export { convertTo12Hour, isAppointmentTimeReached };

