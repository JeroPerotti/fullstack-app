const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // ✅ Necesario para leer JSON del cuerpo de las peticiones

// Rutas
const productosRoutes = require('./routes/productosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);

// Servidor
const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
