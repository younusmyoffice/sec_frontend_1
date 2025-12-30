import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
    Box,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    InputAdornment,
    CircularProgress,
    Typography,
    InputAdornment as MUIInputAdornment,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import countryService from "../../api/services/countryService";
import "./CustomCountryCodeSelector.scss";
import logger from "../../utils/logger";

/**
 * CustomCountryCodeSelector Component
 * 
 * A reusable component for selecting country codes and entering mobile numbers.
 * Features include:
 * - Country code dropdown with flags
 * - Searchable country list
 * - Fallback data for offline use
 * - Mobile number validation support
 * 
 * @param {string} id - Unique identifier for the mobile number input field
 * @param {string} label - Label text for the mobile number input (default: "Mobile Number")
 * @param {string} value - Current value of the mobile number input
 * @param {Function} onChange - Callback function when country or mobile changes
 * @param {Function} onInput - Callback function for input events
 * @param {string} helperText - Helper text displayed below the input (default: "Enter Valid Mobile Number")
 * @param {object} textcss - Custom CSS styles for the text field
 * @param {boolean} isDisabled - Whether the component is disabled
 * @param {string} placeholder - Placeholder text for the mobile input
 * @param {string} defaultCountryCode - Default country dialing code (default: "+1")
 * @param {string} defaultCountryName - Default country name (default: "United States")
 * @param {string} defaultCountryFlag - Default country flag emoji (default: "🇺🇸")
 * @param {boolean} error - Whether to show error state
 * @param {boolean} noSpacing - Disable default spacing between fields
 */
