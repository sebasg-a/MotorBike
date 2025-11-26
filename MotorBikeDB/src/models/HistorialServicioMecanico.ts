export default interface HistorialServicioMecanico {
  id_historial_servicio_mecanico?: number;
  id_mecanico: number;
  id_orden: number;
  fecha_inicio_servicio: string;
  fecha_fin_servicio: string;
  descripcion_trabajo: string;
  detalles_adicionales: string;
}