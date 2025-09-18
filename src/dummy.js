// // import React, { lazy, Suspense } from "react";
// // import { Routes, Route } from "react-router-dom";
// // import PageLoader from "./components/PageLoader";
// // import { UserProvider } from "./loginComponent/UserProvider";
// // import {
// //   DoctorAuthentication,
// //   HealthCareAuthentication,
// //   PatientAuthentication,
// // } from "./loginComponent/RequireAuthentication";

// // const Usage = lazy(() => import("./pages/Usage"));
// // const Selectprofiletype = lazy(() => import("./pages/SelectProfileType"));
// // const Patientlogin = lazy(() => import("./pages/PatientModule/PatientLogin/patientlogin"));
// // const Patientforgotpassword = lazy(() => import("./pages/PatientModule/PatientForgotPassword/patientforgotpassword"));
// // const Patientforgotpassword2 = lazy(() => import("./pages/PatientModule/PatientForgotPassword2/patientforgotpassword2"));
// // const Patientforgotpassword3 = lazy(() => import("./pages/PatientModule/PatientForgotPassword3/patientforgotpassword3"));
// // const Patientloginwithotp = lazy(() => import("./pages/PatientModule/PatientLoginwithOTP/patientloginwithotp"));
// // const Patientloginwithotp2 = lazy(() => import("./pages/PatientModule/PatientLoginwithotp2/patientloginwithotp2"));
// // const Patientsignup = lazy(() => import("./pages/PatientModule/PatientSignup/patientsignup"));
// // const Patientverification = lazy(() => import("./pages/PatientModule/PatientVerification/patientverification"));
// // const Patientpersonalinformation = lazy(() => import("./pages/PatientModule/PatientPersonalInformation/patientpersonalinformation"));
// // const Patientcontactinformation = lazy(() => import("./pages/PatientModule/PatientContactInformation/patientcontactinformation"));
// // const Patientpaymentinformation = lazy(() => import("./pages/PatientModule/PatientPaymentInformation/patientpaymentinformation"));
// // const Hcflogin = lazy(() => import("./pages/HCFModule/HCFLogin/hcflogin"));
// // const Hcfdashboard = lazy(() => import("./pages/HCFModule/HCFDashboard/hcfdashboard"));
// // const Home = lazy(() => import("./pages/landingPage/Home/Home"));
// // const BodyDashboard = lazy(() => import("./Dashboard/BodyDashboard/BodyDashboard"));
// // const Explore = lazy(() => import("./Dashboard/Explore/Explore"));
// // const MyActivity = lazy(() => import("./Dashboard/MyActivity/MyActivity"));
// // const Profile = lazy(() => import("./Dashboard/Profile/Profile"));
// // const DrDetailsCard = lazy(() => import("./Dashboard/DrDetailsCard/DrDetailsCard"));
// // const Received = lazy(() => import("./Dashboard/MyActivity/Received/Received"));
// // const Shared = lazy(() => import("./Dashboard/MyActivity/Shared/Shared"));
// // const Upcoming = lazy(() => import("./Dashboard/PatientAppointment/UpComing/Upcoming"));
// // const Completed = lazy(() => import("./Dashboard/PatientAppointment/Completed/Completed"));
// // const Cancelled = lazy(() => import("./Dashboard/PatientAppointment/Cancelled/Cancelled"));
// // const Chats = lazy(() => import("./Dashboard/PatientAppointment/Chats/Chats"));
// // const AppointmentDashboard = lazy(() => import("./Dashboard/PatientAppointment/AppointmentDashboard"));
// // const MainDashboard = lazy(() => import("./Dashboard/MainDashboard/MainDashboard"));
// // const Payment = lazy(() => import("./Dashboard/Profile/Payment"));
// // const Contact = lazy(() => import("./Dashboard/Profile/ContactDetails"));
// // const BookingHistory = lazy(() => import("./Dashboard/PatientManage/BookingHistory/BookingHistory"));
// // const Transactions = lazy(() => import("./D

// // \\shboard/PatientManage/Transactions/Transactions"));
// // const Reports = lazy(() => import("./Dashboard/PatientManage/Reports/Reports"));
// // const Subscriptions = lazy(() => import("./Dashboard/PatientManage/Subscription/Subscription"));
// // const AllFiles = lazy(() => import("./Dashboard/PatientManage/Reports/AllFiles/AllFiles"));
// // const DoctorDashboard = lazy(() => import("./DoctorModule/DoctorDashboard/doctordashboard"));
// // const DoctorLogin = lazy(() => import("./DoctorModule/DoctorLogin/doctorlogin"));
// // const Request = lazy(() => import("./DoctorModule/DoctorMainDashboard/Request.js/Request"));
// // const Notification = lazy(() => import("./DoctorModule/DoctorMainDashboard/Notification.js/Notification"));
// // const DoctorAppointmentDashboard = lazy(() => import("./DoctorModule/DoctorAppointmentDashboard/DoctorAppointmentDashboard"));
// // const DoctorUpcoming = lazy(() => import("./DoctorModule/DoctorAppointmentDashboard"));

