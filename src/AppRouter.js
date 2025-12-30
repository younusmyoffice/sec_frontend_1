/**
 * AppRouter Component
 * 
 * Main routing configuration for the application.
 * Features:
 * - Lazy loading for performance optimization
 * - Role-based authentication guards
 * - Socket.IO integration for real-time communication
 * - Nested routing for complex modules (Patient, Doctor, HCF, SuperAdmin)
 * - Development environment route gating
 * - Suspense boundaries with loading states
 */

import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import Skeleton from "@mui/material/Skeleton";
import socketIO from "socket.io-client";
import logger from "./utils/logger";
import Home from "./ChatsScreen/components/Home";
import ChatPage from "./ChatsScreen/components/ChatPage";
import { UserProvider } from "./loginComponent/UserProvider";
import {
    DoctorAuthentication,
    HealthCareAuthentication,
    PatientAuthentication,
    ClinicAuthentication,
    DiagnostAuthentication,
    SuperAdminAuthentication,
} from "./loginComponent/RequireAuthentication";

// ============================================
// Public Pages & Landing Pages
// ============================================
import Usage from "./pages/Usage";
import Homes from "./pages/landingPage/Home/Homes";
import HowItWorks from "./pages/landingPage/How it Works/Howitworks";
import AboutLanding from "./pages/landingPage/About/AboutLanding";
import SelectRoleLogin from "./Auth/RoleSelection/SelectRoleLogin";
import SelectHCFTypeLoginRole from "./Auth/RoleSelection/SelectHCFTypeLoginRole/SelectHCFTypeLoginRole";
import HcfAdminLogin from "./Auth/Login/LoginHCFAdmin/LoginHCFAdmin";
import SuperAdminLogin from "./Auth/Login/LoginSuperAdmin/LoginSuperAdmin";

// ============================================
// Auth Pages
// ============================================
import PatientLogin from "./Auth/Login/LoginPatient/LoginPatient";
import ForgotPassword from "./Auth/ForgotPassword/ForgotPassword";
import ForgotPasswordOTP from "./Auth/ForgotPasswordOTP/ForgotPasswordOTP";
import ForgotPasswordChange from "./Auth/ForgotPasswordChange/ForgotPasswordChange";
import LoginWithOtp from "./Auth/LoginwithOTP/LoginWithOtp";
import LoginWithOtpVerify from "./Auth/LoginWithOTPVerify/LoginWithOTPVerify";
import SignupPage from "./Auth/Signup/SignupPage/SignupPage";
import PatientCompleteProfile from "./Auth/Login/ProfilePatientComplete/ProfilePatientComplete.js";
import EmailVerification from "./Auth/EmailVerification/EmailVerification";
import SelectRoleSignup from "./Auth/RoleSelection/SelectRoleSignup/SelectRoleSignup";
import DoctorCompleteProfile from "./Auth/Login/ProfileDoctorComplete/ProfileDoctorComplete.js";
import SelectHCFSignup from "./Auth/Login/ProfileHCFComplete/SelectHCFSignup.js";
import DiagnosticCompleteProfile from "./Auth/Login/ProfileHCFComplete/ProfileDiagnosticComplete/ProfileDiagnosticComplete";
import ClinicSignUp from "./Auth/Login/ProfileHCFComplete/ProfileClinicComplete-----old/ProfileClinicComplete.js";
import HCFAdminCompleteProfile from "./Auth/Login/ProfileHCFComplete/ProfileHCFAdminComplete/ProfileHCFAdminComplete";
import HcfClinicCompleteProfile from "./Auth/Login/ProfileHCFComplete/ProfileHcfClinicComplete/ProfileHcfClinicComplete.js";

// ============================================
// Patient Module
// ============================================
import PatientPersonalInformation from "./PatientModule/PatientPersonalInformation/patientpersonalinformation";
import PatientContactInformation from "./PatientModule/PatientContactInformation/patientcontactinformation";
import PatientPaymentInformation from "./PatientModule/PatientPaymentInformation/patientpaymentinformation";
import BodyDashboard from "./PatientModule/BodyDashboard/BodyDashboard";
import Explore from "./PatientModule/Explore/Explore";
import Profile from "./PatientModule/Profile/Profile";
import DrDetailsCard from "./PatientModule/DrDetailsCard/DrDetailsCard";
import Received from "./PatientModule/MyActivity/Received/Received";
import Shared from "./PatientModule/MyActivity/Shared/Shared";
import Upcoming from "./PatientModule/PatientAppointment/UpComing/Upcoming";
import Completed from "./PatientModule/PatientAppointment/Completed/Completed";
import Cancelled from "./PatientModule/PatientAppointment/Cancelled/Cancelled";
import Chats from "./PatientModule/PatientAppointment/Chats/Chats";
import AppointmentDashboard from "./PatientModule/PatientAppointment/AppointmentDashboard";
import Payment from "./PatientModule/Profile/Payment";
import Contact from "./PatientModule/Profile/ContactDetails";
import HCFDetailedCard from "./PatientModule/PatientHCF/DrDetailsCard/HCFDetailedCard";
import About from "./PatientModule/PatientHCF/DrDetailsCard/About/About";
import Department from "./PatientModule/PatientHCF/DrDetailsCard/Department/Department";
import Labs from "./PatientModule/PatientHCF/DrDetailsCard/Labs/Labs";
import HcfDrDetailsCard from "./PatientModule/PatientHCF/DrDetailsCard/DrDetailsContainers/HcfDrDetailsCard.js";
import BookingHistory from "./PatientModule/PatientManage/BookingHistory/BookingHistory";
import Transactions from "./PatientModule/PatientManage/Transactions/Transactions";
import Reports from "./PatientModule/PatientManage/Reports/Reports";
import AllFiles from "./PatientModule/PatientManage/Reports/AllFiles/AllFiles";
import Examined from "./PatientModule/PatientManage/Reports/examined/Examined";
import Subscriptions from "./PatientModule/PatientManage/Subscription/Subscription";

