# Explore Component - Debug Logging Guide

## 📊 Console Log Symbols

The following emojis are used in console logs for easy filtering:

| Symbol | Meaning |
|--------|---------|
| 🔵 | Component lifecycle (render, mount) |
| 📡 | API call initiated |
| ✅ | Successful operation |
| ❌ | Error or failure |
| ⏳ | Loading state change |
| 🏁 | Function completion |
| 📦 | Data setting/updating |
| 📊 | Data count/statistics |
| 🎨 | Rendering/JSX execution |
| 📍 | Geolocation operations |
| 🔘 | Category/specialization |
| 🖱️ | User interaction (click) |

---

## 🔍 How to Debug in Browser

### **1. Open Developer Console**

Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows/Linux)

### **2. Filter Console Logs**

You can filter specific operations:

**Filter by operation:**
```javascript
// In browser console, type:
// Filter to see only API calls
console.clear(); // Then run your filter

// Or use browser's built-in filter box and type emoji
// Example: "📡" to see all API calls
```

**Or use console groups:**
```
"🔵" - Component render/mount
"📡" - API calls
"✅" - Success messages
"❌" - Errors
```

---

## 📋 Debug Checklist

### **Expected Console Output Flow:**

1. **Component Renders:**
   ```
   🔵 Explore component rendering...
   🔵 State values: {cardDataLength: 0, ...}
   ```

2. **useEffect Runs:**
   ```
   🔵 useEffect: Component mounted, initializing data fetching
   📦 Setting activeComponent to 'dashboard' in localStorage
   🚀 Starting all API calls...
   ```

3. **Featured Doctors API:**
   ```
   📡 fetchDataNew: Starting API call to /sec/patient/DashboardDoctordetail
   ✅ fetchDataNew: API call successful
   📊 Featured Doctors Count: 5
   📦 Setting cardData with 5 doctors
   🏁 fetchDataNew: Setting loading to false
   ```

4. **Geolocation:**
   ```
   📍 fetchZipcodeFromCurrentLocation: Starting geolocation request
   ⏳ Setting loading to true for geolocation
   ✅ Geolocation successful: {latitude: X, longitude: Y}
   📡 Fetching zipcode from Nominatim API...
   ✅ Nominatim API response received
   📮 Zipcode found: 12345
   🚀 Starting location-based doctor fetches with zipcode: 12345
   ```

5. **Doctors Near Me:**
   ```
   📡 fetchDoctorNearme: Called with zipcodes: [12345]
   ⏳ fetchDoctorNearme: Setting loading to true
   📤 fetchDoctorNearme: Sending request to /sec/patient/doctornearme with data: {...}
   ✅ fetchDoctorNearme: API call successful
   📊 Doctors near me count: 3
   🏁 fetchDoctorNearme: Setting loading to false
   ```

6. **Rendering:**
   ```
   🎨 Explore: Rendering JSX
   📊 Rendering with: {populardocCount: 5, ...}
   🎴 Rendering Popular Doctors section with 5 doctors
   ⭐ Rendering Featured Doctors section with 5 doctors
   🏷️ Rendering Categories with 12 specializations. Selected: CARDIOLOGIST
   ```

---

## 🐛 Common Issues to Watch For

### **Issue 1: No API Calls**
**Symptom:** Only see "🔵 Explore component rendering..." logs

**Check:**
- Is user logged in?
- Is JWT token valid?
- Check Network tab for 401 errors

---

### **Issue 2: Geolocation Fails**
**Symptom:** See "❌ Error getting location: [error message]"

**Possible causes:**
- Browser permissions denied
- HTTPS not used (geolocation requires secure context)
- User denied location permission

**Solution:** Check browser location permissions

---

### **Issue 3: Empty Data**
**Symptom:** API calls succeed but count is 0

**Check logs for:**
```
📊 Featured Doctors Count: 0
```

**Possible causes:**
- Backend returning empty array
- Wrong endpoint
- No data in database

---

### **Issue 4: Infinite Loading**
**Symptom:** "⏳ Setting loading to true" but no "🏁 Setting loading to false"

**Check:**
- Look for "❌" error messages
- Check if API is responding
- Verify axiosInstance configuration

---

### **Issue 5: Category Selection Not Working**
**Symptom:** No "🖱️ Category clicked" logs when clicking

**Check:**
- Is the button disabled?
- Check browser console for JavaScript errors
- Verify CustomButton component

---

## 🔧 Quick Debugging Steps

### **Step 1: Check Component State**
```javascript
// In browser console, inspect current state
console.log("Current state:", {
    populardoc: populardoc.length,
    cardData: cardData.length,
    loading: loading
});
```

### **Step 2: Check API Calls**
Open **Network tab** in DevTools and look for:
- `/sec/patient/DashboardDoctordetail`
- `/sec/patient/doctornearme`
- `/sec/patient/doctorDepartments`

### **Step 3: Check Geolocation**
```javascript
// In browser console:
navigator.geolocation.getCurrentPosition(
    (pos) => console.log("✅ Geolocation works:", pos.coords),
    (err) => console.error("❌ Geolocation failed:", err)
);
```

### **Step 4: Check Token**
```javascript
// In browser console:
console.log("Access Token:", localStorage.getItem("access_token"));
console.log("Token Valid:", !isExpired);
```

---

## 📝 Log Output Example

Here's what a typical successful load looks like:

```
🔵 Explore component rendering...
🔵 State values: {cardDataLength: 0, hcfDataLength: 0, ...}
🔵 useEffect: Component mounted, initializing data fetching
📦 Setting activeComponent to 'dashboard' in localStorage
🚀 Starting all API calls...
📡 fetchDataNew: Starting API call to /sec/patient/DashboardDoctordetail
📍 fetchZipcodeFromCurrentLocation: Starting geolocation request
⏳ Setting loading to true for geolocation
✅ Geolocation successful: {latitude: 40.7128, longitude: -74.0060}
📡 Fetching zipcode from Nominatim API...
✅ Nominatim API response received
📮 Zipcode found: 10001
🚀 Starting location-based doctor fetches with zipcode: 10001
📡 fetchDoctorNearme: Called with zipcodes: [10001]
⏳ fetchDoctorNearme: Setting loading to true
📤 fetchDoctorNearme: Sending request...
✅ fetchDoctorNearme: API call successful
📊 Doctors near me count: 5
🏁 fetchDoctorNearme: Setting loading to false
✅ fetchDataNew: API call successful
📊 Featured Doctors Count: 5
📦 Setting cardData with 5 doctors
🏁 fetchDataNew: Setting loading to false
🎨 Explore: Rendering JSX
📊 Rendering with: {populardocCount: 5, cardDataCount: 5, ...}
🎠 Rendering HorizontalCarousel, loading: false
🎴 Rendering Popular Doctors section with 5 doctors
⭐ Rendering Featured Doctors section with 5 doctors
🏷️ Rendering Categories with 12 specializations. Selected: CARDIOLOGIST
🔘 Category 0: CARDIOLOGIST, Selected: true
🔘 Category 1: NEUROLOGIST, Selected: false
...
```

---

**Date:** 2024  
**Status:** ✅ Debug logging active

