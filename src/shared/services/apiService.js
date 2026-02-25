/**
 * API Service for BharatMandi
 * Handles communication with the Express/Vercel backend
 */

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!BASE_URL) {
  console.warn("Warning: EXPO_PUBLIC_API_URL is not defined in .env");
}

/**
 * Validates a fetch response & parsed JSON body.
 * Throws an informative Error when the server returns a non-OK status
 * or when the JSON body contains `{ success: false }`.
 */
async function _handleResponse(response, context) {
  let data;
  try {
    data = await response.json();
  } catch {
    // Body wasn't JSON — still treat as an error if status is bad
    if (!response.ok) {
      throw new Error(
        `[${context}] Server returned ${response.status} ${response.statusText}`
      );
    }
    return {};
  }

  if (!response.ok) {
    const serverMsg =
      data?.message || data?.error || JSON.stringify(data);
    throw new Error(`[${context}] ${response.status}: ${serverMsg}`);
  }

  if (data.success === false) {
    const serverMsg =
      data?.message || data?.error || "Unknown server error";
    throw new Error(`[${context}] ${serverMsg}`);
  }

  return data;
}

const apiService = {
  /**
   * Health check to verify connectivity
   */
  async checkHealth() {
    try {
      const response = await fetch(`${BASE_URL}/health`);
      return await _handleResponse(response, "checkHealth");
    } catch (error) {
      console.error("API Error (checkHealth):", error);
      throw error;
    }
  },

  /**
   * Create a new checkout flow.
   * The backend owns session & flow creation — the app never generates these IDs.
   */
  async createFlow(usecaseId) {
    try {
      const response = await fetch(`${BASE_URL}/api/checkout/create-flow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usecaseId }),
      });
      return await _handleResponse(response, "createFlow");
    } catch (error) {
      console.error("API Error (createFlow):", error);
      throw error;
    }
  },

  /**
   * Initiate an ONDC search flow
   */
  async search(sessionId, flowId) {
    try {
      const response = await fetch(`${BASE_URL}/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, flowId }),
      });
      return await _handleResponse(response, "search");
    } catch (error) {
      console.error("API Error (search):", error);
      throw error;
    }
  },

  /**
   * Select a product/item
   */
  async select(transactionId, inputs) {
    try {
      const response = await fetch(`${BASE_URL}/api/select`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, inputs }),
      });
      return await _handleResponse(response, "select");
    } catch (error) {
      console.error("API Error (select):", error);
      throw error;
    }
  },

  /**
   * Initialize a transaction (order)
   */
  async init(transactionId, inputs) {
    try {
      const response = await fetch(`${BASE_URL}/api/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, inputs }),
      });
      return await _handleResponse(response, "init");
    } catch (error) {
      console.error("API Error (init):", error);
      throw error;
    }
  },

  /**
   * Confirm an order
   */
  async confirm(transactionId, inputs) {
    try {
      const response = await fetch(`${BASE_URL}/api/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, inputs }),
      });
      return await _handleResponse(response, "confirm");
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
      return await _handleResponse(response, "getStatus");
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
      return await _handleResponse(response, "addProduct");
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
      return await _handleResponse(response, "getSellerProducts");
    } catch (error) {
      console.error("API Error (getSellerProducts):", error);
      throw error;
    }
  },

  /**
   * Search for products
   */
  async searchProducts(query) {
    try {
      const response = await fetch(`${BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`);
      return await _handleResponse(response, "searchProducts");
    } catch (error) {
      console.error("API Error (searchProducts):", error);
      throw error;
    }
  },

  /**
   * Get all products
   */
  async getAllProducts() {
    try {
      const response = await fetch(`${BASE_URL}/api/products`);
      return await _handleResponse(response, "getAllProducts");
    } catch (error) {
      console.error("API Error (getAllProducts):", error);
      throw error;
    }
  },

  /**
   * Get product feed
   */
  async getProductFeed(limit = 10) {
    try {
      const response = await fetch(`${BASE_URL}/api/products/feed?limit=${limit}`);
      return await _handleResponse(response, "getProductFeed");
    } catch (error) {
      console.error("API Error (getProductFeed):", error);
      throw error;
    }
  },

  /**
   * Get orders for a specific seller
   */
  async getSellerOrders(sellerId) {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/seller/${sellerId}`);
      return await _handleResponse(response, "getSellerOrders");
    } catch (error) {
      console.error("API Error (getSellerOrders):", error);
      throw error;
    }
  },

  /**
   * Get statistics for a specific seller
   */
  async getSellerStats(sellerId) {
    try {
      const response = await fetch(`${BASE_URL}/api/stats/seller/${sellerId}`);
      return await _handleResponse(response, "getSellerStats");
    } catch (error) {
      console.error("API Error (getSellerStats):", error);
      throw error;
    }
  },

  /**
   * Update order status
   */
  async updateOrderStatus(orderId, status) {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      return await _handleResponse(response, "updateOrderStatus");
    } catch (error) {
      console.error("API Error (updateOrderStatus):", error);
      throw error;
    }
  },
};

export default apiService;