// ============================================
// Doctor Module
// ============================================
import DoctorDashboard from "./DoctorModule/DoctorDashboard/doctordashboard";
import DoctorLogin from "./Auth/Login/LoginDoctor/index.js";
import DoctorAppointmentDashboard from "./DoctorModule/DoctorAppointmentDashboard/DoctorAppointmentDashboard";
import DoctorManage from "./DoctorModule/DoctorManage/DoctorManage";
import DoctorListing from "./DoctorModule/DoctorListing/DoctorListing";
import DoctorSavedDraft from "./DoctorModule/DoctorListing/DoctorSavedDraft/DoctorSavedDraft";
import DoctorStatistics from "./DoctorModule/DoctorStatistics/DoctorStatistics";
import DoctorPayout from "./DoctorModule/DoctorStatistics/DoctorPayout/DoctorPayout";
import DoctorPersonalInfo from "./DoctorModule/DoctorProfile/DoctorProfileInfo/DoctorPersonalInfo";
import DoctorProssionalInfo from "./DoctorModule/DoctorProfile/DoctorProfessionalInfo/DoctorProfessionalInfo";
import TermsAndCondition from "./DoctorModule/DoctorListing/CreateNewListing/TermsAndCondition/TermsAndCondition";
import VideoCall from "./DoctorModule/DoctorAppointmentDashboard/DoctorChat/VideoCall";
import VoiceCall from "./DoctorModule/DoctorAppointmentDashboard/DoctorChat/VoiceCall";
import DoctorChat from "./DoctorModule/DoctorAppointmentDashboard/DoctorChat/DoctorChat";

// ============================================
// HCF Module
// ============================================
import HcfLogin from "./pages/HCFModule------old/HCFLogin/hcflogin.js";
import DiagnosticLogin from "./Auth/Login/LoginHCFTypes/LoginDiagnostic/LoginDiagnostic.js";
import ClinicLogin from "./Auth/Login/LoginHCFTypes/LoginClinic/LoginClinic.js";
import ClinicMainDashboard from "./HCFModule/HCFDashboard/ClinicDashboard/ClinicMainDashboard";
import DiagnosticCenterDashboard from "./HCFModule/HCFDashboard/DiagnosticCenterDashboard/DiagnosticCenterDashboard";
import DiagnosticCenterProfile from "./HCFModule/DiagnosticCenter/DiagnosticProfile/DiagnstCenterProfileDashboard";
import DiagnosticCenterManage from "./HCFModule/DiagnosticCenter/DiagnosticManage/DiagnosticCenterManage";
import ClinicDashboard from "./HCFModule/Clinic/ClinicDashboard/ClinicDashboard";
import ClinicMyAppointments from "./HCFModule/Clinic/ClinicMyAppointments/ClinicMyAppointments";
import ClinicProfile from "./HCFModule/Clinic/ClinicProfile/ClinicProfile";
import ClinicManage from "./HCFModule/Clinic/ClinicManage/ClinicManage";
import AdminMainDashboard from "./HCFModule/HCFDashboard/AdminDashboard/AdminDashboard";
import AdminDoctor from "./HCFModule/HCFAdmin/AdminDoctor/AdminDoctor";
import AdminProfile from "./HCFModule/HCFAdmin/AdminProfile/AdminProfile";
import HCFBlocked from "./HCFModule/HCFAdmin/AdminDoctor/Blocked/Blocked";
import HCFAddDoctors from "./HCFModule/HCFAdmin/AdminDoctor/AddDoctor/AddDoctor";
import HCFAddPackage from "./HCFModule/HCFAdmin/AdminDoctor/AddPackage/AddPackage";
import AdminDiagnosticCenter from "./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminDiagnosticCenter";
import AdminManage from "./HCFModule/HCFAdmin/AdminManage/AdminManage";
import AdminManageAuditLog from "./HCFModule/HCFAdmin/AdminManage/AdminManageAuditLog/AdminManageAuditLog";
import DiagnosticCenterReports from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticCenterReports";
import DiagnosticPatientChats from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticCenterChat/DiagnostCenterChats";
import DiagnosticCenterCharts from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticCenterCharts/DiagnosticCenterCharts";
import DiagnostLabs from "./HCFModule/HCFAdmin/AdminDiagnosticCenter/Labs/DiagnostLabs";
import AdminLabDetail from "./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminLabs/AdminLabDetails/AdminLabDetail";

