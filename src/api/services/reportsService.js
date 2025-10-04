/**
 * Reports Service - API calls for reports and file operations
 */

import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export class ReportsService {
  // Upload Appointment File to S3
  static async uploadAppointmentFileToS3(data) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.REPORTS.UPLOAD_APPOINTMENT_FILE_TO_S3,
      JSON.stringify(data)
    );
    return response.data;
  }
}

export default ReportsService;
