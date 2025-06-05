import { api } from "@/utlis/api";

export const getFavorites = async (userId: string) => {
  try {
    const response = await api.get(`/favoritos/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

export const addFavorite = async (userId: string, postId: string) => {
  try {
    const response = await api.post(`/favoritos`, { userId, postId });
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};
