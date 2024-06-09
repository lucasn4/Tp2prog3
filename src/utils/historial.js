//npm install moment-timezone
import moment from 'moment-timezone';
import mongoose from 'mongoose';

const historialSchema = new mongoose.Schema(
  {
    city: {
    type: String,
    required: true,
    },
    country: {
    type: String,
    required: true,
    },
    temperature: {
    type: String,
    required: true,
    },
    condition: {
    type: String,
    required: true,
    },
    conditionText: {
    type: String,
    required: true,
    }, 
    icon: {
    type: String,
    required: true,
    },
    horalocal: {
    type: Date,
    required: true,
    },
    searchDateTime: {
    type: Date,
    required: true,
    }
})

const Historial = mongoose.model("historiales", historialSchema);
export default Historial;