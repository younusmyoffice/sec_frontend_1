# React Best Practices Guide

## 1. Component Structure & Organization

### ✅ DO: Use Functional Components with Hooks
```javascript
// Good
const MyComponent = () => {
    const [state, setState] = useState(initialValue);
    return <div>{state}</div>;
};

// Avoid
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: initialValue };
    }
}
```

### ✅ DO: Extract Custom Hooks for Reusable Logic
```javascript
// Good - Extract business logic
const useSignupSelection = () => {
    const [selectedType, setSelectedType] = useState(USER_TYPES.PATIENT);
    // ... logic
    return { selectedType, handleSubmit, handleChange };
};

const SelectSignup = () => {
    const { selectedType, handleSubmit, handleChange } = useSignupSelection();
    return <div>...</div>;
};
```

## 2. State Management

### ✅ DO: Use Constants for Magic Strings
```javascript
// Good
const USER_TYPES = {
    PATIENT: "I am a Patient",
    DOCTOR: "I am a Doctor",
    HCF_ADMIN: "HCF Admin",
} as const;

// Avoid
if (radioVal === "I am a Patient") { ... }
```

### ✅ DO: Memoize Expensive Calculations
```javascript
// Good
const expensiveValue = useMemo(() => {
    return heavyCalculation(data);
}, [data]);

// Good
const handleClick = useCallback(() => {
    doSomething();
}, [dependency]);
```

## 3. Performance Optimization

### ✅ DO: Use React.memo for Expensive Components
```javascript
const ExpensiveComponent = React.memo(({ data }) => {
    return <div>{data}</div>;
});
```

### ✅ DO: Lazy Load Images
```javascript
<img 
    src="image.jpg" 
    alt="Description"
    loading="lazy" // Lazy load images
/>
```

### ✅ DO: Use useCallback for Event Handlers
```javascript
const handleClick = useCallback(() => {
    // handler logic
}, [dependencies]);
```

## 4. Error Handling

### ✅ DO: Replace alert() with Proper Error UI
```javascript
// Good
const [error, setError] = useState("");
const [showError, setShowError] = useState(false);

// In JSX
<Snackbar open={showError} onClose={handleErrorClose}>
    <Alert severity="error">{error}</Alert>
</Snackbar>

// Avoid
alert("Invalid option");
```

### ✅ DO: Use Try-Catch for Async Operations
```javascript
const handleSubmit = useCallback(async () => {
    try {
        await apiCall();
    } catch (error) {
        console.error("Error:", error);
        setError("Something went wrong");
    }
}, []);
```

## 5. Accessibility (a11y)

### ✅ DO: Add ARIA Labels and Roles
```javascript
// Good
<div role="main" aria-label="Sign up selection">
    <CustomRadioButton
        label="Select your account type"
        aria-label="User type selection"
    />
    <CustomButton
        aria-label="Continue to next step"
    />
</div>
```

### ✅ DO: Use Semantic HTML
```javascript
// Good
<main>
    <h1>Sign Up</h1>
    <form>
        <fieldset>
            <legend>Select Account Type</legend>
            // radio buttons
        </fieldset>
    </form>
</main>
```

## 6. Code Organization

### ✅ DO: Separate Concerns
```javascript
// constants.js
export const USER_TYPES = { ... };
export const ROUTES = { ... };

// hooks/useSignupSelection.js
export const useSignupSelection = () => { ... };

// components/SelectSignup.js
import { useSignupSelection } from '../hooks/useSignupSelection';
```

### ✅ DO: Use PropTypes or TypeScript
```javascript
// PropTypes
import PropTypes from 'prop-types';

MyComponent.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

// TypeScript (preferred)
interface Props {
    title: string;
    onClick?: () => void;
}
```

## 7. Testing Best Practices

### ✅ DO: Write Testable Components
```javascript
// Good - Easy to test
const SelectSignup = ({ onUserTypeSelect, initialType }) => {
    const [selectedType, setSelectedType] = useState(initialType);
    
    const handleSubmit = () => {
        onUserTypeSelect(selectedType);
    };
    
    return <div>...</div>;
};
```

## 8. Security Best Practices

### ✅ DO: Sanitize User Input
```javascript
// Good
const sanitizedValue = DOMPurify.sanitize(userInput);

// Good - Validate before processing
if (!validateSelection(selectedType)) {
    setError("Invalid selection");
    return;
}
```

## 9. Code Quality

### ✅ DO: Use ESLint and Prettier
```json
// .eslintrc.js
{
    "extends": ["react-app", "prettier"],
    "rules": {
        "no-console": "warn",
        "no-unused-vars": "error"
    }
}
```

### ✅ DO: Write Descriptive Variable Names
```javascript
// Good
const [selectedUserType, setSelectedUserType] = useState(USER_TYPES.PATIENT);

// Avoid
const [val, setVal] = useState(USER_TYPES.PATIENT);
```

## 10. Bundle Optimization

### ✅ DO: Use Dynamic Imports for Code Splitting
```javascript
// Good
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const App = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
    </Suspense>
);
```

## Key Improvements Made to Your Component:

1. **Extracted Constants**: Moved magic strings to constants
2. **Custom Hook**: Separated business logic into `useSignupSelection`
3. **Error Handling**: Replaced `alert()` with proper error UI
4. **Performance**: Added `useCallback` and `useMemo` for optimization
5. **Accessibility**: Added ARIA labels and semantic HTML
6. **Type Safety**: Added PropTypes
7. **Code Organization**: Better separation of concerns
8. **User Experience**: Better error messages and loading states

## Next Steps:

1. Replace the original component with the improved version
2. Add unit tests for the custom hook
3. Consider migrating to TypeScript for better type safety
4. Add integration tests for the complete flow
5. Implement proper loading states for navigation
