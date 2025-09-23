# Doctor Listing Components

This directory contains the updated doctor listing components with modern, responsive design and reusable components.

## 🎯 Overview

The doctor listing system has been completely redesigned to match the provided design reference with:
- **Responsive Design**: Works seamlessly across all device sizes
- **Reusable Components**: Modular components for better maintainability
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 📁 Component Structure

```
DoctorListing/
├── DoctorListingDetails/
│   ├── DoctorListingDetails.js      # Main listing details page
│   └── DoctorListingDetails.scss    # Responsive styles
├── DoctorActiveListing/
│   ├── DoctorActiveLising.js        # Active listings management
│   └── doctorActiveListing.scss     # Responsive styles
└── README.md                        # This documentation
```

## 🧩 Reusable Components

### 1. DoctorProfileCard
**Location**: `src/components/DoctorProfileCard/`

A reusable card component for displaying doctor profile information.

```jsx
import DoctorProfileCard from '../../components/DoctorProfileCard';

<DoctorProfileCard
  name="Dr. Maria Garcia"
  specialty="Neurologist"
  profileImage="/path/to/image.jpg"
  onEditClick={() => navigate('/edit-profile')}
  showEditButton={true}
/>
```

**Props**:
- `name` (string): Doctor's full name
- `specialty` (string): Medical specialty
- `profileImage` (string): Profile image URL
- `onEditClick` (function): Edit button click handler
- `showEditButton` (boolean): Show/hide edit button

### 2. ListingTabs
**Location**: `src/components/ListingTabs/`

A responsive tab navigation component for listing management.

```jsx
import ListingTabs from '../../components/ListingTabs';

const tabs = [
  { label: "Listing Details", path: "/listingdetails", active: true },
  { label: "Add Plan", path: "/addplans", active: false },
  { label: "Add Questioner", path: "/addquestioner", active: false },
  { label: "Term & Conditions", path: "/terms", active: false }
];

<ListingTabs tabs={tabs} />
```

**Props**:
- `tabs` (array): Array of tab objects with label, path, and active properties
- `className` (string): Additional CSS classes

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

### Key Features
- **Flexible Grid**: CSS Grid and Flexbox for responsive layouts
- **Touch-Friendly**: Larger touch targets on mobile devices
- **Readable Text**: Appropriate font sizes for each screen size
- **Optimized Images**: Responsive image handling
- **Smooth Animations**: CSS transitions and transforms

## 🎨 Design System

### Colors
- **Primary**: #e72b49 (Red)
- **Secondary**: #d32f2f (Dark Red)
- **Text**: #1a1a1a (Dark Gray)
- **Subtext**: #666 (Medium Gray)
- **Background**: #f8f9fa (Light Gray)
- **White**: #ffffff

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Headings**: 600 weight, various sizes
- **Body Text**: 400 weight, 14px base
- **Buttons**: 500 weight, 14px

### Spacing
- **Small**: 8px
- **Medium**: 16px
- **Large**: 24px
- **Extra Large**: 32px

## 🔧 Usage Examples

### DoctorListingDetails Page

```jsx
import React, { useState } from 'react';
import DoctorListingDetails from './DoctorListingDetails/DoctorListingDetails';

const MyComponent = () => {
  return (
    <DoctorListingDetails />
  );
};
```

### DoctorActiveListing Page

```jsx
import React from 'react';
import DoctorActiveListing from './DoctorActiveListing/DoctorActiveLising';

const MyComponent = () => {
  return (
    <DoctorActiveListing />
  );
};
```

## 📋 Features

### DoctorListingDetails
- ✅ **Form Validation**: Real-time validation with visual feedback
- ✅ **Date/Time Pickers**: Reusable CustomDatePicker and CustomTimePicker
- ✅ **Responsive Layout**: Adapts to all screen sizes
- ✅ **Smooth Animations**: Hover effects and transitions
- ✅ **Accessibility**: Proper ARIA labels and keyboard navigation
- ✅ **Error Handling**: Comprehensive error states and messages

### DoctorActiveListing
- ✅ **Modern Header**: Clean header with title and actions
- ✅ **Refresh Functionality**: Manual refresh with loading states
- ✅ **Empty States**: Helpful empty state with call-to-action
- ✅ **Card Layout**: Responsive card grid for listings
- ✅ **Loading States**: Skeleton loading animations
- ✅ **Hover Effects**: Interactive card animations

## 🚀 Performance Optimizations

### Code Splitting
- Lazy loading for all major components
- Suspense boundaries with loading fallbacks
- Optimized bundle sizes

### CSS Optimizations
- Scoped CSS classes to prevent conflicts
- Efficient selectors and minimal specificity
- CSS Grid and Flexbox for layout performance

### JavaScript Optimizations
- React.memo for component memoization
- useCallback for event handlers
- Efficient state management

## 🔧 Customization

### Styling
All components use SCSS with CSS custom properties for easy theming:

```scss
// Override default colors
.doctor-listing-details {
  --primary-color: #e72b49;
  --secondary-color: #d32f2f;
  --text-color: #1a1a1a;
  --background-color: #f8f9fa;
}
```

### Component Props
All components accept className and additional props for customization:

```jsx
<DoctorProfileCard 
  className="custom-profile-card"
  style={{ marginBottom: '20px' }}
  // ... other props
/>
```

## 🧪 Testing

### Unit Tests
```bash
npm test -- --testPathPattern=DoctorListing
```

### Visual Regression Tests
```bash
npm run test:visual
```

### Responsive Testing
Use browser dev tools or tools like BrowserStack for cross-device testing.

## 📚 API Integration

### Listing Details API
```javascript
// Create/Update listing
const response = await axiosInstance.post(
  "/sec/createUpdatedoctorlisting/listing",
  JSON.stringify(data)
);
```

### Active Listings API
```javascript
// Fetch active listings
const response = await axiosInstance.get(
  `/sec/doctor/DocListingPlanActive/${doctorId}`
);

// Delete listing
const response = await axiosInstance.post(
  "/sec/doctor/deleteDocListingPlan",
  { doctor_id, doctor_list_id }
);
```

## 🐛 Troubleshooting

### Common Issues

1. **Styling Conflicts**
   - Ensure SCSS files are properly imported
   - Check for CSS specificity issues
   - Verify class names are unique

2. **Responsive Issues**
   - Test on actual devices, not just browser dev tools
   - Check viewport meta tag
   - Verify CSS Grid/Flexbox support

3. **Performance Issues**
   - Check for unnecessary re-renders
   - Optimize images and assets
   - Use React DevTools Profiler

### Debug Mode
Enable debug mode by setting:
```javascript
localStorage.setItem('debug', 'true');
```

## 🔄 Migration Guide

### From Old Components
1. Update imports to use new component paths
2. Replace old styling classes with new ones
3. Update prop names to match new API
4. Test responsive behavior on all devices

### Breaking Changes
- Component file structure has changed
- Some prop names have been updated
- CSS class names have been modernized
- API response handling has been improved

## 📈 Future Enhancements

### Planned Features
- [ ] Drag and drop for listing reordering
- [ ] Bulk actions for multiple listings
- [ ] Advanced filtering and search
- [ ] Real-time updates with WebSocket
- [ ] Dark mode support
- [ ] Internationalization (i18n)

### Performance Improvements
- [ ] Virtual scrolling for large lists
- [ ] Image lazy loading
- [ ] Service worker for offline support
- [ ] Bundle size optimization

---

This documentation is maintained and updated with each release. For questions or issues, please refer to the project's issue tracker or contact the development team.
