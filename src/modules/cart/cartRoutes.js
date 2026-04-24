const express = require('express');
const cartController = require('./cartController');
<<<<<<< HEAD
=======
// Importar middleware de auth quando estiver pronto para proteger rotas
// const authMiddleware = require('../../middlewares/authMiddleware');
>>>>>>> 35a4f5c9f644d653549f1d057fcfe07d21e1b27d

const router = express.Router();

router.get('/', cartController.getCart);
router.post('/items', cartController.addItem);
router.delete('/items/:itemId', cartController.removeItem);
<<<<<<< HEAD
router.post('/coupon', cartController.applyCoupon);
router.delete('/coupon', cartController.removeCoupon);
=======
>>>>>>> 35a4f5c9f644d653549f1d057fcfe07d21e1b27d

module.exports = router;
