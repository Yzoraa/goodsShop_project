const express = require("express");
const path = require("path");
// const multer = require("multer"); 이미지 관련은 나중에!

// const storage = multer.diskStorage({
//   destination:(req, file, cb) =>{
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) =>{
//     const ext = path.extname(file.originalname); // 원본 파일 명에서 확장자 추출
//     cb(null, path.basename(file.originalname, ext) + Date.now() + ext); // 파일명에 타임스탬프+확장자 포함시켜 저장
//   },
// });
// const upload = multer({storage});

const app = express();
const port = 3000;

app.use(express.json()); // JSON 형식의 데이터를 받기 위해 추가
app.use(express.urlencoded({ extended: true })); // form 데이터 받기 위해 추가
app.use("/public", express.static(__dirname + "/public"));
app.use("/img", express.static(__dirname + "/img"));
// app.use("/uploads", express.static(__dirname + "/uploads"))

// 라우팅 처리
const registerRouter = require('./routes/registerRoute');
app.use('/register', registerRouter);

// 미들웨어
app.set("view engine", "ejs");
app.set("views", "./views");

// 기본 홈 라우트
app.get("/", (req, res) => {
    res.render("main", {title: "goodsShop"});
});

// 서버연결
app.listen(port, () => {
    console.log(`서버 실행 ${port}`);
});