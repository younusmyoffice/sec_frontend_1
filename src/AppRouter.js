import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import Skeleton from "@mui/material/Skeleton";
import Usage from "./pages/Usage";
// import SelectRoleLogin from "./auth/RoleSelection/SelectRoleLogin";
import PatientLogin from "./Role/Login/PatientModule/PatientLogin/PatientLogin";
import ForgotPassword from "./Role/Login/PatientModule/ForgotPassword/ForgotPassword";
import ForgotPasswordOTP from "./Role/Login/PatientModule/ForgotPasswordOTP/ForgotPasswordOTP";
import ForgotPasswordChange from "./Role/Login/PatientModule/ForgotPasswordChange/ForgotPasswordChange";
import LoginWithOtp from "./Role/Login/PatientModule/LoginwithOTP/LoginWithOTP";
import LoginWithOtpVerify from "./Role/Login/PatientModule/LoginWithOTPVerify/LoginWithOTPVerify";
import SignupPage from "./Role/Signup/SignupPage/SignupPage";
import PatientCompleteProfile from "./Role/Signup/PatientCompleteProfile/PatientCompleteProfile";
import EmailVerification from "./Role/Login/PatientModule/EmailVerification/EmailVerification";
import PatientPersonalInformation from "./Role/Login/PatientModule/PatientPersonalInformation/patientpersonalinformation";
import PatientContactInformation from "./Role/Login/PatientModule/PatientContactInformation/patientcontactinformation";
import PatientPaymentInformation from "./Role/Login/PatientModule/PatientPaymentInformation/patientpaymentinformation";
import HcfLogin from "./pages/HCFModule/HCFLogin/hcflogin";
import HcfDashboard from "./pages/HCFModule/HCFDashboard/hcfdashboard";
import Homes from "./pages/landingPage/Home/Homes";
import HowItWorks from "./pages/landingPage/How it Works/Howitworks";
import AboutLanding from "./pages/landingPage/About/AboutLanding";
import { UserProvider } from "./loginComponent/UserProvider";
import {
    DoctorAuthentication,
    HealthCareAuthentication,
    PatientAuthentication,
    ClinicAuthentication,
    DiagnostAuthentication,
} from "./loginComponent/RequireAuthentication";
import BodyDashboard from "./Dashboard/BodyDashboard/BodyDashboard";
import Explore from "./Dashboard/Explore/Explore";
import Profile from "./Dashboard/Profile/Profile";
import DrDetailsCard from "./Dashboard/DrDetailsCard/DrDetailsCard";
import Received from "./Dashboard/MyActivity/Received/Received";
import Shared from "./Dashboard/MyActivity/Shared/Shared";
import Upcoming from "./Dashboard/PatientAppointment/UpComing/Upcoming";
import Completed from "./Dashboard/PatientAppointment/Completed/Completed";
import Cancelled from "./Dashboard/PatientAppointment/Cancelled/Cancelled";
// import Chats from "./Dashboard/PatientAppointment/Chats/Chats";
import AppointmentDashboard from "./Dashboard/PatientAppointment/AppointmentDashboard";
import MainDashboard from "./Dashboard/MainDashboard/MainDashboard";
import Payment from "./Dashboard/Profile/Payment";
import Contact from "./Dashboard/Profile/ContactDetails";
// import { AllFiles } from "./Dashboard/PatientManage/Reports/AllFiles/AllFiles";
import DoctorDashboard from "./DoctorModule/DoctorDashboard/doctordashboard";
import DoctorLogin from "./DoctorModule/DoctorLogin/doctorlogin";
import DoctorAppointmentDashboard from "./DoctorModule/DoctorAppointmentDashboard/DoctorAppointmentDashboard";

import DoctorManage from "./DoctorModule/DoctorManage/DoctorManage";
import DoctorListing from "./DoctorModule/DoctorListing/DoctorListing";

import DoctorSavedDraft from "./DoctorModule/DoctorListing/DoctorSavedDraft/DoctorSavedDraft";

import DoctorStatistics from "./DoctorModule/DoctorStatistics/DoctorStatistics";
import DoctorPayout from "./DoctorModule/DoctorStatistics/DoctorPayout/DoctorPayout";
// import HCFRoleType from "./pages/HCFRoleType/HCFRoleType";
import HCFRoleType from "./Role/RoleSelection/SelectHCFRoleLogin/SelectHCFRoleLogin";
import DiagnosticLogin from "./HCFModule/HCFLogin/DisgnostLogin/DiagnostLogin";
import ClinicLogin from "./HCFModule/HCFLogin/ClinicLogin/ClinicLogin";
import DiagnosticCenterDashboard from "./HCFModule/HCFDashboard/DiagnosticCenterDashboard/DiagnosticCenterDashboard";
import ClinicMainDashboard from "./HCFModule/HCFDashboard/ClinicDashboard/ClinicMainDashboard";
import DiagnosticCenterProfile from "./HCFModule/DiagnosticCenter/DiagnosticProfile/DiagnstCenterProfileDashboard";