// import React, { lazy, Suspense } from "react";
// import { Routes, Route } from "react-router-dom";
// import PageLoader from "./components/PageLoader";
// import Usage from "./pages/Usage";
// import Selectprofiletype from "./pages/SelectProfileType";
// import Patientlogin from "./pages/PatientModule/PatientLogin/patientlogin";
// import Patientforgotpassword from "./pages/PatientModule/PatientForgotPassword/patientforgotpassword";
// import Patientforgotpassword2 from "./pages/PatientModule/PatientForgotPassword2/patientforgotpassword2";
// import Patientforgotpassword3 from "./pages/PatientModule/PatientForgotPassword3/patientforgotpassword3";
// import Patientloginwithotp from "./pages/PatientModule/PatientLoginwithOTP/patientloginwithotp";
// import Patientloginwithotp2 from "./pages/PatientModule/PatientLoginwithotp2/patientloginwithotp2";
// import Patientsignup from "./pages/PatientModule/PatientSignup/PatientSignup";
// import Patientverification from "./pages/PatientModule/PatientVerification/patientverification";
// import Patientpersonalinformation from "./pages/PatientModule/PatientPersonalInformation/patientpersonalinformation";
// import Patientcontactinformation from "./pages/PatientModule/PatientContactInformation/patientcontactinformation";
// import Patientpaymentinformation from "./pages/PatientModule/PatientPaymentInformation/patientpaymentinformation";
// // import Doctorlogin from "./pages/DoctorModule/DoctorLogin/doctorlogin";
// // import Doctordashboard from "./pages/DoctorModule/DoctorDashboard/doctordashboard";
// import Hcflogin from "./pages/HCFModule/HCFLogin/hcflogin";
// import Hcfdashboard from "./pages/HCFModule/HCFDashboard/hcfdashboard";
// import Home from "./pages/landingPage/Home/Home";
// import { UserProvider } from "./loginComponent/UserProvider";
// import {
//     DoctorAuthentication,
//     HealthCareAuthentication,
//     PatientAuthentication,
// } from "./loginComponent/RequireAuthentication";
// import BodyDashboard from "./Dashboard/BodyDashboard/BodyDashboard";
// import Explore from "./Dashboard/Explore/Explore";

// import Profile from "./Dashboard/Profile/Profile";
// import DrDetailsCard from "./Dashboard/DrDetailsCard/DrDetailsCard";
// import Received from "./Dashboard/MyActivity/Received/Received";
// import Shared from "./Dashboard/MyActivity/Shared/Shared";
// import Upcoming from "./Dashboard/PatientAppointment/UpComing/Upcoming";
// import Completed from "./Dashboard/PatientAppointment/Completed/Completed";
// import Cancelled from "./Dashboard/PatientAppointment/Cancelled/Cancelled";
// import Chats from "./Dashboard/PatientAppointment/Chats/Chats";
// import AppointmentDashboard from "./Dashboard/PatientAppointment/AppointmentDashboard";
// import MainDashboard from "./Dashboard/MainDashboard/MainDashboard";
// import Payment from "./Dashboard/Profile/Payment";
// import Contact from "./Dashboard/Profile/ContactDetails";
// // import { AllFiles } from "./Dashboard/PatientManage/Reports/AllFiles/AllFiles";
// import DoctorDashboard from "./DoctorModule/DoctorDashboard/doctordashboard";
// import DoctorLogin from "./DoctorModule/DoctorLogin/doctorlogin";
// import Request from "./DoctorModule/DoctorMainDashboard/Request.js/Request";
// import Notification from "./DoctorModule/DoctorMainDashboard/Notification.js/Notification";
// import DoctorAppointmentDashboard from "./DoctorModule/DoctorAppointmentDashboard/DoctorAppointmentDashboard";
// import DoctorUpcoming from "./DoctorModule/DoctorAppointmentDashboard/DoctorUpcoming/DoctorUpcoming";

// // const DoctorRequest = lazy(() => import("./DoctorModule/DoctorAppointmentDashboard/DoctorRequest/DoctorRequest"));
// // const DoctorCompleted = lazy(() => import("./DoctorModule/DoctorAppointmentDashboard/DoctorCompleted/DoctorCompleted"));
// // const DoctorCancelled = lazy(() => import("./DoctorModule/DoctorAppointmentDashboard/DoctorCancelled/DoctorCancelled"));
// // const DoctorManage = lazy(() => import("./DoctorModule/DoctorManage/DoctorManage"));
// // const DoctorListing = lazy(() => import("./DoctorModule/DoctorListing/DoctorListing"));
// // const DoctorActiveListing = lazy(() => import("./DoctorModule/DoctorListing/DoctorActiveListing/DoctorActiveLising"));
// // const DoctorSavedDraft = lazy(() => import("./DoctorModule/DoctorListing/DoctorSavedDraft/DoctorSavedDraft"));
// // const DoctorStatistics = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorStatistics"));
// // const DoctorBookingHistory = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorBookingHistory/DoctorBookingHistory"));
// // const DoctorTransaction = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorTransactions/DoctorTransaction"));
// // const DoctorOverview = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorOverview/DoctorOverview"));
// // const DoctorPayout = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorPayout/DoctorPayout"));
// // const DoctorStaff = lazy(() => import("./DoctorModule/DoctorManage/DoctorStaff/DoctorStaff"));
// // const DoctorAuditLog = lazy(() => import("./DoctorModule/DoctorManage/DoctorAuditLog/doctorAuditLog"));

