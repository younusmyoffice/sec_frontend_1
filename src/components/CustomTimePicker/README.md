# CustomTimePicker Component

A reusable time picker component that provides consistent styling and behavior across the application.

## Features

- **Consistent Styling**: Uses Material-UI `variant="standard"` by default for uniform appearance with other form components
- **Clock Icon**: Automatically displays clock icon in the label for better UX
- **Error Handling**: Red borders and text when validation fails
- **Spacing Control**: Configurable spacing between fields
- **Value Conversion**: Handles Date objects, strings, and dayjs objects seamlessly
- **Accessibility**: Full accessibility support through Material-UI
- **Blue Theme**: Consistent blue color scheme (#1976d2) matching other form components
- **Responsive Design**: Adapts to different screen sizes

## Usage

```jsx
import CustomTimePicker from '../../../components/CustomTimePicker';

// Basic usage
<CustomTimePicker
    label="Start Time"
    value={startTime}
    onChange={(time) => setStartTime(time)}
    required={true}
/>

// With custom styling
<CustomTimePicker
    label="End Time"
    value={endTime}
    onChange={(time) => setEndTime(time)}
    textcss={{ width: "48%" }}
    noSpacing={true}
/>

// With error state
<CustomTimePicker
    label="Time"
    value={time}
    onChange={(time) => setTime(time)}
    error={true}
    helperText="Please select a valid time"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | "Time" | Label for the time picker |
| `value` | Date/string/number/object | null | Current time value |
| `onChange` | function | () => {} | Callback when time changes |
| `required` | boolean | false | Whether the field is required |
| `disabled` | boolean | false | Whether the field is disabled |
| `error` | boolean | false | Whether to show error styling |
| `helperText` | string | "" | Helper text to display |
| `placeholder` | string | "" | Placeholder text |
| `textcss` | object | {} | Custom CSS styles |
| `noSpacing` | boolean | false | Whether to disable default spacing |

## Value Handling

The component accepts various value types and converts them internally:
- **Date objects**: Converted to dayjs for the TimePicker
- **Strings**: Parsed as time strings
- **Numbers**: Treated as timestamps
- **dayjs objects**: Used directly

The `onChange` callback always receives a Date object for consistency.

## Styling

The component uses consistent styling with other form components:
- **Standard Variant**: Material-UI underline style by default
- **Color Scheme**: Blue theme (#1976d2) for focus states and icons
- **Label Color**: Gray (#787579) matching other form fields
- **Error States**: Red (#d32f2f) for validation errors
- **Clock Icon**: Integrated into label with consistent styling
- **Popup Design**: Blue gradient theme for time picker popup
- **Responsive**: Adapts to different screen sizes

## Examples

### Side-by-side Time Pickers
```jsx
<div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
    <CustomTimePicker
        label="Start Time"
        value={startTime}
        onChange={(time) => setStartTime(time)}
        textcss={{ width: "48%" }}
    />
    <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}> to </Box>
    <CustomTimePicker
        label="End Time"
        value={endTime}
        onChange={(time) => setEndTime(time)}
        textcss={{ width: "48%" }}
    />
</div>
```

### With Error State
```jsx
<CustomTimePicker
    label="Service Time"
    value={serviceTime}
    onChange={(time) => setServiceTime(time)}
    error={!isValidTime}
    helperText={!isValidTime ? "Please select a valid time" : ""}
    required={true}
/>
```
