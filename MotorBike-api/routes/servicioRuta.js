import ServicioController from "../controllers/servicioControlador.js";
import express from "express";

const router = express.Router();

// Rutas para los servicios
router.get("/", ServicioController.obtenerTodos); // Obtener todos los servicios
router.post("/", ServicioController.crearServicio); // Crear un nuevo servicio

export default router;