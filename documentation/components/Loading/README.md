# Universal Loading Component

A flexible, reusable loading component that supports multiple display modes and use cases.

## Features

✅ **4 Display Modes**: inline, overlay, standalone, minimal  
✅ **Configurable Sizes**: small, medium, large  
✅ **Custom Messages**: Primary and secondary message support  
✅ **Material-UI Integration**: Uses MUI CircularProgress  
✅ **Accessible**: Proper ARIA labels and keyboard navigation  
✅ **Performance Optimized**: Conditional rendering, minimal re-renders  

---

## Installation

```jsx
import { Loading } from "../components/Loading";
// or
import Loading from "../components/Loading";
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'inline' \| 'overlay' \| 'standalone' \| 'minimal'` | `'inline'` | Display mode |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Spinner size |
| `message` | `string` | `''` | Primary message text |
| `subMessage` | `string` | `''` | Secondary message text |
| `fullScreen` | `boolean` | `false` | Full-screen overlay mode |
| `color` | `string` | `'primary'` | Spinner color (MUI theme) |
| `thickness` | `number` | `4` | Spinner stroke thickness |
| `disableBackdrop` | `boolean` | `false` | Disable backdrop on overlay |
| `zIndex` | `number` | `1000` | Z-index for overlay |
| `className` | `string` | `''` | Additional CSS class |

---

## Usage Examples

### 1. Inline Loading (Buttons, Small Spaces)

```jsx
import { Loading } from "../components/Loading";

const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    return (
        <button 
            onClick={() => setIsLoading(true)} 
            disabled={isLoading}
        >
            {isLoading ? (
                <Loading variant="inline" size="small" />
            ) : (
                "Submit"
            )}
        </button>
    );
};
```

### 2. Overlay Loading (Full-Screen, Critical Operations)

```jsx
import { Loading } from "../components/Loading";

const SignupForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await api.register(data);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            {isLoading && (
                <Loading
                    variant="overlay"
                    size="large"
                    message="Registering Your Account"
                    subMessage="Please wait while we process your request..."
                    fullScreen
                />
            )}
            
            <form onSubmit={handleSubmit}>
                {/* form fields */}
            </form>
        </>
    );
};
```

### 3. Standalone Loading (Content Areas, Data Fetching)

```jsx
import { Loading } from "../components/Loading";

const DataList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.getData();
            setData(result);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    
    if (isLoading) {
        return (
            <Loading
                variant="standalone"
                message="Loading Data..."
                subMessage="Please wait..."
            />
        );
    }
    
    return (
        <div>
            {data.map(item => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
};
```

### 4. Minimal Loading (Just Spinner)

```jsx
import { Loading } from "../components/Loading";

const StatusIndicator = () => {
    return (
        <div>
            Processing <Loading variant="minimal" size="small" />
        </div>
    );
};
```

### 5. Custom Colors

```jsx
import { Loading } from "../components/Loading";

const CustomLoader = () => {
    return (
        <>
            {/* Success color */}
            <Loading 
                variant="inline" 
                color="success" 
                size="small" 
            />
            
            {/* Error color */}
            <Loading 
                variant="inline" 
                color="error" 
                size="small" 
            />
            
            {/* Custom hex color */}
            <Loading 
                variant="inline" 
                color="#ff6b9d" 
                size="small" 
            />
        </>
    );
};
```

---

## Variants Explained

### 1. `inline`
Best for: Buttons, form fields, small spaces  
Automatically sizes: 20px (small), 24px (medium), 32px (large)

```jsx
<Loading variant="inline" size="small" />
```

### 2. `overlay`
Best for: Blocking overlays during critical operations  
Automatically sizes: 40px (small), 60px (medium), 80px (large)  
Requires `fullScreen` prop for full-page blocking

```jsx
{isLoading && (
    <Loading
        variant="overlay"
        size="large"
        message="Processing..."
        fullScreen
    />
)}
```

### 3. `standalone`
Best for: Centered content areas, data fetching  
Automatically sizes: 40px (small), 60px (medium), 80px (large)

