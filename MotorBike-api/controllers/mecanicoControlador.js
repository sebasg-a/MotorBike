
import mecanicoModel from "../models/mecanicoModelo.js";

class MecanicoControlador {
  async crearMecanico(req, res) {
    try {
      const {
        nombre_mecanico,
        apellido_mecanico,
        telefono_mecanico,
        especialidad_mecanico,
        email_mecanico,
      } = req.body;
      const nuevoMecanico = await mecanicoModel.crearMecanico({
        nombre_mecanico,
        apellido_mecanico,
        telefono_mecanico,
        especialidad_mecanico,
        email_mecanico,
      });
      res.status(201).json(nuevoMecanico);
    } catch (error) {
      console.error("Error al crear el mecánico:", error);
      res.status(500).json({ error: "Error al crear el mecánico" });
    }
  }

  async obtenerMecanicos(req, res) {
    try {
      const mecanicos = await mecanicoModel.obtenerMecanicos();
      res.status(200).json(mecanicos);
    } catch (error) {
      console.error("Error al obtener los mecánicos:", error);
      res.status(500).json({ error: "Error al obtener los mecánicos" });
    }
  }
  async eliminarMecanico(req, res) {
    try {
      const { id_mecanico } = req.params;
      await mecanicoModel.eliminarMecanico(id_mecanico);
      res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar el mecánico:", error);
      res.status(500).json({ error: "Error al eliminar el mecánico" });
    }
  }
  async actualizarMecanico(req, res) {
    try {
      const { id_mecanico } = req.params;
      const {
        nombre_mecanico,
        apellido_mecanico,
        telefono_mecanico,
        especialidad_mecanico,
        email_mecanico,
      } = req.body;
      const mecanicoActualizado = await mecanicoModel.actualizarMecanico({
        id_mecanico,
        nombre_mecanico,
        apellido_mecanico,
        telefono_mecanico,
        especialidad_mecanico,
        email_mecanico,
      });
      res.status(200).json(mecanicoActualizado);
    } catch (error) {
      console.error("Error al actualizar el mecánico:", error);
      res.status(500).json({ error: "Error al actualizar el mecánico" });
    }
  }
  async asignarMecanico(req, res) {
    try {
      const { id_orden, id_mecanico } = req.body;
      const result = await mecanicoModel.asignarMecanico(id_mecanico,id_orden);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ error: "Error al asignar mecánico" });
    }
  }
}

export default new MecanicoControlador();
