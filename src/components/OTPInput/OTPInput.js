import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import './OTPInput.scss';

const CustomOTPInput = ({ 
    value, 
    onChange, 
    numInputs = 6, 
    placeholder = "•",
    className = "",
    size = "medium",
    variant = "default",
    disabled = false,
    error = false,
    success = false,
    autoFocus = true,
    ...props 
}) => {
    const [focusedIndex, setFocusedIndex] = useState(0);
    const inputRefs = useRef([]);

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return {
                    width: '36px',
                    height: '36px',
                    fontSize: '1.2rem',
                    gap: '6px'
                };
            case 'large':
                return {
                    width: '56px',
                    height: '56px',
                    fontSize: '1.8rem',
                    gap: '12px'
                };
            default:
                return {
                    width: '48px',
                    height: '48px',
                    fontSize: '1.5rem',
                    gap: '8px'
                };
        }
    };

    const sizeStyles = getSizeStyles();

    useEffect(() => {
        if (autoFocus && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [autoFocus]);

    const handleInputChange = (index, inputValue) => {
        if (inputValue.length > 1) {
            inputValue = inputValue.slice(-1);
        }

        // Ensure value is a string
        const currentValue = value || '';
        const newValue = currentValue.split('');
        newValue[index] = inputValue;
        const updatedValue = newValue.join('').slice(0, numInputs);
        
        if (onChange) {
            onChange(updatedValue);
        }

        // Auto-focus next input
        if (inputValue && index < numInputs - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !(value && value.length > index && value[index]) && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, numInputs);
        if (onChange) {
            onChange(pastedData);
        }
        
        // Focus the last filled input or the last input
        const lastFilledIndex = Math.min(pastedData.length - 1, numInputs - 1);
        inputRefs.current[lastFilledIndex]?.focus();
    };

    const getInputClassName = (index) => {
        let className = 'otp-input-field';
        
        if (focusedIndex === index) className += ' otp-input-field--focused';
        if (value && value.length > index && value[index]) className += ' otp-input-field--filled';
        if (error) className += ' otp-input-field--error';
        if (success) className += ' otp-input-field--success';
        if (disabled) className += ' otp-input-field--disabled';
        
        return className;
    };

    return (
        <Box className={`custom-otp-input custom-otp-input--${variant} custom-otp-input--${size} ${className}`}>
            <Box className="otp-input-container">
                {Array.from({ length: numInputs }).map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="1"
                        value={(value && value.length > index && value[index]) || ''}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(-1)}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={getInputClassName(index)}
                        style={{
                            width: sizeStyles.width,
                            height: sizeStyles.height,
                            fontSize: sizeStyles.fontSize,
                            marginRight: index < numInputs - 1 ? sizeStyles.gap : 0
                        }}
                        {...props}
                    />
                ))}
            </Box>
            
            {(error || success) && (
                <Typography 
                    variant="caption" 
                    className={`otp-input-message ${error ? 'otp-input-message--error' : 'otp-input-message--success'}`}
                >
                    {error ? 'Invalid OTP. Please try again.' : 'OTP verified successfully!'}
                </Typography>
            )}
        </Box>
    );
};

export default CustomOTPInput;
