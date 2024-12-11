const express = require('express');
const app = express();
const tipsRoutes = require('./routes/tips'); // Importa las rutas de tips

app.use(express.json()); // Middleware para procesar JSON
app.use('/api/tips', tipsRoutes); // Conecta el microservicio de tips

const PORT = process.env.PORT || 3015;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
