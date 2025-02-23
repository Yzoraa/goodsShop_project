const registerModel = require('../models/registerModel');

// 전체 (등록페이지)
const getProducts = async (req, res) => {
    const getProducts = await registerModel.getAllProduct();
    console.log("데이터 확인:", getProducts);
    res.render("register", { getProducts });
};

// 전체 (메인페이지)
const getMainProducts = async (req, res) =>{
    const getMains = await registerModel.getAllProduct();
    res.render("main", { getMains });
}

// 아이디 하나만 가져오기 (상세페이지 이동!)
const getProduct = async (req, res) =>{
    const productOne = await registerModel.getOneProduct(req.params.id);
    res.render("detailOne", { productOne });
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

module.exports = {getProducts, getMainProducts, getProduct, postProducts, deleteData, moveWrite, dataUpdate};