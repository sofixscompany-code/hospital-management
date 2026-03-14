import api from "./api";

export const placeOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to place order");
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to load orders");
  }
};

export const getOrder = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to load order");
  }
};

export const submitReview = async (orderId, reviewText, userId) => {
  try {
    const response = await api.post("/reviews", {
      orderId,
      reviewText,
      userId,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to submit review");
  }
};

export const getLoyaltyPoints = async () => {
  try {
    const response = await api.get("/loyalty");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to load loyalty data",
    );
  }
};
