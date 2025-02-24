const editor = new toastui.Editor({
    el: document.querySelector('#editor'),
    height: '200px',
    initialEditType: 'markdown',
    previewStyle: 'vertical'
});

// db 연결 (등록)
const connectDB = (event) =>{
    event.preventDefault();
    const img = document.querySelector(".result img")?.src || "";
    const id = document.querySelector("input[name='id']").value;
    const name = document.querySelector("input[name='name']").value;
    const comment = editor.getMarkdown(); // 에디터에서 입력값 가져오기
    // const comment = document.querySelector("input[name='comment']").value;
    const price = document.querySelector("input[name='price']").value;

    axios({
        method: "post",
        url: "/register/postData",
        data: {id, name, comment, price, img_url: img},
        headers: { "Content-Type": "application/json" }
    }).then((res) =>{ 
        alert("등록성공");
        location.reload();
    })
    .catch((error) => {
        console.error("데이터 저장 오류:", error);
    });
};

// 아이디 중복 불가능
const checkDuplicated = () =>{
    const inputID = document.querySelector("input[name='id']").value;
    const userID = document.getElementById('userID');

    axios({
        method: "post",
        url: "/register/checkID",
        data: { id: inputID },
        headers: { "Content-Type": "application/json" }
    }).then((res) =>{
        if (res.data.isDuplicated) {
            userID.textContent = "중복된 아이디입니다.";
            userID.style.color = "red";
        } else {
            userID.textContent = "사용 가능한 아이디입니다.";
            userID.style.color = "green";
        }
    }).catch((error) =>{
        console.error("ID 중복 확인 오류:", error);
    })
}
const idInput = document.getElementById("idInput");
idInput.addEventListener("input", checkDuplicated);

// 삭제
const deleteForm = (id) =>{
    axios({
        method:'delete',
        url: `/register/delete/${id}`
    }).then((res) =>{
        alert("삭제성공");
        location.reload();
    }).catch((error) => {
        console.log(error);
        console.error("데이터 삭제 오류:", error);
    });
};

// 수정 페이지로 이동
const updatePage = (id) =>{
    window.location.href = `/register/write/${id}`;
}

// 파일업로드
const resultBox = document.querySelector('.result');

const fileUpload = () =>{
    const file = document.getElementById('dynamicFile');
    // console.log(file.files[0], '첫번째콘솔');

    const fileData = new FormData();
    fileData.append('dynamicFile', file.files[0]);

    axios({
        method: 'post',
        url: '/dynamicFile',
        data: fileData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(res => {
        const imgUrl = res.data.imgUrl
        resultBox.innerHTML = `<div><img src=${imgUrl} width="200px" height="200px"></div>`;
    }).catch((error) => {
        console.log(error);
        console.error("이미지 업로드 오류:", error);
    });
}