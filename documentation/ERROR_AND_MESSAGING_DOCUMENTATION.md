# Error & Success Message Handling Documentation

## 📋 Overview

This document provides comprehensive information about how error and success messages are handled in the application, including reusable components for toasts, alerts, popups, and loaders.

---

## ✅ **1. Error & Success Message Handling**

### **Two Main Approaches:**

#### **A. Toast Service (React-Toastify)** ✅ **RECOMMENDED**
**Location:** `src/services/toastService.js`

**Features:**
- ✅ Centralized service
- ✅ Auto-dismissible
- ✅ Multiple types (success, error, warning, info)
- ✅ Configurable positions and durations
- ✅ Integrated with logger

**Usage:**
```javascript
import toastService from "../../services/toastService";

// Success message
toastService.success("Operation completed successfully!");

// Error message
toastService.error("Something went wrong. Please try again.");

// Warning message
toastService.warn("Please check your input.");

// Info message
toastService.info("Processing your request...");

// Loading notification (returns toast ID)
const toastId = toastService.loading("Uploading file...");
// Later update it
toastService.update(toastId, "Upload complete!", "success");

// Dismiss all toasts
toastService.dismissAll();
```

**Default Settings:**
- Position: `top-right`
- Success auto-close: `3000ms`
- Error auto-close: `5000ms`
- Warning auto-close: `4000ms`
- Info auto-close: `3000ms`
- Draggable: `true`
- Progress bar: `visible`

---

#### **B. CustomSnackBar (Material-UI)** ✅ **ALSO AVAILABLE**
**Location:** `src/components/CustomSnackBar/custom-sack-bar.js`

**Features:**
- ✅ Slide-in animation
- ✅ Multiple types (success, error, warning, info)
- ✅ Custom action buttons
- ✅ Position configurable
- ✅ Auto-dismiss with configurable duration

**Usage:**
```javascript
import CustomSnackBar from "../../components/CustomSnackBar";

const [snackOpen, setSnackOpen] = useState(false);
const [snackMessage, setSnackMessage] = useState("");
const [snackType, setSnackType] = useState("success");

// Show success
<CustomSnackBar
    isOpen={snackOpen}
    message={snackMessage}
    type={snackType}
    hideDuration={4000}
    position={{ vertical: "top", horizontal: "right" }}
/>

// Show with action button
<CustomSnackBar
    isOpen={snackOpen}
    message="File uploaded successfully"
    type="success"
    actionLabel="View"
    handleAction={() => navigate("/files")}
/>
```

**Types:**
- `success` - Green checkmark icon
- `error` - Red X icon  
- `warning` - Yellow warning icon
- `info` - Blue info icon

---

## 🔔 **2. Reusable Components**

### **A. CustomModal** ✅ **REUSABLE MODAL**
**Location:** `src/components/CustomModal/custom-modal.js`

**Features:**
- ✅ Customizable size (xs, sm, md, lg, xl)
- ✅ Custom title (string or React node)
- ✅ Footer actions
- ✅ Backdrop click control
- ✅ Close button
- ✅ Responsive design

**Usage:**
```javascript
import CustomModal from "../../components/CustomModal";

const [isModalOpen, setIsModalOpen] = useState(false);

<CustomModal
    isOpen={isModalOpen}
    conditionOpen={setIsModalOpen}
    title="Confirm Action"
    maxWidth="md"
    fullWidth={true}
    disableBackdropClick={false}
    footer={
        <Box>
            <CustomButton label="Cancel" handleClick={() => setIsModalOpen(false)} />
            <CustomButton label="Confirm" handleClick={handleConfirm} />
        </Box>
    }
>
    <Typography>Are you sure you want to proceed?</Typography>
</CustomModal>
```

**Example: Confirmation Modal**
```javascript
<CustomModal
    isOpen={showDeleteModal}
    conditionOpen={setShowDeleteModal}
    title="Delete Listing"
>
    <Box sx={{ padding: "1.5rem", textAlign: "center" }}>
        <Typography sx={{ mb: 2 }}>
            Are you sure you want to delete this listing?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <CustomButton label="Cancel" handleClick={() => setShowDeleteModal(false)} />
            <CustomButton label="Delete" handleClick={handleDelete} />
        </Box>
    </Box>
</CustomModal>
```