// ============================================
// Super Admin Module
// ============================================
import SuperAdminBody from "./SuperAdminModule/SuperAdminBody/SuperAdminBody";
import SuperAdminDashboard from "./SuperAdminModule/SuperAdminDashboard/SuperAdminDashboard";
import SuperAdminHistory from "./SuperAdminModule/SuperAdminHistory/SuperAdminhistory";
import SuperAdminDoctor from "./SuperAdminModule/SuperAdminAcessibility/SuperAdminDoctor/SuperAdminDoctor";
import SuperAdminPatient from "./SuperAdminModule/SuperAdminAcessibility/SuperAdminpatient/SuperAdminPatient";
import SuperAdminLogsBody from "./SuperAdminModule/SuperAdminLogs/SuperAdminLogsBody";
import SuperAdminLogs from "./SuperAdminModule/SuperAdminLogs/SuperAdminAuditLogs/SuperAdminAuditLogs";
import SuperAdminMainDashboard from "./SuperAdminModule/SuperAdminDashboard/SuperAdminMainDashboard/superadminmaindashboard";
import SuperAdminHCF from "./SuperAdminModule/SuperAdminAcessibility/SuperAdminHCF/SuperAdminHCF";
import SuperAdminHistoryDoctor from "./SuperAdminModule/SuperAdminHistory/SuperAdminHistoryDoctor/SuperAdminHistoryDoctor";
import SuperAdminHistoryPatient from "./SuperAdminModule/SuperAdminHistory/SuperAdminHistoryPatient/SuperAdminHistoryPatient";
import SuperAdminHistoryHCF from "./SuperAdminModule/SuperAdminHistory/SuperAdminHistoryHCF/SuperAdminHistoryHCF";
import SuperAdminPackage from "./SuperAdminModule/SuperAdminPackage/SuperAdminPackage";
import PackagePatient from "./SuperAdminModule/SuperAdminPackage/PackagePatient/PackagePatient";
import PackageDoctor from "./SuperAdminModule/SuperAdminPackage/PackageDoctor/PackageDoctor";
import SuperAdminAccessibilty from "./SuperAdminModule/SuperAdminAcessibility/SuperAdminAccessibility";
import SuperAdminTransaction from "./SuperAdminModule/SuperAdminTransaction/SperAdminTransaction";
import SuperAdminTranDoctors from "./SuperAdminModule/SuperAdminTransaction/TransactionDoctors/SuperAdminTranDoctors";
import SuperAdminTranHCF from "./SuperAdminModule/SuperAdminTransaction/TransactionHCF/SuperAdminTranHCF";

// ============================================
// Video Calling & Chat
// ============================================
import VideoCallingSDK from "./VideoCalling/VideoCallingSDK";
import ChatRoom from "./ChatsScreen/ChatRoom";

// ============================================
// Lazy Loaded Components (Performance Optimization)
// ============================================
const ManageDashboard = lazy(() => import("./PatientModule/PatientManage/ManageDashboard"));
const LazyPatientMyActivity = lazy(() => import("./PatientModule/MyActivity/MyActivity"));
const LazyPatientExplore = lazy(() => import("./PatientModule/Explore/Explore"));
const NotFound = lazy(() => import("./components/NotFound"));

// Doctor lazy loaded components
const LazyDoctorrequest = lazy(() => import("./DoctorModule/DoctorMainDashboard/Request.js/Request"));
const LazyDoctorNotification = lazy(() => import("./DoctorModule/DoctorMainDashboard/Notification.js/Notification"));
const LazyDoctorUpcoming = lazy(() => import("./DoctorModule/DoctorAppointmentDashboard/DoctorUpcoming/DoctorUpcoming"));
const LazyDoctorRequest = lazy(() => import("./DoctorModule/DoctorAppointmentDashboard/DoctorRequest/DoctorRequest"));
const LazyDoctorCompleted = lazy(() => import("./DoctorModule/DoctorAppointmentDashboard/DoctorCompleted/DoctorCompleted"));
const LazyDoctorCancelled = lazy(() => import("./DoctorModule/DoctorAppointmentDashboard/DoctorCancelled/DoctorCancelled"));
const LazyDoctorActiveListing = lazy(() => import("./DoctorModule/DoctorListing/DoctorActiveListing/DoctorActiveLising"));
const LazyDoctorSavedDraft = lazy(() => import("./DoctorModule/DoctorListing/DoctorSavedDraft/DoctorSavedDraft"));
const LazyDoctorBookingHistory = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorBookingHistory/DoctorBookingHistory"));
const LazyDoctorTransaction = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorTransactions/DoctorTransaction"));
const LazyDoctorOverview = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorOverview/DoctorOverview"));
const LazyDoctorPayout = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorPayout/DoctorPayout"));
const LazyDoctorStaff = lazy(() => import("./DoctorModule/DoctorManage/DoctorStaff/DoctorStaff"));
const LazyDoctorAuditLog = lazy(() => import("./DoctorModule/DoctorManage/DoctorAuditLog/doctorAuditLog"));
const LazyDoctorListingDetails = lazy(() => import("./DoctorModule/DoctorListing/DoctorListingDetails/DoctorListingDetails"));
const LazyDoctorAddPlans = lazy(() => import("./DoctorModule/DoctorListing/CreateNewListing/AddPlan/AddPlan"));
const LazyDoctorAddQuestioner = lazy(() => import("./DoctorModule/DoctorListing/CreateNewListing/AddQuestioner/AddQuestioner"));
const LazyDoctorChat = lazy(() => import("./DoctorModule/DoctorAppointmentDashboard/DoctorChat/DoctorChat"));

// Diagnostic Center lazy loaded components
const LazyDiagnosticNotification = lazy(() => import("./HCFModule/DiagnosticCenter/DiagnosticDashboard/DiagnosticNotification/DiagnosticNotification"));
const LazyDiagnosticProfileInformation = lazy(() => import("./HCFModule/DiagnosticCenter/DiagnosticProfile/DiagnostCenterProfileInfo/DiagnostCenterProfileInfo"));
const LazyDiagnosticAuditLogs = lazy(() => import("./HCFModule/DiagnosticCenter/DiagnosticManage/DiagnosticCenterAuditLog/diagnosticCenterAuditLog"));
const LazyDiagnosticPatientSearch = lazy(() => import("./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticPatientSearch/DiagnosticPatientSearch"));
const LazyDiagnosticPatientShared = lazy(() => import("./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagonisticCenterShared/DiagostCenterShared"));
const LazyDiagnosticSalesActivities = lazy(() => import("./HCFModule/DiagnosticCenter/DiagnosticManage/DiagnostcCenterStaff/DiagnosticSalesActivities"));

