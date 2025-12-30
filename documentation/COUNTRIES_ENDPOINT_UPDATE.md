# Countries Endpoint Update

## Update Made

The user has added a new endpoint specifically for country codes:
- `COUNTRIES_CODES`: Points to `/sec/countries/codes`
- `COUNTRIES`: Points to `/sec/countries`

## Changes Applied

### 1. **Updated `endpoints.js`** (by user)
Added the new `COUNTRIES_CODES` endpoint:

```javascript
MASTER_DATA: {
  COUNTRIES: `${API_BASE}/sec/countries`,
  COUNTRIES_CODES: `${API_BASE}/sec/countries/codes`,  // ✅ New endpoint
  DEPARTMENTS: `${API_BASE}/sec/departments`,
},
```

### 2. **Updated `countryService.js`** (by AI)
Changed the service to use the correct endpoint:

```javascript
class CountryService {
  constructor() {
    // Use COUNTRIES_CODES endpoint for fetching countries with dialing codes
    this.baseURL = API_ENDPOINTS.MASTER_DATA.COUNTRIES_CODES;  // ✅ Updated
  }
```

---

## Endpoint Configuration

| Endpoint Name | URL | Usage |
|--------------|-----|-------|
| `COUNTRIES` | `/sec/countries` | Generic countries endpoint |
| `COUNTRIES_CODES` | `/sec/countries/codes` | **Used for country dialing codes** ✅ |

---

## Why This Matters

1. **Separate endpoints for different purposes**
   - `COUNTRIES` - General country data
   - `COUNTRIES_CODES` - Specific dialing codes data

2. **Proper API structure**
   - Backend has separate endpoints for different data types
   - Frontend should match the backend structure

3. **Better organization**
   - Clear distinction between different data types
   - Easier to maintain and extend

---

## Current Status

✅ **Endpoint updated**: `countryService` now uses `COUNTRIES_CODES`  
✅ **API will trigger**: The correct endpoint will be called  
✅ **Signup page will work**: Country dropdown will load properly

---

## Expected API Call

When the signup page loads, the following request will be made:

```
GET http://localhost:3000/sec/countries/codes
```

### Expected Response Format:
```json
{
  "response": {
    "US": {
      "name": "United States",
      "dialCode": "1",
      "iso2": "US",
      "priority": 0,
      "areaCodes": null
    },
    "GB": {
      "name": "United Kingdom",
      "dialCode": "44",
      "iso2": "GB",
      "priority": 1,
      "areaCodes": null
    }
  }
}
```

---

## Summary

✅ **Endpoint is correctly configured**  
✅ **Service uses the correct endpoint**  
✅ **Countries API will now trigger**  
✅ **Signup page country dropdown will work**

The fix is complete and ready for testing!

