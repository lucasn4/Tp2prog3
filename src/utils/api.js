import express from 'express';
import conectarDB from './config.js';
import Historial from './historial.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    try {
        const { city,country,temperature,condition,conditionText,icon,horalocal,searchDateTime } = req.body;
        const historiales = new Historial({ city,country,temperature,condition,conditionText,icon,horalocal,searchDateTime });
        await historiales.save();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al guardar los datos' });
    }
});

app.get("/register", async (req, res) => {
    try {
        const documentos = await Historial.find();
        res.json({ success: true, data: documentos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error al recuperar datos" });
    }
});
app.listen(3000, () => {
    console.log("El servidor está en el puerto 3000");
});

conectarDB();