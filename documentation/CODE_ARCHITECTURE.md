# Code Architecture: Share-e-care Frontend

## 🏗️ Architecture Overview

This project follows a **multi-layered, module-based architecture** with clear separation of concerns. The codebase is organized by features (modules) rather than by technical layers, making it scalable and maintainable.

---

## 📐 Architectural Patterns

### 1. **Module-Based Architecture**

The codebase is organized by **user roles** (modules), each containing its complete feature set:

```
src/
├── Auth/                    # Authentication module
├── PatientModule/           # Patient features (entire module)
├── DoctorModule/            # Doctor features (entire module)
├── HCFModule/              # Healthcare Facility features
├── SuperAdminModule/         # Admin features
├── components/              # Shared UI components (cross-module)
├── config/                  # Configuration layer
├── constants/                # Constants layer
├── hooks/                   # Custom hooks layer
├── services/                # Business logic layer
└── utils/                   # Utility functions layer
```

**Key Principle**: Each module is self-contained with its own components, styles, and logic.

---

### 2. **Layered Architecture**

#### **Layer 1: Presentation Layer (UI Components)**
- **Location**: `src/PatientModule/`, `src/DoctorModule/`, etc.
- **Responsibility**: UI rendering, user interaction
- **Pattern**: Functional components with hooks

```javascript
// Example from Explore.js
const Explore = () => {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchDataNew = async () => {
        try {
            const response = await axiosInstance.get("/sec/patient/DashboardDoctordetail");
            setCardData(response?.data?.response);
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchDataNew();
    }, []);
    
    return <div>...</div>;
};
```

#### **Layer 2: State Management Layer**
- **Pattern**: Redux for global state + React hooks for local state
- **Location**: `src/reducers/`, `src/store/`

```javascript
// Global state store
import { legacy_createStore as createStore } from "redux";
import rootReducer from "../reducers";

export default function configStore() {
    return {
        ...createStore(rootReducer),
    };
}
```

#### **Layer 3: Service Layer (API Integration)**
- **Location**: `src/api/services/`
- **Responsibility**: API calls, data transformation
- **Pattern**: Axios with interceptors

```javascript
// axiosInstance.js - Centralized API configuration
axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }
);
```

#### **Layer 4: Configuration Layer**
- **Location**: `src/config/`, `src/constants/`
- **Responsibility**: App-wide configuration

#### **Layer 5: Utility Layer**
- **Location**: `src/utils/`, `src/hooks/`
- **Responsibility**: Reusable functions, custom hooks

```javascript
// Custom hook for authentication
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Authentication logic...
    
    return {
        user,
        isAuthenticated,
        logout,
        refreshUser,
    };
};
```

---

## 🔄 Data Flow Architecture

### **Request Flow** (Top-to-Bottom)

```
Component (UI)
    ↓
Custom Hook / State Management
    ↓
Service Layer (API calls)
    ↓
Axios Instance (with interceptors)
    ↓
API Endpoint (Backend)
```

### **Response Flow** (Bottom-to-Top)

```
API Response
    ↓
Axios Interceptor (token refresh, error handling)
    ↓
Service Layer (data transformation)
    ↓
State Update (React state / Redux)
    ↓
Component Re-render
```

---

## 🎯 Design Patterns Used

### 1. **Container/Presentational Pattern**

```javascript
// Presentational Component (reusable)
const DoctorCard = ({ DrData, onClick }) => {
    return (
        <Box onClick={onClick}>
            <img src={DrData.profile_picture} />
            <Typography>{DrData.name}</Typography>
        </Box>
    );
};

// Container Component (logic + state)
const Explore = () => {
    const [doctors, setDoctors] = useState([]);
    
    useEffect(() => {
        // Fetch data
    }, []);
    
    return doctors.map(doctor => (
        <DoctorCard DrData={doctor} />
    ));
};
```

### 2. **Higher-Order Components (HOC) Pattern**

