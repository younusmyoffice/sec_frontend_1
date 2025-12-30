/**
 * Toast Notification Service
 * Centralized toast notifications for user feedback
 */

import { toast } from 'react-toastify';
import logger from '../utils/logger';

class ToastService {
    /**
     * Show success notification
     */
    success(message, options = {}) {
        logger.info('Toast Success:', message);
        toast.success(message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            ...options,
        });
    }

    /**
     * Show error notification
     */
    error(message, options = {}) {
        logger.error('Toast Error:', message);
        toast.error(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            ...options,
        });
    }

    /**
     * Show warning notification
     */
    warn(message, options = {}) {
        logger.warn('Toast Warning:', message);
        toast.warn(message, {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            ...options,
        });
    }

    /**
     * Show info notification
     */
    info(message, options = {}) {
        logger.info('Toast Info:', message);
        toast.info(message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            ...options,
        });
    }

    /**
     * Show loading notification
     */
    loading(message) {
        return toast.loading(message, {
            position: 'top-right',
        });
    }

    /**
     * Update existing toast
     */
    update(toastId, message, type = 'success') {
        toast.update(toastId, {
            render: message,
            type: type,
            isLoading: false,
            autoClose: 3000,
        });
    }

    /**
     * Dismiss all toasts
     */
    dismissAll() {
        toast.dismiss();
    }
}

// Create singleton instance
const toastService = new ToastService();

export default toastService;

