const { Router } = require('express');
// Importar todos los routers;
const pokemonController = require('./../controller/pokemonController');


const router = Router();

// Configurar los routers
router.get('/', pokemonController.indexAndName);
router.post('/', pokemonController.create)
router.get('/:id', pokemonController.detail);
router.delete('/delete/', pokemonController.delete);


module.exports = router;
