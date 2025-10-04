/**
 * Doctor Service - API calls for doctor-related operations
 */

import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS, getEndpointWithParams } from '../endpoints';

export class DoctorService {
  // Dashboard & Statistics
  static async getDashboardCount(doctorId, status) {
    const endpoint = getEndpointWithParams('DOCTOR', 'DASHBOARD_COUNT', { doctorId, status });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async getDashboardAppInProgress(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'DASHBOARD_APP_IN_PROGRESS', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async getDashboardAppBooked(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'DASHBOARD_APP_BOOKED', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async getDashboardAppCompleted(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'DASHBOARD_APP_COMPLETED', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async getEarningCount(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'EARNING_COUNT', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async getAffiliateEarningCount(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'AFFILIATE_EARNING_COUNT', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async getTotalEarningCount(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'TOTAL_EARNING_COUNT', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async getAllEarningList(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'ALL_EARNING_LIST', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  // Appointments
  static async getAppointmentRequests(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'APPOINTMENT_REQUESTS', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async acceptAppointmentRequest(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DOCTOR.APPOINTMENT_REQUESTS_ACCEPT,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async rejectAppointmentRequest(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DOCTOR.APPOINTMENT_REQUESTS_REJECT,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async getUpcomingAppointments(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'UPCOMING_APPOINTMENTS', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async getCancelledAppointments(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'CANCELLED_APPOINTMENTS', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async getCompletedAppointments(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'COMPLETED_APPOINTMENTS', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  // Doctor Listing Management
  static async createUpdateListing(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DOCTOR.LISTING_CREATE_UPDATE,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async createPlan(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DOCTOR.PLAN_CREATE,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async getAllPlans(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DOCTOR.PLAN_ALL,
      data
    );
    return response.data;
  }

  static async updatePlan(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DOCTOR.PLAN_UPDATE,
      data
    );
    return response.data;
  }

  static async deletePlan(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DOCTOR.PLAN_DELETE,
      data
    );
    return response.data;
  }

  static async getPlanById(planId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'PLAN_BY_ID', { planId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async createQuestion(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DOCTOR.QUESTION_CREATE,
      JSON.stringify(data)
    );
    return response.data;
  }

  static async updateQuestion(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DOCTOR.QUESTION_UPDATE,
      data
    );
    return response.data;
  }

  static async deleteQuestion(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DOCTOR.QUESTION_DELETE,
      data
    );
    return response.data;
  }

  static async getAllQuestions(listingId, doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'QUESTION_ALL', { listingId, doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async getQuestionById(questionId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'QUESTION_BY_ID', { questionId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async createUpdateTerms(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DOCTOR.TERMS_CREATE_UPDATE,
      JSON.stringify(data)
    );
    return response.data;
  }

  // Doctor Management
  static async getListingPlanActive(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'LISTING_PLAN_ACTIVE', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async getListingPlanDeactive(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'LISTING_PLAN_DEACTIVE', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async deleteDocListingPlan(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DOCTOR.DELETE_DOC_LISTING_PLAN,
      data
    );
    return response.data;
  }

  static async toggleDocListingActiveDeactive(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DOCTOR.DOC_LISTING_ACTIVE_DEACTIVE,
      data
    );
    return response.data;
  }

  static async getAuditLogs(doctorId, params = {}) {
    const response = await axiosInstance.get(
      API_ENDPOINTS.DOCTOR.AUDIT_LOGS,
      { params: { doctor_id: doctorId, ...params } }
    );
    return response.data;
  }

  static async getAppointmentHistory(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'APPOINTMENT_HISTORY', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }

  static async getTransactions(doctorId) {
    const endpoint = getEndpointWithParams('DOCTOR', 'TRANSACTIONS', { doctorId });
    const response = await axiosInstance.get(endpoint);
    return response.data;
  }
}

export default DoctorService;
