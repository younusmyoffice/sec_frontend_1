# API Configuration & Services

This directory contains centralized API configuration and service implementations for the application.

## 📁 Structure

```
src/api/
├── endpoints.js          # Centralized API endpoints configuration
├── services/
│   ├── index.js         # Service exports
│   └── countryService.js # Country-related API service
└── README.md            # This documentation
```

## 🎯 Benefits

- **Single Source of Truth**: All API endpoints in one place
- **Easy Maintenance**: Update endpoints without touching components
- **Environment Flexibility**: Easy switching between dev/staging/prod
- **Type Safety**: Centralized configuration reduces typos
- **Consistency**: Uniform API handling across the application

## 📖 Usage

### Using API Endpoints

```javascript
// Import specific endpoints
import { getCountryEndpoints, getAuthEndpoints } from '../api/endpoints';

// Get country endpoints
const countryEndpoints = getCountryEndpoints();
const countriesUrl = countryEndpoints.LIST; // `${baseURL}/sec/countries/codes`

// Get auth endpoints
const authEndpoints = getAuthEndpoints();
const loginUrl = authEndpoints.LOGIN; // `${baseURL}/auth/login`
```

### Using Services

```javascript
// Import services
import { countryService } from '../api/services';

// Use the service
const countries = await countryService.getCountries();
const searchResults = await countryService.searchCountries('United');
```

### Direct Endpoint Access

```javascript
// Import all endpoints
import { API_ENDPOINTS } from '../api/endpoints';

// Access specific endpoint
const countriesUrl = API_ENDPOINTS.COUNTRIES.LIST;
const loginUrl = API_ENDPOINTS.AUTH.LOGIN;
```

## 🔧 Configuration

### Base URL Configuration

The base URL is configured in `src/constants/const.js`:

```javascript
export const baseURL = "http://localhost:3000";
```

### Environment-Specific URLs

To use different URLs for different environments:

```javascript
// In constants/const.js
export const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3000";
```

Then set environment variables:
```bash
# Development
REACT_APP_API_URL=http://localhost:3000

# Staging
REACT_APP_API_URL=https://api-staging.yourapp.com

# Production
REACT_APP_API_URL=https://api.yourapp.com
```

## 🚀 Adding New Endpoints

### 1. Add to endpoints.js

```javascript
export const API_ENDPOINTS = {
  // ... existing endpoints
  NEW_FEATURE: {
    LIST: `${API_BASE}/new-feature/list`,
    CREATE: `${API_BASE}/new-feature/create`,
    UPDATE: `${API_BASE}/new-feature/update`,
    DELETE: `${API_BASE}/new-feature/delete`,
  },
};
```

### 2. Create Service (Optional)

```javascript
// src/api/services/newFeatureService.js
import axios from 'axios';
import { getEndpoint } from '../endpoints';

class NewFeatureService {
  constructor() {
    this.baseURL = getEndpoint('NEW_FEATURE', 'LIST');
  }

  async getList() {
    const response = await axios.get(this.baseURL);
    return response.data;
  }
}

export default new NewFeatureService();
```

### 3. Export from services/index.js

```javascript
export { default as newFeatureService } from './newFeatureService';
```

## 📝 Best Practices

1. **Always use centralized endpoints** - Don't hardcode URLs
2. **Use services for complex API logic** - Keep components clean
3. **Handle errors consistently** - Use try-catch in services
4. **Transform data in services** - Keep components focused on UI
5. **Document new endpoints** - Update this README when adding features

## 🔍 Examples

### Country Service Usage

```javascript
import { countryService } from '../api/services';

// In your component
const MyComponent = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await countryService.getCountries();
        setCountries(data);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        // Use fallback data
        setCountries(countryService.getFallbackCountries());
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      {countries.map(country => (
        <div key={country.iso2}>
          {country.flag} {country.name} {country.code}
        </div>
      ))}
    </div>
  );
};
```

### Direct Endpoint Usage

```javascript
import { getCountryEndpoints } from '../api/endpoints';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getCountryEndpoints().LIST);
        setData(response.data);
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchData();
  }, []);

  return <div>{/* Your component */}</div>;
};
```
