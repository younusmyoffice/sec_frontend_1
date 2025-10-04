/**
 * Master Data Service - API calls for master data operations
 */

import axiosInstance from '../../config/axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export class MasterDataService {
  // Get Countries
  static async getCountries() {
    const response = await axiosInstance.get(API_ENDPOINTS.MASTER_DATA.COUNTRIES);
    return response.data;
  }

  // Get Departments
  static async getDepartments() {
    const response = await axiosInstance.get(API_ENDPOINTS.MASTER_DATA.DEPARTMENTS);
    return response.data;
  }
}

export default MasterDataService;
