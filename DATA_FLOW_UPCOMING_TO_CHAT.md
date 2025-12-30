# Data Flow: Upcoming.js → ChatRoom.js / ChatPage.js

## Overview
This document explains how appointment data flows from the `Upcoming.js` component to the chat interface (`ChatPage.js` or `ChatRoom.js`).

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. Upcoming.js                                                  │
│    - Fetches appointments from API                              │
│    - Determines join path based on plan_name                   │
│    - Creates path: /patientDashboard/appointment/chats/        │
│      ${first_name}/${roomId}/${appointment_id}                 │
└──────────────────────┬────────────────────────────────────────┘
                        │
                        │ path.join prop
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. UpcomingCard Component                                       │
│    - Receives path object: { join, reject, rescheduled }        │
│    - User clicks "Join" button                                  │
│    - Calls navigate(path.join)                                   │
└──────────────────────┬────────────────────────────────────────┘
                        │
                        │ React Router Navigation
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. AppRouter.js (Route Definition)                              │
│    Route: chats/:roomID/:appointment_id                        │
│    Component: <ChatPage socket={socket} />                     │
└──────────────────────┬────────────────────────────────────────┘
                        │
                        │ URL Parameters
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. ChatPage.js                                                   │
│    - Extracts URL params using useParams()                      │
│    - Gets: roomID, appointment_id                               │
│    - Joins socket room with these parameters                     │
│    - Passes data to ChatBody, ChatBar, ChatFooter               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Data Flow

### Step 1: Upcoming.js - Data Preparation

**Location:** `src/PatientModule/PatientAppointment/UpComing/Upcoming.js`

**Key Code:**
```javascript
// Line 243-256: Determines join path based on appointment type
const getJoinPath = () => {
    if (!canJoin) return null;
    
    if (data?.plan_name === 'video') {
        return `/videocallingsdk/${data?.appointment_id}`;
    } else if (data?.plan_name === 'message') {
        const roomId = data.roomid || data.room_id || 'default';
        return `/patientDashboard/appointment/chats/${data.first_name}/${roomId}/${data?.appointment_id}`;
    }
    
    return null;
};

// Line 258-272: Passes path to UpcomingCard
<UpcomingCard
    key={data.id || data.appointment_id}
    data={data}
    path={{
        reject: "/sec/patient/RejectAppointment",
        rescheduled: "/sec/patient/resheduleAppointment",
        join: getJoinPath(), // ← Path passed here
    }}
    // ... other props
/>
```

**Data Extracted:**
- `data.first_name` - Doctor's first name
- `data.roomid` or `data.room_id` - Socket room ID
- `data.appointment_id` - Appointment identifier
- `data.plan_name` - Appointment type ('message' or 'video')

---

### Step 2: UpcomingCard - Navigation Trigger

**Location:** `src/PatientModule/PatientAppointment/PatientCards.js`

**Key Code:**
```javascript
// Line 489-505: Handles join button click
const JoinAppointment = async () => {
    logger.debug("🚪 Joining appointment", { join_path: path?.join });
    
    if (!path?.join) {
        logger.error("❌ Join path is missing");
        toastService.error("Join path is not available");
        return;
    }
    
    try {
        navigate(path.join); // ← Navigation happens here
        logger.debug("✅ Navigated to join appointment");
    } catch (error) {
        logger.error("❌ Error navigating to join appointment:", error);
        toastService.error("Failed to join appointment");
    }
};
```

**What Happens:**
- User clicks "Join" button on appointment card
- `navigate()` function (from `react-router-dom`) is called with the path
- React Router matches the URL to a route definition

---

### Step 3: AppRouter.js - Route Matching

**Location:** `src/AppRouter.js`

**Key Code:**
```javascript
// Line 370: Route definition for patient chats
<Route 
    path="chats/:roomID/:appointment_id" 
    element={
        <PatientAuthentication>
            <ChatPage socket={socket} />
        </PatientAuthentication>
    } 
/>
```

**Route Structure:**
- Base path: `/patientDashboard/appointment/chats`
- Parameters:
  - `:roomID` - Socket room identifier
  - `:appointment_id` - Appointment ID

**⚠️ Route Mismatch Issue:**
The path generated in `Upcoming.js` includes 3 segments:
```
/patientDashboard/appointment/chats/${first_name}/${roomId}/${appointment_id}
```

But the route definition only expects 2 parameters:
```
chats/:roomID/:appointment_id
```

This means `first_name` is being treated as `roomID`, which could cause issues.

---

### Step 4: ChatPage.js - Data Reception

