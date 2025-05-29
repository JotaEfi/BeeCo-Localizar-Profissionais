import { userLoginType, userType } from '@/types/userTypes'
import axios from 'axios'
import { getCookie } from '@/utlis/cookies'

const API_URL = 'http://localhost:8000/api'
const token = getCookie('token')

export const createUser = async (userData: userType) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData)
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error)
    throw error
  }
}

export const loginUser = async (userData: userLoginType) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData)
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Erro ao logar usuário:', error)
    throw error
  }
}


export const getUserData = async () => {
  if(token) {
    const { data } = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(data.user)
  return data.user
  
  }
}

export const updateUserData = async (userData: any) => {
  try {
    const response = await axios.put(`${API_URL}/user`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    throw error
  }
}