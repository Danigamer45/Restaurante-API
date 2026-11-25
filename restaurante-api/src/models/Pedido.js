import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    }
});

const pedidoSchema = new mongoose.Schema({
    restauranteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurante",
        required: true
    },
    cliente: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: ["Pendiente", "Preparando", "Entregado", "Cancelado"],
        default: "Pendiente"
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    productos: {
        type: [productoSchema],
        default: []
    }
}, { timestamps: true });

export default mongoose.model("Pedido", pedidoSchema);
