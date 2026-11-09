import axios from 'axios';

const API_URL = '/ecommerce-seller';

export const sellerService = {
  // Get all sellers
  async getAllSellers() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Get specific seller details with platforms
  async getSellerById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Create new seller
  async createSeller(data) {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  // Update existing seller
  async updateSeller(id, data) {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  // Delete seller
  async deleteSeller(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  // Add platform to seller
  async addPlatform(sellerId, platformData) {
    const response = await axios.post(`${API_URL}/${sellerId}/platforms`, platformData);
    return response.data;
  },

  // Delete platform from seller
  async deletePlatform(sellerId, platformId) {
    const response = await axios.delete(`${API_URL}/${sellerId}/platforms/${platformId}`);
    return response.data;
  },
};