import DiagnosticCenterManage from "./HCFModule/DiagnosticCenter/DiagnosticManage/DiagnosticCenterManage";
import ClinicDashboard from "./HCFModule/Clinic/ClinicDashboard/ClinicDashboard";
import ClinicMyAppointments from "./HCFModule/Clinic/ClinicMyAppointments/ClinicMyAppointments";
import ClinicProfile from "./HCFModule/Clinic/ClinicProfile/ClinicProfile";
import ClinicManage from "./HCFModule/Clinic/ClinicManage/ClinicManage";
import ClinicSalesActivities from "./HCFModule/Clinic/ClinicManage/ClinicStaff/ClinicSalesActivities";
import SelectRoleSignup from "./Role/RoleSelection/SelectRoleSignup/SelectRoleSignup";
import DoctorSignup from "./Role/Signup/DoctorSignUp/DoctorSignup";
import SelectHCFSignup from "./Role/Signup/HCFSignup/SelectHCFSignup";
import AdminMainDashboard from "./HCFModule/HCFDashboard/AdminDashboard/AdminDashboard";
import AdminDoctor from "./HCFModule/HCFAdmin/AdminDoctor/AdminDoctor";
import AdminProfile from "./HCFModule/HCFAdmin/AdminProfile/AdminProfile"
import HCFBlocked from "./HCFModule/HCFAdmin/AdminDoctor/Blocked/Blocked";
import HCFAddDoctors from "./HCFModule/HCFAdmin/AdminDoctor/AddDoctor/AddDoctor";
import HCFAddPackage from "./HCFModule/HCFAdmin/AdminDoctor/AddPackage/AddPackage";
import AdminDiagnosticCenter from "./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminDiagnosticCenter";
import AdminManage from "./HCFModule/HCFAdmin/AdminManage/AdminManage";
// import AdminManageStaff from "./HCFModule/HCFAdmin/AdminManage/AdminManageStaff/AdminManageStaff";
import AdminManageAuditLog from "./HCFModule/HCFAdmin/AdminManage/AdminManageAuditLog/AdminManageAuditLog";
import DiagnostSignUp from "./Role/Signup/HCFSignup/DiagnosticSignup/DiagnosticSignup";
import ClinicSignUp from "./Role/Signup/HCFSignup/ClinicSignup/ClinicSignup";
import AdminSignUp from "./Role/Signup/HCFSignup/HCFAdminSignup/HCFAdminSignup";
import TermsAndCondition from "./DoctorModule/DoctorListing/CreateNewListing/TermsAndCondition/TermsAndCondition";
import DoctorPersonalInfo from "./DoctorModule/DoctorProfile/DoctorProfileInfo/DoctorPersonalInfo";
import DoctorProssionalInfo from "./DoctorModule/DoctorProfile/DoctorProfessionalInfo/DoctorProfessionalInfo";
import DiagnosticCenterReports from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticCenterReports";
import DiagnosticPatientChats from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticCenterChat/DiagnostCenterChats";
import DiagnosticCenterCharts from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticCenterCharts/DiagnosticCenterCharts";
import BookingHistory from "./Dashboard/PatientManage/BookingHistory/BookingHistory";
import Transactions from "./Dashboard/PatientManage/Transactions/Transactions";
import Reports from "./Dashboard/PatientManage/Reports/Reports";
import AllFiles from "./Dashboard/PatientManage/Reports/AllFiles/AllFiles";
import Examined from "./Dashboard/PatientManage/Reports/examined/Examined";
import Subscriptions from "./Dashboard/PatientManage/Subscription/Subscription";
import VideoCall from "./DoctorModule/DoctorAppointmentDashboard/DoctorChat/VideoCall";
import VoiceCall from "./DoctorModule/DoctorAppointmentDashboard/DoctorChat/VoiceCall";
import HCFDetailedCard from "./Role/Login/PatientModule/PatientHCF/DrDetailsCard/HCFDetailedCard";
import SuperAdminBody from "./SuperAdmin/SuperAdminBody/SuperAdminBody";
import DiagnostLabs from "./HCFModule/HCFAdmin/AdminDiagnosticCenter/Labs/DiagnostLabs";
import SuperAdminDashboard from "./SuperAdmin/SuperAdminDashboard/SuperAdminDashboard";
import SuperAdminHistory from "./SuperAdmin/SuperAdminHistory/SuperAdminhistory";
import SuperAdminDoctor from "./SuperAdmin/SuperAdminAcessibility/SuperAdminDoctor/SuperAdminDoctor";

import SuperAdminPatient from "./SuperAdmin/SuperAdminAcessibility/SuperAdminpatient/SuperAdminPatient";
import SuperAdminLogsBody from "./SuperAdmin/SuperAdminLogs/SuperAdminLogsBody";
import SuperAdminLogs from "./SuperAdmin/SuperAdminLogs/SuperAdminAuditLogs/SuperAdminAuditLogs";
import SuperAdminMainDashboard from "./SuperAdmin/SuperAdminDashboard/SuperAdminMainDashboard/superadminmaindashboard";
import SuperAdminHCF from "./SuperAdmin/SuperAdminAcessibility/SuperAdminHCF/SuperAdminHCF";
import SuperAdminHistoryDoctor from "./SuperAdmin/SuperAdminHistory/SuperAdminHistoryDoctor/SuperAdminHistoryDoctor";
import SuperAdminHistoryPatient from "./SuperAdmin/SuperAdminHistory/SuperAdminHistoryPatient/SuperAdminHistoryPatient";
import SuperAdminHistoryHCF from "./SuperAdmin/SuperAdminHistory/SuperAdminHistoryHCF/SuperAdminHistoryHCF";
import SuperAdminPackage from "./SuperAdmin/SuperAdminPackage/SuperAdminPackage";
import PackagePatient from "./SuperAdmin/SuperAdminPackage/PackagePatient/PackagePatient";
import PackageDoctor from "./SuperAdmin/SuperAdminPackage/PackageDoctor/PackageDoctor";
import SuperAdminAccessibilty from "./SuperAdmin/SuperAdminAcessibility/SuperAdminAccessibility";

import SuperAdminTransaction from "./SuperAdmin/SuperAdminTransaction/SperAdminTransaction";
import SuperAdminTranDoctors from "./SuperAdmin/SuperAdminTransaction/TransactionDoctors/SuperAdminTranDoctors";
import SuperAdminTranHCF from "./SuperAdmin/SuperAdminTransaction/TransactionHCF/SuperAdminTranHCF";
import About from "./Role/Login/PatientModule/PatientHCF/DrDetailsCard/About/About";
import Department from "./Role/Login/PatientModule/PatientHCF/DrDetailsCard/Department/Department";
import Labs from "./Role/Login/PatientModule/PatientHCF/DrDetailsCard/Labs/Labs";
// import SignUpHcf from "./pages/SignUpHCF/SignUpHCF";
import SelectRoleLogin from "./Role/RoleSelection/SelectRoleLogin";
import HcfAdminLogin from "./Role/Login/PatientModule/HCFAdminLogin/HCFAdminLogin";
import SuperAdminLogin from "./Role/Login/PatientModule/SuperAdminLogin/SuperAdminLogin";
import VideoCallingSDK from "./VideoCalling/VideoCallingSDK";
import ChatRoom from "./ChatsScreen/ChatRoom";
import AdminLabDetail from "./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminLabs/AdminLabDetails/AdminLabDetail";
import HcfDrDetailsCard from "./Dashboard/DrDetailsCard/HcfDrDetailsCard";