// Clinic lazy loaded components
const LazyClinicNotification = lazy(() => import("./HCFModule/Clinic/ClinicDashboard/ClinicNotification/Clinicnotification"));
const LazyClinicRequests = lazy(() => import("./HCFModule/Clinic/ClinicDashboard/ClinicRequests/ClinicRequests"));
const LazyClinicAppointmentRequest = lazy(() => import("./HCFModule/Clinic/ClinicMyAppointments/ClinicRequests/ClinicAppointmentRequest"));
const LazyClinicUpcoming = lazy(() => import("./HCFModule/Clinic/ClinicMyAppointments/ClinicUpcoming/ClinicUpcoming"));
const LazyClinicCompleted = lazy(() => import("./HCFModule/Clinic/ClinicMyAppointments/ClinicCompleted/ClinicCompleted"));
const LazyClinicCancelled = lazy(() => import("./HCFModule/Clinic/ClinicMyAppointments/ClinicCancelled/ClinicCancelled"));
const LazyClinicChats = lazy(() => import("./HCFModule/Clinic/ClinicMyAppointments/ClinicChats/ClinicChats"));
const LazyClinicProfileInformation = lazy(() => import("./HCFModule/Clinic/ClinicProfile/ClinicProfileInformation/ClinicProfileInformation"));
const LazyClinicProfessionalInformation = lazy(() => import("./HCFModule/Clinic/ClinicProfile/ClinicProfessionalInformation/ClinicProfessionalInformation"));
const LazyClinicSalesActivities = lazy(() => import("./HCFModule/Clinic/ClinicManage/ClinicStaff/ClinicSalesActivities"));
const LazyClinicAuditLog = lazy(() => import("./HCFModule/Clinic/ClinicManage/ClinicAuditLog/ClinicAuditLog"));

// HCF Admin lazy loaded components
const LazyAdminNotification = lazy(() => import("./HCFModule/HCFAdmin/AdminDashboard/Notifications/HCFAdminNotification"));
const LazyAdminProfile = lazy(() => import("./HCFModule/HCFAdmin/AdminProfile/AdminProfile"));
const LazyAdminAllDoctors = lazy(() => import("./HCFModule/HCFAdmin/AdminDoctor/AllDoctors/AllDoctor"));
const LazyAdminActive = lazy(() => import("./HCFModule/HCFAdmin/AdminDoctor/Active/Active"));
const LazyAdminLabs = lazy(() => import("./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminLabs/AdminLabs"));
const LazyAdminStaff = lazy(() => import("./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminStaff/AdminStaff"));
const LazyAdminBlocked = lazy(() => import("./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminBlocked/AdminBlocked"));
const LazyAdminSalesActivities = lazy(() => import("./HCFModule/HCFAdmin/AdminManage/AdminManageSale/AdminManageSale"));
const LazyAdminOverview = lazy(() => import("./HCFModule/HCFAdmin/AdminManage/AdminOverview/AdminOverview"));
const LazyAdminBooking = lazy(() => import("./HCFModule/HCFAdmin/AdminManage/AdminManageBooking/AdminBooking"));
const LazyAdminPayout = lazy(() => import("./HCFModule/HCFAdmin/AdminManage/AdminManagePayout/AdminPayout"));

// Super Admin lazy loaded components
const LazySuperAdminDoctor = lazy(() => import("./SuperAdminModule/SuperAdminAcessibility/SuperAdminDoctor/SuperAdminDoctor"));
const LazySuperAdminPatient = lazy(() => import("./SuperAdminModule/SuperAdminAcessibility/SuperAdminpatient/SuperAdminPatient"));
const LazySuperAdminHCF = lazy(() => import("./SuperAdminModule/SuperAdminAcessibility/SuperAdminHCF/SuperAdminHCF"));
const LazySuperAdminHistoryDoctor = lazy(() => import("./SuperAdminModule/SuperAdminHistory/SuperAdminHistoryDoctor/SuperAdminHistoryDoctor"));
const LazySuperAdminHistoryPatient = lazy(() => import("./SuperAdminModule/SuperAdminHistory/SuperAdminHistoryDoctor/SuperAdminHistoryDoctor"));
const LazySuperAdminHistoryHCF = lazy(() => import("./SuperAdminModule/SuperAdminHistory/SuperAdminHistoryDoctor/SuperAdminHistoryDoctor"));
const LazySuperAdminPackagePatient = lazy(() => import("./SuperAdminModule/SuperAdminPackage/PackagePatient/PackagePatient"));
const LazySuperAdminPackageDoctor = lazy(() => import("./SuperAdminModule/SuperAdminPackage/PackageDoctor/PackageDoctor"));
const LazySuperAdminTranDoctor = lazy(() => import("./SuperAdminModule/SuperAdminTransaction/TransactionDoctors/SuperAdminTranDoctors"));
const LazySuperAdminTranHCF = lazy(() => import("./SuperAdminModule/SuperAdminTransaction/TransactionHCF/SuperAdminTranHCF"));

// ============================================
// Environment Configuration
// ============================================
const DevEnv = process.env.NODE_ENV;

// ============================================
// Socket.IO Setup
// ============================================
/**
 * Initialize Socket.IO connection for real-time communication
 * - Reconnection settings: 5 attempts with exponential backoff
 * - Connection debugging via logger
 */

const socket = socketIO.connect("http://localhost:4001", {
    // put here the url of backend
    reconnectionAttempts: 5, // Attempt reconnection up to 5 times
    reconnectionDelay: 1000, // Delay between reconnection attempts (1 second)
    reconnectionDelayMax: 5000, // Max delay between reconnection attempts (5 seconds)
});

