import { userLoginType, userType } from '@/types/userTypes'
import { getCookie } from '@/utlis/cookies'
import { api } from '@/utlis/api'

const token = getCookie('token')

export const createUser = async (userData: userType) => {
  try {
    const response = await api.post(`/register`, userData)
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error)
    throw error
  }
}

export const loginUser = async (userData: userLoginType) => {
  try {
    const response = await api.post(`/login`, userData)
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Erro ao logar usuário:', error)
    throw error
  }
}


export const getUserData = async () => {
  if(token) {
    const { data } = await api.get(`/me`)
  console.log(data.user)
  return data.user
  
  }
}

export const updateUserData = async (userData: any) => {
  try {
    const response = await api.put(`/user`, userData)
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    throw error
  }
}

export const handleDeactivateAccount = async (): Promise<void> => {
  try {
    const resp = await fetch('/api/user/desativar', {
      method: 'PUT',
      credentials: 'include'
    });
    const json: { message: string } = await resp.json();

    if (resp.ok) {
      alert(json.message);
    } else {
      alert('Falha ao desativar conta');
    }
  } catch (e) {
    console.error(e);
    alert('Erro de rede');
  }
};

