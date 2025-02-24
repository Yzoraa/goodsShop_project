const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// 장바구니 페이지 이동
router.get("/", cartController.moveCart);

// 아이템 추가
router.post("/add", cartController.addToCart);

// 아이템 삭제
router.delete('/delete/:id', cartController.deleteToCart);

module.exports = router;