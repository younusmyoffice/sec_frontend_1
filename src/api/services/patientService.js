/**
 * Patient Service - API calls for patient-related operations
 */

import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS, getEndpointWithParams } from '../endpoints';

export class PatientService {
  // Dashboard & Explore
  static async getDashboardDoctorDetails() {
    const response = await axiosInstance.get(API_ENDPOINTS.PATIENT.DASHBOARD_DOCTOR_DETAIL);
    return response.data;
  }

  static async getDoctorsNearMe(locationData) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.DOCTOR_NEAR_ME,
      JSON.stringify(locationData)
    );
    return response.data;
  }

  static async getPopularDoctors(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.POPULAR_DOCTORS,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async getFeaturedDoctors(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.FEATURED_DOCTORS,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async getDashboardHCFDetails() {
    const response = await axiosInstance.get(API_ENDPOINTS.PATIENT.DASHBOARD_HCF_DETAILS);
    return response.data;
  }

  static async getDoctorDepartments() {
    const response = await axiosInstance.get(API_ENDPOINTS.PATIENT.DOCTOR_DEPARTMENTS);
    return response.data;
  }

  static async getDoctorsByDepartment(specialist, limit = 3) {
    const endpoint = getEndpointWithParams('PATIENT', 'DOCTORS_BY_DEPT', { specialist, limit });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  // Doctor Details
  static async getDoctorDetailsById(suid) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.DOCTOR_DETAILS_BY_ID,
      JSON.stringify({ suid })
    );
    return response.data;
  }

  // Appointments
  static async getAppointmentSlots(timeslotData) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.GET_APPOINTMENT_SLOTS,
      timeslotData
    );
    return response.data;
  }

  static async createAppointment(appointmentPayload) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.CREATE_APPOINTMENT,
      JSON.stringify(appointmentPayload)
    );
    return response.data;
  }

  static async createAppointmentHCFDoctor(appointmentPayload) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.CREATE_APPOINTMENT_HCF_DOCTOR,
      JSON.stringify(appointmentPayload)
    );
    return response.data;
  }

  static async getAvailableAppointmentDates(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.GET_AVAILABLE_APPOINTMENT_DATES,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async createAppointmentPackageSelect(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.CREATE_APPOINTMENT_PACKAGE_SELECT,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async createAppointmentPackageQuestion(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.CREATE_APPOINTMENT_PACKAGE_QUESTION,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async getUpcomingAppointments(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.UPCOMING_APPOINTMENTS,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async rejectAppointment(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.REJECT_APPOINTMENT,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async getCancelledAppointments(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.CANCELLED_APPOINTMENTS,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async getCompletedAppointments(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.COMPLETED_APPOINTMENTS,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async leaveReview(payload) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.LEAVE_REVIEW,
      payload
    );
    return response.data;
  }

  // Profile Management
  static async getPatientProfile() {
    const response = await axiosInstance.get(API_ENDPOINTS.PATIENT.PATIENT_PROFILE);
    return response.data;
  }

  static async updatePatientProfile(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PATIENT.UPDATE_PATIENT_PROFILE,
      JSON.stringify(data)
    );
    return response.data;
  }

  // Socket Management
  static async putSocketId(data) {
    const response = await axiosInstance.put(
      API_ENDPOINTS.PATIENT.PUT_SOCKET_ID,
      data
    );
    return response.data;
  }
}

export default PatientService;
