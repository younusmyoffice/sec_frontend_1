# Test localStorage Flow

## Expected localStorage After Login with Incomplete Profile

After logging in with incomplete profile, localStorage should contain:

```javascript
// From LoginDiagnostic.js lines 161-181
localStorage.setItem("access_token", resData.access_token);
localStorage.setItem("login_Email", resData.email);
localStorage.setItem("email", resData.email);
localStorage.setItem("diagnostic_Email", resData.email);
localStorage.setItem("diagnostic_suid", resData.suid);
localStorage.setItem("user_id", userInfo.userId);
localStorage.setItem("role_id", "4");
localStorage.setItem("jwt_email", userInfo.email);
localStorage.setItem("profile_picture", resData.profile_picture);
localStorage.setItem("contact_no_primary", resData.contact_no_primary);
```

## How to Test

### Step 1: Open Browser DevTools Console

Press F12 and go to Console tab.

### Step 2: Login with Incomplete Profile

Login with credentials that return `INCOMPLETE_PROFILE`.

### Step 3: Check Console Logs

You should see logs from LoginDiagnostic.js:
```
[INFO] Incomplete profile detected, stored diagnostic data: younus@t57.a67 429
[INFO] Stored data for incomplete profile:
[INFO]   - access_token: present
[INFO]   - email: younus@t57.a67
[INFO]   - suid: 429
[INFO]   - role_id: 4
```

### Step 4: Check localStorage

In DevTools Console, type:
```javascript
console.log("access_token:", localStorage.getItem("access_token"));
console.log("diagnostic_suid:", localStorage.getItem("diagnostic_suid"));
console.log("email:", localStorage.getItem("email"));
console.log("login_Email:", localStorage.getItem("login_Email"));
```

Expected output:
```
access_token: eyJhbGci...
diagnostic_suid: 429
email: younus@t57.a67
login_Email: younus@t57.a67
```

### Step 5: Submit Profile

Click "Done" button in ProfileDiagnosticComplete.

### Step 6: Check Profile Submission Logs

You should see:
```
[INFO] === PROFILE DATA EXTRACTION ===
[INFO] diagnosticSuid: 429
[INFO] diagnosticEmail: younus@t57.a67
[INFO] userId: 429
[INFO] access_token present: true
[INFO] diagnostic_suid present: true
```

### Step 7: Check API Request

In Network tab (F12 > Network), find the request to `/sec/auth/updateProfile`.

Check:
1. **Authorization header**: Should have `Bearer eyJhbGci...`
2. **Request payload**: Should have `suid: 429`, `email: "younus@t57.a67"`, `role_id: 4`

## Debugging Steps

If localStorage is empty:

1. **Check if changes were saved**: Refresh the page after making changes
2. **Hard refresh**: Press Ctrl+Shift+R (or Cmd+Shift+R on Mac) to clear cache
3. **Check LoginDiagnostic.js**: Make sure lines 161-181 are present
4. **Check browser cache**: Clear cache and cookies, then try again

If API returns 404:

1. **Check endpoint**: Should be `/sec/auth/updateProfile`
2. **Check axiosInstance baseURL**: Should point to correct server
3. **Check server running**: Make sure backend is running on correct port

If API returns USER_NOT_EXISTS:

1. **Check payload**: Make sure suid and email are in the request
2. **Check backend**: User might not exist in database
3. **Check role_id**: Should be 4 for diagnostic center
