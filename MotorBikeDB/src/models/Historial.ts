export default interface Historial {
  id_historial?: number;
  id_orden?: number;
  fecha_historial: string;
  detalles_historial: string;
  fecha_ingreso_orden?: string;
  fecha_entrega_orden?: string;
  estado_orden?: string;
  placa_moto?: string;
  marca_moto?: string;
  modelo_moto?: string;
  nombre_cliente?: string;
  apellido_cliente?: string;
  nombre_servicio?: string;
  id_mecanico?: number;
  nombre_mecanico?: string;
  apellido_mecanico?: string;
  fecha_inicio_servicio?: string;
  fecha_fin_servicio?: string;
  descripcion_trabajo?: string;
  detalles_adicionales?: string;
  mecanico_nombre?: string; // Campo adicional para mostrar el nombre completo del mecánico
  fecha_inicio_cita?: string; // Campo adicional para mostrar la fecha de inicio de la cita
}