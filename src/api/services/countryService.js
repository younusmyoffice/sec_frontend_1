import axios from 'axios';
import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../endpoints';
import logger from '../../utils/logger';

/**
 * Country Service
 * 
 * Handles all country-related API calls including:
 * - Fetching country dialing codes
 * - Getting country information
 * - Searching countries
 */

class CountryService {
  constructor() {
    // Use COUNTRIES_CODES endpoint for fetching countries with dialing codes
    this.baseURL = API_ENDPOINTS.MASTER_DATA.COUNTRIES_CODES;
  }

  /**
   * Fetch all countries with dialing codes
   * @returns {Promise<Object>} Countries data
   */
  async getCountries() {
    try {
      // Use axiosInstance for authenticated requests, fallback to plain axios for public endpoints
      const response = await axiosInstance.get(this.baseURL);
      return response.data;
    } catch (error) {
      logger.error('Error fetching countries:', error);
      throw error;
    }
  }

  /**
   * Search countries by name or code
   * @param {string} query - Search query
   * @returns {Promise<Array>} Filtered countries
   */
  async searchCountries(query) {
    try {
      const response = await axiosInstance.get(this.baseURL, {
        params: { search: query }
      });
      return response.data;
    } catch (error) {
      logger.error('Error searching countries:', error);
      throw error;
    }
  }

  /**
   * Get country by ISO2 code
   * @param {string} iso2Code - ISO2 country code
   * @returns {Promise<Object>} Country data
   */
  async getCountryByCode(iso2Code) {
    try {
      const response = await axiosInstance.get(`${this.baseURL}/${iso2Code}`);
      return response.data;
    } catch (error) {
      logger.error('Error fetching country by code:', error);
      throw error;
    }
  }

  /**
   * Get country by dialing code
   * @param {string} dialCode - Country dialing code
   * @returns {Promise<Object>} Country data
   */
  async getCountryByDialCode(dialCode) {
    try {
      const response = await axiosInstance.get(this.baseURL, {
        params: { dialCode: dialCode }
      });
      return response.data;
    } catch (error) {
      logger.error('Error fetching country by dial code:', error);
      throw error;
    }
  }

  /**
   * Transform API response to component-friendly format
   * @param {Object} apiResponse - Raw API response
   * @returns {Array} Transformed countries array
   */
  transformCountriesData(apiResponse) {
    if (!apiResponse || !apiResponse.response) {
      return [];
    }

    return Object.entries(apiResponse.response).map(([key, country]) => ({
      code: `+${country.dialCode}`,
      name: country.name,
      iso2: country.iso2,
      flag: this.getCountryFlag(country.iso2),
      priority: country.priority || 0,
      areaCodes: country.areaCodes || null,
      // Add maxLength from API or use default
      maxLength: country.maxLength || country.maxDigits || this.getDefaultMaxLength(country.dialCode),
      minLength: country.minLength || country.minDigits || this.getDefaultMinLength(country.dialCode),
    }));
  }

  /**
   * Get default max length for a dial code
   * Fallback when API doesn't provide maxLength
   */
  getDefaultMaxLength(dialCode) {
    const maxLengths = {
      "1": 10,   // US/Canada
      "91": 10,  // India
      "44": 11,  // UK
      "61": 9,   // Australia
      "49": 11,  // Germany
      "33": 10,  // France
      "86": 11,  // China
      "81": 11,  // Japan
      "82": 11,  // Korea
      "55": 11,  // Brazil
    };
    return maxLengths[dialCode] || 15; // Default to 15 digits for unknown countries
  }

  /**
   * Get default min length for a dial code
   * Fallback when API doesn't provide minLength
   */
  getDefaultMinLength(dialCode) {
    const minLengths = {
      "1": 10,   // US/Canada
      "91": 10,  // India
      "44": 10,  // UK
      "61": 9,   // Australia
      "49": 10,  // Germany
      "33": 10,  // France
      "86": 11,  // China
      "81": 10,  // Japan
      "82": 10,  // Korea
      "55": 10,  // Brazil
    };
    return minLengths[dialCode] || 7; // Default to 7 digits for unknown countries
  }

  /**
   * Get country flag emoji based on ISO2 country code
   * @param {string} iso2Code - ISO2 country code
   * @returns {string} Flag emoji
   */
  getCountryFlag(iso2Code) {
    if (!iso2Code || iso2Code.length !== 2) {
      return "🌍";
    }

    const codePoints = iso2Code
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());

    return String.fromCodePoint(...codePoints);
  }

  /**
   * Get fallback countries for offline/error scenarios
   * @returns {Array} Fallback countries data
   */
  getFallbackCountries() {
    return [
      {
        code: "+1",
        name: "United States",
        iso2: "US",
        flag: this.getCountryFlag("US"),
        priority: 0,
        areaCodes: null,
        maxLength: 10,
        minLength: 10,
      },
      {
        code: "+44",
        name: "United Kingdom",
        iso2: "GB",
        flag: this.getCountryFlag("GB"),
        priority: 1,
        areaCodes: null,
        maxLength: 11,
        minLength: 10,
      },
      {
        code: "+91",
        name: "India",
        iso2: "IN",
        flag: this.getCountryFlag("IN"),
        priority: 2,
        areaCodes: null,
        maxLength: 10,
        minLength: 10,
      },
      {
        code: "+86",
        name: "China",
        iso2: "CN",
        flag: this.getCountryFlag("CN"),
        priority: 3,
        areaCodes: null,
        maxLength: 11,
        minLength: 11,
      },
      {
        code: "+49",
        name: "Germany",
        iso2: "DE",
        flag: this.getCountryFlag("DE"),
        priority: 4,
        areaCodes: null,
        maxLength: 11,
        minLength: 10,
      },
    ];
  }
}

// Create and export a singleton instance
const countryService = new CountryService();
export default countryService;

// Also export the class for testing purposes
export { CountryService };