const ManageDashboard = lazy(() => import("./Dashboard/PatientManage/ManageDashboard"));
// import MyActivity from "./Dashboard/MyActivity/MyActivity";
const LazyPatientMyActivity = lazy(() => import("./Dashboard/MyActivity/MyActivity"));

const LazyDoctorrequest = lazy(() => import("./DoctorModule/DoctorMainDashboard/Request.js/Request"),
);

const LazyDoctorNotification = lazy(() =>
    import("./DoctorModule/DoctorMainDashboard/Notification.js/Notification"),
);

const LazyDoctorUpcoming = lazy(() =>
    import("./DoctorModule/DoctorAppointmentDashboard/DoctorUpcoming/DoctorUpcoming"),
);

const LazyDoctorRequest = lazy(() =>
    import("./DoctorModule/DoctorAppointmentDashboard/DoctorRequest/DoctorRequest"),
);

const LazyDoctorCompleted = lazy(() =>
    import("./DoctorModule/DoctorAppointmentDashboard/DoctorCompleted/DoctorCompleted"),
);

const LazyDoctorCancelled = lazy(() =>
    import("./DoctorModule/DoctorAppointmentDashboard/DoctorCancelled/DoctorCancelled"),
);

const LazyDoctorActiveListing = lazy(() =>
    import("./DoctorModule/DoctorListing/DoctorActiveListing/DoctorActiveLising"),
);

const LazyDoctorSavedDraft = lazy(() =>
    import("./DoctorModule/DoctorListing/DoctorSavedDraft/DoctorSavedDraft"),
);

const LazyDoctorBookingHistory = lazy(() =>
    import("./DoctorModule/DoctorStatistics/DoctorBookingHistory/DoctorBookingHistory"),
);

const LazyDoctorTransaction = lazy(() =>
    import("./DoctorModule/DoctorStatistics/DoctorTransactions/DoctorTransaction"),
);

const LazyDoctorOverview = lazy(() =>
    import("./DoctorModule/DoctorStatistics/DoctorOverview/DoctorOverview"),
);

const LazyDoctorPayout = lazy(() =>
    import("./DoctorModule/DoctorStatistics/DoctorPayout/DoctorPayout"),
);

const LazyDoctorStaff = lazy(() => import("./DoctorModule/DoctorManage/DoctorStaff/DoctorStaff"));
const LazyDoctorAuditLog = lazy(() =>
    import("./DoctorModule/DoctorManage/DoctorAuditLog/doctorAuditLog"),
);

const LazyDiagnosticNotification = lazy(() =>
    import(
        "./HCFModule/DiagnosticCenter/DiagnosticDashboard/DiagnosticNotification/DiagnosticNotification"
    ),
);

const LazyDiagnosticProfileInformation = lazy(() =>
    import(
        "./HCFModule/DiagnosticCenter/DiagnosticProfile/DiagnostCenterProfileInfo/DiagnostCenterProfileInfo"
    ),
);

const LazyDiagnosticAuditLogs = lazy(() =>
    import(
        "./HCFModule/DiagnosticCenter/DiagnosticManage/DiagnosticCenterAuditLog/diagnosticCenterAuditLog"
    ),
);

const LazyClinicNotification = lazy(() =>
    import("./HCFModule/Clinic/ClinicDashboard/ClinicNotification/Clinicnotification"),
);
const LazyClinicRequests = lazy(() =>
    import("./HCFModule/Clinic/ClinicDashboard/ClinicRequests/ClinicRequests"),
);

const LazyClinicAppointmentRequest = lazy(() =>
    import("./HCFModule/Clinic/ClinicMyAppointments/ClinicRequests/ClinicAppointmentRequest"),
);

const LazyClinicUpcoming = lazy(() =>
    import("./HCFModule/Clinic/ClinicMyAppointments/ClinicUpcoming/ClinicUpcoming"),
);

const LazyClinicCompleted = lazy(() =>
    import("./HCFModule/Clinic/ClinicMyAppointments/ClinicCompleted/ClinicCompleted"),
);

const LazyClinicCancelled = lazy(() =>
    import("./HCFModule/Clinic/ClinicMyAppointments/ClinicCancelled/ClinicCancelled"),
);

const LazyClinicChats = lazy(() =>
    import("./HCFModule/Clinic/ClinicMyAppointments/ClinicChats/ClinicChats"),
);

const LazyClinicProfileInformation = lazy(() =>
    import("./HCFModule/Clinic/ClinicProfile/ClinicProfileInformation/ClinicProfileInformation"),
);

const LazyClinicProfessionalInformation = lazy(() => 
    import("./HCFModule/Clinic/ClinicProfile/ClinicProfessionalInformation/ClinicProfessionalInformation") )

const LazyClinicSalesActivities = lazy(() =>
    import("./HCFModule/Clinic/ClinicManage/ClinicStaff/ClinicSalesActivities"),
);
const LazyClinicAuditLog = lazy(() =>
    import("./HCFModule/Clinic/ClinicManage/ClinicAuditLog/ClinicAuditLog"),
);

const LazyAdminNotification = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminDashboard/Notifications/HCFAdminNotification"),
);
const LazyAdminProfile = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminProfile/AdminProfile"),
);
const LazyAdminAllDoctors = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminDoctor/AllDoctors/AllDoctor"),
);
const LazyAdminActive = lazy(() => import("./HCFModule/HCFAdmin/AdminDoctor/Active/Active"));