// import DoctorRequest from "./DoctorModule/DoctorAppointmentDashboard/DoctorRequest/DoctorRequest";
// import DoctorCompleted from "./DoctorModule/DoctorAppointmentDashboard/DoctorCompleted/DoctorCompleted";
// import DoctorCancelled from "./DoctorModule/DoctorAppointmentDashboard/DoctorCancelled/DoctorCancelled";
// import DoctorManage from "./DoctorModule/DoctorManage/DoctorManage";
// import DoctorListing from "./DoctorModule/DoctorListing/DoctorListing";
// import DoctorActiveListing from "./DoctorModule/DoctorListing/DoctorActiveListing/DoctorActiveLising";
// import DoctorSavedDraft from "./DoctorModule/DoctorListing/DoctorSavedDraft/DoctorSavedDraft";
// import DoctorStatistics from "./DoctorModule/DoctorStatistics/DoctorStatistics";
// import DoctorBookingHistory from "./DoctorModule/DoctorStatistics/DoctorBookingHistory/DoctorBookingHistory";
// import DoctorTransaction from "./DoctorModule/DoctorStatistics/DoctorTransactions/DoctorTransaction";
// import DoctorOverview from "./DoctorModule/DoctorStatistics/DoctorOverview/DoctorOverview";
// import DoctorPayout from "./DoctorModule/DoctorStatistics/DoctorPayout/DoctorPayout";
// import DoctorStaff from "./DoctorModule/DoctorManage/DoctorStaff/DoctorStaff";
// import DoctorAuditLog from "./DoctorModule/DoctorManage/DoctorAuditLog/doctorAuditLog";
// import SelectHCFprofiletype from "./pages/selectHCFProfileType/SelectHCFProfileType";
// import DiagnosticLogin from "./HCFModule/HCFLogin/DisgnostLogin/DiagnostLogin";
// import ClinicLogin from "./HCFModule/HCFLogin/ClinicLogin/ClinicLogin";
// import DiagnosticCenterDashboard from "./HCFModule/HCFDashboard/DiagnosticCenterDashboard/DiagnosticCenterDashboard";
// import ClinicMainDashboard from "./HCFModule/HCFDashboard/ClinicDashboard/ClinicMainDashboard";
// import DiagnosticNotification from "./HCFModule/DiagnosticCenter/DiagnosticDashboard/DiagnosticNotification/DiagnosticNotification";
// import DiagnosticCenterProfile from "./HCFModule/DiagnosticCenter/DiagnosticProfile/DiagnstCenterProfileDashboard";
// import DiagnosticPatientProfileInformation from "./HCFModule/DiagnosticCenter/DiagnosticProfile/DiagnostCenterProfileInfo/DiagnostCenterProfileInfo";
// import DiagnosticCenterManage from "./HCFModule/DiagnosticCenter/DiagnosticManage/DiagnosticCenterManage";
// import DiagnosticAuditLogs from "./HCFModule/DiagnosticCenter/DiagnosticManage/DiagnosticCenterAuditLog/diagnosticCenterAuditLog";
// import ClinicDashboard from "./HCFModule/Clinic/ClinicDashboard/ClinicDashboard";
// import ClinicNotification from "./HCFModule/Clinic/ClinicDashboard/ClinicNotification/Clinicnotification";
// import ClinicRequests from "./HCFModule/Clinic/ClinicDashboard/ClinicRequests/ClinicRequests";
// import ClinicMyAppointments from "./HCFModule/Clinic/ClinicMyAppointments/ClinicMyAppointments";
// import ClinicAppointmentRequest from "./HCFModule/Clinic/ClinicMyAppointments/ClinicRequests/ClinicAppointmentRequest";
// import ClinicUpcoming from "./HCFModule/Clinic/ClinicMyAppointments/ClinicUpcoming/ClinicUpcoming";
// import ClinicCompleted from "./HCFModule/Clinic/ClinicMyAppointments/ClinicCompleted/ClinicCompleted";
// import ClinicCancelled from "./HCFModule/Clinic/ClinicMyAppointments/ClinicCancelled/ClinicCancelled";
// import ClinicChats from "./HCFModule/Clinic/ClinicMyAppointments/ClinicChats/ClinicChats";
// import ClinicProfile from "./HCFModule/Clinic/ClinicProfile/ClinicProfile";
// import ClinicProfileInformation from "./HCFModule/Clinic/ClinicProfile/ClinicProfileInformation/ClinicProfileInformation";
// import ClinicManage from "./HCFModule/Clinic/ClinicManage/ClinicManage";
// import ClinicStaff from "./HCFModule/Clinic/ClinicManage/ClinicStaff/ClinicStaff";
// import ClinicAuditLog from "./HCFModule/Clinic/ClinicManage/ClinicAuditLog/ClinicAuditLog";
// import SelectSignup from "./signup/SelectSignup/SelectSignup";
// import DoctorSignup from "./signup/DoctorSign/DoctorSignup";
// import SelectHCFSignup from "./signup/HCFsignup/SelectHCFSignup";
// import AdminMainDashboard from "./HCFModule/HCFDashboard/AdminDashboard/AdminDashboard";
// import HCFAdminNotifications from "./HCFModule/HCFAdmin/AdminDashboard/Notifications/HCFAdminNotification";
// import AdminDoctor from "./HCFModule/HCFAdmin/AdminDoctor/AdminDoctor";
// import HCFAllDoctors from "./HCFModule/HCFAdmin/AdminDoctor/AllDoctors/AllDoctor";
// import HCFActive from "./HCFModule/HCFAdmin/AdminDoctor/Active/Active";
// import HCFBlocked from "./HCFModule/HCFAdmin/AdminDoctor/Blocked/Blocked";
// import HCFAddDoctors from "./HCFModule/HCFAdmin/AdminDoctor/AddDoctor/AddDoctor";
// import HCFAddPackage from "./HCFModule/HCFAdmin/AdminDoctor/AddPackage/AddPackage";
// import AdminDiagnosticCenter from "./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminDiagnosticCenter";
// import AdminLabs from "./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminLabs/AdminLabs";
// import AdminStaff from "./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminStaff/AdminStaff";
// import AdminBlocked from "./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminBlocked/AdminBlocked";
// import AdminManage from "./HCFModule/HCFAdmin/AdminManage/AdminManage";
// // import AdminManageStaff from "./HCFModule/HCFAdmin/AdminManage/AdminManageStaff/AdminManageStaff";
// import AdminManageAuditLog from "./HCFModule/HCFAdmin/AdminManage/AdminManageAuditLog/AdminManageAuditLog";
// import DiagnostSignUp from "./signup/HCFsignup/DiagnostSignup/DiagnosticSignup";
// import ClinicSignUp from "./signup/HCFsignup/ClinicSignup/ClinicSignUp";
// import AdminSignUp from "./signup/HCFsignup/AdminSignup/AdminSignup";
// import ListingDetails from "./DoctorModule/DoctorListing/CreateNewListing/ListingDetails/ListingDetails";
// import AddPlans from "./DoctorModule/DoctorListing/CreateNewListing/AddPlan/AddPlan";
// import AddQuestioner from "./DoctorModule/DoctorListing/CreateNewListing/AddQuestioner/AddQuestioner";
// import TermsAndCondition from "./DoctorModule/DoctorListing/CreateNewListing/TermsAndCondition/TermsAndCondition";
// import DoctorPersonalInfo from "./DoctorModule/DoctorProfile/DoctorProfileInfo/DoctorPersonalInfo";
// import DoctorProssionalInfo from "./DoctorModule/DoctorProfile/DoctorProfessionalInfo/DoctorProfessionalInfo";
// import AdminManageSale from "./HCFModule/HCFAdmin/AdminManage/AdminManageSale/AdminManageSale";
// import AdminOverview from "./HCFModule/HCFAdmin/AdminManage/AdminOverview/AdminOverview";
// import AdminBooking from "./HCFModule/HCFAdmin/AdminManage/AdminManageBooking/AdminBooking";
// import AdminPayout from "./HCFModule/HCFAdmin/AdminManage/AdminManagePayout/AdminPayout";
// import DiagnosticCenterReports from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticCenterReports";
// import DiagnosticPatientSearch from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticPatientSearch/DiagnosticPatientSearch";
// import DiagnosticPatientShared from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagonisticCenterShared/DiagostCenterShared";
// import DiagnosticPatientChats from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticCenterChat/DiagnostCenterChats";
// import DiagnosticCenterCharts from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticCenterCharts/DiagnosticCenterCharts";
// import DiagnosticStaff from "./HCFModule/DiagnosticCenter/DiagnosticManage/DiagnostcCenterStaff/DiagnosticCenterStaff";
// import BookingHistory from "./Dashboard/PatientManage/BookingHistory/BookingHistory";
// import Transactions from "./Dashboard/PatientManage/Transactions/Transactions";
// import Reports from "./Dashboard/PatientManage/Reports/Reports";
// import AllFiles from "./Dashboard/PatientManage/Reports/AllFiles/AllFiles";
// import Examined from "./Dashboard/PatientManage/Reports/examined/Examined";
// import Subscriptions from "./Dashboard/PatientManage/Subscription/Subscription";
// import VideoCall from "./DoctorModule/DoctorAppointmentDashboard/DoctorChat/VideoCall";
// import DoctorChat from "./DoctorModule/DoctorAppointmentDashboard/DoctorChat/DoctorChat";
// import VoiceCall from "./DoctorModule/DoctorAppointmentDashboard/DoctorChat/VoiceCall";
// import HCFDetailedCard from "./pages/PatientModule/PatientHCF/DrDetailsCard/HCFDetailedCard";
// import SuperAdminBody from "./SuperAdmin/SuperAdminBody/SuperAdminBody";
// import DiagnostLabs from "./HCFModule/HCFAdmin/AdminDiagnosticCenter/Labs/DiagnostLabs";
// import SuperAdminDashboard from "./SuperAdmin/SuperAdminDashboard/SuperAdminDashboard";
// import SuperAdminHistory from "./SuperAdmin/SuperAdminHistory/SuperAdminhistory";
// import SuperAdminDoctor from "./SuperAdmin/SuperAdminAcessibility/SuperAdminDoctor/SuperAdminDoctor";
// import SuperAdminPatient from "./SuperAdmin/SuperAdminAcessibility/SuperAdminpatient/SuperAdminPatient";
// import SuperAdminLogsBody from "./SuperAdmin/SuperAdminLogs/SuperAdminLogsBody";
// import SuperAdminLogs from "./SuperAdmin/SuperAdminLogs/SuperAdminAuditLogs/SuperAdminAuditLogs";
// import SuperAdminMainDashboard from "./SuperAdmin/SuperAdminDashboard/SuperAdminMainDashboard/superadminmaindashboard";
// import SuperAdminHCF from "./SuperAdmin/SuperAdminAcessibility/SuperAdminHCF/SuperAdminHCF";
// import SuperAdminHistoryDoctor from "./SuperAdmin/SuperAdminHistory/SuperAdminHistoryDoctor/SuperAdminHistoryDoctor";
// import SuperAdminHistoryPatient from "./SuperAdmin/SuperAdminHistory/SuperAdminHistoryPatient/SuperAdminHistoryPatient";
// import SuperAdminHistoryHCF from "./SuperAdmin/SuperAdminHistory/SuperAdminHistoryHCF/SuperAdminHistoryHCF";
// import SuperAdminAccessibilty from "./SuperAdmin/SuperAdminAcessibility/SuperAdminAccessibility";
// import DoctorRegistration from "./Registration/DoctorRegistration/DoctorRegistration";
// import DoctorVerification from "./Registration/DoctorRegistration/DoctorVerification/DoctorVerification";
// import SignUpHcf from "./pages/SignUpHCF/SignUpHCF";
// import PatientCompleteProfile from "./signup/patientSignup/PatientCompleteProfile";