```javascript
// Authentication HOC
export const PatientAuthentication = ({ children }) => {
    const hasValidToken = isTokenValid();
    if (!hasValidToken) {
        return <Navigate to={"/"} />;
    }
    return children;
};

// Usage in routing
<Route path="/patientDashboard">
    <PatientAuthentication>
        <PatientDashboard />
    </PatientAuthentication>
</Route>
```

### 3. **Custom Hooks Pattern**

Encapsulate reusable logic:

```javascript
// Authentication hook
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        // Check authentication
    }, []);
    
    return { user, isAuthenticated, logout };
};

// Usage
const MyComponent = () => {
    const { user, logout } = useAuth();
    return <button onClick={logout}>Logout</button>;
};
```

### 4. **Facade Pattern (Service Layer)**

```javascript
// Simplified interface for complex operations
import { logoutUser, forceLogout } from '../api/services/authService';

export const useAuth = () => {
    const logout = async () => {
        const result = await logoutUser();
        // Handle result...
    };
};
```

---

## 🔐 Authentication & Authorization Architecture

### **Multi-Layer Security**

1. **Route Guards** (`RequireAuthentication.js`)
   - Check cookies + JWT token validity
   - Redirect to login if unauthorized

2. **JWT Token Management** (`jwtUtils.js`)
   - Token storage in localStorage
   - Automatic token refresh
   - Token expiration checking

3. **Axios Interceptors** (`axiosInstance.js`)
   - Auto-add JWT tokens to requests
   - Handle 401 errors (auto-refresh token)
   - Automatic retry on token refresh

```javascript
// Authentication flow
1. User logs in → Get JWT token
2. Token stored in localStorage
3. All API requests include Bearer token
4. Backend validates token
5. If expired → Try refresh token
6. If refresh fails → Redirect to login
```

---

## 🎨 Component Architecture

### **Component Hierarchy**

```
App (Root)
  ├── ThemeProvider (MUI theme)
  ├── ClearCache (HOC)
  └── AppRouter
        ├── Public Routes
        │   ├── Login
        │   ├── Signup
        │   └── Landing Page
        │
        └── Protected Routes
            ├── PatientAuthentication
            │   └── PatientModule/
            ├── DoctorAuthentication
            │   └── DoctorModule/
            ├── HealthCareAuthentication
            │   └── HCFModule/
            └── SuperAdminAuthentication
                └── SuperAdminModule/
```

### **Component Types**

1. **Smart Components** (Container Components)
   - Manage state
   - Make API calls
   - Example: `Explore.js`, `PatientDashboard.js`

2. **Dumb Components** (Presentational Components)
   - Receive props, display data
   - Example: `DoctorCard.js`, `CustomButton.js`

3. **Shared Components** (`src/components/`)
   - Reusable across all modules
   - Example: `Navbar`, `PageLoader`, `OTPInput`

---

## 🔄 State Management Architecture

### **State Layers**

1. **Local State** (React Hooks)
   ```javascript
   const [doctors, setDoctors] = useState([]);
   const [loading, setLoading] = useState(false);
   ```

2. **Context State** (React Context)
   ```javascript
   const { user } = useAuthentication(); // from UserProvider
   ```

3. **Global State** (Redux)
   ```javascript
   import { useSelector } from 'react-redux';
   const userData = useSelector(state => state.user);
   ```

4. **Persistent State** (localStorage)
   ```javascript
   localStorage.setItem('access_token', token);
   ```

### **State Flow Pattern**

```
Component triggers action
    ↓
Fetch data (API call)
    ↓
Update local state (useState)
    ↓
Re-render component
    ↓
Display new data
```

---

## 📡 API Integration Architecture

### **Axios Instance Pattern**

```javascript
// Single axios instance with interceptors
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

// Request interceptor: Add JWT token
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor: Handle 401 errors
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            // Try refresh token
            const success = await refreshToken();
            if (success) {
                // Retry original request
                return axiosInstance(error.config);
            } else {
                // Redirect to login
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
```

### **API Service Pattern**

