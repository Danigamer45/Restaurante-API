import express from "express";

import {
    crearRestaurante,
    obtenerRestaurantes,
    obtenerRestaurante,
    actualizarRestaurante,
    eliminarRestaurante
} from "../controllers/restauranteController.js";

const router = express.Router();

router.post("/", crearRestaurante);
router.get("/", obtenerRestaurantes);
router.get("/:id", obtenerRestaurante);
router.put("/:id", actualizarRestaurante);
router.delete("/:id", eliminarRestaurante);

export default router;
