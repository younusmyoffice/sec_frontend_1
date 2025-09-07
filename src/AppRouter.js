const ManageDashboard = lazy(() => import("./Dashboard/PatientManage/ManageDashboard"));

import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import Usage from "./pages/Usage";
import Selectprofiletype from "./pages/SelectProfileType";
import Patientlogin from "./pages/PatientModule/PatientLogin/patientlogin";
import Patientforgotpassword from "./pages/PatientModule/PatientForgotPassword/patientforgotpassword";
import Patientforgotpassword2 from "./pages/PatientModule/PatientForgotPassword2/patientforgotpassword2";
import Patientforgotpassword3 from "./pages/PatientModule/PatientForgotPassword3/patientforgotpassword3";
import Patientloginwithotp from "./pages/PatientModule/PatientLoginwithOTP/patientloginwithotp";
import Patientloginwithotp2 from "./pages/PatientModule/PatientLoginwithotp2/patientloginwithotp2";
import Patientsignup from "./pages/PatientModule/PatientSignup/patientsignup";
import PatientCompleteProfile from "./signup/patientSignup/PatientCompleteProfile";
import Patientverification from "./pages/PatientModule/PatientVerification/patientverification";
import Patientpersonalinformation from "./pages/PatientModule/PatientPersonalInformation/patientpersonalinformation";
import Patientcontactinformation from "./pages/PatientModule/PatientContactInformation/patientcontactinformation";
import Patientpaymentinformation from "./pages/PatientModule/PatientPaymentInformation/patientpaymentinformation";
import Hcflogin from "./pages/HCFModule/HCFLogin/hcflogin";
import Hcfdashboard from "./pages/HCFModule/HCFDashboard/hcfdashboard";
import Home from "./pages/landingPage/Home/Home";
import { UserProvider } from "./loginComponent/UserProvider";
import {
    DoctorAuthentication,
    HealthCareAuthentication,
    PatientAuthentication,
} from "./loginComponent/RequireAuthentication";
import BodyDashboard from "./Dashboard/BodyDashboard/BodyDashboard";
import Explore from "./Dashboard/Explore/Explore";
// import MyActivity from "./Dashboard/MyActivity/MyActivity";
const LazyPatientMyActivity = lazy(() => import("./Dashboard/MyActivity/MyActivity"));

import Profile from "./Dashboard/Profile/Profile";
import DrDetailsCard from "./Dashboard/DrDetailsCard/DrDetailsCard";
import Received from "./Dashboard/MyActivity/Received/Received";
import Shared from "./Dashboard/MyActivity/Shared/Shared";
import Upcoming from "./Dashboard/PatientAppointment/UpComing/Upcoming";
import Completed from "./Dashboard/PatientAppointment/Completed/Completed";
import Cancelled from "./Dashboard/PatientAppointment/Cancelled/Cancelled";
import Chats from "./Dashboard/PatientAppointment/Chats/Chats";
import AppointmentDashboard from "./Dashboard/PatientAppointment/AppointmentDashboard";
import MainDashboard from "./Dashboard/MainDashboard/MainDashboard";
import Payment from "./Dashboard/Profile/Payment";
import Contact from "./Dashboard/Profile/ContactDetails";
// import { AllFiles } from "./Dashboard/PatientManage/Reports/AllFiles/AllFiles";
import DoctorDashboard from "./DoctorModule/DoctorDashboard/doctordashboard";
import DoctorLogin from "./DoctorModule/DoctorLogin/doctorlogin";
const LazyDoctorrequest = lazy(() =>
    import("./DoctorModule/DoctorMainDashboard/Request.js/Request"),
);

const LazyDoctorNotification = lazy(() =>
    import("./DoctorModule/DoctorMainDashboard/Notification.js/Notification"),
);
import DoctorAppointmentDashboard from "./DoctorModule/DoctorAppointmentDashboard/DoctorAppointmentDashboard";
const LazyDoctorUpcoming = lazy(() =>
    import("./DoctorModule/DoctorAppointmentDashboard/DoctorUpcoming/DoctorUpcoming"),
);

