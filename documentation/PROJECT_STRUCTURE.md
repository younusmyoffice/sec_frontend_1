# Project Structure: Share-e-care Frontend

## Overview
This is a React-based healthcare management platform with role-based access for **Patients**, **Doctors**, **Healthcare Facilities (HCF)**, and **Super Admin**.

---

## Directory Structure

```
sec_frontend_v2/
├── src/
│   ├── **Core Files**
│   │   ├── App.js                    # Main application component
│   │   ├── AppRouter.js              # Main routing configuration
│   │   ├── index.js                  # Entry point
│   │   ├── index.html                # HTML template
│   │   └── index.scss                # Global styles
│   │
│   ├── **Module-Based Architecture**
│   │   ├── Auth/                     # Authentication & authorization
│   │   ├── PatientModule/            # Patient features
│   │   ├── DoctorModule/             # Doctor features
│   │   ├── HCFModule/                # Healthcare Facility features
│   │   └── SuperAdminModule/         # Admin features
│   │
│   ├── **Shared Components** (Reusable UI)
│   │   ├── components/               # 40+ reusable components
│   │   ├── VideoCalling/             # Video call SDK integration
│   │   └── ChatsScreen/              # Chat functionality
│   │
│   ├── **Configuration**
│   │   ├── config/                   # Axios config, theme
│   │   ├── constants/                # Constants, routes, API configs
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── services/                 # Business logic services
│   │   ├── utils/                    # Utility functions
│   │   └── reducers/                 # Redux state management
│   │
│   └── **Assets**
│       └── static/                   # Images, icons, styles
│
├── webconfig/                        # Webpack build configurations
├── server/                           # Server-side code
├── Connections/                      # Socket utilities
└── dist/                            # Build output

```

---

## Module Breakdown

### 1. **Auth/** - Authentication Module
**Purpose**: Handle user authentication and authorization

```
Auth/
├── Login/
│   ├── LoginPatient/
│   ├── LoginHCFTypes/
│   │   ├── ClinicLogin/
│   │   └── LoginDiagnostic/
│   └── LoginHCFAdmin/
├── EmailVerification/
├── ForgotPassword/
├── Signup/
└── RoleSelection/                   # Role-based login selection
```

**Key Features**:
- Multi-role authentication (Patient, Doctor, HCF, Super Admin)
- OTP-based login
- Password recovery flow
- Email verification
- JWT token management

---

### 2. **PatientModule/** - Patient Features
**Purpose**: Patient-facing features and dashboards

```
PatientModule/
├── Explore/                         # Browse doctors & HCFs
├── PatientDashboard/                # Main dashboard
├── PatientHCF/                      # HCF details
│   └── DrDetailsCard/
│       ├── Department/
│       └── Labs/
├── PatientAppointment/               # Appointment management
│   ├── UpComing/
│   ├── Completed/
│   ├── Cancelled/
│   └── AppointmentDashboard/
├── PatientManage/                   # Personal management
│   ├── BookingHistory/
│   ├── Transactions/
│   ├── Reports/
│   └── Subscription/
├── Profile/                         # Profile settings
└── MyActivity/                      # Activity tracking
```

**Key Features**:
- Browse doctors and facilities
- Book appointments
- Video consultations
- Medical reports & files
- Payment transactions

---

### 3. **DoctorModule/** - Doctor Features
**Purpose**: Doctor-facing features and management

```
DoctorModule/
├── DoctorDashboard/                 # Main dashboard
├── DoctorAppointmentDashboard/      # Appointment management
├── DoctorListing/                   # Doctor profile listing
├── DoctorManage/                    # Settings management
├── DoctorProfile/                  # Profile information
│   ├── DoctorProfileInfo/
│   └── DoctorProfessionalInfo/
└── DoctorStatistics/                # Analytics & stats
    └── DoctorPayout/
```

**Key Features**:
- Manage appointments
- Edit profile & professional info
- View statistics & earnings
- Accept/reject appointment requests

---

### 4. **HCFModule/** - Healthcare Facility Features
**Purpose**: Hospital/Clinic/Diagnostic center management

```
HCFModule/
├── Clinic/                          # Clinic-specific features
│   ├── ClinicDashboard/
│   ├── ClinicManage/
│   └── ClinicProfile/
├── DiagnosticCenter/                # Diagnostic center features
│   ├── DiagnosticCenterDashboard/
│   ├── DiagnosticProfile/
│   ├── DiagnosticManage/
│   └── DiagnosticCenterReports/
└── HCFAdmin/                        # Admin features for HCF
    ├── AdminDoctor/
    ├── AdminDiagnosticCenter/
    ├── AdminProfile/
    └── AdminManage/
```

**Key Features**:
- Manage doctors & staff
- View bookings & reports
- Diagnostic center management
- Admin dashboard

---

### 5. **SuperAdminModule/** - Admin Features
**Purpose**: Platform administration

```
SuperAdminModule/
├── SuperAdminDashboard/             # Admin dashboard
├── SuperAdminHistory/               # History tracking
├── SuperAdminLogs/                  # Audit logs
├── SuperAdminPackage/               # Package management
└── SuperAdminTransaction/            # Transaction management
```

**Key Features**:
- Platform-wide statistics
- User management
- Audit logs
- Package & transaction management

---

## Component Structure

### **Reusable Components** (`src/components/`)

