const express = require('express');
const { validatePromo } = require('../controllers/promoController');
const promoRouter = express.Router();

promoRouter.post('/validate', validatePromo);

module.exports = promoRouter;
