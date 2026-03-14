import api from "./api";

export const getMenu = async () => {
  try {
    const response = await api.get("/menu");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to load menu");
  }
};

export const getMenuItem = async (id) => {
  try {
    const response = await api.get(`/menu/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to load menu item",
    );
  }
};
