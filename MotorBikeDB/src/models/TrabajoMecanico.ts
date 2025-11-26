export default interface TrabajoMecanico {
  id_trabajo_mecanico?: number; // opcional, si lo asigna la BD
  id_historial: number;
  id_mecanico: number;
  fecha_inicio_servicio: string; // formato ISO: 'YYYY-MM-DD'
  fecha_fin_servicio: string;
  descripcion_trabajo: string;
  detalles_adicionales?: string;
}