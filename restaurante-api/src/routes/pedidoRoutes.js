import express from "express";

import {
    crearPedido,
    obtenerPedidos,
    obtenerPedido,
    actualizarPedido,
    eliminarPedido,
    agregarProducto
} from "../controllers/pedidoController.js";

const router = express.Router();

router.post("/", crearPedido);
router.get("/", obtenerPedidos);
router.get("/:id", obtenerPedido);
router.put("/:id", actualizarPedido);
router.delete("/:id", eliminarPedido);

router.post("/:id/productos", agregarProducto);

export default router;
