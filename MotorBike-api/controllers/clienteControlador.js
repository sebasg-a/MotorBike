import ClienteModel from '../models/clienteModelo.js';

class ClienteController {
    async getAllClientes(req, res) {
        try {
            const clientes = await ClienteModel.getAllClientes();
            res.status(200).json(clientes);
        } catch (error) {
            console.error('Error al obtener todos los clientes:', error);
            res.status(500).json({ error: 'Error al obtener todos los clientes' });
        }
    }

    async getClienteById(req, res) {
        const { cedula_cliente } = req.params;
        try {
            const cliente = await ClienteModel.getClienteById(cedula_cliente);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.status(200).json(cliente);
        } catch (error) {
            console.error(`Error al obtener el cliente con cédula ${cedula_cliente}:`, error);
            res.status(500).json({ error: 'Error al obtener el cliente' });
        }
    }
    async createClienteConMoto(req, res) {
        const { clienteData, motoData } = req.body;
        try {
            const nuevoCliente = await ClienteModel.createClienteConMoto(clienteData, motoData);
            res.status(201).json(nuevoCliente);
        } catch (error) {
            console.error('Error al crear el cliente y la moto:', error);
            res.status(500).json({ error: 'Error al crear el cliente y la moto' });
        }
    }
    async updateCliente(req, res) {
        const { cedula_cliente } = req.params;
        const clienteData = req.body;
        try {
            const clienteActualizado = await ClienteModel.updateCliente(cedula_cliente, clienteData);
            if (!clienteActualizado) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.status(200).json(clienteActualizado);
        } catch (error) {
            console.error(`Error al actualizar el cliente con cédula ${cedula_cliente}:`, error);
            res.status(500).json({ error: 'Error al actualizar el cliente' });
        }
    }
    async deleteCliente(req, res) {
        const { cedula_cliente } = req.params;
        try {
            const clienteEliminado = await ClienteModel.deleteCliente(cedula_cliente);
            if (!clienteEliminado) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.status(200).json({ message: 'Cliente eliminado correctamente' });
        } catch (error) {
            console.error(`Error al eliminar el cliente con cédula ${cedula_cliente}:`, error);
            res.status(500).json({ error: 'Error al eliminar el cliente' });
        }
    }

}

export default new ClienteController();
