import { useState, useCallback } from 'react';
import { validateStep } from '../utils/validationUtils';

export const useFormValidation = () => {
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateField = useCallback((field, value, step) => {
        const validation = validateStep(step, { [field]: value });
        return validation.errors.length > 0 ? validation.errors[0] : null;
    }, []);

    const validateStepData = useCallback((step, data, questions = null) => {
        const validation = validateStep(step, data, questions);
        setErrors(prev => ({
            ...prev,
            [step]: validation.errors
        }));
        return validation;
    }, []);

    const setFieldError = useCallback((step, field, error) => {
        setErrors(prev => ({
            ...prev,
            [step]: {
                ...prev[step],
                [field]: error
            }
        }));
    }, []);

    const clearFieldError = useCallback((step, field) => {
        setErrors(prev => ({
            ...prev,
            [step]: {
                ...prev[step],
                [field]: null
            }
        }));
    }, []);

    const clearStepErrors = useCallback((step) => {
        setErrors(prev => ({
            ...prev,
            [step]: []
        }));
    }, []);

    const setFieldTouched = useCallback((field) => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }));
    }, []);

    const isFieldTouched = useCallback((field) => {
        return touched[field] || false;
    }, [touched]);

    const getFieldError = useCallback((step, field) => {
        return errors[step]?.[field] || null;
    }, [errors]);

    const getStepErrors = useCallback((step) => {
        return errors[step] || [];
    }, [errors]);

    const hasStepErrors = useCallback((step) => {
        const stepErrors = errors[step];
        return stepErrors && stepErrors.length > 0;
    }, [errors]);

    const resetValidation = useCallback(() => {
        setErrors({});
        setTouched({});
    }, []);

    return {
        errors,
        touched,
        validateField,
        validateStepData,
        setFieldError,
        clearFieldError,
        clearStepErrors,
        setFieldTouched,
        isFieldTouched,
        getFieldError,
        getStepErrors,
        hasStepErrors,
        resetValidation
    };
};
