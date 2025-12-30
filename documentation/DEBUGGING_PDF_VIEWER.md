# PDF Viewer & Download Debugging Guide

## 🔍 Current Status
- **PDF Viewer**: Enhanced with multi-format support (base64, data URLs, HTTP URLs)
- **Download Function**: Enhanced with proper error handling
- **Backend Fix**: Added missing `BookingID` field
- **Debugging**: Added comprehensive console logs

## 🧪 Testing Steps

### 1. **Check Browser Console**
Open browser dev tools and navigate to:
```
http://localhost:8000/patientdashboard/manage/reports/received
```

**Look for these logs:**
```javascript
// API Response logs
"Fetching reports for patient: [patient_id] status: completed"
"Reports received response: [API response]"
"Reports received data: [array data]"

// Row data logs
"Row data: [each row object]"
"Report path: [file path/URL]"
"Report name: [file name]"

// Action logs
"Download triggered - reportPath: [path] fileName: [name]"
"View triggered - reportPath: [path]"
```

### 2. **Common Issues & Solutions**

#### **Issue A: No Data in Table**
**Symptoms:** Empty table or "No Data Found"
**Solutions:**
- Check if `patient_suid` exists in localStorage
- Verify backend API `/sec/patient/reportsReceived/{patient_id}/completed`
- Check if patient has completed test reports

#### **Issue B: Missing report_path**
**Symptoms:** Empty report_path in console logs
**Solutions:**
- Verify test reports were uploaded correctly
- Check if file upload completed successfully
- Verify report_path field in database

#### **Issue C: PDF Not Loading**
**Symptoms:** PDF viewer opens but shows error
**Solutions:**
- Check browser console for PDF.js errors
- Verify file format (PDF, base64, HTTP URL)
- Test with different file types

### 3. **Test Cases**

#### **Test Case 1: Base64 PDF**
```javascript
// Should work with reports uploaded in development mode
report_path: "data:application/pdf;base64,JVBE..."
```

#### **Test Case 2: HTTP URL**
```javascript
// Should work with S3 URLs or other HTTP endpoints
report_path: "https://s3.amazonaws.com/bucket/file.pdf"
```

#### **Test Case 3: Raw Base64**
```javascript
// Should be converted to data URL
report_path: "JVBE..." // Long base64 string without prefix
```

### 4. **Manual Testing**

#### **Create Test Data**
If you need test data, create a simple test file:
```javascript
// In browser console
localStorage.setItem('patient_suid', 'test-patient-id');
```

#### **Test Download Manually**
```javascript
// In browser console
const testPDF = 'data:application/pdf;base64,JVBERi0xLjQKMSEwLmNvbG9y';
const link = document.createElement('a');
link.href = testPDF;
link.download = 'test.pdf';
link.click();
```

### 5. **Backend Troubleshooting**

#### **Check Database Structure**
```sql
-- Check if report_path exists and has data
SELECT test_id, report_name, report_path, status 
FROM sec_tests 
WHERE patient_id = 'YOUR_PATIENT_ID' 
AND status = 'completed';
```

#### **Verify Upload Process**
- Check if reports are being uploaded to S3/local storage
- Verify file conversion from base64 to S3 URL
- Check if report_path is updated in database

## 🚀 Next Steps

1. **Run the application** with debugging logs
2. **Check browser console** for any error messages
3. **Verify data flow** from API to UI
4. **Test with actual report files** if available
5. **Report specific error messages** for targeted fixes

## 📝 Expected File Formats

**Development Mode (Base64):**
```
report_path: "data:application/pdf;base64,JVBERi0xLjQK..."
```

**Production Mode (S3 URL):**
```
report_path: "https://your-bucket.s3.amazonaws.com/reports/file.pdf"
```

**Development Mock Path:**
```
report_path: "dev-uploads/staff/1234567890-report.pdf"
```
