// // Example of updated AppRouter.js using centralized routes
// import React, { Suspense, lazy } from "react";
// import { Routes, Route } from "react-router-dom";
// import { ROUTES } from "./constants/routes";

// // Import all components (same as original)
// import { UserProvider } from "./loginComponent/UserProvider";
// import {
//     DoctorAuthentication,
//     HealthCareAuthentication,
//     PatientAuthentication,
//     ClinicAuthentication,
//     DiagnostAuthentication,
// } from "./loginComponent/RequireAuthentication";

// // ... (all other imports remain the same)

// export const AppRouter = () => (
//     <UserProvider>
//         <Routes>
//             {/* Landing Pages */}
//             <Route path={ROUTES.HOME} element={<Homes />} />
//             <Route path={ROUTES.HOW_IT_WORKS} element={<HowItWorks />} />
//             <Route path={ROUTES.ABOUT_LANDING} element={<AboutLanding />} />
//             <Route path={ROUTES.USAGE} element={<Usage />} />

//             {/* Authentication Routes */}
//             <Route path={ROUTES.SELECT_ROLE_LOGIN} element={<SelectRoleLogin />} />
//             <Route path={ROUTES.SELECT_HCF_PROFILE_TYPE} element={<HCFRoleType />} />
//             <Route path={ROUTES.PATIENT_LOGIN} element={<PatientLogin />} />
//             <Route path={ROUTES.HCF_ADMIN_LOGIN} element={<HcfAdminLogin />} />
//             <Route path={ROUTES.SUPER_ADMIN_LOGIN} element={<SuperAdminLogin />} />

//             {/* Signup Routes */}
//             <Route path={ROUTES.SELECT_ROLE_SIGNUP} element={<SelectRoleSignup />} />
//             <Route path={ROUTES.DOCTOR_SIGNUP} element={<DoctorSignup />} />
//             <Route path={ROUTES.SELECT_HCF_SIGNUP} element={<SelectHCFSignup />} />
//             <Route path={ROUTES.DIAGNOST_CENTER_SIGNUP} element={<DiagnostSignUp />} />
//             <Route path={ROUTES.DIAGNOST_CLINIC_SIGNUP} element={<ClinicSignUp />} />
//             <Route path={ROUTES.HCF_ADMIN_SIGNUP} element={<AdminSignUp />} />

//             {/* Password Management */}
//             <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
//             <Route path={ROUTES.FORGOT_PASSWORD_OTP} element={<ForgotPasswordOTP />} />
//             <Route path={ROUTES.FORGOT_PASSWORD_CHANGE} element={<ForgotPasswordChange />} />

//             {/* OTP & Verification */}
//             <Route path={ROUTES.LOGIN_WITH_OTP} element={<LoginWithOtp />} />
//             <Route path={ROUTES.LOGIN_WITH_OTP_VERIFY} element={<LoginWithOtpVerify />} />
//             <Route path={ROUTES.EMAIL_VERIFICATION} element={<EmailVerification />} />

//             {/* Patient Profile Completion */}
//             <Route path={ROUTES.PATIENT_COMPLETE_PROFILE} element={<PatientCompleteProfile />} />
//             <Route path={ROUTES.PATIENT_PERSONAL_INFORMATION} element={<PatientPersonalInformation />} />
//             <Route path={ROUTES.PATIENT_CONTACT_INFORMATION} element={<PatientContactInformation />} />
//             <Route path={ROUTES.PATIENT_PAYMENT_INFORMATION} element={<PatientPaymentInformation />} />

//             {/* Doctor Profile Completion */}
//             <Route path={ROUTES.CLINIC_DOCTOR_COMPLETE_PROFILE} element={<ClinicDoctorCompleteProfile />} />

//             {/* Patient Dashboard Routes */}
//             <Route
//                 path={ROUTES.PATIENT_DASHBOARD}
//                 element={
//                     <PatientAuthentication>
//                         <BodyDashboard />
//                     </PatientAuthentication>
//                 }
//             >
//                 {/* Dashboard Sub-routes */}
//                 <Route path="dashboard" element={<MainDashboard />}>
//                     <Route path="dashboard" element={
//                         <PatientAuthentication>
//                             <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
//                                 <LazyPatientMyActivity>
//                                     <Route path="received" element={<Received />} />
//                                     <Route path="shared" element={<Shared />} />
//                                 </LazyPatientMyActivity>
//                             </React.Suspense>
//                         </PatientAuthentication>
//                     } />

