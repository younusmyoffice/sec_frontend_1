/**
 * Payment Service - API calls for payment-related operations
 */

import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export class PaymentService {
  // Generate Token
  static async generateToken() {
    const response = await axiosInstance.get(API_ENDPOINTS.PAYMENT.GENERATE_TOKEN);
    return response.data;
  }

  // Get Doctor Balance
  static async getDoctorBalance(doctorId) {
    const response = await axiosInstance.get(
      API_ENDPOINTS.PAYMENT.DOCTOR_BALANCE,
      { params: { doctor_id: doctorId } }
    );
    return response.data;
  }

  // Get Payouts
  static async getPayouts(doctorId, limit = 50, offset = 0) {
    const response = await axiosInstance.get(
      API_ENDPOINTS.PAYMENT.PAYOUTS,
      { params: { doctor_id: doctorId, limit, offset } }
    );
    return response.data;
  }

  // Request Payout
  static async requestPayout(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PAYMENT.PAYOUT,
      data
    );
    return response.data;
  }
}

export default PaymentService;
