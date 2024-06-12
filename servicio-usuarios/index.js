const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Lista de usuarios para propósitos de demostración
const usuarios = ['usuario1', 'usuario2', 'usuario3'];

app.get('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params;
    if (usuarios.includes(nombre)) {
        res.status(200).send({ exists: true });
    } else {
        res.status(404).send({ exists: false });
    }
});

app.listen(PORT, () => {
    console.log(`Servicio de Usuarios corriendo en el puerto ${PORT}`);
});
