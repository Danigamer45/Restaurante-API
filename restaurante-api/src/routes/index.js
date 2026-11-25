import express from "express";

import restauranteRoutes from "./restauranteRoutes.js";
import pedidoRoutes from "./pedidoRoutes.js";

const router = express.Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        mensaje: "Restaurante API funcionando correctamente",
        estado: "OK"
    });
});

router.use("/restaurantes", restauranteRoutes);
router.use("/pedidos", pedidoRoutes);

export default router;