// const ManageDashboard = lazy(() => import("./Dashboard/PatientManage/ManageDashboard"));
// // import MyActivity from "./Dashboard/MyActivity/MyActivity";
// const LazyPatientMyActivity = lazy(() => import("./Dashboard/MyActivity/MyActivity"));
// // import PatientCompleteProfile from "./signup/patientSignup/PatientSignUp";

// const LazyPatientExplore = lazy(() => import("./Dashboard/Explore/Explore"));

// const NotFound = lazy(() => import("./components/NotFound"));
// const DevEnv = process.env.NODE_ENV === "development";
// export const AppRouter = () => (
//     <UserProvider>
//         <Suspense fallback={<PageLoader text="Please wait while we load your application" />}>
//             <Routes>
//                 {DevEnv && (
//                     <>
//                         <Route path="/usage" element={<Usage />} />
//                         <Route path="/selectProfileType" element={<Selectprofiletype />} />

//                         {/* Checkpoint 1 added hcf route  */}
//                         <Route path="/selectHcfProfileType" element={<SelectHCFprofiletype />} />
//                         <Route path="/hcfSignup" element={<SignUpHcf/>} ></Route>
//                         <Route path="/patientLogin" element={<Patientlogin />} />

//                         <Route path="/" element={<Home />} />
//                         {/* ------ signup routes start------ */}
//                         <Route path="/selectSignup" element={<SelectSignup />}></Route>
//                         <Route path="/doctorSignup" element={<DoctorSignup />}></Route>
//                         <Route path="/selectHcfSignup" element={<SelectHCFSignup />}></Route>
//                         <Route path="/diagnostCenterSignup" element={<DiagnostSignUp />}></Route>
//                         <Route path="/diagnostClinicSignup" element={<ClinicSignUp />}></Route>
//                         <Route path="/hcfAdminSignup" element={<AdminSignUp />}></Route>
//                         {/* ------ signup routes ends------ */}
//                         <Route path="/patientForgotPassword" element={<Patientforgotpassword />} />
//                         <Route
//                             path="/patientForgotPassword2"
//                             element={<Patientforgotpassword2 />}
//                         />
//                         <Route
//                             path="/patientForgotPassword3"
//                             element={<Patientforgotpassword3 />}
//                         />
//                         <Route path="/patientLoginWithOtp" element={<Patientloginwithotp />} />
//                         <Route path="/patientLoginWithOtp2" element={<Patientloginwithotp2 />} />
//                         <Route path="/patientSignup" element={<Patientsignup />} />
//                         <Route path="/patientCompleteProfile" element={<PatientCompleteProfile  />} ></Route>
//                         <Route path="/patientVerification" element={<Patientverification />} />
//                         <Route
//                             path="/patientPersonalInformation"
//                             element={<Patientpersonalinformation />}
//                         />
//                         <Route
//                             path="/patientContactInformation"
//                             element={<Patientcontactinformation />}
//                         />
//                         <Route
//                             path="/patientPaymentInformation"
//                             element={<Patientpaymentinformation />}
//                         />
//                         {/* --------------------------- Patient Dashboard Routes starts-------------------------------------- */}
//                         <Route
//                             path="/patientDashboard"
//                             element={
//                                 // <PatientAuthentication>
//                                     <BodyDashboard />
//                                 // </PatientAuthentication>
//                             }
//                         >
//                             {/* ------------------ Dashboard Route Starts ------------------------- */}
//                             <Route key={1} path="dashboard" element={<MainDashboard />}>
//                             <Route
//                                     path='dashboard' 
//                                     element={    
//                                             <React.Suspense fallback={<h1>put your loader here....</h1>}>
//                                                 <LazyPatientMyActivity>
//                                                     <Route path="received" element={<Received />}></Route>
//                                                     <Route path="shared" element={<Shared />}></Route>
//                                                 </LazyPatientMyActivity>
//                                             </React.Suspense>                                            
//                                           }>    
//                                 </Route>
//                                 {/* <Route key={2} path="explore" element={<Explore />} /> */}

