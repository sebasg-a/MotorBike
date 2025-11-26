import sql from '../config/database.js';

class CitaModel {
  // Crear una nueva cita
  async crearCita({ cedula_cliente, placa_moto, id_servicio, fecha_cita }) {
    try {
      const result = await sql`
        INSERT INTO citas (cedula_cliente, placa_moto, id_servicio, fecha_cita, estado_cita)
        VALUES (${cedula_cliente}, ${placa_moto}, ${id_servicio}, ${fecha_cita}, 'pendiente')
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Error al crear la cita:', error);
      throw error;
    }
  }

  // Confirmar cita y crear orden de servicio
  async confirmarCita(id_cita) {
    try {
      return await sql.begin(async (sql) => {
        const citaResult = await sql`
          SELECT placa_moto, id_servicio 
          FROM citas 
          WHERE id_cita = ${id_cita} AND estado_cita = 'pendiente'
        `;

        if (citaResult.length === 0) {
          throw new Error('Cita no encontrada o ya confirmada/cancelada');
        }

        const { placa_moto, id_servicio } = citaResult[0];

        // Actualizar cita
        await sql`
          UPDATE citas 
          SET estado_cita = 'confirmada' 
          WHERE id_cita = ${id_cita}
        `;

        // Crear orden de servicio
        const ordenResult = await sql`
  INSERT INTO ordenes_servicio (placa_moto, id_servicio, fecha_ingreso_orden, estado_orden)
  VALUES (${placa_moto}, ${id_servicio}, NOW(), 'pendiente')
  RETURNING *
`;

        return ordenResult[0];
      });
    } catch (error) {
      console.error('Error al confirmar la cita y crear la orden de servicio:', error);
      throw error;
    }
  }
  
  async getCitasPorHora(fecha_cita) {
    try{
      const result = await sql`
        SELECT * FROM citas WHERE fecha_cita = ${fecha_cita}
      `;
      return result;
    } catch (error) {
      console.error('Error al obtener la cita por hora:', error);
      throw error;
    }
  }

  // Obtener todas las citas (con cliente, moto y servicio)
  async obtenerCitasConDetalles() {
    try {
      const result = await sql`
        SELECT 
          c.id_cita, c.fecha_cita, c.estado_cita,
          cl.nombre_cliente, cl.apellido_cliente,
          m.placa_moto, m.marca_moto, m.modelo_moto,
          s.nombre_servicio
        FROM citas c
        JOIN clientes cl ON c.cedula_cliente = cl.cedula_cliente
        JOIN motos m ON c.placa_moto = m.placa_moto
        JOIN servicios s ON c.id_servicio = s.id_servicio
        ORDER BY c.fecha_cita ASC
      `;
      return result;
    } catch (error) {
      console.error('Error al obtener las citas con detalles:', error);
      throw error;
    }
  }
}

export default new CitaModel();