//                     <Route path="explore" element={
//                         <PatientAuthentication>
//                             <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
//                                 <LazyPatientExplore />
//                             </React.Suspense>
//                         </PatientAuthentication>
//                     } />

//                     <Route path="myactivity" element={
//                         <PatientAuthentication>
//                             <React.Suspense fallback={<Skeleton variant="rectangular" width="100%" height={900} />}>
//                                 <LazyPatientMyActivity />
//                             </React.Suspense>
//                         </PatientAuthentication>
//                     }>
//                         <Route path="received" element={<PatientAuthentication><Received /></PatientAuthentication>} />
//                         <Route path="shared" element={<PatientAuthentication><Shared /></PatientAuthentication>} />
//                     </Route>

//                     <Route path="profile" element={<PatientAuthentication><Profile /></PatientAuthentication>} />
//                     <Route path="payment" element={<PatientAuthentication><Payment /></PatientAuthentication>} />
//                     <Route path="contact" element={<PatientAuthentication><Contact /></PatientAuthentication>} />
//                     <Route path="patienthcf" element={<PatientAuthentication><HCFDetailedCard /></PatientAuthentication>} />
//                 </Route>

//                 {/* Appointment Routes */}
//                 <Route path="appointment" element={<PatientAuthentication><AppointmentDashboard /></PatientAuthentication>}>
//                     <Route path="upcoming" element={<PatientAuthentication><Upcoming /></PatientAuthentication>} />
//                     <Route path="completed" element={<PatientAuthentication><Completed /></PatientAuthentication>} />
//                     <Route path="cancelled" element={<PatientAuthentication><Cancelled /></PatientAuthentication>} />
//                     <Route path="chats/:user/:roomID/:appointment_id" element={<PatientAuthentication><Home socket={socket} /></PatientAuthentication>} />
//                     <Route path="chats/:roomID/:appointment_id" element={<PatientAuthentication><ChatPage socket={socket} /></PatientAuthentication>} />
//                     <Route path="profile" element={<PatientAuthentication><Profile /></PatientAuthentication>} />
//                     <Route path="payment" element={<PatientAuthentication><Payment /></PatientAuthentication>} />
//                     <Route path="contact" element={<PatientAuthentication><Contact /></PatientAuthentication>} />
//                 </Route>

//                 {/* Manage Routes */}
//                 <Route path="manage" element={<PatientAuthentication><ManageDashboard /></PatientAuthentication>}>
//                     <Route path="bookinghistory" element={<PatientAuthentication><BookingHistory /></PatientAuthentication>} />
//                     <Route path="transactions" element={<PatientAuthentication><Transactions /></PatientAuthentication>} />
//                     <Route path="reports" element={<PatientAuthentication><Reports /></PatientAuthentication>}>
//                         <Route path="request" element={<PatientAuthentication><AllFiles /></PatientAuthentication>} />
//                         <Route path="examined" element={<PatientAuthentication><Examined /></PatientAuthentication>} />
//                         <Route path="received" element={<PatientAuthentication><Received /></PatientAuthentication>} />
//                         <Route path="shared" element={<PatientAuthentication><Shared /></PatientAuthentication>} />
//                     </Route>
//                     <Route path="subscriptions" element={<PatientAuthentication><Subscriptions /></PatientAuthentication>} />
//                     <Route path="profile" element={<PatientAuthentication><Profile /></PatientAuthentication>} />
//                     <Route path="payment" element={<PatientAuthentication><Payment /></PatientAuthentication>} />
//                     <Route path="contact" element={<PatientAuthentication><Contact /></PatientAuthentication>} />
//                 </Route>

