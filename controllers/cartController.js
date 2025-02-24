const cartModel = require('../models/cartModel');


// 장바구니 페이지 이동
const moveCart = async (req, res) =>{
    const cartItems = await cartModel.getCartItems();
    // console.log("장바구니 데이터 확인:", cartItems);
    res.render('cart', {cartItems});
};

// 장바구니 추가
const addToCart = async (req, res) =>{
    const { product_id, quantity } = req.body;
    const addItem = await cartModel.addCart(product_id, quantity);
    res.send(200);
}

// 장바구니 삭제
const deleteToCart = async (req, res) =>{
    // console.log("삭제 요청 ID:", req.params.id);
    const deleteItem = await cartModel.deleteCart(req.params.id);
    res.send(200);
}

// 전체 장바구니 삭제
const deleteToCartAll = async (req, res) =>{
    console.log("삭제 요청 ID:", req.params.id);
    const deleteItemAll = await cartModel.deleteCartAll();
    res.send(200);
}

module.exports = { moveCart, addToCart, deleteToCart, deleteToCartAll }