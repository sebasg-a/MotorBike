export default interface Cita {
    id?: number; 
    cedula_cliente: string;
    placa_moto: string;
    id_servicio: number;
    fecha_cita: string;
    confirmado?: string;
    estado_cita?: string;
}