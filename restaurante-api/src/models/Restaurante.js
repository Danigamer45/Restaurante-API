import mongoose from "mongoose";

const restauranteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del restaurante es obligatorio"],
        trim: true,
        minlength: [3, "El nombre debe tener al menos 3 caracteres"]
    },
    direccion: {
        type: String,
        required: [true, "La dirección es obligatoria"],
        trim: true
    },
    telefono: {
        type: String,
        required: [true, "El teléfono es obligatorio"],
        trim: true,
        match: [/^[0-9]{10}$/, "El teléfono debe contener exactamente 10 dígitos"]
    },
    ciudad: {
        type: String,
        required: [true, "La ciudad es obligatoria"],
        trim: true
    }
}, { timestamps: true });

export default mongoose.model("Restaurante", restauranteSchema);
