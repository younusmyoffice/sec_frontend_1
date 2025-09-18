# Mobile Validation System - Reusable Guide

## Overview
This guide explains how to use the centralized mobile validation system across the entire application. The system provides consistent, country-specific mobile number validation with real-time feedback.

## Files Structure
```
src/
├── hooks/
│   └── useMobileValidation.js          # Main validation hook
├── utils/
│   └── validationUtils.js              # Validation utilities
├── components/
│   └── CustomCountryCodeSelector/      # Reusable component
└── docs/
    └── MobileValidationGuide.md        # This guide
```

## Quick Start

### 1. Import the Hook
```javascript
import { useMobileValidation } from "../../../hooks/useMobileValidation";
```

### 2. Use the Hook in Your Component
```javascript
const {
    mobile,
    countryCode,
    countryName,
    countryFlag,
    validationErrors,
    handleCountryCodeChange,
    handleMobileInput,
    validateMobile,
    getHelperText,
    isFormValid,
    getCleanMobileNumber
} = useMobileValidation("+1", 500); // Default country code, debounce delay
```

### 3. Use with CustomCountryCodeSelector
```javascript
<CustomCountryCodeSelector
    id="mobile-input"
    label="Mobile Number"
    value={mobile || ""}
    onChange={handleCountryCodeChange}
    onInput={handleMobileInput}
    helperText={getHelperText()}
    error={!validationErrors.mobile.isValid && validationErrors.mobile.message !== ""}
    placeholder="Mobile number"
    textcss={{ width: "19em" }}
    defaultCountryCode="+1"
    defaultCountryName="United States"
    defaultCountryFlag="🇺🇸"
/>
```

## Hook Parameters

### useMobileValidation(initialCountryCode, debounceDelay)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialCountryCode` | string | "+1" | Initial country code |
| `debounceDelay` | number | 500 | Debounce delay in milliseconds |

## Hook Returns

### State Values
| Property | Type | Description |
|----------|------|-------------|
| `mobile` | string | Current mobile number |
| `countryCode` | string | Current country code |
| `countryName` | string | Current country name |
| `countryFlag` | string | Current country flag emoji |
| `validationErrors` | object | Validation error states |

### Handlers
| Method | Parameters | Description |
|--------|------------|-------------|
| `handleCountryCodeChange` | event | Handles country code dropdown change |
| `handleMobileInput` | event | Handles mobile number input |
| `validateMobile` | (mobile?, countryCode?) | Validates mobile number immediately |

### Utility Functions
| Method | Returns | Description |
|--------|---------|-------------|
| `getHelperText` | string | Dynamic helper text with country info |
| `isFormValid` | boolean | Checks if mobile form is valid |
| `getCleanMobileNumber` | string | Returns cleaned mobile number |
| `resetValidation` | void | Resets validation state |
| `resetAll` | void | Resets all state |

### Computed Values
| Property | Type | Description |
|----------|------|-------------|
| `isMobileValid` | boolean | Is mobile number valid |
| `mobileErrorMessage` | string | Current error message |
| `canSubmit` | boolean | Can form be submitted |

## Supported Countries

| Country Code | Country | Required Length | Example |
|--------------|---------|----------------|---------|
| +1 | US/Canada | 10 digits | 1234567890 |
| +91 | India | 10 digits | 9876543210 |
| +44 | UK | 10-11 digits | 7123456789 |
| +86 | China | 11 digits | 13812345678 |
| +81 | Japan | 10-11 digits | 9012345678 |
| +49 | Germany | 10-12 digits | 15123456789 |
| +33 | France | 10 digits | 612345678 |
| +61 | Australia | 9 digits | 412345678 |

## Usage Examples

