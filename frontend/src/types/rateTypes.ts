import { User } from "./userTypes";

export interface rateTypes { 
    prestador_id: number;
    contratante_id: number;
    nota: number;
    comentario: string;
    tipo: string;
}

export interface ReviewTypes extends rateTypes {
    id: number;
    contratante: User
    contratante_id: number;
    id_avaliacao: number;
    nota: number;
    prestador: User;
    prestador_id: number;
    tipo: string;
    created_at: string;
}