const CustomCountryCodeSelector = ({
    id,
    label = "Mobile Number",
    value = "",
    onChange,
    onInput,
    helperText = "Enter Valid Mobile Number",
    textcss = {},
    isDisabled = false,
    placeholder = "Mobile number",
    defaultCountryCode = "+1",
    defaultCountryName = "United States",
    defaultCountryFlag = "🇺🇸",
    error = false,
    noSpacing = false, // New prop to disable default spacing
    ...props
}) => {
    // Initialize countries with fallback data to ensure dropdown works immediately
    // This prevents the UI from being empty while fetching from API
    const [countries, setCountries] = useState(() => {
        try {
            return countryService.getFallbackCountries() || [];
        } catch (error) {
            logger.error("Error initializing fallback countries:", error);
            return [];
        }
    });
    
    // Track the currently selected country (default: United States)
    const [selectedCountry, setSelectedCountry] = useState({
        code: defaultCountryCode,
        name: defaultCountryName,
        flag: defaultCountryFlag,
    });
    
    // Track the mobile number input value
    const [mobileNumber, setMobileNumber] = useState(value);
    
    // Loading state while fetching countries from API
    const [isLoading, setIsLoading] = useState(false);
    
    // Track if the country dropdown is open
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Search query for filtering countries in the dropdown
    const [searchQuery, setSearchQuery] = useState("");

    /**
     * Get country flag emoji based on ISO2 country code
     * Converts ISO2 code (e.g., "US") to flag emoji (e.g., "🇺🇸")
     * Uses Unicode Regional Indicator Symbols (🇦-🇿)
     * 
     * @param {string} iso2Code - Two-letter ISO country code
     * @returns {string} Flag emoji or 🌍 as fallback
     */
    const getCountryFlag = useCallback((iso2Code) => {
        if (!iso2Code || iso2Code.length !== 2) {
            return "🌍"; // Global fallback emoji
        }
        
        // Convert ISO2 code to flag emoji using Unicode Regional Indicator Symbols
        // Each letter is mapped to a regional indicator symbol (🇦-🇿)
        // Example: "US" → "🇺" + "🇸" → "🇺🇸"
        const codePoints = iso2Code
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0)); // 127397 is the base for regional indicator symbols
        
        return String.fromCodePoint(...codePoints);
    }, []);

    /**
     * Fetch countries data from API using centralized service
     * - Attempts to get countries from API
     * - Falls back to hardcoded data if API fails
     * - Validates and filters the response
     * - Sets default country based on props
     */
    const fetchCountries = useCallback(async () => {
        setIsLoading(true);
        try {
            // Fetch countries from API endpoint
            const response = await countryService.getCountries();
            
            // Transform API response to component-friendly format
            const transformedCountries = countryService.transformCountriesData(response);
            
            // Validate that transformedCountries is an array and contains valid objects
            if (Array.isArray(transformedCountries) && transformedCountries.length > 0) {
                // Filter out any invalid country objects to prevent rendering errors
                const validCountries = transformedCountries.filter(country => 
                    country && 
                    typeof country === 'object' && 
                    country.name && 
                    country.code
                );
                
                if (validCountries.length > 0) {
                    setCountries(validCountries);
                    
                    // Set default country if not already set by user interaction
                    if (!selectedCountry.code || selectedCountry.code === defaultCountryCode) {
                        const defaultCountry = validCountries.find(
                            (country) => country.code === defaultCountryCode
                        ) || validCountries[0];
                        if (defaultCountry) {
                            setSelectedCountry(defaultCountry);
                        }
                    }
                } else {
                    // If no valid countries from API, use fallback
                    const fallbackCountries = countryService.getFallbackCountries();
                    setCountries(fallbackCountries);
                }
            } else {
                // If response is invalid or empty, use fallback
                const fallbackCountries = countryService.getFallbackCountries();
                setCountries(fallbackCountries);
            }
        } catch (error) {
            // Log error but don't crash - use fallback data instead
            logger.error("Error fetching countries:", error);
            const fallbackCountries = countryService.getFallbackCountries();
            setCountries(fallbackCountries);
        } finally {
            // Always stop loading spinner
            setIsLoading(false);
        }
    }, [defaultCountryCode, selectedCountry.code]);

    /**
     * Filter countries based on search query
     * Filters by country name or dialing code
     * Uses useMemo to prevent unnecessary re-computations
     */
    const filteredCountries = useMemo(() => {
        // If no search query, return all countries
        if (!searchQuery) return countries;
        
        // Filter countries by name or code (case-insensitive)
        return countries.filter((country) => {
            // Safely check if country and its properties exist
            if (!country) return false;
            const name = country.name || '';
            const code = country.code || '';
            
            // Match if search query is in country name or code
            return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   code.includes(searchQuery);
        });
    }, [countries, searchQuery]);

    /**
     * Handle country selection from dropdown
     * - Updates selected country state
     * - Closes the dropdown
     * - Clears search query
     * - Triggers onChange callback with full mobile number (code + number)
     */
    const handleCountrySelect = useCallback((country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
        setSearchQuery("");
        
        // Trigger onChange with the full mobile number including country code
        // Example: "+1" + "1234567890" = "+11234567890"
        const fullMobileNumber = country.code + mobileNumber;
        if (onChange) {
            onChange({
                target: {
                    value: fullMobileNumber,
                    countryCode: country.code,
                    countryName: country.name,
                    countryFlag: country.flag,
                }
            });
        }
    }, [mobileNumber, onChange]);

    /**
     * Handle mobile number input changes
     * - Updates mobile number state
     * - Limits input length based on selected country's requirements (from API or default)
     * - Triggers onChange with full mobile number (code + number)
     * - Also triggers onInput callback if provided
     */
    const handleMobileNumberChange = useCallback((event) => {
        const value = event.target.value;
        
        // Get maximum allowed length from selected country (from API) or use fallback
        const maxLength = selectedCountry.maxLength || 15;
        
        // Limit input to country-specific max length
        const limitedValue = value.length > maxLength ? value.slice(0, maxLength) : value;
        
        setMobileNumber(limitedValue);
        
        // Trigger onChange with the full mobile number including country code
        // This allows parent components to always have the complete number
        const fullMobileNumber = selectedCountry.code + limitedValue;
        if (onChange) {
            onChange({
                target: {
                    value: fullMobileNumber,
                    countryCode: selectedCountry.code,
                    countryName: selectedCountry.name,
                    countryFlag: selectedCountry.flag,
                }
            });
        }
        
        // Also trigger onInput if provided for additional handlers
        if (onInput) {
            onInput(event);
        }
    }, [selectedCountry, onChange, onInput]);

    /**
     * Load countries on component mount
     * Fetches from API or uses fallback data
     * Runs only once when component first renders
     */
    useEffect(() => {
        fetchCountries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty array ensures this runs only once on mount

    /**
     * Update mobile number when value prop changes from parent
     * Keeps the internal state in sync with external control
     */
    useEffect(() => {
        if (value !== mobileNumber) {
            setMobileNumber(value);
        }
    }, [value, mobileNumber]);

    return (
        <Box className="country-code-selector" sx={{ 
            width: "100%", 
            marginBottom: noSpacing ? 0 : "1.5rem", // Consistent spacing between fields
            ...textcss 
        }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                {/* ============================================ */}
                {/* Country Code Selector Dropdown */}
                {/* ============================================ */}
                <FormControl 
                    variant="standard" 
                    sx={{ 
                        minWidth: 30,
                        "& .MuiInput-root": {
                            height: "72px",
                            borderBottom: "1px solid #d32f2f",
                            "&:hover": {
                                borderBottom: "2px solid #d32f2f",
                            },
                            "&.Mui-focused": {
                                borderBottom: "2px solid rgb(210, 25, 105)",
                            }
                        }
                    }}
                >
                    <Select
                        value={selectedCountry.code}
                        onChange={(e) => {
                            // Find the country object and handle selection
                            const country = countries.find(c => c.code === e.target.value);
                            if (country) handleCountrySelect(country);
                        }}
                        onOpen={() => setIsDropdownOpen(true)}
                        onClose={() => setIsDropdownOpen(false)}
                        disabled={isDisabled}
                        displayEmpty
                        disableUnderline
                        renderValue={(selected) => (
                            // Display flag emoji and dialing code in the dropdown button
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1 }}>
                                <span style={{ fontSize: "20px" }}>{selectedCountry.flag}</span>
                                {/* <span style={{ fontSize: "16px", fontWeight: 500 }}>{selectedCountry.code}</span> */}
                            </Box>
                        )}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 300,
                                    width: 300,
                                },
                            },
                        }}
                    >
                        {/* Search input at the top of dropdown for filtering countries */}
                        <Box sx={{ p: 1, borderBottom: "1px solid #e0e0e0" }}>
                            <TextField
                                size="small"
                                placeholder="Search countries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                fullWidth
                                variant="standard"
                                InputProps={{
                                    disableUnderline: true,
                                }}
                            />
                        </Box>
                        
                        {/* Loading spinner while fetching countries from API */}
                        {isLoading && (
                            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                                <CircularProgress size={20} />
                            </Box>
                        )}
                        
                        {/* List of country options - filtered by search query */}
                        {filteredCountries.map((country) => (
                            <MenuItem 
                                key={country.id || country.code} 
                                value={country.code}
                                sx={{ display: "flex", alignItems: "center", gap: 1, py: 1 }}
                            >
                                {/* Flag emoji */}
                                <span>{country.flag}</span>
                                {/* Country name and dialing code */}
                                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {country.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {country.code}
                                    </Typography>
                                </Box>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* ============================================ */}
                {/* Mobile Number Input Field */}
                {/* ============================================ */}
                <TextField
                    id={id}
                    label={label}
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    onInput={onInput}
                    placeholder={placeholder}
                    error={error}
                    disabled={isDisabled}
                    variant="standard"
                    fullWidth
                    type="tel"
                    inputMode="numeric"
                    maxLength={selectedCountry.maxLength || 15}
                    onKeyPress={(e) => {
                        // Only allow numeric keys (0-9), Backspace, Delete, Arrow keys, Tab
                        const char = String.fromCharCode(e.which);
                        if (!/[0-9]/.test(char) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    InputLabelProps={{
                        // Control label position vertically
                        sx: {
                            // Current setting: Moves label up by 4px
                            // To move it UP: decrease the number (e.g., -8px, -12px)
                            // To move it DOWN: increase the number (e.g., -2px, 0px)
                            transform: "translateY(-4px) scale(0.75)",
                            
                            // Alternative method using 'top' property:
                            // top: "8px",   // Move label down
                            // top: "-8px",  // Move label up
                            // top: "0px",   // Default position
                        }
                    }}
                    InputProps={{
                        // Display selected country code as prefix
                        startAdornment: (
                            <MUIInputAdornment position="start">
                                <Typography variant="body2" color="text.secondary" sx={{ px: 1, 
                                 
                                    opacity: 0.6,
                                    transform: "translateY(10px)", // Change this to adjust vertical position
                                
                            }}>
                                    {selectedCountry.code}
                                </Typography>
                            </MUIInputAdornment>
                        ),
                    }}
                    sx={{
                        "& .MuiInput-root": {
                            height: "56px",
                        },
                        // Error state styling - red border and text when validation fails
                        "& .MuiFormHelperText-root": {
                            color: error ? "#d32f2f !important" : "inherit"
                        },
                        "& .MuiInput-root": {
                            height: "72px",
                            // Border styling: red for error, custom color for normal state
                            "&:before": {
                                borderBottom: error ? "2px solid #d32f2f !important" : "1px solid #e0e0e0)"
                            },
                            "&:hover:not(.Mui-disabled):before": {
                                borderBottom: error ? "2px solid #d32f2f !important" : "2px solid rgb(210, 25, 105)"
                            },
                            "&.Mui-focused:after": {
                                borderBottom: error ? "2px solid #d32f2f !important" : "2px solid #d32f2f"
                            }
                        },
                        // Label color changes to red when in error state
                        "& .MuiInputLabel-root": {
                            color: error ? "#d32f2f !important" : "inherit"
                        },
                        // Input value text positioning and styling
                        "& .MuiInputBase-input": {
                            // Adjust the actual input value text position
                            // paddingTop: "8px",    // Move value text down
                            // paddingBottom: "8px", // Move value text up
                            lineHeight: "normal", // Control vertical alignment
                            
                            "&::placeholder": {
                                // Adjust placeholder position vertically
                                opacity: 0.6,
                                transform: "translateY(10px)", // Change this to adjust vertical position
                                // Alternative options:
                                // transform: "translateY(-2px)", // Move placeholder up
                                // transform: "translateY(2px)",  // Move placeholder down
                            },
                        }
                    }}
                    {...props}
                />
            </Box>
        </Box>
    );
};

/**
 * PropTypes for CustomCountryCodeSelector
 * Validates all props passed to the component
 */
CustomCountryCodeSelector.propTypes = {
    /** Unique identifier for the mobile number input */
    id: PropTypes.string,
    
    /** Label text for the input field */
    label: PropTypes.string,
    
    /** Current value of the mobile number input */
    value: PropTypes.string,
    
    /** Callback function when country or mobile changes */
    onChange: PropTypes.func,
    
    /** Callback function for input events */
    onInput: PropTypes.func,
    
    /** Helper text displayed below the input */
    helperText: PropTypes.string,
    
    /** Custom CSS styles for the text field */
    textcss: PropTypes.object,
    
    /** Whether the component is disabled */
    isDisabled: PropTypes.bool,
    
    /** Placeholder text for the mobile input */
    placeholder: PropTypes.string,
    
    /** Default country dialing code (e.g., "+1") */
    defaultCountryCode: PropTypes.string,
    
    /** Default country name (e.g., "United States") */
    defaultCountryName: PropTypes.string,
    
    /** Default country flag emoji (e.g., "🇺🇸") */
    defaultCountryFlag: PropTypes.string,
    
    /** Whether to show error state (red border, error text) */
    error: PropTypes.bool,
    
    /** Disable default spacing between fields */
    noSpacing: PropTypes.bool,
};

export default CustomCountryCodeSelector;
