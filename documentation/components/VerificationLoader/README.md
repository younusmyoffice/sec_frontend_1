# VerificationLoader Component

A reusable loading dialog component for verification processes across the application.

## Features

- ✅ **Reusable** - Can be used anywhere in the app
- ✅ **Customizable** - Multiple props for different use cases
- ✅ **Responsive** - Works on all screen sizes
- ✅ **Accessible** - Proper ARIA labels and keyboard navigation
- ✅ **Animated** - Smooth transitions and pulse animation
- ✅ **Themeable** - Supports light/dark modes

## Usage

### Basic Usage

```jsx
import VerificationLoader from '../../../components/VerificationLoader';

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <VerificationLoader 
        open={isLoading}
        title="Processing"
        message="Please wait..."
      />
    </>
  );
};
```

### Doctor Verification

```jsx
<VerificationLoader 
  open={isVerifying}
  title="Doctor Verification"
  message="Verifying doctor credentials..."
  subMessage="This may take a few moments..."
  progressColor="#e72b49"
/>
```

### Payment Processing

```jsx
<VerificationLoader 
  open={isProcessingPayment}
  title="Payment Processing"
  message="Processing your payment..."
  subMessage="Please do not close this window..."
  progressColor="#4caf50"
/>
```

### Email Verification

```jsx
<VerificationLoader 
  open={isVerifyingEmail}
  title="Email Verification"
  message="Sending verification email..."
  subMessage="Check your inbox for the verification link"
  progressColor="#2196f3"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls dialog visibility |
| `title` | `string` | `"Verification"` | Main title text |
| `message` | `string` | `"Please wait..."` | Primary message |
| `subMessage` | `string` | `"This may take..."` | Secondary message |
| `showProgress` | `boolean` | `true` | Show/hide progress spinner |
| `progressSize` | `number` | `60` | Size of progress spinner |
| `progressThickness` | `number` | `4` | Thickness of progress circle |
| `progressColor` | `string` | `"#e72b49"` | Color of progress spinner |
| `disableBackdropClick` | `boolean` | `true` | Prevent closing on backdrop click |
| `disableEscapeKeyDown` | `boolean` | `true` | Prevent closing with Escape key |
| `maxWidth` | `string` | `"sm"` | Maximum width of dialog |
| `fullWidth` | `boolean` | `true` | Make dialog full width |
| `onClose` | `function` | `null` | Close handler (if closable) |

## Examples

### Customizable Verification

```jsx
<VerificationLoader 
  open={isVerifying}
  title="Custom Verification"
  message="Processing your request..."
  subMessage="This is a custom message"
  progressColor="#ff9800"
  progressSize={80}
  progressThickness={3}
  disableBackdropClick={false}
  onClose={() => setIsVerifying(false)}
/>
```

### Minimal Loading

```jsx
<VerificationLoader 
  open={isLoading}
  message="Loading..."
  showProgress={false}
  subMessage=""
/>
```

## Styling

The component uses SCSS for styling and includes:

- **Responsive design** for mobile devices
- **Dark mode support** via CSS media queries
- **Smooth animations** with CSS keyframes
- **Customizable colors** via props

## Best Practices

1. **Use descriptive titles** - Make it clear what's happening
2. **Provide helpful messages** - Explain what the user should expect
3. **Set appropriate timeouts** - Don't leave users waiting indefinitely
4. **Handle errors gracefully** - Show error states when verification fails
5. **Make it closable when appropriate** - Allow users to cancel if needed

## Integration

To use this component in your pages:

1. Import the component
2. Add state to control visibility
3. Show/hide based on your verification process
4. Customize props as needed for your use case
