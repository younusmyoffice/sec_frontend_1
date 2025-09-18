# 📱 CustomOTPInput Component

## 🎯 **Overview**
A reusable OTP (One-Time Password) input component that provides a consistent, modern design across the entire application. This component replaces all direct usage of `react-otp-input` with a standardized implementation.

## 🎨 **Design Features**
- **6 Individual Input Fields** - Each 45px × 45px
- **Clean White Background** - #ffffff
- **Light Gray Border** - #e0e0e0 (1px solid)
- **Rounded Corners** - 8px border radius
- **Proper Spacing** - 8px gap between fields
- **Asterisk Placeholder** - "*" in each field
- **Red Focus State** - #e72b49 with subtle shadow
- **Smooth Transitions** - 0.2s ease for all changes

## 📦 **Usage**

### **Basic Usage**
```jsx
import CustomOTPInput from "../../../../components/OTPInput";

<CustomOTPInput
    value={otp}
    onChange={setOtp}
    numInputs={6}
    placeholder="*"
/>
```

### **Advanced Usage**
```jsx
<CustomOTPInput
    value={otp}
    onChange={setOtp}
    numInputs={6}
    placeholder="*"
    className="custom-otp-class"
    // Any other props from react-otp-input
/>
```

## 🔧 **Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | Current OTP value |
| `onChange` | `function` | `undefined` | Callback when OTP changes |
| `numInputs` | `number` | `6` | Number of input fields |
| `placeholder` | `string` | `"*"` | Placeholder character |
| `className` | `string` | `""` | Additional CSS class |
| `...props` | `object` | `{}` | Any other react-otp-input props |

## 📍 **Current Usage Locations**

### **Patient Module**
- ✅ `PatientVerification` - Email verification
- ✅ `PatientLoginWithOtpVerify` - Login OTP verification
- ✅ `PatientForgotPasswordOTP` - Password reset OTP

### **HCF Admin Module**
- ✅ `AdminStaff` - Staff email & mobile OTP verification
- ✅ `AddDoctor` - Doctor email OTP verification

## 🎨 **Styling**

### **Default Styles**
```scss
.custom-otp-input {
  .otp-input {
    input {
      width: 45px;
      height: 45px;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1.5rem;
      font-weight: 500;
      text-align: center;
      margin: 0 4px;
      outline: none;
      transition: all 0.2s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      
      &:focus {
        border-color: #e72b49;
        box-shadow: 0 0 0 2px rgba(231, 43, 73, 0.2);
      }
      
      &:hover {
        border-color: #e72b49;
      }
    }
  }
}
```

### **State Classes**
- `.otp-complete` - When OTP is complete (green border)
- `.otp-error` - When there's an error (red border)

## 🚀 **Migration Guide**

### **Before (Old Way)**
```jsx
import OTPInput from "react-otp-input";

<OTPInput
    value={otp}
    onChange={setOtp}
    numInputs={6}
    inputStyle={{
        width: "10%",
        height: "3rem",
        backgroundColor: "#ffff",
        borderRadius: "10px",
        fontSize: "1.7rem",
    }}
    containerStyle={{ justifyContent: "center" }}
    renderSeparator={<span style={{ marginLeft: "2%" }} />}
    renderInput={(props) => <input {...props} />}
/>
```

### **After (New Way)**
```jsx
import CustomOTPInput from "../../../../components/OTPInput";

<CustomOTPInput
    value={otp}
    onChange={setOtp}
    numInputs={6}
    placeholder="*"
/>
```

## ✅ **Benefits**

1. **Consistency** - Same design across all pages
2. **Maintainability** - Single component to update
3. **Accessibility** - Proper focus states and keyboard navigation
4. **Responsive** - Works on all screen sizes
5. **Customizable** - Easy to modify styles and behavior
6. **Clean Code** - Reduced boilerplate in components

## 🔄 **Future Updates**

To update the OTP design across the entire app, simply modify the `CustomOTPInput` component. All pages using this component will automatically reflect the changes.

## 📝 **Notes**

- This component wraps `react-otp-input` with consistent styling
- All existing functionality is preserved
- No breaking changes to existing implementations
- Easy to extend with additional features
