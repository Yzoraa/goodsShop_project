const express = require('express');
const router = express.Router();
const mainController = require('../controllers/registerController');

// 전체 데이터 가져오기 (메인페이지)
router.get('/', mainController.getMainProducts);

// 데이터 한개 가져오기 (by ID)
router.get('/detail/:id', mainController.getProduct);

module.exports = router;