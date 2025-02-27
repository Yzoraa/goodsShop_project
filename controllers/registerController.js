const registerModel = require('../models/registerModel');

// 전체 (등록페이지)
const getProducts = async (req, res) => {
    const getProducts = await registerModel.getAllProduct();
    console.log("데이터 확인:", getProducts);
    res.render("register", { getProducts });
};

// 전체 (메인페이지)
const getMainProducts = async (req, res) =>{
    try {
        console.log("전체 쿠키 확인:", req.signedCookies); // 현재 모든 쿠키 확인
        const getMains = await registerModel.getAllProduct(); // 상품 데이터 가져오기
        const hidePopup = req.signedCookies.hidePopup === "true"; // 쿠키 값 가져오기

        console.log("최종 쿠키 값:", hidePopup); // 콘솔에서 값 확인
        // console.log("메인 페이지 데이터:", getMains); // 상품 데이터 확인

        res.render("main", { hidePopup, getMains }); // 두 개의 데이터를 함께 전달
    } catch (error) {
        console.error("메인 페이지 로드 오류:", error);
    }
}

// 아이디 하나만 가져오기 (상세페이지 이동!)
const getProduct = async (req, res) => {
    try {
        console.log("요청받은 ID:", req.params.id);
        const productOne = await registerModel.getOneProduct(req.params.id);
        console.log("상품 데이터:", productOne);
        
        res.render("detailOne", { productOne });
    } catch (error) {
        console.error("상품 상세 조회 오류:", error);
    }
};

// 등록
const postProducts = async (req, res) => {
  try{
    console.log("사용자에게 받은 데이터:", req.body);
    const result = await registerModel.postProduct(req.body);
    res.send('성공');
  } catch (error) {
      console.error("서버 오류:", error);
  }
};

// 삭제
const deleteData = async (req, res) =>{
    await registerModel.deleteRow(req.params.id);
    res.send('200');
};

// 수정페이지 이동
const moveWrite = async (req, res) =>{
    const getForMove = await registerModel.getOneProduct(req.params.id);
    res.render('registerUpdate', {getForMove});
}

// 데이터 업데이트
const dataUpdate = async (req, res) =>{
    await registerModel.updateRow(req.body);
    res.send(200);
}

// 아이디 중복 검사
const duplicatedID = async (req, res) =>{
    const isDuplicated = await registerModel.checkDuplicatedID(req.body.id);
    res.send({ isDuplicated });
}

module.exports = {getProducts, getMainProducts, getProduct, postProducts, deleteData, moveWrite, dataUpdate, duplicatedID};