import CitaController from "../controllers/citaControlador.js";
import express from "express";

const router = express.Router();

// Crear una nueva cita
router.post("/", CitaController.crearCita);


router.put("/:id_cita/confirmar", CitaController.confirmarCita);

router.get("/detalles", CitaController.obtenerCitasConDetalles);
router.get("/hora/:fecha_cita", CitaController.getCitasPorHora);

export default router;