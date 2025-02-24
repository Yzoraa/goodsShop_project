const editorEl = document.querySelector('#editor');
const comment = editorEl.dataset.comment || '';

const editor = new toastui.Editor({
    el: document.querySelector('#editor'),
    height: '200px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    initialValue: comment
});

// 이미지 업로드
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
        document.getElementById('newimgUrl').value = imgUrl; // 새 이미지 업로드 시 업데이트
    }).catch((error) => {
        console.log(error);
        console.error("이미지 업로드 오류:", error);
    });
}

// 수정버튼 클릭 시 실행
const updateForm = (id) =>{
    const form = document.forms['registerUpdate'];

    const data = {
        id: id,
        name: form['name'].value,
        comment: editor.getMarkdown(),
        // comment: form['comment'].value,
        price: form['price'].value,
        img_url: document.getElementById('newimgUrl').value
    };
    
    axios({
        method: 'put',
        url: '/register/update',
        data: data,
    }).then((res) =>{
        alert('수정성공!');
        window.location.href = '/register';
    }).catch((error) => {
        console.log(error);
    });
}