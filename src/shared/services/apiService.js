/**
 * API Service for BharatMandi
 * Handles communication with the Express/Vercel backend
 */

// Use Expo environment variables for the backend URL
// This value is defined in the .env file
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!BASE_URL) {
  console.warn("Warning: EXPO_PUBLIC_API_URL is not defined in .env");
}

const apiService = {
  /**
   * Health check to verify connectivity
   */
  async checkHealth() {
    try {
      const response = await fetch(`${BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error("API Error (checkHealth):", error);
      throw error;
    }
  },

  /**
   * Search for products
   */
  async search(query) {
    try {
      const response = await fetch(`${BASE_URL}/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      return await response.json();
    } catch (error) {
      console.error("API Error (search):", error);
      throw error;
    }
  },

  /**
   * Select a product/item
   */
  async select(itemId) {
    try {
      const response = await fetch(`${BASE_URL}/api/select`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      return await response.json();
    } catch (error) {
      console.error("API Error (select):", error);
      throw error;
    }
  },

  /**
   * Initialize a transaction (order)
   */
  async init(details) {
    try {
      const response = await fetch(`${BASE_URL}/api/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      return await response.json();
    } catch (error) {
      console.error("API Error (init):", error);
      throw error;
    }
  },

  /**
   * Confirm an order
   */
  async confirm(transactionId) {
    try {
      const response = await fetch(`${BASE_URL}/api/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId }),
      });
      return await response.json();
    } catch (error) {
      console.error("API Error (confirm):", error);
      throw error;
    }
  },

  /**
   * Get transaction status
   */
  async getStatus(transactionId) {
    try {
      const response = await fetch(`${BASE_URL}/api/status/${transactionId}`);
      return await response.json();
    } catch (error) {
      console.error("API Error (getStatus):", error);
      throw error;
    }
  },

  /**
   * Add a new product
   */
  async addProduct(productData) {
    try {
      const response = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      return await response.json();
    } catch (error) {
      console.error("API Error (addProduct):", error);
      throw error;
    }
  },

  /**
   * Get products for a specific seller
   */
  async getSellerProducts(sellerId) {
    try {
      const response = await fetch(`${BASE_URL}/api/products/seller/${sellerId}`);
      return await response.json();
    } catch (error) {
      console.error("API Error (getSellerProducts):", error);
      throw error;
    }
  },

  /**
   * Get all products
   */
  async getAllProducts() {
    try {
      const response = await fetch(`${BASE_URL}/api/products`);
      return await response.json();
    } catch (error) {
      console.error("API Error (getAllProducts):", error);
      throw error;
    }
  },
};

export default apiService;