// const DoctorRequest = lazy(() => import("./DoctorModule/DoctorAppointmentDashboard/DoctorRequest/DoctorRequest"));
// const DoctorCompleted = lazy(() => import("./DoctorModule/DoctorAppointmentDashboard/DoctorCompleted/DoctorCompleted"));
// const DoctorCancelled = lazy(() => import("./DoctorModule/DoctorAppointmentDashboard/DoctorCancelled/DoctorCancelled"));
// const DoctorManage = lazy(() => import("./DoctorModule/DoctorManage/DoctorManage"));
// const DoctorListing = lazy(() => import("./DoctorModule/DoctorListing/DoctorListing"));
// const DoctorActiveListing = lazy(() => import("./DoctorModule/DoctorListing/DoctorActiveListing/DoctorActiveLising"));
// const DoctorSavedDraft = lazy(() => import("./DoctorModule/DoctorListing/DoctorSavedDraft/DoctorSavedDraft"));
// const DoctorStatistics = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorStatistics"));
// const DoctorBookingHistory = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorBookingHistory/DoctorBookingHistory"));
// const DoctorTransaction = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorTransactions/DoctorTransaction"));
// const DoctorOverview = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorOverview/DoctorOverview"));
// const DoctorPayout = lazy(() => import("./DoctorModule/DoctorStatistics/DoctorPayout/DoctorPayout"));
// const DoctorStaff = lazy(() => import("./DoctorModule/DoctorManage/DoctorStaff/DoctorStaff"));
// const DoctorAuditLog = lazy(() => import("./DoctorModule/DoctorManage/DoctorAuditLog/doctorAuditLog"));

import DoctorRequest from "./DoctorModule/DoctorAppointmentDashboard/DoctorRequest/DoctorRequest";
import DoctorCompleted from "./DoctorModule/DoctorAppointmentDashboard/DoctorCompleted/DoctorCompleted";
import DoctorCancelled from "./DoctorModule/DoctorAppointmentDashboard/DoctorCancelled/DoctorCancelled";
import DoctorManage from "./DoctorModule/DoctorManage/DoctorManage";
import DoctorListing from "./DoctorModule/DoctorListing/DoctorListing";
const LazyDoctorActiveListing = lazy(() =>
    import("./DoctorModule/DoctorListing/DoctorActiveListing/DoctorActiveLising"),
);

import DoctorSavedDraft from "./DoctorModule/DoctorListing/DoctorSavedDraft/DoctorSavedDraft";

const LazyDoctorSavedDraft = lazy(() =>
    import("./DoctorModule/DoctorListing/DoctorSavedDraft/DoctorSavedDraft"),
);

import DoctorStatistics from "./DoctorModule/DoctorStatistics/DoctorStatistics";

const LazyDoctorBookingHistory = lazy(() =>
    import("./DoctorModule/DoctorStatistics/DoctorBookingHistory/DoctorBookingHistory"),
);

const LazyDoctorTransaction = lazy(() =>
    import("./DoctorModule/DoctorStatistics/DoctorTransactions/DoctorTransaction"),
);

const LazyDoctorOverview = lazy(() =>
    import("./DoctorModule/DoctorStatistics/DoctorOverview/DoctorOverview"),
);
import DoctorPayout from "./DoctorModule/DoctorStatistics/DoctorPayout/DoctorPayout";

const LazyDoctorPayout = lazy(() =>
    import("./DoctorModule/DoctorStatistics/DoctorPayout/DoctorPayout"),
);

