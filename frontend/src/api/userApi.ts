import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const createUser = async (
    userData: { 
        nome: string, 
        email: string, 
        senha: string,
        senha_confirmation: string,
        tipo: string,
        data_nascimento: string,
        sexo: string,
        foto_perfil: string,
        telefone: string,
        id_endereco: number
    }
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
