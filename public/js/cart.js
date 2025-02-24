// 장바구니에 데이터 추가
document.addEventListener("DOMContentLoaded", () => {
    const cartBtn = document.querySelector(".cartBtn");

    if (cartBtn) {
        cartBtn.addEventListener("click", () => {
            const product_id = document.querySelector(".infoBox").dataset.productId;
            const quantity = document.getElementById("quantity").value;

            console.log("상품 ID:", product_id, "수량:", quantity);

            axios.post("/cart/add", { product_id, quantity })
                .then((res) => {
                    alert("장바구니에 추가되었습니다!");
                })
                .catch((error) => {
                    console.error("장바구니 추가 오류:", error);
                });
        });
    }
});

// 삭제
const deleteItem = (id) =>{
    axios({
        method:'delete',
        url: `/cart/delete/${id}`
    }).then((res) =>{
        alert("삭제성공");
        location.reload();
    }).catch((error) => {
        console.log(error);
        console.error("데이터 삭제 오류:", error);
    });
};

// 홈(메인페이지) 이동
const goToHome = () =>{
    window.location.href = "/";
}