**Location:** `src/ChatsScreen/components/ChatPage.js`

**Key Code:**
```javascript
// Line 9: Extract URL parameters
const { roomID, appointment_id, user, savedUserName } = useParams();

// Line 46-63: Set up userName and join socket room
useEffect(() => {
    const urlUserName = user; // Get user from URL params
    const storedUserName = localStorage.getItem("userName");
    const derivedName = storedUserName || urlUserName || `User_${Date.now()}`;
    
    setUserName(derivedName);
    localStorage.setItem("userName", derivedName);
    
    // Join room with userName and roomID
    if (derivedName && roomID && socket) {
        console.log("🚪 Joining room:", { userID: derivedName, roomID, appointment_id });
        socket.emit("joinRoom", { userID: derivedName, roomID, appointment_id });
    }
}, [socket, roomID, appointment_id, user]);

// Line 125-128: Pass data to child components
<ChatBar socket={socket} roomID={roomID} savedUserName={userName} />
<ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} roomID={roomID} socket={socket} />
<ChatFooter socket={socket} roomID={roomID} />
```

**Data Received:**
- `roomID` - From URL parameter `:roomID`
- `appointment_id` - From URL parameter `:appointment_id`
- `user` - From URL parameter `:user` (if route includes it)

**Socket Connection:**
- Emits `joinRoom` event with: `{ userID, roomID, appointment_id }`
- Listens for: `messageResponse`, `typingResponse`, `previousMessages`

---

## ChatRoom.js vs ChatPage.js

### ChatRoom.js
**Location:** `src/ChatsScreen/ChatRoom.js`

**Purpose:** 
- Standalone chat component (not used in the appointment flow)
- Used for testing/development
- Has manual room ID and name input fields
- Connects to `http://localhost:4001` socket server

**Usage:**
- Rendered by `Chats.js` component at route `/patientDashboard/appointment/chats` (without parameters)
- Not part of the appointment join flow

### ChatPage.js
**Location:** `src/ChatsScreen/components/ChatPage.js`

**Purpose:**
- Main chat component for appointment-based chats
- Receives data from URL parameters
- Integrates with appointment system
- Used in the actual appointment flow

**Usage:**
- Rendered at route `/patientDashboard/appointment/chats/:roomID/:appointment_id`
- Receives `roomID` and `appointment_id` from URL
- Automatically joins socket room on mount

---

## Data Structure

### Appointment Data (from API)
```javascript
{
    appointment_id: 123,
    first_name: "Dr. John",
    roomid: "room_abc123", // or room_id
    room_id: "room_abc123",
    plan_name: "message", // or "video"
    appointment_date: "2024-01-15",
    appointment_time: "10:00 AM",
    status: "booked" | "in_progress",
    // ... other appointment fields
}
```

### Path Object (passed to UpcomingCard)
```javascript
{
    join: "/patientDashboard/appointment/chats/Dr. John/room_abc123/123",
    reject: "/sec/patient/RejectAppointment",
    rescheduled: "/sec/patient/resheduleAppointment"
}
```

### Socket Join Payload
```javascript
{
    userID: "patient_name",
    roomID: "room_abc123",
    appointment_id: "123"
}
```

---

## Issues & Recommendations

### Issue 1: Route Parameter Mismatch
**Problem:** 
- `Upcoming.js` generates path with 3 segments: `first_name/roomId/appointment_id`
- Route expects 2 parameters: `roomID/appointment_id`

**Impact:**
- `first_name` is incorrectly used as `roomID`
- Actual `roomId` becomes `appointment_id`
- Original `appointment_id` is lost

**Fix:**
```javascript
// In Upcoming.js, change from:
return `/patientDashboard/appointment/chats/${data.first_name}/${roomId}/${data?.appointment_id}`;

// To:
return `/patientDashboard/appointment/chats/${roomId}/${data?.appointment_id}`;
```

### Issue 2: ChatRoom.js Not Used in Flow
**Clarification:**
- `ChatRoom.js` is a separate component for manual testing
- The actual appointment flow uses `ChatPage.js`
- `Chats.js` wrapper renders `ChatRoom.js` but it's not part of the join flow

---

## Summary

1. **Upcoming.js** fetches appointments and creates navigation path
2. **UpcomingCard** receives path and navigates when "Join" is clicked
3. **React Router** matches URL to route and renders `ChatPage`
4. **ChatPage** extracts URL parameters and joins socket room
5. **Socket.IO** handles real-time communication using room ID and appointment ID

The data flows through **URL parameters** (not props), making it shareable and bookmarkable.

