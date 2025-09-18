import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomCountryCodeSelector from './CustomCountryCodeSelector';

// Mock the country service
jest.mock('../../api/services/countryService', () => ({
  getCountries: jest.fn(),
  transformCountriesData: jest.fn(),
  getFallbackCountries: jest.fn(),
}));

import countryService from '../../api/services/countryService';

// Mock API response
const mockApiResponse = {
  data: {
    response: {
      us: {
        name: "United States",
        iso2: "us",
        dialCode: "1",
        priority: 0,
        areaCodes: null
      },
      gb: {
        name: "United Kingdom",
        iso2: "gb", 
        dialCode: "44",
        priority: 0,
        areaCodes: null
      },
      in: {
        name: "India",
        iso2: "in",
        dialCode: "91", 
        priority: 0,
        areaCodes: null
      }
    }
  }
};

describe('CustomCountryCodeSelector', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue(mockApiResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default values', () => {
    render(<CustomCountryCodeSelector />);
    
    expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  test('fetches countries from API on mount', async () => {
    const mockCountries = [
      { code: "+1", name: "United States", flag: "🇺🇸", iso2: "US" },
      { code: "+44", name: "United Kingdom", flag: "🇬🇧", iso2: "GB" },
    ];
    
    countryService.getCountries.mockResolvedValue(mockApiResponse);
    countryService.transformCountriesData.mockReturnValue(mockCountries);
    
    render(<CustomCountryCodeSelector />);
    
    await waitFor(() => {
      expect(countryService.getCountries).toHaveBeenCalled();
      expect(countryService.transformCountriesData).toHaveBeenCalledWith(mockApiResponse);
    });
  });

  test('handles API error gracefully', async () => {
    const fallbackCountries = [
      { code: "+1", name: "United States", flag: "🇺🇸", iso2: "US" },
    ];
    
    countryService.getCountries.mockRejectedValue(new Error('API Error'));
    countryService.getFallbackCountries.mockReturnValue(fallbackCountries);
    
    render(<CustomCountryCodeSelector />);
    
    await waitFor(() => {
      // Should fallback to default countries
      expect(screen.getByText('+1')).toBeInTheDocument();
    });
  });

  test('calls onChange when country is selected', async () => {
    const mockOnChange = jest.fn();
    
    render(
      <CustomCountryCodeSelector 
        onChange={mockOnChange}
      />
    );
    
    await waitFor(() => {
      expect(screen.getByText('+1')).toBeInTheDocument();
    });
    
    // Simulate country selection
    const selectElement = screen.getByDisplayValue('+1');
    fireEvent.change(selectElement, { target: { value: '+44' } });
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('calls onChange when mobile number is entered', async () => {
    const mockOnChange = jest.fn();
    
    render(
      <CustomCountryCodeSelector 
        onChange={mockOnChange}
      />
    );
    
    await waitFor(() => {
      expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument();
    });
    
    const mobileInput = screen.getByLabelText(/mobile number/i);
    fireEvent.change(mobileInput, { target: { value: '1234567890' } });
    
    expect(mockOnChange).toHaveBeenCalled();
  });
});