//                                 <Route
//                                     path='explore' 
//                                     element={    
//                                             <React.Suspense fallback={<h1>Put loader here...</h1>}>
//                                                 <LazyPatientExplore></LazyPatientExplore>
//                                             </React.Suspense>                                            
//                                           }>    
//                                 </Route>

//                                 <Route
//                                     path='myactivity' 
//                                     element={    
//                                             <React.Suspense fallback={<h1>Put loader here...</h1>}>
//                                                 <LazyPatientMyActivity>
//                                                     <Route path="received" element={<Received />}></Route>
//                                                     <Route path="shared" element={<Shared />}></Route>
//                                                 </LazyPatientMyActivity>
//                                             </React.Suspense>                                            
//                                           }>    
//                                 </Route>
// {/* 
//                                 <Route key={2} path="myactivity" element={<MyActivity />}>
//                                     <Route path="received" element={<Received />}></Route>
//                                     <Route path="shared" element={<Shared />}></Route>
//                                 </Route> */}
//                                 <Route path={"profile"} element={<Profile />}></Route>
//                                 <Route path={"payment"} element={<Payment />}></Route>
//                                 <Route path={"contact"} element={<Contact />}></Route>
//                                 <Route path={"patienthcf"} element={<HCFDetailedCard/>} ></Route>
//                             </Route>

