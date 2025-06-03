import axios from "axios";
import { getCookie } from "@/utlis/cookies";

const API_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getCookie('token') || ''}`,
  },
});