### Basic Usage
```javascript
import React from 'react';
import { useMobileValidation } from '../hooks/useMobileValidation';
import CustomCountryCodeSelector from '../components/CustomCountryCodeSelector';

const MyComponent = () => {
    const {
        mobile,
        countryCode,
        validationErrors,
        handleCountryCodeChange,
        handleMobileInput,
        getHelperText,
        isFormValid
    } = useMobileValidation();

    const handleSubmit = () => {
        if (isFormValid()) {
            console.log('Mobile:', mobile);
            console.log('Country Code:', countryCode);
            // Submit form
        }
    };

    return (
        <div>
            <CustomCountryCodeSelector
                value={mobile}
                onChange={handleCountryCodeChange}
                onInput={handleMobileInput}
                helperText={getHelperText()}
                error={!validationErrors.mobile.isValid}
            />
            <button 
                onClick={handleSubmit}
                disabled={!isFormValid()}
            >
                Submit
            </button>
        </div>
    );
};
```

### Advanced Usage with Form Integration
```javascript
import React, { useState, useEffect } from 'react';
import { useMobileValidation } from '../hooks/useMobileValidation';

const AdvancedForm = () => {
    const {
        mobile,
        countryCode,
        countryName,
        validationErrors,
        handleCountryCodeChange,
        handleMobileInput,
        validateMobile,
        getHelperText,
        isFormValid
    } = useMobileValidation("+91", 300); // India, 300ms debounce

    const [formData, setFormData] = useState({
        email: '',
        mobile: '',
        dialing_code: '+91',
        country_name: 'India'
    });

    // Sync mobile data with form data
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            mobile,
            dialing_code: countryCode,
            country_name: countryName
        }));
    }, [mobile, countryCode, countryName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate mobile before submission
        const mobileValidation = validateMobile();
        if (!mobileValidation.isValid) {
            alert(mobileValidation.message);
            return;
        }

        // Submit to API
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            // Handle response
        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CustomCountryCodeSelector
                value={mobile}
                onChange={handleCountryCodeChange}
                onInput={handleMobileInput}
                helperText={getHelperText()}
                error={!validationErrors.mobile.isValid}
            />
            <button type="submit" disabled={!isFormValid()}>
                Submit
            </button>
        </form>
    );
};
```

## Migration Guide

### From Custom Validation to useMobileValidation

#### Before (Custom Validation)
```javascript
const [mobile, setMobile] = useState("");
const [countryCode, setCountryCode] = useState("+1");
const [validationErrors, setValidationErrors] = useState({
    mobile: { isValid: true, message: "" }
});

const validateMobile = (mobile) => {
    // Custom validation logic
};

const handleCountryCodeChange = (event) => {
    // Custom handler logic
};
```

#### After (useMobileValidation)
```javascript
const {
    mobile,
    countryCode,
    validationErrors,
    handleCountryCodeChange,
    handleMobileInput,
    validateMobile,
    getHelperText,
    isFormValid
} = useMobileValidation();
```

## Best Practices

1. **Always use the hook** instead of custom validation
2. **Set appropriate debounce delay** (300-500ms for better UX)
3. **Use getHelperText()** for dynamic helper text
4. **Check isFormValid()** before form submission
5. **Use getCleanMobileNumber()** for API calls
6. **Handle validation errors** with proper UI feedback

## Troubleshooting

### Common Issues

1. **Validation not working**: Ensure you're using `handleMobileInput` for input events
2. **Country not updating**: Make sure to use `handleCountryCodeChange` for country changes
3. **Helper text not showing**: Use `getHelperText()` instead of static text
4. **Form not submitting**: Check `isFormValid()` before submission

### Debug Tips

```javascript
// Add debug logging
console.log('Mobile:', mobile);
console.log('Country Code:', countryCode);
console.log('Is Valid:', validationErrors.mobile.isValid);
console.log('Error Message:', validationErrors.mobile.message);
console.log('Can Submit:', isFormValid());
```

## API Integration

The hook provides cleaned mobile numbers ready for API calls:

```javascript
// For API calls, use getCleanMobileNumber()
const apiData = {
    mobile: getCleanMobileNumber(),
    dialing_code: countryCode,
    country_name: countryName
};
```

This ensures consistent data format across all API calls.
