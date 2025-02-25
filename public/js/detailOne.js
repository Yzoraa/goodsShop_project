document.addEventListener("DOMContentLoaded", function () {
    const infoBox = document.querySelector(".infoBox");
    const price = parseInt(infoBox.dataset.price);

    // 초기 총 가격 설정
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.innerText = `${price}원`;
});

// 수량 변경 함수
function changeQuantity(amount) {
    let quantityInput = document.getElementById('quantity');
    let totalPrice = document.getElementById('totalPrice');
    let price = parseInt(document.querySelector(".infoBox").dataset.price);

    let newQuantity = parseInt(quantityInput.value) + amount;

    if (newQuantity >= 1) {
        quantityInput.value = newQuantity;
        totalPrice.innerText = `${newQuantity * price}원`;
    }
}

// 장바구니 페이지로 이동
const cartPageDetail = () =>{
    window.location.href = '/cart';
}

// 홈(메인페이지) 이동
const goToHomeDetail = () =>{
    window.location.href = "/";
};