const LazyAdminLabs = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminLabs/AdminLabs"),
);
const LazyAdminStaff = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminStaff/AdminStaff"),
);
const LazyAdminBlocked = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminBlocked/AdminBlocked"),
);

const LazyDoctorListingDetails = lazy(() =>
    import("./DoctorModule/DoctorListing/CreateNewListing/ListingDetails/ListingDetails"),
);

const LazyDoctorAddPlans = lazy(() =>
    import("./DoctorModule/DoctorListing/CreateNewListing/AddPlan/AddPlan"),
);

const LazyDoctorAddQuestioner = lazy(() =>
    import("./DoctorModule/DoctorListing/CreateNewListing/AddQuestioner/AddQuestioner"),
);

const LazyAdminSalesActivities = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminManage/AdminManageSale/AdminManageSale"),
);

const LazyAdminOverview = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminManage/AdminOverview/AdminOverview"),
);

const LazyAdminBooking = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminManage/AdminManageBooking/AdminBooking"),
);

const LazyAdminPayout = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminManage/AdminManagePayout/AdminPayout"),
);

const LazyDiagnosticPatientSearch = lazy(() =>
    import(
        "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticPatientSearch/DiagnosticPatientSearch"
    ),
);

const LazyDiagnosticPatientShared = lazy(() =>
    import(
        "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagonisticCenterShared/DiagostCenterShared"
    ),
);

const LazyDiagnosticSalesActivities = lazy(() =>
    import(
        "./HCFModule/DiagnosticCenter/DiagnosticManage/DiagnostcCenterStaff/DiagnosticSalesActivities"
    ),
);

const LazyDoctorChat = lazy(() =>
    import("./DoctorModule/DoctorAppointmentDashboard/DoctorChat/DoctorChat"),
);

const LazySuperAdminDoctor = lazy(() =>
    import("./SuperAdmin/SuperAdminAcessibility/SuperAdminDoctor/SuperAdminDoctor"),
);

const LazySuperAdminPatient = lazy(() =>
    import("./SuperAdmin/SuperAdminAcessibility/SuperAdminpatient/SuperAdminPatient"),
);

const LazySuperAdminHCF = lazy(() =>
    import("./SuperAdmin/SuperAdminAcessibility/SuperAdminHCF/SuperAdminHCF"),
);

const LazySuperAdminHistoryDoctor = lazy(() =>
    import("./SuperAdmin/SuperAdminHistory/SuperAdminHistoryDoctor/SuperAdminHistoryDoctor"),
);

const LazySuperAdminHistoryPatient = lazy(() =>
    import("./SuperAdmin/SuperAdminHistory/SuperAdminHistoryDoctor/SuperAdminHistoryDoctor"),
);

const LazySuperAdminHistoryHCF = lazy(() =>
    import("./SuperAdmin/SuperAdminHistory/SuperAdminHistoryDoctor/SuperAdminHistoryDoctor"),
);

const LazySuperAdminPackagePatient = lazy(() =>
    import("./SuperAdmin/SuperAdminPackage/PackagePatient/PackagePatient"),
);

const LazySuperAdminPackageDoctor = lazy(() =>
    import("./SuperAdmin/SuperAdminPackage/PackageDoctor/PackageDoctor"),
);

const LazySuperAdminTranDoctor = lazy(() =>
    import("./SuperAdmin/SuperAdminTransaction/TransactionDoctors/SuperAdminTranDoctors"),
);

const LazySuperAdminTranHCF = lazy(() =>
    import("./SuperAdmin/SuperAdminTransaction/TransactionHCF/SuperAdminTranHCF"),
);
const LazyPatientExplore = lazy(() => import("./Dashboard/Explore/Explore"));

const NotFound = lazy(() => import("./components/NotFound"));

const DevEnv = process.env.NODE_ENV;

import socketIO from "socket.io-client";
import Home from "./ChatsScreen/components/Home";
import ChatPage from "./ChatsScreen/components/ChatPage";
import HcfClinicSignup from "./Role/Signup/HcfClinicSignup/HcfClinicSingup";

console.log('this is dev env : ',DevEnv);

const socket = socketIO.connect("http://localhost:4000", {
    // put here the url of backend
    reconnectionAttempts: 5, // Attempt reconnection up to 5 times
    reconnectionDelay: 1000, // Delay between reconnection attempts (1 second)
    reconnectionDelayMax: 5000, // Max delay between reconnection attempts (5 seconds)
});