const LazyDoctorStaff = lazy(() => import("./DoctorModule/DoctorManage/DoctorStaff/DoctorStaff"));
const LazyDoctorAuditLog = lazy(() =>
    import("./DoctorModule/DoctorManage/DoctorAuditLog/doctorAuditLog"),
);
import SelectHCFprofiletype from "./pages/selectHCFProfileType/SelectHCFProfileType";
import DiagnosticLogin from "./HCFModule/HCFLogin/DisgnostLogin/DiagnostLogin";
import ClinicLogin from "./HCFModule/HCFLogin/ClinicLogin/ClinicLogin";
import DiagnosticCenterDashboard from "./HCFModule/HCFDashboard/DiagnosticCenterDashboard/DiagnosticCenterDashboard";
import ClinicMainDashboard from "./HCFModule/HCFDashboard/ClinicDashboard/ClinicMainDashboard";
const LazyDiagnosticNotification = lazy(() =>
    import(
        "./HCFModule/DiagnosticCenter/DiagnosticDashboard/DiagnosticNotification/DiagnosticNotification"
    ),
);
import DiagnosticCenterProfile from "./HCFModule/DiagnosticCenter/DiagnosticProfile/DiagnstCenterProfileDashboard";
const LazyDiagnosticProfileInformation = lazy(() =>
    import(
        "./HCFModule/DiagnosticCenter/DiagnosticProfile/DiagnostCenterProfileInfo/DiagnostCenterProfileInfo"
    ),
);

import DiagnosticCenterManage from "./HCFModule/DiagnosticCenter/DiagnosticManage/DiagnosticCenterManage";
const LazyDiagnosticAuditLogs = lazy(() =>
    import(
        "./HCFModule/DiagnosticCenter/DiagnosticManage/DiagnosticCenterAuditLog/diagnosticCenterAuditLog"
    ),
);
import ClinicDashboard from "./HCFModule/Clinic/ClinicDashboard/ClinicDashboard";

const LazyClinicNotification = lazy(() =>
    import("./HCFModule/Clinic/ClinicDashboard/ClinicNotification/Clinicnotification"),
);
const LazyClinicRequests = lazy(() =>
    import("./HCFModule/Clinic/ClinicDashboard/ClinicRequests/ClinicRequests"),
);
import ClinicMyAppointments from "./HCFModule/Clinic/ClinicMyAppointments/ClinicMyAppointments";
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
import ClinicProfile from "./HCFModule/Clinic/ClinicProfile/ClinicProfile";
const LazyClinicProfileInformation = lazy(() =>
    import("./HCFModule/Clinic/ClinicProfile/ClinicProfileInformation/ClinicProfileInformation"),
);
import ClinicManage from "./HCFModule/Clinic/ClinicManage/ClinicManage";
import ClinicSalesActivities from "./HCFModule/Clinic/ClinicManage/ClinicStaff/ClinicSalesActivities";
const LazyClinicSalesActivities = lazy(() =>
    import("./HCFModule/Clinic/ClinicManage/ClinicStaff/ClinicSalesActivities"),
);
const LazyClinicAuditLog = lazy(() =>
    import("./HCFModule/Clinic/ClinicManage/ClinicAuditLog/ClinicAuditLog"),
);
import SelectSignup from "./signup/SelectSignup/SelectSignup";
import DoctorSignup from "./signup/DoctorSign/DoctorSignup";
import SelectHCFSignup from "./signup/HCFsignup/SelectHCFSignup";
import AdminMainDashboard from "./HCFModule/HCFDashboard/AdminDashboard/AdminDashboard";
const LazyAdminNotification = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminDashboard/Notifications/HCFAdminNotification"),
);
import AdminDoctor from "./HCFModule/HCFAdmin/AdminDoctor/AdminDoctor";
const LazyAdminAllDoctors = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminDoctor/AllDoctors/AllDoctor"),
);
const LazyAdminActive = lazy(() => import("./HCFModule/HCFAdmin/AdminDoctor/Active/Active"));
import HCFBlocked from "./HCFModule/HCFAdmin/AdminDoctor/Blocked/Blocked";
import HCFAddDoctors from "./HCFModule/HCFAdmin/AdminDoctor/AddDoctor/AddDoctor";
import HCFAddPackage from "./HCFModule/HCFAdmin/AdminDoctor/AddPackage/AddPackage";
import AdminDiagnosticCenter from "./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminDiagnosticCenter";
const LazyAdminLabs = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminLabs/AdminLabs"),
);
const LazyAdminStaff = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminStaff/AdminStaff"),
);
const LazyAdminBlocked = lazy(() =>
    import("./HCFModule/HCFAdmin/AdminDiagnosticCenter/AdminBlocked/AdminBlocked"),
);
import AdminManage from "./HCFModule/HCFAdmin/AdminManage/AdminManage";
// import AdminManageStaff from "./HCFModule/HCFAdmin/AdminManage/AdminManageStaff/AdminManageStaff";
import AdminManageAuditLog from "./HCFModule/HCFAdmin/AdminManage/AdminManageAuditLog/AdminManageAuditLog";
import DiagnostSignUp from "./signup/HCFsignup/DiagnostSignup/DiagnosticSignup";
import ClinicSignUp from "./signup/HCFsignup/ClinicSignup/ClinicSignUp";
import AdminSignUp from "./signup/HCFsignup/AdminSignup/AdminSignup";
const LazyDoctorListingDetails = lazy(() =>
    import("./DoctorModule/DoctorListing/CreateNewListing/ListingDetails/ListingDetails"),
);

