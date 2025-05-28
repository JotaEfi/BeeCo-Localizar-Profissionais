import { getCookie } from './cookies';
import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {
  const token = getCookie('token');
  return !!token;
};

export const getUserType = () => {
  const token = getCookie('token');
  if (!token) return null;
  
  try {
    const decoded: any = jwtDecode(token);
    return decoded.tipo;
  } catch (error) {
    return null;
  }
};