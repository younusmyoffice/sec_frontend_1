/**
 * Logger Utility
 * Centralized logging with environment-based output
 */

const LOG_LEVELS = {
    NONE: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
};

const currentLevel = process.env.NODE_ENV === 'production' ? LOG_LEVELS.ERROR : LOG_LEVELS.DEBUG;

class Logger {
    /**
     * Log info messages (dev only)
     */
    info(...args) {
        if (currentLevel >= LOG_LEVELS.INFO) {
            console.log(`[INFO]`, ...args);
        }
    }

    /**
     * Log debug messages (dev only)
     */
    debug(...args) {
        if (currentLevel >= LOG_LEVELS.DEBUG) {
            console.log(`[DEBUG]`, ...args);
        }
    }

    /**
     * Log warnings (dev only)
     */
    warn(...args) {
        if (currentLevel >= LOG_LEVELS.WARN) {
            console.warn(`[WARN]`, ...args);
        }
    }

    /**
     * Log errors (always shown)
     */
    error(...args) {
        if (currentLevel >= LOG_LEVELS.ERROR) {
            console.error(`[ERROR]`, ...args);
        }
    }

    /**
     * Log with emoji for visual distinction
     */
    emoji(emoji, ...args) {
        if (currentLevel >= LOG_LEVELS.INFO) {
            console.log(`${emoji}`, ...args);
        }
    }
}

// Create singleton instance
const logger = new Logger();

export default logger;

