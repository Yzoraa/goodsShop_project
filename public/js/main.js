// 상세 페이지로 이동
const detailPage = (id) =>{
    window.location.href = `/detail/${id}`;
}

// 장바구니 페이지로 이동
const cartPage = () =>{
    window.location.href = '/cart';
}

// 홈(메인페이지) 이동
const goToHome = () =>{
    window.location.href = "/";
};

// 하트 토글 이벤트
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".heartIcon").forEach(icon => {
        icon.addEventListener("click", (event) => {
            event.stopPropagation();

            if (icon.src.includes("heartBlack.png")) {
                icon.src = "/img/heartRed.png";  // 빨간 하트 이미지
            } else {
                icon.src = "/img/heartBlack.png";  // 기본 하트 이미지
            }
        });
    });
});