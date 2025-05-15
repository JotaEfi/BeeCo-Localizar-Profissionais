import { userLoginType, userType } from '@/types/userTypes';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const createUser = async (
    userData: userType
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    throw error;
  }
};

export const loginUser = async (
  userData: userLoginType
) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Erro ao logar usuário:', error);
    throw error;
  }
}
