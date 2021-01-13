import { firestore } from 'firebase';
export interface Nota {
    id?: any;
    titulo: string;
    texto: string;
    fechaCreacion?: any;
    fechaLimite?: any;
    hora?: any;
    latitud?: number;
    longitud?: number;
    imagen?: any;
    datosImagen?: any;
    prioridad?: number;
}
