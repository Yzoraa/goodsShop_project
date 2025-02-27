const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require('fs');
const cookieParser = require("cookie-parser");

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        const uploadPath = "uploads/";

        // 폴더 없을 경우
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath);
        }

        cb(null, uploadPath);
    },
    
    filename: (req, file, cb) =>{
        const ext = path.extname(file.originalname); // 원본 파일 명에서 확장자 추출
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext); // 파일명에 타임스탬프+확장자 포함시켜 저장
    },
});

const upload = multer({storage});

const app = express();
const port = 3000;

// 쿠키 사용
app.use(cookieParser("mySecretKey"));

app.use(express.json()); // JSON 형식의 데이터를 받기 위해 추가
app.use(express.urlencoded({ extended: true })); // form 데이터 받기 위해 추가
app.use("/public", express.static(__dirname + "/public"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/uploads", express.static(__dirname + "/uploads"))

// 라우팅 처리
const registerRouter = require('./routes/registerRoute');
app.use('/register', registerRouter);
const mainRouter = require('./routes/mainRoute');
app.use('/', mainRouter);
const cartRouter = require('./routes/cartRoute');
app.use('/cart', cartRouter);

// 미들웨어
app.set("view engine", "ejs");
app.set("views", "./views");

// 기본 홈 라우트
app.get("/", (req, res) => {
     // 쿠키값은 항상 문자열이므로 boolean 아니게 조심하기
    const hidePopup = req.signedCookies.hidePopup === "true";
    res.render("main", { hidePopup });
});

// 이미지 파일
app.post("/dynamicFile", upload.single('dynamicFile'), (req, res) =>{
    const imgUrl = `/uploads/${req.file.filename}`;
    res.send({imgUrl});
})

//  팝업 차단 쿠키 설정 (체크 후 닫기 버튼을 누르면 실행됨)
app.post("/setCookie", (req, res) => {
    console.log(req.body); // hidePopup 값 확인
    const { hidePopup } = req.body;

    if (hidePopup === "true") {
        res.cookie("hidePopup", true, {
            maxAge: 24 * 60 * 60 * 1000, // 1일 유지
            httpOnly: true, // JavaScript에서 접근 불가능
            signed: true, // 서명된 쿠키
        });
    }

    res.send({ success: true });
});

// 서버연결
app.listen(port, () => {
    console.log(`서버 실행 ${port}`);
});