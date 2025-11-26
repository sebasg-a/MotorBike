import sql from '../config/database.js';

class ClienteModel {
    async getAllClientes() {
      try {
        const clientes = await sql`SELECT * FROM clientes`;
        return clientes;
      } catch (error) {
        console.error('Error al obtener todos los clientes:', error);
        throw error;
      }
    }
  
    async getClienteById(cedula_cliente) {
      try {
        const cliente = await sql`SELECT * FROM clientes WHERE cedula_cliente = ${cedula_cliente}`;
        return cliente[0];
      } catch (error) {
        console.error(`Error al obtener el cliente con cédula ${cedula_cliente}:`, error);
        throw error;
      }
    }
  
    async createClienteConMoto(clienteData, motoData) {
      try {
        // Inicia una transacción para asegurar la atomicidad de las operaciones
        await sql.begin(async (sql) => {
          const { cedula_cliente, nombre_cliente, apellido_cliente, telefono_cliente, email_cliente } = clienteData;
  
          // Crea el nuevo cliente
          const nuevoCliente = await sql`
            INSERT INTO clientes (cedula_cliente, nombre_cliente, apellido_cliente, telefono_cliente, fecha_registro_cliente, email_cliente)
            VALUES (${cedula_cliente}, ${nombre_cliente}, ${apellido_cliente}, ${telefono_cliente}, NOW(), ${email_cliente})
            RETURNING *
          `;
  
          if (!nuevoCliente || nuevoCliente.length === 0) {
            throw new Error('Error al crear el cliente');
          }
  
          const { placa_moto, marca_moto, modelo_moto, kilometraje_moto } = motoData;
  
          // Crea la moto asociada al cliente
          const nuevaMoto = await sql`
            INSERT INTO motos (placa_moto, cedula_cliente, marca_moto, modelo_moto, kilometraje_moto)
            VALUES (${placa_moto}, ${nuevoCliente[0].cedula_cliente}, ${marca_moto}, ${modelo_moto}, ${kilometraje_moto})
            RETURNING *
          `;
  
          if (!nuevaMoto || nuevaMoto.length === 0) {
            throw new Error('Error al crear la moto asociada');
          }
  
          return { cliente: nuevoCliente[0], moto: nuevaMoto[0] };
        });
      } catch (error) {
        console.error('Error al crear el cliente y la moto:', error);
        throw error;
      }
    }
  
    // Ejemplo de otra operación solo para clientes (sin moto obligatoria)
    async updateCliente(cedula_cliente, clienteData) {
      try {
        const { nombre_cliente, apellido_cliente, telefono_cliente, email_cliente } = clienteData;
        const clienteActualizado = await sql`
          UPDATE clientes
          SET nombre_cliente = ${nombre_cliente},
              apellido_cliente = ${apellido_cliente},
              telefono_cliente = ${telefono_cliente},
              email_cliente = ${email_cliente}
          WHERE cedula_cliente = ${cedula_cliente}
          RETURNING *
        `;
        return clienteActualizado[0];
      } catch (error) {
        console.error(`Error al actualizar el cliente con cédula ${cedula_cliente}:`, error);
        throw error;
      }
    }
  
    async deleteCliente(cedula_cliente) {
      try {
        const resultado = await sql`DELETE FROM clientes WHERE cedula_cliente = ${cedula_cliente}`;
        return resultado.count > 0;
      } catch (error) {
        console.error(`Error al eliminar el cliente con cédula ${cedula_cliente}:`, error);
        throw error;
      }
    }
  }
  
  export default new ClienteModel();