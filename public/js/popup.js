document.addEventListener("DOMContentLoaded", function () {
    const popup = document.querySelector(".layerBox");
    const checkbox = document.getElementById("checkbox");
    const closeButton = document.getElementById("close");

    closeButton.addEventListener("click", function (event) {
        event.preventDefault();

        if (checkbox.checked) {
            axios({
                method: "post",
                url: "/setCookie",
                data: { hidePopup: "true" }
            }).then(() => {
                console.log("쿠키 설정 완료!");
                popup.style.display = "none"; // 팝업 닫기
            })
            .catch((error) => {
                console.error("쿠키 설정 오류:", error);
            });
        } else {
            popup.style.display = "none"; // 팝업 닫기
        }
    });

    // 쿠키 값이 false일 때만 팝업 보이기
    if (popup) {
        popup.style.display = "block";
    }
});
