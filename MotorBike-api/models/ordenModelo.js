import sql from "../config/database.js";

class OrdenModel {
  // 🔹 Obtener todas las órdenes con su cliente, moto, servicio y mecánico
  async obtenerOrdenes() {
    try {
      const result = await sql`
        SELECT 
          os.*, 
          c.nombre_cliente, 
          c.apellido_cliente,
          m.marca_moto, 
          m.modelo_moto,
          s.nombre_servicio,
          me.id_mecanico,
          me.nombre_mecanico,
          me.apellido_mecanico
        FROM ordenes_servicio os
        JOIN motos m ON os.placa_moto = m.placa_moto
        JOIN clientes c ON m.cedula_cliente = c.cedula_cliente
        JOIN servicios s ON os.id_servicio = s.id_servicio
        LEFT JOIN mecanicos_ordenes_servicios mos ON os.id_orden = mos.id_orden
        LEFT JOIN mecanicos me ON mos.id_mecanico = me.id_mecanico
        ORDER BY os.fecha_ingreso_orden DESC;
      `;
      return result;
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
      throw error;
    }
  }

  // 🔹 Obtener una orden específica con todos sus detalles
  async obtenerOrdenPorId(id) {
    try {
      const result = await sql`
        SELECT 
          os.*, 
          c.nombre_cliente, 
          c.apellido_cliente,
          m.marca_moto, 
          m.modelo_moto,
          s.nombre_servicio,
          me.id_mecanico,
          me.nombre_mecanico,
          me.apellido_mecanico,
          me.email_mecanico,
          me.telefono_mecanico
        FROM ordenes_servicio os
        JOIN motos m ON os.placa_moto = m.placa_moto
        JOIN clientes c ON m.cedula_cliente = c.cedula_cliente
        JOIN servicios s ON os.id_servicio = s.id_servicio
        LEFT JOIN mecanicos_ordenes_servicios mos ON os.id_orden = mos.id_orden
        LEFT JOIN mecanicos me ON mos.id_mecanico = me.id_mecanico
        WHERE os.id_orden = ${id};
      `;
      return result[0];
    } catch (error) {
      console.error("Error al obtener la orden por ID:", error);
      throw error;
    }
  }

  // 🔹 Actualizar estado de una orden
async actualizarEstado(id_orden, nuevoEstado) {
  try {
    console.log('🛠 OrdenModel.actualizarEstado -> id_orden:', id_orden, 'nuevoEstado:', nuevoEstado);
    const result = await sql`
      UPDATE ordenes_servicio 
      SET estado_orden = ${nuevoEstado}
      WHERE id_orden = ${id_orden}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error("Error al actualizar el estado de la orden:", error);
    throw error;
  }
}

  // 🔹 Obtener órdenes completadas
  async obtenerOrdenesCompletadas() {
    try {
      const result = await sql`
        SELECT 
          os.*, 
          c.nombre_cliente, 
          m.marca_moto, 
          s.nombre_servicio,
          me.nombre_mecanico
        FROM ordenes_servicio os
        JOIN motos m ON os.placa_moto = m.placa_moto
        JOIN clientes c ON m.cedula_cliente = c.cedula_cliente
        JOIN servicios s ON os.id_servicio = s.id_servicio
        LEFT JOIN mecanicos_ordenes_servicios mos ON os.id_orden = mos.id_orden
        LEFT JOIN mecanicos me ON mos.id_mecanico = me.id_mecanico
        WHERE os.estado_orden = 'completado'
        ORDER BY os.fecha_entrega_orden DESC;
      `;
      return result;
    } catch (error) {
      console.error("Error al obtener las órdenes completadas:", error);
      throw error;
    }
  }

  // 🔹 Obtener órdenes pendientes
  async obtenerOrdenesPendientes() {
    try {
      const result = await sql`
        SELECT 
          os.*, 
          c.nombre_cliente, 
          m.marca_moto, 
          s.nombre_servicio,
          me.nombre_mecanico
        FROM ordenes_servicio os
        JOIN motos m ON os.placa_moto = m.placa_moto
        JOIN clientes c ON m.cedula_cliente = c.cedula_cliente
        JOIN servicios s ON os.id_servicio = s.id_servicio
        LEFT JOIN mecanicos_ordenes_servicios mos ON os.id_orden = mos.id_orden
        LEFT JOIN mecanicos me ON mos.id_mecanico = me.id_mecanico
        WHERE os.estado_orden = 'pendiente'
        ORDER BY os.fecha_ingreso_orden DESC;
      `;
      return result;
    } catch (error) {
      console.error("Error al obtener las órdenes pendientes:", error);
      throw error;
    }
  }
  async finalizarMantenimiento({ id_orden, costo_final_orden, observaciones_orden }) {
  try {
    return await sql`
      UPDATE ordenes_servicio
      SET estado_orden = 'completado',
          fecha_entrega_orden = NOW(),
          costo_final_orden = ${costo_final_orden},
          observaciones_orden = ${observaciones_orden}
      WHERE id_orden = ${id_orden}
      RETURNING *
    `;
  } catch (error) {
    console.error("Error al finalizar el mantenimiento:", error);
    throw error;
  }
}


}

export default new OrdenModel();
