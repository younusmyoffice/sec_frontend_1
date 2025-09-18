# CustomTimePicker Component

A reusable time picker component that provides consistent styling and behavior across the application.

## Features

- **Consistent Styling**: Uses Material-UI `variant="standard"` for uniform appearance
- **Clock Icon**: Automatically displays clock icon on the right side
- **Error Handling**: Red borders and text when validation fails
- **Spacing Control**: Configurable spacing between fields
- **Value Conversion**: Handles Date objects, strings, and dayjs objects
- **Accessibility**: Full accessibility support through Material-UI

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

The component uses the same styling pattern as `CustomDatePicker`:
- Standard Material-UI underline style
- Consistent color scheme (#787579)
- Proper spacing between fields
- Red error styling when validation fails
- Clock icon styling to match the design system

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
