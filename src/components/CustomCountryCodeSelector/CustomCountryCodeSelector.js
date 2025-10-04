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
    const [countries, setCountries] = useState(() => {
        try {
            return countryService.getFallbackCountries() || [];
        } catch (error) {
            console.error("Error initializing fallback countries:", error);
            return [];
        }
    });
    const [selectedCountry, setSelectedCountry] = useState({
        code: defaultCountryCode,
        name: defaultCountryName,
        flag: defaultCountryFlag,
    });
    const [mobileNumber, setMobileNumber] = useState(value);
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Get country flag emoji based on ISO2 country code
    const getCountryFlag = useCallback((iso2Code) => {
        if (!iso2Code || iso2Code.length !== 2) {
            return "🌍";
        }
        
        // Convert ISO2 code to flag emoji using Unicode Regional Indicator Symbols
        const codePoints = iso2Code
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0));
        
        return String.fromCodePoint(...codePoints);
    }, []);

    // Fetch countries data from API using centralized service
    const fetchCountries = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await countryService.getCountries();
            const transformedCountries = countryService.transformCountriesData(response);
            
            // Validate that transformedCountries is an array and contains valid objects
            if (Array.isArray(transformedCountries) && transformedCountries.length > 0) {
                // Filter out any invalid country objects
                const validCountries = transformedCountries.filter(country => 
                    country && 
                    typeof country === 'object' && 
                    country.name && 
                    country.code
                );
                
                if (validCountries.length > 0) {
                    setCountries(validCountries);
                    
                    // Set default country if not already set
                    if (!selectedCountry.code || selectedCountry.code === defaultCountryCode) {
                        const defaultCountry = validCountries.find(
                            (country) => country.code === defaultCountryCode
                        ) || validCountries[0];
                        if (defaultCountry) {
                            setSelectedCountry(defaultCountry);
                        }
                    }
                } else {
                    // If no valid countries, use fallback
                    const fallbackCountries = countryService.getFallbackCountries();
                    setCountries(fallbackCountries);
                }
            } else {
                // If response is invalid, use fallback
                const fallbackCountries = countryService.getFallbackCountries();
                setCountries(fallbackCountries);
            }
        } catch (error) {
            console.error("Error fetching countries:", error);
            // Use fallback data from service
            const fallbackCountries = countryService.getFallbackCountries();
            setCountries(fallbackCountries);
        } finally {
            setIsLoading(false);
        }
    }, [defaultCountryCode, selectedCountry.code]);

    // Filter countries based on search query
    const filteredCountries = useMemo(() => {
        if (!searchQuery) return countries;
        return countries.filter((country) => {
            // Safely check if country and its properties exist
            if (!country) return false;
            const name = country.name || '';
            const code = country.code || '';
            return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   code.includes(searchQuery);
        });
    }, [countries, searchQuery]);

    // Handle country selection
    const handleCountrySelect = useCallback((country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
        setSearchQuery("");
        
        // Trigger onChange with the full mobile number including country code
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

    // Handle mobile number input
    const handleMobileNumberChange = useCallback((event) => {
        const value = event.target.value;
        setMobileNumber(value);
        
        // Trigger onChange with the full mobile number including country code
        const fullMobileNumber = selectedCountry.code + value;
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
        
        // Also trigger onInput if provided
        if (onInput) {
            onInput(event);
        }
    }, [selectedCountry, onChange, onInput]);

    // Load countries on component mount
    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    // Update mobile number when value prop changes
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
                {/* Country Code Selector */}
                <FormControl 
                    variant="standard" 
                    sx={{ 
                        minWidth: 30,
                        "& .MuiInput-root": {
                            height: "72px",
                            borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
                            "&:hover": {
                                borderBottom: "2px solid rgba(0, 0, 0, 0.87)",
                            },
                            "&.Mui-focused": {
                                borderBottom: "2px solid #1976d2",
                            }
                        }
                    }}
                >
                    <Select
                        value={selectedCountry.code}
                        onChange={(e) => {
                            const country = countries.find(c => c.code === e.target.value);
                            if (country) handleCountrySelect(country);
                        }}
                        onOpen={() => setIsDropdownOpen(true)}
                        onClose={() => setIsDropdownOpen(false)}
                        disabled={isDisabled}
                        displayEmpty
                        disableUnderline
                        renderValue={(selected) => (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1 }}>
                                <span>{selectedCountry.flag}</span>
                                {/* <span>{selectedCountry.code}</span> */}
                                {/* <KeyboardArrowDown sx={{ fontSize: 16 }} /> */}
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
                        {/* Search Input */}
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
                        
                        {/* Loading State */}
                        {isLoading && (
                            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                                <CircularProgress size={20} />
                            </Box>
                        )}
                        
                        {/* Country Options */}
                        {filteredCountries.map((country) => (
                            <MenuItem 
                                key={country.id || country.code} 
                                value={country.code}
                                sx={{ display: "flex", alignItems: "center", gap: 1, py: 1 }}
                            >
                                <span>{country.flag}</span>
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

                {/* Mobile Number Input */}
                <TextField
                    id={id}
                    label={label}
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    onInput={onInput}
                    placeholder={placeholder}
                    helperText={helperText}
                    error={error}
                    disabled={isDisabled}
                    variant="standard"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <MUIInputAdornment position="start">
                                <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                                    {selectedCountry.code}
                                </Typography>
                            </MUIInputAdornment>
                        ),
                    }}
                    sx={{
                        "& .MuiInput-root": {
                            height: "56px",
                        },
                        // Red error styling when error prop is true
                        "& .MuiFormHelperText-root": {
                            color: error ? "#d32f2f !important" : "inherit"
                        },
                        "& .MuiInput-root": {
                            height: "56px",
                            "&:before": {
                                borderBottom: error ? "2px solid #d32f2f !important" : "1px solid rgba(0, 0, 0, 0.42)"
                            },
                            "&:hover:not(.Mui-disabled):before": {
                                borderBottom: error ? "2px solid #d32f2f !important" : "2px solid rgba(0, 0, 0, 0.87)"
                            },
                            "&.Mui-focused:after": {
                                borderBottom: error ? "2px solid #d32f2f !important" : "2px solid #1976d2"
                            }
                        },
                        "& .MuiInputLabel-root": {
                            color: error ? "#d32f2f !important" : "inherit"
                        }
                    }}
                    {...props}
                />
            </Box>
        </Box>
    );
};

CustomCountryCodeSelector.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onInput: PropTypes.func,
    helperText: PropTypes.string,
    textcss: PropTypes.object,
    isDisabled: PropTypes.bool,
    placeholder: PropTypes.string,
    defaultCountryCode: PropTypes.string,
    defaultCountryName: PropTypes.string,
    defaultCountryFlag: PropTypes.string,
    error: PropTypes.bool,
    noSpacing: PropTypes.bool,
};

export default CustomCountryCodeSelector;
