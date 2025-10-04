/**
 * HCF (Healthcare Facility) Service - API calls for HCF-related operations
 */

import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export class HCFService {
  // Add Doctor
  static async addDoctor(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.HCF.ADD_DOCTOR,
      data
    );
    return response.data;
  }

  // Add Doctor Working Details and Plan
  static async addDoctorWorkingDetailsAndPlan(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.HCF.ADD_DOCTOR_WORKING_DETAILS_AND_PLAN,
      data
    );
    return response.data;
  }

  // Clinic Appointment Accept
  static async acceptClinicAppointment(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.HCF.CLINIC_APPOINTMENT_ACCEPT,
      JSON.stringify(data)
    );
    return response.data;
  }

  // Clinic Appointment Reject
  static async rejectClinicAppointment(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.HCF.CLINIC_APPOINTMENT_REJECT,
      JSON.stringify(data)
    );
    return response.data;
  }

  // Join Appointment Clinic
  static async joinAppointmentClinic(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.HCF.JOIN_APPOINTMENT_CLINIC,
      JSON.stringify(data)
    );
    return response.data;
  }

  // Get Lab Departments
  static async getLabDepartments() {
    const response = await axiosInstance.get(API_ENDPOINTS.HCF.LAB_DEPARTMENTS);
    return response.data;
  }
}

export default HCFService;