//                 {/* Doctor Details Routes */}
//                 <Route path="/patientDashboard/drDetailsCard/:resID" element={<PatientAuthentication><DrDetailsCard /></PatientAuthentication>} />
//                 <Route path="/patientDashboard/hcfDetailCard/hcfDoctor/:hcddocid/:reshcfID" element={<PatientAuthentication><HcfDrDetailsCard /></PatientAuthentication>} />
//                 <Route path="/patientDashboard/hcfDetailCard/:hcfID" element={<PatientAuthentication><HCFDetailedCard /></PatientAuthentication>}>
//                     <Route path="about" element={<PatientAuthentication><About /></PatientAuthentication>} />
//                     <Route path="department" element={<PatientAuthentication><Department /></PatientAuthentication>} />
//                     <Route path="labs" element={<PatientAuthentication><Labs /></PatientAuthentication>} />
//                 </Route>
//             </Route>

//             {/* Doctor Dashboard Routes */}
//             <Route path={ROUTES.DOCTOR_DASHBOARD} element={<DoctorAuthentication><DoctorMainDashboard /></DoctorAuthentication>}>
//                 {/* Doctor Dashboard Sub-routes */}
//                 <Route path="doctorMainDashboard" element={<DoctorAuthentication><DoctorMainDashboard /></DoctorAuthentication>}>
//                     <Route path="request" element={<DoctorAuthentication><LazyDoctorrequest /></DoctorAuthentication>} />
//                     <Route path="notification" element={<DoctorAuthentication><LazyDoctorNotification /></DoctorAuthentication>} />
//                 </Route>

//                 {/* Doctor Appointment Routes */}
//                 <Route path="doctorAppointment" element={<DoctorAuthentication><DoctorAppointmentDashboard /></DoctorAuthentication>}>
//                     <Route path="request" element={<DoctorAuthentication><DoctorRequest /></DoctorAuthentication>} />
//                     <Route path="upcoming" element={<DoctorAuthentication><DoctorUpcoming /></DoctorAuthentication>} />
//                     <Route path="completed" element={<DoctorAuthentication><DoctorCompleted /></DoctorAuthentication>} />
//                     <Route path="cancelled" element={<DoctorAuthentication><DoctorCancelled /></DoctorAuthentication>} />
//                     <Route path="chats" element={<DoctorAuthentication><DoctorChat /></DoctorAuthentication>} />
//                     <Route path="chats/videoCall" element={<DoctorAuthentication><VideoCall /></DoctorAuthentication>} />
//                     <Route path="chats/voiceCall" element={<DoctorAuthentication><VoiceCall /></DoctorAuthentication>} />
//                 </Route>

//                 {/* Doctor Listing Routes */}
//                 <Route path="doctorListing" element={<DoctorAuthentication><DoctorListing /></DoctorAuthentication>}>
//                     <Route path="doctorListingDetails" element={<DoctorAuthentication><DoctorListingDetails /></DoctorAuthentication>} />
//                     <Route path="createNewListing" element={<DoctorAuthentication><CreateNewListing /></DoctorAuthentication>} />
//                     <Route path="doctorActiveListing" element={<DoctorAuthentication><DoctorActiveLising /></DoctorAuthentication>} />
//                     <Route path="doctorSavedDraft" element={<DoctorAuthentication><DoctorSavedDraft /></DoctorAuthentication>} />
//                 </Route>

//                 {/* Doctor Manage Routes */}
//                 <Route path="doctorManage" element={<DoctorAuthentication><DoctorManage /></DoctorAuthentication>}>
//                     <Route path="profile" element={<DoctorAuthentication><DoctorProfile /></DoctorAuthentication>} />
//                     <Route path="doctorStaff" element={<DoctorAuthentication><LazyDoctorStaff /></DoctorAuthentication>} />
//                     <Route path="doctorAuditLog" element={<DoctorAuthentication><DoctorAuditLog /></DoctorAuthentication>} />
//                 </Route>

//                 {/* Doctor Statistics Routes */}
//                 <Route path="doctorStatistics" element={<DoctorAuthentication><DoctorStatistics /></DoctorAuthentication>}>
//                     <Route path="doctorOverview" element={<DoctorAuthentication><DoctorOverview /></DoctorAuthentication>} />
//                     <Route path="doctorBookingHistory" element={<DoctorAuthentication><DoctorBookingHistory /></DoctorAuthentication>} />
//                     <Route path="doctorTransactions" element={<DoctorAuthentication><DoctorTransaction /></DoctorAuthentication>} />
//                     <Route path="doctorPayout" element={<DoctorAuthentication><DoctorPayout /></DoctorAuthentication>} />
//                 </Route>
//             </Route>

