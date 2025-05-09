const express = require('express');
const router = express.Router();
const { sendPIN, verifyPIN, createSAController } = require('../controllers/superAdminController');

router.get('/sendPin', sendPIN);
router.post('/verifyPin', verifyPIN);
router.get('/createSA', createSAController);


module.exports = router;