//                             <Route path="appointment" element={<AppointmentDashboard />}>
//                                 <Route path="upcoming" element={<Upcoming />}></Route>
//                                 <Route path="completed" element={<Completed />}></Route>
//                                 <Route path="cancelled" element={<Cancelled />}></Route>
//                                 <Route path="chats" element={<Chats />}></Route>
//                             </Route>

//                             <Route path="manage" element={<ManageDashboard />}>
//                                 {/* <Route path="bookinghistory" element={<HCFDetailedCard/>}></Route> */}
//                                 <Route path="bookinghistory" element={<BookingHistory />}></Route>
//                                 <Route path="transactions" element={<Transactions />}></Route>
//                                 <Route path="reports" element={<Reports />}>
//                                     <Route path="request" element={<AllFiles />}></Route>
//                                     <Route path="examined" element={<Examined />}></Route>
//                                     <Route path="received" element={<Received />}></Route>
//                                     <Route path="shared" element={<Shared />}></Route>
//                                 </Route>
//                                 <Route path="subscriptions" element={<Subscriptions />}></Route>
//                             </Route>

//                             {/* ------------------ Dashboard Route Ends ------------------------- */}

//                             <Route
//                                 path="/patientDashboard/drDetailsCard/:resID"
//                                 element={<DrDetailsCard />}
//                             >
//                             </Route>
//                             <Route
//                                 path="/patientDashboard/hcfDetailCard/:hcfID"
//                                 element={<HCFDetailedCard />}
//                             >
//                                 <Route path='about' element={<h1>About</h1>} />
//                                 <Route path='department' element={<h1>Departmenmts</h1>} />
//                                 <Route path='labs' element={<h1>Labs</h1>} />
//                             </Route>
    
//                         </Route>

//                         {/* ---------------------------------- Patient Appointment Routes Ends---------------------------------------- */}

//                         {/* --------------------Doctor routes Starts------------------------------ */}
//                         <Route path="/doctorLogin" element={<DoctorLogin />} />
//                         <Route path="/doctorRegistration" element={<DoctorRegistration/> }  ></Route>
//                         <Route path="/doctorVerification" element={<DoctorVerification/> }  ></Route>

//                         <Route path="doctorDashboard/doctorAppointment/chats/videoCall" element={<VideoCall/>} ></Route>

//                         <Route
//                             path="/doctorDashboard"
//                             element={
//                                 // <DoctorAuthentication>
//                                 <DoctorDashboard />
//                                 // </DoctorAuthentication>
//                             }
//                         >
//                             {/* /doctor/request */}
//                             {/* /request */}
//                             <Route
//                                 path="doctorPersonalInfo"
//                                 element={<DoctorPersonalInfo />}
//                             ></Route>
//                             <Route
//                                 path="doctorProfessionalInfo"
//                                 element={<DoctorProssionalInfo />}
//                             ></Route>