// Add connection debugging with logger
socket.on('connect', () => {
    logger.info('🔌 Socket connected successfully:', socket.id);
});

socket.on('connect_error', (error) => {
    logger.error('❌ Socket connection error:', error);
});

socket.on('disconnect', (reason) => {
    logger.info('🔌 Socket disconnected:', reason);
});

// Log environment on mount
logger.debug('Application environment:', DevEnv);

// ============================================
// Main Router Component
// ============================================
/**
 * AppRouter - Main routing configuration
 * 
 * Features:
 * 1. UserProvider - Provides user context throughout the app
 * 2. Suspense boundaries - Shows loading states for lazy-loaded components
 * 3. Role-based authentication guards
 * 4. Nested routing for complex modules
 * 5. Socket.IO integration for real-time features
 * 6. Development environment route gating
 */
export const AppRouter = () => (
    <UserProvider>
        <Suspense fallback={<PageLoader text="Please wait while we load your application" />}>
            <Routes>
                {/* Development environment routes */}
                {DevEnv && (
                    <>
                        {/* Public/Landing Pages */}
                        <Route path="/usage" element={<Usage />} />
                        <Route path="/SelectRoleLogin" element={<SelectRoleLogin />} />
                        <Route path="/SelectHCFTypeLoginRole" element={<SelectHCFTypeLoginRole />} />
                        <Route path="/patientLogin" element={<PatientLogin />} />
                        <Route path="/hcfAdminLogin" element={<HcfAdminLogin />} />
                        <Route path="/superAdminLogin" element={<SuperAdminLogin />} />
                        <Route path="/" element={<Homes />} />
                        <Route path="/howItWorks" element={<HowItWorks />} />
                        <Route path="/aboutLanding" element={<AboutLanding />} />

                        {/* Signup Routes */}
                        <Route path="/selectRoleSignup" element={<SelectRoleSignup />} />
                        <Route path="/doctorCompleteProfile" element={<DoctorCompleteProfile />} />
                        <Route path="/selectHcfSignup" element={<SelectHCFSignup />} />
                        <Route path="/diagnosticCompleteProfile" element={<DiagnosticCompleteProfile />} />
                        <Route path="/diagnostClinicSignup" element={<ClinicSignUp />} />
                        <Route path="/hcfAdminCompleteProfile" element={<HCFAdminCompleteProfile />} />
                        <Route path="/clinicDoctorCompleteProfile" element={<ClinicAuthentication><HcfClinicCompleteProfile /></ClinicAuthentication>} />

                        {/* Auth Routes */}
                        <Route path="/ForgotPassword" element={<ForgotPassword />} />
                        <Route path="/ForgotPasswordOTP" element={<ForgotPasswordOTP />} />
                        <Route path="/ForgotPasswordChange" element={<ForgotPasswordChange />} />
                        <Route path="/LoginWithOtp" element={<LoginWithOtp />} />
                        <Route path="/LoginWithOtpVerify" element={<LoginWithOtpVerify />} />
                        <Route path="/signupPage" element={<SignupPage />} />
                        <Route path="/patientCompleteProfile" element={<PatientCompleteProfile />} />
                        <Route path="/emailVerification" element={<EmailVerification />} />
                        <Route path="/patientPersonalInformation" element={<PatientPersonalInformation />} />
                        <Route path="/patientContactInformation" element={<PatientContactInformation />} />
                        <Route path="/patientPaymentInformation" element={<PatientPaymentInformation />} />

                        {/* Patient Dashboard Routes */}
                        <Route
                            path="/patientDashboard"
                            element={
                                <PatientAuthentication>
                                    <BodyDashboard />
                                </PatientAuthentication>
                            }
                        >
                            {/* Index route - redirect to dashboard by default */}
                            <Route index element={<Navigate to="dashboard" replace />} />
                            
                            {/* Dashboard routes */}
                            <Route path="dashboard">
                                {/* Index route - redirect to explore by default */}
                                <Route index element={<Navigate to="explore" replace />} />
                                <Route path="explore" element={<PatientAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyPatientExplore></LazyPatientExplore></React.Suspense></PatientAuthentication>} />
                                <Route path="myactivity" element={<PatientAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyPatientMyActivity></LazyPatientMyActivity></React.Suspense></PatientAuthentication>}>
                                    <Route path="received" element={<PatientAuthentication><Received /></PatientAuthentication>} />
                                    <Route path="shared" element={<PatientAuthentication><Shared /></PatientAuthentication>} />
                                </Route>
                                <Route path="profile" element={<PatientAuthentication><Profile /></PatientAuthentication>} />
                                <Route path="payment" element={<PatientAuthentication><Payment /></PatientAuthentication>} />
                                <Route path="contact" element={<PatientAuthentication><Contact /></PatientAuthentication>} />
                                <Route path="patienthcf" element={<PatientAuthentication><HCFDetailedCard /></PatientAuthentication>} />
                            </Route>

                            {/* Appointment Routes */}
                            <Route path="appointment" element={<PatientAuthentication><AppointmentDashboard /></PatientAuthentication>}>
                                <Route path="upcoming" element={<PatientAuthentication><Upcoming /></PatientAuthentication>} />
                                <Route path="completed" element={<PatientAuthentication><Completed /></PatientAuthentication>} />
                                <Route path="cancelled" element={<PatientAuthentication><Cancelled /></PatientAuthentication>} />
                                <Route path="chats" element={<PatientAuthentication><Chats /></PatientAuthentication>} />
                                {/* Route with 3 parameters: user/roomID/appointment_id - uses ChatRoom */}
                                <Route path="chats/:user/:roomID/:appointment_id" element={<PatientAuthentication><Chats /></PatientAuthentication>} />
                                {/* Route with 2 parameters: roomID/appointment_id - uses ChatPage */}
                                <Route path="chats/:roomID/:appointment_id" element={<PatientAuthentication><ChatPage socket={socket} /></PatientAuthentication>} />
                                <Route path="profile" element={<PatientAuthentication><Profile /></PatientAuthentication>} />
                                <Route path="payment" element={<PatientAuthentication><Payment /></PatientAuthentication>} />
                                <Route path="contact" element={<PatientAuthentication><Contact /></PatientAuthentication>} />
                            </Route>

                            {/* Manage Routes */}
                            <Route path="manage" element={<PatientAuthentication><ManageDashboard /></PatientAuthentication>}>
                                <Route path="bookinghistory" element={<PatientAuthentication><BookingHistory /></PatientAuthentication>} />
                                <Route path="transactions" element={<PatientAuthentication><Transactions /></PatientAuthentication>} />
                                <Route path="reports" element={<PatientAuthentication><Reports /></PatientAuthentication>}>
                                    <Route path="request" element={<PatientAuthentication><AllFiles /></PatientAuthentication>} />
                                    <Route path="examined" element={<PatientAuthentication><Examined /></PatientAuthentication>} />
                                    <Route path="received" element={<PatientAuthentication><Received /></PatientAuthentication>} />
                                    <Route path="shared" element={<PatientAuthentication><Shared /></PatientAuthentication>} />
                                </Route>
                                <Route path="subscriptions" element={<PatientAuthentication><Subscriptions /></PatientAuthentication>} />
                                <Route path="profile" element={<PatientAuthentication><Profile /></PatientAuthentication>} />
                                <Route path="payment" element={<PatientAuthentication><Payment /></PatientAuthentication>} />
                                <Route path="contact" element={<PatientAuthentication><Contact /></PatientAuthentication>} />
                            </Route>

                            {/* Doctor Details */}
                            <Route path="drDetailsCard/:resID" element={<PatientAuthentication><DrDetailsCard /></PatientAuthentication>} />
                            <Route path="hcfDetailCard/hcfDoctor/:hcddocid/:reshcfID" element={<PatientAuthentication><HcfDrDetailsCard /></PatientAuthentication>} />
                            <Route path="hcfDetailCard/:hcfID" element={<PatientAuthentication><HCFDetailedCard /></PatientAuthentication>}>
                                <Route path="about" element={<PatientAuthentication><About /></PatientAuthentication>} />
                                <Route path="department" element={<PatientAuthentication><Department /></PatientAuthentication>} />
                                <Route path="labs" element={<PatientAuthentication><Labs /></PatientAuthentication>} />
                            </Route>
                        </Route>

                        {/* Doctor Dashboard Routes */}
                        <Route path="/doctorlogin" element={<DoctorLogin />} />
                        <Route path="/doctorLogin" element={<DoctorLogin />} />
                        <Route path="doctorDashboard/doctorAppointment/chats/videoCall" element={<VideoCall />} />
                        <Route path="/doctorDashboard" element={<DoctorAuthentication><DoctorDashboard /></DoctorAuthentication>}>
                            <Route path="doctorPersonalInfo" element={<DoctorAuthentication><DoctorPersonalInfo /></DoctorAuthentication>} />
                            <Route path="doctorProfessionalInfo" element={<DoctorAuthentication><DoctorProssionalInfo /></DoctorAuthentication>} />
                            <Route path="request" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorrequest /></React.Suspense></DoctorAuthentication>} />
                            <Route path="notification" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorNotification /></React.Suspense></DoctorAuthentication>} />
                            <Route path="doctorAppointment" element={<DoctorAuthentication><DoctorAppointmentDashboard /></DoctorAuthentication>}>
                                <Route path="request" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorRequest /></React.Suspense></DoctorAuthentication>} />
                                <Route path="upcoming" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorUpcoming /></React.Suspense></DoctorAuthentication>} />
                                <Route path="completed" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorCompleted /></React.Suspense></DoctorAuthentication>} />
                                <Route path="cancelled" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorCancelled /></React.Suspense></DoctorAuthentication>} />
                                <Route path="chats" element={<DoctorAuthentication><DoctorChat /></DoctorAuthentication>} />
                                <Route path="chats/:user/:roomID" element={<DoctorAuthentication><Home socket={socket} /></DoctorAuthentication>} />
                                <Route path="chats/:user/:roomID/:appointment_id" element={<DoctorAuthentication><ChatPage socket={socket} /></DoctorAuthentication>} />
                                <Route path="chats/:roomID" element={<DoctorAuthentication><ChatPage socket={socket} /></DoctorAuthentication>} />
                                <Route path="doctorPersonalInfo" element={<DoctorAuthentication><DoctorPersonalInfo /></DoctorAuthentication>} />
                                <Route path="chats/voicecall" element={<DoctorAuthentication><VoiceCall /></DoctorAuthentication>} />
                            </Route>
                            <Route path="doctorListing" element={<DoctorAuthentication><DoctorListing /></DoctorAuthentication>}>
                                <Route path="doctorPersonalInfo" element={<DoctorAuthentication><DoctorPersonalInfo /></DoctorAuthentication>} />
                                <Route path="doctoractiveListing" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorActiveListing /></React.Suspense></DoctorAuthentication>} />
                                <Route path="listingdetails" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorListingDetails /></React.Suspense></DoctorAuthentication>} />
                                <Route path="addplans" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorAddPlans /></React.Suspense></DoctorAuthentication>} />
                                <Route path="addquestioner" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorAddQuestioner /></React.Suspense></DoctorAuthentication>} />
                                <Route path="termandcondition" element={<DoctorAuthentication><TermsAndCondition /></DoctorAuthentication>} />
                                <Route path="editlistingdetails" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorListingDetails /></React.Suspense></DoctorAuthentication>} />
                                <Route path="editaddplans" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorAddPlans /></React.Suspense></DoctorAuthentication>} />
                                <Route path="editaddquestioner" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorAddQuestioner /></React.Suspense></DoctorAuthentication>} />
                                <Route path="edittermandcondition" element={<DoctorAuthentication><TermsAndCondition /></DoctorAuthentication>} />
                                <Route path="doctorsavedInDraft" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorSavedDraft /></React.Suspense></DoctorAuthentication>} />
                            </Route>
                            <Route path="doctorStatistics" element={<DoctorAuthentication><DoctorStatistics /></DoctorAuthentication>}>
                                <Route path="doctorPersonalInfo" element={<DoctorAuthentication><DoctorPersonalInfo /></DoctorAuthentication>} />
                                <Route path="doctorBookingHistory" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorBookingHistory /></React.Suspense></DoctorAuthentication>} />
                                <Route path="doctorTransaction" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorTransaction /></React.Suspense></DoctorAuthentication>} />
                                <Route path="doctorOverview" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorOverview /></React.Suspense></DoctorAuthentication>} />
                                <Route path="doctorPayout" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorPayout /></React.Suspense></DoctorAuthentication>} />
                            </Route>
                            <Route path="doctorManage" element={<DoctorAuthentication><DoctorManage /></DoctorAuthentication>}>
                                <Route path="doctorPersonalInfo" element={<DoctorAuthentication><DoctorPersonalInfo /></DoctorAuthentication>} />
                                <Route path="doctorStaff" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorStaff /></React.Suspense></DoctorAuthentication>} />
                                <Route path="doctorAuditLog" element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDoctorAuditLog /></React.Suspense></DoctorAuthentication>} />
                            </Route>
                        </Route>

                        {/* HCF Routes */}
                        <Route path="/hcfLogin" element={<HcfLogin />} />
                        <Route path="/clinicLogin" element={<ClinicLogin />} />
                        <Route path="/diagnostCenterLogin" element={<DiagnosticLogin />} />
                        
                        {/* Clinic Dashboard Routes */}
                        <Route path="/clinicDashboard" element={<ClinicAuthentication><ClinicMainDashboard /></ClinicAuthentication>}>
                            <Route path="clinicBodyDashboard" element={<ClinicAuthentication><ClinicDashboard /></ClinicAuthentication>}>
                                <Route path="cliniRequests" element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyClinicRequests /></React.Suspense></ClinicAuthentication>} />
                                <Route path="clinicNotification" element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyClinicNotification /></React.Suspense></ClinicAuthentication>} />
                            </Route>
                            <Route path="clinicMyAppointment" element={<ClinicAuthentication><ClinicMyAppointments /></ClinicAuthentication>}>
                                <Route path="clinicRequest" element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyClinicAppointmentRequest /></React.Suspense></ClinicAuthentication>} />
                                <Route path="clinicUpcoming" element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyClinicUpcoming /></React.Suspense></ClinicAuthentication>} />
                                <Route path="clinicCompleted" element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyClinicCompleted /></React.Suspense></ClinicAuthentication>} />
                                <Route path="clinicCancelled" element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyClinicCancelled /></React.Suspense></ClinicAuthentication>} />
                                <Route path="clinicChats" element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyClinicChats /></React.Suspense></ClinicAuthentication>} />
                                <Route path="clinicChats/:user/:roomID/:appointment_id" element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><ChatPage socket={socket} /></React.Suspense></ClinicAuthentication>} />
                            </Route>
                            <Route path="clinicProfile" element={<ClinicAuthentication><ClinicProfile /></ClinicAuthentication>}>
                                <Route path="profileinformation" element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyClinicProfileInformation /></React.Suspense></ClinicAuthentication>} />
                                <Route path="clinicProfessionalInformation" element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyClinicProfessionalInformation /></React.Suspense></ClinicAuthentication>} />
                            </Route>
                            <Route path="clinicManage" element={<ClinicAuthentication><ClinicManage /></ClinicAuthentication>}>
                                <Route path="clinicSalesActivities" element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyClinicSalesActivities /></React.Suspense></ClinicAuthentication>} />
                                <Route path="clinicAuditLog" element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyClinicAuditLog /></React.Suspense></ClinicAuthentication>} />
                            </Route>
                        </Route>

                        {/* Diagnostic Center Dashboard Routes */}
                        <Route path="/diagnostCenterDashboard" element={<DiagnostAuthentication><DiagnosticCenterDashboard /></DiagnostAuthentication>}>
                            <Route path="notification" element={<DiagnostAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDiagnosticNotification /></React.Suspense></DiagnostAuthentication>} />
                            <Route path="diagnosticCenterReports" element={<DiagnostAuthentication><DiagnosticCenterReports /></DiagnostAuthentication>}>
                                <Route path="request" element={<DiagnostAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDiagnosticPatientSearch /></React.Suspense></DiagnostAuthentication>} />
                                <Route path="examination" element={<DiagnostAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDiagnosticPatientShared /></React.Suspense></DiagnostAuthentication>} />
                                <Route path="report" element={<DiagnostAuthentication><DiagnosticPatientChats /></DiagnostAuthentication>} />
                                <Route path="Chart" element={<DiagnostAuthentication><DiagnosticCenterCharts /></DiagnostAuthentication>} />
                            </Route>
                            <Route path="diagnostCenterProfile" element={<DiagnostAuthentication><DiagnosticCenterProfile /></DiagnostAuthentication>}>
                                <Route path="diagnostCenterProfileInfo" element={<DiagnostAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDiagnosticProfileInformation /></React.Suspense></DiagnostAuthentication>} />
                            </Route>
                            <Route path="diagnosticCenterManage" element={<DiagnostAuthentication><DiagnosticCenterManage /></DiagnostAuthentication>}>
                                <Route path="diagnostSalesActivities" element={<DiagnostAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDiagnosticSalesActivities /></React.Suspense></DiagnostAuthentication>} />
                                <Route path="diagnostCenterAuditLog" element={<DiagnostAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyDiagnosticAuditLogs /></React.Suspense></DiagnostAuthentication>} />
                            </Route>
                        </Route>

                        {/* HCF Admin Routes */}
                        <Route path="/hcfAdmin" element={<AdminMainDashboard />}>
                            <Route path="notification" element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyAdminNotification /></React.Suspense></HealthCareAuthentication>} />
                            <Route path="adminProfile" element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyAdminProfile /></React.Suspense></HealthCareAuthentication>} />
                            <Route path="doctor" element={<AdminDoctor />}>
                                <Route path="allDoctors" element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyAdminAllDoctors /></React.Suspense></HealthCareAuthentication>} />
                                <Route path="active" element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyAdminActive /></React.Suspense></HealthCareAuthentication>} />
                                <Route path="blocked" element={<HealthCareAuthentication><HCFBlocked /></HealthCareAuthentication>} />
                                <Route path="addDoctor" element={<HealthCareAuthentication><HCFAddDoctors /></HealthCareAuthentication>} />
                                <Route path="addPackage" element={<HealthCareAuthentication><HCFAddPackage /></HealthCareAuthentication>} />
                            </Route>
                            <Route path="diagnosticCenter" element={<HealthCareAuthentication><AdminDiagnosticCenter /></HealthCareAuthentication>}>
                                <Route path="labs" element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyAdminLabs /></React.Suspense></HealthCareAuthentication>} />
                                <Route path="labs/:labId" element={<HealthCareAuthentication><AdminLabDetail /></HealthCareAuthentication>} />
                                <Route path="staff" element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyAdminStaff /></React.Suspense></HealthCareAuthentication>} />
                                <Route path="blocked" element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyAdminBlocked /></React.Suspense></HealthCareAuthentication>} />
                            </Route>
                            <Route path="hcfAdminManage" element={<HealthCareAuthentication><AdminManage /></HealthCareAuthentication>}>
                                <Route path="hcfAdminSale" element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyAdminSalesActivities /></React.Suspense></HealthCareAuthentication>} />
                                <Route path="hcfAdminOverview" element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyAdminOverview /></React.Suspense></HealthCareAuthentication>} />
                                <Route path="hcfAdminBooking" element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyAdminBooking /></React.Suspense></HealthCareAuthentication>} />
                                <Route path="hcfAdminPayout" element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazyAdminPayout /></React.Suspense></HealthCareAuthentication>} />
                                <Route path="hcfAdminAuditLog" element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><AdminManageAuditLog /></React.Suspense></HealthCareAuthentication>} />
                            </Route>
                            <Route path="/hcfAdmin/diagnosticCenter/labs/:labId" element={<HealthCareAuthentication><DiagnostLabs /></HealthCareAuthentication>} />
                        </Route>

                        {/* Super Admin Routes */}
                        <Route path="superAdmin" element={<SuperAdminAuthentication><SuperAdminBody /></SuperAdminAuthentication>}>
                            <Route path="dashboard" element={<SuperAdminDashboard />}>
                                <Route path="mainDashboard" element={<SuperAdminMainDashboard />} />
                            </Route>
                            <Route path="history" element={<SuperAdminHistory />}>
                                <Route path="doctor" element={<React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazySuperAdminHistoryDoctor /></React.Suspense>} />
                                <Route path="patient" element={<React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazySuperAdminHistoryPatient /></React.Suspense>} />
                                <Route path="hcf" element={<React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazySuperAdminHistoryHCF /></React.Suspense>} />
                            </Route>
                            <Route path="accessibility" element={<SuperAdminAccessibilty />}>
                                <Route path="doctors" element={<React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazySuperAdminDoctor /></React.Suspense>} />
                                <Route path="patient" element={<React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazySuperAdminPatient /></React.Suspense>} />
                                <Route path="hcf" element={<React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazySuperAdminHCF /></React.Suspense>} />
                            </Route>
                            <Route path="logs" element={<SuperAdminLogsBody />}>
                                <Route path="auditLogs" element={<SuperAdminLogs />} />
                            </Route>
                            <Route path="package" element={<SuperAdminPackage />}>
                                <Route path="packagePatient" element={<React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazySuperAdminPackagePatient /></React.Suspense>} />
                                <Route path="packageDoctor" element={<React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazySuperAdminPackageDoctor /></React.Suspense>} />
                            </Route>
                            <Route path="transaction" element={<SuperAdminTransaction />}>
                                <Route path="doctor" element={<React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazySuperAdminTranDoctor /></React.Suspense>} />
                                <Route path="hcf" element={<React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}><LazySuperAdminTranHCF /></React.Suspense>} />
                            </Route>
                        </Route>

                        {/* Video Calling & Chat Routes */}
                        <Route path="/videocallingsdk/:appId" element={<VideoCallingSDK />} />
                        <Route path="/chatRoom" element={<ChatRoom />} />
                    </>
                )}
                {/* Not Found Route */}
                <Route element={NotFound} />
            </Routes>
        </Suspense>
    </UserProvider>
);
