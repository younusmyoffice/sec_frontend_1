import React from 'react';
import OTPInput from 'react-otp-input';
import './OTPInput.scss';

const CustomOTPInput = ({ 
    value, 
    onChange, 
    numInputs = 6, 
    placeholder = "*",
    className = "",
    ...props 
}) => {
    return (
        <div className={`custom-otp-input ${className}`}>
            <OTPInput
                value={value}
                onChange={onChange}
                numInputs={numInputs}
                inputStyle={{
                    width: "45px",
                    height: "45px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    fontSize: "1.5rem",
                    fontWeight: "500",
                    textAlign: "center",
                    margin: "0 4px",
                    outline: "none",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
                containerStyle={{ 
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "20px"
                }}
                renderSeparator={<span style={{ width: "8px" }} />}
                renderInput={(inputProps) => (
                    <input 
                        {...inputProps} 
                        placeholder={placeholder}
                        style={{
                            ...inputProps.style,
                            '&:focus': {
                                borderColor: '#e72b49',
                                boxShadow: '0 0 0 2px rgba(231, 43, 73, 0.2)',
                            }
                        }}
                    />
                )}
                focusStyle={{
                    border: "2px solid #e72b49",
                    boxShadow: "0 0 0 3px rgba(231, 43, 73, 0.1)",
                }}
                {...props}
            />
        </div>
    );
};

export default CustomOTPInput;