//                             <Route path="request" element={<Request />}></Route>
//                             <Route path="notification" element={<Notification />}></Route>
//                             <Route
//                                 path="doctorAppointment"
//                                 element={<DoctorAppointmentDashboard />}
//                             >
//                                 <Route path="request" element={<DoctorRequest />}></Route>
//                                 <Route path="upcoming" element={<DoctorUpcoming />}></Route>
//                                 <Route path="completed" element={<DoctorCompleted />}></Route>
//                                 <Route path="cancelled" element={<DoctorCancelled />}></Route>
//                                 <Route path="chats" element={<DoctorChat/>}></Route> 
//                                 <Route path="chats/voiceCall" element={<VoiceCall/>} ></Route>
//                             </Route>
//                             {/* /doctor/listing */}
//                             <Route path="doctorListing" element={<DoctorListing />}>
//                                 <Route
//                                     path="doctorActiveListing"
//                                     element={<DoctorActiveListing />}
//                                 ></Route>
//                                 {/* Create listing start------- */}
//                                 <Route path="listingDetails" element={<ListingDetails />}></Route>
//                                 <Route path="addPlans" element={<AddPlans />}></Route>
//                                 <Route path="addQuestioner" element={<AddQuestioner />}></Route>
//                                 <Route
//                                     path="termAndCondition"
//                                     element={<TermsAndCondition />}
//                                 ></Route>
//                                 {/* Create listing ends------- */}
//                                 {/* Edit listing starts-------- */}
//                                 <Route
//                                     path="editListingDetails"
//                                     element={<ListingDetails />}
//                                 ></Route>
//                                 <Route path="editAddPlans" element={<AddPlans />}></Route>
//                                 <Route path="editAddQuestioner" element={<AddQuestioner />}></Route>
//                                 <Route
//                                     path="editTermAndCondition"
//                                     element={<TermsAndCondition />}
//                                 ></Route>
//                                 {/* Edit listing ends-------- */}
//                                 <Route
//                                     path="doctorSavedInDraft"
//                                     element={<DoctorSavedDraft />}
//                                 ></Route>
//                             </Route>

//                             <Route path="doctorStatistics" element={<DoctorStatistics />}>
//                                 <Route
//                                     path="doctorBookingHistory"
//                                     element={<DoctorBookingHistory />}
//                                 ></Route>
//                                 <Route
//                                     path="doctorTransaction"
//                                     element={<DoctorTransaction />}
//                                 ></Route>
//                                 <Route path="doctorOverview" element={<DoctorOverview />}></Route>
//                                 <Route path="doctorPayout" element={<DoctorPayout />}></Route>
//                             </Route>

//                             <Route path="doctorManage" element={<DoctorManage />}>
//                                 <Route path="doctorStaff" element={<DoctorStaff />}></Route>
//                                 <Route path="doctorAuditLog" element={<DoctorAuditLog />}></Route>
//                             </Route>
//                         </Route>

//                         {/* ------------------------------Doctor Routes Ends------------------------------- */}

//                         {/* ------------------------------HCF Route Starts------------------------------------ */}

//                         <Route path="/hcfLogin" element={<Hcflogin />} />
//                         {/* -------------------Clinic Route Starts--------------------- */}
//                         <Route path="/diagnostClinicLogin" element={<ClinicLogin />} />
//                         <Route path="/clinicDashboard" element={<ClinicMainDashboard />}>
//                             <Route path="clinicBodyDashboard" element={<ClinicDashboard />}>
//                                 <Route path="cliniRequests" element={<ClinicRequests />}></Route>
//                                 <Route
//                                     path="clinicNotification"
//                                     element={<ClinicNotification />}
//                                 ></Route>
//                             </Route>
//                             <Route path="clinicMyAppointment" element={<ClinicMyAppointments />}>
//                                 <Route
//                                     path="clinicRequest"
//                                     element={<ClinicAppointmentRequest />}
//                                 ></Route>
//                                 <Route path="clinicUpcoming" element={<ClinicUpcoming />}></Route>
//                                 <Route path="clinicCompleted" element={<ClinicCompleted />}></Route>
//                                 <Route path="clinicCancelled" element={<ClinicCancelled />}></Route>
//                                 <Route path="clinicChats" element={<ClinicChats />}></Route>
//                             </Route>
//                             <Route path="clinicProfile" element={<ClinicProfile />}>
//                                 <Route
//                                     path="profileInformation"
//                                     element={<ClinicProfileInformation />}
//                                 ></Route>
//                             </Route>
//                             <Route path="clinicManage" element={<ClinicManage />}>
//                                 <Route path="clinicStaff" element={<ClinicStaff />}></Route>
//                                 <Route path="clinicAuditLog" element={<ClinicAuditLog />}></Route>
//                             </Route>
//                         </Route>

//                         {/* -------------------Clinic Route Ends--------------------- */}

//                         {/* -------------Diagnost Center  Starts------------------ */}