```jsx
<Loading
    variant="standalone"
    message="Loading..."
    subMessage="Please wait..."
/>
```

### 4. `minimal`
Best for: Just the spinner, no wrapper or text  
Automatically sizes: 20px (small), 24px (medium), 32px (large)

```jsx
<Loading variant="minimal" size="small" />
```

---

## Real-World Examples

### Authentication Pages

```jsx
// SignupPage.js
import { Loading } from "../components/Loading";

const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchData = async () => {
        setIsLoading(true);
        try {
            await axiosInstance.post('/auth/register', data);
            toastService.success("Registered successfully!");
        } catch (error) {
            toastService.error("Registration failed");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            {isLoading && (
                <Loading
                    variant="overlay"
                    size="large"
                    message="Registering Your Account"
                    subMessage="Please wait while we register your details..."
                    fullScreen
                />
            )}
            {/* form */}
        </>
    );
};
```

### Data Fetching

```jsx
// UserProfile.js
import { Loading } from "../components/Loading";

const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    
    useEffect(() => {
        const fetchProfile = async () => {
            const data = await api.getProfile();
            setProfile(data);
            setIsLoading(false);
        };
        fetchProfile();
    }, []);
    
    if (isLoading) {
        return (
            <Loading
                variant="standalone"
                message="Loading Profile..."
                subMessage="Fetching your information..."
            />
        );
    }
    
    return <div>{/* render profile */}</div>;
};
```

### Button with Loading State

```jsx
// CustomButton.js
import { Loading } from "../components/Loading";

const CustomButton = ({ isLoading, onClick, children }) => {
    return (
        <button onClick={onClick} disabled={isLoading}>
            {isLoading ? (
                <>
                    <Loading variant="inline" size="small" />
                    Processing...
                </>
            ) : (
                children
            )}
        </button>
    );
};
```

---

## Styling

The component uses Material-UI's `sx` prop for styling. You can override styles:

```jsx
<Loading
    variant="overlay"
    sx={{
        // Custom styles
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    }}
/>
```

---

## Best Practices

### 1. Always Use Finally Block
```jsx
try {
    await api.call();
} catch (error) {
    // handle error
} finally {
    setIsLoading(false); // Always stop loading
}
```

### 2. Provide Clear Messages
```jsx
// ✅ Good
<Loading message="Saving changes..." subMessage="Please wait..." />

// ❌ Bad
<Loading message="Loading..." />
```

### 3. Use Appropriate Variants
```jsx
// ✅ Button loading
<Loading variant="inline" size="small" />

// ✅ Full-page blocking
<Loading variant="overlay" fullScreen />

// ✅ Content area
<Loading variant="standalone" />
```

### 4. Conditional Rendering
```jsx
// ✅ Good - only renders when needed
{isLoading && <Loading ... />}

// ❌ Bad - always renders
<Loading open={isLoading} ... />
```

---

## Migration from VerificationLoader

If you're using `VerificationLoader`, migrate to `Loading`:

**Before**:
```jsx
import VerificationLoader from "../components/VerificationLoader";

<VerificationLoader
    open={isLoading}
    title="Processing"
    message="Please wait..."
/>
```

**After**:
```jsx
import { Loading } from "../components/Loading";

{isLoading && (
    <Loading
        variant="overlay"
        message="Processing"
        subMessage="Please wait..."
        fullScreen
    />
)}
```

---

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Respects `prefers-reduced-motion`

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Troubleshooting

### Spinner not showing?
- Check if `isLoading` state is actually `true`
- Verify conditional rendering syntax: `{isLoading && <Loading ... />}`

### Overlay not full-screen?
- Add `fullScreen` prop
- Check z-index conflicts

### Messages not displaying?
- Ensure `message` and `subMessage` props are strings
- Check if they're empty strings (won't render)

---

## Related Components

- `VerificationLoader` - Complex verification dialogs
- `CustomCircularProgress` - Progress indicators with percentages
- `LoadingSkeleton` - Content placeholders

---

**Component**: `src/components/Loading/Loading.js`  
**Styles**: `src/components/Loading/Loading.scss`  
**Export**: `src/components/Loading/index.js`
