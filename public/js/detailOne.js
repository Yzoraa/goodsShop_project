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