const LazyDoctorAddPlans = lazy(() =>
    import("./DoctorModule/DoctorListing/CreateNewListing/AddPlan/AddPlan"),
);

const LazyDoctorAddQuestioner = lazy(() =>
    import("./DoctorModule/DoctorListing/CreateNewListing/AddQuestioner/AddQuestioner"),
);
import TermsAndCondition from "./DoctorModule/DoctorListing/CreateNewListing/TermsAndCondition/TermsAndCondition";
import DoctorPersonalInfo from "./DoctorModule/DoctorProfile/DoctorProfileInfo/DoctorPersonalInfo";
import DoctorProssionalInfo from "./DoctorModule/DoctorProfile/DoctorProfessionalInfo/DoctorProfessionalInfo";
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
import DiagnosticCenterReports from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticCenterReports";
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
import DiagnosticPatientChats from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticCenterChat/DiagnostCenterChats";
import DiagnosticCenterCharts from "./HCFModule/DiagnosticCenter/DiagnosticCenterReports/DiagnosticCenterCharts/DiagnosticCenterCharts";
const LazyDiagnosticSalesActivities = lazy(() =>
    import(
        "./HCFModule/DiagnosticCenter/DiagnosticManage/DiagnostcCenterStaff/DiagnosticSalesActivities"
    ),
);
import BookingHistory from "./Dashboard/PatientManage/BookingHistory/BookingHistory";
import Transactions from "./Dashboard/PatientManage/Transactions/Transactions";
import Reports from "./Dashboard/PatientManage/Reports/Reports";
import AllFiles from "./Dashboard/PatientManage/Reports/AllFiles/AllFiles";
import Examined from "./Dashboard/PatientManage/Reports/examined/Examined";
import Subscriptions from "./Dashboard/PatientManage/Subscription/Subscription";
import VideoCall from "./DoctorModule/DoctorAppointmentDashboard/DoctorChat/VideoCall";
const LazyDoctorChat = lazy(() =>
    import("./DoctorModule/DoctorAppointmentDashboard/DoctorChat/DoctorChat"),
);
import VoiceCall from "./DoctorModule/DoctorAppointmentDashboard/DoctorChat/VoiceCall";
import HCFDetailedCard from "./pages/PatientModule/PatientHCF/DrDetailsCard/HCFDetailedCard";
import SuperAdminBody from "./SuperAdmin/SuperAdminBody/SuperAdminBody";

