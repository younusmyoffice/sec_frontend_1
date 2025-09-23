# EditListingButton Component

A reusable, accessible edit button component with multiple variants and sizes for listing management.

## 🎯 Overview

The `EditListingButton` component provides a consistent, accessible way to edit listings across the application. It features multiple variants, sizes, and includes proper accessibility attributes.

## 📁 Files

```
EditListingButton/
├── EditListingButton.js      # Main component
├── EditListingButton.scss    # Styles
├── index.js                  # Barrel export
└── README.md                 # Documentation
```

## 🚀 Usage

### Basic Usage

```jsx
import EditListingButton from '../../components/EditListingButton';

<EditListingButton
  onEditClick={() => handleEdit()}
  tooltip="Edit Listing"
/>
```

### With Custom Styling

```jsx
<EditListingButton
  onEditClick={() => handleEdit()}
  size="large"
  variant="outlined"
  className="custom-edit-button"
  tooltip="Edit This Listing"
/>
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onEditClick` | `function` | `() => {}` | Click handler for edit action |
| `disabled` | `boolean` | `false` | Disable the button |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Button size |
| `variant` | `"contained" \| "outlined" \| "text"` | `"contained"` | Button style variant |
| `className` | `string` | `""` | Additional CSS classes |
| `tooltip` | `string` | `"Edit Listing"` | Tooltip text |
| `...props` | `object` | `{}` | Additional props passed to IconButton |

## 🎨 Variants

### Contained (Default)
- Red background with white icon
- Hover effect with elevation
- Best for primary actions

```jsx
<EditListingButton variant="contained" />
```

### Outlined
- Transparent background with red border
- Fills with red on hover
- Good for secondary actions

```jsx
<EditListingButton variant="outlined" />
```

### Text
- Transparent background, red icon
- Subtle background on hover
- Minimal design approach

```jsx
<EditListingButton variant="text" />
```

## 📏 Sizes

### Small
- 32x32px minimum size
- 8px padding
- 16px icon size

```jsx
<EditListingButton size="small" />
```

### Medium (Default)
- 40x40px minimum size
- 12px padding
- 20px icon size

```jsx
<EditListingButton size="medium" />
```

### Large
- 48x48px minimum size
- 16px padding
- 24px icon size

```jsx
<EditListingButton size="large" />
```

## 🎨 Styling

### CSS Classes

The component uses the following CSS classes:

- `.edit-listing-button` - Main button class
- `.small`, `.medium`, `.large` - Size modifiers
- `.contained`, `.outlined`, `.text` - Variant modifiers
- `.loading` - Loading state modifier

### Custom Styling

```scss
.custom-edit-button {
  // Override default styles
  background-color: #custom-color;
  
  &:hover {
    background-color: #custom-hover-color;
  }
}
```

### CSS Custom Properties

You can override the default colors using CSS custom properties:

```scss
.edit-listing-button {
  --primary-color: #e72b49;
  --hover-color: #d32f2f;
  --text-color: #ffffff;
}
```

## ♿ Accessibility

### ARIA Attributes
- `aria-label` - Screen reader accessible label
- `role="button"` - Semantic button role
- `tabindex="0"` - Keyboard navigation support

### Keyboard Navigation
- **Enter/Space** - Activate the button
- **Tab** - Focus navigation
- **Escape** - Close any open tooltips

### Screen Reader Support
- Proper labeling with `aria-label`
- Tooltip text for additional context
- Focus indicators for keyboard users

## 📱 Responsive Design

### Mobile Optimizations
- Touch-friendly sizing (minimum 44px touch target)
- Reduced padding on smaller screens
- Optimized icon sizes for readability

### Breakpoints
- **Desktop**: Full size and spacing
- **Tablet**: Slightly reduced sizing
- **Mobile**: Compact but accessible sizing

## 🎭 Animations

### Hover Effects
- Smooth color transitions
- Subtle elevation changes
- Transform animations

### Loading State
- Spinning animation for loading indicator
- Disabled interaction during loading
- Visual feedback for async operations

### Ripple Effect
- Material Design inspired ripple
- Smooth animation on click
- Visual feedback for user interaction

## 🔧 Integration Examples

### In Listing Cards

```jsx
<CustomDrActiveListingCard
  label="My Listing"
  onEditClick={() => handleEditListing(listingId)}
  showEditButton={true}
/>
```

### In Data Tables

```jsx
<TableRow>
  <TableCell>Listing Name</TableCell>
  <TableCell>
    <EditListingButton
      onEditClick={() => editRow(row.id)}
      size="small"
      variant="text"
    />
  </TableCell>
</TableRow>
```

### In Action Menus

```jsx
<Menu>
  <MenuItem>
    <EditListingButton
      onEditClick={handleEdit}
      size="small"
      variant="text"
    />
    Edit
  </MenuItem>
</Menu>
```

## 🧪 Testing

### Unit Tests

```javascript
import { render, fireEvent } from '@testing-library/react';
import EditListingButton from './EditListingButton';

test('calls onEditClick when clicked', () => {
  const handleEdit = jest.fn();
  const { getByRole } = render(
    <EditListingButton onEditClick={handleEdit} />
  );
  
  fireEvent.click(getByRole('button'));
  expect(handleEdit).toHaveBeenCalledTimes(1);
});
```

### Accessibility Tests

```javascript
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(
    <EditListingButton onEditClick={() => {}} />
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 🐛 Troubleshooting

### Common Issues

1. **Button not responding to clicks**
   - Check if `onEditClick` prop is provided
   - Verify button is not disabled
   - Check for CSS conflicts

2. **Styling not applying**
   - Ensure SCSS file is imported
   - Check for CSS specificity issues
   - Verify className prop is correct

3. **Accessibility issues**
   - Ensure proper `aria-label` is set
   - Check keyboard navigation
   - Verify screen reader compatibility

### Debug Mode

Enable debug mode to see additional logging:

```javascript
localStorage.setItem('debug', 'EditListingButton');
```

## 🔄 Migration Guide

### From Old Edit Buttons

1. Replace old button implementations:
   ```jsx
   // Old
   <button onClick={handleEdit}>Edit</button>
   
   // New
   <EditListingButton onEditClick={handleEdit} />
   ```

2. Update styling:
   ```scss
   // Old
   .edit-btn { /* custom styles */ }
   
   // New
   .edit-listing-button { /* use component classes */ }
   ```

3. Update event handlers:
   ```jsx
   // Old
   onClick={handleEdit}
   
   // New
   onEditClick={handleEdit}
   ```

## 📈 Performance

### Optimizations
- Memoized with `React.memo`
- Efficient re-renders
- Minimal DOM updates
- CSS-only animations

### Bundle Size
- Lightweight component (~2KB gzipped)
- No external dependencies
- Tree-shakeable exports

## 🔮 Future Enhancements

### Planned Features
- [ ] Loading state with spinner
- [ ] Confirmation dialog integration
- [ ] Bulk edit support
- [ ] Drag and drop integration
- [ ] Undo/redo functionality

### API Improvements
- [ ] Custom icon support
- [ ] Theme integration
- [ ] Animation customization
- [ ] Event callback system

---

This component is part of the shared component library and follows the project's design system and accessibility guidelines.
