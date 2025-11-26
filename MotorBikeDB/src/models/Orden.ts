export default interface Orden {
  id_orden: number;
  placa_moto: string;
  id_servicio: number;
  fecha_ingreso_orden: string; // O Date, dependiendo de cómo quieras manejar las fechas
  fecha_entrega_orden?: string | null; // O Date | null
  estado_orden: 'pendiente' | 'en proceso' | 'completado' | 'cancelado';
  costo_final_orden?: number | null;
  observaciones_orden?: string | null;
  id_cita?: number | null; // Si quieres relacionar la orden con la cita que la originó
  id_mecanico?: number | null; // Si quieres relacionar la orden con el mecánico asignado
}