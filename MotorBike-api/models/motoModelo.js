import sql from '../config/database.js';

class MotoModel {
    async crearMoto({placa_moto,marca_moto,modelo_moto,kilometraje_moto})
    {
        try {
            const result = await sql`
                INSERT INTO motos (placa_moto, marca_moto, modelo_moto, kilometraje_moto)
                VALUES (${placa_moto}, ${marca_moto}, ${modelo_moto}, ${kilometraje_moto})
                RETURNING *
            `;
            return result[0];
        } catch (error) {
            console.error('Error al crear la moto:', error);
            throw error;
        }
    }

    async agregarMotoACliente(cedula_cliente, placa_moto) {
        try {
            const result = await sql`
                INSERT INTO motos (cedula_cliente, placa_moto)
                VALUES (${cedula_cliente}, ${placa_moto})
                RETURNING *
            `;
            return result[0];
        } catch (error) {
            console.error('Error al agregar la moto al cliente:', error);
            throw error;
        }
    }

    async obtenerMotos() {
        try {
            const result = await sql`
                SELECT * FROM motos
            `;
            return result;
        } catch (error) {
            console.error('Error al obtener las motos:', error);
            throw error;
        }
    }
    async obtenerMotoPorPlaca(placa_moto) {
        try {
            const result = await sql`
                SELECT * FROM motos WHERE placa_moto = ${placa_moto}
            `;
            return result[0];
        } catch (error) {
            console.error('Error al obtener la moto por placa:', error);
            throw error;
        }
    }

    async actualizarMoto({placa_moto,marca_moto,modelo_moto,kilometraje_moto}) {
        try {
            const result = await sql`
                UPDATE motos
                SET marca_moto = ${marca_moto}, modelo_moto = ${modelo_moto}, kilometraje_moto = ${kilometraje_moto}
                WHERE placa_moto = ${placa_moto}
                RETURNING *
            `;
            return result[0];
        } catch (error) {
            console.error('Error al actualizar la moto:', error);
            throw error;
        }
    }

    async eliminarMoto(placa_moto) {
        try {
            const result = await sql`
                DELETE FROM motos WHERE placa_moto = ${placa_moto}
                RETURNING *
            `;
            return result[0];
        } catch (error) {
            console.error('Error al eliminar la moto:', error);
            throw error;
        }
    }
    async obtenerMotoPorCliente(cedula_cliente) {
        try {
            const result = await sql`
                SELECT m.* FROM motos m
                JOIN clientes c ON m.cedula_cliente = c.cedula_cliente
                WHERE c.cedula_cliente = ${cedula_cliente}
            `;
            return result;
        } catch (error) {
            console.error('Error al obtener la moto por cliente:', error);
            throw error;
        }
    }
}

export default new MotoModel();
export { MotoModel };