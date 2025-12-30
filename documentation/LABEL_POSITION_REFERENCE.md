# Label Position Control Reference

## How to Adjust Label Position Vertically in CustomCountryCodeSelector

### Current Implementation

The TextField now includes `InputLabelProps` to control the vertical position of the label:

```javascript
InputLabelProps={{
    sx: {
        transform: "translateY(-4px) scale(0.75)", // Moves label up slightly
    }
}}
```

---

## Vertical Positioning Options

### 1. **Using `transform: translateY()`** (Current Method)

**Move Label UP** (negative values):
```javascript
transform: "translateY(-8px) scale(0.75)",  // Move up 8px
transform: "translateY(-4px) scale(0.75)",  // Move up 4px (current)
transform: "translateY(-2px) scale(0.75)", // Move up 2px
```

**Move Label DOWN** (positive values):
```javascript
transform: "translateY(0px) scale(0.75)",   // No movement
transform: "translateY(4px) scale(0.75)",    // Move down 4px
transform: "translateY(8px) scale(0.75)",   // Move down 8px
```

---

### 2. **Using `top` Property**

```javascript
InputLabelProps={{
    sx: {
        // Move label DOWN
        top: "8px",   // 8px down from default
        top: "4px",   // 4px down from default
        top: "0px",   // Default position
        
        // Move label UP
        top: "-4px",  // 4px up from default
        top: "-8px",  // 8px up from default
    }
}}
```

---

### 3. **Using `translateY` Without Scale**

If you only want to move the label without scaling:

```javascript
InputLabelProps={{
    sx: {
        transform: "translateY(-4px)", // No scaling, just movement
    }
}}
```

---

## Complete Examples

### Example 1: Move Label Up Slightly (Current)
```javascript
InputLabelProps={{
    sx: {
        transform: "translateY(-4px) scale(0.75)",
    }
}}
```

### Example 2: Move Label Down
```javascript
InputLabelProps={{
    sx: {
        top: "8px",
        transform: "scale(0.75)",
    }
}}
```

### Example 3: No Vertical Adjustment
```javascript
InputLabelProps={{
    sx: {
        transform: "scale(0.75)", // Only scale, no vertical movement
    }
}}
```

### Example 4: Custom Positioning
```javascript
InputLabelProps={{
    sx: {
        position: "absolute",
        top: "20px",
        left: "12px",
        transform: "scale(0.75)",
    }
}}
```

---

## Alternative: Using `labelShrink` or `shrink` Prop

You can also control the label state without positioning:

```javascript
<TextField
    label={label}
    InputLabelProps={{
        shrink: true, // Always show label in shrunken state
        // OR
        shrink: false, // Never shrink label
    }}
/>
```

---

## Adjusting Label Position in Different Scenarios

### Scenario 1: Label Too High
**Problem**: Label is too close to the top
**Solution**: Move it down
```javascript
InputLabelProps={{
    sx: {
        top: "4px", // Move down 4px
        transform: "scale(0.75)",
    }
}}
```

### Scenario 2: Label Too Low
**Problem**: Label overlaps with input text
**Solution**: Move it up
```javascript
InputLabelProps={{
    sx: {
        transform: "translateY(-8px) scale(0.75)", // Move up 8px
    }
}}
```

### Scenario 3: Label Needs Perfect Alignment
**Problem**: Label doesn't align with the input border
**Solution**: Fine-tune with negative Y value
```javascript
InputLabelProps={{
    sx: {
        transform: "translateY(-2px) scale(0.75)",
    }
}}
```

---

## Implementation in CustomCountryCodeSelector

The current implementation (lines 388-397) provides:

1. **Basic positioning**: `transform: "translateY(-4px) scale(0.75)"`
2. **Comments for guidance**: Showing alternative methods
3. **Easy customization**: Uncomment the alternative you prefer

---

## Quick Reference Table

| Adjustment | transform Value | Effect |
|-----------|---------------|--------|
| Move up 8px | `translateY(-8px) scale(0.75)` | Label shifts up significantly |
| Move up 4px | `translateY(-4px) scale(0.75)` | Label shifts up slightly ⭐ Current |
| No adjustment | `scale(0.75)` | Only scaling, no movement |
| Move down 4px | `translateY(4px) scale(0.75)` | Label shifts down slightly |
| Move down 8px | `translateY(8px) scale(0.75)` | Label shifts down significantly |

---

## Testing Your Changes

1. **Inspect the label**: Open browser DevTools
2. **Check the computed styles**: Verify the `transform` value
3. **Adjust incrementally**: Change values by ±2px to fine-tune
4. **Test different states**: Focused, unfocused, error states

---

## Summary

✅ **Current setting**: Label moved up by 4px  
✅ **Method**: Using `transform: translateY(-4px) scale(0.75)`  
✅ **Easy to adjust**: Change the `-4px` value to your preference

To adjust, simply modify the `translateY()` value in `InputLabelProps.sx.transform`!