const NotFound = lazy(() => import("./components/NotFound"));
const DevEnv = process.env.NODE_ENV === "development";
export const AppRouter = () => (
    <UserProvider>
        <Suspense fallback={<PageLoader text="Please wait while we load your application" />}>
            <Routes>
                {DevEnv && (
                    <>
                        <Route path="/usage" element={<Usage />} />
                        <Route path="/selectprofiletype" element={<SelectProfileType />} />
                        <Route path="/selecthcfprofiletype" element={<SelectHCFprofiletype />} />
                        <Route path="/hcfsignup" element={<SignUpHcf />}></Route>
                        <Route path="/patientlogin" element={<Patientlogin />} />

                        <Route path="/" element={<Home />} />
                        {/*------ signup routes start------ */}
                        <Route path="/selectsignup" element={<SelectSignup />}></Route>
                        <Route path="/doctorsignup" element={<DoctorSignup />}></Route>
                        <Route path="/selecthcfsignup" element={<SelectHCFSignup />}></Route>
                        <Route path="/diagnostcentersignup" element={<DiagnostSignUp />}></Route>
                        <Route path="/diagnostclinicsignup" element={<ClinicSignUp />}></Route>
                        <Route path="/hcfadminsignup" element={<AdminSignUp />}></Route>
                        {/*------ signup routes ends------ */}
                        <Route path="/patientforgotpassword" element={<Patientforgotpassword />} />
                        <Route
                            path="/patientforgotpassword2"
                            element={<Patientforgotpassword2 />}
                        />
                        <Route
                            path="/patientforgotpassword3"
                            element={<Patientforgotpassword3 />}
                        />
                        <Route path="/patientloginwithotp" element={<Patientloginwithotp />} />
                        <Route path="/patientloginwithotp2" element={<Patientloginwithotp2 />} />
                        <Route path="/patientsignup" element={<Patientsignup />} />
                        <Route
                            path="/patientcompleteprofile"
                            element={<PatientCompleteProfile />}
                        ></Route>
                        <Route path="/patientverification" element={<Patientverification />} />
                        <Route
                            path="/patientpersonalinformation"
                            element={<Patientpersonalinformation />}
                        />
                        <Route
                            path="/patientcontactinformation"
                            element={<Patientcontactinformation />}
                        />
                        <Route
                            path="/patientpaymentinformation"
                            element={<Patientpaymentinformation />}
                        />
                        {/* --------------------------- Patient Dashboard Routes starts-------------------------------------- */}
                        <Route
                            path="/patientdashboard"
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
                                        <React.Suspense
                                            fallback={<h1>put your loader here....</h1>}
                                        >
                                            <LazyPatientMyActivity>
                                                <Route
                                                    path="received"
                                                    element={<Received />}
                                                ></Route>
                                                <Route path="shared" element={<Shared />}></Route>
                                            </LazyPatientMyActivity>
                                        </React.Suspense>
                                    }
                                ></Route>
                                {/* <Route key={2} path="explore" element={<Explore />} /> */}

                                <Route
                                    path="explore"
                                    element={
                                        <React.Suspense fallback={<h1>Put loader here...</h1>}>
                                            <LazyPatientExplore></LazyPatientExplore>
                                        </React.Suspense>
                                    }
                                ></Route>

                                <Route
                                    path="myactivity"
                                    element={
                                        <React.Suspense fallback={<h1>Put loader here...</h1>}>
                                            <LazyPatientMyActivity>
                                                <Route
                                                    path="received"
                                                    element={<Received />}
                                                ></Route>
                                                <Route path="shared" element={<Shared />}></Route>
                                            </LazyPatientMyActivity>
                                        </React.Suspense>
                                    }
                                ></Route>
                                {/* 
                                <Route key={2} path="myactivity" element={<MyActivity />}>
                                    <Route path="received" element={<Received />}></Route>
                                    <Route path="shared" element={<Shared />}></Route>
                                </Route> */}
                                <Route path={"profile"} element={<Profile />}></Route>
                                <Route path={"payment"} element={<Payment />}></Route>
                                <Route path={"contact"} element={<Contact />}></Route>
                                <Route path={"patienthcf"} element={<HCFDetailedCard />}></Route>
                            </Route>

                            <Route path="appointment" element={<AppointmentDashboard />}>
                                <Route path="upcoming" element={<Upcoming />}></Route>
                                <Route path="completed" element={<Completed />}></Route>
                                <Route path="cancelled" element={<Cancelled />}></Route>
                                <Route path="chats" element={<Chats />}></Route>
                            </Route>

                            <Route path="manage" element={<ManageDashboard />}>
                                {/* <Route path="bookinghistory" element={<HCFDetailedCard/>}></Route> */}
                                <Route path="bookinghistory" element={<BookingHistory />}></Route>
                                <Route path="transactions" element={<Transactions />}></Route>
                                <Route path="reports" element={<Reports />}>
                                    <Route path="request" element={<AllFiles />}></Route>
                                    <Route path="examined" element={<Examined />}></Route>
                                    <Route path="received" element={<Received />}></Route>
                                    <Route path="shared" element={<Shared />}></Route>
                                </Route>
                                <Route path="subscriptions" element={<Subscriptions />}></Route>
                            </Route>

                            {/* ------------------ Dashboard Route Ends ------------------------- */}

                            <Route
                                path="/patientdashboard/drdetailscard/:resID"
                                element={<DrDetailsCard />}
                            ></Route>
                        </Route>

                        {/* ---------------------------------- Patient Appointment Routes Ends---------------------------------------- */}

                        {/* --------------------Doctor routes Starts------------------------------ */}
                        <Route path="/doctorlogin" element={<DoctorLogin />} />
                        <Route
                            path="doctordashboard/doctorAppointment/chats/videocall"
                            element={<VideoCall />}
                        ></Route>

                        <Route
                            path="/doctordashboard"
                            element={
                                // <DoctorAuthentication>
                                <DoctorDashboard />
                                // </DoctorAuthentication>
                            }
                        >
                            {/* /doctor/request */}
                            {/* /request */}
                            <Route
                                path="doctorpersonalinfo"
                                element={<DoctorPersonalInfo />}
                            ></Route>
                            <Route
                                path="doctorprofessionalinfo"
                                element={<DoctorProssionalInfo />}
                            ></Route>

                            <Route
                                path="request"
                                element={
                                    <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                        <LazyDoctorrequest />
                                    </React.Suspense>
                                }
                            ></Route>
                            <Route
                                path="notification"
                                element={
                                    <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                        <LazyDoctorNotification />
                                    </React.Suspense>
                                }
                            ></Route>
                            <Route
                                path="doctorAppointment"
                                element={<DoctorAppointmentDashboard />}
                            >
                                <Route
                                    path="request"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorRequest />
                                        </React.Suspense>
                                    }
                                ></Route>

                                <Route
                                    path="upcoming"
                                    element={
                                        <React.Suspense fallback={<h1>wait for a while...</h1>}>
                                            <LazyDoctorUpcoming />
                                        </React.Suspense>
                                    }
                                ></Route>

                                <Route
                                    path="completed"
                                    element={
                                        <React.Suspense fallback={<h1>wait for a while...</h1>}>
                                            <LazyDoctorCompleted />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="cancelled"
                                    element={
                                        <React.Suspense fallback={<h1>wait for a while</h1>}>
                                            <LazyDoctorCancelled />
                                        </React.Suspense>
                                    }
                                ></Route>

                                <Route
                                    path="chats"
                                    element={
                                        <React.Suspense fallback={<h1>wait for a while</h1>}>
                                            <LazyDoctorChat />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route path="chats/voicecall" element={<VoiceCall />}></Route>
                            </Route>
                            {/* /doctor/listing */}
                            <Route path="doctorListing" element={<DoctorListing />}>
                                <Route
                                    path="doctoractiveListing"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorActiveListing />
                                        </React.Suspense>
                                    }
                                ></Route>
                                {/* Create listing start------- */}
                                <Route
                                    path="listingdetails"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorListingDetails />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="addplans"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorAddPlans />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="addquestioner"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorAddQuestioner />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="termandcondition"
                                    element={<TermsAndCondition />}
                                ></Route>
                                {/* Create listing ends------- */}
                                {/* Edit listing starts-------- */}
                                <Route
                                    path="editlistingdetails"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorListingDetails />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="editaddplans"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorAddPlans />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="editaddquestioner"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorAddQuestioner />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="edittermandcondition"
                                    element={<TermsAndCondition />}
                                ></Route>
                                {/* Edit listing ends-------- */}
                                <Route
                                    path="doctorsavedInDraft"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorSavedDraft />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>

                            <Route path="doctorStatistics" element={<DoctorStatistics />}>
                                <Route
                                    path="doctorBookingHistory"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorBookingHistory />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="doctorTransaction"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorTransaction />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="doctorOverview"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorOverview />
                                        </React.Suspense>
                                    }
                                ></Route>

                                <Route
                                    path="doctorPayout"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorPayout />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>

                            <Route path="doctorManage" element={<DoctorManage />}>
                                <Route
                                    path="doctorStaff"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorStaff />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="doctorAuditLog"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDoctorAuditLog />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>
                        </Route>

                        {/*------------------------------Doctor Routes Ends------------------------------- */}

                        {/* ------------------------------HCF Route Starts------------------------------------ */}

                        <Route path="/hcflogin" element={<Hcflogin />} />
                        {/* -------------------Clinic Route Starts--------------------- */}
                        <Route path="/diagnostcliniclogin" element={<ClinicLogin />} />
                        <Route path="/clinicDashboard" element={<ClinicMainDashboard />}>
                            <Route path="clinicbodydashboard" element={<ClinicDashboard />}>
                                <Route
                                    path="clinirequests"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyClinicRequests />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="clinicnotification"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyClinicNotification />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>
                            <Route path="clinicmyappointment" element={<ClinicMyAppointments />}>
                                <Route
                                    path="clinicrequest"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyClinicAppointmentRequest />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="clinicupcoming"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyClinicUpcoming />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="cliniccompleted"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyClinicCompleted />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="cliniccancelled"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyClinicCancelled />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="clinicchats"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyClinicChats />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>
                            <Route path="clinicprofile" element={<ClinicProfile />}>
                                <Route
                                    path="profileinformation"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyClinicProfileInformation />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>
                            <Route path="clinicmanage" element={<ClinicManage />}>
                                <Route
                                    path="clinicsalesactivities"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyClinicSalesActivities />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="clinicauditlog"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyClinicAuditLog />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>
                        </Route>

                        {/* -------------------Clinic Route Ends--------------------- */}

                        {/* -------------Diagnost Center  Starts------------------ */}

                        <Route path="/diagnostcenterlogin" element={<DiagnosticLogin />} />
                        <Route
                            path="/diagnostCenterDashboard"
                            element={<DiagnosticCenterDashboard />}
                        >
                            <Route
                                path="notification"
                                element={
                                    <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                        <LazyDiagnosticNotification />
                                    </React.Suspense>
                                }
                            ></Route>
                            <Route
                                path="dignosticCenterReports"
                                element={<DiagnosticCenterReports />}
                            >
                                <Route
                                    path="request"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDiagnosticPatientSearch />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="examination"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDiagnosticPatientShared />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route path="report" element={<DiagnosticPatientChats />}></Route>
                                <Route path="Chart" element={<DiagnosticCenterCharts />}></Route>
                            </Route>
                            <Route
                                path="diagnostcenterprofile"
                                element={<DiagnosticCenterProfile />}
                            >
                                <Route
                                    path="diagnostcenterprofileinfo"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDiagnosticProfileInformation />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>
                            <Route
                                path="dignosticCentermanage"
                                element={<DiagnosticCenterManage />}
                            >
                                <Route
                                    path="diagnostsalesactivities"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDiagnosticSalesActivities />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="diagnostcenterauditlog"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while ....</h1>}>
                                            <LazyDiagnosticAuditLogs />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>
                        </Route>
                        {/* -----------Diagnost Center  Ends---------------------- */}

                        {/* -------------HCF Routes Starts------------------ */}

                        <Route path="/hcfadmin" element={<AdminMainDashboard />}>
                            <Route
                                path="notification"
                                element={
                                    <React.Suspense fallback={<h1>Wait for a while</h1>}>
                                        <LazyAdminNotification />
                                    </React.Suspense>
                                }
                            ></Route>
                            <Route path="doctor" element={<AdminDoctor />}>
                                <Route
                                    path="alldoctors"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while</h1>}>
                                            <LazyAdminAllDoctors />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="active"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while</h1>}>
                                            <LazyAdminActive />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="blocked"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while</h1>}>
                                            <LazyAdminBlocked />
                                        </React.Suspense>
                                    }
                                ></Route>

                                <Route path="adddoctor" element={<HCFAddDoctors />}></Route>
                                <Route path="addpackage" element={<HCFAddPackage />}></Route>
                            </Route>
                            {/* hcfadmin/diagnosticcenter/blocked */}
                            <Route path="diagnosticcenter" element={<AdminDiagnosticCenter />}>
                                <Route
                                    path="labs"
                                    element={
                                        <React.Suspense fallback={<h1>wait for a while</h1>}>
                                            <LazyAdminLabs />
                                        </React.Suspense>
                                    }
                                ></Route>

                                <Route
                                    path="staff"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while</h1>}>
                                            <LazyAdminStaff />
                                        </React.Suspense>
                                    }
                                ></Route>

                                <Route
                                    path="blocked"
                                    element={
                                        <React.Suspense fallback={<h1>Wait for a while</h1>}>
                                            <LazyAdminBlocked />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>
                            <Route path="hcfadminmanage" element={<AdminManage />}>
                                <Route
                                    path="hcfadminsale"
                                    element={
                                        <React.Suspense fallback={<h1>wait for a while</h1>}>
                                            <LazyAdminSalesActivities />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="hcfadminoverview"
                                    element={
                                        <React.Suspense fallback={<h1>wait for a while</h1>}>
                                            <LazyAdminOverview />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="hcfadminbooking"
                                    element={
                                        <React.Suspense fallback={<h1>wait for a while</h1>}>
                                            <LazyAdminBooking />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="hcfadminpayout"
                                    element={
                                        <React.Suspense fallback={<h1>wait for a while</h1>}>
                                            <LazyAdminPayout />
                                        </React.Suspense>
                                    }
                                ></Route>
                                <Route
                                    path="hcfadminauditlog"
                                    element={
                                        <React.Suspense fallback={<h1>wait for a while</h1>}>
                                            <LazyAdminPayout />
                                        </React.Suspense>
                                    }
                                ></Route>
                            </Route>

                            <Route
                                path="/hcfadmin/diagnosticcenter/labs/:labID"
                                element={<DiagnostLabs />}
                            ></Route>
                        </Route>

                        {/* -------------HCF Routes Ends------------------ */}

                        {/* ------------- Super Admin Starts----------- */}
                        <Route path="superadmin" element={<SuperAdminBody/>} >
                            
                        </Route>
                        {/* --------S----uper Admin Ends ------------- */}

                        {/* -------------------------------HCF Route Ends---------------------------------------- */}
                    </>
                )}
                <Route element={NotFound} />
            </Routes>
        </Suspense>
    </UserProvider>
);