export const AppRouter = () => (
    <UserProvider>
        <Suspense fallback={<PageLoader text="Please wait while we load your application" />}>
            <Routes>
                {DevEnv && (
                    <>
                        <Route path="/usage" element={<Usage />} />
                        <Route path="/SelectRoleLogin" element={<SelectRoleLogin />} />
                        <Route path="/HCFRoleType" element={<HCFRoleType />} />
                        {/* <Route path="/hcfSignup" element={<SignUpHcf />}></Route> */}
                        <Route path="/patientLogin" element={<PatientLogin />} />
                        <Route path="/hcfAdminLogin" element={<HcfAdminLogin />} />
                        <Route path="/hcfAdminLogin" element={<HcfAdminLogin />} />
                        <Route path="/superAdminLogin" element={<SuperAdminLogin />}></Route>

                        <Route path="/" element={<Homes />} />
                        <Route path="/howItWorks" element={<HowItWorks />} />
                        <Route path="/aboutLanding" element={<AboutLanding />} />

                        {/* ------ signup routes start------ */}
                        <Route path="/selectRoleSignup" element={<SelectRoleSignup />}></Route>
                        <Route path="/doctorSignup" element={<DoctorSignup />}></Route>
                        <Route path="/selectHcfSignup" element={<SelectHCFSignup />}></Route>
                        <Route path="/diagnostCenterSignup" element={<DiagnostSignUp />}></Route>
                        <Route path="/diagnostClinicSignup" element={<ClinicSignUp />}></Route>
                        <Route path="/hcfAdminSignup" element={<AdminSignUp />}></Route>
                        {/* ------ signup routes ends------ */}
                        <Route path="/ForgotPassword" element={<ForgotPassword />} />
                        <Route
                            path="/ForgotPasswordOTP"
                            element={<ForgotPasswordOTP />}
                        />
                        <Route
                            path="/ForgotPasswordChange"
                            element={<ForgotPasswordChange />}
                        />
                        <Route path="/LoginWithOtp" element={<LoginWithOtp />} />
                        <Route path="/LoginWithOtpVerify" element={<LoginWithOtpVerify />} />
                        <Route path="/signupPage" element={<SignupPage />} />
                        <Route
                            path="/patientCompleteProfile"
                            element={<PatientCompleteProfile />}
                        ></Route>
                        <Route path="/emailVerification" element={<EmailVerification />} />
                        <Route
                            path="/patientPersonalInformation"
                            element={<PatientPersonalInformation />}
                        />
                        <Route
                            path="/patientContactInformation"
                            element={<PatientContactInformation />}
                        />
                        <Route
                            path="/patientPaymentInformation"
                            element={<PatientPaymentInformation />}
                        />
                        {/* --------------------------- Patient Dashboard Routes starts-------------------------------------- */}
                        <Route
                            path="/patientDashboard"
                            element={
                                <PatientAuthentication>
                                    <BodyDashboard />
                                </PatientAuthentication>
                            }
                        >
                            {/* ------------------ Dashboard Route Starts ------------------------- */}
                          
                            <Route key={1} path="dashboard" element={<MainDashboard />}>
                                <Route
                                    path="dashboard"
                                    element={
                                        <PatientAuthentication>
                                            <React.Suspense
                                            fallback={<Skeleton variant="rectangular" width="100%" height={900} />}
                                        >
                                            <LazyPatientMyActivity>
                                                <Route
                                                    path="received"
                                                    element={<Received />}
                                                ></Route>
                                                <Route path="shared" element={<Shared />}></Route>
                                            </LazyPatientMyActivity>
                                        </React.Suspense>
                                        </PatientAuthentication>
                                        
                                    }
                                ></Route>
                                {/* <Route key={2} path="explore" element={<Explore />} /> */}

                                {/* Explore Route */}
                                <Route
                                    path="explore"
                                    element={
                                        <PatientAuthentication>
                                        <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                            <LazyPatientExplore></LazyPatientExplore>
                                        </React.Suspense>
                                        </PatientAuthentication>

                                    }
                                ></Route>

                                <Route
                                    path="myactivity"
                                    element={
                                        <PatientAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                        <LazyPatientMyActivity></LazyPatientMyActivity>
                                    </React.Suspense>
                                    </PatientAuthentication>
                                        
                                    }
                                >
                                    <Route path="received" element={<PatientAuthentication><Received /></PatientAuthentication>}></Route>
                                    <Route path="shared" element={<PatientAuthentication><Shared /></PatientAuthentication>}></Route>
                                </Route>
                                {/* 
                                <Route key={2} path="myactivity" element={<MyActivity />}>
                                    <Route path="received" element={<Received />}></Route>
                                    <Route path="shared" element={<Shared />}></Route>
                                </Route> */}
                                <Route path={"profile"} element={<PatientAuthentication><Profile /></PatientAuthentication>}></Route>
                                <Route path={"payment"} element={<PatientAuthentication><Payment /></PatientAuthentication>}></Route>
                                <Route path={"contact"} element={<PatientAuthentication><Contact /></PatientAuthentication>}></Route>
                                <Route path={"patienthcf"} element={<PatientAuthentication><HCFDetailedCard /></PatientAuthentication>}></Route>
                            </Route>

                            <Route path="appointment" element={<PatientAuthentication><AppointmentDashboard /></PatientAuthentication>}>
                                <Route path={"upcoming"} element={<PatientAuthentication><Upcoming /></PatientAuthentication>}></Route>
                                <Route path={"completed"} element={<PatientAuthentication><Completed /></PatientAuthentication>}></Route>
                                <Route path={"cancelled"} element={<PatientAuthentication><Cancelled /></PatientAuthentication>}></Route>
                                <Route path={"chats/:user/:roomID/:appointment_id"} element={<PatientAuthentication><Home socket={socket} /></PatientAuthentication>}></Route>
                                <Route
                                    path={"chats/:roomID/:appointment_id"}
                                    element={<PatientAuthentication><ChatPage socket={socket} /></PatientAuthentication>}
                                />
                                <Route path={"profile"} element={<PatientAuthentication><Profile /></PatientAuthentication>}></Route>
                                <Route path={"payment"} element={<PatientAuthentication><Payment /></PatientAuthentication>}></Route>
                                <Route path={"contact"} element={<PatientAuthentication><Contact /></PatientAuthentication>}></Route>
                            </Route>

                            <Route path="manage" element={<PatientAuthentication><ManageDashboard /></PatientAuthentication>}>
                                {/* <Route path="bookinghistory" element={<HCFDetailedCard/>}></Route> */}
                                <Route path="bookinghistory" element={<PatientAuthentication><BookingHistory /></PatientAuthentication>}></Route>
                                <Route path="transactions" element={<PatientAuthentication><Transactions /></PatientAuthentication>}></Route>
                                <Route path="reports" element={<PatientAuthentication><Reports /></PatientAuthentication>}>
                                    <Route path="request" element={<PatientAuthentication><AllFiles /></PatientAuthentication>}></Route>
                                    <Route path="examined" element={<PatientAuthentication><Examined /></PatientAuthentication>}></Route>
                                    <Route path="received" element={<PatientAuthentication><Received /></PatientAuthentication>}></Route>
                                    <Route path="shared" element={<PatientAuthentication><Shared /></PatientAuthentication>}></Route>
                                </Route>
                                <Route path="subscriptions" element={<PatientAuthentication><Subscriptions /></PatientAuthentication>}></Route>
                                <Route path={"profile"} element={<PatientAuthentication><Profile /></PatientAuthentication>}></Route>
                                <Route path={"payment"} element={<PatientAuthentication><Payment /></PatientAuthentication>}></Route>
                                <Route path={"contact"} element={<PatientAuthentication><Contact /></PatientAuthentication>}></Route>
                            </Route>

                            {/* ------------------ Dashboard Route Ends ------------------------- */}

                            <Route
                                path="/patientDashboard/drDetailsCard/:resID"
                                element={<PatientAuthentication><DrDetailsCard /></PatientAuthentication>}
                            ></Route>
                            {/* patient hcf doctor details by id route */}
                            <Route
                                path="/patientDashboard/hcfDetailCard/hcfDoctor/:hcddocid/:reshcfID"
                                element={<PatientAuthentication><HcfDrDetailsCard /></PatientAuthentication>}
                            ></Route>

                            <Route
                                path="/patientDashboard/hcfDetailCard/:hcfID"
                                element={<PatientAuthentication><HCFDetailedCard /></PatientAuthentication>}
                            >
                                <Route path="about" element={<PatientAuthentication><About /></PatientAuthentication>} />
                                <Route path="department" element={<PatientAuthentication><Department /></PatientAuthentication>} />
                                <Route path="labs" element={<PatientAuthentication><Labs /></PatientAuthentication>} />
                            </Route>
                        </Route>

                        {/* ---------------------------------- Patient Appointment Routes Ends---------------------------------------- */}

                        {/* --------------------Doctor routes Starts------------------------------ */}
                        <Route path="/doctorLogin" element={<DoctorLogin />} />
                        <Route path="doctorDashboard/doctorAppointment/chats/videoCall"
                            element={<VideoCall />}
                        ></Route>

                        <Route
                            path="/doctorDashboard"
                            element={
                               <DoctorAuthentication> 
                                <DoctorDashboard />
                                </DoctorAuthentication>
                            }
                        >
                            {/* /doctor/request */}
                            {/* /request */}
                            <Route
                                path="doctorPersonalInfo"
                                element={<DoctorAuthentication><DoctorPersonalInfo /></DoctorAuthentication>}
                            ></Route>
                            <Route
                                path="doctorProfessionalInfo"
                                element={<DoctorAuthentication><DoctorProssionalInfo /></DoctorAuthentication>}
                            ></Route>

                            <Route
                                path="request"
                                element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                <LazyDoctorrequest />
                            </React.Suspense></DoctorAuthentication>
                                    
                                }
                            ></Route>
                            <Route
                                path="notification"
                                element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                <LazyDoctorNotification />
                            </React.Suspense></DoctorAuthentication>
                                    
                                }
                            ></Route>
                            <Route
                                path="doctorAppointment"
                                element={<DoctorAuthentication><DoctorAppointmentDashboard /></DoctorAuthentication>}
                            >
                                <Route
                                    path="request"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorRequest />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>

                                <Route
                                    path="upcoming"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorUpcoming />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>

                                <Route
                                    path="completed"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorCompleted />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="cancelled"
                                    element={<DoctorAuthentication> <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorCancelled />
                                </React.Suspense></DoctorAuthentication>
                                       
                                    }
                                ></Route>
                                <Route path={"chats/:user/:roomID"} element={<DoctorAuthentication><Home socket={socket} /></DoctorAuthentication>}></Route>
                                <Route
                                    path={"chats/:roomID"}
                                    element={<DoctorAuthentication><ChatPage socket={socket} /></DoctorAuthentication>}
                                />
                                {/* <Route
                                    path="chats"
                                    element={
                                        <React.Suspense fallback={<h1>wait for a while</h1>}>
                                            <LazyDoctorChat />
                                        </React.Suspense>
                                    }
                                ></Route> */}

                                <Route
                                    path="doctorPersonalInfo"
                                    element={<DoctorAuthentication><DoctorPersonalInfo /></DoctorAuthentication>}
                                ></Route>

                                <Route path="chats/voicecall" element={<DoctorAuthentication><VoiceCall /></DoctorAuthentication>}></Route>
                            </Route>
                            {/* /doctor/listing */}
                            <Route path="doctorListing" element={<DoctorAuthentication><DoctorListing /></DoctorAuthentication>}>
                                <Route
                                    path="doctorPersonalInfo"
                                    element={<DoctorAuthentication><DoctorPersonalInfo /></DoctorAuthentication>}
                                ></Route>
                                <Route
                                    path="doctoractiveListing"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorActiveListing />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>
                                {/* Create listing start------- */}
                                <Route
                                    path="listingdetails"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorListingDetails />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="addplans"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorAddPlans />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="addquestioner"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorAddQuestioner />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="termandcondition"
                                    element={<DoctorAuthentication><TermsAndCondition /></DoctorAuthentication>}
                                ></Route>
                                {/* Create listing ends------- */}
                                {/* Edit listing starts-------- */}
                                <Route
                                    path="editlistingdetails"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorListingDetails />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="editaddplans"
                                    element={<DoctorAuthentication> <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorAddPlans />
                                </React.Suspense></DoctorAuthentication>
                                       
                                    }
                                ></Route>
                                <Route
                                    path="editaddquestioner"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorAddQuestioner />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="edittermandcondition"
                                    element={<DoctorAuthentication><TermsAndCondition /></DoctorAuthentication>}
                                ></Route>
                                {/* Edit listing ends-------- */}
                                <Route
                                    path="doctorsavedInDraft"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorSavedDraft />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>
                            </Route>

                            <Route path="doctorStatistics" element={<DoctorAuthentication><DoctorStatistics /></DoctorAuthentication>}>
                                <Route
                                    path="doctorPersonalInfo"
                                    element={<DoctorAuthentication><DoctorPersonalInfo /></DoctorAuthentication>}
                                ></Route>
                                <Route
                                    path="doctorBookingHistory"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorBookingHistory />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="doctorTransaction"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorTransaction />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="doctorOverview"
                                    element={<DoctorAuthentication> <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorOverview />
                                </React.Suspense></DoctorAuthentication>
                                       
                                    }
                                ></Route>

                                <Route
                                    path="doctorPayout"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorPayout />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>
                            </Route>

                            <Route path="doctorManage" element={<DoctorAuthentication><DoctorManage /></DoctorAuthentication>}>
                                <Route
                                    path="doctorPersonalInfo"
                                    element={<DoctorAuthentication><DoctorPersonalInfo /></DoctorAuthentication>}
                                ></Route>
                                <Route
                                    path="doctorStaff"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorStaff />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="doctorAuditLog"
                                    element={<DoctorAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDoctorAuditLog />
                                </React.Suspense></DoctorAuthentication>
                                        
                                    }
                                ></Route>
                            </Route>
                        </Route>

                        {/* ------------------------------Doctor Routes Ends------------------------------- */}

                        {/* ------------------------------HCF Route Starts------------------------------------ */}

                        <Route path="/hcfLogin" element={<HcfLogin />} />
                        {/* -------------------Clinic Route Starts--------------------- */}
                        <Route path="/diagnostClinicLogin" element={<ClinicLogin />} />
                        <Route
                            path="/clinicDoctorCompleteProfile"
                            element={<ClinicAuthentication><HcfClinicSignup /></ClinicAuthentication>}
                        ></Route>
                        <Route path="/clinicDashboard" element={<ClinicAuthentication><ClinicMainDashboard /></ClinicAuthentication>}>
                            <Route path="clinicBodyDashboard" element={<ClinicAuthentication><ClinicDashboard /></ClinicAuthentication>}>
                                <Route
                                    path="cliniRequests"
                                    element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyClinicRequests />
                                </React.Suspense></ClinicAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="clinicNotification"
                                    element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyClinicNotification />
                                </React.Suspense>
</ClinicAuthentication>
 }
                                ></Route>
                            </Route>
                            <Route path="clinicMyAppointment" element={<ClinicAuthentication><ClinicMyAppointments /></ClinicAuthentication>}>
                                <Route
                                    path="clinicRequest"
                                    element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyClinicAppointmentRequest />
                                </React.Suspense></ClinicAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="clinicUpcoming"
                                    element={<ClinicAuthentication> <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyClinicUpcoming />
                                </React.Suspense></ClinicAuthentication>
                                       
                                    }
                                ></Route>
                                <Route
                                    path="clinicCompleted"
                                    element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyClinicCompleted />
                                </React.Suspense></ClinicAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="clinicCancelled"
                                    element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyClinicCancelled />
                                </React.Suspense></ClinicAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="clinicChats"
                                    element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyClinicChats />
                                </React.Suspense></ClinicAuthentication>
                                        
                                    }
                                ></Route>
                            </Route>
                            <Route path="clinicProfile" element={<ClinicAuthentication><ClinicProfile /></ClinicAuthentication>}>
                                <Route
                                    path="profileInformation"
                                    element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyClinicProfileInformation />
                                </React.Suspense></ClinicAuthentication>
                                        
                                        
                                    }
                                ></Route>
                                <Route
                                    path="clinicProfessionalInformation"
                                    element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyClinicProfessionalInformation/>
                                </React.Suspense></ClinicAuthentication>
                                        
                                                
                                    }
                                ></Route>
                            </Route>
                            <Route path="clinicManage" element={<ClinicAuthentication><ClinicManage /></ClinicAuthentication>}>
                                <Route
                                    path="clinicSalesActivities"
                                    element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyClinicSalesActivities />
                                </React.Suspense></ClinicAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="clinicAuditLog"
                                    element={<ClinicAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyClinicAuditLog />
                                </React.Suspense></ClinicAuthentication>
                                        
                                    }
                                ></Route>
                            </Route>
                        </Route>

                        {/* -------------------Clinic Route Ends--------------------- */}

                        {/* -------------Diagnost Center  Starts------------------ */}

                        <Route path="/diagnostCenterLogin" element={<DiagnosticLogin />} />
                        <Route
                            path="/diagnostCenterDashboard"
                            element={<DiagnostAuthentication><DiagnosticCenterDashboard /></DiagnostAuthentication>}
                        >
                            <Route
                                path="notification"
                                element={<DiagnostAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                <LazyDiagnosticNotification />
                            </React.Suspense></DiagnostAuthentication>
                                    
                                }
                            ></Route>
                            <Route
                                path="diagnosticCenterReports"
                                element={<DiagnostAuthentication><DiagnosticCenterReports /></DiagnostAuthentication>}
                            >
                                <Route
                                    path="request"
                                    element={<DiagnostAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDiagnosticPatientSearch />
                                </React.Suspense></DiagnostAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="examination"
                                    element={<DiagnostAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDiagnosticPatientShared />
                                </React.Suspense></DiagnostAuthentication>
                                        
                                    }
                                ></Route>
                                <Route path="report" element={<DiagnostAuthentication><DiagnosticPatientChats /></DiagnostAuthentication>}></Route>
                                <Route path="Chart" element={<DiagnostAuthentication><DiagnosticCenterCharts /></DiagnostAuthentication>}></Route>
                            </Route>
                            <Route
                                path="diagnostCenterProfile"
                                element={<DiagnostAuthentication><DiagnosticCenterProfile /></DiagnostAuthentication>}
                            >
                                <Route
                                    path="diagnostCenterProfileInfo"
                                    element={<DiagnostAuthentication> <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDiagnosticProfileInformation />
                                </React.Suspense></DiagnostAuthentication>
                                       
                                    }
                                ></Route>
                            </Route>
                            <Route
                                path="diagnosticCenterManage"
                                element={<DiagnostAuthentication><DiagnosticCenterManage /></DiagnostAuthentication>}
                            >
                                <Route
                                    path="diagnostSalesActivities"
                                    element={<DiagnostAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDiagnosticSalesActivities />
                                </React.Suspense></DiagnostAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="diagnostCenterAuditLog"
                                    element={<DiagnostAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyDiagnosticAuditLogs />
                                </React.Suspense></DiagnostAuthentication>
                                        
                                    }
                                ></Route>
                            </Route>
                        </Route>
                        {/* -----------Diagnost Center  Ends---------------------- */}

                        {/* -------------HCF Routes Starts------------------ */}

                        <Route path="/hcfAdmin" element={<AdminMainDashboard />}>
                            <Route
                                path="notification"
                                element={<HealthCareAuthentication>
                                    <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                        <LazyAdminNotification />
                                    </React.Suspense></HealthCareAuthentication>
                                }
                            ></Route>
                                <Route
                                    path="adminProfile"
                                    element={<HealthCareAuthentication> <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyAdminProfile />
                                </React.Suspense></HealthCareAuthentication>
                                       
                                    }
                                ></Route>
                            <Route path="doctor" element={<AdminDoctor />}>
                                <Route
                                    path="allDoctors"
                                    element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyAdminAllDoctors />
                                </React.Suspense></HealthCareAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="active"
                                    element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyAdminActive />
                                </React.Suspense></HealthCareAuthentication>
                                        
                                    }
                                ></Route>
                                <Route path="blocked" element={<HealthCareAuthentication><HCFBlocked /></HealthCareAuthentication>}></Route>

                                <Route path="addDoctor" element={<HealthCareAuthentication><HCFAddDoctors /></HealthCareAuthentication>}></Route>
                                <Route path="addPackage" element={<HealthCareAuthentication><HCFAddPackage /></HealthCareAuthentication>}></Route>
                            </Route>
                            {/* hcfadmin/diagnosticcenter/blocked */}
                            <Route path="diagnosticCenter" element={<HealthCareAuthentication><AdminDiagnosticCenter /></HealthCareAuthentication>}>
                                <Route
                                    path="labs"
                                    element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyAdminLabs />
                                </React.Suspense></HealthCareAuthentication>
                                        
                                    }
                                ></Route>
                                <Route path="labs/:labId" element={<HealthCareAuthentication><AdminLabDetail /></HealthCareAuthentication>}></Route>

                                <Route
                                    path="staff"
                                    element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyAdminStaff />
                                </React.Suspense></HealthCareAuthentication>
                                        
                                    }
                                ></Route>

                                <Route
                                    path="blocked"
                                    element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyAdminBlocked />
                                </React.Suspense></HealthCareAuthentication>
                                        
                                    }
                                ></Route>
                            </Route>
                            <Route path="hcfAdminManage" element={<HealthCareAuthentication><AdminManage /></HealthCareAuthentication>}>
                                <Route
                                    path="hcfAdminSale"
                                    element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyAdminSalesActivities />
                                </React.Suspense></HealthCareAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="hcfAdminOverview"
                                    element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyAdminOverview />
                                </React.Suspense></HealthCareAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="hcfAdminBooking"
                                    element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyAdminBooking />
                                </React.Suspense></HealthCareAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="hcfAdminPayout"
                                    element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <LazyAdminPayout />
                                </React.Suspense></HealthCareAuthentication>
                                        
                                    }
                                ></Route>
                                <Route
                                    path="hcfAdminAuditLog"
                                    element={<HealthCareAuthentication><React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                    <AdminManageAuditLog />
                                </React.Suspense></HealthCareAuthentication>
                                        
                                    }
                                ></Route>
                            </Route>

                            <Route
                                path="/hcfAdmin/diagnosticCenter/labs/:labId"
                                element={<HealthCareAuthentication><DiagnostLabs /></HealthCareAuthentication>}
                            ></Route>
                        </Route>

                        {/* -------------HCF Routes Ends------------------ */}

                        {/* ------------- Super Admin Starts----------- */}
                        <Route path="superAdmin" element={<SuperAdminBody />}>
                            <Route path="dashboard" element={<SuperAdminDashboard />}>
                                <Route
                                    path="mainDashboard"
                                    element={<SuperAdminMainDashboard />}
                                ></Route>
                            </Route>
                            <Route path="history" element={<SuperAdminHistory />}>
                                <Route
                                    path="doctor"
                                    element={
                                        <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                            <LazySuperAdminHistoryDoctor />
                                        </React.Suspense>
                                    }
                                />
                                <Route
                                    path="patient"
                                    element={
                                        <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                            <LazySuperAdminHistoryPatient />
                                        </React.Suspense>
                                    }
                                />
                                <Route
                                    path="hcf"
                                    element={
                                        <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                            <LazySuperAdminHistoryHCF />
                                        </React.Suspense>
                                    }
                                />
                            </Route>
                            <Route path="accessibility" element={<SuperAdminAccessibilty />}>
                                <Route
                                    path="doctors"
                                    element={
                                        <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                            <LazySuperAdminDoctor />
                                        </React.Suspense>
                                    }
                                ></Route>

                                <Route
                                    path="patient"
                                    element={
                                        <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                            <LazySuperAdminPatient />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="hcf"
                                    element={
                                        <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                            <LazySuperAdminHCF />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>
                            <Route path="logs" element={<SuperAdminLogsBody />}>
                                <Route path="auditLogs" element={<SuperAdminLogs />}></Route>
                            </Route>

                            <Route path="package" element={<SuperAdminPackage />}>
                                <Route
                                    path="packagePatient"
                                    element={
                                        <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                            <LazySuperAdminPackagePatient />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="packageDoctor"
                                    element={
                                        <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                            <LazySuperAdminPackageDoctor />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>

                            <Route path="transaction" element={<SuperAdminTransaction />}>
                                <Route
                                    path="doctor"
                                    element={
                                        <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                            <LazySuperAdminTranDoctor />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="hcf"
                                    element={
                                        <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
                                            <LazySuperAdminTranHCF />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>
                        </Route>
                        {/* --------S----uper Admin Ends ------------- */}

                        {/* Video calling SDK and chats----------------- starts */}
                        <Route path="/videoCallingSdk/:appId" element={<VideoCallingSDK />}></Route>
                        <Route path="/chatRoom" element={<ChatRoom />}></Route>
                        {/* Video Calling SDK Ends--------------- */}

                        {/* -------------------------------HCF Route Ends---------------------------------------- */}
                    </>
                )}
                <Route element={NotFound} />
            </Routes>
        </Suspense>
    </UserProvider>
);
