const { Router } = require('express');
// Importar todos los routers;
const typeController = require('../controller/typeController.js');


const router = Router();

// Configurar los routers
router.get('/', typeController.index);


module.exports = router;
