import Restaurante from "../models/Restaurante.js";

export const crearRestaurante = async (req, res) => {
    try {
        const restaurante = await Restaurante.create(req.body);
        res.status(201).json(restaurante);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

export const obtenerRestaurantes = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));

        const restaurantes = await Restaurante.find()
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Restaurante.countDocuments();

        res.json({
            total,
            pagina: page,
            limite: limit,
            totalPaginas: Math.ceil(total / limit),
            restaurantes
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const obtenerRestaurante = async (req, res) => {
    try {
        const restaurante = await Restaurante.findById(req.params.id);

        if (!restaurante) {
            return res.status(404).json({ mensaje: "Restaurante no encontrado" });
        }

        res.json(restaurante);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

export const actualizarRestaurante = async (req, res) => {
    try {
        const restaurante = await Restaurante.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!restaurante) {
            return res.status(404).json({ mensaje: "Restaurante no encontrado" });
        }

        res.json(restaurante);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

export const eliminarRestaurante = async (req, res) => {
    try {
        const restaurante = await Restaurante.findByIdAndDelete(req.params.id);

        if (!restaurante) {
            return res.status(404).json({ mensaje: "Restaurante no encontrado" });
        }

        res.json({ mensaje: "Restaurante eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};
