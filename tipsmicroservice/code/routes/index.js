const express = require('express');
const { getTipsByCategory, getTipsByUse } = require('../controllers/tipsController.js');

const cors = require('cors');
//app.use(cors()); // Asegúrate de que esto esté configurado antes de las rutas.


const router = express.Router();

//routes
router.get('/tips/', getTipsByCategory);
router.get('/tips/makeuse', getTipsByUse);

// Exportación compatible con CommonJS
module.exports = router;
