import { userType } from "./userTypes";

export interface Post {
    titulo: string;
    descricao: string;
    categoria: string;
    tipo_postagem: string;
    preco: number | string;
    status: string;
    imagem?: string
}

export interface PostResponse extends Post {
    id: number;
    user_id: number;
    user: userType

}