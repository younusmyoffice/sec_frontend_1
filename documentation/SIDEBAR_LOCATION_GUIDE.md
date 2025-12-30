# Sidebar Location Guide

## 📍 **Sidebar Location**

### **File Location:**
```
sec_frontend_v2/src/components/CustomMenuDrawer/custom-menu-drawer.js
```

### **File Size:**
- **819 lines** (complete sidebar implementation)

---

## 🏗️ **Sidebar Structure**

### **Component Name:**
```
CustomMenuDrawer
```

### **Main Elements:**
1. **Top AppBar** (Navigation bar with logo, search, notifications, profile)
2. **Drawer** (Sidebar menu with navigation items)
3. **Main Content Area** (Where dashboard content is displayed)

---

## 📊 **How It Works**

### **1. Drawer Widths:**
```javascript
const drawerWidth = 270;          // Open drawer: 270px
const closedDrawerWidth = 80;     // Closed drawer: 80px  
const mobileDrawerWidth = 280;    // Mobile drawer: 280px
```

### **2. Drawer States:**
- **OPEN**: Width = 270px, shows full menu items with text
- **CLOSED**: Width = 80px, shows only icons
- **Mobile**: Temporary drawer, width = 280px

### **3. Drawer Toggle:**
```javascript
// Toggle button in drawer header
<IconButton onClick={() => setOpen(!open)}>
    {open ? <ChevronLeft /> : <ChevronRight />}
</IconButton>
```

---

## 🎨 **Visual Layout**

```
┌─────────────────────────────────────────────────────┐
│ [Menu Icon] [Logo] [Search] ... [Notifications] [Profile] │ ← AppBar (Top)
├─────────┬─────────────────────────────────────────┤
│         │                                           │
│ Sidebar │ Main Content Area                        │
│  (270px)│ (shifted right to make room for sidebar) │
│         │                                           │
│ - Dashboard ← Active (highlighted)                 │
│ - Appointment                                      │
│ - Manage                                          │
│         │                                           │
│    <    │ ← Toggle button (chevron)                │
│         │                                           │
└─────────┴─────────────────────────────────────────┘
```

---

## 📁 **Related Files**

### **1. Main Component:**
- `src/components/CustomMenuDrawer/custom-menu-drawer.js` - **Main sidebar**

### **2. Styling:**
- `src/components/CustomMenuDrawer/custom-menu-drawer.scss` - **Sidebar styles**

### **3. Usage:**
- `src/PatientModule/BodyDashboard/BodyDashboard.js` - **Uses CustomMenuDrawer**
  - Line 10: `import CustomMenuDrawer from "../../components/CustomMenuDrawer/custom-menu-drawer";`
  - Line 188: `<CustomMenuDrawer>{activeComponent}</CustomMenuDrawer>`

---

## 🔍 **How to Find Sidebar Code**

### **Search for:**
```bash
# Find sidebar files
find . -name "*drawer*" -o -name "*sidebar*"
```

### **Key Files:**
1. `src/components/CustomMenuDrawer/` - Sidebar component directory
2. `custom-menu-drawer.js` - Main sidebar component
3. `custom-menu-drawer.scss` - Sidebar styles

---

## 📝 **Component Usage**

### **In BodyDashboard.js:**
```javascript
import CustomMenuDrawer from "../../components/CustomMenuDrawer/custom-menu-drawer";

// Render the sidebar
<CustomMenuDrawer
    headerLabel={"custom drawer"}
    list1={drawerList1}  // Menu items (Dashboard, Appointment, Manage)
    selectedItems={activeItem}
    profilepath={"patient"}
    handleOnMenuSelect={handleOnMenuSelect}
>
    {activeComponent}  // Main dashboard content goes here
</CustomMenuDrawer>
```

---

## 🎯 **Sidebar Features**

### **1. Navigation Menu (list1):**
- Dashboard
- Appointment  
- Manage

### **2. Drawer Header:**
- Logo (when open)
- Toggle button (chevron icon)

### **3. Top AppBar:**
- Menu toggle button
- Logo (when drawer closed)
- Search & Location
- Notifications
- Profile

### **4. Responsive:**
- Desktop: Permanent drawer (open/closed states)
- Mobile: Temporary drawer (SwipeableDrawer)

---

## 🔄 **How Toggle Works**

### **When User Clicks Toggle:**
1. `onClick={() => setOpen(!open)}` fires
2. `open` state changes (true ↔ false)
3. Drawer width animates (270px ↔ 80px)
4. Main content margin shifts (270px ↔ 80px)
5. Logo shows/hides based on state
6. Menu text shows/hides based on state

---

## 💡 **Where It's Rendered**

### **Component Hierarchy:**
```
BodyDashboard
  └── CustomMenuDrawer (Sidebar)
      ├── AppBar (Top navigation)
      ├── Drawer (Sidebar menu)
      └── Main Content Area
          └── activeComponent (Dashboard content)
```

---

## 📍 **File Path Summary**

| Component | File Path |
|-----------|-----------|
| **Sidebar** | `src/components/CustomMenuDrawer/custom-menu-drawer.js` |
| **Styling** | `src/components/CustomMenuDrawer/custom-menu-drawer.scss` |
| **Usage** | `src/PatientModule/BodyDashboard/BodyDashboard.js` |

---

**The sidebar is the `CustomMenuDrawer` component located at:**
```
sec_frontend_v2/src/components/CustomMenuDrawer/custom-menu-drawer.js
```