//             {/* HCF Admin Routes */}
//             <Route path={ROUTES.HCF_ADMIN} element={<AdminMainDashboard />}>
//                 {/* HCF Admin Sub-routes */}
//                 <Route path="hcfMainDashboard" element={<HCFMainDashboard />} />
//                 <Route path="hcfDoctor" element={<HCFDoctor />}>
//                     <Route path="addDoctor" element={<HCFAddDoctor />} />
//                     <Route path="doctorListing" element={<HCFDoctorListing />} />
//                     <Route path="doctorStaff" element={<HCFDoctorStaff />} />
//                     <Route path="doctorAuditLog" element={<HCFDoctorAuditLog />} />
//                 </Route>
//                 <Route path="diagnosticCenter" element={<DiagnosticCenter />}>
//                     <Route path="labs" element={<DiagnosticCenterLabs />} />
//                     <Route path="labs/:labId" element={<AdminLabDetail />} />
//                     <Route path="reports" element={<DiagnosticCenterReports />} />
//                     <Route path="charts" element={<DiagnosticCenterCharts />} />
//                     <Route path="chats" element={<DiagnosticPatientChats />} />
//                 </Route>
//             </Route>

//             {/* Super Admin Routes */}
//             <Route path={ROUTES.SUPER_ADMIN} element={<SuperAdminMainDashboard />}>
//                 <Route path="superAdminMainDashboard" element={<SuperAdminMainDashboard />} />
//                 <Route path="superAdminUsers" element={<SuperAdminUsers />} />
//                 <Route path="superAdminTransaction" element={<SuperAdminTransaction />}>
//                     <Route path="transactionDoctor" element={<SuperAdminTranDoctor />} />
//                     <Route path="transactionHCF" element={<SuperAdminTranHCF />} />
//                 </Route>
//             </Route>

//             {/* Clinic Dashboard Routes */}
//             <Route path={ROUTES.CLINIC_DASHBOARD} element={<ClinicAuthentication><ClinicMainDashboard /></ClinicAuthentication>}>
//                 <Route path="clinicMainDashboard" element={<ClinicAuthentication><ClinicMainDashboard /></ClinicAuthentication>} />
//                 <Route path="clinicAppointment" element={<ClinicAuthentication><ClinicAppointment /></ClinicAuthentication>} />
//                 <Route path="clinicDoctor" element={<ClinicAuthentication><ClinicDoctor /></ClinicAuthentication>} />
//                 <Route path="clinicStaff" element={<ClinicAuthentication><ClinicStaff /></ClinicAuthentication>} />
//                 <Route path="clinicReports" element={<ClinicAuthentication><ClinicReports /></ClinicAuthentication>} />
//             </Route>

//             {/* Diagnostic Center Dashboard Routes */}
//             <Route path={ROUTES.DIAGNOST_CENTER_DASHBOARD} element={<DiagnostAuthentication><DiagnostCenterMainDashboard /></DiagnostAuthentication>}>
//                 <Route path="diagnostCenterMainDashboard" element={<DiagnostAuthentication><DiagnostCenterMainDashboard /></DiagnostAuthentication>} />
//                 <Route path="diagnostCenterAppointment" element={<DiagnostAuthentication><DiagnostCenterAppointment /></DiagnostAuthentication>} />
//                 <Route path="diagnostCenterDoctor" element={<DiagnostAuthentication><DiagnostCenterDoctor /></DiagnostAuthentication>} />
//                 <Route path="diagnostCenterStaff" element={<DiagnostAuthentication><DiagnostCenterStaff /></DiagnostAuthentication>} />
//                 <Route path="diagnostCenterReports" element={<DiagnostAuthentication><DiagnostCenterReports /></DiagnostAuthentication>} />
//             </Route>

//             {/* Video Calling Routes */}
//             <Route path={ROUTES.VIDEO_CALLING_SDK} element={<VideoCallingSDK />} />
//             <Route path={ROUTES.CHAT_ROOM} element={<ChatRoom />} />

//             {/* 404 Route */}
//             <Route path="*" element={<NotFound />} />
//         </Routes>
//     </UserProvider>
// );

// export default AppRouter;
