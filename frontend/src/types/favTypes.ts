import { User } from "./userTypes";

export interface FavoriteResponse {
    id_favorito: number;
    id_contratante: number;
    id_prestador: number;
    created_at: string;
    updated_at: string;
    prestador: User;
}