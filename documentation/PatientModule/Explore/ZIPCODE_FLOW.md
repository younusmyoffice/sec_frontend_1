# Zipcode Flow in Explore Component

## 📍 How Zipcodes Are Passed

### **Initial State (Default)**

```javascript
const [zipcodes, setZipcodes] = useState([560043]); // Default: Bangalore
```

**Default Value:** `[560043]` (Bangalore, India)

---

### **Flow Diagram**

```
┌─────────────────────────────────────────────────────────────┐
│ Component Mounts                                             │
│ zipcodes = [560043] (default)                               │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ useEffect Runs                                               │
│ - fetchDataNew() (no zipcode needed)                        │
│ - fetchDataHCFCards() (no zipcode needed)                    │
│ - fetchZipcodeFromCurrentLocation()                         │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ fetchZipcodeFromCurrentLocation()                           │
│ 1. Request browser geolocation                               │
│ 2. Get lat/long from browser                                 │
│ 3. Call Nominatim API to reverse geocode                     │
│ 4. Extract zipcode from response                             │
│ 5. Update state: setZipcodes([extractedZipcode])            │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ Location-Based API Calls                                     │
│ - fetchDoctorNearme([zipcode])                              │
│ - fetchPopularDoctor([zipcode])                             │
│ - fetchfeaturedoctors([zipcode])                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 Detailed Flow

### **1. Component Initialization**

```javascript
// State initialized with default Bangalore zipcode
const [zipcodes, setZipcodes] = useState([560043]);
console.log("📍 Current zipcodes state:", zipcodes);
// Output: 📍 Current zipcodes state: [560043]
```

---

### **2. Component Mount (useEffect)**

```javascript
useEffect(() => {
    console.log("🔵 useEffect: Component mounted");
    
    // Call functions that DON'T need zipcode
    fetchDataNew();           // Featured doctors (no location filter)
    fetchDataHCFCards();      // HCF facilities (no location filter)
    
    // Call function to GET zipcode from user's location
    fetchZipcodeFromCurrentLocation();
    // This will update zipcodes state when geolocation succeeds
}, []);
```

---

### **3. Geolocation Process**

```javascript
const fetchZipcodeFromCurrentLocation = async () => {
    // Step 1: Request location from browser
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            // Example: { latitude: 40.7128, longitude: -74.0060 }
            
            // Step 2: Call Nominatim API (OpenStreetMap)
            const geoResponse = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            
            // Step 3: Extract zipcode
            const zipCode = geoResponse?.data?.address?.postcode;
            // Example: "10001" (New York)
            
            // Step 4: Update state
            setZipcodes([zipCode]); // Update to user's location
            // Example: setZipcodes(["10001"])
            
            // Step 5: Call location-based APIs
            await fetchDoctorNearme([zipCode]);        // ✓ Uses [zipCode]
            await fetchPopularDoctor([zipCode]);       // ✓ Uses [zipCode]
            await fetchfeaturedoctors([zipCode]);       // ✓ Uses [zipCode]
        }
    );
};
```

---

### **4. Location-Based API Functions**

All three functions receive zipcodes as a **parameter**:

#### **A. fetchDoctorNearme**

```javascript
const fetchDoctorNearme = async (zipcodes) => {
    // zipcodes = [extractedZipcode]
    // Example: zipcodes = ["10001"]
    
    const response = await axiosInstance.post(
        "/sec/patient/doctornearme",
        JSON.stringify({
            zipcodes,  // ← Pass array of zipcodes
            type: "Good",
            page: 1,
            limit: 5,
        })
    );
    
    setDocnearme(response?.data?.response || []);
};
```

#### **B. fetchPopularDoctor**

```javascript
const fetchPopularDoctor = async (zipcodes) => {
    // zipcodes = [extractedZipcode]
    // Example: zipcodes = ["10001"]
    
    const response = await axiosInstance.post(
        "/sec/patient/doctor/populardoctors",
        JSON.stringify({
            zipcodes,  // ← Pass array of zipcodes
            type: "Good",
            page: 1,
            limit: 5,
        })
    );
    
    setPopularDoc(response?.data?.response || []);
};
```

#### **C. fetchfeaturedoctors**

```javascript
const fetchfeaturedoctors = async (zipcodes) => {
    // zipcodes = [extractedZipcode]
    // Example: zipcodes = ["10001"]
    
    const response = await axiosInstance.post(
        "/sec/patient/doctor/featureddoctors",
        JSON.stringify({
            zipcodes,  // ← Pass array of zipcodes
            type: "Good",
            page: 1,
            limit: 5,
        })
    );
    
    setFeturedDoc(response?.data?.response || []);
};
```

---

## 🔄 **Complete Flow Example**

### **Scenario: User in New York**

1. **Component renders:**
   ```javascript
   zipcodes = [560043] // Default (Bangalore)
   ```

2. **useEffect runs:**
   ```javascript
   fetchZipcodeFromCurrentLocation()
   ```

3. **Geolocation succeeds:**
   ```javascript
   zipcode extracted = "10001" // New York
   setZipcodes(["10001"])      // Update state
   ```

4. **API calls made with [10001]:**
   ```javascript
   fetchDoctorNearme(["10001"])    // ✓ Gets doctors near NYC
   fetchPopularDoctor(["10001"])   // ✓ Gets popular doctors in NYC
   fetchfeaturedoctors(["10001"])  // ✓ Gets featured doctors in NYC
   ```

5. **Results displayed:**
   - Popular Doctors (NYC area)
   - Featured Doctors (NYC area)
   - Doctors Near You (NYC area)

---

## 🎯 **Key Points**

1. **Default zipcode:** `[560043]` (Bangalore) is used if geolocation fails
2. **Geolocated zipcode:** User's actual location is extracted and used
3. **State update:** `setZipcodes([newZipcode])` updates the zipcodes state
4. **Parameter passing:** All three fetch functions receive zipcodes as a parameter
5. **Array format:** Zipcodes are ALWAYS passed as an array: `[zipcode]`

---

## 🐛 **If Geolocation Fails**

```javascript
// In geolocation error handler:
(error) => {
    console.error("❌ Error getting location:", error.message);
    console.log("⚠️ Skipping location-based doctor fetches");
    console.log("📦 Using default zipcode from state:", zipcodes);
    // zipcodes still = [560043] (default)
    setLoading(false);
}
```

**Result:** Location-based sections will be empty (no data fetched)

---

## ✅ **Summary**

| Step | Zipcode Value | Source |
|------|--------------|---------|
| Initial render | `[560043]` | Default state |
| User grants location | `[extractedZipcode]` | Geolocation API |
| API calls | `[extractedZipcode]` | Passed as parameter |
| If geolocation fails | `[560043]` | Default (no API calls) |

---

**Date:** 2024  
**Status:** ✅ Fixed and documented