```javascript
// Organized service functions
api/
  services/
    ├── authService.js       // Authentication APIs
    ├── patientService.js     // Patient APIs
    ├── doctorService.js      // Doctor APIs
    └── hcfService.js         // HCF APIs
```

---

## 🛡️ Error Handling Architecture

### **Multi-Level Error Handling**

1. **Component Level** (Try-catch in components)
   ```javascript
   try {
       const response = await axiosInstance.get("/api/data");
       setData(response.data);
   } catch (error) {
       console.error("Error:", error);
       // Show error toast
   }
   ```

2. **Interceptor Level** (Axios interceptors)
   ```javascript
   axiosInstance.interceptors.response.use(
       response => response,
       error => {
           if (error.response?.status === 401) {
               // Handle unauthorized
           }
           return Promise.reject(error);
       }
   );
   ```

3. **Global Level** (Error boundaries)
   ```javascript
   // React Error Boundary for catching component errors
   ```

---

## 🎭 Styling Architecture

### **SCSS Organization**

```
Component/
  ├── Component.js           # Component logic
  ├── Component.scss          # Component styles
  └── index.js                # Export
```

### **Styling Approach**
- **SCSS Modules**: Component-scoped styles
- **BEM Naming**: Block-Element-Modifier
- **Responsive**: Mobile-first approach

---

## 🧩 Module Independence

### **Module Structure**

Each module is **self-contained**:

```
PatientModule/
  ├── Explore/
  │   ├── Explore.js          # Component
  │   ├── Explore.scss        # Styles
  │   └── Crousal.js          # Sub-components
  ├── PatientDashboard/
  ├── PatientAppointment/
  └── Profile/
```

**Key Principle**: 
- ✅ Modules share **components** (`src/components/`)
- ✅ Modules share **utilities** (`src/utils/`)
- ✅ Modules **don't depend on other modules**

---

## 🔧 Build & Configuration Architecture

### **Webpack Configuration**
- **Environment-based builds**: Dev, Stage, Prod
- **Code splitting**: Lazy loading modules
- **Hot module replacement**: Fast development

```javascript
// webconfig/webpack.dev.config.js
module.exports = {
    mode: 'development',
    devServer: {
        hot: true,
        port: 8000,
    }
};
```

---

## 📊 Code Quality Architecture

### **Linting & Formatting**
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Jest**: Unit testing

### **Code Organization Principles**

1. **Single Responsibility**: Each file/component has one job
2. **DRY (Don't Repeat Yourself)**: Reusable components
3. **KISS (Keep It Simple)**: Simple, readable code
4. **Separation of Concerns**: Clear layer boundaries

---

## 🚀 Performance Architecture

### **Optimization Strategies**

1. **Lazy Loading** (Code splitting)
   ```javascript
   const ManageDashboard = lazy(() => 
       import("./PatientModule/PatientManage/ManageDashboard")
   );
   ```

2. **Memoization** (React.memo, useMemo)
3. **Virtual Scrolling** (Large lists)
4. **Image Optimization** (Lazy loading, CDN)

---

## 📈 Scalability Architecture

### **Why This Architecture Scales**

1. **Module-Based**: Easy to add new features
2. **Layered**: Easy to modify specific layers
3. **Reusable**: Shared components reduce duplication
4. **Separation**: Clear boundaries enable parallel development

### **Adding a New Feature**

```
1. Create folder in appropriate module
   PatientModule/NewFeature/

2. Add route in AppRouter.js
   <Route path="/new-feature" element={<NewFeature />} />

3. Create components
   NewFeature/NewFeature.js
   NewFeature/NewFeature.scss

4. Use existing utilities
   utils/, hooks/, services/
```

---

## ✅ Summary

This architecture provides:
- ✅ **Maintainability**: Clear structure
- ✅ **Scalability**: Easy to extend
- ✅ **Testability**: Separated concerns
- ✅ **Security**: Multi-layer authentication
- ✅ **Performance**: Optimized loading
- ✅ **Developer Experience**: Hooks, utilities, reusable components

The codebase follows **industry best practices** for React applications with a focus on **separation of concerns**, **reusability**, and **security**.

