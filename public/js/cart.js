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
        alert("삭제되었습니다.");
        location.reload();
    }).catch((error) => {
        console.log(error);
        console.error("데이터 삭제 오류:", error);
    });
};

// 전체 삭제
const deleteAll = () =>{
    axios({
        method:'delete',
        url: `/cart/delete`
    }).then((res) =>{
        alert("전체 삭제되었습니다.");
        location.reload();
    }).catch((error) => {
        console.log(error);
        console.error("전체 데이터 삭제 오류:", error);
    });
}

// 상세 페이지로 이동
const detailPage = (id) =>{
    window.location.href = `/register/detail/${id}`;
};

// 장바구니 페이지로 이동
const cartPage = () =>{
    window.location.href = '/cart';
}

// 홈(메인페이지) 이동
const goToHome = () =>{
    window.location.href = "/";
};