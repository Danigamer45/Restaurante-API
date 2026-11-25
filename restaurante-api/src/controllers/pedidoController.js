import Pedido from "../models/Pedido.js";
import Restaurante from "../models/Restaurante.js";

export const crearPedido = async (req, res) => {
    try {
        const restaurante = await Restaurante.findById(req.body.restauranteId);

        if (!restaurante) {
            return res.status(404).json({ mensaje: "Restaurante no encontrado" });
        }

        const pedido = await Pedido.create(req.body);
        res.status(201).json(pedido);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

export const obtenerPedidos = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));

        const pedidos = await Pedido.find()
            .populate("restauranteId")
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Pedido.countDocuments();

        res.json({
            total,
            pagina: page,
            limite: limit,
            totalPaginas: Math.ceil(total / limit),
            pedidos
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const obtenerPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id)
            .populate("restauranteId");

        if (!pedido) {
            return res.status(404).json({ mensaje: "Pedido no encontrado" });
        }

        res.json(pedido);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

export const actualizarPedido = async (req, res) => {
    try {
        if (req.body.restauranteId) {
            const restaurante = await Restaurante.findById(req.body.restauranteId);

            if (!restaurante) {
                return res.status(404).json({ mensaje: "Restaurante no encontrado" });
            }
        }

        const pedido = await Pedido.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!pedido) {
            return res.status(404).json({ mensaje: "Pedido no encontrado" });
        }

        res.json(pedido);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

export const eliminarPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByIdAndDelete(req.params.id);

        if (!pedido) {
            return res.status(404).json({ mensaje: "Pedido no encontrado" });
        }

        res.json({ mensaje: "Pedido eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

export const agregarProducto = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id);

        if (!pedido) {
            return res.status(404).json({ mensaje: "Pedido no encontrado" });
        }

        pedido.productos.push(req.body);
        await pedido.save();

        res.status(201).json({
            mensaje: "Producto agregado correctamente",
            pedido
        });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};
