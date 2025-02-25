const infoBox = document.querySelector(".infoBox");
const price = parseInt(infoBox.dataset.price);

// 수량 변경 함수
function changeQuantity(amount) {
    let quantityInput = document.getElementById('quantity');
    let totalPrice = document.getElementById('totalPrice');
    let newQuantity = parseInt(quantityInput.value) + amount;

    if (newQuantity >= 1) {
        quantityInput.value = newQuantity;
        totalPrice.innerText = newQuantity * price;
    }
}

// 장바구니 페이지로 이동
const cartPage = () =>{
    window.location.href = '/cart';
}

// 홈(메인페이지) 이동
const goToHome = () =>{
    window.location.href = "/";
};