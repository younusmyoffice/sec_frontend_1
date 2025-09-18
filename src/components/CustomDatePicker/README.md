# CustomDatePicker Component

A reusable date picker component that matches the styling of other form fields in the application.

## Features

- ✅ **Consistent Styling** - Matches `CustomTextField` and other form components
- ✅ **Standard Variant** - Uses Material-UI `variant="standard"` for underlined borders
- ✅ **Error States** - Red styling when validation fails
- ✅ **Consistent Spacing** - Default margin between fields (can be disabled)
- ✅ **Full Width** - Responsive design
- ✅ **Required Field Support** - Shows asterisk for required fields
- ✅ **Flexible Value Types** - Accepts Date objects, strings, or dayjs objects
- ✅ **Automatic Conversion** - Handles value type conversion internally

## Usage

```javascript
import CustomDatePicker from '../../../components/CustomDatePicker';

// Basic usage
<CustomDatePicker
    label="Date of Birth"
    value={dateValue}
    onChange={(value) => setDateValue(value)}
    required={true}
/>

// With error state
<CustomDatePicker
    label="Appointment Date"
    value={appointmentDate}
    onChange={(value) => setAppointmentDate(value)}
    error={validationErrors.date.isValid === false}
    helperText={validationErrors.date.message}
    required={true}
/>

// With custom styling
<CustomDatePicker
    label="Custom Date"
    value={customDate}
    onChange={(value) => setCustomDate(value)}
    textcss={{
        width: "50%",
        marginRight: "1rem"
    }}
    noSpacing={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | "Date" | Label for the date field |
| `value` | Date/string/number/dayjs | null | Selected date value (Date object, string, or dayjs object) |
| `onChange` | function | () => {} | Callback when date changes |
| `required` | boolean | false | Whether field is required |
| `disabled` | boolean | false | Whether field is disabled |
| `error` | boolean | false | Whether field has error state |
| `helperText` | string | "" | Helper text below field |
| `placeholder` | string | "" | Placeholder text |
| `textcss` | object | {} | Custom CSS styling |
| `noSpacing` | boolean | false | Disable default margin |

## Styling

The component automatically applies:
- Standard Material-UI variant styling
- Consistent color scheme (#787579)
- Red error states when `error={true}`
- Default spacing between fields (1.5rem)
- Full width responsive design

## Error States

When `error={true}`, the component shows:
- Red helper text
- Red input border
- Red label color
- Red hover and focus states

## Examples

### Basic Date Field
```javascript
<CustomDatePicker
    label="Birth Date"
    value={birthDate}
    onChange={(date) => setBirthDate(date)}
/>
```

### Required Field with Validation
```javascript
<CustomDatePicker
    label="Appointment Date"
    value={appointmentDate}
    onChange={(date) => setAppointmentDate(date)}
    required={true}
    error={!isValidDate}
    helperText={isValidDate ? "" : "Please select a valid date"}
/>
```

### Custom Styling
```javascript
<CustomDatePicker
    label="Event Date"
    value={eventDate}
    onChange={(date) => setEventDate(date)}
    textcss={{
        width: "300px",
        marginBottom: "2rem"
    }}
    noSpacing={true}
/>
```

## Integration

This component is designed to work seamlessly with:
- `CustomTextField` - Same styling and behavior
- `CustomCountryCodeSelector` - Consistent form appearance
- Form validation systems - Error state support
- Material-UI theme - Follows design system

## Benefits

1. **Consistency** - All date fields look the same across the app
2. **Reusability** - Use anywhere you need a date picker
3. **Maintainability** - Update styling in one place
4. **Accessibility** - Built-in accessibility features
5. **Responsive** - Works on all screen sizes