---

### **B. Alert/Popup Dialogs**

**Browser Alert (Simple):**
```javascript
alert("This is a simple alert");
```

**Material-UI Alert (In Components):**
```javascript
import { Alert } from "@mui/material";

<Alert severity="error">This is an error alert</Alert>
<Alert severity="warning">This is a warning alert</Alert>
<Alert severity="info">This is an info alert</Alert>
<Alert severity="success">This is a success alert</Alert>
```

---

## ⏳ **3. Reusable Loader Components**

### **A. Loading Component** ✅ **PRIMARY LOADER**
**Location:** `src/components/Loading/Loading.js`

**Features:**
- ✅ 4 display modes: `inline`, `overlay`, `standalone`, `minimal`
- ✅ 3 sizes: `small`, `medium`, `large`
- ✅ Custom messages (primary & secondary)
- ✅ Full-screen option
- ✅ Configurable colors
- ✅ Material-UI CircularProgress

**Usage:**

#### **1. Inline Loading (Buttons, Small Spaces)**
```javascript
import { Loading } from "../../components/Loading";

<button disabled={isLoading}>
    {isLoading ? (
        <Loading variant="inline" size="small" />
    ) : (
        "Submit"
    )}
</button>
```

#### **2. Overlay Loading (Full-Screen)**
```javascript
{isLoading && (
    <Loading
        variant="overlay"
        size="large"
        message="Processing..."
        subMessage="Please wait..."
        fullScreen
    />
)}
```

#### **3. Standalone Loading (Content Areas)**
```javascript
if (loading) {
    return (
        <Loading
            variant="standalone"
            message="Loading data..."
            subMessage="Fetching from server..."
        />
    );
}
```

#### **4. Minimal Loading (Just Spinner)**
```javascript
<Loading variant="minimal" size="small" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'inline' \| 'overlay' \| 'standalone' \| 'minimal'` | `'inline'` | Display mode |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Spinner size |
| `message` | `string` | `''` | Primary message |
| `subMessage` | `string` | `''` | Secondary message |
| `fullScreen` | `boolean` | `false` | Full-screen overlay |
| `color` | `string` | `'primary'` | Spinner color |

---

### **B. LoadingSkeleton Component** ✅ **SKELETON LOADER**
**Location:** `src/components/LoadingSkeleton/LoadingSkeleton.js`

**Features:**
- ✅ Multiple variants (card, list, table, form)
- ✅ Configurable count
- ✅ Wave animation
- ✅ Customizable height
- ✅ Shimmer effect

**Usage:**
```javascript
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";

// Card skeleton
<LoadingSkeleton variant="card" count={3} height={200} />

// List skeleton
<LoadingSkeleton variant="list" count={5} />

// Table skeleton
<LoadingSkeleton variant="table" />
```

---

### **C. Material-UI Skeleton** ✅ **ALSO AVAILABLE**
**Location:** Built-in Material-UI component

**Usage:**
```javascript
import { Skeleton } from "@mui/material";

// Single skeleton
<Skeleton variant="rectangular" width="100%" height={120} />

// Multiple skeletons
{loading ? (
    Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={80}
            sx={{ borderRadius: "0.5rem", mb: 2 }}
        />
    ))
) : (
    <DataList />
)}
```

**Common Patterns:**
```javascript
// Card skeleton
<Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: "8px" }} />

// Text skeleton
<Skeleton variant="text" width="60%" height={24} />
<Skeleton variant="text" width="40%" height={24} />

// Circular avatar skeleton
<Skeleton variant="circular" width={40} height={40} />
```

---

## 📊 **4. Current Usage Patterns**

### **Error Handling Pattern:**
```javascript
import toastService from "../../services/toastService";
import logger from "../../utils/logger";

try {
    const response = await axiosInstance.post('/api/endpoint', data);
    toastService.success(response?.data?.message || "Success!");
    logger.info("Operation successful");
} catch (error) {
    logger.error("Operation failed:", error);
    const errorMessage = 
        error?.response?.data?.message || 
        error?.message || 
        "An error occurred. Please try again.";
    toastService.error(errorMessage);
}
```

