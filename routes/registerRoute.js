const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// 전체 데이터 가져오기 (등록페이지)
router.get('/', registerController.getProducts);

// 데이터 한개 가져오기 (by ID)
router.get('/detail/:id', registerController.getProduct);

// 수정페이지 이동
router.get('/write/:id', registerController.moveWrite);

// 데이터 등록
router.post('/postData', registerController.postProducts);

// 삭제
router.delete('/delete/:id', registerController.deleteData);

// 수정
router.put('/update', registerController.dataUpdate);

// 아이디 중복 검사
router.post('/checkID', registerController.duplicatedID);

module.exports = router;