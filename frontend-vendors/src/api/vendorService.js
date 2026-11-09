import axios from 'axios';

const API_URL = '/cloudvendor';

export const vendorService = {
  // Get all vendors
  async getAllVendors() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Get vendor by ID
  async getVendorById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Create vendor
  async createVendor(data) {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  // Update vendor
  async updateVendor(id, data) {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  // Delete vendor
  async deleteVendor(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

