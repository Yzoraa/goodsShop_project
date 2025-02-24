const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require('fs');

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
    res.render("main", {title: "goodsShop"});
});

// 이미지 파일
app.post("/dynamicFile", upload.single('dynamicFile'), (req, res) =>{
    const imgUrl = `/uploads/${req.file.filename}`;
    res.send({imgUrl});
})

// 서버연결
app.listen(port, () => {
    console.log(`서버 실행 ${port}`);
});