const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

// Lista de platos para propósitos de demostración
const platos = ['plato1', 'plato2', 'plato3'];

app.use(express.json());

app.delete('/platos/:nombre', async (req, res) => {
    const { nombre } = req.params;
    const { usuario } = req.body;

    try {
        const response = await axios.get(`http://servicio-usuarios:3000/usuarios/${usuario}`);
        if (response.data.exists) {
            const index = platos.indexOf(nombre);
            if (index > -1) {
                platos.splice(index, 1);
                res.status(200).send({ message: 'Plato eliminado correctamente' });
            } else {
                res.status(404).send({ message: 'Plato no encontrado' });
            }
        } else {
            res.status(403).send({ message: 'Usuario no autorizado' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error en la comunicación con el servicio de usuarios' });
    }
});

app.listen(PORT, () => {
    console.log(`Servicio de Platos corriendo en el puerto ${PORT}`);
});
