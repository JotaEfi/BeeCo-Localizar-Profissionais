export interface userType {
    nome: string, 
    email: string, 
    senha: string,
    senha_confirmation: string,
    tipo: string,
    data_nascimento?: string,
    sexo?: string,
    foto_perfil?: string,
    telefone?: string,
    id_endereco?: number
}

export interface userLoginType {
    email: string, 
    senha: string
}

export interface User { 
    id?: number,
    data_nascimento?: string,
    sexo?: string,
    foto_perfil?: string,
    nome?: string,
    email?: string,
    tipo?: string,
    telefone?: string,
    id_endereco?: number,
} 