//                         <Route path="/diagnostCenterLogin" element={<DiagnosticLogin />} />
//                         <Route
//                             path="/diagnostCenterDashboard"
//                             element={<DiagnosticCenterDashboard />}
//                         >
//                             <Route path="notification" element={<DiagnosticNotification />}></Route>
//                             <Route
//                                 path="diagnosticCenterReports"
//                                 element={<DiagnosticCenterReports />}
//                             >
//                                 <Route path="request" element={<DiagnosticPatientSearch />}></Route>
//                                 <Route
//                                     path="examination"
//                                     element={<DiagnosticPatientShared />}
//                                 ></Route>
//                                 <Route path="report" element={<DiagnosticPatientChats />}></Route>
//                                 <Route path="Chart" element={<DiagnosticCenterCharts />}></Route>
//                             </Route>
//                             <Route
//                                 path="diagnostCenterProfile"
//                                 element={<DiagnosticCenterProfile />}
//                             >
//                                 <Route
//                                     path="diagnostCenterProfileInfo"
//                                     element={<DiagnosticPatientProfileInformation />}
//                                 ></Route>
//                             </Route>
//                             <Route
//                                 path="diagnosticCenterManage"
//                                 element={<DiagnosticCenterManage />}
//                             >
//                                 <Route
//                                     path="diagnostCenterStaff"
//                                     element={<DiagnosticStaff />}
//                                 ></Route>
//                                 <Route
//                                     path="diagnostCenterAuditLog"
//                                     element={<DiagnosticAuditLogs />}
//                                 ></Route>
//                             </Route>
//                         </Route>
//                         {/* -----------Diagnost Center  Ends---------------------- */}

//                         {/* -------------HCF Routes Starts------------------ */}

//                         <Route path="/hcfAdmin" element={<AdminMainDashboard />}>
//                             <Route path="notification" element={<HCFAdminNotifications />}></Route>
//                             <Route path="doctor" element={<AdminDoctor />}>
//                                 <Route path="allDoctors" element={<HCFAllDoctors />}></Route>
//                                 <Route path="active" element={<HCFActive />}></Route>
//                                 <Route path="blocked" element={<HCFBlocked />}></Route>
//                                 <Route path="addDoctor" element={<HCFAddDoctors />}></Route>
//                                 <Route path="addPackage" element={<HCFAddPackage />}></Route>
//                             </Route>
//                             {/* hcfadmin/diagnosticcenter/blocked */}
//                             <Route path="diagnosticCenter" element={<AdminDiagnosticCenter />}>
//                                 <Route path="labs" element={<AdminLabs />}></Route>
//                                 <Route path="staff" element={<AdminStaff />}></Route>
//                                 <Route path="blocked" element={<AdminBlocked />}></Route>
//                             </Route>
//                             <Route path="hcfAdminManage" element={<AdminManage />}>
//                                 <Route path="hcfAdminSale" element={<AdminManageSale />}></Route>
//                                 <Route path="hcfAdminOverview" element={<AdminOverview />}></Route>
//                                 <Route path="hcfAdminBooking" element={<AdminBooking />}></Route>
//                                 <Route path="hcfAdminPayout" element={<AdminPayout />}></Route>
//                                 <Route
//                                     path="hcfAdminAuditLog"
//                                     element={<AdminManageAuditLog />}
//                                 ></Route>
//                             </Route>

//                             <Route
//                                 path="/hcfAdmin/diagnosticCenter/labs/:labId"
//                                 element={<DiagnostLabs/>}
//                             ></Route>
//                         </Route>

//                         {/* -------------HCF Routes Ends------------------ */}

//                         {/* ------------- Super Admin Starts----------- */}
//                         <Route path="superAdmin" element={<SuperAdminBody />}>
//                             <Route path="dashboard" element={<SuperAdminDashboard />}>
//                                 <Route path="mainDashboard" element={<SuperAdminMainDashboard/>} ></Route>
//                             </Route>
//                             <Route path="history" element={<SuperAdminHistory />}>
//                                 <Route path="doctor" element={ <SuperAdminHistoryDoctor/> }/>
//                                 <Route path="patient" element={<SuperAdminHistoryPatient></SuperAdminHistoryPatient> }/>
//                                 <Route path="hcf" element={<SuperAdminHistoryHCF/>}/>
//                             </Route>

//                             <Route path="accessibility" element={<SuperAdminAccessibilty />}>
//                                 <Route path="doctors" element={<SuperAdminDoctor />}></Route>
//                                 <Route path="patient" element={<SuperAdminPatient />}></Route>
//                                 <Route path="hcf" element={<SuperAdminHCF />}></Route>
//                             </Route>
//                             <Route path="logs" element={<SuperAdminLogsBody />}>
//                                 <Route path="auditLogs" element={<SuperAdminLogs />}></Route>
//                             </Route>
//                         </Route>
//                         {/* --------S----uper Admin Ends ------------- */}

//                         {/* -------------------------------HCF Route Ends---------------------------------------- */}
//                     </>
//                 )}
//                 <Route element={NotFound} />
//             </Routes>
//         </Suspense>
//     </UserProvider>
// );