### **Loading State Pattern:**
```javascript
import { Loading } from "../../components/Loading";

const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await api.getData();
            setData(data);
        } catch (error) {
            toastService.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };
    fetchData();
}, []);

if (loading) {
    return <Loading variant="standalone" message="Loading..." />;
}
```

### **Combined Pattern (Toast + Modal):**
```javascript
import toastService from "../../services/toastService";
import CustomModal from "../../components/CustomModal";

const handleDelete = async () => {
    try {
        await axiosInstance.delete(`/api/item/${id}`);
        toastService.success("Item deleted successfully");
        setShowDeleteModal(false);
        // Refresh data
        fetchData();
    } catch (error) {
        toastService.error("Failed to delete item");
    }
};

<CustomModal
    isOpen={showDeleteModal}
    conditionOpen={setShowDeleteModal}
    title="Delete Item"
>
    <Typography>Are you sure?</Typography>
    <CustomButton label="Delete" handleClick={handleDelete} />
</CustomModal>
```

---

## 📈 **5. Usage Statistics**

Based on codebase analysis:
- **toastService**: Used in **125+ files**
- **CustomSnackBar**: Used in **100+ files**
- **CustomModal**: Used in **50+ files**
- **Loading/Skeleton**: Used in **80+ files**

---

## 🎯 **6. Best Practices**

### **✅ DO:**
1. Use `toastService` for quick notifications (success/error)
2. Use `CustomModal` for confirmations and important dialogs
3. Use `Loading` component for async operations
4. Use `Skeleton` for content placeholders during loading
5. Always handle errors with try-catch blocks
6. Log errors using `logger` before showing to user
7. Provide meaningful error messages to users

### **❌ DON'T:**
1. Don't use `alert()` or `window.confirm()` (use `CustomModal` instead)
2. Don't show technical error details to users
3. Don't forget to stop loading in `finally` block
4. Don't show multiple toasts for the same action
5. Don't use inline loaders for full-page operations

---

## 🔍 **7. Component Locations**

| Component | Location | Type |
|-----------|----------|------|
| `toastService` | `src/services/toastService.js` | Service |
| `CustomSnackBar` | `src/components/CustomSnackBar/custom-sack-bar.js` | Component |
| `CustomModal` | `src/components/CustomModal/custom-modal.js` | Component |
| `Loading` | `src/components/Loading/Loading.js` | Component |
| `LoadingSkeleton` | `src/components/LoadingSkeleton/LoadingSkeleton.js` | Component |
| `Skeleton` (MUI) | Built-in Material-UI | Component |

---

## 📝 **8. Migration Guide**

### **From window.alert() to CustomModal:**
```javascript
// ❌ Old way
if (window.confirm("Delete this item?")) {
    deleteItem();
}

// ✅ New way
<CustomModal
    isOpen={showModal}
    conditionOpen={setShowModal}
    title="Delete Item"
    footer={
        <Box>
            <CustomButton label="Cancel" handleClick={() => setShowModal(false)} />
            <CustomButton label="Delete" handleClick={deleteItem} />
        </Box>
    }
>
    <Typography>Are you sure you want to delete this item?</Typography>
</CustomModal>
```

### **From CustomSnackBar to toastService:**
```javascript
// ❌ Old way (requires state management)
const [snackOpen, setSnackOpen] = useState(false);
const [snackMessage, setSnackMessage] = useState("");
toastService.success("Success!");

// ✅ New way (simpler)
toastService.success("Operation completed successfully!");
```

---

## ✅ **Summary**

### **Available Reusable Components:**

1. **✅ Toast Service** - `toastService.js` - Centralized toast notifications
2. **✅ CustomSnackBar** - Material-UI snackbar component
3. **✅ CustomModal** - Reusable modal/dialog component
4. **✅ Loading Component** - 4 variants (inline, overlay, standalone, minimal)
5. **✅ LoadingSkeleton** - Multiple skeleton variants
6. **✅ Material-UI Skeleton** - Built-in skeleton component

### **Recommendations:**

- **For Quick Messages**: Use `toastService` ✅
- **For Confirmations**: Use `CustomModal` ✅
- **For Loading States**: Use `Loading` component ✅
- **For Content Placeholders**: Use `Skeleton` or `LoadingSkeleton` ✅

All components are **reusable** and **widely used** throughout the application! 🎉

