import { api } from "@/utlis/api";
import { rateTypes } from "@/types/rateTypes";

export const createRate = async (rateData: rateTypes) => {
    try {
        const response = await api.post("/avaliacoes", rateData);
        console.log("Rate created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating rate:", error);
        throw error;
    }
}

 export const getRates = async () => {
    try {
        const response = await api.get(`/avaliacoes`);
        return response.data;
    } catch (error) {
        console.error("Error fetching rates:", error);
        throw error;
    }  
 }