```
components/
├── Custom Components
│   ├── CustomButton/                 # Custom button component
│   ├── CustomModal/                  # Modal dialogs
│   ├── CustomTextField/              # Form inputs
│   ├── CustomDatePicker/             # Date selection
│   └── CustomDropdown/               # Dropdown menus
│
├── Feature Cards
│   ├── DoctorCard/                   # Doctor display card
│   ├── HealthcareFacilityCard/       # HCF display card
│   └── DoctorProfileCard/            # Doctor profile card
│
├── Navigation
│   ├── Navbar/                       # Top navigation bar
│   ├── HorizontalScrollCards/        # Horizontal scrolling cards
│   ├── CategoryFilter/               # Category filtering
│   └── NavigationTabs/               # Tab navigation
│
├── Utilities
│   ├── LoadingSkeleton/              # Loading states
│   ├── PageLoader/                   # Page loading
│   ├── EmptyState/                   # Empty state display
│   └── NotFound/                     # 404 page
│
└── Special Features
    ├── OTPInput/                     # OTP verification
    ├── PromotionalBanner/             # Banner component
    ├── VerificationLoader/           # Verification UI
    └── DateModal/                    # Date selection modal
```

---

## Configuration Files

### **config/**
- `axiosInstance.js` - API configuration with JWT auth
- `theme.js` - Material-UI theme configuration

### **constants/**
- `apiConstants.js` - API endpoints
- `const.js` - Shared constants & utility functions
- `routes.js` - Route definitions

### **webconfig/**
- `webpack.config.js` - Base webpack configuration
- `webpack.dev.config.js` - Development build
- `webpack.prod.config.js` - Production build

---

## Key Technologies

### **Frontend Stack**
- **React 18.2** - UI framework
- **React Router Dom 6.4** - Routing
- **Material-UI 5** - Component library
- **Redux** - State management
- **Axios** - HTTP client
- **Socket.io** - Real-time communication

### **Development Tools**
- **Webpack 5** - Module bundler
- **Babel** - JavaScript compiler
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Jest** - Testing framework

### **Special Features**
- **VideoCalling/** - Video SDK integration (`@videosdk.live`)
- **PDF Viewer** - Medical report viewing
- **Real-time Chat** - Socket.io integration
- **Payment Integration** - Braintree integration

---

## File Naming Conventions

### **Components**
- PascalCase: `DoctorCard.js`
- Accompanying styles: `DoctorCard.scss`
- Index export: `index.js`

### **Modules**
- PascalCase for folders: `PatientModule/`
- camelCase for utility files: `axiosInstance.js`

### **SCSS Files**
- Same name as component: `DoctorCard.scss`

---

## Routing Structure

Routes are defined in `AppRouter.js` with lazy loading:

```
/patientDashboard/                   # Patient dashboard
  /explore                           # Browse doctors
  /profile                           # Patient profile
  /appointment                       # Appointments
  /hcfDetailCard/:hcfID/             # HCF details
    /about                           # HCF about
    /department                      # HCF departments
  /drDetailsCard/:doctorID          # Doctor details

/doctor/dashboard/                    # Doctor dashboard
  /appointments                       # Doctor appointments
  /listing                           # Doctor listing
  /profile                           # Doctor profile

/hcf/dashboard/                       # HCF dashboard
  /clinic                            # Clinic dashboard
  /diagnostic                        # Diagnostic dashboard
  /admin                             # Admin dashboard

/superadmin/                          # Super admin
```

---

## API Integration

### **Services** (`src/api/services/`)
- Centralized API calls
- JWT authentication
- Error handling
- Request/response interceptors

### **Endpoints** (`src/api/endpoints.js`)
- Centralized endpoint definitions
- Environment-based URLs

---

## Build & Deployment

### **Development**
```bash
npm run dev          # Start dev server (localhost:8000)
```

### **Production**
```bash
npm run prebuild:dev      # Dev environment build
npm run prebuild:stage    # Staging environment build
npm run prebuild:prod     # Production environment build
```

### **Quality Checks**
```bash
npm run format           # ESLint check
npm run prettier         # Prettier check
npm run test             # Run tests
```

---

## Best Practices

1. **Module Organization**: Features grouped by user role
2. **Component Reusability**: Shared components in `components/`
3. **Code Splitting**: Lazy loading for performance
4. **Type Safety**: Prop-types for validation
5. **Styling**: SCSS with BEM methodology
6. **State Management**: Redux for global state
7. **API Calls**: Axios with interceptors
8. **Error Handling**: Try-catch blocks with user feedback

---

## Documentation Files

- `README.md` - Project setup
- `REACT_BEST_PRACTICES.md` - React guidelines
- `NAVIGATION_BEST_PRACTICES.md` - Routing guidelines
- `DEBUGGING_PDF_VIEWER.md` - PDF debugging
- `JWT_MIGRATION_GUIDE.md` - JWT implementation
- `ROUTE_MIGRATION_GUIDE.md` - Routing migration

---

## Key Highlights

✅ **Multi-role Platform** (Patient, Doctor, HCF, Super Admin)  
✅ **Video Consultations** - Integrated video calling  
✅ **Real-time Chat** - Socket.io integration  
✅ **Medical Reports** - PDF viewing & management  
✅ **Payment Integration** - Braintree payments  
✅ **Responsive Design** - Mobile-friendly UI  
✅ **Secure Authentication** - JWT-based security  
✅ **Modular Architecture** - Easy to maintain & scale  

---

## Summary

This project follows a **modular, feature-based architecture** where:
- Each user role has its own module
- Shared components promote reusability
- Clear separation of concerns
- Maintainable and scalable structure

